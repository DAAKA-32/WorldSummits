"use client"

import { Mountain } from "@/types/mountain"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mountain as MountainIcon, MapPin, ArrowRight, ImageOff } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, memo } from "react"

interface MountainCardProps {
  mountain: Mountain
  index?: number
}

// Tiny blur placeholder (base64 encoded 10x10 gray image)
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a1a" offset="20%" />
      <stop stop-color="#2a2a2a" offset="50%" />
      <stop stop-color="#1a1a1a" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a1a" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const MountainCardComponent = ({ mountain, index = 0 }: MountainCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full group"
    >
      <Card className="h-full overflow-hidden border border-white/10 transition-all duration-300 bg-linear-to-br from-gray-900 to-black hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Image */}
        <div className="relative h-32 md:h-48 w-full overflow-hidden bg-black">
          {mountain.images[0] && !imageError ? (
            <>
              <Image
                src={mountain.images[0]}
                alt={`${mountain.name} - ${mountain.stats.altitude}m peak in ${mountain.range}`}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading={index < 3 ? "eager" : "lazy"}
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-gray-900 to-black">
              <ImageOff className="h-12 w-12 text-gray-700 mb-2" />
              <p className="text-xs text-gray-600">Image non disponible</p>
            </div>
          )}

          {/* Badge on image */}
          <div className="absolute top-2 right-2 md:top-3 md:right-3">
            <Badge variant="secondary" className="bg-black/80 backdrop-blur-sm text-white border-white/20 text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1">
              {mountain.continent}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-5 flex flex-col h-full">
          <div className="flex-1 space-y-2 md:space-y-4">
            {/* Header */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-sm md:text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                {mountain.name}
              </h3>
              <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-gray-400">
                <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span className="truncate">{mountain.country}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-base md:text-2xl font-bold text-white">{mountain.stats.altitude.toLocaleString()}<span className="text-primary text-sm md:text-lg">m</span></span>
              <span className="text-xs text-gray-600 hidden md:inline">•</span>
              <Badge variant="outline" className="border-white/20 text-gray-400 text-xs hidden md:inline-flex">
                {mountain.expedition.difficulty}
              </Badge>
            </div>

            {/* Description - hidden on mobile */}
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed hidden md:block">
              {mountain.description}
            </p>
          </div>

          {/* Button - Always at bottom */}
          <Link href={`/mountains/${mountain.id}`} className="block mt-2 md:mt-4">
            <Button
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-primary hover:text-white hover:border-primary group/btn text-xs md:text-sm py-2 md:py-3"
            >
              <span className="md:hidden">Détails</span>
              <span className="hidden md:inline">Voir les détails</span>
              <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MountainCard = memo(MountainCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.mountain.id === nextProps.mountain.id &&
    prevProps.index === nextProps.index
  )
})
