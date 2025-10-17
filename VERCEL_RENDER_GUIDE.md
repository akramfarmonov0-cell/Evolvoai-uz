# 🚀 Vercel + Render Deployment Guide

## 📋 Deployment Plan
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Node.js)
- **Database**: MongoDB Atlas (Free)

---

## 1️⃣ MongoDB Atlas Setup (5 daqiqa)

### Step 1: Account yaratish
1. **https://www.mongodb.com/cloud/atlas/register** ga o'ting
2. **Sign Up** - Email bilan ro'yxatdan o'ting
3. **Free tier** tanlang (M0 Sandbox)

### Step 2: Cluster yaratish
1. **Build a Database** tugmasini bosing
2. **FREE** (M0) ni tanlang
3. **Provider**: AWS
4. **Region**: Virginia (us-east-1) - eng tez
5. **Cluster Name**: `EvolvoAI-Cluster`
6. **Create Cluster** tugmasini bosing

### Step 3: Database User yaratish
1. **Database Access** bo'limiga o'ting
2. **Add New Database User** tugmasini bosing
3. **Username**: `evolvoai`
4. **Password**: `EvolvoAI2024!` (yoki o'zingizniki)
5. **Database User Privileges**: Read and write to any database
6. **Add User** tugmasini bosing

### Step 4: Network Access
1. **Network Access** bo'limiga o'ting
2. **Add IP Address** tugmasini bosing
3. **Allow Access from Anywhere** (0.0.0.0/0) ni tanlang
4. **Confirm** tugmasini bosing

### Step 5: Connection String
1. **Database** bo'limiga qaytib, **Connect** tugmasini bosing
2. **Drivers** ni tanlang
3. **Node.js** ni tanlang
4. **Connection string** ni nusxalang:
```
mongodb+srv://evolvoai:EvolvoAI2024!@evolvoai-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 2️⃣ GitHub Repository Setup (3 daqiqa)

### Git repository yaratish
```bash
# Loyihani Git'ga qo'shish
git init
git add .
git commit -m "Initial commit - EvolvoAI Platform"

# GitHub'da yangi repository yarating: evolvoai-platform
git remote add origin https://github.com/YOUR_USERNAME/evolvoai-platform.git
git branch -M main
git push -u origin main
```

---

## 3️⃣ Render Backend Deploy (10 daqiqa)

### Step 1: Render.com'ga kirish
1. **https://render.com** ga o'ting
2. **GitHub** bilan sign up qiling
3. **New +** tugmasini bosing
4. **Web Service** ni tanlang

### Step 2: Repository ulash
1. **Connect GitHub** tugmasini bosing
2. **evolvoai-platform** repository'ni tanlang
3. **Connect** tugmasini bosing

### Step 3: Service sozlamalari
```
Name: evolvoai-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Step 4: Environment Variables
**Advanced** bo'limida quyidagi environment variables qo'shing:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://evolvoai:EvolvoAI2024!@evolvoai-cluster.xxxxx.mongodb.net/evolvoai?retryWrites=true&w=majority
JWT_SECRET=super-secure-jwt-secret-key-for-production-2024
ADMIN_EMAIL=admin@evolvoai.uz
ADMIN_PASSWORD=Admin123!
GEMINI_API_KEY=your_gemini_api_key_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=@evolvoai_news
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
FRONTEND_URL=https://evolvoai.vercel.app
```

### Step 5: Deploy
1. **Create Web Service** tugmasini bosing
2. Deploy jarayonini kuzating (5-10 daqiqa)
3. **URL** ni nusxalang: `https://evolvoai-backend.onrender.com`

---

## 4️⃣ Vercel Frontend Deploy (5 daqiqa)

### Step 1: Vercel.com'ga kirish
1. **https://vercel.com** ga o'ting
2. **GitHub** bilan sign up qiling
3. **New Project** tugmasini bosing

### Step 2: Repository import
1. **Import Git Repository** bo'limidan
2. **evolvoai-platform** ni tanlang
3. **Import** tugmasini bosing

### Step 3: Project sozlamalari
```
Project Name: evolvoai
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 4: Environment Variables
**Environment Variables** bo'limida qo'shing:

```env
NEXT_PUBLIC_API_URL=https://evolvoai-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://evolvoai.vercel.app
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/evolvoai_news
```

### Step 5: Deploy
1. **Deploy** tugmasini bosing
2. Build jarayonini kuzating (3-5 daqiqa)
3. **URL** ni oling: `https://evolvoai.vercel.app`

---

## 5️⃣ Domain Setup (Ixtiyoriy)

### Vercel Custom Domain
1. **Vercel Dashboard** → **Settings** → **Domains**
2. **Add Domain**: `evolvoai.uz`
3. **DNS** sozlamalarini yangilang:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Render Custom Domain
1. **Render Dashboard** → **Settings** → **Custom Domains**
2. **Add Domain**: `api.evolvoai.uz`
3. **DNS** sozlamalarini yangilang:
   ```
   Type: CNAME
   Name: api
   Value: evolvoai-backend.onrender.com
   ```

---

## 6️⃣ Testing & Verification (5 daqiqa)

### Frontend Test
1. **https://evolvoai.vercel.app** ga o'ting
2. Sahifa to'liq yuklanishini tekshiring
3. **Dark mode** tugmasini sinab ko'ring
4. **Blog** va **News** sahifalarini ochib ko'ring

### Backend Test
1. **https://evolvoai-backend.onrender.com/api/health** ga o'ting
2. `{"status":"OK"}` javobini ko'rishingiz kerak
3. **https://evolvoai-backend.onrender.com/api/posts** ni sinab ko'ring

### Admin Panel Test
1. **https://evolvoai.vercel.app/admin** ga o'ting
2. Login: `admin@evolvoai.uz`
3. Password: `Admin123!`
4. **RSS** bo'limini sinab ko'ring

---

## 🎉 Deployment Complete!

### 🌐 Live URLs:
- **Frontend**: https://evolvoai.vercel.app
- **Backend API**: https://evolvoai-backend.onrender.com
- **Admin Panel**: https://evolvoai.vercel.app/admin

### 📊 Features Working:
- ✅ **30 RSS sources** - avtomatik yangiliklar
- ✅ **AI content generation** - Gemini API
- ✅ **Telegram integration** - bot va kanal
- ✅ **PWA support** - mobil ilova kabi
- ✅ **Dark mode** - professional tema
- ✅ **SEO optimized** - Google uchun tayyor
- ✅ **Social media** - ulashish funksiyalari

### 🔄 Automatic Processes:
- **Har 3 soatda** - RSS yangiliklar olish
- **Har 6 soatda** - Marketing postlar
- **Real-time** - Telegram bot javoblari

### 📈 Monitoring:
- **Render**: Automatic health checks
- **Vercel**: Performance analytics
- **MongoDB Atlas**: Database monitoring

---

## 🛠️ Troubleshooting

### Agar frontend ishlamasa:
1. Vercel **Functions** tabini tekshiring
2. **Environment Variables** to'g'ri ekanligini tasdiqlang
3. **Build logs** ni ko'rib chiqing

### Agar backend ishlamasa:
1. Render **Logs** tabini ochib ko'ring
2. **Environment Variables** tekshiring
3. **MongoDB connection** ni sinab ko'ring

### Agar RSS ishlamasa:
1. **GEMINI_API_KEY** to'g'ri ekanligini tekshiring
2. **Admin panel** → **RSS** bo'limida manual test qiling
3. **Render logs** da xatolarni qidiring

---

**🎯 Deployment muvaffaqiyatli yakunlandi!** 

Saytingiz endi butun dunyoga ochiq va professional darajada ishlaydi! 🚀
