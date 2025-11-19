import Link from "next/link"
import { Mountain, Linkedin, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-linear-to-b from-black to-gray-950">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Brand */}
          <div className="space-y-2 md:space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Mountain className="h-4 w-4 md:h-6 md:w-6 text-primary" />
              <span className="text-sm md:text-lg font-bold text-white">World<span className="text-primary">Summit</span></span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed hidden md:block">
              Explorez les plus hautes montagnes du monde avec des données précises et des visualisations immersives.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 md:space-y-4 hidden md:block">
            <h3 className="font-semibold text-white uppercase text-[10px] md:text-sm tracking-wider">Navigation</h3>
            <ul className="space-y-1 md:space-y-2">
              <FooterLink href="/">Sommets</FooterLink>
              <FooterLink href="/comparator">Comparateur</FooterLink>
              <FooterLink href="/about">À propos</FooterLink>
            </ul>
          </div>

          {/* Continents */}
          <div className="space-y-2 md:space-y-4 hidden md:block">
            <h3 className="font-semibold text-white uppercase text-[10px] md:text-sm tracking-wider">Continents</h3>
            <ul className="space-y-1 md:space-y-2">
              <FooterLink href="/?continent=Asia">Asie</FooterLink>
              <FooterLink href="/?continent=Europe">Europe</FooterLink>
              <FooterLink href="/?continent=North America">Amériques</FooterLink>
              <FooterLink href="/?continent=Africa">Afrique</FooterLink>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-2 md:space-y-4 col-span-2 md:col-span-1">
            <h3 className="font-semibold text-white uppercase text-[10px] md:text-sm tracking-wider">Contact</h3>
            <div className="flex gap-3 md:gap-4">
              <SocialLink href="https://www.linkedin.com/in/emilien-nepveu-58a38127a/" icon={<Linkedin className="h-4 w-4 md:h-5 md:w-5" />} />
              <SocialLink href="https://www.instagram.com/emilien_n_/" icon={<Instagram className="h-4 w-4 md:h-5 md:w-5" />} />
            </div>
            <a
              href="mailto:contact.emilien.corp@gmail.com"
              className="text-[10px] md:text-sm text-gray-400 hover:text-primary transition-colors block"
            >
              contact.emilien.corp@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t border-white/10 text-center text-[10px] md:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <span className="text-white font-medium">WorldSummit</span> • Données à titre éducatif</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[10px] md:text-sm text-gray-400 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-primary transition-colors"
    >
      {icon}
    </a>
  )
}
