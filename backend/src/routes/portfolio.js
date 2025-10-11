const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Public: Barcha portfoliolarni olish
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find()
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Featured portfoliolarni olish
router.get('/featured', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6)
      .select('-__v');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Bitta portfolioni olish
router.get('/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio topilmadi' });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
