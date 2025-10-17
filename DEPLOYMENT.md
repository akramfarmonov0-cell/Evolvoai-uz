# 🚀 EvolvoAI Production Deployment Guide

**Complete deployment guide for EvolvoAI platform** - EvolvoAI Platform

Bu qo'llanma loyihani production muhitga deploy qilish bo'yicha batafsil ko'rsatmalar beradi.

## 🌐 Frontend Deploy (Vercel - Tavsiya etiladi)

### Vercel orqali deploy

1. **GitHub'ga push qiling**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercel.com'da**
   - https://vercel.com sahifasiga o'ting
   - "Import Project" tugmasini bosing
   - GitHub repository'ni tanlang
   - Root Directory: `frontend` ni belgilang
   - Framework Preset: `Next.js` avtomatik tanlanadi

3. **Environment Variables qo'shing**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_SITE_URL=https://evolvoai.uz
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/evolvoai
```

4. **Deploy qiling** - Vercel avtomatik build va deploy qiladi

### Custom Domain qo'shish
1. Vercel Dashboard → Settings → Domains
2. Domain nomini kiriting: `evolvoai.uz`
3. DNS sozlamalarini yangilang (Vercel ko'rsatmalarini kuzating)

---

## 🖥️ Backend Deploy

### Variant 1: Railway (Oson va Tez)

1. **Railway.app'da**
   - https://railway.app sahifasiga o'ting
   - "New Project" → "Deploy from GitHub repo"
   - Repository va `backend` papkasini tanlang

2. **Environment Variables**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/evolvoai
GEMINI_API_KEY=your_gemini_api_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@evolvoai
ADMIN_CHAT_ID=your_chat_id
JWT_SECRET=your_production_secret
FRONTEND_URL=https://evolvoai.uz
```

3. **Deploy Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

4. **Custom Domain** - Railway'dan domain oling yoki o'zingiznikini qo'shing

### Variant 2: DigitalOcean (Kuchli va Moslashuvchan)

1. **Droplet yaratish**
```bash
# Ubuntu 22.04 LTS server yarating
# SSH orqali ulanish
ssh root@your_server_ip
```

2. **Node.js o'rnatish**
```bash
# NodeSource repository qo'shish
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Node.js o'rnatish
sudo apt-get install -y nodejs

# PM2 o'rnatish (process manager)
sudo npm install -g pm2
```

3. **MongoDB o'rnatish (ixtiyoriy)**
```bash
# MongoDB import key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Repository qo'shish
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# O'rnatish
sudo apt-get update
sudo apt-get install -y mongodb-org

# Ishga tushirish
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Loyihani deploy qilish**
```bash
# Git o'rnatish
sudo apt-get install git

# Loyihani clone qilish
git clone <your-repo-url>
cd evolvoai-project/backend

# Dependencies o'rnatish
npm install

# .env faylini yaratish
nano .env
# Environment variables'ni kiriting va saqlang (Ctrl+X, Y, Enter)

# PM2 bilan ishga tushirish
pm2 start src/server.js --name evolvoai-backend

# PM2'ni system startup'ga qo'shish
pm2 startup
pm2 save
```

5. **Nginx sozlash (Reverse Proxy)**
```bash
# Nginx o'rnatish
sudo apt-get install nginx

# Nginx config yaratish
sudo nano /etc/nginx/sites-available/evolvoai

