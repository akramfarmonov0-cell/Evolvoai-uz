// Manual RSS fetch script
require('dotenv').config();
const mongoose = require('mongoose');
const { fetchAndProcessAllRSS } = require('./src/services/rssService');

async function manualRSSFetch() {
  try {
    console.log('🚀 Manual RSS fetch boshlandi...');
    
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evolvoai');
    console.log('✅ MongoDB ga ulandi');
    
    // RSS fetch
    const results = await fetchAndProcessAllRSS();
    
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    
    console.log(`\n📊 NATIJALAR:`);
    console.log(`- Jami tekshirildi: ${totalCount}`);
    console.log(`- Muvaffaqiyatli: ${successCount}`);
    console.log(`- Xatolar: ${totalCount - successCount}`);
    
    // Muvaffaqiyatli postlarni ko'rsatish
    const successfulPosts = results.filter(r => r.success);
    if (successfulPosts.length > 0) {
      console.log(`\n✅ YARATILGAN POSTLAR:`);
      successfulPosts.forEach((post, index) => {
        console.log(`${index + 1}. [${post.source}] ${post.title}`);
      });
    }
    
    // Xatolarni ko'rsatish
    const errors = results.filter(r => !r.success);
    if (errors.length > 0) {
      console.log(`\n❌ XATOLAR/DUBLIKATLAR:`);
      errors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.source}] ${error.reason || error.error || 'Noma\'lum xato'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Manual RSS fetch xatosi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB ulanishi uzildi');
    process.exit(0);
  }
}

manualRSSFetch();
