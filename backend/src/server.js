require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
const path = require('path');

const postRoutes = require('./routes/posts');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const portfolioRoutes = require('./routes/portfolio');
const chatbotRoutes = require('./routes/chatbot');
const rssRoutes = require('./routes/rss');
const { generateAndPublishPosts, generateAndPublishOnePost } = require('./services/contentGenerator');

// Telegram Bot Service
require('./services/telegramService');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "http://127.0.0.1:3000", "https://evolvoai-uz.vercel.app", "https://*.vercel.app"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
    },
  },
}));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://evolvoai-uz.vercel.app',
    'https://evolvoai-uz-akrams-projects-7e39dc3c.vercel.app',
    /\.vercel\.app$/,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB ulanish
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evolvoai')
  .then(() => console.log('✅ MongoDB ga muvaffaqiyatli ulandi'))
  .catch(err => {
    console.error('❌ MongoDB ulanish xatosi:', err);
    console.log('⚠️  MongoDB ulanmadi, lekin server ishlamoqda');
  });

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rss', rssRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 07:00 dan 19:00 gacha HAR SOATDA 1 ta post (news) generatsiya
cron.schedule('0 7-19 * * *', async () => {
  console.log('🕖 Soatlik yangilik generatsiyasi boshlandi (07-19) ...');
  try {
    await generateAndPublishOnePost('news');
    console.log('✅ Soatlik yangilik yaratildi');
  } catch (error) {
    console.error('❌ Soatlik generatsiya xatosi:', error);
  }
});

// Har 6 soatda marketing post (4 marta kuniga)
cron.schedule('30 */6 * * *', async () => {
  console.log('📢 Marketing post yuborish...');
  const { sendMarketingPost } = require('./services/telegramService');
  try {
    await sendMarketingPost();
    console.log('✅ Marketing post yuborildi');
  } catch (error) {
    console.error('❌ Marketing post xatosi:', error);
  }
});

// Har 3 soatda RSS yangiliklar olish (kuniga 8 marta)
cron.schedule('0 */3 * * *', async () => {
  console.log('📡 RSS yangiliklar olish boshlandi...');
  const { fetchAndProcessAllRSS } = require('./services/rssService');
  try {
    const results = await fetchAndProcessAllRSS();
    const successCount = results.filter(r => r.success).length;
    console.log(`✅ RSS jarayoni tugadi: ${successCount} ta yangi post`);
  } catch (error) {
    console.error('❌ RSS jarayoni xatosi:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishlamoqda`);
});