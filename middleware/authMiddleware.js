// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'your_secret_key';

// exports.verifyToken = (req, res, next) => {
//   const token = req.cookies.token; // Retrieve token from cookies

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId; // Attach userId to request object
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Replace with actual secret

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

