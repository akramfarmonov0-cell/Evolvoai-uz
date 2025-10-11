# 🔍 Google Search Console va SEO Qo'llanma

## 📋 Bo'limlar:
1. Google Search Console Sozlash
2. Sitemap.xml
3. robots.txt
4. Meta Tags Optimizatsiya
5. Structured Data (Schema.org)
6. Google Analytics
7. SEO Best Practices

---

## 1️⃣ GOOGLE SEARCH CONSOLE SOZLASH

### A. Account Yaratish:

1. **Google Search Console'ga o'ting:**
   ```
   https://search.google.com/search-console
   ```

2. **Property Qo'shish:**
   - **Add Property** bosing
   - **Domain** yoki **URL prefix** tanlang
   - Production URL: `https://evolvoai-main.vercel.app`

### B. Ownership Verification:

**Variant 1: HTML File (Tavsiya - Vercel uchun):**

1. Google verification fayl beradi: `google[hash].html`
2. Vercel'da:
   ```
   frontend/public/google[hash].html
   ```
3. Faylni yaratib push qiling
4. Google'da **Verify** bosing

**Variant 2: HTML Meta Tag:**

1. Google meta tag beradi:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```

2. `frontend/src/app/layout.js` ga qo'shing:
   ```javascript
   <head>
     <meta name="google-site-verification" content="YOUR_CODE" />
   </head>
   ```

3. Deploy va Verify

**Variant 3: DNS Record (Custom Domain uchun):**

1. DNS provider'ga o'ting
2. TXT record qo'shing:
   ```
   google-site-verification=YOUR_CODE
   ```

### C. Sitemap Submit:

1. Search Console → **Sitemaps**
2. URL kiriting:
   ```
   https://evolvoai-main.vercel.app/sitemap.xml
   ```
3. **Submit** bosing

---

## 2️⃣ SITEMAP.XML

### Hozirgi Holat Tekshirish:

```
https://evolvoai-main.vercel.app/sitemap.xml
```

Next.js `sitemap.js` faylida avtomatik generatsiya qilingan.

### Qo'shimcha URL'lar:

`frontend/src/app/sitemap.js` ga qo'shish:

```javascript
export default function sitemap() {
  const baseUrl = 'https://evolvoai-main.vercel.app'
  
  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Service pages
    {
      url: `${baseUrl}/services/web-development`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/telegram-bots`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ai-integration`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/chatbots`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/automation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/mobile-apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Dynamic blog posts will be added here via API
  ]
}
```

---

## 3️⃣ ROBOTS.TXT

### Hozirgi Tekshirish:

```
https://evolvoai-main.vercel.app/robots.txt
```

### Optimizatsiya:

`frontend/public/robots.txt`:

```txt
# Allow all search engines
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: https://evolvoai-main.vercel.app/sitemap.xml
Sitemap: https://evolvoai-main.vercel.app/server-sitemap.xml

# Crawl delay
Crawl-delay: 1

# Specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /
```

---

## 4️⃣ META TAGS OPTIMIZATSIYA

### A. Homepage (`frontend/src/app/page.js`):

```javascript
export const metadata = {
  title: 'EvolvoAI - AI-Powered IT Solutions | Web Development, Telegram Bots, Automation',
  description: 'O\'zbekistonda professional IT xizmatlar: Web saytlar, Telegram botlar, AI integratsiya, Chatbotlar va Automation. Sun\'iy intellekt bilan biznesingizni rivojlantiring.',
  keywords: 'web development uzbekistan, telegram bot, ai integration, chatbot, automation, evolvoai, IT xizmatlari, sun\'iy intellekt',
  authors: [{ name: 'EvolvoAI' }],
  creator: 'EvolvoAI',
  publisher: 'EvolvoAI',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://evolvoai-main.vercel.app',
    title: 'EvolvoAI - AI-Powered IT Solutions',
    description: 'Professional IT xizmatlar: Web development, Telegram bots, AI integration',
    siteName: 'EvolvoAI',
    images: [{
      url: 'https://evolvoai-main.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'EvolvoAI',
    }],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'EvolvoAI - AI-Powered IT Solutions',
    description: 'Professional IT xizmatlar: Web development, Telegram bots, AI integration',
    creator: '@evolvoai',
    images: ['https://evolvoai-main.vercel.app/og-image.png'],
  },
  
  // Verification
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_CODE',
  },
  
  // Alternate languages
  alternates: {
    canonical: 'https://evolvoai-main.vercel.app',
    languages: {
      'uz-UZ': 'https://evolvoai-main.vercel.app',
      'ru-RU': 'https://evolvoai-main.vercel.app/ru',
    },
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### B. Blog Pages:

Har bir blog post uchun dynamic metadata:

```javascript
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  
  return {
    title: `${post.title} | EvolvoAI Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://evolvoai-main.vercel.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt,
      authors: ['EvolvoAI'],
      images: [post.image],
    },
  }
}
```

---

## 5️⃣ STRUCTURED DATA (JSON-LD)

### A. Organization Schema:

`frontend/src/components/StructuredData.js`:

```javascript
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EvolvoAI",
    "legalName": "EvolvoAI IT Solutions",
    "url": "https://evolvoai-main.vercel.app",
    "logo": "https://evolvoai-main.vercel.app/icon-512x512.png",
    "description": "Professional IT xizmatlar: Web development, Telegram bots, AI integration, Chatbots va Automation",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UZ",
      "addressRegion": "Toshkent",
      "addressLocality": "Toshkent"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-XX-XXX-XX-XX",
      "contactType": "customer service",
      "availableLanguage": ["uz", "ru", "en"]
    },
    "sameAs": [
      "https://t.me/evolvoai",
      "https://t.me/evolvoai_news"
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### B. Service Schema:

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "EvolvoAI"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Uzbekistan"
  },
  "description": "Professional web development services"
}
```

### C. Article Schema (Blog):

```javascript
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "image": "image-url",
  "author": {
    "@type": "Organization",
    "name": "EvolvoAI"
  },
  "publisher": {
    "@type": "Organization",
    "name": "EvolvoAI",
    "logo": {
      "@type": "ImageObject",
      "url": "logo-url"
    }
  },
  "datePublished": "2025-10-11",
  "dateModified": "2025-10-11"
}
```

---

## 6️⃣ GOOGLE ANALYTICS (Ixtiyoriy)

### A. Account Yaratish:

1. https://analytics.google.com
2. Account yaratish
3. Property qo'shish: `EvolvoAI`
4. Measurement ID olish: `G-XXXXXXXXXX`

### B. Next.js'ga Qo'shish:

`frontend/src/app/layout.js`:

```javascript
import Script from 'next/script'

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  
  return (
    <html>
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

`.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 7️⃣ SEO BEST PRACTICES

### A. Content Optimizatsiya:

- ✅ **H1 tag** - Har sahifada bitta
- ✅ **H2, H3** - Strukturali hierarchy
- ✅ **Alt text** - Barcha rasmlarda
- ✅ **Internal linking** - Ichki linklar
- ✅ **External linking** - Autoritativ saytlarga
- ✅ **Content length** - Minimum 300 so'z

### B. Technical SEO:

- ✅ **HTTPS** - SSL certificate (Vercel auto)
- ✅ **Mobile-friendly** - Responsive design
- ✅ **Fast loading** - < 3 sekund
- ✅ **Core Web Vitals** - LCP, FID, CLS
- ✅ **Canonical URLs** - Duplicate content yo'q

### C. O'zbek Keywords:

**Asosiy:**
- "web sayt yaratish toshkent"
- "telegram bot yaratish"
- "ai integratsiya o'zbekiston"
- "chatbot yaratish"
- "avtomatlashtirish xizmatlari"

**Long-tail:**
- "professional web development uzbekistan"
- "telegram bot developer toshkent"
- "ai powered chatbot uzb"
- "business automation services"

### D. Local SEO:

Google My Business:
```
Business Name: EvolvoAI
Category: Software Company
Location: Toshkent, Uzbekistan
Description: Professional IT xizmatlar...
```

---

## 8️⃣ TEZKOR DEPLOY CHECKLIST

- [ ] Google Search Console account
- [ ] Property qo'shildi (evolvoai-main.vercel.app)
- [ ] Ownership verified
- [ ] Sitemap.xml submit qilindi
- [ ] robots.txt optimizatsiya qilindi
- [ ] Meta tags to'liq
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Google Analytics (ixtiyoriy)
- [ ] Mobile-friendly test
- [ ] Page speed test
- [ ] Core Web Vitals

---

## 🔗 Foydali Linklar:

- **Google Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Schema Markup Generator:** https://technicalseo.com/tools/schema-markup-generator/

---

## 📊 Monitoring:

**Har hafta tekshiring:**
1. Search Console → Performance
2. Impressions va Clicks
3. Average position
4. CTR (Click-through rate)
5. Index coverage
6. Mobile usability

---

## 🚀 Natija:

**2-4 hafta ichida:**
- ✅ Google'da index qilinadi
- ✅ O'zbek keyword'larda ko'rinadi
- ✅ Organic traffic oshadi
- ✅ Mijozlar keladi

**Sabr qiling!** SEO - bu long-term jarayon.

---

**Omad! Loyihangiz Google'da birinchi sahifada bo'lsin!** 🎯🔍
