import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import StructuredData from '@/components/StructuredData'
import PWAInstall from '@/components/PWAInstall'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  metadataBase: new URL('https://evolvoai.uz'),
  title: {
    default: 'EvolvoAI - Web Sayt, Telegram Bot, AI Chatbot Yaratish | O\'zbekiston',
    template: '%s | EvolvoAI - IT Xizmatlari O\'zbekistonda'
  },
  description: 'EvolvoAI - O\'zbekistonda zamonaviy web saytlar, telegram botlar, AI chatbotlar yaratish va biznes jarayonlarini avtomatlashtirish. Toshkentda professional IT xizmatlari. ☎️ +998 97 477 12 29',
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
  authors: [{ name: 'EvolvoAI', url: 'https://evolvoai.uz' }],
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
    url: 'https://evolvoai.uz',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://evolvoai.uz',
    languages: {
      'uz-UZ': 'https://evolvoai.uz',
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <PWAInstall />
      </body>
    </html>
  )
}