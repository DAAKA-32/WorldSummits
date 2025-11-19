"use client"

import { Mountain, Loader2, MapPin, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function MountainLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-linear-to-b from-black via-gray-950 to-black">
      {/* Hero Skeleton */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/85 to-black/60 animate-pulse" />

        <div className="container mx-auto px-4 pb-12 relative z-20">
          <div className="max-w-4xl space-y-4">
            <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-16 w-96 bg-gray-800 rounded animate-pulse" />
            <div className="flex gap-6">
              <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-white/10 bg-linear-to-br from-gray-900 to-black">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-800 rounded-lg animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-white/10 bg-linear-to-br from-gray-900 to-black">
              <CardHeader>
                <div className="h-7 w-32 bg-gray-800 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget Skeleton */}
            <Card className="border-white/10 bg-linear-to-br from-gray-900 to-black">
              <CardHeader>
                <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-24 w-full bg-gray-800 rounded animate-pulse" />
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="h-20 bg-gray-800 rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Cards Skeleton */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-linear-to-br from-gray-900 to-black">
                <CardHeader>
                  <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Loading Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3"
        >
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <p className="text-white font-medium">Chargement du sommet...</p>
        </motion.div>
      </div>
    </div>
  )
}
