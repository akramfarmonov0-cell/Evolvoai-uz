require('dotenv').config({ path: './backend/.env' });
const { Telegraf } = require('telegraf');

async function testContactForm() {
  console.log('═══════════════════════════════════════════════════');
  console.log('   📧 KONTAKT FORMA TELEGRAM TEST');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('📋 .env sozlamalari:\n');
  console.log(`   TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Mavjud' : '❌ Yo\'q'}`);
  console.log(`   ADMIN_CHAT_ID: ${process.env.ADMIN_CHAT_ID || '❌ Yo\'q'}\n`);

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.log('❌ TELEGRAM_BOT_TOKEN topilmadi!\n');
    return;
  }

  if (!process.env.ADMIN_CHAT_ID) {
    console.log('❌ ADMIN_CHAT_ID topilmadi!\n');
    console.log('📝 Qanday olish:\n');
    console.log('1. Telegram\'da @evolvoai_bot ga o\'ting');
    console.log('2. /chatid yuboring');
    console.log('3. Olingan ID ni .env fayliga qo\'shing\n');
    console.log('Yoki:\n');
    console.log('   node backend/get-my-chat-id.js\n');
    return;
  }

  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  console.log('📤 Test xabar yuborilmoqda...\n');

  const testMessage = 
    `🆕 *Yangi murojaat! (TEST)*\n\n` +
    `👤 Ism: Test User\n` +
    `📧 Email: test@example.com\n` +
    `📱 Telefon: +998901234567\n` +
    `🎯 Xizmat: Web Development\n\n` +
    `💬 Xabar:\n` +
    `Bu test xabar. Kontakt forma to'g'ri ishlayotganligini tekshirish uchun yuborildi.`;

  try {
    const result = await bot.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      testMessage,
      { parse_mode: 'Markdown' }
    );

    console.log('✅ Test xabar yuborildi!\n');
    console.log(`   Message ID: ${result.message_id}`);
    console.log(`   Chat ID: ${result.chat.id}\n`);
    
    console.log('═══════════════════════════════════════════════════');
    console.log('   🎉 TELEGRAM SOZLANGAN!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('✅ Kontakt forma xabarlari endi Telegram\'ga keladi.');
    console.log('✅ Telegram\'da test xabarni tekshiring.\n');

  } catch (error) {
    console.error('❌ Xabar yuborib bo\'lmadi!\n');
    console.error(`   Xato: ${error.message}\n`);
    
    console.log('📝 Muammolarni hal qilish:\n');
    console.log('1. ADMIN_CHAT_ID to\'g\'riligini tekshiring');
    console.log('2. Bot sizga xabar yuborish huquqiga ega ekanligini tekshiring');
    console.log('3. Avval bot\'ga /start yuborganligingizni tekshiring\n');
  }

  process.exit(0);
}

testContactForm();
