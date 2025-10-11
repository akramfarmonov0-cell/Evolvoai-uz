# 🚀 Production Deploy - Vercel & Render

## 📋 Deploy Strategiyasi

- **Frontend:** Vercel (Next.js uchun eng yaxshi)
- **Backend:** Render (Node.js uchun bepul tier)
- **Database:** MongoDB Atlas (Cloud database)

---

## 1️⃣ MONGODB ATLAS SOZLASH (5 daqiqa)

### A. Account Yaratish:

1. https://www.mongodb.com/cloud/atlas/register ga o'ting
2. Email bilan ro'yxatdan o'ting
3. Bepul (Free) tier'ni tanlang

### B. Cluster Yaratish:

1. **Create Deployment** → **M0 (Free)**
2. **Cloud Provider:** AWS
3. **Region:** Frankfurt (yoki yaqin region)
4. **Cluster Name:** evolvoai-cluster
5. **Create Deployment** bosing

### C. Database User Yaratish:

1. **Security** → **Database Access**
2. **Add New Database User**
3. **Username:** `evolvoai-user`
4. **Password:** Kuchli parol yarating (saqlang!)
5. **Built-in Role:** Read and Write to any database
6. **Add User**

### D. IP Whitelist:

1. **Security** → **Network Access**
2. **Add IP Address**
3. **Allow Access from Anywhere:** `0.0.0.0/0`
4. **Confirm**

### E. Connection String Olish:

1. **Deployment** → **Connect**
2. **Connect your application**
3. **Driver:** Node.js
4. Connection string'ni nusxalang:
   ```
   mongodb+srv://evolvoai-user:<password>@evolvoai-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. `<password>` ni o'z parolingiz bilan almashtiring

✅ **MongoDB Atlas tayyor!**

---

## 2️⃣ BACKEND - RENDER'GA DEPLOY (10 daqiqa)

### A. GitHub Repository Tayyorlash:

1. **GitHub'da yangi repository yarating:**
   - Repository name: `evolvoai-backend`
   - Public yoki Private

2. **Local git init:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit - EvolvoAI Backend"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/evolvoai-backend.git
   git push -u origin main
   ```

### B. Render Account:

1. https://render.com ga o'ting
2. GitHub bilan sign up qiling

### C. Web Service Yaratish:

1. **Dashboard** → **New +** → **Web Service**
2. **Connect GitHub repository:** `evolvoai-backend`
3. **Sozlamalar:**
   ```
   Name: evolvoai-backend
   Region: Frankfurt (yoki yaqin)
   Branch: main
   Root Directory: (bo'sh qoldiring)
   Runtime: Node
   Build Command: npm install
   Start Command: node src/server.js
   ```
4. **Instance Type:** Free

### D. Environment Variables:

**Environment** tabda quyidagilarni qo'shing:

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://evolvoai-user:YOUR_PASSWORD@evolvoai-cluster.xxxxx.mongodb.net/evolvoai-db?retryWrites=true&w=majority

# Gemini AI
GEMINI_API_KEY=AIzaSyDwhFtwAhRpdcE3...

# Telegram
TELEGRAM_BOT_TOKEN=8258225391:AAFqsYYU2QJzk54VP6hqc...
TELEGRAM_CHANNEL_ID=-1002799814854
ADMIN_CHAT_ID=8325332204

# JWT
JWT_SECRET=your_production_secret_key_minimum_32_characters_long
JWT_EXPIRE=30d

# Frontend URL (keyinroq yangilanadi)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### E. Deploy:

1. **Create Web Service** bosing
2. ⏳ Deploy jarayoni 5-10 daqiqa davom etadi
3. ✅ Deploy tayyor!

**Backend URL:**
```
https://evolvoai-backend.onrender.com
```

### F. Test Qilish:

```bash
curl https://evolvoai-backend.onrender.com/api/health
```

**Javob:**
```json
{"status":"OK","timestamp":"2025-10-11T..."}
```

✅ **Backend deployed!**

---

## 3️⃣ FRONTEND - VERCEL'GA DEPLOY (10 daqiqa)

### A. GitHub Repository:

1. **GitHub'da yangi repository yarating:**
   - Repository name: `evolvoai-frontend`
   - Public yoki Private

2. **Local git init:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit - EvolvoAI Frontend"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/evolvoai-frontend.git
   git push -u origin main
   ```

### B. Vercel Account:

1. https://vercel.com ga o'ting
2. GitHub bilan sign up qiling

### C. Project Import:

1. **Dashboard** → **Add New** → **Project**
2. **Import Git Repository:** `evolvoai-frontend`
3. **Framework Preset:** Next.js (avtomatik taniladi)
4. **Root Directory:** `./` (default)

### D. Environment Variables:

**Environment Variables** qismida:

```env
NEXT_PUBLIC_API_URL=https://evolvoai-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/evolvoai_news
```

### E. Deploy:

1. **Deploy** bosing
2. ⏳ Build 3-5 daqiqa
3. ✅ Deploy tayyor!

**Frontend URL:**
```
https://evolvoai-frontend.vercel.app
```

### F. Custom Domain (Ixtiyoriy):

1. **Settings** → **Domains**
2. O'z domeningizni qo'shing: `evolvoai.uz`
3. DNS sozlamalarini yangilang

✅ **Frontend deployed!**

---

## 4️⃣ BACKEND FRONTEND_URL YANGILASH

Render'da environment variable'ni yangilang:

```env
FRONTEND_URL=https://evolvoai-frontend.vercel.app
```

Keyin **Manual Deploy** → **Deploy latest commit**

---

## 5️⃣ FINAL TEST

### A. Backend:

```bash
# Health check
curl https://evolvoai-backend.onrender.com/api/health

