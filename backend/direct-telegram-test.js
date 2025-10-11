const { Telegraf } = require('telegraf');

const bot = new Telegraf('8258225391:AAFqsYYU2QJzk54VP6hqcNQ37ZBsQ50Vl0M');
const adminChatId = '8325332204';

async function sendTestMessage() {
  console.log('📤 Test xabar yuborilmoqda...\n');
  
  const message = 
    `🆕 *Yangi murojaat! (TEST)*\n\n` +
    `👤 Ism: Test User\n` +
    `📧 Email: test@example.com\n` +
    `📱 Telefon: +998901234567\n` +
    `🎯 Xizmat: Web Development\n\n` +
    `💬 Xabar:\n` +
    `Bu test xabar. Kontakt forma to'g'ri ishlayotganligini tekshirish.`;

  try {
    const result = await bot.telegram.sendMessage(
      adminChatId,
      message,
      { parse_mode: 'Markdown' }
    );
    
    console.log('✅ MUVAFFAQIYATLI!\n');
    console.log(`   Message ID: ${result.message_id}`);
    console.log(`   Chat ID: ${result.chat.id}`);
    console.log(`   Date: ${new Date(result.date * 1000).toLocaleString()}\n`);
    console.log('📱 Telegram\'da xabarni tekshiring!\n');
    
  } catch (error) {
    console.error('❌ XATOLIK:\n');
    console.error(`   ${error.message}\n`);
    
    if (error.response) {
      console.error('Server javobi:', error.response);
    }
  }
  
  process.exit(0);
}

sendTestMessage();
