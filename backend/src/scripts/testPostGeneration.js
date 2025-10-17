require('dotenv').config();
const mongoose = require('mongoose');
const { generateAndPublishOnePost } = require('../services/contentGenerator');

async function testGeneration() {
  try {
    console.log('🔄 MongoDB ulanmoqda...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ulandi\n');

    console.log('📝 Test post yaratilmoqda...');
    const result = await generateAndPublishOnePost('web-development');
    
    console.log('\n✅ Post yaratildi:');
    console.log('- Title:', result.post.title);
    console.log('- Slug:', result.post.slug);
    console.log('- Category:', result.post.category);
    console.log('- Telegram yuborildi:', result.telegramSent ? 'Ha ✅' : 'Yo\'q ❌');
    
  } catch (error) {
    console.error('\n❌ Xatolik:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 MongoDB ulanish yopildi');
  }
}

testGeneration();
