const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Text-to-Speech Service
 * Google Cloud Text-to-Speech API orqali audio yaratish
 */

// Audio fayllar uchun papka
const AUDIO_DIR = path.join(__dirname, '../../audio');

// Audio papka yo'qligini tekshirish va yaratish
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

/**
 * Matnni audio'ga aylantirish (Google TTS API)
 * @param {string} text - Ovozga aylantirilishi kerak bo'lgan matn
 * @param {string} languageCode - Til kodi (uz-UZ, ru-RU, en-US)
 * @returns {Promise<string>} - Audio fayl yo'li
 */
async function textToSpeech(text, languageCode = 'ru-RU') {
  try {
    // Hozircha TTS API key'siz ishlash uchun null qaytaramiz
    // Keyinroq Google Cloud TTS yoki boshqa TTS service qo'shiladi
    
    console.log('⚠️ TTS funksiyasi hozircha o\'chirilgan (API key kerak)');
    console.log('📝 Matn:', text.substring(0, 100) + '...');
    
    return null;

    /* Google Cloud TTS - API key kerak bo'lganda ishlatiladi
    
    const apiKey = process.env.GOOGLE_TTS_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ TTS API key topilmadi');
      return null;
    }

    const voiceMap = {
      'uz-UZ': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-A' },
      'ru-RU': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-A' },
      'en-US': { languageCode: 'en-US', name: 'en-US-Wavenet-F' }
    };

    const voice = voiceMap[languageCode] || voiceMap['ru-RU'];

    const requestBody = {
      input: { text: text.substring(0, 5000) },
      voice: {
        languageCode: voice.languageCode,
        name: voice.name
      },
      audioConfig: {
        audioEncoding: 'OGG_OPUS',
        speakingRate: 1.0,
        pitch: 0.0
      }
    };

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      requestBody,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    if (response.data && response.data.audioContent) {
      const fileName = `tts_${Date.now()}.ogg`;
      const filePath = path.join(AUDIO_DIR, fileName);
      
      const audioBuffer = Buffer.from(response.data.audioContent, 'base64');
      fs.writeFileSync(filePath, audioBuffer);

      console.log(`✅ TTS audio yaratildi: ${fileName}`);
      return filePath;
    }

    return null;
    */

  } catch (error) {
    console.error('❌ TTS xatosi:', error.message);
    return null;
  }
}

/**
 * Free TTS alternative - eSpeak yoki system TTS
 * (Google TTS ishlamasa bu ishlatiladi)
 */
async function textToSpeechFallback(text) {
  try {
    // pyttsx3 yoki espeak ishlatish mumkin
    // Lekin Node.js da oddiyroq - audio faylni yubormaslik
    console.log('⚠️ TTS fallback - audio yaratilmadi');
    return null;
  } catch (error) {
    console.error('Fallback TTS xatosi:', error);
    return null;
  }
}

/**
 * Audio faylni o'chirish (vaqtinchalik fayllar)
 */
function deleteAudioFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Audio fayl o'chirildi: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error('Audio fayl o\'chirishda xato:', error);
  }
}

/**
 * Eski audio fayllarni tozalash (1 soatdan eski)
 */
function cleanupOldAudioFiles() {
  try {
    const files = fs.readdirSync(AUDIO_DIR);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    files.forEach(file => {
      const filePath = path.join(AUDIO_DIR, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtimeMs > oneHour) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Eski audio o'chirildi: ${file}`);
      }
    });
  } catch (error) {
    console.error('Audio tozalashda xato:', error);
  }
}

// Har soatda eski fayllarni tozalash
setInterval(cleanupOldAudioFiles, 60 * 60 * 1000);

module.exports = {
  textToSpeech,
  textToSpeechFallback,
  deleteAudioFile,
  cleanupOldAudioFiles
};
