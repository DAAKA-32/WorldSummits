"use client"

import { motion } from "framer-motion"
import { Mountain, TrendingUp, Users, Globe } from "lucide-react"
import { getMountains } from "@/lib/mountains"

export function StatsSection() {
  const mountains = getMountains()

  const stats = [
    {
      icon: Mountain,
      value: mountains.length,
      label: "Montagnes répertoriées",
      description: "Des plus hauts sommets du monde",
    },
    {
      icon: TrendingUp,
      value: Math.max(...mountains.map((m) => m.stats.altitude)),
      suffix: "m",
      label: "Altitude maximale",
      description: "Mount Everest, le toit du monde",
    },
    {
      icon: Users,
      value: mountains.reduce((acc, m) => acc + m.firstAscent.climbers.length, 0),
      suffix: "+",
      label: "Alpinistes pionniers",
      description: "Héros de la première ascension",
    },
    {
      icon: Globe,
      value: 6,
      label: "Continents explorés",
      description: "Une couverture mondiale",
    },
  ]

  return (
    <section className="py-20 bg-linear-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">En <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Chiffres</span></h2>
          <p className="text-lg text-orange-200/80 max-w-2xl mx-auto">
            <span className="font-semibold text-orange-300">WorldSummits</span> en quelques statistiques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl border-2 border-orange-500/40 hover:border-orange-500 transition-all duration-300 bg-black/60 hover:shadow-2xl hover:shadow-orange-500/20 backdrop-blur-md">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors border border-orange-500/50">
                    <stat.icon className="h-8 w-8 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-orange-400">
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-lg font-semibold mt-2 text-orange-300">{stat.label}</div>
                    <div className="text-sm text-orange-200/70 mt-1">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