# Posts
curl https://evolvoai-backend.onrender.com/api/posts

# Services
curl https://evolvoai-backend.onrender.com/api/services
```

### B. Frontend:

1. Browser'da ochish: `https://evolvoai-frontend.vercel.app`
2. Sahifalar:
   - Bosh sahifa: `/`
   - Blog: `/blog`
   - Xizmatlar: `/services`
   - Bog'lanish: `/contact`

### C. Funksiyalar:

- ✅ Chatbot ishlayaptimi?
- ✅ Kontakt forma Telegram'ga yuborilmoqdami?
- ✅ Blog postlar ko'rinmoqdami?
- ✅ Telegram bot javob bermoqdami?

---

## 6️⃣ TELEGRAM BOT WEBHOOK (Ixtiyoriy)

Production'da webhook ishlatish tavsiya etiladi:

### A. Webhook URL:

```
https://evolvoai-backend.onrender.com/api/telegram/webhook
```

### B. Backend'ga Route Qo'shish:

`backend/src/routes/telegram.js` yarating:

```javascript
const express = require('express');
const router = express.Router();
const { bot } = require('../services/telegramService');

router.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

module.exports = router;
```

`backend/src/server.js` ga qo'shing:

```javascript
const telegramRoutes = require('./routes/telegram');
app.use('/api/telegram', telegramRoutes);
```

### C. Webhook O'rnatish:

```bash
curl -X POST "https://api.telegram.org/bot8258225391:YOUR_TOKEN/setWebhook" \
  -d "url=https://evolvoai-backend.onrender.com/api/telegram/webhook"
```

✅ **Webhook o'rnatildi!**

---

## 7️⃣ MONITORING & LOGS

### A. Render Logs:

1. **Dashboard** → **evolvoai-backend**
2. **Logs** tab
3. Real-time logs ko'rish

### B. Vercel Logs:

1. **Dashboard** → **evolvoai-frontend**
2. **Deployments** → **View Function Logs**

### C. MongoDB Atlas Monitoring:

1. **Deployment** → **Metrics**
2. Database performance ko'rish

---

## 8️⃣ MUAMMOLARNI HAL QILISH

### Backend Ishlamayapti:

1. **Render Logs'ni tekshiring**
2. **Environment variables to'g'riligini tasdiqlang**
3. **MongoDB connection string'ni tekshiring**

### Frontend Backend'ga Ulanmayapti:

1. **CORS sozlamalarini tekshiring**
2. **NEXT_PUBLIC_API_URL to'g'riligini tasdiqlang**
3. **Backend ishlayotganligini tekshiring**

### 503 Service Unavailable (Render):

- Free tier 15 daqiqa inactivity'dan keyin sleep'ga kiradi
- Birinchi request 30-60 soniya davom etadi
- Solution: Paid plan yoki keep-alive service

---

## 9️⃣ OPTIMIZATSIYA

### A. Render:

- **Health Check Path:** `/api/health`
- **Auto-Deploy:** GitHub push'dan keyin avtomatik
- **Custom Domain:** Render DNS orqali

### B. Vercel:

- **Edge Network:** Global CDN
- **Analytics:** Built-in analytics yoqing
- **Preview Deployments:** Har bir PR uchun preview

### C. MongoDB Atlas:

- **Backup:** Avtomatik backup yoqing
- **Alerts:** Performance alerts o'rnating
- **Indexes:** Query performance uchun

---

## 🔐 XAVFSIZLIK

### Environment Variables:

- ✅ Hech qachon GitHub'ga push qilmang
- ✅ Har bir environment uchun alohida keys
- ✅ API keys'ni muntazam rotate qiling

### CORS:

```javascript
// Production CORS
app.use(cors({
  origin: [
    'https://evolvoai-frontend.vercel.app',
    'https://evolvoai.uz'
  ],
  credentials: true
}));
```

### Rate Limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100 // Max 100 requests
});

app.use('/api', limiter);
```

---

## 💰 NARXLAR

### MongoDB Atlas:
- **M0 (Free):** 512MB storage, Shared RAM
- **M10 (Paid):** $0.08/hour, 10GB storage

### Render:
- **Free:** 750 soat/oy, Sleep after 15min
- **Starter:** $7/oy, Always on, Custom domain

### Vercel:
- **Hobby (Free):** 100GB bandwidth, Unlimited requests
- **Pro:** $20/oy, Advanced analytics

---

## ✅ DEPLOY CHECKLIST

- [ ] MongoDB Atlas cluster yaratildi
- [ ] Database user va IP whitelist sozlandi
- [ ] GitHub repositories yaratildi
- [ ] Render backend deployed
- [ ] Vercel frontend deployed
- [ ] Environment variables to'g'ri sozlandi
- [ ] Backend va frontend bir-biriga ulandi
- [ ] Health checks ishlayapti
- [ ] Chatbot test qilindi
- [ ] Kontakt forma test qilindi
- [ ] Blog system ishlayapti
- [ ] Telegram bot faol
- [ ] Custom domain sozlandi (ixtiyoriy)
- [ ] SSL certificates avtomatik
- [ ] Monitoring o'rnatildi

---

## 🎉 TAYYOR!

**Loyihangiz endi production'da ishlayapti!**

- ✅ Frontend: https://evolvoai-frontend.vercel.app
- ✅ Backend: https://evolvoai-backend.onrender.com
- ✅ Database: MongoDB Atlas
- ✅ SSL: Avtomatik (Vercel & Render)
- ✅ CDN: Global (Vercel Edge)

**Tabriklaymiz! Loyihangiz professional darajada deploy qilindi!** 🚀🎊
