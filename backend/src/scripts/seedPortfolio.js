require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');

const demoPortfolios = [
  {
    title: "E-commerce Platform - Optom Bazar",
    slug: "ecommerce-optom-bazar",
    description: "O'zbekiston uchun zamonaviy optom savdo platformasi. Real-time inventar boshqaruvi, AI-powered tavsiyalar va to'liq logistika integratsiyasi bilan.",
    category: "e-commerce",
    technologies: ["Next.js", "Node.js", "MongoDB", "Redis", "Stripe"],
    mainImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800"
    ],
    liveUrl: "https://optombazar.uz",
    featured: true,
    status: "completed",
    order: 1,
    client: "Optom Bazar LLC",
    duration: "6 oy"
  },
  {
    title: "CRM Sistema - BiznesPro",
    slug: "crm-biznespro",
    description: "Kichik va o'rta biznes uchun to'liq funksional CRM. Mijozlar boshqaruvi, savdo pipelines, avtomatik hisobotlar va Telegram bot integratsiyasi.",
    category: "crm-system",
    technologies: ["React", "Express", "PostgreSQL", "Telegraf", "Docker"],
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    liveUrl: "https://biznespro.uz",
    featured: true,
    status: "completed",
    order: 2,
    client: "BiznesPro",
    duration: "4 oy"
  },
  {
    title: "Telegram Bot - Avtomobil Qidiruv",
    slug: "telegram-bot-auto-search",
    description: "O'zbekistondagi barcha avtomobil e'lonlarini bitta botda qidiradigan intelligent bot. AI bilan narx tahlili va shaxsiy tavsiyalar.",
    category: "telegram-bot",
    technologies: ["Node.js", "Telegraf", "MongoDB", "AI API", "Web Scraping"],
    mainImage: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200",
    images: [
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800"
    ],
    githubUrl: "https://github.com/evolvoai/auto-search-bot",
    featured: true,
    status: "completed",
    order: 3,
    client: "AutoMarket.uz",
    duration: "2 oy"
  },
  {
    title: "AI Chat Assistant - MedBot",
    slug: "ai-chatbot-medbot",
    description: "Tibbiy maslahat beruvchi AI chatbot. Gemini AI asosida ishlab chiqilgan, 24/7 dastlabki konsultatsiya va shifokorga yo'naltirish.",
    category: "ai-integration",
    technologies: ["Next.js", "Gemini AI", "OpenAI", "WebSocket", "Redis"],
    mainImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
    ],
    liveUrl: "https://medbot.uz",
    featured: true,
    status: "completed",
    order: 4,
    client: "MedClinic Network",
    duration: "3 oy"
  },
  {
    title: "Mobile App - Ta'lim Platformasi",
    slug: "mobile-app-talim",
    description: "O'zbekiston o'quvchilari uchun interaktiv ta'lim mobil ilovasi. Video darslar, testlar, online mentorlar va gamification.",
    category: "mobile-app",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "AWS"],
    mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
    ],
    featured: false,
    status: "completed",
    order: 5,
    client: "Talim.uz",
    duration: "8 oy"
  },
  {
    title: "Web App - Uy-Joy Portal",
    slug: "web-app-uyjoy",
    description: "Zamonaviy ko'chmas mulk platformasi. Virtual turlar, ipoteka kalkulyatori, agent chati va AI-powered narx bashorati.",
    category: "web-app",
    technologies: ["Vue.js", "Laravel", "MySQL", "Stripe", "Google Maps API"],
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
    ],
    liveUrl: "https://uyjoy.uz",
    featured: false,
    status: "completed",
    order: 6,
    client: "UyJoy Group",
    duration: "5 oy"
  },
  {
    title: "Avtomatlashtirish - Omborxona Tizimi",
    slug: "automation-warehouse",
    description: "To'liq avtomatlashtirilgan omborxona boshqaruv tizimi. Barcode scanner, IoT sensorlar, real-time tracking va avtomatik buyurtma.",
    category: "web-app",
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "IoT", "RFID"],
    mainImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
    ],
    featured: false,
    status: "completed",
    order: 7,
    client: "LogistikPro LLC",
    duration: "7 oy"
  },
  {
    title: "Telegram Bot - Ovqat Yetkazib Berish",
    slug: "telegram-bot-food-delivery",
    description: "Restoran va kafe uchun Telegram orqali buyurtma qabul qilish boti. Online to'lov, real-time tracking va kuryerlar bilan integratsiya.",
    category: "telegram-bot",
    technologies: ["Node.js", "Telegraf", "MongoDB", "Payme API", "Click API"],
    mainImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200",
    images: [
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
    ],
    featured: false,
    status: "completed",
    order: 8,
    client: "FastFood Network",
    duration: "2 oy"
  },
  {
    title: "AI Integratsiya - Smart Office",
    slug: "ai-smart-office",
    description: "Ofis avtomatlashtirish uchun AI yechim. Yuzni tanish bilan kirish, harorat/yorug'lik avtomatik sozlash, uchrashuv xonalari booking.",
    category: "ai-integration",
    technologies: ["Python", "TensorFlow", "OpenCV", "Raspberry Pi", "MQTT"],
    mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
    ],
    featured: false,
    status: "in-progress",
    order: 9,
    client: "TechPark Tashkent",
    duration: "4 oy"
  },
  {
    title: "Web Portal - Online Kurslar",
    slug: "web-portal-courses",
    description: "Kasbiy kurslar platformasi. Live darslar, sertifikatlar, mentorlik, to'lovlar va talabalar uchun shaxsiy kabinet.",
    category: "web-app",
    technologies: ["Next.js", "Node.js", "MongoDB", "WebRTC", "Stripe"],
    mainImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200",
    images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"
    ],
    liveUrl: "https://kurslar.uz",
    featured: false,
    status: "completed",
    order: 10,
    client: "IT Academy",
    duration: "6 oy"
  }
];

async function seedPortfolio() {
  try {
    // MongoDB'ga ulanish
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB ulanish muvaffaqiyatli');

    // Mavjud portfoliolarni o'chirish (ixtiyoriy)
    const existingCount = await Portfolio.countDocuments();
    console.log(`Mavjud portfoliolar: ${existingCount}`);

    // Demo portfoliolarni qo'shish
    for (const portfolioData of demoPortfolios) {
      // Slug bo'yicha tekshirish
      const existing = await Portfolio.findOne({ slug: portfolioData.slug });
      
      if (existing) {
        console.log(`⚠️  "${portfolioData.title}" allaqachon mavjud, o'tkazib yuborildi`);
        continue;
      }

      const portfolio = new Portfolio(portfolioData);
      await portfolio.save();
      console.log(`✅ "${portfolioData.title}" qo'shildi`);
    }

    console.log('\n🎉 Portfolio seed muvaffaqiyatli yakunlandi!');
    console.log(`Jami qo'shildi: ${demoPortfolios.length} ta loyiha`);

  } catch (error) {
    console.error('❌ Xatolik:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB ulanish yopildi');
  }
}

// Script ishga tushirish
seedPortfolio();
