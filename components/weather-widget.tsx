"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudDrizzle,
  Wind,
  Thermometer,
  CloudFog,
  CloudLightning,
  Loader2,
  AlertCircle
} from "lucide-react"
import { motion } from "framer-motion"

interface WeatherData {
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
  mountainName: string
  altitude: number
}

interface WeatherWidgetProps {
  mountainId: string
}

// WMO Weather interpretation codes
const getWeatherInfo = (code: number): { icon: React.ReactNode; label: string; color: string } => {
  if (code === 0) return { icon: <Sun className="h-6 w-6" />, label: "Ciel dégagé", color: "text-yellow-400" }
  if (code <= 3) return { icon: <Cloud className="h-6 w-6" />, label: "Partiellement nuageux", color: "text-gray-400" }
  if (code <= 48) return { icon: <CloudFog className="h-6 w-6" />, label: "Brouillard", color: "text-gray-500" }
  if (code <= 57) return { icon: <CloudDrizzle className="h-6 w-6" />, label: "Bruine", color: "text-blue-400" }
  if (code <= 67) return { icon: <CloudRain className="h-6 w-6" />, label: "Pluie", color: "text-blue-500" }
  if (code <= 77) return { icon: <CloudSnow className="h-6 w-6" />, label: "Neige", color: "text-blue-200" }
  if (code <= 82) return { icon: <CloudRain className="h-6 w-6" />, label: "Averses", color: "text-blue-600" }
  if (code <= 86) return { icon: <CloudSnow className="h-6 w-6" />, label: "Averses de neige", color: "text-blue-300" }
  if (code <= 99) return { icon: <CloudLightning className="h-6 w-6" />, label: "Orages", color: "text-purple-500" }
  return { icon: <Cloud className="h-6 w-6" />, label: "Inconnu", color: "text-gray-400" }
}

const getDayName = (dateString: string): string => {
  const date = new Date(dateString)
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  return days[date.getDay()]
}

export function WeatherWidget({ mountainId }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await fetch(`/api/weather/${mountainId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch weather")
        }

        const data = await response.json()
        setWeather(data)
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [mountainId])

  if (loading) {
    return (
      <Card className="border-white/10 bg-linear-to-br from-gray-900 to-black">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-3 text-gray-300">Chargement météo...</span>
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="border-red-500/30 bg-linear-to-br from-gray-900 to-black">
        <CardContent className="flex items-center justify-center py-12">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <span className="ml-3 text-gray-300">Météo indisponible</span>
        </CardContent>
      </Card>
    )
  }

  const currentWeather = getWeatherInfo(weather.current.weather_code)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/10 bg-linear-to-br from-gray-900 via-gray-900 to-black backdrop-blur-md overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Cloud className="h-6 w-6 text-primary" aria-hidden="true" />
              Météo en temps réel
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
              À {weather.altitude}m
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Weather */}
          <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className={`${currentWeather.color}`}>
                {currentWeather.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400">Maintenant</p>
                <p className="text-white font-medium">{currentWeather.label}</p>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-3xl font-bold text-white">
                  {Math.round(weather.current.temperature_2m)}°C
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Wind className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <span>{Math.round(weather.current.wind_speed_10m)} km/h</span>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Prévisions 7 jours
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {weather.daily.time.map((date, index) => {
                const dayWeather = getWeatherInfo(weather.daily.weather_code[index])
                const isToday = index === 0

                return (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                      isToday
                        ? "bg-primary/10 border-primary/30"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`text-xs font-medium mb-2 ${isToday ? "text-primary" : "text-gray-400"}`}>
                      {isToday ? "Auj." : getDayName(date)}
                    </span>
                    <div className={`mb-2 ${dayWeather.color}`}>
                      {dayWeather.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white">
                        {Math.round(weather.daily.temperature_2m_max[index])}°
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round(weather.daily.temperature_2m_min[index])}°
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Wind className="h-3 w-3 text-blue-400" aria-hidden="true" />
                      <span className="text-xs text-gray-400">
                        {Math.round(weather.daily.wind_speed_10m_max[index])}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Safety Alert */}
          {weather.current.wind_speed_10m > 50 || weather.current.temperature_2m < -20 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-red-300">Conditions extrêmes</p>
                <p className="text-xs text-red-200/80 mt-1">
                  {weather.current.wind_speed_10m > 50 && "Vents violents détectés. "}
                  {weather.current.temperature_2m < -20 && "Températures extrêmement basses. "}
                  Ascension déconseillée.
                </p>
              </div>
            </motion.div>
          )}

          {/* Last Update */}
          <p className="text-xs text-gray-500 text-center">
            Dernière mise à jour : {new Date(weather.current.time).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
