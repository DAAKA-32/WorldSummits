"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { getMountains } from "@/lib/mountains"
import { Mountain } from "@/types/mountain"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, X, GitCompare, TrendingUp, AlertTriangle, Calendar, DollarSign } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackToTop } from "@/components/back-to-top"

function ComparatorContent() {
  const mountains = getMountains()
  const searchParams = useSearchParams()
  const [selectedMountains, setSelectedMountains] = useState<Mountain[]>([])
  const [selectedId, setSelectedId] = useState<string>("")

  // Load mountains from URL parameters on mount
  useEffect(() => {
    const ids = searchParams.get("ids")
    if (ids) {
      const idArray = ids.split(",")
      const preselectedMountains = mountains.filter((m) => idArray.includes(m.id))
      setSelectedMountains(preselectedMountains)
    }
  }, [searchParams, mountains])

  const addMountain = () => {
    if (selectedId && selectedMountains.length < 4) {
      const mountain = mountains.find((m) => m.id === selectedId)
      if (mountain && !selectedMountains.find((m) => m.id === mountain.id)) {
        setSelectedMountains([...selectedMountains, mountain])
        setSelectedId("")
      }
    }
  }

  const removeMountain = (id: string) => {
    setSelectedMountains(selectedMountains.filter((m) => m.id !== id))
  }

  const maxAltitude = Math.max(...selectedMountains.map((m) => m.stats.altitude), 1)
  const maxProminence = Math.max(...selectedMountains.map((m) => m.stats.prominence), 1)

  const difficultyScore = (difficulty: string) => {
    const scores: Record<string, number> = {
      "Facile": 1, "Easy": 1, "Moderate": 2, "Modérée": 2,
      "Difficile": 3, "Challenging": 3, "Très difficile": 4, "Very Hard": 4,
      "Extrême": 5, "Extreme": 5
    }
    return scores[difficulty] || 3
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4 hidden md:block">
        <Breadcrumbs
          items={[{ label: "Comparateur" }]}
        />
      </div>

      <div className="min-h-[calc(100vh-5rem)] flex flex-col">
        {/* Compact Header */}
        <div className="bg-gradient-to-b from-gray-950 to-black border-b border-white/10 py-6 md:py-8">
        <div className="container mx-auto px-4">
          {/* Title - Centered */}
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-3">
              <GitCompare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Comparateur de <span className="text-primary">Sommets</span>
            </h1>
            <p className="text-gray-400">Sélectionnez jusqu'à 4 sommets et comparez-les côte à côte</p>
          </div>

          {/* Inline Selector */}
          <div className="flex gap-2 md:gap-3 mt-4">
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="flex-1 min-h-[44px] md:h-10 border-white/10 bg-black/40 text-white text-sm" aria-label="Sélectionner un sommet à ajouter">
                <SelectValue placeholder="Ajouter un sommet..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {mountains
                  .filter((m) => !selectedMountains.find((sm) => sm.id === m.id))
                  .map((mountain) => (
                    <SelectItem key={mountain.id} value={mountain.id} className="text-white text-sm">
                      {mountain.name} ({mountain.stats.altitude.toLocaleString()}m)
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              onClick={addMountain}
              disabled={!selectedId || selectedMountains.length >= 4}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white min-h-[44px] md:h-10 px-4 md:px-6"
              aria-label="Ajouter le sommet sélectionné"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Ajouter</span>
            </Button>
          </div>

          {/* Selected badges */}
          {selectedMountains.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedMountains.map((mountain) => (
                <Badge
                  key={mountain.id}
                  className="bg-primary/10 text-white border-primary/30 pl-3 pr-1 py-1"
                >
                  <span className="text-xs">{mountain.name}</span>
                  <button
                    onClick={() => removeMountain(mountain.id)}
                    className="ml-2 hover:bg-white/10 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - No Scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-6 h-full overflow-y-auto">
          {selectedMountains.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <GitCompare className="h-20 w-20 text-gray-700 mx-auto" />
                <p className="text-xl text-white font-bold">Aucun sommet sélectionné</p>
                <p className="text-gray-500">Utilisez le menu ci-dessus pour ajouter des sommets</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Visual Comparison */}
              <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Comparaison Visuelle
                  </h3>
                  <div className="flex items-end justify-around gap-3 h-[220px]">
                    <AnimatePresence mode="popLayout">
                      {selectedMountains.map((mountain, index) => (
                        <motion.div
                          key={mountain.id}
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col items-center flex-1 max-w-[120px]"
                          style={{ height: `${(mountain.stats.altitude / maxAltitude) * 100}%` }}
                        >
                          <div className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-t-lg relative group flex-1 min-h-[60px]">
                            {mountain.images[0] && (
                              <div className="absolute inset-0 rounded-t-lg overflow-hidden opacity-20">
                                <Image src={mountain.images[0]} alt={mountain.name} fill className="object-cover" />
                              </div>
                            )}
                          </div>
                          <div className="text-center mt-2">
                            <p className="font-bold text-xs text-white truncate w-full">{mountain.name}</p>
                            <p className="text-lg font-black text-primary">{mountain.stats.altitude.toLocaleString()}m</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Comparison */}
              <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-white mb-3">Caractéristiques</h3>
                  <div className="space-y-3">
                    {/* Proeminence */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium">Proéminence</p>
                      <div className="space-y-1.5">
                        {selectedMountains.map((mountain) => (
                          <div key={`prom-${mountain.id}`} className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 w-20 truncate">{mountain.name}</span>
                            <div className="flex-1 bg-black/40 rounded-full h-6 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(mountain.stats.prominence / maxProminence) * 100}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-orange-500/80 to-orange-500 rounded-full flex items-center justify-end pr-2"
                              >
                                <span className="text-xs font-bold text-white">{mountain.stats.prominence.toLocaleString()}m</span>
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Difficulté */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium">Difficulté</p>
                      <div className="space-y-1.5">
                        {selectedMountains.map((mountain) => (
                          <div key={`diff-${mountain.id}`} className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 w-20 truncate">{mountain.name}</span>
                            <div className="flex-1 flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`h-6 flex-1 rounded ${
                                    level <= difficultyScore(mountain.expedition.difficulty)
                                      ? "bg-gradient-to-r from-red-500 to-red-600"
                                      : "bg-black/40"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 w-16 text-right">{mountain.expedition.difficulty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Taux de mortalité */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Taux de mortalité
                      </p>
                      <div className="space-y-1.5">
                        {selectedMountains.map((mountain) => (
                          <div key={`death-${mountain.id}`} className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 w-20 truncate">{mountain.name}</span>
                            <div className="flex-1 bg-black/40 rounded-full h-6 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((mountain.stats.deathRate / 35) * 100, 100)}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-red-600/80 to-red-600 rounded-full flex items-center justify-end pr-2"
                              >
                                <span className="text-xs font-bold text-white">{mountain.stats.deathRate}%</span>
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Details Table - Full Width */}
              <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black lg:col-span-2">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-white mb-3">Détails de l'Expédition</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-2 text-gray-400 font-medium">Caractéristique</th>
                          {selectedMountains.map((mountain) => (
                            <th key={mountain.id} className="text-center py-2 px-2 text-white font-bold">
                              {mountain.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-2 px-2 text-gray-400 flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            Budget
                          </td>
                          {selectedMountains.map((mountain) => (
                            <td key={mountain.id} className="text-center py-2 px-2 text-white">
                              {mountain.expedition.estimatedBudget?.min && mountain.expedition.estimatedBudget?.max
                                ? `${mountain.expedition.estimatedBudget.min.toLocaleString()}-${mountain.expedition.estimatedBudget.max.toLocaleString()} ${mountain.expedition.estimatedBudget.currency}`
                                : (mountain.expedition as any).estimatedCost || "N/A"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 px-2 text-gray-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Durée
                          </td>
                          {selectedMountains.map((mountain) => (
                            <td key={mountain.id} className="text-center py-2 px-2 text-white">
                              {mountain.stats.averageDuration || mountain.expedition.recommendedDuration || "N/A"} jours
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 px-2 text-gray-400">Saisons</td>
                          {selectedMountains.map((mountain) => (
                            <td key={mountain.id} className="text-center py-2 px-2">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {mountain.expedition.bestSeasons?.map((season) => (
                                  <Badge key={season} variant="outline" className="text-xs border-white/20 text-gray-300">
                                    {season}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 px-2 text-gray-400">Première ascension</td>
                          {selectedMountains.map((mountain) => (
                            <td key={mountain.id} className="text-center py-2 px-2 text-white">
                              {mountain.stats.firstAscentYear || new Date(mountain.firstAscent?.date || "").getFullYear()}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}

export default function ComparatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <GitCompare className="h-20 w-20 text-gray-700 mx-auto animate-pulse" />
            <p className="text-xl text-white font-bold">Chargement...</p>
          </div>
        </div>
      }
    >
      <ComparatorContent />
    </Suspense>
  )
}
