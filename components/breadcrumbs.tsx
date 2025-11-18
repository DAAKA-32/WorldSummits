"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-300 hover:text-primary transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <Fragment key={index}>
            <li>
              <ChevronRight className="h-4 w-4 text-gray-600" aria-hidden="true" />
            </li>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
