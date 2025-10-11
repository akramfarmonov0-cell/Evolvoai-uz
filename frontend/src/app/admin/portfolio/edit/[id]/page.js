'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { adminAPI } from '@/lib/api'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditPortfolioPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'web-app',
    technologies: '',
    mainImage: '',
    images: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'completed',
    order: 0,
    client: '',
    duration: ''
  })

  useEffect(() => {
    loadPortfolio()
  }, [params.id])

  const loadPortfolio = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllPortfolio()
      const portfolio = response.data.find(p => p._id === params.id)
      
      if (!portfolio) {
        setError('Portfolio topilmadi')
        return
      }

      setFormData({
        title: portfolio.title || '',
        slug: portfolio.slug || '',
        description: portfolio.description || '',
        category: portfolio.category || 'web-app',
        technologies: Array.isArray(portfolio.technologies) ? portfolio.technologies.join(', ') : '',
        mainImage: portfolio.mainImage || '',
        images: Array.isArray(portfolio.images) ? portfolio.images.join(', ') : '',
        liveUrl: portfolio.liveUrl || '',
        githubUrl: portfolio.githubUrl || '',
        featured: portfolio.featured || false,
        status: portfolio.status || 'completed',
        order: portfolio.order || 0,
        client: portfolio.client || '',
        duration: portfolio.duration || ''
      })
      setError(null)
    } catch (err) {
      console.error('Portfolioni yuklashda xato:', err)
      setError(err.response?.data?.error || 'Portfolioni yuklashda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Validation
    if (!formData.description || formData.description.trim() === '') {
      setError('Tavsif maydoni majburiy')
      setSaving(false)
      return
    }

    try {
      // Technologies va images'ni array'ga aylantirish
      const technologiesArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      const imagesArray = formData.images.split(',').map(img => img.trim()).filter(img => img)
      
      const portfolioData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description.trim(),
        category: formData.category,
        technologies: technologiesArray,
        mainImage: formData.mainImage.trim(),
        images: imagesArray,
        featured: formData.featured,
        status: formData.status,
        order: parseInt(formData.order) || 0
      }

      // Optional fields
      if (formData.liveUrl && formData.liveUrl.trim()) {
        portfolioData.liveUrl = formData.liveUrl.trim()
      }
      if (formData.githubUrl && formData.githubUrl.trim()) {
        portfolioData.githubUrl = formData.githubUrl.trim()
      }
      if (formData.client && formData.client.trim()) {
        portfolioData.client = formData.client.trim()
      }
      if (formData.duration && formData.duration.trim()) {
        portfolioData.duration = formData.duration.trim()
      }

      await adminAPI.updatePortfolio(params.id, portfolioData)
      router.push('/admin/portfolio')
    } catch (err) {
      console.error('Portfolioni yangilashda xato:', err)
      setError(err.response?.data?.error || 'Portfolioni yangilashda xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
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
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/admin/portfolio" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Loyihani Tahrirlash</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loyiha nomi *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Loyiha nomi"
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
                  placeholder="loyiha-slug-url"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tavsif *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Loyiha haqida batafsil ma'lumot"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="web-app">Web App</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="telegram-bot">Telegram Bot</option>
                  <option value="ai-integration">AI Integratsiya</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="crm-system">CRM Sistema</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="completed">Tugallangan</option>
                  <option value="in-progress">Jarayonda</option>
                  <option value="planned">Rejalashtirilgan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texnologiyalar
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB (vergul bilan ajrating)"
              />
              <p className="mt-1 text-sm text-gray-500">Texnologiyalarni vergul bilan ajrating</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asosiy rasm URL *
              </label>
              <input
                type="url"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qo'shimcha rasmlar URL
              </label>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="URL1, URL2, URL3 (vergul bilan ajrating)"
              />
              <p className="mt-1 text-sm text-gray-500">Har bir rasm URL'ni vergul bilan ajrating</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mijoz
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Mijoz nomi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Davomiyligi
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="3 oy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tartib raqami
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Tanlangan loyiha (Featured)</span>
              </label>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <Link
                href="/admin/portfolio"
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
