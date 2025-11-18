"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CarouselCard3DProps {
  children: React.ReactNode
  index: number
}

export function CarouselCard3D({ children, index }: CarouselCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCenter, setIsCenter] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Calculer si la card est proche du centre
          const rect = entry.boundingClientRect
          const viewportCenter = window.innerWidth / 2
          const cardCenter = rect.left + rect.width / 2
          const distanceFromCenter = Math.abs(viewportCenter - cardCenter)
          const maxDistance = window.innerWidth / 2

          // Calculer le progrès (1 = au centre, 0 = loin du centre)
          const progress = Math.max(0, 1 - distanceFromCenter / maxDistance)
          setScrollProgress(progress)

          // Card est considérée au centre si elle est assez proche
          setIsCenter(progress > 0.5)
        })
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        root: null,
        rootMargin: "0px",
      }
    )

    observer.observe(card)

    // Mettre à jour pendant le scroll
    const handleScroll = () => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      const viewportCenter = window.innerWidth / 2
      const cardCenter = rect.left + rect.width / 2
      const distanceFromCenter = Math.abs(viewportCenter - cardCenter)
      const maxDistance = window.innerWidth / 2
      const progress = Math.max(0, 1 - distanceFromCenter / maxDistance)
      setScrollProgress(progress)
      setIsCenter(progress > 0.5)
    }

    const scrollContainer = card.parentElement
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      observer.disconnect()
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Calculer les transformations 3D basées sur la position
  const scale = 0.85 + scrollProgress * 0.15 // De 0.85 à 1
  const rotateY = (scrollProgress - 0.5) * -15 // Rotation légère
  const opacity = 0.75 + scrollProgress * 0.25 // De 0.75 à 1 (plus visible sur les côtés)
  const zIndex = Math.round(scrollProgress * 100)

  return (
    <motion.div
      ref={cardRef}
      className="flex-none w-[320px] snap-start"
      style={{
        transform: `scale(${scale}) rotateY(${rotateY}deg) translateZ(${scrollProgress * 50}px)`,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      animate={{
        y: isCenter ? 0 : 10,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div
        className={`
          relative
          transition-all duration-300
          ${
            isCenter
              ? "shadow-[0_0_50px_rgba(34,211,238,0.6),0_0_100px_rgba(34,211,238,0.3)]"
              : "shadow-[0_0_20px_rgba(34,211,238,0.25),0_0_40px_rgba(34,211,238,0.1)]"
          }
        `}
        style={{
          filter: isCenter ? "brightness(1.15) saturate(1.1)" : "brightness(1.05) saturate(0.95)",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
