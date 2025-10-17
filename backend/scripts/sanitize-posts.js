const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

function stripMarkdownInline(text) {
  if (!text) return '';
  return text
    // ![alt](url) yoki [label](url)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Heading va markerlar: # * _ ` ~ > |
    .replace(/[#*_`~>|]/g, '')
    // Ortiqcha bo'shliqlar
    .replace(/\s+/g, ' ')
    .trim();
}

(async () => {
  try {
    console.log('🔌 MongoDB ga ulanmoqda...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB ga ulandi');

    const posts = await Post.find().select('title excerpt tags');
    let updated = 0;

    for (const p of posts) {
      const cleanTitle = stripMarkdownInline(p.title || '');
      const cleanExcerpt = stripMarkdownInline(p.excerpt || '');
      const cleanTags = Array.isArray(p.tags) ? p.tags.map(t => stripMarkdownInline(t)).filter(Boolean) : [];

      const hasChange = cleanTitle !== p.title || cleanExcerpt !== p.excerpt || JSON.stringify(cleanTags) !== JSON.stringify(p.tags || []);
      if (hasChange) {
        p.title = cleanTitle;
        p.excerpt = cleanExcerpt;
        p.tags = cleanTags;
        await p.save();
        updated++;
      }
    }

    console.log(`🧹 Tozalash yakunlandi. Yangilangan postlar: ${updated}/${posts.length}`);
  } catch (err) {
    console.error('❌ Xatolik:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('👋 MongoDB aloqasi yopildi');
  }
})();
