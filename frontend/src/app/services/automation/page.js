'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AutomationServicePage() {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/automation`)
      setService(response.data)
    } catch (error) {
      console.error('Xizmatni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="py-20 text-center">Yuklanmoqda...</div>
  if (!service) return <div className="py-20 text-center">Xizmat topilmadi</div>

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{service.description}</p>
        </motion.div>

        <div className="card">
          <div className="text-5xl mb-4">{service.icon}</div>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Asosiy imkoniyatlar:</h3>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Texnologiyalar:</h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 mt-4">
            Buyurtma berish
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
