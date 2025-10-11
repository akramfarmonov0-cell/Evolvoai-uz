const { GoogleGenerativeAI } = require('@google/generative-ai');
const Post = require('../models/Post');
const { sendPostToTelegram } = require('./telegramService');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}
const fetch = require('node-fetch');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CATEGORIES = [
  'web-development',
  'telegram-bots',
  'chatbots',
  'automation',
  'ai-integration',
  'mobile-apps',
  'e-commerce',
  'crm-systems',
  'cloud-services',
  'cybersecurity',
  'digital-marketing',
  'ui-ux-design',
  'blockchain',
  'iot'];

async function generatePost(category) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
Siz professional IT kompaniyasi EvolvoAI uchun blog post yozuvchisisiz. 
Quyidagi mavzu bo'yicha qiziqarli, ma'lumotli va SEO-optimallashtirilgan maqola yozing:

Kategoriya: ${category}

Maqola quyidagi formatda bo'lsin:

SARLAVHA: [50-60 ta belgidan iborat, e'tiborni jalb qiluvchi sarlavha]

QISQACHA MAZMUN: [150-200 ta belgidan iborat qisqacha tavsif]

ASOSIY MATN: [800-1200 ta so'zdan iborat batafsil maqola. Quyidagi jihatlarni qamrab oling:
- Mavzuning ahamiyati
- Zamonaviy tendensiyalar
- Amaliy maslahatlar
- EvolvoAI xizmatlari bilan bog'liqliq
- Kelajak istiqbollari]

TEGLAR: [5-7 ta relevant kalit so'z, vergul bilan ajratilgan]

Eslatma: Maqola o'zbek tilida, rasmiy-ish uslubida, lekin tushunarliroq yozilsin.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Javobni parsing qilish
    const titleMatch = response.match(/SARLAVHA:\s*(.+?)(?=\n|$)/i);
    const excerptMatch = response.match(/QISQACHA MAZMUN:\s*(.+?)(?=\n\n|ASOSIY)/is);
    const contentMatch = response.match(/ASOSIY MATN:\s*(.+?)(?=\n\n TEGLAR|$)/is);
    const tagsMatch = response.match(/TEGLAR:\s*(.+?)(?=\n|$)/i);

    const title = titleMatch ? titleMatch[1].trim() : `${category} bo'yicha yangiliklarni oʻqing`;
    const excerpt = excerptMatch ? excerptMatch[1].trim() : response.substring(0, 200);
    const content = contentMatch ? contentMatch[1].trim() : response;
    const tags = tagsMatch 
      ? tagsMatch[1].split(',').map(tag => tag.trim())
      : [category, 'IT', 'texnologiya', 'EvolvoAI'];

    // Rasm olish
    const image = await getRandomImage(category);

    return {
      title,
      content,
      category,
      excerpt,
      tags,
      slug: generateSlug(title),
      image
    };
  } catch (error) {
    console.error('Gemini API xatosi:', error);
    throw error;
  }
}

async function generateAndPublishPosts() {
  const postsToGenerate = 15;
  const results = [];

  // Har bir kategoriyadan tasodifiy tanlash
  const selectedCategories = [];
  for (let i = 0; i < postsToGenerate; i++) {
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    selectedCategories.push(randomCategory);
  }

  console.log(`📝 ${postsToGenerate} ta post generatsiya qilinmoqda...`);

  for (const category of selectedCategories) {
    try {
      console.log(`⏳ ${category} uchun post yaratilmoqda...`);
      
      const postData = await generatePost(category);
      
      // Slug uniquelikni tekshirish
      let slug = postData.slug;
      let counter = 1;
      while (await Post.findOne({ slug })) {
        slug = `${postData.slug}-${counter}`;
        counter++;
      }
      postData.slug = slug;

      // Ma'lumotlar bazasiga saqlash
      const post = new Post(postData);
      await post.save();

      // Telegramga yuborish
      try {
        const messageId = await sendPostToTelegram(post);
        post.publishedToTelegram = true;
        post.telegramMessageId = messageId;
        await post.save();
      } catch (telegramError) {
        console.error('Telegram yuborish xatosi:', telegramError);
      }

      results.push({ success: true, category, postId: post._id });
      console.log(`✅ ${category} uchun post yaratildi`);

      // API rate limit uchun kutish
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ ${category} uchun xatolik:`, error);
      results.push({ success: false, category, error: error.message });
    }
  }

  return results;
}

async function getRandomImage(category) {
  try {
    // Kategoriyaga mos qidiruv so'zlari
    const searchQueries = {
      'web-development': 'web development programming code computer',
      'telegram-bots': 'chatbot robot artificial intelligence messaging',
      'chatbots': 'artificial intelligence chat robot technology',
      'automation': 'automation robot technology industry machinery',
      'ai-integration': 'artificial intelligence machine learning technology',
      'mobile-apps': 'mobile app smartphone technology development',
      'e-commerce': 'online shopping ecommerce business digital',
      'crm-systems': 'business management customer service office',
      'data-analytics': 'data analytics charts graphs statistics',
      'cloud-services': 'cloud computing server technology network',
      'cybersecurity': 'cybersecurity security technology protection',
      'digital-marketing': 'digital marketing social media advertising',
      'ui-ux-design': 'user interface design web design creative',
      'blockchain': 'blockchain cryptocurrency technology digital',
      'iot': 'internet of things smart devices technology'
    };

    const query = searchQueries[category] || 'technology computer programming';
    
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Unsplash rasm olish xatosi:', error);
    return null;
  }
}

module.exports = {
  generatePost,
  generateAndPublishPosts
};