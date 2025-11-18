import { useRef, useState, useEffect, useCallback } from "react"

interface UseInfiniteCarouselProps {
  itemCount: number
  autoScrollInterval?: number
  cardWidth?: number
  gap?: number
  enableInfiniteScroll?: boolean
}

export function useInfiniteCarousel({
  itemCount,
  autoScrollInterval = 5000,
  cardWidth = 320,
  gap = 24,
  enableInfiniteScroll = true,
}: UseInfiniteCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Calculer la position de scroll pour un index donné
  const getScrollPosition = useCallback(
    (index: number) => {
      return index * (cardWidth + gap)
    },
    [cardWidth, gap]
  )

  // Défiler vers un index spécifique
  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      if (!scrollContainerRef.current) return

      const scrollPosition = getScrollPosition(index)
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: smooth ? "smooth" : "auto",
      })
      setCurrentIndex(index)
    },
    [getScrollPosition]
  )

  // Navigation
  const scrollNext = useCallback(() => {
    if (!scrollContainerRef.current) return

    if (!enableInfiniteScroll && currentIndex >= itemCount - 1) {
      // Si pas de boucle infinie et on est à la fin, ne rien faire
      return
    }

    // Scroll d'une largeur de carte vers la droite
    const scrollAmount = cardWidth + gap
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })

    setCurrentIndex(currentIndex + 1)
  }, [currentIndex, enableInfiniteScroll, itemCount, cardWidth, gap])

  const scrollPrev = useCallback(() => {
    if (!scrollContainerRef.current) return

    if (!enableInfiniteScroll && currentIndex <= 0) {
      // Si pas de boucle infinie et on est au début, ne rien faire
      return
    }

    // Scroll d'une largeur de carte vers la gauche
    const scrollAmount = cardWidth + gap
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })

    setCurrentIndex(currentIndex - 1)
  }, [currentIndex, enableInfiniteScroll, cardWidth, gap])

  // Auto-scroll
  useEffect(() => {
    // Ne pas auto-scroll si désactivé (interval = 0) ou si isAutoScrolling = false
    if (!isAutoScrolling || autoScrollInterval === 0) return

    // Si on est en mode non-infini et qu'on est à la fin, ne pas auto-scroll
    if (!enableInfiniteScroll && currentIndex >= itemCount - 1) {
      return
    }

    autoScrollTimerRef.current = setInterval(() => {
      scrollNext()
    }, autoScrollInterval)

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [isAutoScrolling, scrollNext, autoScrollInterval, enableInfiniteScroll, currentIndex, itemCount])

  // Pause auto-scroll au survol
  const handleMouseEnter = useCallback(() => {
    setIsAutoScrolling(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsAutoScrolling(true)
  }, [])

  // Navigation clavier - désactivée pour éviter que tous les carousels bougent en même temps
  // La navigation se fait uniquement via les boutons de navigation

  // Gestion du swipe tactile et drag souris
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    setIsAutoScrolling(false)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      e.preventDefault()

      const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0)
      const walk = (x - startX) * 2 // Multiplicateur pour la sensibilité
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)

    // Snap vers la card la plus proche
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft
      const nearestIndex = Math.round(scrollPosition / (cardWidth + gap))
      scrollToIndex(nearestIndex)
    }

    // Reprendre l'auto-scroll après 2 secondes
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 2000)
  }, [cardWidth, gap, scrollToIndex])

  const handlePointerLeave = useCallback(() => {
    if (isDragging) {
      handlePointerUp()
    }
  }, [isDragging, handlePointerUp])

  // Gérer le défilement infini (seulement si activé)
  useEffect(() => {
    if (!enableInfiniteScroll) return

    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const threshold = cardWidth + gap

      // Si on est proche du début, sauter à la fin
      if (scrollPosition < threshold) {
        const newPosition = scrollPosition + itemCount * (cardWidth + gap)
        container.scrollTo({ left: newPosition, behavior: "auto" })
      }

      // Si on est proche de la fin, sauter au début
      if (scrollPosition > maxScroll - threshold) {
        const newPosition = scrollPosition - itemCount * (cardWidth + gap)
        container.scrollTo({ left: newPosition, behavior: "auto" })
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [enableInfiniteScroll, itemCount, cardWidth, gap])

  return {
    scrollContainerRef,
    currentIndex,
    scrollNext,
    scrollPrev,
    scrollToIndex,
    handleMouseEnter,
    handleMouseLeave,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    isDragging,
  }
}
