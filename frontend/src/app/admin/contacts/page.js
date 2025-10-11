'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminAPI } from '@/lib/api'
import { Users, ArrowLeft, Mail, Phone, Trash2, Check, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, new, read, replied

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

    if (!token) {
      router.replace('/admin/login')
      return
    }

    loadContacts()
  }, [router])

  const loadContacts = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllContacts()
      setContacts(response.data)
      setError(null)
    } catch (err) {
      console.error('Murojaatlarni yuklashda xato:', err)
      setError(err.response?.data?.error || 'Murojaatlarni yuklashda xatolik yuz berdi')
      
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        router.replace('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminAPI.updateContact(id, { status })
      await loadContacts()
    } catch (err) {
      console.error('Status yangilashda xato:', err)
      alert(err.response?.data?.error || 'Status yangilashda xatolik yuz berdi')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham bu murojaatni o\'chirmoqchimisiz?')) {
      return
    }

    try {
      await adminAPI.deleteContact(id)
      await loadContacts()
      alert('Murojaat muvaffaqiyatli o\'chirildi')
    } catch (err) {
      console.error('Murojaatni o\'chirishda xato:', err)
      alert(err.response?.data?.error || 'Murojaatni o\'chirishda xatolik yuz berdi')
    }
  }

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true
    return contact.status === filter
  })

  const getStatusBadge = (status) => {
    const badges = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-yellow-100 text-yellow-700',
      replied: 'bg-green-100 text-green-700',
      archived: 'bg-gray-100 text-gray-700'
    }
    const labels = {
      new: 'Yangi',
      read: 'O\'qilgan',
      replied: 'Javob berilgan',
      archived: 'Arxivlangan'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    )
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
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">Murojaatlar</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Mijozlar Murojaatlari</h1>
              <p className="text-gray-600 mt-2">
                Barcha murojaatlarni ko'ring va boshqaring
              </p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            Barchasi ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'new' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            Yangi ({contacts.filter(c => c.status === 'new').length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'read' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            O'qilgan ({contacts.filter(c => c.status === 'read').length})
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'replied' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            Javob berilgan ({contacts.filter(c => c.status === 'replied').length})
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {filteredContacts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Murojaatlar topilmadi</h3>
            <p className="text-gray-600">Hali hech qanday murojaat yo'q</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                      {getStatusBadge(contact.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                          {contact.email}
                        </a>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    {contact.subject && (
                      <p className="text-sm text-gray-500 mt-1">Mavzu: {contact.subject}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 p-4 bg-gray-50 rounded-lg">{contact.message}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {contact.status === 'new' && (
                      <button
                        onClick={() => handleUpdateStatus(contact._id, 'read')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition"
                      >
                        <Eye className="w-4 h-4" />
                        O'qilgan
                      </button>
                    )}
                    {(contact.status === 'new' || contact.status === 'read') && (
                      <button
                        onClick={() => handleUpdateStatus(contact._id, 'replied')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                      >
                        <Check className="w-4 h-4" />
                        Javob berildi
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
