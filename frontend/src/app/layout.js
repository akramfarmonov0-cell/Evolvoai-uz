import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import StructuredData from '@/components/StructuredData'
import PWAInstall from '@/components/PWAInstall'
import OfflineIndicator from '@/components/OfflineIndicator'
import PushNotifications from '@/components/PushNotifications'
import { ThemeProvider } from '@/contexts/ThemeContext'
import DarkModeProvider from '@/components/DarkModeProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://evolvoai.uz'),
  title: {
    default: 'EvolvoAI - Web Sayt, Telegram Bot, AI Chatbot Yaratish | O\'zbekiston #1',
    template: '%s | EvolvoAI - IT Xizmatlari O\'zbekistonda'
  },
  description: 'EvolvoAI - O\'zbekistonda zamonaviy web saytlar, telegram botlar, AI chatbotlar yaratish va biznes jarayonlarini avtomatlashtirish. Toshkentda professional IT xizmatlari. ☎️ +998 97 477 12 29. 500+ mamnun mijozlar.',
  keywords: [
    // Asosiy xizmatlar
    'web sayt yaratish toshkent',
    'telegram bot yaratish o\'zbekiston',
    'chatbot yaratish',
    'AI chatbot',
    'biznes avtomatlashtirish',
    
    // Web development
    'web dasturlash xizmati',
    'sayt qilish',
    'internet magazin yaratish',
    'korporativ sayt',
    'landing page yaratish',
    'SEO optimallashtirilgan sayt',
    
    // Telegram
    'telegram bot dasturlash',
    'telegram bot narxi',
    'avtomatik telegram bot',
    'telegram mini app',
    
    // AI va Automation
    'sun\'iy intellekt chatbot',
    'AI integratsiya',
    'biznes jarayonlarini avtomatlashtirish',
    'CRM sistema yaratish',
    'avtomatik savdo boti',
    
    // Mobile
    'mobil ilova yaratish',
    'android ilova',
    'iOS ilova',
    
    // Location
    'IT kompaniya toshkent',
    'dasturiy ta\'minot o\'zbekiston',
    'web studiya toshkent',
    'IT xizmatlari uzbekistan',
    
    // Tech stack
    'React sayt yaratish',
    'Next.js dasturlash',
    'Node.js backend',
    'AI GPT chatbot',
    
    // Services
    'e-commerce platforma',
    'onlayn do\'kon yaratish',
    'to\'lov tizimi integratsiya',
    'Click, Payme integratsiya'
  ],
  authors: [{ name: 'EvolvoAI', url: 'https://evolvoai-main.vercel.app' }],
  creator: 'EvolvoAI IT Company',
  publisher: 'EvolvoAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://evolvoai.uz',
    siteName: 'EvolvoAI - IT Xizmatlari',
    title: 'EvolvoAI - Web Sayt, Telegram Bot, AI Chatbot Yaratish',
    description: 'O\'zbekistonda professional IT xizmatlari: Web sayt yaratish, Telegram bot dasturlash, AI chatbot, biznes avtomatlashtirish. Toshkent. ☎️ +998 97 477 12 29',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EvolvoAI - IT Xizmatlari O\'zbekistonda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvolvoAI - Web Sayt, Telegram Bot, AI Chatbot',
    description: 'Professional IT xizmatlari O\'zbekistonda. Web sayt, Telegram bot, AI chatbot yaratish',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'oBW8_eXRTNmBH_V0h0JfkSUkhxGeh618ukJ7bWtIhPQ',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://evolvoai.uz',
    languages: {
      'uz-UZ': process.env.NEXT_PUBLIC_SITE_URL || 'https://evolvoai.uz',
    },
  },
  category: 'technology',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EvolvoAI',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <DarkModeProvider>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
              {children}
            </main>
            <Footer />
            <Chatbot />
            <PWAInstall />
            <OfflineIndicator />
            <PushNotifications />
          </DarkModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}