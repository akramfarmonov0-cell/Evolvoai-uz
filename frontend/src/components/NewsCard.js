'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export default function NewsCard({ post, index }) {
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

  return (
    <motion.div
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
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Yangiliklar
            </span>
            {post.subcategory && (
              <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
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
  )
}
