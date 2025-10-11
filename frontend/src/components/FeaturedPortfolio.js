'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedPortfolio() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPortfolios()
  }, [])

  const loadPortfolios = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/portfolio/featured`)
      const data = await response.json()
      setPortfolios(Array.isArray(data) ? data.slice(0, 3) : [])
    } catch (err) {
      console.error('Portfolio yuklashda xato:', err)
      setPortfolios([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse" />
        ))}
      </div>
    )
  }

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Hozircha loyihalar mavjud emas</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {portfolios.map((portfolio, index) => (
        <motion.div
          key={portfolio._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
        >
          {portfolio.mainImage && (
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img 
                src={portfolio.mainImage} 
                alt={portfolio.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {portfolio.featured && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  <span className="text-xs font-semibold">Featured</span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {portfolio.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{portfolio.description}</p>
            
            {portfolio.technologies && portfolio.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {portfolio.technologies.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t">
              <Link
                href={`/portfolio`}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Batafsil
              </Link>
              {portfolio.liveUrl && (
                <a
                  href={portfolio.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
