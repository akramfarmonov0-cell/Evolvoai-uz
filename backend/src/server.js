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
const { generateAndPublishPosts } = require('./services/contentGenerator');

// Telegram Bot Service
require('./services/telegramService');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB ulanish
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB ga muvaffaqiyatli ulandi'))
  .catch(err => console.error('❌ MongoDB ulanish xatosi:', err));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Har 6 soatda avtomatik blog post generatsiya (4 marta kuniga)
cron.schedule('0 */6 * * *', async () => {
  console.log('🤖 Avtomatik kontent generatsiya boshlandi...');
  try {
    await generateAndPublishPosts();
    console.log('✅ Kontent muvaffaqiyatli yaratildi va nashr qilindi');
  } catch (error) {
    console.error('❌ Kontent generatsiya xatosi:', error);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishlamoqda`);
});