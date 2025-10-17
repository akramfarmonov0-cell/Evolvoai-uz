const express = require('express');
const router = express.Router();
const { fetchAndProcessAllRSS, fetchFromSingleRSS, RSS_SOURCES } = require('../services/rssService');
const { protect } = require('../middleware/authMiddleware');

// RSS manbalarini ko'rish
router.get('/sources', (req, res) => {
  res.json({
    sources: RSS_SOURCES.map(source => ({
      name: source.name,
      category: source.category,
      subcategory: source.subcategory
    }))
  });
});

// Barcha RSS manbalardan yangiliklar olish (Admin only)
router.post('/fetch-all', protect, async (req, res) => {
  try {
    console.log('🔄 Admin tomonidan RSS fetch boshlandi...');
    const results = await fetchAndProcessAllRSS();
    
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;
    
    res.json({
      message: `RSS jarayoni tugadi. ${successCount} ta yangi post, ${errorCount} ta xato.`,
      results,
      summary: {
        total: results.length,
        success: successCount,
        errors: errorCount
      }
    });
  } catch (error) {
    console.error('RSS fetch xatosi:', error);
    res.status(500).json({ 
      error: 'RSS yangiliklar olishda xatolik yuz berdi',
      details: error.message 
    });
  }
});

// Bitta RSS manbadan yangilik olish (Admin only)
router.post('/fetch/:sourceName', protect, async (req, res) => {
  try {
    const { sourceName } = req.params;
    console.log(`🔄 ${sourceName} dan RSS fetch boshlandi...`);
    
    const results = await fetchFromSingleRSS(sourceName);
    
    res.json({
      message: `${sourceName} dan ${results.length} ta yangi post yaratildi`,
      posts: results.map(post => ({
        id: post._id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        subcategory: post.subcategory
      }))
    });
  } catch (error) {
    console.error(`RSS fetch xatosi (${req.params.sourceName}):`, error);
    res.status(500).json({ 
      error: `${req.params.sourceName} dan yangilik olishda xatolik`,
      details: error.message 
    });
  }
});

// RSS statistikasi (Admin only)
router.get('/stats', protect, async (req, res) => {
  try {
    const Post = require('../models/Post');
    
    const totalRSSPosts = await Post.countDocuments({ isRewritten: true });
    const bySource = await Post.aggregate([
      { $match: { isRewritten: true } },
      { $group: { _id: '$originalSource', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentRSSPosts = await Post.find({ isRewritten: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title originalSource createdAt slug');
    
    res.json({
      totalRSSPosts,
      bySource,
      recentRSSPosts,
      availableSources: RSS_SOURCES.length
    });
  } catch (error) {
    console.error('RSS statistika xatosi:', error);
    res.status(500).json({ 
      error: 'RSS statistikani olishda xatolik',
      details: error.message 
    });
  }
});

module.exports = router;
