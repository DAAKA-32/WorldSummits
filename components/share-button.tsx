"use client"

import { useState } from "react"
import { Share2, Check, Copy, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  text?: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareText = text || title

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, "_blank", "width=550,height=420")
  }

  const shareOnInstagram = () => {
    // Instagram doesn't support direct URL sharing via web, so we'll copy to clipboard
    // Users can then paste in Instagram app
    copyToClipboard()
  }

  // Use native share API if available (mobile)
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", err)
      }
    }
  }

  const hasNativeShare = typeof navigator !== "undefined" && navigator.share

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 hover:border-primary/50 min-h-[40px] md:min-h-[44px] text-sm md:text-base px-3 md:px-4"
          aria-label="Partager"
        >
          <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2" aria-hidden="true" />
          Partager
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-white/10">
        {hasNativeShare && (
          <>
            <DropdownMenuItem
              onClick={nativeShare}
              className="text-white hover:bg-white/10 cursor-pointer"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager...
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
          </>
        )}
        <DropdownMenuItem
          onClick={copyToClipboard}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-400" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copier le lien
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={shareOnTwitter}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareOnFacebook}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareOnInstagram}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          <Instagram className="h-4 w-4 mr-2" />
          Instagram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
