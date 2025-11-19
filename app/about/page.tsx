"use client"

import { Mountain, Code, Database, Palette, Globe, TrendingUp, Heart, Users, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2400"
            alt="Dramatic mountain landscape at sunset with orange sky"
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-3 md:space-y-6"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-4">
              À propos de <span className="text-primary">WorldSummit</span>
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto px-4">
              Votre compagnon ultime pour explorer les plus hauts sommets du monde
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 bg-linear-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-6">Notre Mission</h2>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
              WorldSummit a été créé pour inspirer et informer les passionnés de montagne du monde entier.
              Notre objectif est de fournir des informations complètes et accessibles sur les plus hauts
              sommets de chaque continent, facilitant ainsi la planification d'expéditions et la découverte
              de nouveaux défis.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10 h-full">
                <CardContent className="p-4 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Précision</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Des données précises et vérifiées pour chaque sommet, incluant altitude, difficulté et première ascension.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10 h-full">
                <CardContent className="p-4 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Communauté</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Une plateforme pensée pour les alpinistes, randonneurs et passionnés de montagne de tous niveaux.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10 h-full">
                <CardContent className="p-4 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Passion</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Créé par des passionnés de montagne pour partager l'émerveillement des plus beaux sommets.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-linear-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-12">
            Fonctionnalités
          </h2>
          <div className="space-y-3 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">🔍 Recherche Avancée</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Filtrez par continent, difficulté, altitude et trouvez le sommet parfait pour votre prochaine aventure.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">⚖️ Comparateur Intelligent</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Comparez jusqu'à 4 sommets côte à côte pour analyser leurs caractéristiques et choisir votre défi.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">📊 Visualisations</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Des graphiques interactifs pour visualiser les hauteurs relatives et comparer les données facilement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-linear-to-br from-gray-900 to-black border-white/10">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">📱 Design Responsive</h3>
                  <p className="text-xs md:text-base text-gray-400">
                    Interface optimisée pour tous les appareils - desktop, tablette et mobile.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-linear-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-6">
              Prêt à explorer ?
            </h2>
            <p className="text-sm md:text-xl text-gray-300 mb-6 md:mb-8">
              Découvrez les sommets les plus emblématiques et planifiez votre prochaine ascension.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary/90 text-white text-sm md:text-base font-bold rounded-lg transition-all shadow-lg shadow-primary/50"
            >
              Explorer les sommets
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
