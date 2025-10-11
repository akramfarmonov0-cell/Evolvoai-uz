const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Contact = require('../models/Contact');
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/authMiddleware');

// Admin: Barcha postlarni olish
router.get('/posts', protect, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Yangi post yaratish
router.post('/posts', protect, async (req, res) => {
  try {
    const { title, content, category, tags, slug, excerpt, image, isAIGenerated } = req.body;
    const newPost = new Post({ 
      title, 
      content, 
      category, 
      tags, 
      slug, 
      excerpt,
      image,
      isAIGenerated: isAIGenerated || false
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Postni tahrirlash
router.put('/posts/:id', protect, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post topilmadi' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Postni o'chirish
router.delete('/posts/:id', protect, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post topilmadi' });
    }
    res.json({ message: 'Post muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= CONTACTS MANAGEMENT =============

// Admin: Barcha murojaatlarni olish
router.get('/contacts', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Murojaat statusini yangilash
router.put('/contacts/:id', protect, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Murojaat topilmadi' });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Murojaatni o'chirish
router.delete('/contacts/:id', protect, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Murojaat topilmadi' });
    }
    res.json({ message: 'Murojaat muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= PORTFOLIO MANAGEMENT =============

// Admin: Barcha portfoliolarni olish
router.get('/portfolio', protect, async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Yangi portfolio yaratish
router.post('/portfolio', protect, async (req, res) => {
  try {
    const { title, slug, description, category, technologies, images, mainImage, liveUrl, githubUrl, featured, status, order, client, duration } = req.body;
    const newPortfolio = new Portfolio({ 
      title, 
      slug,
      description, 
      category, 
      technologies, 
      images,
      mainImage,
      liveUrl,
      githubUrl,
      featured: featured || false,
      status: status || 'completed',
      order: order || 0,
      client,
      duration
    });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Portfolioni tahrirlash
router.put('/portfolio/:id', protect, async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPortfolio) {
      return res.status(404).json({ error: 'Portfolio topilmadi' });
    }
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Portfolioni o'chirish
router.delete('/portfolio/:id', protect, async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ error: 'Portfolio topilmadi' });
    }
    res.json({ message: 'Portfolio muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= DASHBOARD STATS =============

// Admin: Dashboard statistikasi
router.get('/stats', protect, async (req, res) => {
  try {
    const postsCount = await Post.countDocuments();
    const contactsCount = await Contact.countDocuments();
    const newContactsCount = await Contact.countDocuments({ status: 'new' });
    const portfolioCount = await Portfolio.countDocuments();
    
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt views likes');
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message status createdAt');

    res.json({
      stats: {
        posts: postsCount,
        contacts: contactsCount,
        newContacts: newContactsCount,
        portfolio: portfolioCount
      },
      recentPosts,
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
