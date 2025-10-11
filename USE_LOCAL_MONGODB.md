# Local MongoDB Ishlatish

## 1. MongoDB Community Server O'rnatish

### Windows:
1. MongoDB yuklab oling: https://www.mongodb.com/try/download/community
2. O'rnating (default settings)
3. MongoDB Compass ham o'rnatiladi

## 2. MongoDB Serverni Ishga Tushirish

### PowerShell (Administrator):
```powershell
net start MongoDB
```

Yoki MongoDB Compass orqali connection qiling.

## 3. .env Faylini Yangilash

`backend/.env` faylini yarating yoki yangilang:

```env
PORT=5000
NODE_ENV=development

# LOCAL MongoDB (Atlas o'rniga)
MONGODB_URI=mongodb://localhost:27017/evolvoai

# Gemini AI
GEMINI_API_KEY=AIzaSyAYLjXv_AABH0eKXn-QBb15mAoxXQgmwQM

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=@your_channel_username

# Admin
ADMIN_EMAIL=admin@evolvoai.com
ADMIN_PASSWORD=admin123

# JWT
JWT_SECRET=your_jwt_secret_here_minimum_32_characters_long_abc123
JWT_EXPIRE=30d

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 4. Serverni Qayta Ishga Tushiring

```powershell
cd backend
node src/server.js
```

## MongoDB Compass orqali Ma'lumotlarni Ko'rish

1. MongoDB Compass ochig
2. Connect: `mongodb://localhost:27017`
3. Database: `evolvoai`
4. Collections: `posts`, `portfolios`, `contacts`, etc.

## Afzalliklari

- ✅ Internet connection talab qilmaydi
- ✅ Tezroq ishlaydi (local)
- ✅ Development uchun qulay
- ✅ IP whitelist muammosi yo'q

## Kamchiliklari

- ❌ Production uchun mos emas
- ❌ MongoDB service doim ishlab turishi kerak
- ❌ Backup qilish qo'lda
