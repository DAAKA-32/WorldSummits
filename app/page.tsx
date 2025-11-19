"use client"

import { useState, useMemo } from "react"
import { getMountains } from "@/lib/mountains"
import { Mountain } from "@/types/mountain"
import { MountainCard } from "@/components/mountain-card"
import { useDebounce } from "@/hooks/useDebounce"
import { BackToTop } from "@/components/back-to-top"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { WelcomeModal } from "@/components/welcome-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Mountain as MountainIcon, TrendingUp, Globe, GitCompare, Plus, Trash2, Check, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()
  const mountains = getMountains()
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [selectedContinent, setSelectedContinent] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("altitude-desc")

  // Comparator state
  const [selectedForComparison, setSelectedForComparison] = useState<Mountain[]>([])

  // Get unique continents
  const continents = useMemo(() => {
    return Array.from(new Set(mountains.map((m) => m.continent)))
  }, [mountains])

  // Filter and sort mountains
  const filteredMountains = useMemo(() => {
    let filtered = mountains.filter((mountain) => {
      const matchesSearch =
        mountain.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        mountain.country.toLowerCase().includes(debouncedSearchQuery.toLowerCase())

      const matchesContinent =
        selectedContinent === "all" || mountain.continent === selectedContinent

      const matchesDifficulty =
        selectedDifficulty === "all" ||
        mountain.expedition.difficulty === selectedDifficulty

      return matchesSearch && matchesContinent && matchesDifficulty
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "altitude-desc":
          return b.stats.altitude - a.stats.altitude
        case "altitude-asc":
          return a.stats.altitude - b.stats.altitude
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [mountains, debouncedSearchQuery, selectedContinent, selectedDifficulty, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedContinent("all")
    setSelectedDifficulty("all")
    setSortBy("altitude-desc")
  }

  const hasActiveFilters =
    debouncedSearchQuery || selectedContinent !== "all" || selectedDifficulty !== "all" || sortBy !== "altitude-desc"

  // Comparator functions
  const toggleMountainSelection = (mountain: Mountain) => {
    if (selectedForComparison.find((m) => m.id === mountain.id)) {
      setSelectedForComparison(selectedForComparison.filter((m) => m.id !== mountain.id))
    } else if (selectedForComparison.length < 4) {
      setSelectedForComparison([...selectedForComparison, mountain])
    }
  }

  const isSelected = (mountainId: string) => {
    return selectedForComparison.some((m) => m.id === mountainId)
  }

  const clearComparison = () => {
    setSelectedForComparison([])
  }

  const handleCompare = () => {
    const ids = selectedForComparison.map((m) => m.id).join(",")
    window.location.href = `/comparator?ids=${ids}`
  }

  // Get stats
  const stats = useMemo(() => {
    return {
      totalMountains: mountains.length,
      continents: new Set(mountains.map((m) => m.continent)).size,
      maxAltitude: Math.max(...mountains.map((m) => m.stats.altitude))
    }
  }, [mountains])

  return (
    <div className="min-h-screen bg-black">
      <WelcomeModal />
      {/* Hero Section - Improved */}
      <section className="relative h-screen flex items-start overflow-hidden" aria-label="Hero section">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2400"
            alt="Mountain background"
            fill
            className="object-cover opacity-40"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center pt-16 md:pt-20 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-3 md:mb-4">
                <span className="block text-white mb-1.5">WORLD</span>
                <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  SUMMITS
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light max-w-2xl mx-auto px-4">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Stats Cards - Inline on mobile */}
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-5 md:gap-8 max-w-5xl mx-auto px-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 hover:border-orange-500/50 transition-all flex-1 max-w-[130px] sm:max-w-[150px] md:max-w-none"
              >
                <MountainIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-orange-500 mx-auto mb-1.5 md:mb-2" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">{stats.totalMountains}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{t('peaks')}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 hover:border-orange-500/50 transition-all flex-1 max-w-[130px] sm:max-w-[150px] md:max-w-none"
              >
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-orange-500 mx-auto mb-1.5 md:mb-2" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">{stats.continents}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{t('continents')}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 hover:border-orange-500/50 transition-all flex-1 max-w-[130px] sm:max-w-[150px] md:max-w-none"
              >
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-orange-500 mx-auto mb-1.5 md:mb-2" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">{stats.maxAltitude}<span className="text-base sm:text-lg md:text-xl">m</span></div>
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{t('highestPeak')}</div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 sm:pt-3"
            >
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("popular-section")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-lg shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all hover:scale-105"
              >
                {t('startExploration')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Mountains Section */}
      <section id="popular-section" className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden" aria-label="Popular mountains">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/30 px-6 py-2 text-sm font-semibold tracking-wider mb-4">
              {t('mustSee')}
            </Badge>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              {t('popularMountains').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">{t('popularMountains').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              {t('popularMountainsDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8">
            {mountains
              .filter((m) => ["everest", "k2", "kilimanjaro", "matterhorn", "denali", "mont-blanc"].includes(m.id))
              .map((mountain, index) => (
                <motion.div
                  key={mountain.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  <MountainCard mountain={mountain} index={index} />
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant={isSelected(mountain.id) ? "default" : "outline"}
                      onClick={() => toggleMountainSelection(mountain)}
                      disabled={!isSelected(mountain.id) && selectedForComparison.length >= 4}
                      className={`backdrop-blur-md transition-all ${
                        isSelected(mountain.id)
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/50"
                          : "bg-black/80 border-white/20 text-white hover:bg-primary/20 hover:border-primary/50"
                      }`}
                    >
                      {isSelected(mountain.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              {t('exploreAllPeaks')}
            </Button>
          </div>
        </div>
      </section>

      {/* All Mountains Section */}
      <section id="search-section" className="py-24 bg-gradient-to-b from-black via-gray-950 to-black" aria-label="All mountains catalog">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t('allPeaks').split(' ')[0]} {t('allPeaks').split(' ')[1]} <span className="text-primary">{t('allPeaks').split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              {t('allPeaksDesc')} {mountains.length} {t('legendaryPeaks')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <SearchAutocomplete
                mountains={mountains}
                placeholder={t('searchPlaceholder')}
              />
            </motion.div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <span className="text-sm text-gray-500 font-medium">{t('filterBy')}</span>

            <Badge
              onClick={clearFilters}
              className={`cursor-pointer px-4 py-2.5 transition-all ${
                !hasActiveFilters
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "bg-white/5 text-white border-white/20 hover:bg-white/10"
              }`}
            >
              {t('all')}
            </Badge>

            {continents.slice(0, 5).map((continent) => (
              <Badge
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`cursor-pointer px-4 py-2.5 transition-all ${
                  selectedContinent === continent
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-primary/50"
                }`}
              >
                {continent}
              </Badge>
            ))}

            <Badge
              onClick={() => {
                setSearchQuery("8000")
                setSortBy("altitude-desc")
              }}
              className={`cursor-pointer px-4 py-2.5 transition-all ${
                searchQuery === "8000"
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-primary/50"
              }`}
            >
              8000m+
            </Badge>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2 transition-all border border-white/10"
              >
                <X className="h-3 w-3" />
                {t('resetFilters')}
              </button>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-500">
              <span className="text-white font-bold text-xl">{filteredMountains.length}</span> {filteredMountains.length > 1 ? t('peaksFound') : t('peakFound')}
            </p>
          </div>

          {/* Mountains Grid */}
          {filteredMountains.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
            >
              {filteredMountains.map((mountain, index) => (
                <motion.div
                  key={mountain.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="relative group"
                >
                  <MountainCard mountain={mountain} index={index} />
                  <div className="absolute top-3 right-3 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant={isSelected(mountain.id) ? "default" : "outline"}
                      onClick={() => toggleMountainSelection(mountain)}
                      disabled={!isSelected(mountain.id) && selectedForComparison.length >= 4}
                      className={`backdrop-blur-md transition-all ${
                        isSelected(mountain.id)
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/50 scale-110"
                          : "bg-black/80 border-white/20 text-white hover:bg-primary/20 hover:border-primary/50"
                      }`}
                    >
                      {isSelected(mountain.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-6">
                <Search className="h-20 w-20 text-gray-600 mx-auto" />
                <div>
                  <p className="text-2xl text-white font-bold mb-2">{t('noPeaksFound')}</p>
                  <p className="text-gray-400 mb-4">
                    {t('tryDifferentFilters')}
                  </p>
                </div>
                <Button
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {t('resetFilters')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Floating Comparison Bar */}
      <AnimatePresence>
        {selectedForComparison.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
          >
            <Card className="border-primary/50 bg-black/95 backdrop-blur-md shadow-2xl">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 text-white min-w-fit">
                    <GitCompare className="h-5 w-5 text-primary" />
                    <span className="font-bold">{selectedForComparison.length}/4</span>
                    <span className="text-gray-300 text-sm hidden sm:inline">{t('peaks')} {t('selected')}</span>
                  </div>

                  <div className="hidden sm:flex flex-1 gap-2 overflow-x-auto">
                    {selectedForComparison.map((mountain) => (
                      <Badge
                        key={mountain.id}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 whitespace-nowrap"
                      >
                        {mountain.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearComparison}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCompare}
                      className="bg-primary hover:bg-primary/90 text-white relative"
                    >
                      <span className="relative z-10">{t('compare')}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTop />
    </div>
  )
}
