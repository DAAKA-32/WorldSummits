"use client"

import { Loader2, Backpack } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function ExpeditionLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-linear-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-6 w-96 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simulator Card Skeleton */}
            <Card className="border-white/10 bg-linear-to-br from-gray-900 to-black">
              <CardHeader>
                <div className="h-7 w-48 bg-gray-800 rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-5 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-linear-to-br from-gray-900 to-black">
                <CardHeader>
                  <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
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
          <p className="text-white font-medium">Chargement de l'expédition...</p>
        </motion.div>
      </div>
    </div>
  )
}
