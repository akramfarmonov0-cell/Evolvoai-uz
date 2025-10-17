'use client'

import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle, Mail, Phone } from 'lucide-react'

export default function SocialLinks({ variant = 'default', size = 'md' }) {
  const socialAccounts = [
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/evolvoai_news',
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/evolvoai',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/evolvoai',
      color: 'hover:text-sky-500',
      bgColor: 'hover:bg-sky-50 dark:hover:bg-sky-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/evolvoai',
      color: 'hover:text-blue-700',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/evolvoai',
      color: 'hover:text-pink-500',
      bgColor: 'hover:bg-pink-50 dark:hover:bg-pink-900'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@evolvoai',
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50 dark:hover:bg-red-900'
    }
  ]

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:info@evolvoai.uz',
      color: 'hover:text-green-600',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900'
    },
    {
      name: 'Phone',
      icon: Phone,
      url: 'tel:+998974771229',
      color: 'hover:text-purple-600',
      bgColor: 'hover:bg-purple-50 dark:hover:bg-purple-900'
    }
  ]

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const containerClasses = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3'
  }

  const renderLinks = (links) => (
    links.map((social) => {
      const IconComponent = social.icon
      return (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${containerClasses[size]} rounded-lg transition-all duration-200 
            text-gray-600 dark:text-gray-400 ${social.color} ${social.bgColor}
            hover:scale-110 group
          `}
          aria-label={social.name}
        >
          <IconComponent className={sizeClasses[size]} />
          {variant === 'with-labels' && (
            <span className="ml-2 text-sm font-medium">{social.name}</span>
          )}
        </a>
      )
    })
  )

  if (variant === 'footer') {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Ijtimoiy tarmoqlar
          </h4>
          <div className="flex gap-2">
            {renderLinks(socialAccounts)}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Bog'lanish
          </h4>
          <div className="flex gap-2">
            {renderLinks(contactLinks)}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <div className="flex flex-wrap gap-3">
        {renderLinks([...socialAccounts, ...contactLinks])}
      </div>
    )
  }

  if (variant === 'with-labels') {
    return (
      <div className="space-y-2">
        {socialAccounts.map((social) => {
          const IconComponent = social.icon
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center ${containerClasses[size]} rounded-lg transition-all duration-200 
                text-gray-600 dark:text-gray-400 ${social.color} ${social.bgColor}
                hover:scale-105 group
              `}
              aria-label={social.name}
            >
              <IconComponent className={sizeClasses[size]} />
              <span className="ml-3 text-sm font-medium">{social.name}</span>
            </a>
          )
        })}
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex gap-2">
      {renderLinks(socialAccounts)}
    </div>
  )
}
