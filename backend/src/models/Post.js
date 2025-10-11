const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'web-development',
      'telegram-bots',
      'chatbots',
      'automation',
      'ai-integration',
      'mobile-apps',
      'e-commerce',
      'crm-systems',
      'data-analytics',
      'cloud-services',
      'cybersecurity',
      'digital-marketing',
      'ui-ux-design',
      'blockchain',
      'iot'
    ]
  },
  excerpt: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  slug: {
    type: String,
    required: true,
    unique: true
  },
  publishedToTelegram: {
    type: Boolean,
    default: false
  },
  telegramMessageId: {
    type: Number
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isAIGenerated: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

// Index for category queries (slug already indexed via unique: true)
postSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);