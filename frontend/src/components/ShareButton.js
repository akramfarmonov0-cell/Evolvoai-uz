'use client'

import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'

export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: title || 'EvolvoAI - IT Xizmatlari',
      text: text || 'Professional IT xizmatlari O\'zbekistonda',
      url: url || window.location.href
    }

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
          setShowFallback(true)
        }
      }
    } else {
      // Fallback to copy to clipboard
      setShowFallback(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      const textToCopy = `${title || 'EvolvoAI'}\n${text || ''}\n${url || window.location.href}`
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowFallback(false)
      }, 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  if (showFallback) {
    return (
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Nusxalandi!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Nusxalash</span>
            </>
          )}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      aria-label="Ulashish"
    >
      <Share2 className="w-4 h-4" />
      <span>Ulashish</span>
    </button>
  )
}
