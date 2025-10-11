const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request
      req.user = {
        email: decoded.email,
        role: decoded.role
      };

      next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ error: 'Avtorizatsiya xatosi, token noto\'g\'ri' });
    }
  } else {
    return res.status(401).json({ error: 'Avtorizatsiya xatosi, token topilmadi' });
  }
};

module.exports = { protect };
