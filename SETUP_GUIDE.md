# 🚀 EvolvoAI - To'liq Setup Qo'llanma

## ⚡ Tez Boshlash

### 1️⃣ Barcha Serverlarni Ishga Tushirish
```
START_ALL.bat
```
Ikki terminal oynasi ochiladi:
- ✅ Backend (Port 5000)
- ✅ Frontend (Port 3000)

### 2️⃣ Barcha Serverlarni To'xtatish
```
STOP_ALL.bat
```

---

## 📋 Manual Setup

### Backend Server

```powershell
cd backend
node src/server.js
```

**Ko'rinishi kerak:**
```
✅ MongoDB ga muvaffaqiyatli ulandi
✅ Telegram bot ishga tushdi
Server 5000 portda ishlamoqda
```

### Frontend Server (Production)

```powershell
cd frontend
npm run build
npm run start
```

**Ko'rinishi kerak:**
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
✓ Starting...
✓ Ready
```

---

## 🤖 Telegram Bot Test

### 1. Bot ishlaydimi tekshirish
Backend terminal'da ko'rinishi kerak:
```
✅ Telegram bot ishga tushdi
```

### 2. Telegram'da test qilish
Botga yozing:
```
/start
```

**Javob berishi kerak:**
- Salomlashish xabari
- Inline tugmalar
- Menyu

### Agar ishlamasa:

**A. Backend .env tekshiring:**
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNO...
```

**B. Backend qayta ishga tushiring:**
```powershell
# Terminal'da Ctrl+C bosing
node src/server.js
```

**C. Console loglarni ko'ring:**
Agar "❌ Bot xatosi" ko'rsatsa - token noto'g'ri

---

## 📱 PWA Test

### 1. Production Build

PWA faqat production build'da ishlaydi:
```powershell
cd frontend
npm run build
npm run start
```

### 2. Chrome'da Test

1. **Oching:** http://localhost:3000
2. **Address bar:** Install icon (⊕) ko'rinishi kerak
3. **Click qilib o'rnating**
4. **Desktop'da icon** paydo bo'ladi

### 3. DevTools'da Tekshirish

**F12 → Application:**
- ✅ Manifest
- ✅ Service Workers
- ✅ Icons (8 ta)

**Lighthouse:**
- PWA score: 90+ bo'lishi kerak

### Agar ishlamasa:

**A. Icons mavjudmi?**
```powershell
cd frontend
node generate-icons.js
```

**B. Production build qildingizmi?**
```powershell
npm run build
npm run start
```

**C. Development mode'da PWA disable:**
```powershell
# Development
npm run dev  # ❌ PWA ishlamaydi

# Production
npm run build && npm run start  # ✅ PWA ishlaydi
```

---

## 🔍 Troubleshooting

### Port Band Bo'lsa

**Backend (5000):**
```powershell
netstat -ano | findstr ":5000"
taskkill /PID [PID_NUMBER] /F
```

**Frontend (3000):**
```powershell
netstat -ano | findstr ":3000"
taskkill /PID [PID_NUMBER] /F
```

### MongoDB Xatosi

Backend .env:
```env
MONGODB_URI=mongodb+srv://...
```

### Telegram Bot Javob Bermasa

1. ✅ Backend ishlaydimi?
2. ✅ .env da TELEGRAM_BOT_TOKEN bormi?
3. ✅ Console'da "Bot ishga tushdi" ko'ringanmi?
4. ✅ Internet bor mi?

### PWA Install Ko'rinmasa

1. ✅ Production build qilganmisiz?
2. ✅ Icons yaratilganmi? (`npm run build` ichida yaratiladi)
3. ✅ HTTPS yoki localhost ishlatayapsizmi?
4. ✅ Chrome/Edge ishlatayapsizmi? (Safari PWA support past)

---

## 📊 Serverlar Holati

| Server | Port | Komanda | Tekshirish |
|--------|------|---------|------------|
| Backend | 5000 | `node src/server.js` | http://localhost:5000/api/health |
| Frontend | 3000 | `npm run start` | http://localhost:3000 |
| MongoDB | - | Cloud | Backend console loglari |
| Telegram Bot | - | Auto | `/start` yuboring |

---

## ✅ Success Checklist

### Backend
- [ ] Server ishga tushdi (port 5000)
- [ ] MongoDB ulandi
- [ ] Telegram bot ishga tushdi
- [ ] `/api/health` javob beradi

### Frontend
- [ ] Production build success
- [ ] Server ishga tushdi (port 3000)
- [ ] Sahifa ochiladi
- [ ] Chatbot ko'rinadi

### Telegram Bot
- [ ] `/start` javob beradi
- [ ] Inline tugmalar ishlaydi
- [ ] AI chat funksiyasi ishlaydi
- [ ] Menu navigatsiya ishlaydi

### PWA
- [ ] Production build qilingan
- [ ] Icons yaratilgan (8 ta)
- [ ] Install prompt ko'rinadi
- [ ] Service Worker registered
- [ ] Lighthouse 90+ ball

---

## 🎯 To'liq Test Ketma-ketligi

### 1. Backend
```powershell
cd backend
node src/server.js
```
**Kutish:** "✅ Telegram bot ishga tushdi"

### 2. Frontend
```powershell
cd frontend
npm run build
npm run start
```
**Kutish:** "✓ Ready"

### 3. Telegram
- Bot'ga `/start` yuboring
- **Kutish:** Javob va tugmalar

### 4. Website
- http://localhost:3000 oching
- **Kutish:** Sahifa ochiladi

### 5. PWA
- Chrome'da Install icon
- **Kutish:** Desktop'da icon

### 6. Chatbot
- Website'da chatbot tugmasi
- **Kutish:** Chat oynasi ochiladi

---

## 📞 Qo'shimcha Yordam

### Loglarni Ko'rish
Backend va Frontend terminallarida xatolar ko'rinadi

### .env Fayllar
- Backend: `backend\.env`
- Frontend: `frontend\.env.local`

### Portlarni Tekshirish
```powershell
netstat -ano | findstr ":5000"
netstat -ano | findstr ":3000"
```

---

**Omad! Barcha xizmatlar ishlashi kerak! 🚀**
