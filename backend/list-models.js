require('dotenv').config();
const https = require('https');

async function listAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🔍 Gemini API mavjud modellarni tekshirish...\n');
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 20)}...` : '❌ Yo\'q');
  
  if (!apiKey) {
    console.log('❌ API key topilmadi!\n');
    return;
  }

  // v1beta endpoint'dan foydalanish
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.error) {
            console.log('❌ API xatosi:', response.error.message);
            console.log('\nMavjud bo\'lishi mumkin:');
            console.log('- API key noto\'g\'ri');
            console.log('- API disabled');
            console.log('- Quota tugagan\n');
            return;
          }
          
          if (response.models) {
            console.log(`✅ ${response.models.length} ta model topildi:\n`);
            
            const textModels = response.models.filter(m => 
              m.supportedGenerationMethods && 
              m.supportedGenerationMethods.includes('generateContent')
            );
            
            console.log('📝 Text generation uchun modellar:\n');
            textModels.forEach(model => {
              const name = model.name.replace('models/', '');
              console.log(`   ✅ ${name}`);
              console.log(`      Display: ${model.displayName || 'N/A'}`);
              console.log(`      Methods: ${model.supportedGenerationMethods.join(', ')}`);
              console.log();
            });
            
            if (textModels.length > 0) {
              const recommended = textModels[0].name.replace('models/', '');
              console.log(`\n🎯 Tavsiya etiladi: ${recommended}`);
              console.log('\ncontentGenerator.js da ishlatish:\n');
              console.log(`   const model = genAI.getGenerativeModel({ model: '${recommended}' });\n`);
            }
          }
          
        } catch (error) {
          console.log('❌ JSON parse xatosi:', error.message);
          console.log('Raw response:', data.substring(0, 200));
        }
      });
      
    }).on('error', (error) => {
      console.log('❌ Request xatosi:', error.message);
    });
  });
}

listAvailableModels();
