# 🚀 EvolvoAI - Production Deployment Qo'llanma

## 🎯 Tavsiya Qilingan Platforma: Vercel + Railway

### Nega Bu Setup?
- ✅ **Oson:** Git push = auto deploy
- ✅ **Tez:** Global CDN
- ✅ **Arzon:** Frontend bepul, Backend $5/oy
- ✅ **Ishonchli:** 99.9% uptime
- ✅ **SSL:** Avtomatik HTTPS

---

## 📋 STEP-BY-STEP DEPLOYMENT

### Tayyorgarlik (5 daqiqa)

**1. GitHub Account:**
- https://github.com da ro'yxatdan o'ting
- Yangi repository: `evolvoai-frontend`
- Yangi repository: `evolvoai-backend`

**2. Vercel Account:**
- https://vercel.com
- GitHub bilan login qiling

**3. Railway Account:**
- https://railway.app
- GitHub bilan login qiling

---

## 🌐 FRONTEND DEPLOYMENT (Vercel)

### 1. GitHub'ga Upload

```powershell
cd c:\Users\user\evolvoai-project\frontend

# Git init
git init
git add .
git commit -m "Initial commit - EvolvoAI Frontend"

# GitHub'ga push
git remote add origin https://github.com/YOUR_USERNAME/evolvoai-frontend.git
git branch -M main
git push -u origin main
```

### 2. Vercel'da Deploy

1. **Vercel Dashboard** ochinge: https://vercel.com/dashboard
2. **"Add New" → "Project"**
3. **Import Git Repository:**
   - `evolvoai-frontend` ni tanlang
4. **Configure Project:**
   - Framework Preset: **Next.js** (auto)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```
   *(Backend deploy qilgandan keyin to'ldiring)*
6. **Deploy** tugmasini bosing

**⏱ Kutish:** 2-3 daqiqa

**✅ Natija:**
```
https://evolvoai-frontend.vercel.app
```

### 3. Custom Domain (Opsional)

Vercel Dashboard → Project Settings → Domains:
```
evolvoai.uz
www.evolvoai.uz
```

DNS (Namecheap/Cloudflare):
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔧 BACKEND DEPLOYMENT (Railway)

### 1. Prepare Backend

**`backend/package.json` ga qo'shing:**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 2. GitHub'ga Upload

```powershell
cd c:\Users\user\evolvoai-project\backend

# Git init
git init
git add .
git commit -m "Initial commit - EvolvoAI Backend"

# GitHub'ga push
git remote add origin https://github.com/YOUR_USERNAME/evolvoai-backend.git
git branch -M main
git push -u origin main
```

### 3. Railway'da Deploy

1. **Railway Dashboard:** https://railway.app/dashboard
2. **"New Project" → "Deploy from GitHub repo"**
3. **Select Repository:**
   - `evolvoai-backend` ni tanlang
4. **Add Variables:**
   
   Settings → Variables:
   ```
   PORT=5000
   NODE_ENV=production
   
   MONGODB_URI=mongodb+srv://evolvoai-user:GisoBot201415@cluster0.dzfo2sr.mongodb.net/evolvoai-db?retryWrites=true&w=majority&appName=Cluster0
   
   TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
   GEMINI_API_KEY=AIzaSyAYLjXv_AABH0eKXn-QBb15mAoxXQgmwQM
   
   ADMIN_EMAIL=admin@evolvoai.com
   ADMIN_PASSWORD=admin123
   
   JWT_SECRET=your_jwt_secret_here_minimum_32_characters_long
   JWT_EXPIRE=30d
   
   FRONTEND_URL=https://evolvoai-frontend.vercel.app
   ```

5. **Settings → Networking:**
   - Generate Domain

**⏱ Kutish:** 3-5 daqiqa

**✅ Natija:**
```
https://evolvoai-backend.railway.app
```

### 4. Backend URL ni Frontend'ga qo'shing

Vercel Dashboard → evolvoai-frontend → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://evolvoai-backend.railway.app/api
```

**Redeploy:** Vercel auto-redeploy qiladi

---

## 💾 DATABASE (MongoDB Atlas)

### Sizda allaqachon bor! ✅

```
mongodb+srv://evolvoai-user:GisoBot201415@cluster0.dzfo2sr.mongodb.net/evolvoai-db
```

### Agar yangi sozlamoqchi bo'lsangiz:

1. https://cloud.mongodb.com
2. **"Create" → "Shared" (Free)**
3. **Cloud Provider:** AWS
4. **Region:** Frankfurt (Europe) yoki Singapore (Asia)
5. **Cluster Name:** evolvoai-cluster
6. **Create User:**
   - Username: `evolvoai-user`
   - Password: `strong_password`
7. **Network Access:**
   - IP: `0.0.0.0/0` (Allow from anywhere)
8. **Connect:**
   - Method: "Connect your application"
   - Driver: Node.js
   - Copy connection string

---

## 🔐 ENVIRONMENT VARIABLES SUMMARY

