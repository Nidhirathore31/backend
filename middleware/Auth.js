const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if token is blacklisted
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Token has been invalidated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded token payload to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
