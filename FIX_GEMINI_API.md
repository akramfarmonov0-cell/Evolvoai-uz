# 🔧 Gemini API Tuzatish

## Muammo

Gemini API key ishlayapti, lekin modellar 404 xatosini bermoqda.

## Yechim 1: Yangi API Key Olish

1. https://makersuite.google.com/app/apikey ga o'ting
2. Google account bilan kiring  
3. **Create API Key** tugmasini bosing
4. Yangi key'ni `.env` fayliga qo'ying:

```env
GEMINI_API_KEY=yangi_api_key_shu_yerga
```

5. Backend'ni qayta ishga tushiring

## Yechim 2: Google AI Studio Ishlatish

1. https://aistudio.google.com/ ga o'ting
2. **Get API key** → **Create API key**
3. Yangi API key ni nusxalang
4. `.env` ga qo'ying

## Yechim 3: AI'siz Ishlash

Agar AI kerak bo'lmasa, qo'lda post yaratish mumkin:

```bash
# Manual post yaratish
cd backend
node test-image-post.js
```

Yoki Admin Panel orqali post yarating (keyinroq qo'shiladi).

## Test Qilish

API key yangilangandan keyin:

```bash
cd backend
node check-gemini-models.js
```

Agar biron model ishlasa, uni `contentGenerator.js` ga qo'ying.

---

## Hozirda Ishlayotgan Funksiyalar

✅ **Telegram integratsiyasi** - To'liq ishlamoqda
✅ **Blog tizimi** - Web saytda ko'rish mumkin
✅ **MongoDB** - Ma'lumotlar saqlanmoqda
✅ **Manual post yaratish** - Test postlar ishlayapti

❌ **AI avtomatik kontent** - API key muammosi
❌ **Har kuni avtomatik postlar** - AI kerak

---

## Xulosa

Telegram va barcha asosiy funksiyalar ishlayapti! 

AI'ni keyinroq sozlashingiz mumkin, yoki qo'lda post yaratib davom etishingiz mumkin.
