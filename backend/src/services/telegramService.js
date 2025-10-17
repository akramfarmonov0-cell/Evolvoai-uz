const { Telegraf, Markup } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { textToSpeech, deleteAudioFile } = require('./ttsService');
const fs = require('fs');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Foydalanuvchilar uchun chat history
const userConversations = new Map();

// TTS uchun oxirgi javoblarni saqlash
const lastResponses = new Map();

// Asosiy menyu tugmalari
const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💼 Xizmatlar', 'services')],
  [Markup.button.callback('💬 AI Chat', 'ai_chat'), Markup.button.callback('📁 Portfolio', 'portfolio')],
  [Markup.button.callback('📞 Bog\'lanish', 'contact'), Markup.button.callback('ℹ️ Biz haqimizda', 'about')],
  [Markup.button.url('🌐 Website', 'https://evolvoai.uz')]
]);

// Bot komandalarini sozlash
bot.start((ctx) => {
  const userName = ctx.from.first_name;
  ctx.reply(
    `👋 Assalomu alaykum, ${userName}!\n\n` +
    `🤖 *EvolvoAI Bot'ga xush kelibsiz!*\n\n` +
    `Men sizning virtual yordamchingizman. Quyidagilarni amalga oshirishim mumkin:\n\n` +
    `💼 Xizmatlar haqida ma'lumot berish\n` +
    `💬 Savollarga AI orqali javob berish\n` +
    `📁 Loyihalarimizni ko'rsatish\n` +
    `📞 Bog'lanish ma'lumotlarini berish\n\n` +
    `_Kerakli bo'limni tanlang yoki menga savolingizni yozing!_`,
    { 
      parse_mode: 'Markdown',
      ...mainMenu
    }
  );
});

bot.command('contact', (ctx) => {
  ctx.reply(
    `📞 *Biz bilan bog'laning:*\n\n` +
    `🌐 Website: https://evolvoai.uz\n` +
    `📧 Email: info@evolvoai.uz\n` +
    `📱 Telegram: @evolvoai_news\n` +
    `☎️ Tel: +998 97 477 12 29\n` +
    `📍 Manzil: Toshkent shahri, Nurafshon yo'li 12`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('services', (ctx) => {
  ctx.reply(
    `🎯 *Bizning xizmatlarimiz:*\n\n` +
    `1️⃣ Web Development - Zamonaviy web saytlar\n` +
    `2️⃣ Telegram Botlar - Avtomatik botlar\n` +
    `3️⃣ Chatbotlar - AI asosida suhbat botlar\n` +
    `4️⃣ Avtomatlashtirish - Biznes jarayonlari\n` +
    `5️⃣ AI Integration - Sun'iy intellekt yechimlar\n\n` +
    `Batafsil: https://evolvoai.uz/services`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('chatid', (ctx) => {
  const chatId = ctx.chat.id;
  const userName = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;
  
  ctx.reply(
    `📋 *Sizning Chat ID:*\n\n` +
    `\`${chatId}\`\n\n` +
    `User: ${userName}\n\n` +
    `ℹ️ Bu ID ni backend .env fayliga ADMIN_CHAT_ID sifatida qo'shing`,
    { parse_mode: 'Markdown' }
  );
  
  console.log(`ℹ️ Chat ID so'ralgan: ${chatId} (${userName})`);
});

bot.command('menu', (ctx) => {
  ctx.reply(
    `📋 *Asosiy Menyu*\n\n` +
    `Kerakli bo'limni tanlang:`,
    { 
      parse_mode: 'Markdown',
      ...mainMenu
    }
  );
});

// Inline tugmalar uchun callback'lar
bot.action('services', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `💼 *Bizning Xizmatlarimiz:*\n\n` +
    `🌐 *Web Development*\n` +
    `Zamonaviy, tez va SEO-optimallashtirilgan web saytlar\n\n` +
    `🤖 *Telegram Botlar*\n` +
    `Avtomatik telegram botlar va integratsiyalar\n\n` +
    `💬 *AI Chatbotlar*\n` +
    `Sun'iy intellekt asosidagi suhbat botlar\n\n` +
    `⚙️ *Avtomatlashtirish*\n` +
    `Biznes jarayonlarini avtomatlashtirish\n\n` +
    `🤖 *AI Integratsiya*\n` +
    `OpenAI, Gemini va boshqa AI yechimlar\n\n` +
    `📱 *Mobile Apps*\n` +
    `iOS va Android ilovalar\n\n` +
    `🛒 *E-commerce*\n` +
    `Onlayn do'konlar va to'lov tizimlari\n\n` +
    `Batafsil: https://evolvoai.uz/services`,
    { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('« Orqaga', 'back_to_menu')]
      ])
    }
  );
});

bot.action('portfolio', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `📁 *Portfolio*\n\n` +
    `Biz muvaffaqiyatli bajarilgan 50+ loyihalarimiz bilan faxrlanamiz:\n\n` +
    `✅ E-commerce platformalar\n` +
    `✅ Telegram botlar\n` +
    `✅ AI chatbotlar\n` +
    `✅ CRM tizimlar\n` +
    `✅ Mobil ilovalar\n` +
    `✅ Korporativ web saytlar\n\n` +
    `Loyihalarimizni ko'rish: https://evolvoai.uz/portfolio`,
    { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('🌐 Portfolioni Ko\'rish', 'https://evolvoai.uz/portfolio')],
        [Markup.button.callback('« Orqaga', 'back_to_menu')]
      ])
    }
  );
});

