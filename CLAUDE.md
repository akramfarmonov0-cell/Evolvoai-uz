# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EvolvoAI is a full-stack AI-powered IT solutions platform that automatically generates blog content using Google's Gemini AI and publishes to both a Next.js website and Telegram channel. The platform provides IT services including website development, Telegram bots, chatbots, and automation solutions.

**Tech Stack:**
- Backend: Node.js + Express, MongoDB, Gemini AI API, Telegram Bot API (Telegraf)
- Frontend: Next.js 14, React 18, Tailwind CSS, Framer Motion

## Development Commands

### Backend (Port 5000)
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Development mode with nodemon
npm start               # Production mode
npm test                # Run content generator test
```

### Frontend (Port 3000)
```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Development server
npm run build           # Production build
npm start               # Production server
npm run lint            # Run ESLint
```

### Testing Utilities
```bash
# Backend tests
node backend/check-telegram.js              # Verify Telegram bot connection
node backend/create-ai-post.js              # Generate a single AI post
node backend/generate-multiple-posts.js     # Generate multiple posts
node backend/get-my-chat-id.js             # Get your Telegram chat ID
node backend/manual-rss-fetch.js           # Test RSS feed fetching
node backend/publish-to-telegram.js        # Test Telegram publishing

# Test scripts
node create-test-post.js                   # Create test post
node test-contact-form.js                  # Test contact form
```

### Windows Batch Scripts
```bash
START_ALL.bat           # Start both backend and frontend
STOP_ALL.bat            # Stop all running servers
TEST_ALL.bat            # Run all tests
DEV_START.bat           # Start in development mode
```

### Docker
```bash
docker-compose up       # Start all services with Docker
docker-compose down     # Stop all services
```

## Architecture

### Backend Structure (`backend/src/`)

**Core Server (`server.js`)**
- Main Express application entry point
- Configures middleware (helmet, cors, express.json)
- Connects to MongoDB
- Mounts API routes
- Defines 3 cron jobs for automation:
  - Hourly (7:00-19:00): Generate 1 news post
  - Every 6 hours: Send marketing post to Telegram
  - Every 3 hours: Fetch and process RSS feeds

**Services (`services/`)**
- `contentGenerator.js` - AI content generation using Gemini 1.5 Flash
  - Generates posts in 15+ categories (web development, mobile apps, AI, cybersecurity, etc.)
  - Creates SEO-optimized slugs, tags, and meta descriptions
  - Publishes to MongoDB and Telegram channel
- `telegramService.js` - Telegram bot integration (Telegraf)
  - Handles bot commands (/start, /help, /contact, /blog, /services)
  - Sends posts to channel with proper formatting
  - Manages marketing posts
- `rssService.js` - RSS feed aggregation
  - Fetches from multiple tech news sources
  - Processes and stores articles in database
- `ttsService.js` - Text-to-speech functionality

**Routes (`routes/`)**
- `posts.js` - Blog posts CRUD (GET /api/posts, GET /api/posts/:slug)
- `admin.js` - Admin statistics and management
- `chatbot.js` - Chatbot interactions
- `contact.js` - Contact form submissions (sends to Telegram)
- `services.js` - IT services catalog
- `portfolio.js` - Portfolio items
- `auth.js` - Authentication (JWT)
- `rss.js` - RSS feed endpoints

**Models (`models/`)**
- `Post.js` - Blog post schema (title, content, slug, category, tags, publishedAt)
- `User.js` - User authentication schema
- `Contact.js` - Contact form submissions
- `Portfolio.js` - Portfolio items

### Frontend Structure (`frontend/src/`)

**App Router (`app/`)**
- `page.js` - Homepage with hero, services showcase, latest posts
- `layout.js` - Root layout with navigation and footer
- `blog/` - Blog listing and individual post pages
- `services/` - IT services pages
- `contact/` - Contact form
- `about/` - About page
- `admin/` - Admin dashboard
- `news/` - News section
- `portfolio/` - Portfolio showcase
- `login/` - Authentication page
- `robots.js` - Dynamic robots.txt
- `sitemap.js` - Dynamic sitemap

**Components (`components/`)**
- Reusable React components for UI elements
- Navigation, footer, cards, forms, etc.

**Contexts (`contexts/`)**
- React Context API for state management

**Lib (`lib/`)**
- Utility functions and helpers

## Environment Configuration

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/evolvoai
GEMINI_API_KEY=your_gemini_api_key        # Get from https://makersuite.google.com/app/apikey
TELEGRAM_BOT_TOKEN=your_bot_token         # Get from @BotFather
TELEGRAM_CHANNEL_ID=@your_channel
ADMIN_CHAT_ID=your_telegram_user_id       # Get from @userinfobot
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/your_channel
```

## Automation & Cron Jobs

The backend runs three scheduled tasks (see `backend/src/server.js`):

1. **Hourly News Generation (7am-7pm)** - `0 7-19 * * *`
   - Generates 1 news post using Gemini AI
   - Publishes to database and Telegram channel

2. **Marketing Posts (Every 6 hours)** - `30 */6 * * *`
   - Sends promotional content to Telegram channel
   - Runs 4 times daily

3. **RSS Feed Aggregation (Every 3 hours)** - `0 */3 * * *`
   - Fetches tech news from RSS sources
   - Processes and stores articles
   - Runs 8 times daily

To modify schedules, edit the cron expressions in `server.js`.

## Content Generation

Content is generated by `contentGenerator.js` using Google's Gemini 1.5 Flash model. The system:
- Generates posts in Uzbek language
- Covers 15+ IT categories (defined in CATEGORIES array)
- Creates SEO-optimized content with:
  - URL-friendly slugs
  - Relevant tags
  - Meta descriptions
  - Category assignments
- Automatically publishes to MongoDB and Telegram

## API Key Setup

**Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Create API key
3. Add to `GEMINI_API_KEY` in `.env`

**Telegram Bot:**
1. Message @BotFather on Telegram
2. Use `/newbot` command
3. Copy token to `TELEGRAM_BOT_TOKEN` in `.env`

**Telegram Channel:**
1. Create a public channel
2. Add bot as admin
3. Set channel username in `TELEGRAM_CHANNEL_ID` (e.g., @evolvoai)

**Admin Chat ID:**
1. Message @userinfobot on Telegram
2. Copy your chat ID to `ADMIN_CHAT_ID` in `.env`

## MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
mongod  # Or use OS service manager
```

**Option 2: MongoDB Atlas (Recommended for production)**
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: 0.0.0.0/0 (all IPs)
4. Copy connection string to `MONGODB_URI`

## Deployment

The project includes multiple deployment configurations:

- **Docker**: `docker-compose.yml`, `Dockerfile.backend`, `Dockerfile.frontend`
- **Vercel** (Frontend): `vercel.json`
- **Render** (Backend): `render.yaml`
- **Nginx**: `nginx/` configuration files

See deployment guides:
- `DEPLOYMENT.md` - General deployment instructions
- `VERCEL_RENDER_GUIDE.md` - Vercel + Render setup
- `DEPLOY_QUICK_START.txt` - Quick deployment steps
- `deploy.sh` - Deployment script

## Important Notes

- Backend must be running for Telegram bot to function
- Gemini API has rate limits (15 requests/min on free tier)
- Content is generated in Uzbek language
- All timestamps use local timezone
- CORS is configured for localhost:3000 and Vercel deployments
- Static files served from `backend/public/`
- Contact form submissions are sent directly to admin via Telegram
