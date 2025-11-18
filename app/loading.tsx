"use client"

import { Mountain, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Mountain Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="relative"
        >
          <Mountain className="h-20 w-20 text-primary" />
        </motion.div>

        {/* Spinning Loader */}
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
          <p className="text-gray-400 text-lg font-medium">Chargement...</p>
        </div>

        {/* Animated Progress Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
