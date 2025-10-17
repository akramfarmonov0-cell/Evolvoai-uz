'use client'

import { useEffect, useState } from 'react'
import { Briefcase, ExternalLink, Github, Clock, User, Star } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '@/lib/config'

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadPortfolios()
  }, [])

  const loadPortfolios = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/portfolio`)
      const data = await response.data
      setPortfolios(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Portfolio yuklashda xato:', err)
      setPortfolios([])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'all', label: 'Barchasi' },
    { value: 'web-app', label: 'Web App' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'telegram-bot', label: 'Telegram Bot' },
    { value: 'ai-integration', label: 'AI Integratsiya' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'crm-system', label: 'CRM Sistema' }
  ]

  const filteredPortfolios = filter === 'all' 
    ? portfolios 
    : portfolios.filter(p => p.category === filter)

  const featuredPortfolios = portfolios.filter(p => p.featured)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Loyihalarimiz</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-gray-600">
              Biz yaratgan loyihalar va muvaffaqiyatli bajarilgan ishlar bilan tanishing
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredPortfolios.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Tanlangan Loyihalar
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPortfolios.map((portfolio) => (
                <div key={portfolio._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  {portfolio.mainImage && (
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={portfolio.mainImage} 
                        alt={portfolio.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{portfolio.title}</h3>
                    <p className="text-gray-600 mb-4">{portfolio.description}</p>
                    
                    {portfolio.technologies && portfolio.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.technologies.map((tech, index) => (
                          <span key={index} className="text-sm px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-4 border-t">
                      {portfolio.liveUrl && (
                        <a
                          href={portfolio.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ko'rish
                        </a>
                      )}
                      {portfolio.githubUrl && (
                        <a
                          href={portfolio.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Barcha Loyihalar</h2>
          
          {/* Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === cat.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredPortfolios.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Ushbu kategoriyada loyihalar topilmadi</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPortfolios.map((portfolio) => (
                <div key={portfolio._id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  {portfolio.mainImage && (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img 
                        src={portfolio.mainImage} 
                        alt={portfolio.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{portfolio.title}</h3>
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

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {portfolio.client && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="text-xs">{portfolio.client}</span>
                          </div>
                        )}
                        {portfolio.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{portfolio.duration}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {portfolio.liveUrl && (
                          <a
                            href={portfolio.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                            title="Ko'rish"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {portfolio.githubUrl && (
                          <a
                            href={portfolio.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                            title="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bizning Jamoamiz Bilan Ishlashni Xohlaysizmi?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Sizning g'oyangizni hayotga tatbiq qilishga tayyormiz. Keling, birgalikda ajoyib mahsulot yaratalim!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Bog'lanish
          </a>
        </div>
      </section>
    </div>
  )
}
