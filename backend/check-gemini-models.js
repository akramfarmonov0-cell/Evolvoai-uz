require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkGeminiModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  console.log('🔍 Gemini API sozlamalarini tekshirish...\n');
  console.log('API Key:', process.env.GEMINI_API_KEY ? '✅ Mavjud' : '❌ Yo\'q');
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('\n❌ GEMINI_API_KEY topilmadi!');
    console.log('https://makersuite.google.com/app/apikey dan API key oling\n');
    process.exit(1);
  }

  console.log('\n🧪 Turli modellarni sinab ko\'ramiz:\n');

  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.0-pro'
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`⏳ ${modelName} ni sinab ko'rish...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello, test message');
      const response = await result.response;
      const text = response.text();
      console.log(`   ✅ ${modelName} - ISHLAYAPTI!`);
      console.log(`   📝 Javob: ${text.substring(0, 50)}...\n`);
      
      console.log(`🎉 Ishlaydigan model topildi: ${modelName}`);
      console.log(`\ncontentGenerator.js faylidagi model nomini shunga o'zgartiring:\n`);
      console.log(`   const model = genAI.getGenerativeModel({ model: '${modelName}' });\n`);
      break;
      
    } catch (error) {
      console.log(`   ❌ ${modelName} - Ishlamadi: ${error.message}\n`);
    }
  }
}

checkGeminiModels();
