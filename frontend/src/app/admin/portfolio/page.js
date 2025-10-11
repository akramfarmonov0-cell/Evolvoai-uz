'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminAPI } from '@/lib/api'
import { Briefcase, ArrowLeft, Plus, Edit2, Trash2, ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'

export default function AdminPortfolioPage() {
  const router = useRouter()
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

    if (!token) {
      router.replace('/admin/login')
      return
    }

    loadPortfolios()
  }, [router])

  const loadPortfolios = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllPortfolio()
      setPortfolios(response.data)
      setError(null)
    } catch (err) {
      console.error('Portfoliolarni yuklashda xato:', err)
      setError(err.response?.data?.error || 'Portfoliolarni yuklashda xatolik yuz berdi')
      
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        router.replace('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham bu loyihani o\'chirmoqchimisiz?')) {
      return
    }

    try {
      await adminAPI.deletePortfolio(id)
      await loadPortfolios()
      alert('Loyiha muvaffaqiyatli o\'chirildi')
    } catch (err) {
      console.error('Loyihani o\'chirishda xato:', err)
      alert(err.response?.data?.error || 'Loyihani o\'chirishda xatolik yuz berdi')
    }
  }

  const getCategoryBadge = (category) => {
    const badges = {
      'web-app': 'bg-blue-100 text-blue-700',
      'mobile-app': 'bg-purple-100 text-purple-700',
      'telegram-bot': 'bg-cyan-100 text-cyan-700',
      'ai-integration': 'bg-pink-100 text-pink-700',
      'e-commerce': 'bg-green-100 text-green-700',
      'crm-system': 'bg-orange-100 text-orange-700',
      'other': 'bg-gray-100 text-gray-700'
    }
    const labels = {
      'web-app': 'Web App',
      'mobile-app': 'Mobile App',
      'telegram-bot': 'Telegram Bot',
      'ai-integration': 'AI Integratsiya',
      'e-commerce': 'E-commerce',
      'crm-system': 'CRM Sistema',
      'other': 'Boshqa'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[category]}`}>
        {labels[category]}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const badges = {
      'completed': 'bg-green-100 text-green-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      'planned': 'bg-gray-100 text-gray-700'
    }
    const labels = {
      'completed': 'Tugallangan',
      'in-progress': 'Jarayonda',
      'planned': 'Rejalashtirilgan'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-semibold">Portfolio Loyihalari</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Portfolio</h1>
              <p className="text-gray-600 mt-2">
                Barcha loyihalarni ko'ring, tahrirlang yoki yangi loyiha qo'shing
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/portfolio/create')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              Yangi Loyiha
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {portfolios.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hech qanday loyiha topilmadi</h3>
            <p className="text-gray-600 mb-6">Birinchi loyihangizni qo'shing</p>
            <button
              onClick={() => router.push('/admin/portfolio/create')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              Yangi Loyiha
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolios.map((portfolio) => (
              <div key={portfolio._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition">
                {portfolio.mainImage && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={portfolio.mainImage} 
                      alt={portfolio.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{portfolio.title}</h3>
                        {portfolio.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getCategoryBadge(portfolio.category)}
                        {getStatusBadge(portfolio.status)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{portfolio.description}</p>

                  {portfolio.technologies && portfolio.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {portfolio.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {tech}
                        </span>
                      ))}
                      {portfolio.technologies.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          +{portfolio.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {portfolio.liveUrl && (
                        <a
                          href={portfolio.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => router.push(`/admin/portfolio/edit/${portfolio._id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(portfolio._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
