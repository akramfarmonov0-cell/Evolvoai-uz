'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminAPI } from '@/lib/api'
import { FileText, Plus, Edit2, Trash2, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminPostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

    if (!token) {
      router.replace('/admin/login')
      return
    }

    loadPosts()
  }, [router])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllPosts()
      setPosts(response.data)
      setError(null)
    } catch (err) {
      console.error('Postlarni yuklashda xato:', err)
      setError(err.response?.data?.error || 'Postlarni yuklashda xatolik yuz berdi')
      
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        router.replace('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham bu postni o\'chirmoqchimisiz?')) {
      return
    }

    try {
      await adminAPI.deletePost(id)
      await loadPosts()
      alert('Post muvaffaqiyatli o\'chirildi')
    } catch (err) {
      console.error('Postni o\'chirishda xato:', err)
      alert(err.response?.data?.error || 'Postni o\'chirishda xatolik yuz berdi')
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
                <FileText className="w-4 h-4" />
                <span className="text-sm font-semibold">Postlarni boshqarish</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Blog Postlari</h1>
              <p className="text-gray-600 mt-2">
                Barcha blog postlarini ko'ring, tahrirlang yoki yangi post yarating
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/posts/create')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              Yangi Post
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hech qanday post topilmadi</h3>
            <p className="text-gray-600 mb-6">Birinchi postingizni yarating</p>
            <button
              onClick={() => router.push('/admin/posts/create')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              Yangi Post
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sarlavha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kategoriya</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ko'rishlar</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Likes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sana</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Harakatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{post.likes || 0}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/admin/posts/edit/${post._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
