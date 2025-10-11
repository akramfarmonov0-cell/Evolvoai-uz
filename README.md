# EvolvoAI - AI-Powered IT Solutions Platform

Web saytlar, Telegram botlar, Chatbotlar va Avtomatlashtirish xizmatlari bilan to'liq IT platformasi. Har kuni AI yordamida 15 ta yangi blog post avtomatik generatsiya qilinadi.

## 🚀 Asosiy Imkoniyatlar

- ✅ Zamonaviy Next.js web sayt
- ✅ AI (Gemini 1.5 Flash) orqali avtomatik kontent generatsiya
- ✅ Telegram bot va kanal integratsiyasi
- ✅ SEO optimallashtirilgan blog tizimi
- ✅ 15 ta kategoriyada avtomatik postlar
- ✅ Marketing postlar avtomatlashtirish
- ✅ Kontakt forma (Telegram'ga yuboriladi)
- ✅ Responsive dizayn
- ✅ Admin statistika

## 📋 Texnologiyalar

### Backend
- Node.js + Express
- MongoDB
- Gemini AI API
- Telegram Bot API (Telegraf)
- Node-cron (scheduling)

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Axios

## 📦 O'rnatish

### 1. Repository'ni klonlash

```bash
git clone <your-repo-url>
cd evolvoai-project
```

### 2. Backend sozlash

```bash
cd backend
npm install

# .env faylini yaratish
cp .env.example .env
```

`.env` faylini to'ldiring:

```env
PORT=5000
NODE_ENV=development

# MongoDB - Local yoki MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/evolvoai

# Gemini AI - https://makersuite.google.com/app/apikey dan oling
GEMINI_API_KEY=your_gemini_api_key_here

# Telegram Bot - @BotFather dan oling
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=@your_channel_username
ADMIN_CHAT_ID=your_telegram_user_id

# JWT
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend sozlash

```bash
cd ../frontend
npm install

# .env.local faylini yaratish
cp .env.local.example .env.local
```

`.env.local` faylini to'ldiring:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/your_channel
```

### 4. MongoDB ishga tushirish

#### Local MongoDB:
```bash
# MacOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### Yoki MongoDB Atlas ishlatish (tavsiya etiladi):
1. https://www.mongodb.com/cloud/atlas/register sahifasidan ro'yxatdan o'ting
2. Bepul cluster yarating
3. Database user yarating
4. IP Address'ni whitelist qiling (0.0.0.0/0 - hamma IP uchun)
5. Connection string'ni `.env` fayliga qo'shing

### 5. Ishga tushirish

#### Backend:
```bash
cd backend
npm run dev
```

Backend http://localhost:5000 da ishga tushadi

#### Frontend:
```bash
cd frontend
npm run dev
```

Frontend http://localhost:3000 da ishga tushadi

## 🤖 Telegram Bot Sozlash

### 1. Bot yaratish

1. Telegram'da @BotFather'ni toping
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting
4. Username kiriting (masalan: evolvoai_bot)
5. Token'ni nusxalang va `.env` fayliga qo'shing

### 2. Kanal yaratish

1. Telegram'da yangi kanal yarating
2. Bot'ni kanalga admin qilib qo'shing
3. Kanal username'ini `.env` fayliga qo'shing (masalan: @evolvoai)

### 3. Admin Chat ID olish

1. @userinfobot'ga `/start` yuboring
2. O'z Chat ID'ingizni oling
3. `.env` faylidagi `ADMIN_CHAT_ID`ga qo'shing

## 🔑 Gemini API Key Olish

1. https://makersuite.google.com/app/apikey sahifasiga o'ting
2. Google account bilan kiring
3. "Create API Key" tugmasini bosing
4. API key'ni nusxalang va `.env` fayliga qo'shing

## 📅 Avtomatlashtirish Sozlash

Backend avtomatik ravishda quyidagi vazifalarni bajaradi:

- **Har kuni soat 10:00** - 15 ta yangi blog post yaratadi va nashr qiladi
- **Har 3 soatda** - Marketing post yuboradi

Vaqtlarni o'zgartirish uchun `backend/src/server.js` faylidagi cron schedule'larni o'zgartiring:

```javascript
// Har kuni soat 09:00 da
cron.schedule('0 9 * * *', async () => { ... })

// Har 2 soatda
cron.schedule('0 */2 * * *', async () => { ... })
```

## 🗂️ Loyiha Strukturasi

```
evolvoai-project/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB modellar
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   │   ├── contentGenerator.js  # AI kontent generatsiya
│   │   │   └── telegramService.js   # Telegram integratsiya
│   │   └── server.js        # Main server file
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   │   ├── page.js      # Bosh sahifa
│   │   │   ├── blog/        # Blog sahifalari
│   │   │   ├── services/    # Xizmatlar
│   │   │   └── contact/     # Bog'lanish
│   │   └── components/      # React komponentlar
│   ├── .env.local
│   └── package.json
└── README.md
```

## 🚀 Production'ga Deploy Qilish

### Backend (Heroku, Railway, DigitalOcean)

1. MongoDB Atlas'ga o'ting
2. Environment variables sozlang
3. Build va deploy:

```bash
cd backend
npm start
```

### Frontend (Vercel)

1. GitHub'ga push qiling
2. Vercel.com'ga o'ting
3. Repository'ni import qiling
4. Environment variables qo'shing
5. Deploy qiling

## 🐛 Muammolarni Hal Qilish

### MongoDB ulanmayapti
- MongoDB service ishayotganini tekshiring
- Connection string to'g'riligini tekshiring
- IP whitelist sozlamalarini tekshiring (MongoDB Atlas)

### Telegram bot ishlamayapti
- Bot token to'g'riligini tekshiring
- Bot kanalga admin qilib qo'shilganligini tekshiring
- Bot active (o'chirilmagan) ekanligini tekshiring

### AI postlar yaratilmayapti
- Gemini API key to'g'riligini tekshiring
- API limit'ga yetmaganligingizni tekshiring
- Console log'larni tekshiring

### Frontend backend'ga ulanmayapti
- Backend ishayotganini tekshiring (localhost:5000)
- CORS sozlamalari to'g'riligini tekshiring
- API URL to'g'riligini tekshiring

## 📝 Qo'shimcha Ma'lumot

- Har kuni maksimum 15 ta post yaratiladi (Gemini API limiti)
- Postlar avtomatik MongoDB'ga saqlanadi
- Postlar avtomatik Telegram kanalga yuboriladi
- SEO uchun slug, tags va meta ma'lumotlar avtomatik generatsiya qilinadi

## 🤝 Yordam

Savollaringiz bo'lsa:
- Email: info@evolvoai.uz
- Telegram: @evolvoai

## 📄 License

MIT License - Commercial use allowed