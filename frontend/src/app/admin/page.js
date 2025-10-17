'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Briefcase, Users, Settings, Rss } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

    if (!token) {
      router.replace('/admin/login')
    } else {
      setAuthorized(true)
    }

    setAuthChecked(true)
  }, [router])

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  const panels = [
    {
      title: 'Postlar',
      description: 'Blog postlarini boshqarish, yangi post qo\'shish va tahrirlash',
      icon: <FileText className="w-6 h-6 text-primary-600" />,
      href: '/admin/posts',
      count: '12 ta post'
    },
    {
      title: 'Portfolio',
      description: 'Loyihalar portfoliolarini qo\'shish va yangilash',
      icon: <Briefcase className="w-6 h-6 text-primary-600" />,
      href: '/admin/portfolio',
      count: 'Tez kunda'
    },
    {
      title: 'Murojaatlar',
      description: 'Mijozlarning murojaatlari va ro\'yxatdan o\'tishlarini nazorat qilish',
      icon: <Users className="w-6 h-6 text-primary-600" />,
      href: '/admin/contacts',
      count: 'Yangi xabarlar'
    },
    {
      title: 'RSS Yangiliklar',
      description: 'Tashqi manbalardan yangiliklar olish va AI bilan qayta ishlash',
      icon: <Rss className="w-6 h-6 text-primary-600" />,
      href: '/admin/rss',
      count: 'Avtomatik'
    },
    {
      title: 'Sozlamalar',
      description: 'Admin ma\'lumotlari, xavfsizlik va boshqa sozlamalar',
      icon: <Settings className="w-6 h-6 text-primary-600" />,
      href: '/admin/settings',
      count: ''
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm font-semibold">Administrator boshqaruv paneli</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Xush kelibsiz, Admin!</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Bu yerda siz blog postlari, portfolio loyihalari va foydalanuvchi murojaatlarini boshqarishingiz mumkin.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token')
              router.replace('/admin/login')
            }}
            className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            Chiqish
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {panels.map((panel) => (
            <Link key={panel.href} href={panel.href} className="group">
              <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition transform group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    {panel.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{panel.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{panel.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-primary-600 font-medium">
                  Ko\'rish
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
