"use client"

import { useState, useRef, useEffect } from "react"
import { Mountain } from "@/types/mountain"
import { Search, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface SearchAutocompleteProps {
  mountains: Mountain[]
  onSelect?: (mountain: Mountain) => void
  placeholder?: string
}

export function SearchAutocomplete({ mountains, onSelect, placeholder = "Rechercher un sommet..." }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filteredMountains = query.trim()
    ? mountains
        .filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.country.toLowerCase().includes(query.toLowerCase()) ||
            m.range.toLowerCase().includes(query.toLowerCase()) ||
            m.continent.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (mountain: Mountain) => {
    setQuery("")
    setIsOpen(false)
    if (onSelect) {
      onSelect(mountain)
    } else {
      router.push(`/mountains/${mountain.id}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredMountains.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredMountains.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredMountains.length) {
          handleSelect(filteredMountains[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" aria-hidden="true" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setSelectedIndex(-1)
          }}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-14 pr-4 h-14 bg-white/5 backdrop-blur-md border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/30 text-white rounded-full shadow-xl"
          aria-label="Rechercher un sommet par nom, pays ou massif"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen && filteredMountains.length > 0}
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredMountains.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            id="search-results"
            role="listbox"
          >
            <Card className="absolute top-full mt-2 w-full border-white/10 bg-gray-900/95 backdrop-blur-md shadow-2xl overflow-hidden z-50">
              <div className="p-2">
                {filteredMountains.map((mountain, index) => (
                  <button
                    key={mountain.id}
                    onClick={() => handleSelect(mountain)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between ${
                      index === selectedIndex
                        ? "bg-primary/20 border-primary/50"
                        : "hover:bg-white/5"
                    }`}
                    role="option"
                    aria-selected={index === selectedIndex}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{mountain.name}</span>
                        <Badge variant="secondary" className="bg-white/10 border-white/20 text-xs">
                          {mountain.continent}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        {mountain.country} • {mountain.range}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-white font-mono">{mountain.stats.altitude.toLocaleString()}m</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query && filteredMountains.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="absolute top-full mt-2 w-full border-white/10 bg-gray-900/95 backdrop-blur-md shadow-2xl">
            <div className="p-4 text-center text-gray-400">
              Aucun sommet trouvé pour "{query}"
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