# Quyidagini kiriting:
server {
    listen 80;
    server_name api.evolvoai.uz;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Config'ni enable qilish
sudo ln -s /etc/nginx/sites-available/evolvoai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **SSL sertifikat (HTTPS)**
```bash
# Certbot o'rnatish
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikat olish
sudo certbot --nginx -d api.evolvoai.uz

# Avtomatik yangilanish
sudo certbot renew --dry-run
```

### Variant 3: Heroku

1. **Heroku CLI o'rnatish**
```bash
# MacOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Deploy qilish**
```bash
cd backend

# Login
heroku login

# App yaratish
heroku create evolvoai-backend

# MongoDB qo'shish
heroku addons:create mongolab:sandbox

# Environment variables
heroku config:set GEMINI_API_KEY=your_key
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHANNEL_ID=@evolvoai
heroku config:set ADMIN_CHAT_ID=your_id
heroku config:set FRONTEND_URL=https://evolvoai.uz

# Deploy
git push heroku main

# Logs ko'rish
heroku logs --tail
```

---

## 💾 MongoDB Atlas Setup (Tavsiya etiladi)

1. **Account yaratish**
   - https://www.mongodb.com/cloud/atlas/register

2. **Cluster yaratish**
   - Free tier (M0) ni tanlang
   - Region: Closest to users (Germany yoki Amsterdam)
   - Cluster name: `evolvoai-cluster`

3. **Database User yaratish**
   - Database Access → Add New Database User
   - Username: `evolvoai_user`
   - Password: Strong password (saqlang!)

4. **Network Access**
   - Network Access → Add IP Address
   - Allow Access from Anywhere: `0.0.0.0/0` (production uchun specific IP tavsiya etiladi)

5. **Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Add database name: `/evolvoai`

---

## 🔐 Environment Variables Xavfsizligi

### Production uchun
- Hech qachon `.env` fayllarini git'ga commit qilmang
- Har bir muhit uchun turli secret key'lar ishlating
- API key'larni muntazam yangilang
- Access log'larini monitoring qiling

### Backup Strategy
```bash
# MongoDB backup (har kuni)
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# Automated backup script
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

---

## 📊 Monitoring va Logging

### PM2 Monitoring
```bash
# Status ko'rish
pm2 status

# Logs ko'rish
pm2 logs evolvoai-backend

# Resource usage
pm2 monit

# Auto-restart on crash
pm2 resurrect
```

### Error Tracking
- **Sentry.io** - Frontend va backend error tracking
- **LogRocket** - Session replay va debugging
- **Google Analytics** - Traffic monitoring

---

## 🚀 Performance Optimization

### Backend
- Redis cache qo'shing (for API responses)
- Database indexing (MongoDB)
- Image optimization (sharp, cloudinary)
- Rate limiting (express-rate-limit)

### Frontend
- Image optimization (Next.js Image)
- Code splitting (automatic in Next.js)
- CDN (Vercel automatic)
- Lazy loading components

---

## 📱 Telegram Bot Production Settings

1. **Webhook o'rnatish (Polling o'rniga)**
```javascript
// backend/src/services/telegramService.js
if (process.env.NODE_ENV === 'production') {
  const WEBHOOK_URL = `${process.env.BACKEND_URL}/telegram-webhook`;
  bot.telegram.setWebhook(WEBHOOK_URL);
  
  // Express route
  app.use(bot.webhookCallback('/telegram-webhook'));
} else {
  bot.launch(); // Development: polling
}
```

2. **Bot sozlamalari**
   - @BotFather → /mybots
   - Bot'ingizni tanlang
   - Edit Bot → Edit Description/About
   - Commands sozlash: /setcommands

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas configured
- [ ] All environment variables set
- [ ] Gemini API key working
- [ ] Telegram bot token working
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] CORS settings correct
- [ ] Cron jobs working
- [ ] Error logging configured
- [ ] Backup strategy implemented
- [ ] Performance monitoring setup
- [ ] Security headers configured

---

## 🆘 Troubleshooting

### Build xatolari
```bash
# Dependencies qayta o'rnatish
rm -rf node_modules package-lock.json
npm install

# Cache tozalash
npm cache clean --force
```

### Database ulanish xatolari
- MongoDB Atlas IP whitelist tekshiring
- Connection string to'g'riligini tekshiring
- Network firewall sozlamalarini tekshiring

### Bot ishlamayapti
- Webhook/polling to'g'ri sozlanganligini tekshiring
- Bot admin huquqlariga ega ekanligini tekshiring
- Telegram API limit'ga yetmaganligingizni tekshiring

---

## 📞 Yordam

Muammolar bo'lsa:
- Documentation: https://docs.evolvoai.uz
- Support: support@evolvoai.uz
- Telegram: @evolvoai_support