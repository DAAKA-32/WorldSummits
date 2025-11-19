"use client"

import { Mountain, Continent } from "@/types/mountain"
import { MountainCard } from "./mountain-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { useInfiniteCarousel } from "@/hooks/use-infinite-carousel"
import { useEffect, useState } from "react"
import { CarouselCard3D } from "./carousel-card-3d"

interface ContinentCarouselProps {
  continent: Continent
  mountains: Mountain[]
}

export function ContinentCarousel({ continent, mountains }: ContinentCarouselProps) {
  const [mounted, setMounted] = useState(false)

  // Seuil pour activer le mode infini : 4 éléments minimum
  const MIN_ITEMS_FOR_INFINITE = 4
  const enableInfiniteScroll = mountains.length >= MIN_ITEMS_FOR_INFINITE

  // Créer un tableau infini en dupliquant les montagnes 3 fois (avant, milieu, après)
  // Uniquement si le mode infini est activé
  const infiniteMountains = enableInfiniteScroll
    ? [...mountains, ...mountains, ...mountains]
    : mountains

  const {
    scrollContainerRef,
    scrollNext,
    scrollPrev,
    handleMouseEnter,
    handleMouseLeave,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    isDragging,
    scrollToIndex,
  } = useInfiniteCarousel({
    itemCount: mountains.length,
    // Désactiver l'auto-scroll si moins de 4 éléments
    autoScrollInterval: enableInfiniteScroll ? 5000 : 0,
    cardWidth: 320,
    gap: 24,
    enableInfiniteScroll,
  })

  // Initialiser la position au milieu (deuxième série de cards)
  // Uniquement en mode infini
  useEffect(() => {
    if (!mounted && scrollContainerRef.current && enableInfiniteScroll) {
      scrollToIndex(mountains.length, false)
      setMounted(true)
    } else if (!mounted && !enableInfiniteScroll) {
      setMounted(true)
    }
  }, [mounted, mountains.length, scrollToIndex, scrollContainerRef, enableInfiniteScroll])

  if (mountains.length === 0) return null

  // Affichage simple pour les petits carousels (≤ 4 éléments)
  if (!enableInfiniteScroll) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Header centré sans flèches */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {continent}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {mountains.length} sommet{mountains.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Affichage simple en grille centrée */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-fit">
            {mountains.map((mountain, index) => (
              <div key={mountain.id}>
                <MountainCard mountain={mountain} index={index} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    )
  }

  // Affichage carousel avec effets 3D pour les grands carousels (> 4 éléments)
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Header avec navigation */}
      <div className="relative flex items-center justify-center">
        {/* Titre centré */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {continent}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {mountains.length} sommet{mountains.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Navigation Buttons - positionnés à droite */}
        <div className="absolute right-0 flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="h-10 w-10 border border-white/20 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="h-10 w-10 border border-white/20 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel Container avec perspective 3D */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "2000px" }}
      >
        {/* Gradient fades sur les côtés */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isDragging ? "grabbing" : "grab",
            transformStyle: "preserve-3d",
          }}
        >
          {infiniteMountains.map((mountain, index) => (
            <CarouselCard3D key={`${mountain.id}-${index}`} index={index}>
              <MountainCard mountain={mountain} index={index % mountains.length} />
            </CarouselCard3D>
          ))}
        </div>
      </div>

      {/* Instructions subtiles */}
      <div className="text-center text-gray-500 text-xs">
        Glissez pour naviguer entre les sommets
      </div>
    </motion.section>
  )
}
