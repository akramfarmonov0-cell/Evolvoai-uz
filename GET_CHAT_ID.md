# 📱 Telegram Chat ID Olish

## Usul 1: @userinfobot (Eng Oson)

1. Telegram'da **@userinfobot** ni qidiring
2. Botga **/start** yuboring
3. Bot sizga ma'lumot yuboradi:
```
Id: 123456789
First name: Your Name
Username: @your_username
```
4. **Id** raqamini nusxalang (masalan: `123456789`)

---

## Usul 2: @RawDataBot

1. Telegram'da **@RawDataBot** ni qidiring
2. Botga biror xabar yuboring
3. Bot JSON formatda ma'lumot qaytaradi
4. `"id":` qismidagi raqamni oling

---

## Usul 3: Browser orqali

1. **https://web.telegram.org** ga kiring
2. O'zingizga "Saved Messages" ga xabar yuboring
3. Browser'da F12 bosing (Developer Tools)
4. Network tabida `?hash=` li requestni toping
5. Response'da `user_id` ni qidiring

---

## 📝 Chat ID ni Backend'ga qo'shish:

### Render.com'da:

1. **Render Dashboard** → **evolvoai-backend** service
2. **Environment** tabiga o'ting
3. **Add Environment Variable** tugmasini bosing
4. **Key:** `ADMIN_CHAT_ID`
5. **Value:** `123456789` (sizning Chat ID)
6. **Save Changes** tugmasini bosing
7. Service avtomatik restart bo'ladi

---

## Local Testing:

Backend `.env` faylingizda:
```env
ADMIN_CHAT_ID=123456789
```

---

## ✅ Test qilish:

Chat ID qo'shgandan keyin:
- Contact forma orqali xabar yuboring
- Telegram'da xabar qabul qilasiz!
