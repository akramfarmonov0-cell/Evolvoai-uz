# 📱 Telegram Bot va Kanal Sozlash

## 1. Telegram Bot Yaratish

1. Telegram'da [@BotFather](https://t.me/BotFather) botni oching
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting (masalan: **EvolvoAI News Bot**)
4. Bot username'ini kiriting (masalan: **evolvoai_news_bot**)
5. BotFather sizga TOKEN beradi. Uni nusxalang.

**Misol Token:**
```
7123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Bu tokenni `.env` faylidagi `TELEGRAM_BOT_TOKEN` ga qo'ying.

---

## 2. Telegram Kanal Yaratish

### Yangi Kanal Yaratish:

1. Telegram'da yangi kanal yarating
   - Mobile: Menu → New Channel
   - Desktop: Menu → Create Channel

2. Kanal nomini kiriting (masalan: **EvolvoAI IT Yangiliklari**)

3. Kanal turini tanlang:
   - ✅ **Public** - Hammaga ochiq kanal (tavsiya etiladi)
   - ⚠️ Private - Faqat havola bo'yicha

4. Public kanal uchun **username** bering (masalan: **evolvoai_news**)

---

## 3. Bot'ni Kanalga Admin Qilish

### MUHIM: Bot'ni admin qilib qo'shmay post yuborish ishlamaydi!

1. Kanal sozlamalarini oching
2. **Administrators** → **Add Administrator**
3. Bot'ni qidiring (@evolvoai_news_bot)
4. Bot'ni tanlang va quyidagi huquqlarni bering:
   - ✅ **Post Messages** (Xabar yuborish)
   - ✅ **Edit Messages** (Xabarlarni tahrirlash)
   - ⚠️ Boshqa huquqlar ixtiyoriy

---

## 4. Channel ID Olish

### Variant A: Public Channel (@username)

Public kanal bo'lsa, `.env` fayliga shunchaki username qo'ying:

```env
TELEGRAM_CHANNEL_ID=@evolvoai_news
```

### Variant B: Private Channel (Chat ID)

Private kanal bo'lsa, Chat ID ni olish kerak:

1. Bot'ni kanalga admin qilib qo'shing
2. Kanalga biror xabar yuboring
3. Brauzerda oching:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. `"chat":{"id": -1001234567890}` ni toping
5. Bu ID ni `.env` ga qo'ying:
   ```env
   TELEGRAM_CHANNEL_ID=-1001234567890
   ```

---

## 5. .env Faylini To'ldirish

`.env` faylini oching va quyidagilarni to'ldiring:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=7123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHANNEL_ID=@evolvoai_news

# Admin Chat ID (Ixtiyoriy - Kontakt formalar uchun)
ADMIN_CHAT_ID=123456789
```

### Admin Chat ID Olish (Ixtiyoriy):

1. Telegram'da [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring
2. Sizning Chat ID'ingizni ko'rsatadi
3. Bu ID ni `ADMIN_CHAT_ID` ga qo'ying

---

## 6. Sozlamalarni Test Qilish

Backend'ni qayta ishga tushiring:

```bash
cd backend
node src/server.js
```

Test post yuboring:

```bash
node test-image-post.js
```

---

## ✅ To'g'ri Sozlangan .env Misoli

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Gemini AI
GEMINI_API_KEY=AIzaSyAYLjXv_AABH0eKXn-QBb15mAoxXQgmwQM

# Telegram
TELEGRAM_BOT_TOKEN=7123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHANNEL_ID=@evolvoai_news
ADMIN_CHAT_ID=123456789

# JWT
JWT_SECRET=your_random_secret_key_minimum_32_chars
JWT_EXPIRE=30d

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 🐛 Muammolarni Hal Qilish

### "Chat not found" xatosi:
- ✅ Bot kanalga admin qilib qo'shilganligini tekshiring
- ✅ Channel ID to'g'ri yozilganligini tekshiring
- ✅ Public kanal bo'lsa @ belgisini qo'yganligingizni tekshiring

### "Bot was blocked by the user":
- ✅ Bot'ni unblock qiling
- ✅ Bot'ga /start yuboring

### "Forbidden: bot is not a member of the channel":
- ✅ Bot kanalga qo'shilganligini tekshiring
- ✅ Bot admin huquqlariga ega ekanligini tekshiring

### Token xatosi:
- ✅ Token to'g'riligini tekshiring (probel va yangi qator bo'lmasligi kerak)
- ✅ BotFather'dan yangi token oling (/token buyrug'i)

---

## 📝 Eslatmalar

- Bot TOKEN'ini hech qachon oshkor qilmang
- `.env` fayli `.gitignore` da bo'lishi kerak
- Production'da environment variables ishlatish tavsiya etiladi
- Bot admin huquqlari bo'lmasa post yuborib bo'lmaydi
- Kanal ochiq (public) bo'lishi shart emas, lekin osonroq

---

## 🎯 Keyingi Qadam

Telegram sozlangandan so'ng avtomatik ravishda:
- ✅ Har kuni soat 10:00 da 15 ta blog post yaratiladi va Telegram'ga yuboriladi
- ✅ Har 3 soatda marketing post yuboriladi
- ✅ Kontakt formadan xabarlar bot orqali yuboriladi

**Omad!** 🚀
