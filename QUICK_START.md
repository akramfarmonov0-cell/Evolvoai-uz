# 🚀 Tez Boshlash - EvolvoAI

15 daqiqada loyihani ishga tushiring!

## ✅ Bosqichma-bosqich qo'llanma

### 1. Kerakli Dasturlar (5 daqiqa)

```bash
# Node.js (v18 yoki yuqori)
node --version  # v18.0.0+ bo'lishi kerak

# MongoDB (ixtiyoriy - MongoDB Atlas ishlatishingiz mumkin)
# MacOS
brew install mongodb-community

# Linux
sudo apt-get install mongodb

# Windows - https://www.mongodb.com/try/download/community
```

### 2. Loyihani Clone Qilish (1 daqiqa)

```bash
# Loyihani yuklab oling
git clone <your-repo-url>
cd evolvoai-project

# Yoki zip fayldan
unzip evolvoai-project.zip
cd evolvoai-project
```

### 3. Backend Sozlash (3 daqiqa)

```bash
cd backend

# Dependencies o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env

# .env faylini tahrirlash
nano .env  # yoki code .env
```

**Minimal .env konfiguratsiya:**
```env
MONGODB_URI=mongodb://localhost:27017/evolvoai
GEMINI_API_KEY=AIzaSyC-xxxxxxxxxxx  # https://makersuite.google.com/app/apikey
TELEGRAM_BOT_TOKEN=7123456789:AAH-xxxxxxxxxxx  # @BotFather
TELEGRAM_CHANNEL_ID=@your_channel
```

### 4. Frontend Sozlash (2 daqiqa)

```bash
cd ../frontend

# Dependencies o'rnatish
npm install

# .env.local yaratish
cp .env.local.example .env.local

# Tahrirlash
nano .env.local  # yoki code .env.local
```

**Minimal .env.local konfiguratsiya:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/your_channel
```

### 5. MongoDB Ishga Tushirish (1 daqiqa)

**Variant A: Local MongoDB**
```bash
# MacOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - Services.msc → MongoDB → Start
```

**Variant B: MongoDB Atlas (Tavsiya etiladi)**
1. https://mongodb.com/cloud/atlas → Sign Up
2. Free Cluster yarating
3. Database User yarating
4. IP: 0.0.0.0/0 (Allow all)
5. Connection string'ni `.env`ga qo'shing

### 6. Ishga Tushirish! (1 daqiqa)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend: http://localhost:3000

### 7. Test Qilish (2 daqiqa)

```bash
# Backend testini ishga tushirish
cd backend
node test-content-generator.js
```

Bu 3 ta test post yaratadi va sizga natijani ko'rsatadi.

---

## 🎯 API Key'larni Olish

### Gemini API Key (2 daqiqa)
1. https://makersuite.google.com/app/apikey
2. Google account bilan kiring
3. "Create API Key" → Copy
4. `.env` fayliga qo'shing

### Telegram Bot (3 daqiqa)
1. Telegram'da @BotFather'ni oching
2. `/newbot` yuboring
3. Bot nomini kiriting: "EvolvoAI Bot"
4. Username: "evolvoai_bot"
5. Token'ni copy qiling va `.env`ga qo'shing

### Telegram Channel (2 daqiqa)
1. Telegram'da yangi kanal yarating
2. Kanal public qiling va username bering
3. Bot'ni kanalga admin qilib qo'shing
4. Username'ni `.env`ga qo'shing (@your_channel)

---

## ✨ Birinchi Postlarni Yaratish

### Avtomatik (Har kuni soat 10:00)
Backend ishga tushgan bo'lsa, avtomatik ravishda har kuni 10:00 da 15 ta post yaratiladi.

### Manual (Hozir)
```bash
cd backend
node test-content-generator.js
```

---

## 📱 Saytni Ko'rish

1. Brauzerda oching: http://localhost:3000
2. Navigatsiya:
   - Bosh sahifa: `/`
   - Blog: `/blog`
   - Xizmatlar: `/services`
   - Bog'lanish: `/contact`

---

## 🐛 Tez Muammolar va Yechimlar

### Port band bo'lsa
```bash
# 5000 port band bo'lsa
lsof -ti:5000 | xargs kill -9

# 3000 port band bo'lsa
lsof -ti:3000 | xargs kill -9
```

### MongoDB ulanmasa
```bash
# MongoDB ishyapti mi?
mongod --version

# Ishga tushirish
brew services start mongodb-community  # MacOS
sudo systemctl start mongod  # Linux
```

### npm install xatolari
```bash
# Cache tozalash
npm cache clean --force

# Node modules o'chirish va qayta o'rnatish
rm -rf node_modules package-lock.json
npm install
```

### Gemini API xatolari
- API key to'g'ri ekanligini tekshiring
- https://makersuite.google.com/app/apikey sahifasida qayta yarating
- API limit'ga yetmaganligingizni tekshiring (15 req/min)

---

## 📚 Keyingi Qadamlar

1. ✅ **Kontent Kategoriyalarini Sozlash**
   - `backend/src/services/contentGenerator.js` → CATEGORIES

2. ✅ **Dizaynni O'zgartirish**
   - `frontend/tailwind.config.js` → colors
   - `frontend/src/app/globals.css` → styles

3. ✅ **Xizmatlarni Qo'shish**
   - `backend/src/routes/services.js` → SERVICES array

4. ✅ **Cron Schedule'ni O'zgartirish**
   - `backend/src/server.js` → cron.schedule

5. ✅ **Production'ga Deploy**
   - DEPLOYMENT.md faylini o'qing

---

## 💡 Maslahatlar

- **Development** - `npm run dev` ishlatng (hot reload)
- **Production** - `npm start` ishlating
- **Logs** - Console'ni kuzatib turing
- **Testing** - test-content-generator.js ni muntazam ishlating
- **Backup** - MongoDB'ni backup qilib turing

---

## 🆘 Yordam Kerakmi?

- 📖 README.md - To'liq dokumentatsiya
- 🚀 DEPLOYMENT.md - Production deploy
- 💬 Telegram: @evolvoai_support
- 📧 Email: support@evolvoai.uz

---

## ✅ Tayyor!

Agar hammasi ishlasa:
- ✅ Backend: http://localhost:5000/api/health
- ✅ Frontend: http://localhost:3000
- ✅ Telegram bot javob beradi
- ✅ Har kuni postlar yaratiladi

**Omad! 🎉**