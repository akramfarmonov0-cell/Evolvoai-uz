'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Bot, MessageSquare, Zap, Sparkles, TrendingUp, Briefcase } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import RecentPosts from '@/components/RecentPosts'
import ContactForm from '@/components/ContactForm'
import FeaturedPortfolio from '@/components/FeaturedPortfolio'
import SocialProof from '@/components/SocialProof'

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'Web Sayt Yaratish',
      description: 'Zamonaviy, tez va SEO-optimallashtirilgan web saytlar. E-commerce, korporativ saytlar, landing page. Toshkentda professional web dasturlash',
      link: '/services/web-development'
    },
    {
      icon: Bot,
      title: 'Telegram Bot Dasturlash',
      description: 'Avtomatik telegram botlar, savdo botlari, buyurtma qabul qilish. O\'zbekistonda eng yaxshi telegram bot yaratish xizmati',
      link: '/services/telegram-bots'
    },
    {
      icon: MessageSquare,
      title: 'AI Chatbot Yaratish',
      description: 'GPT asosidagi sun\'iy intellekt chatbotlar. 24/7 mijozlar xizmati, avtomatik javob berish. AI chatbot integratsiya',
      link: '/services/chatbots'
    },
    {
      icon: Zap,
      title: 'Biznes Avtomatlashtirish',
      description: 'CRM, ERP sistemalar. Biznes jarayonlarini avtomatlashtirish. To\'lov tizimlari integratsiya (Click, Payme)',
      link: '/services/automation'
    }
  ]

  const stats = [
    { number: '50+', label: 'Bajarilgan loyihalar' },
    { number: '30+', label: 'Mijozlar' },
    { number: '99%', label: 'Mijozlar qoniqish' },
    { number: '24/7', label: 'Texnik yordam' }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Powered Solutions
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Web Sayt, Telegram Bot va AI Chatbot Yaratish
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                O'zbekistonda №1 IT Kompaniya
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-blue-100">
              Zamonaviy web saytlar, telegram botlar, AI chatbotlar va biznes avtomatlashtirish. Toshkentda professional IT xizmatlari
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                Xizmatlar
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary bg-white/10 border-white hover:bg-white/20 text-white">
                Bog'lanish
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Bizning Xizmatlarimiz</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Zamonaviy texnologiyalar yordamida biznesingizni yangi bosqichga olib chiqamiz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary inline-flex items-center gap-2">
              Barcha Xizmatlar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Bajarilgan ishlar</span>
            </div>
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Bizning muvaffaqiyatli bajarilgan loyihalarimiz va mijozlarimiz bilan tanishing
            </p>
          </motion.div>

          <FeaturedPortfolio />

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary inline-flex items-center gap-2">
              Barcha Loyihalar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Realnews.uz - So'nggi yangiliklar</span>
            </div>
            <h2 className="section-title">So'nggi Yangiliklar</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Texnologiya, biznes va boshqa sohalardagi eng so'nggi yangiliklardan xabardor bo'ling
            </p>
          </motion.div>

          <div className="mb-16">
            <RecentPosts category="news" />
          </div>

          <div className="text-center mt-12">
            <Link href="/news" className="btn-primary inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              Barcha Yangiliklar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Har kuni yangi maqolalar</span>
            </div>
            <h2 className="section-title">Blog</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              AI yordamida har kuni 15 ta yangi maqola - texnologiya dunyosidagi eng so'nggi yangiliklardan xabardor bo'ling
            </p>
          </motion.div>

          <RecentPosts excludeCategory="news" />

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
              Barcha Maqolalar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Mijozlarimiz bizni tanlaydi</span>
            </div>
            <h2 className="section-title">Bizga Ishonch</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              500+ mamnun mijoz, 750+ muvaffaqiyatli loyiha va 4.9 yulduzli reyting - bizning sifatimiz haqida gapiradi
            </p>
          </motion.div>

          <SocialProof />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="section-title">Bog'laning</h2>
              <p className="section-subtitle">
                Loyihangiz haqida gaplashaylikmi? Biz har doim sizga yordam berishga tayyormiz
              </p>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}