"use client"

import { useLanguage } from "@/contexts/language-context"
import { languages, Language } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-white hover:text-primary transition-colors"
          aria-label="Change language"
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          <span className="text-lg">{languages[language].flag}</span>
          <span className="hidden md:inline">{languages[language].name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-white/10">
        {(Object.keys(languages) as Language[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`text-white hover:bg-white/10 cursor-pointer flex items-center gap-2 ${
              language === lang ? "bg-white/5" : ""
            }`}
          >
            <span className="text-lg">{languages[lang].flag}</span>
            <span>{languages[lang].name}</span>
            {language === lang && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
