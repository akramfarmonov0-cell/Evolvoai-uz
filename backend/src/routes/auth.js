const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email va parol talab qilinadi' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: 'Admin konfiguratsiyasi to\'liq emas' });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: 'Noto\'g\'ri email yoki parol' });
  }

  try {
    const token = jwt.sign(
      {
        email,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '30d'
      }
    );

    res.json({
      token,
      admin: {
        email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login xatosi:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
