"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative">
          <div className="relative h-10 w-[200px] sm:w-[240px] transition-transform group-hover:scale-105">
            <Image
              src="/logo-full.svg"
              alt="WorldSummits Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Image
              src="/logo-full.svg"
              alt=""
              fill
              className="object-contain object-left"
              aria-hidden="true"
            />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">{t('home')}</NavLink>
          <NavLink href="/comparator">{t('comparator')}</NavLink>
          <NavLink href="/about">{t('about')}</NavLink>
          <LanguageSelector />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                {t('home')}
              </MobileNavLink>
              <MobileNavLink href="/comparator" onClick={() => setMobileMenuOpen(false)}>
                {t('comparator')}
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
                {t('about')}
              </MobileNavLink>
              <div className="pt-4 border-t border-white/10">
                <LanguageSelector />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider py-2 border-b border-white/10 last:border-b-0"
    >
      {children}
    </Link>
  )
}
