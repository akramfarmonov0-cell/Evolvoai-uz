const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

function isDBConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// Barcha postlarni olish (pagination bilan)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const excludeCategory = req.query.excludeCategory;
    const subcategory = req.query.subcategory;
    const skip = (page - 1) * limit;

    // Query yaratish
    const query = {};
    if (category) {
      query.category = category;
    } else if (excludeCategory) {
      query.category = { $ne: excludeCategory };
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // DB ulanmagan bo'lsa, bo'sh natija qaytaramiz
    if (!isDBConnected()) {
      return res.json({
        posts: [],
        currentPage: page,
        totalPages: 0,
        totalPosts: 0
      });
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content');

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bitta postni olish
router.get('/:slug', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const post = await Post.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({ error: 'Post topilmadi' });
    }

    // Ko'rishlar sonini oshirish
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kategoriyalar ro'yxati
router.get('/meta/categories', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.json([]);
    }
    const categories = await Post.distinct('category');
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Post.countDocuments({ category });
        return { category, count };
      })
    );

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mashhur postlar
router.get('/meta/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    if (!isDBConnected()) {
      return res.json([]);
    }

    const posts = await Post.find()
      .sort({ views: -1, likes: -1 })
      .limit(limit)
      .select('title slug category views likes createdAt');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Qidiruv
router.get('/search', async (req, res) => {
  try {
    const { q, category, excludeCategory, subcategory } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Qidiruv so\'rovi kerak' });
    }

    // Qidiruv shartlari
    const searchQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ]
    };

    // Kategoriya bo'yicha filtrlash
    if (category) {
      searchQuery.category = category;
    } else if (excludeCategory) {
      searchQuery.category = { $ne: excludeCategory };
    }

    // Subkategoriya bo'yicha filtrlash
    if (subcategory) {
      searchQuery.subcategory = subcategory;
    }

    if (!isDBConnected()) {
      return res.json([]);
    }

    const posts = await Post.find(searchQuery)
    .limit(20)
    .select('-content');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like qo'shish
router.post('/:slug/like', async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const post = await Post.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({ error: 'Post topilmadi' });
    }

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;