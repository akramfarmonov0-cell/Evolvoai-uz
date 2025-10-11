const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'web-app',
      'mobile-app',
      'telegram-bot',
      'ai-integration',
      'e-commerce',
      'crm-system',
      'other'
    ]
  },
  technologies: [{
    type: String
  }],
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  order: {
    type: Number,
    default: 0
  },
  client: {
    type: String
  },
  duration: {
    type: String
  }
}, {
  timestamps: true
});

// Index for featured portfolios (slug already indexed via unique: true)
portfolioSchema.index({ featured: 1, order: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
