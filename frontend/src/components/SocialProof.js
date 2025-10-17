'use client'

import { useState, useEffect } from 'react'
import { Star, Users, MessageSquare, Trophy, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SocialProof() {
  const [stats, setStats] = useState({
    clients: 500,
    projects: 750,
    reviews: 4.9,
    experience: 5
  })

  const [testimonials] = useState([
    {
      id: 1,
      name: "Aziz Karimov",
      company: "TechStart LLC",
      text: "EvolvoAI bizning kompaniyamiz uchun ajoyib web sayt yaratdi. Professional yondashuv va tez bajarilish.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Malika Tosheva",
      company: "Digital Marketing Agency",
      text: "Telegram bot xizmati juda yaxshi. Mijozlar bilan aloqa avtomatlashtirish biznesimizni rivojlantirdi.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Bobur Rahimov",
      company: "E-commerce Store",
      text: "AI chatbot bizning savdo hajmini 40% ga oshirdi. 24/7 mijozlar xizmati endi avtomatik ishlaydi.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ])

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const socialProofItems = [
    {
      icon: Users,
      value: `${stats.clients}+`,
      label: 'Mamnun mijozlar',
      color: 'text-blue-600'
    },
    {
      icon: Trophy,
      value: `${stats.projects}+`,
      label: 'Muvaffaqiyatli loyihalar',
      color: 'text-green-600'
    },
    {
      icon: Star,
      value: stats.reviews,
      label: 'O\'rtacha reyting',
      color: 'text-yellow-500'
    },
    {
      icon: TrendingUp,
      value: `${stats.experience}+`,
      label: 'Yillik tajriba',
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {socialProofItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 mb-3 ${item.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {item.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Testimonials */}
      <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
          💬 Mijozlarimiz fikri
        </h3>
        
        <div className="relative overflow-hidden">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-3">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTestimonial 
                  ? 'bg-primary-600' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
