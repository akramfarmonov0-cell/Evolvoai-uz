import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'Biz haqimizda', href: '/about' },
      { label: 'Xizmatlar', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Bog\'lanish', href: '/contact' }
    ],
    services: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Telegram Botlar', href: '/services/telegram-bots' },
      { label: 'Chatbotlar', href: '/services/chatbots' },
      { label: 'Avtomatlashtirish', href: '/services/automation' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">EvolvoAI</h3>
            <p className="text-gray-400 mb-4">
              Zamonaviy IT yechimlar va avtomatlashtirish xizmatlari bilan biznesingizni rivojlantiring.
            </p>
            <Link 
              href={process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'https://t.me/evolvoai_news'}
              target="_blank"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Send className="w-4 h-4" />
              Telegram kanalimiz
            </Link>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kompaniya</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Xizmatlar</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bog'lanish</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5" />
                <a href="mailto:info@evolvoai.uz" className="hover:text-primary-400 transition-colors">
                  info@evolvoai.uz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <a href="tel:+998974771229" className="hover:text-primary-400 transition-colors">
                  +998 97 477 12 29
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span>Toshkent shahri, Nurafshon yo'li 12</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} EvolvoAI. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}