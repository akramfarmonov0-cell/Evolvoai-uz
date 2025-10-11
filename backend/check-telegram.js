require('dotenv').config();

const { Telegraf } = require('telegraf');

async function checkTelegramSetup() {
  console.log('🔍 Telegram sozlamalarini tekshirish...\n');

  // 1. Environment variables tekshirish
  console.log('📋 .env faylidagi sozlamalar:');
  console.log(`   TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Mavjud' : '❌ Yo\'q'}`);
  console.log(`   TELEGRAM_CHANNEL_ID: ${process.env.TELEGRAM_CHANNEL_ID || '❌ Yo\'q'}`);
  console.log(`   ADMIN_CHAT_ID: ${process.env.ADMIN_CHAT_ID || '⚠️  Ixtiyoriy'}\n`);

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN topilmadi!');
    console.log('\n📝 Qanday qilish:');
    console.log('   1. Telegram\'da @BotFather ga o\'ting');
    console.log('   2. /newbot buyrug\'ini yuboring');
    console.log('   3. Bot nomini va username\'ini kiriting');
    console.log('   4. Olingan TOKEN\'ni .env fayliga qo\'shing\n');
    process.exit(1);
  }

  if (!process.env.TELEGRAM_CHANNEL_ID) {
    console.error('❌ TELEGRAM_CHANNEL_ID topilmadi!');
    console.log('\n📝 Qanday qilish:');
    console.log('   1. Telegram\'da yangi kanal yarating');
    console.log('   2. Kanalga username bering (masalan: @evolvoai_news)');
    console.log('   3. Bot\'ni kanalga admin qilib qo\'shing');
    console.log('   4. Username\'ni .env fayliga qo\'shing\n');
    process.exit(1);
  }

  // 2. Bot ulanishini tekshirish
  try {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    
    console.log('🤖 Bot ma\'lumotlarini olish...');
    const botInfo = await bot.telegram.getMe();
    console.log(`   ✅ Bot: @${botInfo.username}`);
    console.log(`   ✅ Ismi: ${botInfo.first_name}`);
    console.log(`   ✅ ID: ${botInfo.id}\n`);

    // 3. Kanal mavjudligini tekshirish
    console.log('📢 Kanalga ulanish...');
    try {
      const chatInfo = await bot.telegram.getChat(process.env.TELEGRAM_CHANNEL_ID);
      console.log(`   ✅ Kanal: ${chatInfo.title || chatInfo.username}`);
      console.log(`   ✅ Turi: ${chatInfo.type}`);
      console.log(`   ✅ ID: ${chatInfo.id}\n`);

      // 4. Bot admin huquqlarini tekshirish
      console.log('🔑 Admin huquqlarini tekshirish...');
      try {
        const admins = await bot.telegram.getChatAdministrators(process.env.TELEGRAM_CHANNEL_ID);
        const botAdmin = admins.find(admin => admin.user.id === botInfo.id);
        
        if (botAdmin) {
          console.log(`   ✅ Bot admin`);
          console.log(`   ✅ Xabar yuborish: ${botAdmin.can_post_messages ? 'Ha' : 'Yo\'q'}`);
          console.log(`   ✅ Xabar tahrirlash: ${botAdmin.can_edit_messages ? 'Ha' : 'Yo\'q'}\n`);
        } else {
          console.log(`   ❌ Bot admin emas!`);
          console.log('\n📝 Bot\'ni admin qilish:');
          console.log('   1. Kanal sozlamalarini oching');
          console.log('   2. Administrators → Add Administrator');
          console.log('   3. Bot\'ni qidiring va admin qiling\n');
          process.exit(1);
        }
      } catch (error) {
        console.log(`   ⚠️  Admin huquqlarini tekshirib bo'lmadi: ${error.message}\n`);
      }

      // 5. Test xabar yuborish
      console.log('📤 Test xabar yuborish...');
      try {
        const message = await bot.telegram.sendMessage(
          process.env.TELEGRAM_CHANNEL_ID,
          `🧪 *Test Xabar*\n\n` +
          `✅ EvolvoAI Bot ishlamoqda!\n` +
          `🕒 Vaqt: ${new Date().toLocaleString('uz-UZ')}\n\n` +
          `Bot to'g'ri sozlangan va tayyor.`,
          { parse_mode: 'Markdown' }
        );
        console.log(`   ✅ Test xabar yuborildi!`);
        console.log(`   ✅ Message ID: ${message.message_id}\n`);

        // 6. Test rasm yuborish
        console.log('🖼️  Test rasm yuborish...');
        try {
          const photoMessage = await bot.telegram.sendPhoto(
            process.env.TELEGRAM_CHANNEL_ID,
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
            {
              caption: '📸 *Test Rasm*\n\nRasm yuborish ham ishlayapti!',
              parse_mode: 'Markdown'
            }
          );
          console.log(`   ✅ Test rasm yuborildi!`);
          console.log(`   ✅ Message ID: ${photoMessage.message_id}\n`);
        } catch (photoError) {
          console.log(`   ⚠️  Rasm yuborib bo'lmadi: ${photoError.message}\n`);
        }

        console.log('🎉 BARCHA TESTLAR MUVAFFAQIYATLI!\n');
        console.log('✅ Telegram to\'liq sozlangan va ishlayapti.');
        console.log('✅ Endi blog postlar avtomatik Telegram\'ga yuboriladi.\n');

      } catch (sendError) {
        console.error(`   ❌ Xabar yuborib bo'lmadi: ${sendError.message}`);
        console.log('\n📝 Muammo:');
        console.log('   - Bot kanalga admin qilib qo\'shilganligini tekshiring');
        console.log('   - Bot "Post Messages" huquqiga ega ekanligini tekshiring');
        console.log('   - Channel ID to\'g\'riligini tekshiring\n');
        process.exit(1);
      }

    } catch (chatError) {
      console.error(`   ❌ Kanalga ulanib bo'lmadi: ${chatError.message}`);
      console.log('\n📝 Muammo:');
      console.log('   - Channel ID to\'g\'riligini tekshiring');
      console.log('   - Public kanal bo\'lsa @ belgisini qo\'ying');
      console.log('   - Private kanal bo\'lsa numeric ID ishlatng (-1001234567890)\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Bot xatosi:', error.message);
    console.log('\n📝 Bot token to\'g\'riligini tekshiring\n');
    process.exit(1);
  }
}

checkTelegramSetup();
