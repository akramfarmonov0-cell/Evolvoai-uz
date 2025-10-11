'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={service.link}>
        <div className="card group hover:scale-105 cursor-pointer h-full">
          <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors duration-300">
            <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {service.description}
          </p>
          
          <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
            <span>Batafsil</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}