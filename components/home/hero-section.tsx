"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2400"
          alt="Mountain background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/95 via-black/85 to-black" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              <span className="text-white">Conquérir les</span>
              <br />
              <span className="text-white">plus hauts </span>
              <span className="text-primary">sommets</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Explorez les montagnes les plus emblématiques du monde. Données précises, préparation rigoureuse.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/mountains">
              <Button size="lg" className="text-lg px-10 h-14 font-semibold group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-white">
                <Search className="mr-2 h-5 w-5" />
                Explorer les sommets
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/comparator">
              <Button size="lg" variant="outline" className="text-lg px-10 h-14 font-semibold border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30">
                Comparateur
              </Button>
            </Link>
          </motion.div>

          {/* Stats - Minimalist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-12 max-w-4xl mx-auto pt-20 border-t border-white/10"
          >
            <StatItem number="20+" label="Sommets référencés" />
            <StatItem number="6" label="Continents" />
            <StatItem number="8849m" label="Altitude max" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{number}</div>
      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider font-medium">{label}</div>
    </div>
  )
}
