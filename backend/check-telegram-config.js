// Telegram konfiguratsiyasini tekshirish
require('dotenv').config();

console.log('🔍 Telegram konfiguratsiyasini tekshirish...\n');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const channelId = process.env.TELEGRAM_CHANNEL_ID;

console.log('📋 Telegram sozlamalari:');
console.log(`- Bot Token: ${botToken ? '✅ Mavjud (' + botToken.substring(0, 10) + '...)' : '❌ Yo\'q'}`);
console.log(`- Channel ID: ${channelId ? '✅ Mavjud (' + channelId + ')' : '❌ Yo\'q'}`);

if (!botToken) {
  console.log('\n❌ TELEGRAM_BOT_TOKEN .env faylida yo\'q!');
  console.log('Qo\'shish uchun:');
  console.log('TELEGRAM_BOT_TOKEN=your_bot_token_here');
}

if (!channelId) {
  console.log('\n❌ TELEGRAM_CHANNEL_ID .env faylida yo\'q!');
  console.log('Qo\'shish uchun:');
  console.log('TELEGRAM_CHANNEL_ID=@your_channel_username');
}

if (botToken && channelId) {
  console.log('\n✅ Telegram sozlamalari to\'g\'ri!');
  
  // Test yuborish
  const { Telegraf } = require('telegraf');
  const bot = new Telegraf(botToken);
  
  console.log('\n🧪 Test xabar yuborish...');
  
  bot.telegram.sendMessage(channelId, '🧪 Test xabar - RSS postlar uchun')
    .then((result) => {
      console.log('✅ Test xabar muvaffaqiyatli yuborildi!');
      console.log('Message ID:', result.message_id);
    })
    .catch((error) => {
      console.error('❌ Test xabar yuborishda xato:', error.message);
      if (error.message.includes('chat not found')) {
        console.log('\n💡 Yechim:');
        console.log('1. Bot kanalga admin sifatida qo\'shilganligini tekshiring');
        console.log('2. Kanal username to\'g\'ri yozilganligini tekshiring (@bilan)');
      }
    })
    .finally(() => {
      process.exit(0);
    });
} else {
  console.log('\n⚠️  Telegram sozlamalarini to\'ldiring va qayta sinab ko\'ring.');
  process.exit(1);
}
