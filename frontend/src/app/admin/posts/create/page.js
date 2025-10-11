'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminAPI } from '@/lib/api'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function CreatePostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'ai-integration',
    tags: '',
    slug: '',
    excerpt: '',
    image: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (!formData.excerpt || formData.excerpt.trim() === '') {
      setError('Qisqacha mazmun (Excerpt) maydoni majburiy')
      setLoading(false)
      return
    }

    try {
      // Tags'ni array'ga aylantirish
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      const postData = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        content: formData.content,
        excerpt: formData.excerpt.trim(),
        tags: tagsArray,
        isAIGenerated: false
      }

      // Image faqat agar mavjud bo'lsa
      if (formData.image && formData.image.trim()) {
        postData.image = formData.image.trim()
      }

      await adminAPI.createPost(postData)
      router.push('/admin/posts')
    } catch (err) {
      console.error('Post yaratishda xato:', err)
      setError(err.response?.data?.error || 'Post yaratishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/admin/posts" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Yangi Post Yaratish</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sarlavha *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Post sarlavhasi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="post-slug-url"
              />
              <p className="mt-1 text-sm text-gray-500">URL uchun noyob identifikator</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategoriya *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ai-integration">AI Integratsiya</option>
                <option value="telegram-bots">Telegram Botlar</option>
                <option value="web-development">Web Dasturlash</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qisqacha mazmun (Excerpt) *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Post haqida qisqacha ma'lumot (ro'yxatlarda ko'rsatiladi)"
              />
              <p className="mt-1 text-sm text-gray-500">Bu matn blog ro'yxatida ko'rsatiladi</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontent *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                placeholder="Post matni (Markdown formatida)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teglar
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="AI, Web, Bot (vergul bilan ajrating)"
              />
              <p className="mt-1 text-sm text-gray-500">Teglarni vergul bilan ajrating</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rasm URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <Link
                href="/admin/posts"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Bekor qilish
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
