# 🔊 TTS Demo - Gemini 2.5 Flash TTS

## 📍 URL

http://localhost:3000/tts-demo.html

---

## ✨ Xususiyatlar

### 1. **Zamonaviy TTS Texnologiyasi**
- Gemini 2.5 Flash Preview TTS API
- Yuqori sifatli ovoz sintezi
- Natural sounding voices

### 2. **7+ Turli Ovozlar**
- **Zephyr** - Yorqin
- **Puck** - Xushchaqchaq
- **Charon** - Ma'lumot beruvchi
- **Kore** - Qat'iy
- **Fenrir** - Hayajonli
- **Aoede** - Yengil
- Va boshqalar...

### 3. **Foydalanish Oson**
- Oddiy interfeys
- Bir klikda audio yaratish
- Yuklab olish imkoniyati

### 4. **Xavfsiz**
- API key brauzerda saqlanadi
- Server'ga yuborilmaydi
- LocalStorage ishlatiladi

---

## 🚀 Qanday Ishlatish

### Qadama 1: Sahifani Oching

```
http://localhost:3000/tts-demo.html
```

### Qadama 2: API Key Kiriting

1. `.env` faylidagi `GEMINI_API_KEY` ni nusxalang:
   ```
   AIzaSyDwhFtwAhRpdcE3...
   ```

2. "Gemini API Key" maydoniga qo'ying

3. API key avtomatik saqlanadi (keyingi safar kiritish shart emas)

**API Key yo'q?**
- https://aistudio.google.com/apikey dan oling
- Bepul (quota limiti bor)

### Qadama 3: Matn Kiriting

Textarea'ga istagan matnni yozing:

```
Assalomu alaykum! Men EvolvoAI kompaniyasining 
sun'iy intellekt ovoz yordamchisiman.
```

### Qadama 4: Ovoz Tanlang

Dropdown'dan ovoz tanlang:
- Erkak ovozlar: Charon, Kore, Fenrir
- Ayol ovozlar: Zephyr, Puck, Aoede

### Qadama 5: Audio Yarating

"Audio Yaratish" tugmasini bosing:
- ⏳ Bir necha soniya kutish
- ✅ Audio avtomatik o'ynaydi
- 💾 "Yuklab Olish" tugmasi paydo bo'ladi

---

## 📥 Audio Yuklab Olish

1. Audio yaratilgandan keyin
2. "Yuklab Olish" tugmasini bosing
3. `evolvoai_tts_audio.wav` fayl yuklab olinadi

**Format:** WAV (16-bit PCM)
**Sample Rate:** 24kHz
**Channels:** Mono

---

## 🎨 Interfeys

### Light Mode
- Oq fon
- Ko'k tugmalar
- Qulay o'qish

### Dark Mode
- Qora fon
- Avtomatik moslashuv
- Ko'z uchun yengil

---

## 🔧 Texnik Tafsilotlar

### API Endpoint:
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent
```

### Request Format:
```json
{
  "contents": [{
    "parts": [{"text": "Your text here"}]
  }],
  "generationConfig": {
    "responseModalities": ["AUDIO"],
    "speechConfig": {
      "voiceConfig": {
        "prebuiltVoiceConfig": {
          "voiceName": "Puck"
        }
      }
    }
  }
}
```

### Response Format:
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "inlineData": {
          "mimeType": "audio/pcm;rate=24000",
          "data": "base64_encoded_audio"
        }
      }]
    }
  }]
}
```

---

## ⚠️ Limitlar va Cheklovlar

### Google API Quota:
- **Bepul tier:** Cheklangan
- **Rate limit:** ~60 requests/minut
- **Maksimal matn:** ~5000 belgi

### Tavsiyalar:
- Qisqa matnlar ishlatng
- Ortiqcha so'rovlardan saqlaning
- API key'ni maxfiy saqlang

---

## 🐛 Muammolarni Hal Qilish

### "HTTP xatosi! Status: 401"
- ❌ API key noto'g'ri yoki eskirgan
- ✅ Yechim: Yangi API key oling

### "HTTP xatosi! Status: 429"
- ❌ API quota tugagan
- ✅ Yechim: Bir oz kuting yoki billing yoqing

### "API dan audio ma'lumotlari olinmadi"
- ❌ Javobda xatolik
- ✅ Yechim: Browser console'ni tekshiring

### Audio o'ynamayapti
- ❌ Browser format'ni qo'llab-quvvatlamaydi
- ✅ Yechim: Chrome yoki Firefox ishlatng

---

## 💡 Foydalanish Misollari

### 1. Blog Post'larni Ovozga Aylantirish
```
Matn: Blog post matni...
Ovoz: Charon (Ma'lumot beruvchi)
```

### 2. Xabarlar uchun Audio
```
Matn: Yangi mahsulot haqida e'lon
Ovoz: Puck (Xushchaqchaq)
```

### 3. Ta'lim Materiallari
```
Matn: Darslik matni
Ovoz: Aoede (Yengil)
```

---

## 🔐 Xavfsizlik

### API Key Saqlash:
- ✅ LocalStorage'da
- ✅ Faqat brauzerda
- ✅ Server'ga yuborilmaydi
- ✅ HTTPS orqali API'ga

### Tavsiyalar:
- API key'ni ulashmang
- Quota monitoring qiling
- Production'da backend ishlatng

---

## 🚀 Production'da Ishlatish

### Variant 1: Frontend Only (Hozirgi)
- Foydalanuvchi o'z API key'ini kiritadi
- Client-side ishlov berish
- Tez va oddiy

### Variant 2: Backend Integration (Tavsiya)
- Server'da API key
- `/api/tts` endpoint
- Xavfsiz va nazoratli

---

## 📚 Qo'shimcha Resurslar

- [Gemini API Docs](https://ai.google.dev/)
- [TTS API Guide](https://ai.google.dev/gemini-api/docs/audio)
- [API Key Management](https://aistudio.google.com/)

---

## ✅ Xulosa

TTS Demo sahifa:
- ✅ Tayyor va ishlayapti
- ✅ Gemini 2.5 Flash TTS API
- ✅ Multiple voices
- ✅ Download audio
- ✅ Responsive design

**URL:** http://localhost:3000/tts-demo.html

**Endi sinab ko'ring!** 🎉🔊
