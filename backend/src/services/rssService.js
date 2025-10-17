const Parser = require('rss-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Post = require('../models/Post');
const crypto = require('crypto');
const fetch = require('node-fetch');
const { sendPostToTelegram } = require('./telegramService');

const parser = new Parser();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// RSS manbalar
const RSS_SOURCES = [
  // O'zbekiston yangiliklari
  {
    name: 'Kun.uz',
    url: 'https://kun.uz/news/rss',
    category: 'news',
    subcategory: 'uzbekistan'
  },
  {
    name: 'Stadion.uz',
    url: 'https://stadion.uz/news/rss',
    category: 'news',
    subcategory: 'sport'
  },
  
  // AI va Texnologiya yangiliklari
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss/',
    category: 'ai-integration',
    subcategory: 'ai'
  },
  {
    name: 'Google AI Blog',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    category: 'ai-integration',
    subcategory: 'ai'
  },
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'news',
    subcategory: 'technology'
  },
  {
    name: 'AI Trends',
    url: 'https://www.aitrends.com/feed/',
    category: 'ai-integration',
    subcategory: 'business'
  },
  {
    name: 'Machine Learning Mastery',
    url: 'https://machinelearningmastery.com/blog/feed/',
    category: 'ai-integration',
    subcategory: 'ai'
  },
  {
    name: 'AI Weekly',
    url: 'https://aiweekly.co/issues.rss',
    category: 'ai-integration',
    subcategory: 'ai'
  },
  
  // Qo'shimcha texnologiya va biznes manbalari
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'news',
    subcategory: 'technology'
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    category: 'news',
    subcategory: 'technology'
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'news',
    subcategory: 'technology'
  },
  {
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    category: 'news',
    subcategory: 'technology'
  },
  {
    name: 'VentureBeat',
    url: 'https://venturebeat.com/feed/',
    category: 'news',
    subcategory: 'business'
  },
  {
    name: 'Hacker News',
    url: 'https://hnrss.org/frontpage',
    category: 'news',
    subcategory: 'technology'
  },
  
  // Web Development va Programming
  {
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    category: 'web-development',
    subcategory: 'technology'
  },
  {
    name: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    category: 'web-development',
    subcategory: 'technology'
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/feed',
    category: 'web-development',
    subcategory: 'technology'
  },
  {
    name: 'A List Apart',
    url: 'https://alistapart.com/main/feed/',
    category: 'web-development',
    subcategory: 'technology'
  },
  
  // Cybersecurity
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'cybersecurity',
    subcategory: 'security'
  },
  {
    name: 'Dark Reading',
    url: 'https://www.darkreading.com/rss_simple.asp',
    category: 'cybersecurity',
    subcategory: 'security'
  },
  {
    name: 'SecurityLab.ru',
    url: 'https://www.securitylab.ru/_services/export/rss/',
    category: 'cybersecurity',
    subcategory: 'security'
  },
  
  // Blockchain va Cryptocurrency
  {
    name: 'CoinDesk',
    url: 'https://feeds.feedburner.com/CoinDesk',
    category: 'blockchain',
    subcategory: 'technology'
  },
  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com/rss',
    category: 'blockchain',
    subcategory: 'technology'
  },
  
  // Mobile va UX/UI
  {
    name: 'UX Planet',
    url: 'https://uxplanet.org/feed',
    category: 'ui-ux-design',
    subcategory: 'technology'
  },
  {
    name: 'Android Developers Blog',
    url: 'https://android-developers.googleblog.com/feeds/posts/default',
    category: 'mobile-apps',
    subcategory: 'technology'
  },
  
  // Cloud va DevOps
  {
    name: 'AWS News Blog',
    url: 'https://aws.amazon.com/blogs/aws/feed/',
    category: 'cloud-services',
    subcategory: 'technology'
  },
  {
    name: 'Google Cloud Blog',
    url: 'https://cloud.google.com/blog/rss/',
    category: 'cloud-services',
    subcategory: 'technology'
  },
  
  // O'zbekiston IT va biznes
  {
    name: 'IT Park Uzbekistan',
    url: 'https://itpark.uz/feed/',
    category: 'news',
    subcategory: 'uzbekistan'
  },
  {
    name: 'Spot.uz',
    url: 'https://www.spot.uz/feed/',
    category: 'news',
    subcategory: 'uzbekistan'
  },
  {
    name: 'Gazeta.uz',
    url: 'https://www.gazeta.uz/feed/',
    category: 'news',
    subcategory: 'uzbekistan'
  }
];