### Frontend (.env.local) - Vercel
```env
NEXT_PUBLIC_API_URL=https://evolvoai-backend.railway.app/api
```

### Backend (.env) - Railway
```env
PORT=5000
NODE_ENV=production

MONGODB_URI=mongodb+srv://...

TELEGRAM_BOT_TOKEN=1234567890:ABCdef...
GEMINI_API_KEY=AIzaSy...

ADMIN_EMAIL=admin@evolvoai.com
ADMIN_PASSWORD=admin123

JWT_SECRET=your_secret_min_32_chars
JWT_EXPIRE=30d

FRONTEND_URL=https://evolvoai.vercel.app
```

---

## 🧪 TEST PRODUCTION

### 1. Backend Test
```
https://your-backend.railway.app/api/health
```

**Kutilgan:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-11T...",
  "telegram": true
}
```

### 2. Frontend Test
```
https://your-frontend.vercel.app
```

### 3. Telegram Bot
Botga yozing: `/start`

### 4. PWA
Chrome'da: Install tugmasi

---

## 🔄 AUTO-DEPLOYMENT

### Git Push = Auto Deploy ✅

```bash
# O'zgarishlar kiritdingiz
git add .
git commit -m "Update: new feature"
git push

# Vercel va Railway avtomatik deploy qiladi!
```

---

## 📊 NARXLAR

### Recommended Setup:

| Xizmat | Narx | Specs |
|--------|------|-------|
| **Vercel** (Frontend) | **BEPUL** | 100GB bandwidth/oy |
| **Railway** (Backend) | **$5/oy** | 500MB RAM, Always on |
| **MongoDB Atlas** | **BEPUL** | 512MB storage |
| **Namecheap** (.uz) | **$15/yil** | Domain |

**Jami:** ~$5/oy + $15/yil domain

### Bepul Variant:

| Xizmat | Narx | Limitlar |
|--------|------|----------|
| **Vercel** | BEPUL | 100GB/oy |
| **Render.com** | BEPUL | Sleep 15 min |
| **MongoDB Atlas** | BEPUL | 512MB |

**Jami:** $0/oy (subdomain)

### VPS Variant (O'zbekiston):

| Hosting | Narx | Specs |
|---------|------|-------|
| **UZDC** | 50K/oy | 1GB RAM |
| **UZTELECOM** | 70K/oy | 2GB RAM |

---

## 🚨 TROUBLESHOOTING

### Build Failed (Vercel)

**Error:** "Module not found"
```bash
# node_modules ni commit qilmagan bo'lsangiz
npm install
git add package-lock.json
git commit -m "Fix: add package-lock"
git push
```

### Backend 503 Error (Railway)

**Sabab:** Environment variables yo'q
- Railway Dashboard → Variables tekshiring
- `PORT` o'zgaruvchisi bormi?

### CORS Error

**Backend .env:**
```env
FRONTEND_URL=https://your-actual-frontend.vercel.app
```

**server.js:**
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```

### Telegram Bot ishlamayapti

1. Railway logs tekshiring
2. `TELEGRAM_BOT_TOKEN` to'g'rimi?
3. Backend running bo'lishimi?

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment:
- [ ] GitHub repositories yaratilgan
- [ ] .env fayllar to'ldirilgan
- [ ] package.json da scripts bor
- [ ] Local'da test qilingan

### Frontend (Vercel):
- [ ] GitHub'ga push qilingan
- [ ] Vercel'ga import qilingan
- [ ] Environment variables qo'shilgan
- [ ] Deploy muvaffaqiyatli
- [ ] Domain ulangan (opsional)

### Backend (Railway):
- [ ] GitHub'ga push qilingan
- [ ] Railway'ga import qilingan
- [ ] Barcha env variables qo'shilgan
- [ ] Deploy muvaffaqiyatli
- [ ] Health endpoint ishlayapti

### Database:
- [ ] MongoDB Atlas sozlangan
- [ ] Connection string to'g'ri
- [ ] IP whitelist: 0.0.0.0/0

### Testing:
- [ ] Frontend ochiladi
- [ ] Backend /api/health javob beradi
- [ ] Telegram bot javob beradi
- [ ] PWA install ishlaydi
- [ ] Admin panel kirish mumkin

---

## 🎯 FINAL URLS

Production'da sizda:

```
Frontend: https://evolvoai.vercel.app
Backend:  https://evolvoai-backend.railway.app
Admin:    https://evolvoai.vercel.app/admin
API:      https://evolvoai-backend.railway.app/api
Health:   https://evolvoai-backend.railway.app/api/health
```

---

## 📞 QO'SHIMCHA

### Monitoring:
- Vercel: Auto-monitoring
- Railway: Logs ko'rish mumkin
- MongoDB: Atlas dashboard

### SSL:
- ✅ Vercel: Avtomatik HTTPS
- ✅ Railway: Avtomatik HTTPS
- ✅ MongoDB: SSL by default

### Backup:
- MongoDB Atlas: Auto-backup (free tier)
- GitHub: Code backup

---

**Production'ga deploy qilish tayyor! Omad! 🚀**
