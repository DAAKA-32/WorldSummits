import { getContinents, getMountainsByContinent } from "@/lib/mountains"
import { ContinentCarousel } from "@/components/continent-carousel"

export function ContinentSection() {
  const continents = getContinents()

  return (
    <section className="py-20 bg-linear-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Sommets par <span className="text-primary">Continent</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Découvrez les montagnes les plus emblématiques de chaque continent
          </p>
        </div>

        <div className="space-y-16">
          {continents.map((continent) => {
            const mountains = getMountainsByContinent(continent)
            return (
              <ContinentCarousel
                key={continent}
                continent={continent}
                mountains={mountains}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
