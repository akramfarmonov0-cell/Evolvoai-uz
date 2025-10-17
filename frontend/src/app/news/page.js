'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, TrendingUp } from 'lucide-react'
import axios from 'axios'
import NewsCard from '@/components/NewsCard'

export default function NewsPage() {
  const [posts, setPosts] = useState([])
  const API = 'http://localhost:5000/api'
  const [categories] = useState([
    { id: 'all', name: 'Barcha yangiliklar' },
    { id: 'technology', name: 'Texnologiya' },
    { id: 'business', name: 'Biznes' },
    { id: 'science', name: 'Fan' },
    { id: 'ai', name: 'Sun\'iy intellekt' },
    { id: 'security', name: 'Xavfsizlik' },
    { id: 'sport', name: 'Sport' },
    { id: 'uzbekistan', name: 'O\'zbekiston' },
    { id: 'world', name: 'Jahon' }
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchNewsPosts()
  }, [selectedCategory, currentPage])

  const fetchNewsPosts = async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: 12,
        category: 'news'
      }
      
      if (selectedCategory !== 'all') {
        params.subcategory = selectedCategory
      }

      const response = await axios.get(`${API}/posts`, { params })
      setPosts(response.data.posts)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Yangiliklarni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await axios.get(`${API}/posts/search`, {
        params: { q: searchQuery, category: 'news' }
      })
      setPosts(response.data)
    } catch (error) {
      console.error('Qidirishda xato:', error)
    }
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Realnews.uz - So'nggi yangiliklar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Yangiliklar</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Texnologiya, biznes va boshqa sohalardagi so'nggi yangiliklardan xabardor bo'ling
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Yangiliklarda qidirish..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Hech qanday yangilik topilmadi</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <NewsCard key={post._id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Oldingi
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Keyingi
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
