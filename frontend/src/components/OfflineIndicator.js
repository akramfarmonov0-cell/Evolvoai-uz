'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)
      
      if (!online) {
        setShowIndicator(true)
      } else {
        // Hide indicator after 2 seconds when back online
        setTimeout(() => setShowIndicator(false), 2000)
      }
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-20 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-[70] ${
          isOnline 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        } rounded-lg shadow-lg p-3`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {isOnline ? (
              <Wifi className="w-5 h-5" />
            ) : (
              <WifiOff className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">
              {isOnline ? '🌐 Internetga ulandi' : '📵 Internet aloqasi yo\'q'}
            </p>
            <p className="text-xs opacity-90">
              {isOnline 
                ? 'Barcha funksiyalar mavjud' 
                : 'Offline rejimda ishlayapti'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
