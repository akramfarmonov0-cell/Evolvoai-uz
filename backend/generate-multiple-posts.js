require('dotenv').config();
const { generatePost } = require('./src/services/contentGenerator');
const { sendPostToTelegram } = require('./src/services/telegramService');
const mongoose = require('mongoose');
const Post = require('./src/models/Post');

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
  'iot'
];

async function generateMultiplePosts(count = 3) {
  try {
    console.log('═══════════════════════════════════════════════════');
    console.log(`   🤖 ${count} TA AI POST YARATISH`);
    console.log('═══════════════════════════════════════════════════\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ga ulandi\n');

    const results = [];

    for (let i = 0; i < count; i++) {
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`   POST ${i + 1}/${count}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

      // Tasodifiy kategoriya tanlash
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      
      console.log(`📂 Kategoriya: ${category}`);
      console.log('🤖 AI post generatsiya qilinmoqda...');
      console.log('⏳ Kutib turing...\n');

      try {
        // AI bilan post yaratish
        const postData = await generatePost(category);

        console.log(`✅ Post yaratildi!`);
        console.log(`   📝 ${postData.title.substring(0, 60)}...`);

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
        console.log(`✅ Ma'lumotlar bazasiga saqlandi`);

        // Telegram'ga yuborish
        try {
          const messageId = await sendPostToTelegram(post);
          post.publishedToTelegram = true;
          post.telegramMessageId = messageId;
          await post.save();
          console.log(`✅ Telegram'ga yuborildi (Message ID: ${messageId})`);
        } catch (telegramError) {
          console.log(`⚠️  Telegram xatosi: ${telegramError.message}`);
        }

        results.push({
          success: true,
          category,
          title: post.title,
          slug: post.slug,
          telegram: post.publishedToTelegram
        });

        console.log(`\n🌐 Ko'rish: http://localhost:3000/blog/${post.slug}`);

        // Rate limit uchun kutish (2 soniya)
        if (i < count - 1) {
          console.log('\n⏳ Keyingi post uchun kutish (2 soniya)...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

      } catch (error) {
        console.error(`\n❌ Xatolik: ${error.message}`);
        results.push({
          success: false,
          category,
          error: error.message
        });
      }
    }

    console.log('\n\n═══════════════════════════════════════════════════');
    console.log('   📊 NATIJALAR');
    console.log('═══════════════════════════════════════════════════\n');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Muvaffaqiyatli: ${successful.length}/${count}`);
    console.log(`❌ Xatolik: ${failed.length}/${count}\n`);

    if (successful.length > 0) {
      console.log('✅ YARATILGAN POSTLAR:\n');
      successful.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title}`);
        console.log(`   Kategoriya: ${result.category}`);
        console.log(`   Telegram: ${result.telegram ? '✅' : '❌'}`);
        console.log(`   URL: http://localhost:3000/blog/${result.slug}\n`);
      });
    }

    if (failed.length > 0) {
      console.log('❌ XATOLIKLAR:\n');
      failed.forEach((result, index) => {
        console.log(`${index + 1}. Kategoriya: ${result.category}`);
        console.log(`   Xato: ${result.error}\n`);
      });
    }

    console.log('═══════════════════════════════════════════════════');
    console.log('   🎉 YAKUNLANDI!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📱 Telegram kanal: https://t.me/evolvoai_news');
    console.log('🌐 Blog sahifa: http://localhost:3000/blog\n');

  } catch (error) {
    console.error('❌ Fatal xatolik:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 MongoDB aloqasi tugatildi\n');
    process.exit(0);
  }
}

// Command line argumentdan post sonini olish
const count = parseInt(process.argv[2]) || 3;
generateMultiplePosts(count);
