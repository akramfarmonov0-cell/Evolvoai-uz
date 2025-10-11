require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('../src/models/Portfolio');

const demoPortfolios = [
  {
    title: 'E-commerce Platformasi',
    slug: 'e-commerce-platformasi',
    description: 'Zamonaviy onlayn do\'kon - to\'liq funksional e-commerce yechimi. Mahsulot katalogi, savatcha, to\'lov tizimi va admin paneli bilan.',
    category: 'e-commerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    mainImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://demo-ecommerce.evolvoai.uz',
    githubUrl: '',
    featured: true,
    status: 'completed',
    order: 1,
    client: 'ABC Company',
    duration: '3 oy'
  },
  {
    title: 'Telegram Bot - Avtomatik Buyurtmalar',
    slug: 'telegram-bot-buyurtmalar',
    description: 'Biznes uchun avtomatlashtirilgan telegram bot. Mijozlar buyurtmalarini qabul qilish, to\'lovlarni boshqarish va xabarnomalar yuborish imkoniyati.',
    category: 'telegram-bot',
    technologies: ['Python', 'Telegram API', 'PostgreSQL', 'Redis', 'Docker'],
    mainImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://t.me/demo_orders_bot',
    githubUrl: '',
    featured: true,
    status: 'completed',
    order: 2,
    client: 'RestaurantHub',
    duration: '1.5 oy'
  },
  {
    title: 'AI Chatbot - Mijozlar Xizmati',
    slug: 'ai-chatbot-customer-service',
    description: 'Sun\'iy intellekt asosidagi mijozlar xizmati chatbot. 24/7 mijozlarga javob beradi, savollarga yordam beradi va muammolarni hal qiladi.',
    category: 'ai-integration',
    technologies: ['OpenAI GPT-4', 'Next.js', 'FastAPI', 'Pinecone', 'Vercel'],
    mainImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://demo-chatbot.evolvoai.uz',
    githubUrl: '',
    featured: true,
    status: 'completed',
    order: 3,
    client: 'TechSupport Pro',
    duration: '2 oy'
  },
  {
    title: 'Korporativ Web Sayt',
    slug: 'korporativ-web-sayt',
    description: 'Zamonaviy korporativ web sayt. SEO optimallashtirilgan, responsive dizayn va admin paneli bilan to\'liq boshqaruv.',
    category: 'web-app',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vercel'],
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://demo-corporate.evolvoai.uz',
    githubUrl: '',
    featured: false,
    status: 'completed',
    order: 4,
    client: 'Global Corp',
    duration: '2.5 oy'
  },
  {
    title: 'CRM Tizimi',
    slug: 'crm-tizimi',
    description: 'Mijozlar bilan ishlash uchun CRM tizimi. Lidslarni boshqarish, vazifalar, hisobotlar va integratsiyalar.',
    category: 'crm-system',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://demo-crm.evolvoai.uz',
    githubUrl: '',
    featured: false,
    status: 'completed',
    order: 5,
    client: 'SalesPro',
    duration: '4 oy'
  },
  {
    title: 'Mobil Ilovasi - Fitness Tracker',
    slug: 'fitness-tracker-app',
    description: 'Fitness va salomatlik uchun mobil ilova. Mashqlar, ovqatlanish rejasi, progress tracking va ijtimoiy xususiyatlar.',
    category: 'mobile-app',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    mainImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop'
    ],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'completed',
    order: 6,
    client: 'FitLife',
    duration: '3.5 oy'
  }
];

async function createDemoPortfolio() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ga ulandi');

    // Avvalgi demo ma'lumotlarni o'chirish (agar kerak bo'lsa)
    // await Portfolio.deleteMany({});
    // console.log('🗑️  Eski portfoliolar o\'chirildi');

    // Yangi demo portfoliolarni yaratish
    for (const portfolioData of demoPortfolios) {
      const existing = await Portfolio.findOne({ slug: portfolioData.slug });
      
      if (!existing) {
        const portfolio = new Portfolio(portfolioData);
        await portfolio.save();
        console.log(`✅ Yaratildi: ${portfolio.title}`);
      } else {
        console.log(`⏭️  Allaqachon mavjud: ${portfolioData.title}`);
      }
    }

    console.log('\n🎉 Demo portfoliolar muvaffaqiyatli yaratildi!');
    console.log(`📊 Jami: ${demoPortfolios.length} ta loyiha`);
    
  } catch (error) {
    console.error('❌ Xatolik:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 MongoDB ulanishi yopildi');
  }
}

createDemoPortfolio();
