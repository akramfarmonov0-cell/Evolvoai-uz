'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rss, Play, BarChart3, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function AdminRSSPage() {
  const router = useRouter()
  const [sources, setSources] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState(null)

  const API = 'http://localhost:5000/api'

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) {
      router.replace('/admin/login')
      return
    }
    loadData()
  }, [router])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // RSS manbalarini olish
      const sourcesResponse = await fetch(`${API}/rss/sources`)
      const sourcesData = await sourcesResponse.json()
      setSources(sourcesData.sources)

      // RSS statistikasini olish
      const token = localStorage.getItem('admin_token')
      const statsResponse = await fetch(`${API}/rss/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const statsData = await statsResponse.json()
      setStats(statsData)

    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchAll = async () => {
    try {
      setProcessing(true)
      setResults(null)
      
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API}/rss/fetch-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const data = await response.json()
      setResults(data)
      
      // Statistikani yangilash
      await loadData()
      
    } catch (error) {
      console.error('RSS fetch xatosi:', error)
      setResults({ error: error.message })
    } finally {
      setProcessing(false)
    }
  }

  const handleFetchSingle = async (sourceName) => {
    try {
      setProcessing(true)
      
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API}/rss/fetch/${sourceName}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const data = await response.json()
      setResults(data)
      
      // Statistikani yangilash
      await loadData()
      
    } catch (error) {
      console.error(`${sourceName} fetch xatosi:`, error)
      setResults({ error: error.message })
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
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
              <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full mb-4">
                <Rss className="w-4 h-4" />
                <span className="text-sm font-semibold">RSS Yangiliklar Boshqaruvi</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100">RSS Manbalar</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Tashqi manbalardan yangiliklar olish va AI bilan qayta ishlash
              </p>
            </div>
            <button
              onClick={handleFetchAll}
              disabled={processing}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {processing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              Barcha Manbalardan Olish
            </button>
          </div>
        </div>

        {/* Statistika */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Jami RSS Postlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.totalRSSPosts}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900 rounded-xl">
                  <Rss className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Faol Manbalar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.availableSources}</p>
                </div>
              </div>
            </div>

            {stats.bySource.map((source, index) => (
              <div key={source._id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-xl">
                    <Rss className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{source._id}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{source.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RSS Manbalar */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {sources.map((source) => (
            <div key={source.name} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                    <Rss className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{source.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {source.category} • {source.subcategory}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleFetchSingle(source.name)}
                  disabled={processing}
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  Olish
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Natijalar */}
        {results && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Natijalar</h3>
            
            {results.error ? (
              <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg">
                Xato: {results.error}
              </div>
            ) : (
              <div>
                <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 rounded-lg mb-4">
                  {results.message}
                </div>
                
                {results.summary && (
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Jami</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-slate-100">{results.summary.total}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Muvaffaqiyatli</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{results.summary.success}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Xatolar</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">{results.summary.errors}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* So'nggi RSS Postlar */}
        {stats && stats.recentRSSPosts.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">So'nggi RSS Postlar</h3>
            <div className="space-y-3">
              {stats.recentRSSPosts.map((post) => (
                <div key={post._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-slate-100">{post.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.originalSource} • {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                  >
                    Ko'rish
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
