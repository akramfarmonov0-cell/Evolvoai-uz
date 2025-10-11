require('dotenv').config();
const mongoose = require('mongoose');

// Post modelini import qilish
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: String,
  tags: [String],
  slug: { type: String, required: true, unique: true },
  image: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isAIGenerated: { type: Boolean, default: true },
  publishedToTelegram: { type: Boolean, default: false },
  telegramMessageId: Number
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// Telegram bot
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function createTestPostWithImage() {
  try {
    console.log('🔌 MongoDB ga ulanmoqda...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ga ulandi\n');

    // Test post ma'lumotlari
    const testPost = {
      title: "Test Post - Rasm bilan AI Texnologiyalari",
      content: `
# Sun'iy Intellekt: Kelajak Texnologiyasi

Sun'iy intellekt (AI) zamonaviy dunyo uchun eng muhim texnologiyalardan biridir. Bu texnologiya biznes, ta'lim, sog'liqni saqlash va boshqa ko'plab sohalarda inqilob yaratmoqda.

## AI'ning Asosiy Afzalliklari

1. **Avtomatlashtirish** - Takroriy vazifalarni avtomatlashtirish
2. **Tahlil** - Katta ma'lumotlarni tez tahlil qilish
3. **Bashorat** - Kelajakdagi tendensiyalarni oldindan ko'rish
4. **Optimizatsiya** - Biznes jarayonlarini yaxshilash

## EvolvoAI bilan AI Integratsiyasi

Biz EvolvoAI'da sizning biznesingizga sun'iy intellekt texnologiyalarini integratsiya qilamiz:

- 🤖 AI Chatbotlar yaratish
- 📊 Ma'lumotlarni tahlil qilish tizimlari
- 🎯 Marketing avtomatlashtirish
- 💼 Biznes jarayonlarini optimizatsiya

## Kelajak Istiqbollari

AI texnologiyalari kundan-kunga rivojlanmoqda. 2024-2025 yillarda biz yanada ko'proq AI-powered yechimlarni ko'ramiz.

Sizning biznesingiz uchun AI yechimlarini muhokama qilish uchun biz bilan bog'laning!
      `,
      category: "ai-integration",
      excerpt: "Sun'iy intellekt texnologiyalari haqida batafsil ma'lumot. AI'ning afzalliklari, qo'llanilishi va kelajak istiqbollari.",
      tags: ["AI", "Sun'iy Intellekt", "Texnologiya", "Avtomatlashtirish", "Machine Learning"],
      slug: "test-post-ai-technologies-" + Date.now(),
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", // AI themed image
      isAIGenerated: true
    };

    console.log('📝 Test post yaratilmoqda...');
    const post = new Post(testPost);
    await post.save();
    console.log('✅ Post ma\'lumotlar bazasiga saqlandi!');
    console.log(`   ID: ${post._id}`);
    console.log(`   Slug: ${post.slug}\n`);

    // Telegram'ga yuborish
    console.log('📤 Telegram kanalga yuborilmoqda...');
    try {
      const escapeMarkdown = (text) => {
        return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
      };

      const cleanTags = testPost.tags.map(tag => 
        '#' + tag.replace(/[^a-zA-Z0-9_]/g, '_').replace(/_{2,}/g, '_')
      ).join(' ');

      const caption = 
        `📝 *${escapeMarkdown(testPost.title)}*\n\n` +
        `${escapeMarkdown(testPost.excerpt)}\n\n` +
        `🔗 To'liq o'qish: https://evolvoai.uz/blog/${testPost.slug}\n\n` +
        `#${testPost.category.replace(/-/g, '_')} ${cleanTags}`;

      const result = await bot.telegram.sendPhoto(
        process.env.TELEGRAM_CHANNEL_ID,
        testPost.image,
        { 
          caption: caption,
          parse_mode: 'Markdown'
        }
      );

      // Telegram ma'lumotlarini saqlash
      post.publishedToTelegram = true;
      post.telegramMessageId = result.message_id;
      await post.save();

      console.log('✅ Telegram kanalga yuborildi!');
      console.log(`   Message ID: ${result.message_id}\n`);
    } catch (telegramError) {
      console.error('❌ Telegram xatosi:', telegramError.message);
      console.log('⚠️  Post faqat ma\'lumotlar bazasiga saqlandi\n');
    }

    console.log('🎉 Test post muvaffaqiyatli yaratildi!');
    console.log('\n📊 Natija:');
    console.log(`   - Post ID: ${post._id}`);
    console.log(`   - Sarlavha: ${post.title}`);
    console.log(`   - Kategoriya: ${post.category}`);
    console.log(`   - Rasm: ${post.image}`);
    console.log(`   - Telegram: ${post.publishedToTelegram ? '✅ Yuborildi' : '❌ Yuborilmadi'}`);
    console.log('\n🌐 Ko\'rish: http://localhost:3000/blog/' + post.slug);

  } catch (error) {
    console.error('❌ Xatolik:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 MongoDB aloqasi tugatildi');
    process.exit(0);
  }
}

createTestPostWithImage();
