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
      'iot',
      'news'
    ]
  },
  subcategory: {
    type: String,
    enum: [
      'technology',
      'business',
      'science',
      'ai',
      'security',
      'sport',
      'uzbekistan',
      'world'
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
    default: false
  },
  isRewritten: {
    type: Boolean,
    default: false
  },
  originalSource: {
    type: String
  },
  originalLink: {
    type: String
  },
  metadata: {
    contentHash: String,
    originalTitle: String,
    processedAt: Date,
    rssSource: String
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

function stripMarkdownInline(text) {
  if (!text) return '';
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`~>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

postSchema.pre('save', function(next) {
  if (this.isModified('title') && typeof this.title === 'string') {
    this.title = stripMarkdownInline(this.title);
  }
  if (this.isModified('excerpt') && typeof this.excerpt === 'string') {
    this.excerpt = stripMarkdownInline(this.excerpt);
  }
  if (Array.isArray(this.tags)) {
    this.tags = this.tags.map(t => stripMarkdownInline(String(t))).filter(Boolean);
  }
  next();
});

// Index for category queries (slug already indexed via unique: true)
postSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);