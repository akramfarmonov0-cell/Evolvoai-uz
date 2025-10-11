const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { bot } = require('../services/telegramService');

// Kontakt forma yuborish
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Ism, email va xabar majburiy' 
      });
    }

    // Database'ga saqlash
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
      status: 'new'
    });
    await contact.save();

    // Telegram'ga xabar yuborish
    const telegramMessage = 
      `🆕 *Yangi murojaat!*\n\n` +
      `👤 Ism: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📱 Telefon: ${phone || 'Ko\'rsatilmagan'}\n` +
      `🎯 Xizmat: ${service || 'Ko\'rsatilmagan'}\n\n` +
      `💬 Xabar:\n${message}`;

    // Admin'ga yuborish (ADMIN_CHAT_ID environment variable'da)
    if (process.env.ADMIN_CHAT_ID) {
      try {
        await bot.telegram.sendMessage(
          process.env.ADMIN_CHAT_ID,
          telegramMessage,
          { parse_mode: 'Markdown' }
        );
      } catch (telegramError) {
        console.error('Telegram xabar yuborishda xato:', telegramError.message);
        // Telegram'ga yuborilmasa ham, database'ga saqlangan
      }
    } else {
      console.warn('⚠️ ADMIN_CHAT_ID topilmadi - Telegram xabar yuborilmadi');
    }

    res.json({ 
      success: true, 
      message: 'Xabaringiz muvaffaqiyatli yuborildi!' 
    });
  } catch (error) {
    console.error('Kontakt forma xatosi:', error);
    res.status(500).json({ 
      error: 'Xabar yuborishda xatolik yuz berdi' 
    });
  }
});

module.exports = router;