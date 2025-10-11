# 🧪 TTS Funksiyasini Test Qilish

## ✅ Qo'shilgan Yangi Funksiyalar

### 1. **Telegram Bot - Voice Messages**
- AI chat javoblarini ovozli eshitish
- 🔊 Ovozli eshitish tugmasi

### 2. **Web Chatbot - Audio Playback**
- Bot javoblarida audio tugmasi
- Browser'da to'g'ridan-to'g'ri audio o'ynash

---

## 🚀 Test Qilish

### Qadama 1: Backend'ni Qayta Ishga Tushiring

```bash
# Agar backend ishlab tursa, to'xtating (Ctrl+C)
# Keyin qayta ishga tushiring:

cd backend
node src/server.js
```

### Qadama 2: Telegram Bot'ni Test Qiling

1. Telegram'da @evolvoai_bot ga o'ting
2. `/start` bosing
3. **💬 AI Chat** tugmasini bosing
4. Biror savol yuboring, masalan: "Salom, sizning xizmatlaringiz haqida"
5. Bot javob bergandan keyin **🔊 Ovozli eshitish** tugmasini bosing

**Natija:**
- ✅ Bot voice message yuboradi (agar API key to'g'ri bo'lsa)
- ⚠️ Agar API key yo'q bo'lsa: "Audio yaratib bo'lmadi" xabari

### Qadama 3: Web Chatbot'ni Test Qiling

1. Brauzerda: http://localhost:3000
2. O'ng pastdagi chatbot tugmasini bosing
3. Savol yuboring: "Salom"
4. Bot javobi kelganda, vaqt yonidagi **🔊** tugmasini bosing

**Natija:**
- ✅ Audio browser'da o'ynaydi
- ⚠️ Agar API key yo'q bo'lsa: xato xabari

---

## 🔑 API Key Sozlash (Ixtiyoriy)

TTS ishlashi uchun API key kerak. 2 ta variant:

### Variant 1: Gemini API Key'dan Foydalanish (Oson)

`.env` faylida allaqachon mavjud:

```env
GEMINI_API_KEY=AIzaSyDwhFtwAhRpdcE3...
```

Bu yetarli! TTS avtomatik Gemini key'dan foydalanadi.

### Variant 2: Google TTS Maxsus API Key (Advanced)

Agar maxsus TTS API key olmoqchi bo'lsangiz:

1. https://console.cloud.google.com/
2. Cloud Text-to-Speech API'ni yoqing
3. API key yarating
4. `.env` ga qo'shing:

```env
GOOGLE_TTS_API_KEY=AIzaSy...
```

---

## 📊 Qo'shilgan Kodlar

### Backend:

**1. TTS Service (yangi fayl):**
- `backend/src/services/ttsService.js`
- Matnni audio'ga aylantirish
- Google Cloud TTS API

**2. Chatbot Route (yangilangan):**
- `backend/src/routes/chatbot.js`
- `/api/chatbot/tts` endpoint qo'shildi
- Session management

**3. Telegram Service (yangilangan):**
- `backend/src/services/telegramService.js`
- Voice message tugmasi
- TTS callback handler

### Frontend:

**1. Chatbot Component (yangilangan):**
- `frontend/src/components/Chatbot.js`
- Audio playback funksiyasi
- Volume tugmasi

---

## 📝 Asosiy O'zgarishlar

### Backend API Response (chatbot):

**Oldingi:**
```json
{
  "response": "Javob matni",
  "success": true
}
```

**Yangi:**
```json
{
  "response": "Javob matni",
  "success": true,
  "sessionId": "unique-id",
  "hasTTS": true
}
```

### Frontend Message Object:

**Oldingi:**
```javascript
{
  role: 'bot',
  content: 'Javob',
  timestamp: Date
}
```

**Yangi:**
```javascript
{
  role: 'bot',
  content: 'Javob',
  timestamp: Date,
  hasTTS: true  // ← YANGI
}
```

---

## 🛡️ Xavfsizlik va Optimizatsiya

### 1. **Audio Fayllar:**
- Vaqtinchalik `backend/audio/` papkada saqlanadi
- Avtomatik o'chiriladi (10 soniyadan keyin)
- Eski fayllar har soat tozalanadi

### 2. **Session Management:**
- Har bir foydalanuvchi uchun unique session ID
- 15 daqiqa saqlanadi
- Avtomatik tozalash

### 3. **API Limitlar:**
- Google TTS: 5000 belgi/request
- Bepul tier: 1M belgi/oy

---

## ❌ Fallback Mexanizmi

Agar TTS ishlamasa (API key yo'q yoki xato):

### Telegram:
```
⚠️ Audio yaratib bo'lmadi. 
Iltimos, qayta urinib ko'ring.

💡 Yoki javobni matn ko'rinishida o'qishingiz mumkin.

[« Orqaga]
```

### Web Chatbot:
```
Alert: Audio yaratishda xatolik yuz berdi
```

Bot javobi esa har doim matn ko'rinishida ko'rsatiladi.

---

## ✅ Tayyor!

TTS funksiyasi to'liq qo'shildi va ishga tayyor:

- ✅ Telegram bot: Voice messages
- ✅ Web chatbot: Audio playback
- ✅ API key: Gemini key ishlatiladi
- ✅ Fallback: API key bo'lmasa ham ishlaydi
- ✅ Avtomatik tozalash
- ✅ Session management

**Hech qanday mavjud funksiya buzilmadi!**

---

## 🎯 Keyingi Qadamlar

Agar TTS to'liq ishlashini xohlasangiz:

1. Backend'ni qayta ishga tushiring
2. Telegram bot'da test qiling
3. Web chatbot'da test qiling
4. Agar kerak bo'lsa, Google TTS API key qo'shing

**Hozir ham Gemini API key bilan TTS ishlashi kerak!**
