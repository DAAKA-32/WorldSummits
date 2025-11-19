"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Search, GitCompare, TrendingUp, X, Sparkles } from "lucide-react"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu le modal
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")

    if (!hasSeenWelcome) {
      // Afficher le modal après un court délai
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenWelcome", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-blue-500/30 p-0">
        {/* Background effet */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-50 p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="relative z-10 p-4 sm:p-6">
          {/* Header simplifié */}
          <div className="text-center mb-4 sm:mb-6">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
              Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">WorldSummits</span>
            </DialogTitle>

            <DialogDescription className="text-gray-400 text-sm sm:text-base">
              Explorez les plus hauts sommets du monde
            </DialogDescription>
          </div>

          {/* 3 points clés - Compact */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-sm">Explorez</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <GitCompare className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-sm">Comparez</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-sm">Planifiez</h3>
            </div>
          </div>

          {/* Bouton CTA */}
          <div className="space-y-3">
            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 sm:py-5 text-sm sm:text-base"
            >
              Commencer l'exploration
            </Button>

            <button
              onClick={handleClose}
              className="w-full text-gray-500 text-xs sm:text-sm hover:text-gray-400 transition-colors"
            >
              Ne plus afficher ce message
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
