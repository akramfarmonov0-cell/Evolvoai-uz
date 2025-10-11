const express = require('express');
const router = express.Router();

const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Saytlar Yaratish',
    description: 'Zamonaviy, tez va SEO-optimallashtirilgan web saytlar',
    icon: '🌐',
    features: [
      'Responsive dizayn',
      'SEO optimizatsiya',
      'Tez yuklanish',
      'CMS integratsiya',
      'E-commerce yechimlar'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'telegram-bots',
    title: 'Telegram Botlar',
    description: 'Avtomatik telegram botlar va integratsiyalar',
    icon: '🤖',
    features: [
      'Avtomatik javoblar',
      'To\'lov tizimlari integratsiyasi',
      'Admin panellar',
      'Statistika va analytics',
      'Multi-language support'
    ],
    technologies: ['Telegraf', 'Node.js', 'Python', 'MongoDB']
  },
  {
    id: 'chatbots',
    title: 'AI Chatbotlar',
    description: 'Sun\'iy intellekt asosidagi chatbotlar',
    icon: '💬',
    features: [
      'Natural Language Processing',
      'Multi-platform support',
      '24/7 mijozlar xizmati',
      'Contextual conversations',
      'Integration with CRM'
    ],
    technologies: ['OpenAI', 'Gemini', 'LangChain', 'Dialogflow']
  },
  {
    id: 'automation',
    title: 'Biznes Avtomatlashtirish',
    description: 'Biznes jarayonlarini avtomatlashtirish',
    icon: '⚙️',
    features: [
      'Workflow avtomatlashtirish',
      'Data processing',
      'Report generation',
      'Email avtomatlashtirish',
      'API integratsiyalar'
    ],
    technologies: ['Python', 'Node.js', 'Zapier', 'Make.com']
  },
  {
    id: 'ai-integration',
    title: 'AI Integratsiya',
    description: 'Sun\'iy intellekt texnologiyalarini biznesingizga',
    icon: '🧠',
    features: [
      'GPT va Gemini integratsiya',
      'Image recognition',
      'Text analysis',
      'Predictive analytics',
      'Custom AI models'
    ],
    technologies: ['OpenAI', 'Google AI', 'TensorFlow', 'PyTorch']
  },
  {
    id: 'mobile-apps',
    title: 'Mobil Ilovalar',
    description: 'Cross-platform mobil ilovalar yaratish',
    icon: '📱',
    features: [
      'iOS va Android',
      'Native performance',
      'Push notifications',
      'Offline support',
      'App Store optimization'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  }
];

// Barcha xizmatlarni olish
router.get('/', (req, res) => {
  res.json(SERVICES);
});

// Bitta xizmatni olish
router.get('/:id', (req, res) => {
  const service = SERVICES.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({ error: 'Xizmat topilmadi' });
  }
  
  res.json(service);
});

module.exports = router;