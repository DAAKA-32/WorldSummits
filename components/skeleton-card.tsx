"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface SkeletonCardProps {
  index?: number
}

export function SkeletonCard({ index = 0 }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black animate-pulse">
        {/* Image Skeleton */}
        <div className="relative h-48 w-full bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div className="h-6 bg-white/10 rounded w-3/4" />

          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-6 bg-white/5 rounded w-20" />
            <div className="h-6 bg-white/5 rounded w-16" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <div className="h-4 bg-white/5 rounded w-16 mb-2" />
              <div className="h-5 bg-white/10 rounded w-20" />
            </div>
            <div>
              <div className="h-4 bg-white/5 rounded w-20 mb-2" />
              <div className="h-5 bg-white/10 rounded w-24" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-5/6" />
          </div>

          {/* Button */}
          <div className="h-10 bg-white/5 rounded w-full mt-4" />
        </div>
      </Card>
    </motion.div>
  )
}
