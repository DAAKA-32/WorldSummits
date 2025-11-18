import { getMountainById } from "@/lib/mountains"
import { NextResponse } from "next/server"

// Cache for 1 hour
export const revalidate = 3600

interface WeatherResponse {
  current: {
    temperature_2m: number
    wind_speed_10m: number
    weather_code: number
    time: string
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
    wind_speed_10m_max: number[]
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ mountainId: string }> }
) {
  try {
    const { mountainId } = await params
    const mountain = getMountainById(mountainId)

    if (!mountain) {
      return NextResponse.json(
        { error: "Mountain not found" },
        { status: 404 }
      )
    }

    const { latitude, longitude } = mountain.coordinates

    // Fetch weather from Open-Meteo API (Free, unlimited)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}&` +
        `longitude=${longitude}&` +
        `current=temperature_2m,wind_speed_10m,weather_code&` +
        `daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max&` +
        `timezone=auto&` +
        `forecast_days=7`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error("Weather API failed")
    }

    const data: WeatherResponse = await response.json()

    return NextResponse.json(
      {
        current: data.current,
        daily: data.daily,
        mountainName: mountain.name,
        altitude: mountain.stats.altitude,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    )
  }
}
