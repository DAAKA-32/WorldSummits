"use client"

import { Mountain } from "@/types/mountain"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mountain as MountainIcon,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  Clock,
  Backpack,
  ArrowLeft,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MountainStats } from "./mountain-stats"
import { Breadcrumbs } from "./breadcrumbs"
import { BackToTop } from "./back-to-top"
import { ShareButton } from "./share-button"
import { WeatherWidget } from "./weather-widget"

interface MountainDetailClientProps {
  mountain: Mountain
}

export function MountainDetailClient({ mountain }: MountainDetailClientProps) {
  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-12 md:pb-16 bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Back Button & Share - Fixed at top */}
      <div className="fixed top-20 md:top-24 left-3 right-3 md:left-4 md:right-4 z-50 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <Button variant="outline" className="backdrop-blur-md bg-black/80 border-white/10 hover:border-primary/50 hover:bg-black/90 font-medium gap-2 text-white hover:text-primary transition-all min-h-[40px] md:min-h-[44px] text-sm md:text-base px-3 md:px-4">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Retour</span>
          </Button>
        </Link>
        <div className="pointer-events-auto">
          <ShareButton
            title={`${mountain.name} - ${mountain.stats.altitude}m`}
            text={`Découvrez ${mountain.name}, un sommet de ${mountain.stats.altitude}m situé en ${mountain.country}`}
          />
        </div>
      </div>

      {/* Breadcrumbs - Below header on desktop */}
      <div className="container mx-auto px-4 pt-4 hidden md:block">
        <Breadcrumbs
          items={[
            { label: "Sommets", href: "/" },
            { label: mountain.name }
          ]}
        />
      </div>

      {/* Hero Section with Real Image */}
      <section className="relative h-[50vh] md:h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        {mountain.images[0] && (
          <div className="absolute inset-0">
            <Image
              src={mountain.images[0]}
              alt={mountain.name}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60 z-10" />

        <div className="container mx-auto px-3 md:px-4 pb-6 md:pb-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Badge variant="secondary" className="mb-3 md:mb-4 backdrop-blur-md bg-black/60 border-white/20 text-white uppercase tracking-wider text-[10px] md:text-xs">
              {mountain.continent}
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-none">
              {mountain.name}
            </h1>
            <div className="flex flex-wrap gap-3 md:gap-6 text-gray-300 text-sm md:text-lg">
              <div className="flex items-center gap-1.5 md:gap-2">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span>{mountain.country}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <MountainIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span className="font-bold text-white">{mountain.stats.altitude.toLocaleString()}<span className="text-primary">m</span></span>
              </div>
              <Badge variant="outline" className="border-white/30 text-white uppercase tracking-wider text-[10px] md:text-xs">
                {mountain.expedition.difficulty}
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-3 md:px-4 -mt-6 md:-mt-8 relative z-30">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-12">
          <StatsCard
            icon={TrendingUp}
            label="Taux de réussite"
            value={`${mountain.stats.successRate}%`}
            variant="success"
          />
          <StatsCard
            icon={AlertTriangle}
            label="Taux de mortalité"
            value={`${mountain.stats.deathRate}%`}
            variant="danger"
          />
          <StatsCard
            icon={Clock}
            label="Durée moyenne"
            value={mountain.stats.averageDuration ? `${mountain.stats.averageDuration} jours` : ((mountain.stats as any).averageClimbDuration || 'N/A')}
          />
          {mountain.stats.firstAscentYear && (
            <StatsCard
              icon={Calendar}
              label="Première ascension"
              value={mountain.stats.firstAscentYear.toString()}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {/* Description */}
            <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg md:text-2xl font-bold text-white">À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {mountain.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-white/10">
                <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-sm">Statistiques</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-sm">Histoire</TabsTrigger>
                <TabsTrigger value="expedition" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-sm">Expédition</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-4 md:mt-6">
                <MountainStats mountain={mountain} />
              </TabsContent>

              <TabsContent value="history" className="mt-4 md:mt-6">
                <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-2xl font-bold text-white">Première ascension</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <span className="font-medium text-white text-sm md:text-base">
                        {new Date(mountain.firstAscent.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Separator className="bg-white/10" />
                    <div>
                      <h4 className="font-bold mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-base md:text-lg text-white">
                        <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        Alpinistes pionniers
                      </h4>
                      <ul className="space-y-1.5 md:space-y-2">
                        {mountain.firstAscent.climbers.map((climber, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary" />
                            <span className="text-gray-300 text-sm md:text-base">
                              {climber.name}
                              {climber.nationality && (
                                <span className="text-gray-500 ml-1 md:ml-2 text-xs md:text-sm">
                                  ({climber.nationality})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {mountain.facts && mountain.facts.length > 0 && (
                      <div>
                        <Separator className="bg-white/10 my-3 md:my-4" />
                        <h4 className="font-bold mb-2 md:mb-3 text-base md:text-lg text-white">Faits marquants</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                          {mountain.facts.map((fact, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0" />
                              <span className="text-gray-400 text-sm md:text-base">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expedition" className="mt-4 md:mt-6">
                <div className="space-y-4 md:space-y-6">
                  <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-2xl font-bold text-white">Informations pratiques</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-4">
                      <div>
                        <h4 className="font-bold mb-2 md:mb-3 text-white text-sm md:text-base">Meilleures saisons</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {mountain.expedition.bestSeasons.map((season) => (
                            <Badge key={season} variant="secondary" className="uppercase tracking-wider bg-white/10 text-white border-white/20 text-[10px] md:text-xs">
                              {season}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator className="bg-white/10" />
                      {mountain.expedition.estimatedBudget && (
                        <>
                          <div>
                            <h4 className="font-bold mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-white text-sm md:text-base">
                              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                              Budget estimé
                            </h4>
                            <p className="text-xl md:text-3xl font-bold text-white">
                              {mountain.expedition.estimatedBudget.min.toLocaleString()} -{" "}
                              {mountain.expedition.estimatedBudget.max.toLocaleString()}{" "}
                              <span className="text-primary">{mountain.expedition.estimatedBudget.currency}</span>
                            </p>
                          </div>
                          <Separator className="bg-white/10" />
                        </>
                      )}
                      <div>
                        <h4 className="font-bold mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-white text-sm md:text-base">
                          <Backpack className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          Équipement requis
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
                          {mountain.expedition.requiredEquipment.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary" />
                              <span className="text-xs md:text-sm text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Weather Widget */}
            <WeatherWidget mountainId={mountain.id} />

            {/* Dangers Card */}
            <Card className="border-red-500/30 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 md:gap-2 text-red-400 text-base md:text-xl font-bold">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                  Dangers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 md:space-y-2">
                  {mountain.dangers.map((danger) => (
                    <li key={danger} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-red-500" />
                      <span className="text-xs md:text-sm text-gray-300">{danger}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base md:text-xl font-bold text-white">Localisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div>
                  <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">Pays</span>
                  <p className="font-medium text-white text-sm md:text-base">{mountain.country}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">Massif</span>
                  <p className="font-medium text-white text-sm md:text-base">{mountain.range}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">Coordonnées</span>
                  <p className="font-mono text-xs md:text-sm text-gray-400">
                    {mountain.coordinates.latitude.toFixed(4)}°N,{" "}
                    {mountain.coordinates.longitude.toFixed(4)}°E
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-primary/10 border-primary/30 backdrop-blur-md">
              <CardContent className="pt-4 md:pt-6">
                <h3 className="font-bold mb-2 text-base md:text-lg text-white">Planifier une expédition</h3>
                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
                  Prêt à relever le défi ? Explorez notre simulateur d'expédition.
                </p>
                <Link href={`/expedition/${mountain.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-sm md:text-base">
                    Simulateur d'expédition
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}

function StatsCard({
  icon: Icon,
  label,
  value,
  variant = "default",
}: {
  icon: any
  label: string
  value: string
  variant?: "default" | "success" | "danger"
}) {
  const colorClasses = {
    default: "text-primary bg-primary/10",
    success: "text-green-400 bg-green-500/10",
    danger: "text-red-400 bg-red-500/10",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md hover:border-primary/30 transition-all">
        <CardContent className="pt-3 md:pt-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`p-2 md:p-3 rounded-lg ${colorClasses[variant]}`}>
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div>
              <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
              <p className="text-base md:text-2xl font-bold text-white">{value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
