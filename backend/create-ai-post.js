require('dotenv').config();
const { generatePost } = require('./src/services/contentGenerator');
const { sendPostToTelegram } = require('./src/services/telegramService');
const mongoose = require('mongoose');
const Post = require('./src/models/Post');

async function createAIPost() {
  try {
    console.log('🔌 MongoDB ga ulanmoqda...\n');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ga ulandi\n');

    console.log('🤖 AI bilan post generatsiya qilinmoqda...');
    console.log('⏳ Kutib turing, bu bir necha soniya davom etadi...\n');

    // AI bilan post yaratish
    const category = 'ai-integration'; // Kategoriya
    const postData = await generatePost(category);

    console.log('✅ AI post generatsiya qilindi!');
    console.log(`   📝 Sarlavha: ${postData.title}`);
    console.log(`   📂 Kategoriya: ${postData.category}`);
    console.log(`   🏷️  Teglar: ${postData.tags.join(', ')}\n`);

    // Slug uniquelikni tekshirish
    let slug = postData.slug;
    let counter = 1;
    while (await Post.findOne({ slug })) {
      slug = `${postData.slug}-${counter}`;
      counter++;
    }
    postData.slug = slug;

    // Ma'lumotlar bazasiga saqlash
    console.log('💾 Ma\'lumotlar bazasiga saqlanmoqda...');
    const post = new Post(postData);
    await post.save();
    console.log('✅ Saqlandi! Post ID:', post._id, '\n');

    // Telegram'ga yuborish
    console.log('📤 Telegram kanalga yuborilmoqda...');
    try {
      const messageId = await sendPostToTelegram(post);
      post.publishedToTelegram = true;
      post.telegramMessageId = messageId;
      await post.save();
      console.log('✅ Telegram\'ga yuborildi! Message ID:', messageId, '\n');
    } catch (telegramError) {
      console.error('❌ Telegram xatosi:', telegramError.message, '\n');
    }

    console.log('═══════════════════════════════════════════════════');
    console.log('   🎉 AI POST MUVAFFAQIYATLI YARATILDI!');
    console.log('═══════════════════════════════════════════════════\n');
    
    console.log('📊 POST MA\'LUMOTLARI:');
    console.log('─────────────────────────────────────────────────');
    console.log(`ID:         ${post._id}`);
    console.log(`Sarlavha:   ${post.title}`);
    console.log(`Kategoriya: ${post.category}`);
    console.log(`Slug:       ${post.slug}`);
    console.log(`Rasm:       ${post.image ? '✅ Mavjud' : '❌ Yo\'q'}`);
    console.log(`Telegram:   ${post.publishedToTelegram ? '✅ Yuborildi' : '❌ Yuborilmadi'}`);
    console.log('─────────────────────────────────────────────────\n');

    console.log('🌐 WEB SAYTDA KO\'RISH:');
    console.log(`   http://localhost:3000/blog/${post.slug}\n`);

    console.log('📱 TELEGRAM KANALDA KO\'RISH:');
    console.log(`   https://t.me/evolvoai_news\n`);

  } catch (error) {
    console.error('❌ Xatolik:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 MongoDB aloqasi tugatildi\n');
    process.exit(0);
  }
}

createAIPost();
