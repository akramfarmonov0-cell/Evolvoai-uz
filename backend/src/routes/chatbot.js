const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { textToSpeech, deleteAudioFile } = require('../services/ttsService');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Oxirgi javoblarni saqlash (TTS uchun)
const lastChatResponses = new Map();

// Fallback javoblar (agar AI ishlamasa)
const fallbackResponses = {
  'salom': 'Assalomu alaykum! 👋 Men EvolvoAI virtual yordamchisiman. Sizga qanday yordam bera olaman?\n\n• Web sayt yaratish\n• Telegram bot\n• AI chatbot\n• Boshqa xizmatlar',
  'web sayt': 'Web sayt yaratish xizmati:\n\n💰 Narx: 500$ dan 2000$+ gacha\n⏱ Muddat: 2-4 hafta\n\nQo\'shimcha ma\'lumot: https://evolvoai.uz/services\n📞 Bog\'lanish: +998 97 477 12 29',
  'telegram bot': 'Telegram bot yaratish:\n\n💰 Narx: 200$ dan boshlanadi\n⏱ Muddat: 1-2 hafta\n\nBatafsil: https://evolvoai.uz/services',
  'narx': 'Xizmatlar narxlari:\n\n🌐 Web sayt: 500$ - 2000$+\n🤖 Telegram bot: 200$+\n💬 AI chatbot: 300$+\n📱 Mobile app: 1000$+\n\nAniq narx loyihaga bog\'liq.',
  'bog\'lanish': '📞 Biz bilan bog\'laning:\n\n🌐 Website: https://evolvoai.uz\n📧 Email: info@evolvoai.uz\n📱 Telegram: @evolvoai_news\n☎️ Tel: +998 97 477 12 29\n📍 Manzil: Toshkent shahri, Nurafshon yo\'li 12'
};

function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  return 'Kechirasiz, savlingizni tushunmadim. Iltimos quyidagilardan birini so\'rang:\n\n• Web sayt haqida\n• Telegram bot\n• Narxlar\n• Bog\'lanish\n\nYoki bizga murojaat qiling: +998 90 123 45 67';
}

