'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, TrendingUp } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '@/lib/config'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [selectedCategory, currentPage])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: 12,
        excludeCategory: 'news'
      }
      if (selectedCategory) {
        params.category = selectedCategory
        delete params.excludeCategory
      }

      const response = await axios.get(`${API_URL}/posts`, { params })
      setPosts(response.data.posts)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Postlarni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/meta/categories`)
      const filtered = Array.isArray(response.data) ? response.data.filter(c => c.category !== 'news') : []
      setCategories(filtered)
    } catch (error) {
      console.error('Kategoriyalarni yuklashda xato:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const searchParams = { q: searchQuery, excludeCategory: 'news' }
      if (selectedCategory) {
        searchParams.category = selectedCategory
        delete searchParams.excludeCategory
      }
      const response = await axios.get(`${API_URL}/posts/search`, { params: searchParams })
      setPosts(response.data)
    } catch (error) {
      console.error('Qidirishda xato:', error)
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      'web-development': 'Web Development',
      'telegram-bots': 'Telegram Botlar',
      'chatbots': 'Chatbotlar',
      'automation': 'Avtomatlashtirish',
      'ai-integration': 'AI Integratsiya',
      'mobile-apps': 'Mobil Ilovalar',
      'news': 'Yangiliklar'
    }
    return labels[category] || category
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
            <span className="text-sm font-semibold">Har kuni 15 ta yangi maqola</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI yordamida yaratilgan yangi maqolalar - texnologiya dunyosidagi so'nggi yangiliklardan xabardor bo'ling
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
                  placeholder="Maqola qidirish..."
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
                  <option value="">Barcha kategoriyalar</option>
                  {categories.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {getCategoryLabel(cat.category)} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-6 rounded w-24 mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-full mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Hech qanday maqola topilmadi</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="card group hover:scale-105 cursor-pointer h-full flex flex-col">
                      {/* Post Image */}
                      {post.image && (
                        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                        {post.category === 'news' && post.subcategory && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {getCategoryLabel(post.subcategory)}
                          </span>
                        )}
                        {post.isAIGenerated && (
                          <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            AI
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(post.createdAt)}
                        </div>
                        <span>{post.views} ko'rishlar</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
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