const User = require('../models/Users');
const BlacklistedToken = require('../models/BlacklistedToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ userName, email, password: hashedPassword });

    // await user.save();

    const user = await User.create({ userName, email, password: hashedPassword });
    res.status(201).json({ user ,message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id }, // ✅ MUST be `id`, not `_id`
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Check if token is already blacklisted
    const existingToken = await BlacklistedToken.findOne({ token });
    if (existingToken) {
      return res.status(400).json({ message: 'Token already invalidated' });
    }

    // Add token to blacklist
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
};

// Utility function to clear expired tokens (can be called periodically)
exports.clearExpiredTokens = async () => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await BlacklistedToken.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    console.log('Expired tokens cleared');
  } catch (error) {
    console.error('Error clearing expired tokens:', error);
  }
};