// Chatbot API
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Xabar bo\'sh bo\'lmasligi kerak' });
    }

    // Agar GEMINI_API_KEY yo'q bo'lsa, fallback ishlatish
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️ GEMINI_API_KEY topilmadi - Fallback javoblar ishlatilmoqda');
      return res.json({
        response: getFallbackResponse(message),
        success: true,
        fallback: true
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const context = `
Sen EvolvoAI kompaniyasining virtual yordamchisi va mijozlar xizmati chatbotisan. 

Kompaniya haqida ma'lumot:
- Nomi: EvolvoAI
- Website: https://evolvoai.uz
- Telegram: @evolvoai_news
- Email: info@evolvoai.uz
- Telefon: +998 97 477 12 29
- Manzil: Toshkent shahri, Nurafshon yo'li 12

Xizmatlar:
1. Web Development - Zamonaviy, tez va SEO-optimallashtirilgan web saytlar yaratish
2. Telegram Botlar - Avtomatik telegram botlar va integratsiyalar
3. AI Chatbotlar - Sun'iy intellekt asosidagi mijozlar xizmati chatbotlari
4. Avtomatlashtirish - Biznes jarayonlarini avtomatlashtirish
5. AI Integratsiya - OpenAI, Gemini va boshqa AI yechimlar
6. Mobile Apps - iOS va Android ilovalar yaratish
7. E-commerce - Onlayn do'konlar va to'lov tizimlari
8. CRM Sistemalar - Mijozlar bilan ishlash tizimlari

Narxlar:
- Web sayt: 500$ dan boshlanadi (oddiy), 2000$+ gacha (murakkab)
- Telegram bot: 200$ dan boshlanadi
- AI chatbot: 300$ dan boshlanadi
- Mobile app: 1000$ dan boshlanadi
- CRM sistema: 1500$ dan boshlanadi

Ish jarayoni:
1. Bepul konsultatsiya
2. Talablarni aniqlash
3. Taklif tayyorlash
4. Shartnoma imzolash
5. Ishlab chiqish (2-8 hafta)
6. Sinovdan o'tkazish
7. Deploy va yordam

Javob berish qoidalari:
- Do'stona va professional
- Qisqa va aniq (max 300 belgi)
- Agar narx so'rashsa, yuqoridagi narxlarni ayt
- Agar batafsil konsultatsiya kerak bo'lsa, /contact sahifasiga yo'naltir
- O'zbek tilida javob ber
- Emoji ishlatish mumkin lekin ortiqcha emas

Agar foydalanuvchi:
- "Salom" desa: Xush kelibsiz deb kutib ol
- Xizmat so'rasa: Batafsil tushuntir
- Narx so'rasa: Yuqoridagi narxlarni ber
- Bog'lanish so'rasa: Kontakt ma'lumotlarini ber
`;

    let conversationHistory = '';
    if (history && Array.isArray(history) && history.length > 0) {
      conversationHistory = history.slice(-5).map(msg => 
        `${msg.role === 'user' ? 'Foydalanuvchi' : 'Sen'}: ${msg.content}`
      ).join('\n');
    }

    const prompt = `${context}\n\n${conversationHistory ? 'Oldingi suhbat:\n' + conversationHistory + '\n\n' : ''}Foydalanuvchi: ${message}\n\nJavob:`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Javobni saqlash (TTS uchun) - session ID orqali
    const sessionId = req.headers['x-session-id'] || req.ip;
    lastChatResponses.set(sessionId, {
      text: response.trim(),
      timestamp: Date.now()
    });

    // Eski javoblarni tozalash (15 daqiqadan eski)
    cleanupOldResponses();

    res.json({ 
      response: response.trim(),
      success: true,
      sessionId: sessionId,
      hasTTS: true // TTS mavjudligini ko'rsatish
    });

  } catch (error) {
    console.error('Chatbot xatosi:', error.message);
    console.error('Full error:', error);
    
    // Agar AI xato bersa, fallback javob ishlatish
    return res.json({
      response: getFallbackResponse(req.body.message),
      success: true,
      fallback: true
    });
  }
});

// TTS - Javobni ovozga aylantirish
router.post('/tts', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.ip;
    const savedResponse = lastChatResponses.get(sessionId);

    if (!savedResponse) {
      return res.status(404).json({
        error: 'Javob topilmadi',
        message: 'Iltimos, avval chatbot bilan suhbatlashing'
      });
    }

    // Audio yaratish
    const audioPath = await textToSpeech(savedResponse.text, 'ru-RU');

    if (!audioPath || !fs.existsSync(audioPath)) {
      return res.status(500).json({
        error: 'Audio yaratib bo\'lmadi',
        message: 'TTS xizmati hozircha ishlamayapti'
      });
    }

    // Audio faylni yuborish
    res.setHeader('Content-Type', 'audio/ogg');
    res.setHeader('Content-Disposition', 'inline; filename="response.ogg"');
    
    const audioStream = fs.createReadStream(audioPath);
    audioStream.pipe(res);

    // Audio yuborilgandan keyin o'chirish
    audioStream.on('end', () => {
      setTimeout(() => {
        deleteAudioFile(audioPath);
      }, 5000);
    });

  } catch (error) {
    console.error('TTS endpoint xatosi:', error);
    res.status(500).json({
      error: 'Audio yaratishda xatolik',
      message: error.message
    });
  }
});

// Eski javoblarni tozalash funksiyasi
function cleanupOldResponses() {
  const now = Date.now();
  const fifteenMinutes = 15 * 60 * 1000;

  for (const [sessionId, data] of lastChatResponses.entries()) {
    if (now - data.timestamp > fifteenMinutes) {
      lastChatResponses.delete(sessionId);
    }
  }
}

// Har 5 daqiqada tozalash
setInterval(cleanupOldResponses, 5 * 60 * 1000);

module.exports = router;
