'use client'

import { useEffect, useState } from 'react'
import { Bell, BellOff, X } from 'lucide-react'

export default function PushNotifications() {
  const [permission, setPermission] = useState('default')
  const [showPrompt, setShowPrompt] = useState(false)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !('Notification' in window)) return

    // Check current permission
    setPermission(Notification.permission)

    // Check if service worker is available
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      checkSubscription()
    }

    // Show prompt if permission is default and not dismissed
    const dismissed = localStorage.getItem('push-notifications-dismissed')
    if (Notification.permission === 'default' && !dismissed) {
      setTimeout(() => setShowPrompt(true), 5000) // Show after 5 seconds
    }
  }, [])

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      
      if (permission === 'granted') {
        await subscribeUser()
        setShowPrompt(false)
        
        // Show success notification
        new Notification('🎉 Bildirishnomalar yoqildi!', {
          body: 'Endi eng yangi yangiliklar va maqolalardan xabardor bo\'lasiz.',
          icon: '/icon-192x192.png',
          badge: '/icon-96x96.png'
        })
      }
    } catch (error) {
      console.error('Error requesting permission:', error)
    }
  }

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      
      // You would need to generate VAPID keys for production
      const vapidPublicKey = 'your-vapid-public-key-here'
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      })
      
      setSubscription(subscription)
      
      // Send subscription to your server
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      })
    } catch (error) {
      console.error('Error subscribing user:', error)
    }
  }

  const unsubscribeUser = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe()
        setSubscription(null)
        
        // Remove from server
        await fetch('/api/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription)
        })
      }
    } catch (error) {
      console.error('Error unsubscribing user:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('push-notifications-dismissed', 'true')
    
    // Allow showing again after 30 days
    setTimeout(() => {
      localStorage.removeItem('push-notifications-dismissed')
    }, 30 * 24 * 60 * 60 * 1000)
  }

  // Show mini toggle if permission is granted
  if (permission === 'granted' && !showPrompt) {
    return (
      <button
        onClick={subscription ? unsubscribeUser : subscribeUser}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-[55] hover:scale-110 group"
        aria-label={subscription ? 'Bildirishnomalarni o\'chirish' : 'Bildirishnomalarni yoqish'}
      >
        {subscription ? (
          <Bell className="w-5 h-5" />
        ) : (
          <BellOff className="w-5 h-5" />
        )}
        <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {subscription ? 'Bildirishnomalar yoqilgan' : 'Bildirishnomalar o\'chirilgan'}
        </span>
      </button>
    )
  }

  if (!showPrompt || permission !== 'default') return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm bg-white rounded-xl shadow-2xl p-4 z-[60] border border-gray-200">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition"
        aria-label="Yopish"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
          <Bell className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">
            🔔 Bildirishnomalar
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Eng yangi maqolalar va yangiliklar haqida xabardor bo'ling!
          </p>
          <div className="flex gap-2">
            <button
              onClick={requestPermission}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition active:scale-95"
            >
              Yoqish
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition"
            >
              Yo'q
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
