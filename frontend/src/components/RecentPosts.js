'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, TrendingUp } from 'lucide-react'
import axios from 'axios'

export default function RecentPosts({ category, excludeCategory }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  // Browser preview uchun to'g'ridan-to'g'ri backend URL
  const API = 'http://localhost:5000/api'

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const params = { limit: 6 };
      
      if (category) {
        params.category = category;
      }
      
      if (excludeCategory) {
        params.excludeCategory = excludeCategory;
      }

      const response = await axios.get(`${API}/posts`, { params });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Postlarni yuklashda xato:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category) => {
    const labels = {
      'web-development': 'Web Development',
      'telegram-bots': 'Telegram Botlar',
      'chatbots': 'Chatbotlar',
      'automation': 'Avtomatlashtirish',
      'ai-integration': 'AI Integratsiya',
      'mobile-apps': 'Mobil Ilovalar',
      'e-commerce': 'E-commerce',
      'crm-systems': 'CRM Tizimlari',
      'data-analytics': 'Data Analytics',
      'cloud-services': 'Cloud Xizmatlari',
      'cybersecurity': 'Kiberxavfsizlik',
      'digital-marketing': 'Digital Marketing',
      'ui-ux-design': 'UI/UX Dizayn',
      'blockchain': 'Blockchain',
      'iot': 'IoT',
      'news': 'Yangiliklar',
      'technology': 'Texnologiya',
      'business': 'Biznes',
      'science': 'Fan',
      'ai': 'Sun\'iy intellekt',
      'security': 'Xavfsizlik'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-6 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="card group hover:scale-105 cursor-pointer h-full flex flex-col">
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
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
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
  )
}