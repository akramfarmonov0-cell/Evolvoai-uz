require('dotenv').config();
const { Telegraf } = require('telegraf');

async function verifyConnection() {
  console.log('═══════════════════════════════════════════════════');
  console.log('   📱 TELEGRAM ULANISHNI TEKSHIRISH');
  console.log('═══════════════════════════════════════════════════\n');

  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  const adminChatId = process.env.ADMIN_CHAT_ID;

  console.log(`Bot Token: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Mavjud' : '❌ Yo\'q'}`);
  console.log(`Admin Chat ID: ${adminChatId || '❌ Yo\'q'}\n`);

  if (!adminChatId) {
    console.log('❌ ADMIN_CHAT_ID topilmadi!\n');
    return;
  }

  console.log('📤 Test xabar yuborilmoqda...\n');

  const testMessage = 
    `✅ *Ulanish Muvaffaqiyatli!*\n\n` +
    `🎉 Kontakt forma xabarlari endi bu yerga keladi.\n\n` +
    `Test vaqti: ${new Date().toLocaleString('uz-UZ')}`;

  try {
    const result = await bot.telegram.sendMessage(
      adminChatId,
      testMessage,
      { parse_mode: 'Markdown' }
    );

    console.log('✅ MUVAFFAQIYATLI!\n');
    console.log(`   Message ID: ${result.message_id}`);
    console.log(`   Chat ID: ${result.chat.id}\n`);
    
    console.log('═══════════════════════════════════════════════════');
    console.log('   🎉 HAMMASI TAYYOR!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('✅ Kontakt forma to\'liq ishlaydi');
    console.log('✅ Xabarlar Telegram\'ga keladi');
    console.log('✅ Web saytda test qiling: http://localhost:3000/contact\n');

  } catch (error) {
    console.error('❌ XATOLIK:\n');
    console.error(`   ${error.message}\n`);

    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      console.log('📝 YECHIM:\n');
      console.log('Bot sizga xabar yuborishi uchun avval siz botga /start');
      console.log('yuborishingiz kerak!\n');
      console.log('1. Bot\'ni oching: https://t.me/evolvoai_bot');
      console.log('2. /start bosing');
      console.log('3. Qayta test qiling: node verify-telegram-connection.js\n');
    } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('📝 MUAMMO:\n');
      console.log('Bot token noto\'g\'ri yoki bot o\'chirilgan.\n');
    } else {
      console.log('📝 MUAMMO:\n');
      console.log('Admin Chat ID noto\'g\'ri yoki boshqa xatolik.\n');
    }
  }

  process.exit(0);
}

verifyConnection();
