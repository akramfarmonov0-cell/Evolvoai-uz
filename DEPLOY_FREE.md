# 🆓 BEPUL DEPLOYMENT - Vercel + Render.com

## 🎯 Boshlash Oldidan

### Kerakli Accounts:
1. ✅ **GitHub** - https://github.com
2. ✅ **Vercel** - https://vercel.com
3. ✅ **Render** - https://render.com

**Vaqt:** 20-30 daqiqa

---

## 📋 QADAMLAR

### QADM 1: GitHub Repositories (5 daqiqa)

**A. GitHub'da 2 ta repository yarating:**

1. **Frontend Repository:**
   - Name: `evolvoai-frontend`
   - Public
   - No README

2. **Backend Repository:**
   - Name: `evolvoai-backend`
   - Public
   - No README

---

### QADAM 2: Backend - GitHub'ga Upload (5 daqiqa)

**PowerShell'da:**

```powershell
cd c:\Users\user\evolvoai-project\backend

# Git sozlash
git init
git add .
git commit -m "Initial commit - EvolvoAI Backend"

# GitHub'ga ulash (USERNAME'ni o'zgartiring!)
git remote add origin https://github.com/YOUR_USERNAME/evolvoai-backend.git
git branch -M main
git push -u origin main
```

**⚠️ Agar error bersa:**
```powershell
# Git credentials so'rasa
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

---

### QADAM 3: Backend - Render.com'ga Deploy (7 daqiqa)

**1. Render.com'ga kiring:**
- https://render.com
- **Sign Up with GitHub**

**2. New Web Service:**
- Dashboard → **"New +"** → **"Web Service"**
- **Connect** `evolvoai-backend` repository

**3. Configure:**
```
Name: evolvoai-backend
Region: Frankfurt (yaqin)
Branch: main
Runtime: Node
Build Command: npm install
Start Command: node src/server.js
Plan: Free
```

**4. Environment Variables qo'shing:**

**"Advanced" → "Add Environment Variable":**

```
NODE_ENV = production
PORT = 5000

MONGODB_URI = mongodb+srv://evolvoai-user:GisoBot201415@cluster0.dzfo2sr.mongodb.net/evolvoai-db?retryWrites=true&w=majority&appName=Cluster0

TELEGRAM_BOT_TOKEN = YOUR_TELEGRAM_BOT_TOKEN_HERE
GEMINI_API_KEY = AIzaSyAYLjXv_AABH0eKXn-QBb15mAoxXQgmwQM

ADMIN_EMAIL = admin@evolvoai.com
ADMIN_PASSWORD = admin123

JWT_SECRET = your_very_long_secret_key_minimum_32_characters_here_12345
JWT_EXPIRE = 30d

FRONTEND_URL = https://evolvoai-frontend.vercel.app
```

**5. Create Web Service:**
- **"Create Web Service"** bosing
- ⏱ Kutish: 3-5 daqiqa

**✅ Natija:**
```
https://evolvoai-backend.onrender.com
```

**6. Test qiling:**
```
https://evolvoai-backend.onrender.com/api/health
```

**Ko'rinishi kerak:**
```json
{"status":"OK","timestamp":"...","telegram":true}
```

---

### QADAM 4: Frontend - GitHub'ga Upload (3 daqiqa)

**PowerShell'da:**

```powershell
cd c:\Users\user\evolvoai-project\frontend

# Git sozlash
git init
git add .
git commit -m "Initial commit - EvolvoAI Frontend"

