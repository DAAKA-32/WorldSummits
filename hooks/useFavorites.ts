"use client"

import { useState, useEffect } from "react"

const FAVORITES_KEY = "worldsummit_favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    }
    setIsLoaded(true)
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error("Failed to save favorites:", error)
      }
    }
  }, [favorites, isLoaded])

  const toggleFavorite = (mountainId: string) => {
    setFavorites((prev) => {
      if (prev.includes(mountainId)) {
        return prev.filter((id) => id !== mountainId)
      } else {
        return [...prev, mountainId]
      }
    })
  }

  const isFavorite = (mountainId: string) => {
    return favorites.includes(mountainId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  }
}
