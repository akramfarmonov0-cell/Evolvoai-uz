'use client'

import { useEffect, useState } from 'react'
import { X, Download } from 'lucide-react'

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Don't show if already dismissed
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      if (!dismissed) {
        setShowInstallPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('pwa-install-dismissed', 'true')
      // Allow showing again after 7 days
      setTimeout(() => {
        localStorage.removeItem('pwa-install-dismissed')
      }, 7 * 24 * 60 * 60 * 1000)
    }
  }

  // Show mini icon if prompt was dismissed (only on client-side)
  const dismissed = typeof window !== 'undefined' ? localStorage.getItem('pwa-install-dismissed') : null
  
  if (!showInstallPrompt && dismissed && deferredPrompt) {
    return (
      <button
        onClick={() => setShowInstallPrompt(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-primary-600 to-blue-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-[90] hover:scale-110 group"
        aria-label="PWA o'rnatish"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="absolute -bottom-8 left-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          O'rnatish
        </span>
      </button>
    )
  }
  
  if (!showInstallPrompt) return null

  return (
    <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-auto sm:max-w-sm md:max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 z-[90] border border-gray-200 dark:border-slate-700 animate-slide-down">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition"
        aria-label="Yopish"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-primary-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
          <Download className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
            📱 Ilovani O'rnating
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
            EvolvoAI'ni telefoningizga o'rnating va offline rejimda ishlating!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-700 transition active:scale-95"
            >
              O'rnatish
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-gray-600 text-xs sm:text-sm font-medium hover:text-gray-800 transition"
            >
              Yo'q
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
