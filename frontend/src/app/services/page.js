'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      setServices(response.data)
    } catch (error) {
      console.error('Xizmatlarni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bizning Xizmatlarimiz</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zamonaviy texnologiyalar va AI yordamida biznesingizni yangi bosqichga olib chiqamiz
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-16 w-16 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-8 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card group hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>

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
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 gradient-bg text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Loyihangizni muhokama qilaylikmi?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Biz sizning g'oyalaringizni amalga oshirishga tayyormiz
          </p>
          <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Bog'lanish
          </Link>
        </motion.div>
      </div>
    </div>
  )
}