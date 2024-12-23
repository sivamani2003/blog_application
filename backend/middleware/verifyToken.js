const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId; // Adding userId to req for further reference
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
