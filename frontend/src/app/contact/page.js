'use client'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import SocialLinks from '@/components/SocialLinks'
import Link from 'next/link'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@evolvoai.uz',
      link: 'mailto:info@evolvoai.uz'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+998 97 477 12 29',
      link: 'tel:+998974771229'
    },
    {
      icon: MapPin,
      title: 'Manzil',
      value: 'Toshkent shahri, Nurafshon yo\'li 12',
      link: null
    },
    {
      icon: Send,
      title: 'Telegram',
      value: '@evolvoai_news',
      link: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'https://t.me/evolvoai_news'
    }
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bog'laning</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Loyihangiz haqida gaplashaylikmi? Biz sizning savollaringizga javob berishga va yechim topishga tayyormiz
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Biz bilan bog'laning</h2>
                <p className="text-gray-600 mb-8">
                  Har qanday savollaringiz bo'lsa, biz bilan bog'laning. Biz har doim sizga yordam berishga tayyormiz va tez orada javob beramiz.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </motion.div>
                  )

                  return item.link ? (
                    <Link key={index} href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined}>
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-xl mt-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Tezkor javob</h3>
                    <p className="text-gray-600 mb-4">
                      Telegram orqali biz bilan bog'lansangiz, tezroq javob olasiz va real vaqtda suhbatlashishingiz mumkin.
                    </p>
                    <Link
                      href={process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'https://t.me/evolvoai_news'}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                    >
                      <Send className="w-4 h-4" />
                      Telegram'da ochish
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white p-8 rounded-xl shadow-md mt-8">
                <h3 className="font-bold text-gray-900 mb-6 text-center">Ijtimoiy tarmoqlarda kuzating</h3>
                <div className="flex justify-center">
                  <SocialLinks variant="contact" size="lg" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Tez-tez so'raladigan savollar</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'Loyiha qancha vaqt oladi?',
                a: 'Loyiha murakkabligiga qarab 1 haftadan 3 oygacha vaqt ketishi mumkin. Aniq muddatni loyihangizni ko\'rgandan keyin ayta olamiz.'
              },
              {
                q: 'Narxlar qanday?',
                a: 'Narxlar loyiha hajmi va murakkabligiga bog\'liq. Bepul konsultatsiya va taxminiy narx uchun biz bilan bog\'laning.'
              },
              {
                q: 'Texnik yordam bor mi?',
                a: 'Ha, barcha loyihalarimiz uchun 6 oy bepul texnik yordam va keyin obuna asosida yordam taqdim etamiz.'
              },
              {
                q: 'Qanday texnologiyalar ishlatiladi?',
                a: 'Biz eng zamonaviy va ishonchli texnologiyalardan foydalanamiz: React, Next.js, Node.js, Python va boshqalar.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}