bot.action('contact', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `📞 *Biz bilan bog'laning:*\n\n` +
    `🌐 Website: https://evolvoai.uz\n` +
    `📧 Email: info@evolvoai.uz\n` +
    `📱 Telegram: @evolvoai_news\n` +
    `☎️ Tel: +998 97 477 12 29\n\n` +
    `📍 Manzil: Toshkent shahri, Nurafshon yo'li 12\n\n` +
    `🕐 Ish vaqti: Dush-Juma 9:00-18:00\n\n` +
    `Yoki savolingizni shu yerda yozing, biz tez orada javob beramiz!`,
    { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('💬 Murojaat Qilish', 'https://evolvoai.uz/contact')],
        [Markup.button.callback('« Orqaga', 'back_to_menu')]
      ])
    }
  );
});

bot.action('about', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `ℹ️ *EvolvoAI haqida*\n\n` +
    `Biz zamonaviy IT yechimlar yaratuvchi jamoamiz. 2023-yildan beri O'zbekiston va xalqaro bozorda faoliyat yuritamiz.\n\n` +
    `👥 *Jamoa:* 10+ tajribali mutaxassislar\n` +
    `🚀 *Loyihalar:* 50+ muvaffaqiyatli loyiha\n` +
    `😊 *Mijozlar:* 30+ qoniqarli mijoz\n` +
    `⭐ *Reyting:* 4.9/5.0\n\n` +
    `*Bizning Missiyamiz:*\n` +
    `Bizneslarni raqamli dunyoga olib chiqish va AI texnologiyalari orqali samaradorlikni oshirish.\n\n` +
    `Batafsil: https://evolvoai.uz/about`,
    { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('« Orqaga', 'back_to_menu')]
      ])
    }
  );
});

bot.action('ai_chat', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  
  // Chat rejimini yoqish
  userConversations.set(userId, { mode: 'ai_chat', history: [] });
  
  await ctx.editMessageText(
    `💬 *AI Chat Rejimi Yoqildi*\n\n` +
    `Endi menga har qanday savol berishingiz mumkin. Men AI yordamida javob beraman.\n\n` +
    `_Misol savollar:_\n` +
    `• Web sayt qilish qancha turadi?\n` +
    `• Telegram bot qanday ishlaydi?\n` +
    `• AI chatbot nimaga kerak?\n\n` +
    `Savolingizni yozing 👇`,
    { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('❌ Chat To\'xtatish', 'stop_chat')],
        [Markup.button.callback('« Menyu', 'back_to_menu')]
      ])
    }
  );
});

bot.action('stop_chat', async (ctx) => {
  await ctx.answerCbQuery('Chat to\'xtatildi');
  const userId = ctx.from.id;
  userConversations.delete(userId);
  
  await ctx.editMessageText(
    `Chat to\'xtatildi. Yana /start bosing yoki /menu ni tanlang.`,
    { 
      ...Markup.inlineKeyboard([
        [Markup.button.callback('📋 Menyu', 'back_to_menu')]
      ])
    }
  );
});

bot.action('back_to_menu', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  userConversations.delete(userId);
  lastResponses.delete(userId);
  
  await ctx.editMessageText(
    `📋 *Asosiy Menyu*\n\n` +
    `Kerakli bo'limni tanlang:`,
    { 
      parse_mode: 'Markdown',
      ...mainMenu
    }
  );
});

