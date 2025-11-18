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
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-blue-500/30 p-0 overflow-hidden">
        {/* Background effet */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="relative z-10 p-8">
          {/* Header avec animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>

            <DialogTitle className="text-3xl md:text-4xl font-black text-white mb-3">
              Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">WorldSummit</span>
            </DialogTitle>

            <DialogDescription className="text-gray-400 text-base md:text-lg">
              Votre compagnon ultime pour explorer les plus hauts sommets du monde
            </DialogDescription>
          </motion.div>

          {/* Cards avec les 3 points clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-4 text-center hover:border-blue-500/40 transition-all"
            >
              <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Explorez</h3>
              <p className="text-gray-400 text-sm">
                Découvrez les sommets emblématiques
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg p-4 text-center hover:border-cyan-500/40 transition-all"
            >
              <div className="w-12 h-12 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                <GitCompare className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Comparez</h3>
              <p className="text-gray-400 text-sm">
                Analysez jusqu'à 4 sommets
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-4 text-center hover:border-blue-500/40 transition-all"
            >
              <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Planifiez</h3>
              <p className="text-gray-400 text-sm">
                Préparez votre ascension
              </p>
            </motion.div>
          </div>

          {/* Message et bouton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-4"
          >
            <p className="text-gray-400 text-sm">
              Des données précises, des visualisations interactives et une interface moderne
            </p>

            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-6 text-lg shadow-lg shadow-blue-600/30"
            >
              Commencer l'exploration
            </Button>

            <button
              onClick={handleClose}
              className="text-gray-500 text-sm hover:text-gray-400 transition-colors"
            >
              Ne plus afficher ce message
            </button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
