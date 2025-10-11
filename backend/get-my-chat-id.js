require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log('═══════════════════════════════════════════════════');
console.log('   📱 TELEGRAM CHAT ID OLISH');
console.log('═══════════════════════════════════════════════════\n');

console.log('📋 Qanday qilish:\n');
console.log('1. Telegram\'da botga o\'ting: @evolvoai_bot');
console.log('2. /start yoki /chatid buyrug\'ini yuboring');
console.log('3. Bot sizga Chat ID ni yuboradi\n');

console.log('⏳ Bot ishga tushmoqda...\n');

// /chatid buyrug'i
bot.command('chatid', (ctx) => {
  const chatId = ctx.chat.id;
  const userName = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;
  const firstName = ctx.from.first_name;
  
  ctx.reply(
    `✅ *Sizning ma'lumotlaringiz:*\n\n` +
    `👤 Ism: ${firstName}\n` +
    `🆔 Chat ID: \`${chatId}\`\n` +
    `👨‍💼 Username: ${userName}\n\n` +
    `📝 *Qanday qilish:*\n` +
    `1. Yuqoridagi Chat ID ni nusxalang\n` +
    `2. .env fayliga qo'shing:\n` +
    `   \`ADMIN_CHAT_ID=${chatId}\`\n` +
    `3. Backend'ni qayta ishga tushiring\n\n` +
    `Shundan so'ng kontakt forma xabarlari shu yerga keladi! ✅`,
    { parse_mode: 'Markdown' }
  );
  
  console.log('═══════════════════════════════════════════════════');
  console.log('   ✅ CHAT ID TOPILDI!');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(`👤 Foydalanuvchi: ${firstName} (${userName})`);
  console.log(`🆔 Chat ID: ${chatId}\n`);
  console.log('📝 .env fayliga qo\'shing:\n');
  console.log(`   ADMIN_CHAT_ID=${chatId}\n`);
  console.log('═══════════════════════════════════════════════════\n');
});

// /start buyrug'i
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  const firstName = ctx.from.first_name;
  
  ctx.reply(
    `👋 Assalomu alaykum, ${firstName}!\n\n` +
    `🆔 Sizning Chat ID'ingiz: \`${chatId}\`\n\n` +
    `Bu ID ni .env fayliga ADMIN_CHAT_ID sifatida qo'shing.\n\n` +
    `/chatid - Batafsil ko'rish`,
    { parse_mode: 'Markdown' }
  );
  
  console.log(`✅ /start - Chat ID: ${chatId} (${firstName})`);
});

bot.launch()
  .then(() => {
    console.log('✅ Bot ishga tushdi!\n');
    console.log('📱 Telegram\'da botga /chatid yuboring: @evolvoai_bot\n');
    console.log('⏹️  To\'xtatish: Ctrl+C\n');
  })
  .catch(err => {
    console.error('❌ Bot xatosi:', err);
    process.exit(1);
  });

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('\n\n👋 Bot to\'xtatildi');
  bot.stop('SIGINT');
  process.exit(0);
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  process.exit(0);
});