// TTS - Ovozli javob
bot.action('tts_voice', async (ctx) => {
  await ctx.answerCbQuery('🔊 Audio yaratilmoqda...');
  const userId = ctx.from.id;
  
  try {
    const lastResponse = lastResponses.get(userId);
    
    if (!lastResponse) {
      await ctx.reply('⚠️ Javob topilmadi. Iltimos, avval savol bering.');
      return;
    }
    
    // Audio yaratish
    await ctx.sendChatAction('record_voice');
    
    const audioPath = await textToSpeech(lastResponse, 'ru-RU');
    
    if (audioPath && fs.existsSync(audioPath)) {
      // Voice message yuborish
      await ctx.replyWithVoice(
        { source: audioPath },
        {
          caption: '🔊 Javobning ovozli versiyasi',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('« Orqaga', 'back_to_chat')]
          ])
        }
      );
      
      // Audio faylni o'chirish (10 soniyadan keyin)
      setTimeout(() => {
        deleteAudioFile(audioPath);
      }, 10000);
      
    } else {
      await ctx.reply(
        '⚠️ Audio yaratib bo\'lmadi. Iltimos, qayta urinib ko\'ring.\n\n' +
        '💡 Yoki javobni matn ko\'rinishida o\'qishingiz mumkin.',
        {
          ...Markup.inlineKeyboard([
            [Markup.button.callback('« Orqaga', 'back_to_chat')]
          ])
        }
      );
    }
    
  } catch (error) {
    console.error('TTS xatosi:', error);
    await ctx.reply(
      '❌ Audio yaratishda xatolik yuz berdi.\n\n' +
      'Iltimos, qayta urinib ko\'ring.',
      {
        ...Markup.inlineKeyboard([
          [Markup.button.callback('« Orqaga', 'back_to_chat')]
        ])
      }
    );
  }
});

// Orqaga qaytish (TTS dan)
bot.action('back_to_chat', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    '💬 Davom eting, menga savolingizni yozing!',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔊 Ovozli eshitish', 'tts_voice')],
        [Markup.button.callback('❌ Chat To\'xtatish', 'stop_chat')],
        [Markup.button.callback('« Menyu', 'back_to_menu')]
      ])
    }
  );
});

// AI Chat funksiyasi
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const userMessage = ctx.message.text;
  
  // Agar komanda bo'lsa, o'tkazib yuborish
  if (userMessage.startsWith('/')) return;
  
  const conversation = userConversations.get(userId);
  
  if (conversation && conversation.mode === 'ai_chat') {
    try {
      // Typing action ko'rsatish
      await ctx.sendChatAction('typing');
      
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const context = `
Sen EvolvoAI kompaniyasining virtual yordamchisisan. 
Kompaniya IT xizmatlarini taqdim etadi:
- Web Development (zamonaviy web saytlar)
- Telegram Botlar (avtomatik botlar)
- AI Chatbotlar (sun'iy intellekt chatbotlar)
- Avtomatlashtirish (biznes jarayonlarini avtomatlashtirish)
- Mobile Apps (mobil ilovalar)
- E-commerce (onlayn do'konlar)
- CRM sistemalar

Kontakt ma'lumotlari:
Website: https://evolvoai.uz
Telegram: @evolvoai_news
Email: info@evolvoai.uz
Tel: +998 97 477 12 29
Manzil: Toshkent shahri, Nurafshon yo'li 12

Do'stona va professional javob ber. Agar foydalanuvchi xizmatlar haqida so'rasa, batafsil tushuntir.
Javoblar qisqa va tushunarli bo'lsin (max 500 belgi).
`;
      
      const prompt = `${context}\n\nFoydalanuvchi: ${userMessage}\n\nJavob:`;
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Chat history'ga qo'shish
      conversation.history.push({
        user: userMessage,
        ai: response,
        timestamp: new Date()
      });
      
      // Oxirgi javobni saqlash (TTS uchun)
      lastResponses.set(userId, response);
      
      await ctx.reply(
        response,
        {
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🔊 Ovozli eshitish', 'tts_voice')],
            [Markup.button.callback('❌ Chat To\'xtatish', 'stop_chat')],
            [Markup.button.callback('« Menyu', 'back_to_menu')]
          ])
        }
      );
      
    } catch (error) {
      console.error('AI Chat xatosi:', error);
      await ctx.reply(
        `⚠️ Kechirasiz, xatolik yuz berdi. Iltimos qayta urinib ko'ring yoki /menu ni tanlang.`,
        {
          ...Markup.inlineKeyboard([
            [Markup.button.callback('📋 Menyu', 'back_to_menu')]
          ])
        }
      );
    }
  } else {
    // Oddiy xabar - AI chat rejimi yoqilmagan
    await ctx.reply(
      `Savol berishni xohlaysizmi? AI Chat rejimini yoqing!`,
      {
        ...Markup.inlineKeyboard([
          [Markup.button.callback('💬 AI Chat', 'ai_chat')],
          [Markup.button.callback('📋 Menyu', 'back_to_menu')]
        ])
      }
    );
  }
});

