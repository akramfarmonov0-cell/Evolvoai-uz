'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Copy, Check } from 'lucide-react'

export default function SocialShare({ title, text, url, hashtags = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || 'EvolvoAI - IT Xizmatlari'
  const shareText = text || 'Professional IT xizmatlari O\'zbekistonda'
  const shareHashtags = hashtags.join(',')

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle + ' - ' + shareText)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle + ' - ' + shareText)}&hashtags=${shareHashtags}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle + ' - ' + shareText)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ]

  const handleSocialShare = (socialUrl) => {
    window.open(socialUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  const copyToClipboard = async () => {
    try {
      const textToCopy = `${shareTitle}\n${shareText}\n${shareUrl}`
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        aria-label="Ijtimoiy tarmoqlarda ulashish"
      >
        <Share2 className="w-4 h-4" />
        <span>Ulashish</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute bottom-full mb-2 left-0 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 min-w-[280px]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">
              Ijtimoiy tarmoqlarda ulashing
            </h3>
            
            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <button
                    key={social.name}
                    onClick={() => handleSocialShare(social.url)}
                    className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg transition-colors text-sm ${social.color}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{social.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Copy Link */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Linkni nusxalash</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
