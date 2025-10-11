# 🔊 Text-to-Speech (TTS) Funksiyasi

## ✅ Qo'shilgan Imkoniyatlar

### 1. **Telegram Bot TTS**
- AI chat javoblarini ovozli eshitish
- Voice message formatida yuborish
- Rus tilida (o'zbek tiliga yaqin)

### 2. **Web Chatbot TTS**
- Chatbot javoblarini ovozli eshitish
- Browser'da to'g'ridan-to'g'ri audio playback
- Har bir bot javobida audio tugmasi

---

## 📋 Qo'shilgan Fayllar

### Backend:
1. **`backend/src/services/ttsService.js`** - TTS service
2. **`backend/src/routes/chatbot.js`** - TTS API endpoint qo'shildi
3. **`backend/src/services/telegramService.js`** - Telegram TTS tugmasi

### Frontend:
1. **`frontend/src/components/Chatbot.js`** - Audio playback funksiyasi

---

## 🔧 Sozlash

### Variant 1: Google Cloud TTS (Tavsiya etiladi)

Google Cloud TTS eng yaxshi sifat beradi, lekin API key kerak.

#### 1. Google Cloud TTS API Key Olish:

1. https://console.cloud.google.com/ ga o'ting
2. Yangi project yarating yoki mavjud projectni tanlang
3. **APIs & Services** → **Enable APIs and Services**
4. **Cloud Text-to-Speech API** ni qidiring va enable qiling
5. **Credentials** → **Create Credentials** → **API Key**
6. API key'ni nusxalang

#### 2. .env Faylini Yangilash:

```env
# Google TTS (ixtiyoriy - TTS uchun)
GOOGLE_TTS_API_KEY=AIzaSy...

# Yoki Gemini API key'dan foydalanish
GEMINI_API_KEY=AIzaSyDwhFtwAhRpdcE3...
```

**Eslatma:** Agar `GOOGLE_TTS_API_KEY` yo'q bo'lsa, `GEMINI_API_KEY` ishlatiladi.

---

### Variant 2: API Key'siz Ishlash

Agar API key yo'q bo'lsa, TTS tugmasi ko'rinadi lekin audio yaratilmaydi. Bu holda:
- Bot javobini matn ko'rinishida o'qish mumkin
- Keyinroq API key qo'shish mumkin

---

## 🎯 Qanday Ishlaydi

### Telegram Bot:

1. Bot'ga `/start` yuboring
2. **💬 AI Chat** tugmasini bosing
3. Biror savol yuboring
4. Bot javob beradi
5. **🔊 Ovozli eshitish** tugmasini bosing
6. Bot voice message yuboradi

### Web Chatbot:

1. Web saytni oching: http://localhost:3000
2. Chatbot tugmasini bosing (o'ng pastda)
3. Savol yuboring
4. Javob kelganda **🔊** tugmasini bosing
5. Audio browser'da o'ynaydi

---

## 🧪 Test Qilish

### Backend'ni Ishga Tushirish:

```bash
cd backend
node src/server.js
```

### Telegram Bot Test:

1. Telegram'da @evolvoai_bot ga o'ting
2. `/start` → **AI Chat** → Savol yuboring
3. **🔊 Ovozli eshitish** bosing

### Web Chatbot Test:

1. http://localhost:3000 ni oching
2. Chatbot'ni oching
3. "Salom" deb yozing
4. Javobda **🔊** tugmasini bosing

---

## 📁 Fayl Tuzilmasi

```
backend/
├── audio/                          # Vaqtinchalik audio fayllar
│   └── tts_*.ogg                   # Avtomatik yaratiladi va o'chiriladi
├── src/
│   ├── services/
│   │   ├── ttsService.js          # ✨ YANGI - TTS service
│   │   └── telegramService.js      # 🔄 YANGILANDI - TTS tugmasi
│   └── routes/
│       └── chatbot.js              # 🔄 YANGILANDI - TTS endpoint

frontend/
└── src/
    └── components/
        └── Chatbot.js               # 🔄 YANGILANDI - Audio playback
```

---

## 🎨 Foydalanuvchi Interfeysi

### Telegram Bot:

```
🤖 Bot javobi...

[🔊 Ovozli eshitish]
[❌ Chat To'xtatish]
[« Menyu]
```

### Web Chatbot:

```
┌─────────────────────────┐
│ Bot: Javob matni...     │
│ 14:30  [🔊]            │
└─────────────────────────┘
```

---

## 🔍 API Endpoints

### 1. Chatbot Chat (yangilandi):

```http
POST /api/chatbot/chat
Content-Type: application/json
x-session-id: unique-session-id (optional)

{
  "message": "Salom",
  "history": []
}

Response:
{
  "response": "Assalomu alaykum!",
  "success": true,
  "sessionId": "session-id",
  "hasTTS": true
}
```

### 2. TTS Audio (yangi):

```http
POST /api/chatbot/tts
x-session-id: session-id

Response:
Content-Type: audio/ogg
[audio binary data]
```

---

## ⚙️ TTS Sozlamalari

### ttsService.js da:

```javascript
// Tillar
'uz-UZ': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-A' }
'ru-RU': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-A' }
'en-US': { languageCode: 'en-US', name: 'en-US-Wavenet-F' }

// Audio format
audioEncoding: 'OGG_OPUS'  // Telegram uchun mos

// Parametrlar
speakingRate: 1.0  // Tezlik (0.25 - 4.0)
pitch: 0.0         // Ohang (-20.0 - 20.0)
```

---

## 🐛 Muammolarni Hal Qilish

### 1. Audio yaratilmayapti

**Sabab:** API key yo'q yoki noto'g'ri

**Yechim:**
```bash
# .env faylini tekshiring
cat backend/.env | grep API_KEY

# Backend loglarini ko'ring
# "⚠️ TTS API key topilmadi" xabari bo'lsa, API key qo'shing
```

### 2. Telegram'da voice message kelmayapti

**Sabab:** Audio format muammosi

**Yechim:**
- Backend console'da xatolarni ko'ring
- `OGG_OPUS` format ishlatilganligini tekshiring

### 3. Web chatbot'da audio o'ynamayapti

**Sabab:** Browser format'ni qo'llab-quvvatlamaydi

**Yechim:**
- Chrome yoki Firefox ishlatng
- Browser console'da xatolarni ko'ring (F12)

### 4. "Audio yaratib bo'lmadi" xatosi

**Sabab:** Google TTS API limiti tugagan

**Yechim:**
- Google Cloud Console'da quota'ni tekshiring
- Billing'ni yoqish kerak bo'lishi mumkin

---

## 💰 Narxlar (Google Cloud TTS)

- **Bepul tier:** 0-1 million belgi/oy
- **Standard:** $4.00 / 1M belgi
- **WaveNet:** $16.00 / 1M belgi

**Misol:**
- 1000 ta xabar × 200 belgi = 200,000 belgi
- Narx: ~$0.80 (WaveNet) yoki bepul (standard tier)

---

## 🚀 Keyingi Yaxshilashlar

### Rejadagi Imkoniyatlar:

1. **O'zbek tili qo'llab-quvvatlash**
   - Azure TTS (uz-UZ mavjud)
   - Yandex SpeechKit

2. **Ovoz tanlash**
   - Erkak/ayol ovozlari
   - Turli xil aksentlar

3. **Tezlik va ohang sozlamalari**
   - Foydalanuvchi sozlamalari
   - Preferences saqlash

4. **Offline TTS**
   - espeak-ng
   - pyttsx3

---

## 📝 Eslatmalar

✅ **TTS qo'shildi, lekin:**
- Mavjud funksiyalar buzilmagan
- API key ixtiyoriy (fallback mavjud)
- Frontend/Backend mustaqil ishlaydi

⚠️ **Limitlar:**
- Google TTS: 5000 belgi/request
- Audio fayllar avtomatik o'chiriladi (1 soatdan keyin)
- Session 15 daqiqa saqlanadi

🔒 **Xavfsizlik:**
- API key `.env` da (gitignore'da)
- Session ID hash qilingan
- Audio fayllar vaqtinchalik

---

## ✅ Xulosa

TTS funksiyasi muvaffaqiyatli qo'shildi:

- ✅ Telegram bot: Voice message
- ✅ Web chatbot: Audio playback
- ✅ API endpoint: /api/chatbot/tts
- ✅ Avtomatik tozalash
- ✅ Fallback mexanizmi

**Hozir ishlash uchun:**
1. Backend ishga tushiring
2. API key qo'shing (ixtiyoriy)
3. Test qiling!

**Savol va muammolar uchun:**
- Backend console loglarini ko'ring
- Browser console'ni tekshiring (F12)
- API key to'g'riligini tasdiqlang
