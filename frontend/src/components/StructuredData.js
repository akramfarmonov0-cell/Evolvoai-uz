export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EvolvoAI",
    "alternateName": "EvolvoAI IT Company",
    "url": "https://evolvoai.uz",
    "logo": "https://evolvoai.uz/logo.png",
    "description": "Professional IT xizmatlari: Web sayt yaratish, Telegram bot dasturlash, AI chatbot, biznes avtomatlashtirish",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nurafshon yo'li 12",
      "addressLocality": "Toshkent",
      "addressRegion": "Toshkent",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998974771229",
      "contactType": "customer service",
      "availableLanguage": ["uz", "ru", "en"]
    },
    "sameAs": [
      "https://t.me/evolvoai_news",
      "https://evolvoai.uz"
    ],
    "email": "info@evolvoai.uz",
    "telephone": "+998974771229"
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "EvolvoAI",
    "image": "https://evolvoai.uz/logo.png",
    "@id": "https://evolvoai.uz",
    "url": "https://evolvoai.uz",
    "telephone": "+998974771229",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nurafshon yo'li 12",
      "addressLocality": "Toshkent",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.3111,
      "longitude": 69.2797
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }

  const servicesData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "EvolvoAI IT Xizmatlari",
    "description": "Web sayt yaratish, Telegram bot dasturlash, AI chatbot, biznes avtomatlashtirish xizmatlari",
    "provider": {
      "@type": "Organization",
      "name": "EvolvoAI"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Xizmatlari",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Sayt Yaratish",
            "description": "Zamonaviy va SEO-optimallashtirilgan web saytlar"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Telegram Bot Dasturlash",
            "description": "Avtomatik telegram botlar va integratsiyalar"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Chatbot",
            "description": "Sun'iy intellekt asosidagi chatbotlar"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Biznes Avtomatlashtirish",
            "description": "Biznes jarayonlarini avtomatlashtirish"
          }
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesData) }}
      />
    </>
  )
}
