"use client"

import { Mountain } from "@/types/mountain"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Check, Clock, DollarSign, Calendar, Backpack, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ExpeditionSimulatorProps {
  mountain: Mountain
}

export function ExpeditionSimulator({ mountain }: ExpeditionSimulatorProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const timeline = [
    { phase: "Préparation", duration: "3-6 mois", description: "Entraînement physique et obtention des permis" },
    { phase: "Voyage", duration: "1-3 jours", description: "Vol et transport vers le camp de base" },
    { phase: "Acclimatation", duration: `${Math.floor(mountain.stats.averageDuration * 0.4)} jours`, description: "Adaptation à l'altitude" },
    { phase: "Ascension", duration: `${Math.floor(mountain.stats.averageDuration * 0.4)} jours`, description: "Progression vers le sommet" },
    { phase: "Sommet & Descente", duration: `${Math.floor(mountain.stats.averageDuration * 0.2)} jours`, description: "Atteinte du sommet et retour" },
  ]

  const totalChecked = Object.values(checkedItems).filter(Boolean).length
  const progressPercent = (totalChecked / mountain.expedition.requiredEquipment.length) * 100

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="container mx-auto px-3 md:px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Link href={`/mountains/${mountain.id}`} className="text-primary hover:underline mb-2 inline-block text-sm md:text-base">
            ← Retour à {mountain.name}
          </Link>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            Simulateur d'Expédition
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground">
            Planifiez votre ascension du {mountain.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 md:gap-2 text-base md:text-xl">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Timeline d'expédition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-3 md:gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs md:text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-border my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6 md:pb-8">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                          <h3 className="font-semibold text-sm md:text-base">{item.phase}</h3>
                          <Badge variant="secondary" className="text-[10px] md:text-xs">{item.duration}</Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 md:gap-2 text-base md:text-xl">
                  <Backpack className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Checklist d'équipement
                  <Badge variant="outline" className="ml-auto text-[10px] md:text-xs">
                    {totalChecked}/{mountain.expedition.requiredEquipment.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 md:mb-4">
                  <div className="w-full bg-muted rounded-full h-1.5 md:h-2">
                    <div
                      className="bg-primary h-1.5 md:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2">
                    {progressPercent.toFixed(0)}% complété
                  </p>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {mountain.expedition.requiredEquipment.map((item) => (
                    <div key={item} className="flex items-center gap-2 md:gap-3">
                      <Checkbox
                        id={item}
                        checked={checkedItems[item] || false}
                        onCheckedChange={(checked) =>
                          setCheckedItems({ ...checkedItems, [item]: checked as boolean })
                        }
                      />
                      <label
                        htmlFor={item}
                        className="text-xs md:text-sm cursor-pointer flex-1"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Key Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Informations clés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm md:text-base">Meilleures saisons</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mountain.expedition.bestSeasons.map((season) => (
                        <Badge key={season} variant="secondary" className="text-[10px] md:text-xs">
                          {season}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm md:text-base">Durée recommandée</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {mountain.expedition.recommendedDuration} jours
                    </p>
                  </div>
                </div>
                {mountain.expedition.estimatedBudget && (
                  <div className="flex items-start gap-2 md:gap-3">
                    <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm md:text-base">Budget estimé</p>
                      <p className="text-xs md:text-sm font-bold text-primary">
                        {mountain.expedition.estimatedBudget.min.toLocaleString()} -{" "}
                        {mountain.expedition.estimatedBudget.max.toLocaleString()}{" "}
                        {mountain.expedition.estimatedBudget.currency}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dangers */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-1.5 md:gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                  Dangers à prévoir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 md:space-y-2">
                  {mountain.dangers.map((danger) => (
                    <li key={danger} className="flex items-center gap-2 text-xs md:text-sm">
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-destructive" />
                      {danger}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Taux de réussite</p>
                  <p className="text-xl md:text-2xl font-bold text-green-500">
                    {mountain.stats.successRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Taux de mortalité</p>
                  <p className="text-xl md:text-2xl font-bold text-destructive">
                    {mountain.stats.deathRate}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4 md:pt-6">
                <p className="text-xs md:text-sm mb-3 md:mb-4">
                  Prêt à vous lancer ? Consultez les détails complets de la montagne.
                </p>
                <Link href={`/mountains/${mountain.id}`}>
                  <Button variant="outline" className="w-full text-sm md:text-base">
                    Voir les détails complets
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