// Slug yaratish funksiyasi
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

// Markdown belgilarini tozalash
function stripMarkdownInline(text) {
  if (!text) return '';
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`~>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// RSS dan yangiliklar olish
async function fetchRSSFeed(source) {
  try {
    console.log(`📡 ${source.name} dan RSS olinmoqda...`);
    const feed = await parser.parseURL(source.url);
    
    // So'nggi 48 soat ichidagi yangiliklar (ko'proq kontent uchun)
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    const articles = feed.items
      .filter(item => {
        const pubDate = new Date(item.pubDate || item.isoDate);
        return pubDate > twoDaysAgo; // So'nggi 2 kun ichidagi yangiliklar
      })
      .slice(0, 4) // Har bir manbadan maksimal 4 ta (ko'proq post uchun)
      .map(item => ({
        title: item.title,
        content: item.content || item.contentSnippet || item.description,
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        source: source.name,
        category: source.category,
        subcategory: source.subcategory
      }));

    console.log(`✅ ${source.name}: ${articles.length} ta yangi yangilik olindi`);
    return articles;
  } catch (error) {
    console.error(`❌ ${source.name} RSS xatosi:`, error.message);
    return [];
  }
}

// AI orqali maqolani qayta yozish
async function rewriteArticle(article) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Kategoriyaga qarab turli prompt'lar
    const isAITech = article.category === 'ai-integration' || article.subcategory === 'ai' || article.subcategory === 'technology';
    const isNews = article.category === 'news';
    
    let contentType = 'yangilik';
    let targetAudience = 'yangiliklar o\'quvchilari';
    let writingStyle = 'yangiliklar uslubida';
    
    if (isAITech && !isNews) {
      contentType = 'blog maqola';
      targetAudience = 'IT mutaxassislari va texnologiya qiziquvchilari';
      writingStyle = 'ta\'limiy-amaliy uslubda';
    }
    
    const prompt = `
Siz professional ${contentType} muharriri va maqola yozuvchisisiz. Quyidagi kontentni o'zbek tilidagi professional, qiziqarli va SEO-optimallashtirilgan ${contentType}ga aylantiring.

ASL KONTENT:
Sarlavha: ${article.title}
Mazmun: ${article.content}
Manba: ${article.source}
Kategoriya: ${article.category}
Maqsadli auditoriya: ${targetAudience}

TALABLAR:
1. Mazmunni to'liq saqlab qoling, lekin uslubni o'zgartiring
2. O'zbek tilidagi ${writingStyle} yozing
3. SEO uchun optimallashtirilgan bo'lsin
4. Qiziqarli va o'qishga oson bo'lsin
5. Texnik terminlarni o'zbek tilida tushuntiring
6. Manba ma'lumotlarini saqlab qoling
7. ${isAITech ? 'Amaliy maslahatlar va misollar qo\'shing' : 'Voqeaning ahamiyatini ta\'kidlang'}

FORMAT:
SARLAVHA: [50-70 ta belgidan iborat, e'tiborni jalb qiluvchi sarlavha]

QISQACHA MAZMUN: [150-200 ta belgidan iborat qisqacha tavsif]

ASOSIY MATN: [${isAITech ? '800-1200' : '600-1000'} ta so'zdan iborat batafsil ${contentType}. Quyidagi jihatlarni qamrab oling:
${isAITech ? 
  '- Texnologiyaning ahamiyati\n- Amaliy qo\'llanilishi\n- O\'zbekiston uchun imkoniyatlar\n- Kelajakdagi rivojlanish\n- Amaliy maslahatlar' : 
  '- Voqeaning ahamiyati\n- Batafsil tahlil\n- Kontekst va fon ma\'lumotlari\n- Kelajakdagi ta\'sirlar'
}]

TEGLAR: [5-7 ta relevant kalit so'z, vergul bilan ajratilgan]

Eslatma: ${contentType} o'zbek tilida, ${writingStyle}, lekin tushunarliroq yozilsin. Asl manbani hurmat qiling.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Javobni parsing qilish
    const titleMatch = response.match(/SARLAVHA:\s*(.+?)(?=\n|$)/i);
    const excerptMatch = response.match(/QISQACHA MAZMUN:\s*(.+?)(?=\n\n|ASOSIY)/is);
    const contentMatch = response.match(/ASOSIY MATN:\s*(.+?)(?=\n\nTEGLAR|$)/is);
    const tagsMatch = response.match(/TEGLAR:\s*(.+?)(?=\n|$)/i);

    const title = titleMatch ? titleMatch[1].trim() : article.title;
    const excerpt = excerptMatch ? excerptMatch[1].trim() : response.substring(0, 200);
    const content = contentMatch ? contentMatch[1].trim() : response;
    const defaultTags = isAITech ? 
      [article.subcategory, 'AI', 'texnologiya', 'sun\'iy intellekt', 'innovatsiya'] :
      [article.subcategory, 'yangiliklar', 'O\'zbekiston'];
    
    const tags = tagsMatch 
      ? tagsMatch[1].split(',').map(tag => tag.trim())
      : defaultTags;

    // Belgilarni tozalash
    const cleanTitle = stripMarkdownInline(title);
    const cleanExcerpt = stripMarkdownInline(excerpt);
    const cleanTags = tags.map(t => stripMarkdownInline(t)).filter(Boolean);

    return {
      title: cleanTitle,
      content,
      excerpt: cleanExcerpt,
      tags: cleanTags,
      category: article.category,
      subcategory: article.subcategory,
      slug: generateSlug(cleanTitle),
      originalSource: article.source,
      originalLink: article.link,
      isAIGenerated: true,
      isRewritten: true
    };

  } catch (error) {
    console.error('AI qayta yozish xatosi:', error);
    throw error;
  }
}

// Unikal rasm olish
async function getUniqueImage(category, subcategory = null) {
  try {
    // Kategoriyaga mos qidiruv so'zlari
    const searchQueries = {
      'ai-integration': ['artificial intelligence', 'AI technology', 'machine learning'],
      'web-development': ['web development', 'programming', 'coding'],
      'cybersecurity': ['cybersecurity', 'data security', 'hacking'],
      'blockchain': ['blockchain', 'cryptocurrency', 'bitcoin'],
      'news': ['technology news', 'business', 'innovation'],
      'mobile-apps': ['mobile app', 'smartphone', 'technology'],
      'cloud-services': ['cloud computing', 'server', 'technology'],
      'ui-ux-design': ['UI design', 'UX design', 'web design']
    };

    const queries = searchQueries[category] || ['technology', 'business', 'innovation'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    const attempts = 5;
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(randomQuery)}&orientation=landscape&w=1080&h=600`,
          {
            headers: {
              'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY || 'demo-key'}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.urls?.regular || data.urls?.small;
          
          if (imageUrl) {
            // Tekshirish - bu rasm avval ishlatilganmi
            const exists = await Post.exists({ image: imageUrl });
            if (!exists) {
              return imageUrl;
            }
          }
        }
      } catch (error) {
        console.log(`Rasm olishda xato (${i + 1}/${attempts}):`, error.message);
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    // Agar hech qanday rasm topilmasa, default rasm qaytarish
    return `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1080&h=600&fit=crop`;
    
  } catch (error) {
    console.error('Rasm olishda umumiy xato:', error);
    return `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1080&h=600&fit=crop`;
  }
}

// Kontent hash yaratish (dublikatlarni aniqlash uchun)
function createContentHash(title, content) {
  const normalizedContent = (title + ' ' + content)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('md5').update(normalizedContent).digest('hex');
}

// RSS yangilikni qayta ishlab saqlash
async function processAndSaveRSSArticle(article) {
  try {
    // Kontent hash yaratish
    const contentHash = createContentHash(article.title, article.content || '');
    
    // Avval bunday post mavjudligini tekshirish (turli usullar bilan)
    const existingPost = await Post.findOne({ 
      $or: [
        { originalLink: article.link },
        { title: { $regex: new RegExp(article.title.substring(0, 30).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } },
        { 'metadata.contentHash': contentHash }
      ]
    });

    if (existingPost) {
      console.log(`⏭️  Post allaqachon mavjud: ${article.title.substring(0, 50)}...`);
      return null;
    }

    console.log(`🤖 AI bilan qayta yozilmoqda: ${article.title.substring(0, 50)}...`);
    
    // AI bilan qayta yozish
    const rewrittenArticle = await rewriteArticle(article);
    
    // Slug uniquelikni tekshirish
    let slug = rewrittenArticle.slug;
    let counter = 1;
    while (await Post.findOne({ slug })) {
      slug = `${rewrittenArticle.slug}-${counter}`;
      counter++;
    }
    rewrittenArticle.slug = slug;

    // Rasm olish
    const image = await getUniqueImage(rewrittenArticle.category, rewrittenArticle.subcategory);
    rewrittenArticle.image = image;

    // Metadata qo'shish
    rewrittenArticle.metadata = {
      contentHash,
      originalTitle: article.title,
      processedAt: new Date(),
      rssSource: article.source
    };

    // Postni saqlash
    const post = new Post(rewrittenArticle);
    await post.save();

    // Telegram kanalga yuborish
    try {
      console.log(`📤 Telegram kanalga yuborilmoqda: ${post.title.substring(0, 50)}...`);
      const messageId = await sendPostToTelegram(post);
      post.publishedToTelegram = true;
      post.telegramMessageId = messageId;
      await post.save();
      console.log(`✅ Telegram kanalga yuborildi (ID: ${messageId}): ${post.title.substring(0, 50)}...`);
    } catch (telegramError) {
      console.error(`❌ Telegram yuborish xatosi: ${telegramError.message}`);
      console.error(`   Post: ${post.title.substring(0, 50)}...`);
    }

    console.log(`✅ RSS post saqlandi: ${rewrittenArticle.title.substring(0, 50)}...`);
    return post;

  } catch (error) {
    console.error('RSS post saqlash xatosi:', error);
    return null;
  }
}

// Barcha RSS manbalardan yangiliklar olish va qayta ishlash
async function fetchAndProcessAllRSS() {
  console.log('🔄 RSS yangiliklar jarayoni boshlandi...');
  
  const results = [];
  let totalProcessed = 0;
  let totalSaved = 0;
  
  for (const source of RSS_SOURCES) {
    try {
      // RSS dan yangiliklar olish
      const articles = await fetchRSSFeed(source);
      totalProcessed += articles.length;
      
      // Har bir yangilikni qayta ishlash
      for (const article of articles) {
        const savedPost = await processAndSaveRSSArticle(article);
        if (savedPost) {
          totalSaved++;
          results.push({
            success: true,
            source: source.name,
            title: savedPost.title,
            postId: savedPost._id
          });
        } else {
          results.push({
            success: false,
            source: source.name,
            title: article.title.substring(0, 50),
            reason: 'Dublikat yoki xato'
          });
        }
        
        // Rate limiting uchun kutish (tezroq)
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Manbalar orasida kutish (tezroq)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`❌ ${source.name} jarayoni xatosi:`, error);
      results.push({
        success: false,
        source: source.name,
        error: error.message
      });
    }
  }
  
  console.log(`🏁 RSS jarayoni tugadi. ${totalProcessed} ta yangilik tekshirildi, ${totalSaved} ta yangi post yaratildi.`);
  return results;
}

// Bitta RSS manbadan yangilik olish
async function fetchFromSingleRSS(sourceName) {
  const source = RSS_SOURCES.find(s => s.name === sourceName);
  if (!source) {
    throw new Error(`RSS manba topilmadi: ${sourceName}`);
  }
  
  console.log(`🔍 ${sourceName} dan yangiliklar qidirilmoqda...`);
  const articles = await fetchRSSFeed(source);
  const results = [];
  
  for (const article of articles) {
    const savedPost = await processAndSaveRSSArticle(article);
    if (savedPost) {
      results.push(savedPost);
    }
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  console.log(`✅ ${sourceName}: ${results.length} ta yangi post yaratildi`);
  return results;
}

module.exports = {
  fetchAndProcessAllRSS,
  fetchFromSingleRSS,
  RSS_SOURCES
};
