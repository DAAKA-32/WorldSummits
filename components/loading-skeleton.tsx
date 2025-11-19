"use client"

import { Card } from "@/components/ui/card"

export function MountainCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black">
      {/* Image skeleton */}
      <div className="relative h-48 w-full bg-gray-800 animate-pulse">
        <div className="absolute top-3 right-3">
          <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-1/2 animate-pulse" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="h-8 bg-gray-800 rounded w-24 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded w-16 animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-800 rounded w-5/6 animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-800 rounded animate-pulse" />
      </div>
    </Card>
  )
}

export function MountainGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MountainCardSkeleton key={i} />
      ))}
    </div>
  )
}
