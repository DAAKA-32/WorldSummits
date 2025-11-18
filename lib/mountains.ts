import { Mountain, Continent } from "@/types/mountain"
import mountainsData from "@/data/mountains.json"

// Get all mountains
export function getMountains(): Mountain[] {
  return mountainsData as Mountain[]
}

// Get mountain by ID
export function getMountainById(id: string): Mountain | undefined {
  return getMountains().find((m) => m.id === id)
}

// Get mountains by continent
export function getMountainsByContinent(continent: Continent): Mountain[] {
  return getMountains().filter((m) => m.continent === continent)
}

// Get all unique continents
export function getContinents(): Continent[] {
  const continents = new Set(getMountains().map((m) => m.continent))
  return Array.from(continents) as Continent[]
}

// Get mountains sorted by altitude
export function getMountainsByAltitude(descending = true): Mountain[] {
  const mountains = [...getMountains()]
  return mountains.sort((a, b) =>
    descending
      ? b.stats.altitude - a.stats.altitude
      : a.stats.altitude - b.stats.altitude
  )
}

// Get mountains by difficulty
export function getMountainsByDifficulty(difficulty: string): Mountain[] {
  return getMountains().filter((m) => m.expedition.difficulty === difficulty)
}

// Search mountains by name or country
export function searchMountains(query: string): Mountain[] {
  const lowerQuery = query.toLowerCase()
  return getMountains().filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.country.toLowerCase().includes(lowerQuery) ||
      m.alternativeNames?.some((name) =>
        name.toLowerCase().includes(lowerQuery)
      )
  )
}
