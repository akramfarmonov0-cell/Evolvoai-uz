# 🔐 Admin Panel Qo'llanma

EvolvoAI admin paneli orqali blog postlarini boshqarish bo'yicha to'liq yo'riqnoma.

## 📋 Mundarija

1. [Boshlash](#boshlash)
2. [Kirish](#kirish)
3. [Postlarni Boshqarish](#postlarni-boshqarish)
4. [API Endpoints](#api-endpoints)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Boshlash

### 1. Backend Konfiguratsiya

Backend `.env` faylini yarating va quyidagi qiymatlarni to'ldiring:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/evolvoai

# Admin Credentials
ADMIN_EMAIL=admin@evolvoai.com
ADMIN_PASSWORD=admin123

# JWT Secret (minimum 32 ta belgi)
JWT_SECRET=your_very_secure_random_secret_key_at_least_32_chars
JWT_EXPIRE=30d

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Muhim:** 
- `JWT_SECRET` ni xavfsiz tasodifiy string bilan almashtiring
- Production muhitida `ADMIN_PASSWORD` ni kuchli parol qiling

### 2. Frontend Konfiguratsiya

Frontend `.env.local` faylini yarating:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Serverlarni Ishga Tushirish

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Kirish

### Admin Panelga Kirish

1. Brauzerda oching: `http://localhost:3000/admin/login`
2. Backend `.env` faylidagi credentials kiriting:
   - **Email:** `ADMIN_EMAIL` qiymati
   - **Password:** `ADMIN_PASSWORD` qiymati
3. "Kirish" tugmasini bosing

Muvaffaqiyatli kirganingizdan keyin admin dashboard'ga yo'naltirilasiz.

---

## 📝 Postlarni Boshqarish

### Dashboard

Admin dashboard: `http://localhost:3000/admin`

Bu yerda:
- ✅ "Postlar" paneli - blog postlarini boshqarish

### Barcha Postlarni Ko'rish

URL: `http://localhost:3000/admin/posts`

Bu sahifada:
- ✅ Barcha postlar ro'yxati
- ✅ Post ma'lumotlari (sarlavha, kategoriya, ko'rishlar, likes, sana)
- ✅ Tahrirlash va o'chirish tugmalari
- ✅ "Yangi Post" tugmasi

### Yangi Post Yaratish

1. Admin posts sahifasida "Yangi Post" tugmasini bosing
2. Formani to'ldiring:
   - **Sarlavha*** (majburiy)
   - **Slug*** (URL uchun, avtomatik generatsiya)
   - **Kategoriya*** (AI Integratsiya, Telegram Botlar, Web Dasturlash)
   - **Qisqacha mazmun** (excerpt)
   - **Kontent*** (markdown formatida)
   - **Teglar** (vergul bilan ajrating)
   - **Rasm URL**
3. "Saqlash" tugmasini bosing

### Postni Tahrirlash

1. Posts ro'yxatidan tahrirlash ikonasini bosing (qalam belgisi)
2. Kerakli o'zgarishlarni kiriting
3. "Saqlash" tugmasini bosing

### Postni O'chirish

1. Posts ro'yxatidan o'chirish ikonasini bosing (chiqit qutisi belgisi)
2. Tasdiqlash oynasida "OK" bosing

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@evolvoai.com",
  "password": "admin123"
}

Response:
{
  "token": "jwt_token_here",
  "admin": {
    "email": "admin@evolvoai.com",
    "role": "admin"
  }
}
```

### Admin Posts Management

Barcha admin endpoint'lar JWT token talab qiladi:
```
Authorization: Bearer <token>
```

#### Barcha Postlar

```http
GET /api/admin/posts
Authorization: Bearer <token>
```

#### Yangi Post Yaratish

```http
POST /api/admin/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post sarlavhasi",
  "slug": "post-slug",
  "category": "ai-integration",
  "content": "Post matni",
  "excerpt": "Qisqacha mazmun",
  "tags": ["AI", "Tech"],
  "image": "https://example.com/image.jpg"
}
```

#### Postni Yangilash

```http
PUT /api/admin/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Yangilangan sarlavha",
  ...
}
```

#### Postni O'chirish

```http
DELETE /api/admin/posts/:id
Authorization: Bearer <token>
```

---

## 🔧 Troubleshooting

### 1. Login qilish xatosi: "Noto'g'ri email yoki parol"

**Yechim:**
- Backend `.env` faylida `ADMIN_EMAIL` va `ADMIN_PASSWORD` to'g'ri ekanligini tekshiring
- Backend server'ni qayta ishga tushiring

### 2. 401 Unauthorized xatosi

**Yechim:**
- Token muddati tugagan bo'lishi mumkin, qayta login qiling
- `.env` faylida `JWT_SECRET` mavjud ekanligini tekshiring
- Backend server'ni qayta ishga tushiring

### 3. API so'rovlari ishlamayapti

**Yechim:**
- Backend server ishlab turganini tekshiring: `http://localhost:5000/api/health`
- Frontend `.env.local` faylida `NEXT_PUBLIC_API_URL` to'g'ri ekanligini tekshiring
- Brauzer console'da xatolarni ko'ring (F12)

### 4. Frontend 404 xatosi

**Yechim:**
- Frontend server'ni qayta ishga tushiring
- To'g'ri URL'dan foydalanayotganingizni tekshiring

### 5. CORS xatosi

**Yechim:**
- Backend `.env` faylida `FRONTEND_URL` to'g'ri ekanligini tekshiring
- Backend server'ni qayta ishga tushiring

---

## 🎯 Xususiyatlar

### ✅ Tayyor

- [x] Admin autentifikatsiyasi (JWT)
- [x] Postlar ro'yxati
- [x] Post yaratish
- [x] Post tahrirlash
- [x] Post o'chirish
- [x] Kategoriya tanlash
- [x] Teglar qo'shish
- [x] Auto slug generatsiya

### 🚧 Kelajakda

- [ ] Rasm yuklash (file upload)
- [ ] Markdown preview
- [ ] Post draft saqlas
- [ ] Postlarni qidirish va filterlash
- [ ] Bulk operations
- [ ] Analytics dashboard

---

## 📞 Yordam

Agar qo'shimcha yordam kerak bo'lsa:
- Backend loglarini tekshiring
- Brauzer console'ni tekshiring (F12)
- Network tab'da API so'rovlarini kuzating

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-11
