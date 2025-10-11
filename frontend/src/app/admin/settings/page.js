'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, ArrowLeft, Save, Key, User } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-semibold">Sozlamalar</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Sozlamalari</h1>
          <p className="text-gray-600 mt-2">
            Admin panel sozlamalarini boshqaring
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'profile'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profil
                </div>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'security'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Xavfsizlik
                </div>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profil Ma'lumotlari</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@evolvoai.com"
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Email'ni o'zgartirish uchun backend .env faylini yangilang
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ism
                  </label>
                  <input
                    type="text"
                    defaultValue="Administrator"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    Saqlash (Tez kunda)
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Xavfsizlik Sozlamalari</h2>
                
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">Parolni O'zgartirish</h3>
                  <p className="text-sm text-yellow-700 mb-4">
                    Parolni o'zgartirish uchun backend <code className="bg-yellow-100 px-2 py-0.5 rounded">.env</code> faylida <code className="bg-yellow-100 px-2 py-0.5 rounded">ADMIN_PASSWORD</code> qiymatini yangilang va serverni qayta ishga tushiring.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">JWT Token</h3>
                  <p className="text-sm text-blue-700">
                    Token maxfiy kaliti: Backend <code className="bg-blue-100 px-2 py-0.5 rounded">.env</code> faylida saqlanadi.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Token amal qilish muddati: 30 kun
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Faol Sessiyalar</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Joriy Sessiya</p>
                        <p className="text-sm text-gray-500">Windows · Chrome</p>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Faol</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      localStorage.removeItem('admin_token')
                      router.push('/admin/login')
                    }}
                    className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
