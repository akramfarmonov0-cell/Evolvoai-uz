// Yangi postlarni Telegram kanalga yuborish
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./src/models/Post');
const { sendPostToTelegram } = require('./src/services/telegramService');

async function publishUnpublishedPosts() {
  try {
    console.log('🚀 Telegram kanalga yuborish boshlandi...');
    
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evolvoai');
    console.log('✅ MongoDB ga ulandi');
    
    // Telegram kanalga yuborilmagan postlarni topish
    const unpublishedPosts = await Post.find({ 
      publishedToTelegram: { $ne: true } 
    })
    .sort({ createdAt: -1 })
    .limit(10); // Eng yangi 10 ta post
    
    console.log(`📊 Yuborilmagan postlar: ${unpublishedPosts.length} ta`);
    
    if (unpublishedPosts.length === 0) {
      console.log('✅ Barcha postlar allaqachon yuborilgan');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const post of unpublishedPosts) {
      try {
        console.log(`📤 Yuborilmoqda: ${post.title.substring(0, 50)}...`);
        
        const messageId = await sendPostToTelegram(post);
        
        // Post holatini yangilash
        post.publishedToTelegram = true;
        post.telegramMessageId = messageId;
        await post.save();
        
        successCount++;
        console.log(`✅ Yuborildi: ${post.title.substring(0, 50)}... (ID: ${messageId})`);
        
        // Rate limiting uchun kutish
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Yuborishda xato: ${post.title.substring(0, 50)}...`);
        console.error(`   Xato: ${error.message}`);
        
        // Xato bo'lsa ham davom etish uchun kutish
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`\n📊 NATIJALAR:`);
    console.log(`- Muvaffaqiyatli yuborildi: ${successCount}`);
    console.log(`- Xatolar: ${errorCount}`);
    console.log(`- Jami: ${unpublishedPosts.length}`);
    
  } catch (error) {
    console.error('❌ Umumiy xato:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB ulanishi uzildi');
    process.exit(0);
  }
}

publishUnpublishedPosts();
