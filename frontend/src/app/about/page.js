'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Rocket } from 'lucide-react'

export default function AboutPage() {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Alisher Rustamov",
      role: "Asoschi va Lead Developer",
      bio: "10+ yillik tajriba, AI va web development sohasida mutaxassis",
      avatar: "/avatars/alisher.jpg"
    },
    {
      id: 2,
      name: "Nodira Karimova",
      role: "UI/UX Dizayner",
      bio: "Zamonaviy interfeyslar yaratish bo'yicha yetuk dizayner",
      avatar: "/avatars/nodira.jpg"
    },
    {
      id: 3,
      name: "Jasur Saidov",
      role: "AI Engineer",
      bio: "Sun'iy intellekt modellarini yaratish va integratsiya qilish",
      avatar: "/avatars/jasur.jpg"
    }
  ])

  const [stats] = useState([
    { id: 1, value: "50+", label: "Muvaffaqiyatli loyiha" },
    { id: 2, value: "10K+", label: "Foydalanuvchi" },
    { id: 3, value: "98%", label: "Mamnuniyat darajasi" },
    { id: 4, value: "24/7", label: "Qo'llab-quvvatlash" }
  ])

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Biz Haqimizda</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EvolvoAI - sun'iy intellekt yordamida bizneslarni avtomatlashtirish va rivojlantirishga qaratilgan zamonaviy yechimlar provayderi
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold">Missiyamiz</h2>
            </div>
            <p className="text-gray-600">
              Bizneslarni zamonaviy AI texnologiyalari yordamida avtomatlashtirish va ularning raqobatbardoshligini oshirish
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold">Vizyonimiz</h2>
            </div>
            <p className="text-gray-600">
              Har bir biznesga mos keladigan, sun'iy intellekt asosidagi yechimlar yaratish orqali dunyoni o'zgartirish
            </p>
          </motion.div>
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Jamoa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card text-center">
                <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Bizning Qadriyatlarimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Lightbulb className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovatsiya</h3>
              <p className="text-gray-600">
                Doim yangi yechimlar va texnologiyalarni qidiramiz
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Mijozga e'tibor</h3>
              <p className="text-gray-600">
                Har bir mijozga individual yondashuv
              </p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Natijaga yo'naltirilgan</h3>
              <p className="text-gray-600">
                Faqat biznes natijasiga ta'sir qiluvchi yechimlar
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