# GitHub'ga ulash (USERNAME'ni o'zgartiring!)
git remote add origin https://github.com/YOUR_USERNAME/evolvoai-frontend.git
git branch -M main
git push -u origin main
```

---

### QADAM 5: Frontend - Vercel'ga Deploy (5 daqiqa)

**1. Vercel.com'ga kiring:**
- https://vercel.com
- **Continue with GitHub**

**2. Import Project:**
- Dashboard → **"Add New" → "Project"**
- **Import** `evolvoai-frontend`

**3. Configure:**
```
Framework Preset: Next.js (auto-detect ✅)
Root Directory: ./
Build Command: npm run build (auto)
Output Directory: .next (auto)
Install Command: npm install (auto)
```

**4. Environment Variables:**

**"Environment Variables" accordion:**

```
Name: NEXT_PUBLIC_API_URL
Value: https://evolvoai-backend.onrender.com/api
```

**5. Deploy:**
- **"Deploy"** tugmasini bosing
- ⏱ Kutish: 2-3 daqiqa

**✅ Natija:**
```
https://evolvoai-frontend.vercel.app
```

---

### QADAM 6: Frontend URL'ni Backend'ga qo'shish (2 daqiqa)

**1. Render Dashboard:**
- evolvoai-backend → **Environment**

**2. FRONTEND_URL'ni yangilang:**
```
FRONTEND_URL = https://evolvoai-frontend.vercel.app
```

**3. Save Changes:**
- Render avtomatik redeploy qiladi (1-2 daqiqa)

---

### QADAM 7: Final Test (3 daqiqa)

**1. Backend Health:**
```
https://evolvoai-backend.onrender.com/api/health
```

**Kutilgan:**
```json
{"status":"OK","timestamp":"2025-01-11T...","telegram":true}
```

**2. Frontend:**
```
https://evolvoai-frontend.vercel.app
```

**Kutilgan:** Bosh sahifa ochiladi ✅

**3. Telegram Bot:**
- Telegram'da botga yozing: `/start`
- **Kutilgan:** Bot javob beradi ✅

**4. PWA:**
- Chrome'da frontend ochiladi
- Address bar'da Install icon (⊕)
- **Kutilgan:** Install mumkin ✅

**5. Admin Panel:**
```
https://evolvoai-frontend.vercel.app/admin/login
```
- Email: `admin@evolvoai.com`
- Password: `admin123`
- **Kutilgan:** Dashboard ochiladi ✅

---

## ⚠️ MUHIM ESLATMALAR

### Render.com Free Tier:

**✅ Bepul:**
- 750 soat/oy (oylik qoplaydi)
- 512MB RAM
- Auto SSL

**❌ Limitlar:**
- 15 daqiqa ishlatilmasa **SLEEP**
- Keyingi request 30-50 soniya kutish
- Bandwidth: 100GB/oy

### Yechim:

**A. UptimeRobot (Bepul):**
- https://uptimerobot.com
- Har 5 daqiqada ping
- Backend hech qachon uxlamaydi

**B. Cron-job.org (Bepul):**
- https://cron-job.org
- Har 5 daqiqada request

---

## 🔄 YANGILANISHLAR (Updates)

### Code O'zgarganda:

**Backend:**
```powershell
cd backend
git add .
git commit -m "Update: new feature"
git push
```
**→ Render avtomatik redeploy qiladi** ✅

**Frontend:**
```powershell
cd frontend
git add .
git commit -m "Update: new feature"
git push
```
**→ Vercel avtomatik redeploy qiladi** ✅

---

## 📊 URLs SUMMARY

**Production URLs:**
```
Frontend:       https://evolvoai-frontend.vercel.app
Backend:        https://evolvoai-backend.onrender.com
API:            https://evolvoai-backend.onrender.com/api
Health:         https://evolvoai-backend.onrender.com/api/health
Admin:          https://evolvoai-frontend.vercel.app/admin
Blog:           https://evolvoai-frontend.vercel.app/blog
Portfolio:      https://evolvoai-frontend.vercel.app/portfolio
Contact:        https://evolvoai-frontend.vercel.app/contact
```

---

## 🔧 TROUBLESHOOTING

### Backend Deploy Failed

**Error:** "Build failed"

**Yechim:**
```powershell
# package.json tekshiring
cd backend
npm install
git add package-lock.json
git commit -m "Fix: dependencies"
git push
```

### Frontend Build Error

**Error:** "Module not found"

**Yechim:**
```powershell
# Local test qiling
cd frontend
npm run build

# Agar ishlasa, push qiling
git add .
git commit -m "Fix: build"
git push
```

### Telegram Bot Ishlamayapti

**Tekshirish:**
1. Render Dashboard → Logs
2. "✅ Telegram bot ishga tushdi" ko'ringanmi?
3. TELEGRAM_BOT_TOKEN to'g'rimi?

**Yechim:**
- Environment Variables → TELEGRAM_BOT_TOKEN tekshiring
- Save → Redeploy

### CORS Error

**Error:** "CORS policy blocked"

**Yechim:**
- Backend FRONTEND_URL to'g'ri sozlanganligini tekshiring
- Frontend NEXT_PUBLIC_API_URL to'g'rimi?

### 503 Error (Backend)

**Sabab:** Backend sleeping (15 daqiqadan keyin)

**Yechim:**
- UptimeRobot qo'shing (bepul)
- Yoki birinchi request'da 30-50 soniya kuting

---

## 🎯 CUSTOM DOMAIN (Opsional)

### Namecheap'dan domen oling:

**1. Domain xarid:**
- evolvoai.uz - ~$15/yil
- evolvoai.com - ~$12/yil

**2. Vercel'da:**
- Project Settings → Domains
- Add: `evolvoai.uz` va `www.evolvoai.uz`

**3. Namecheap DNS:**
```
Type: CNAME
Host: @
Value: cname.vercel-dns.com

Type: CNAME  
Host: www
Value: cname.vercel-dns.com
```

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-deployment:
- [ ] GitHub repositories yaratilgan
- [ ] Git configured (user.name, user.email)
- [ ] .env fayllar to'ldirilgan
- [ ] Local test qilingan

### Backend (Render):
- [ ] GitHub'ga pushed
- [ ] Render'ga imported
- [ ] Environment variables qo'shilgan
- [ ] Deploy successful
- [ ] /api/health javob beradi
- [ ] Logs'da "Telegram bot ishga tushdi"

### Frontend (Vercel):
- [ ] GitHub'ga pushed
- [ ] Vercel'ga imported
- [ ] NEXT_PUBLIC_API_URL qo'shilgan
- [ ] Deploy successful
- [ ] Bosh sahifa ochiladi

### Final:
- [ ] Telegram bot ishlayapti
- [ ] PWA install mumkin
- [ ] Admin panel kirish ishlaydi
- [ ] Barcha sahifalar ochiladi

---

## 💡 BONUS: UptimeRobot Setup (Render'ni uyg'oq qolish)

**1. Ro'yxatdan o'ting:**
- https://uptimerobot.com
- Bepul account

**2. New Monitor:**
```
Monitor Type: HTTP(s)
Friendly Name: EvolvoAI Backend
URL: https://evolvoai-backend.onrender.com/api/health
Monitoring Interval: 5 minutes
```

**3. Save:**
- Backend har 5 daqiqada ping oladi
- Hech qachon uxlamaydi ✅

---

## 🎉 TAYYOR!

**Sizda endi bor:**
- ✅ Professional website (Vercel)
- ✅ Backend API (Render)
- ✅ Telegram bot (24/7)
- ✅ AI Chatbot
- ✅ Admin panel
- ✅ SEO optimized
- ✅ PWA support

**Jami narx: $0/oy** 🆓

**Keyingi qadam:** UptimeRobot qo'shing va foydalaning!

---

**Muvaffaqiyatli deployment! 🚀**