// Botni ishga tushirish
if (process.env.TELEGRAM_BOT_TOKEN) {
  bot.launch()
    .then(() => console.log('✅ Telegram bot ishga tushdi'))
    .catch(err => console.error('❌ Bot xatosi:', err));
}

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

async function sendPostToTelegram(post) {
  try {
    // Faqat 2-3 ta hashtag tanlash
    const selectedTags = post.tags.slice(0, 3).map(tag => 
      '#' + tag.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
    ).join(' ');

    // HTML formatda caption (belgilarsiz, toza)
    const caption = 
      `📝 <b>${post.title}</b>\n\n` +
      `${post.excerpt}\n\n` +
      `🔗 To'liq o'qish: ${process.env.FRONTEND_URL || 'https://evolvoai-uz.vercel.app'}/blog/${post.slug}\n\n` +
      `${selectedTags}`;

    // Agar rasm mavjud bo'lsa, rasm bilan yuborish
    if (post.image) {
      const result = await bot.telegram.sendPhoto(
        process.env.TELEGRAM_CHANNEL_ID,
        post.image,
        { 
          caption: caption,
          parse_mode: 'HTML'
        }
      );
      return result.message_id;
    } else {
      // Rasm yo'q bo'lsa, faqat matn yuborish
      const result = await bot.telegram.sendMessage(
        process.env.TELEGRAM_CHANNEL_ID,
        caption,
        { parse_mode: 'HTML' }
      );
      return result.message_id;
    }

  } catch (error) {
    console.error('Telegram yuborish xatosi:', error);
    
    // Agar HTML xato bersa, oddiy text yuborish
    try {
      const selectedTags = post.tags.slice(0, 3).map(tag => '#' + tag).join(' ');
      const simpleCaption = 
        `📝 ${post.title}\n\n` +
        `${post.excerpt}\n\n` +
        `🔗 To'liq o'qish: ${process.env.FRONTEND_URL || 'https://evolvoai-uz.vercel.app'}/blog/${post.slug}\n\n` +
        `${selectedTags}`;

      if (post.image) {
        const result = await bot.telegram.sendPhoto(
          process.env.TELEGRAM_CHANNEL_ID,
          post.image,
          { caption: simpleCaption }
        );
        return result.message_id;
      } else {
        const result = await bot.telegram.sendMessage(
          process.env.TELEGRAM_CHANNEL_ID,
          simpleCaption
        );
        return result.message_id;
      }
    } catch (fallbackError) {
      console.error('Fallback yuborish ham xato:', fallbackError);
      throw fallbackError;
    }
  }
}

async function sendMarketingPost() {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
EvolvoAI IT kompaniyasi uchun qisqa, ta'sirchan marketing post yozing.
Post 150-200 ta belgidan oshmasin va quyidagilarni o'z ichiga olsin:
- Birorta xizmatimizni ta'kidlash
- Call-to-action
- Emoji'lar bilan bezatilgan
- Professional lekin do'stona ohang

Faqat post matnini yozing, qo'shimcha tushuntirish kerak emas.
`;

  try {
    const result = await model.generateContent(prompt);
    const postText = result.response.text();

    // Faqat 2-3 ta hashtag
    const hashtags = ['#EvolvoAI', '#ITxizmatlari'];
    
    const message = `${postText}\n\n🌐 ${process.env.FRONTEND_URL || 'https://evolvoai-uz.vercel.app'}\n📱 @evolvoai\n\n${hashtags.join(' ')}`;

    await bot.telegram.sendMessage(
      process.env.TELEGRAM_CHANNEL_ID,
      message
    );

    console.log('✅ Marketing post yuborildi');
  } catch (error) {
    console.error('Marketing post xatosi:', error);
    throw error;
  }
}

module.exports = {
  bot,
  sendPostToTelegram,
  sendMarketingPost
};