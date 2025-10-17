const { GoogleGenerativeAI } = require('@google/generative-ai');
const Post = require('../models/Post');
const { sendPostToTelegram } = require('./telegramService');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

// Markdown belgilarini sarlavha/annotatsiyadan olib tashlash
function stripMarkdownInline(text) {
  if (!text) return '';
  return text
    // ![alt](url) yoki [label](url)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Heading va markerlar: # * _ ` ~ > |
    .replace(/[#*_`~>|]/g, '')
    // Ortiqcha bo'shliqlar
    .replace(/\s+/g, ' ')
    .trim();
}

async function generateBatch(newsCount = 7, blogCount = 5) {
  const results = [];
  const blogCategoriesPool = CATEGORIES.filter(c => c !== 'news');

  // 7 ta news
  for (let i = 0; i < newsCount; i++) {
    try {
      const r = await generateAndPublishOnePost('news');
      results.push({ type: 'news', ...r });
    } catch (e) {
      results.push({ type: 'news', success: false, error: e.message });
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  // 5 ta blog (bizning sohalar)
  for (let i = 0; i < blogCount; i++) {
    try {
      const category = blogCategoriesPool[Math.floor(Math.random() * blogCategoriesPool.length)];
      const r = await generateAndPublishOnePost(category);
      results.push({ type: 'blog', ...r });
    } catch (e) {
      results.push({ type: 'blog', success: false, error: e.message });
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  return results;
}
const hasGlobalFetch = (typeof globalThis !== 'undefined') && (typeof globalThis.fetch === 'function');
const __fetch = hasGlobalFetch ? globalThis.fetch : (function() {
  try { return require('node-fetch'); } catch (_) { return null; }
})();
const fetch = (...args) => {
  if (!__fetch) throw new Error('Fetch is not available in this environment');
  return __fetch(...args);
};

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
  'iot',
  'news'];

async function generatePost(category) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  // News uchun subkategoriyalarni aniqlash
  const newsSubcategories = ['technology', 'business', 'science', 'ai', 'security', 'sport', 'uzbekistan', 'world'];
  const isNewsCategory = category === 'news';
  
  let prompt = '';
  
  if (isNewsCategory) {
    const subcategory = newsSubcategories[Math.floor(Math.random() * newsSubcategories.length)];
    prompt = `
Siz professional yangiliklar sayti Realnews.uz uchun yangilik yozuvchisisiz. 
Quyidagi mavzu bo'yicha qiziqarli, ma'lumotli va SEO-optimallashtirilgan yangilik yozing:

Asosiy kategoriya: ${category}
Subkategoriya: ${subcategory}

Yangilik quyidagi formatda bo'lsin:

SARLAVHA: [50-60 ta belgidan iborat, e'tiborni jalb qiluvchi sarlavha]

QISQACHA MAZMUN: [150-200 ta belgidan iborat qisqacha tavsif]

ASOSIY MATN: [800-1200 ta so'zdan iborat batafsil yangilik. Quyidagi jihatlarni qamrab oling:
- Mavzuning ahamiyati
- So'nggi yangiliklar va tendensiyalar
- Tahlil va sharh
- Kelajakdagi rivojlanishlar]

TEGLAR: [5-7 ta relevant kalit so'z, vergul bilan ajratilgan]

Eslatma: Yangilik o'zbek tilida, rasmiy-ish uslubida, lekin tushunarliroq yozilsin.
`;
  } else {
    prompt = `
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
  }

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

    // Belgilarni tozalash (title/excerpt/tags)
    const cleanTitle = stripMarkdownInline(title);
    const cleanExcerpt = stripMarkdownInline(excerpt);
    const cleanTags = tags.map(t => stripMarkdownInline(t)).filter(Boolean);

    // News uchun subkategoriya aniqlash
    let subcategory = null;
    if (isNewsCategory) {
      const subcategoryMatch = response.match(/Subkategoriya:\s*(.+?)(?=\n|$)/i);
      subcategory = subcategoryMatch ? subcategoryMatch[1].trim() : null;
    }

    // Rasm olish (unikal bo'lsin)
    const image = await getUniqueImage(category, subcategory);

    return {
      title: cleanTitle,
      content,
      category,
      subcategory,
      excerpt: cleanExcerpt,
      tags: cleanTags,
      slug: generateSlug(cleanTitle),
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

async function getRandomImage(category, subcategory = null) {
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
      'iot': 'internet of things smart devices technology',
      'news': 'latest news technology business science'
    };

    // News subkategoriyalari uchun maxsus so'zlar
    const newsSubcategoryQueries = {
      'technology': 'technology news latest gadgets innovation',
      'business': 'business news finance economy market',
      'science': 'science news research discovery technology',
      'ai': 'artificial intelligence machine learning news',
      'security': 'cybersecurity news technology protection',
      'sport': 'sports news football soccer tennis olympics',
      'uzbekistan': 'uzbekistan news tashkent central asia latest',
      'world': 'world news international global breaking'
    };

    // Agar news kategoriyasi va subkategoriya mavjud bo'lsa, subkategoriya bo'yicha qidiruv
    let query = 'technology computer programming'; // default query
    
    if (category === 'news' && subcategory && newsSubcategoryQueries[subcategory]) {
      query = newsSubcategoryQueries[subcategory];
    } else if (searchQueries[category]) {
      query = searchQueries[category];
    }
    
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

// Unikal rasm olish: avvalgi postlarda ishlatilmagan URL qaytaradi
async function getUniqueImage(category, subcategory = null) {
  const attempts = 8;
  for (let i = 0; i < attempts; i++) {
    const url = await getRandomImage(category, subcategory);
    if (!url) continue;
    try {
      const exists = await Post.exists({ image: url });
      if (!exists) return url;
    } catch (_) {}
    // Rate-limit va takroriylikdan qochish uchun qisqa kutish
    await new Promise(r => setTimeout(r, 200));
  }
  return null;
}

async function generateAndPublishOnePost(preferredCategory = 'news') {
  try {
    const category = preferredCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const postData = await generatePost(category);

    // Slug uniquelikni tekshirish
    let slug = postData.slug;
    let counter = 1;
    while (await Post.findOne({ slug })) {
      slug = `${postData.slug}-${counter}`;
      counter++;
    }
    postData.slug = slug;

    const post = new Post(postData);
    await post.save();

    // Telegramga yuborish (agar sozlangan bo'lsa)
    try {
      const messageId = await sendPostToTelegram(post);
      post.publishedToTelegram = true;
      post.telegramMessageId = messageId;
      await post.save();
    } catch (telegramError) {
      console.error('Telegram yuborish xatosi:', telegramError);
    }

    return { success: true, category, postId: post._id, slug: post.slug };
  } catch (error) {
    console.error('❌ Yakka post generatsiya xatosi:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  generatePost,
  generateAndPublishPosts,
  generateAndPublishOnePost,
  generateBatch
};