const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        userName: name,
        email,
        password: 'GOOGLE_USER', // placeholder
        googleId,
      });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   // expiresIn: '1h',

    //    expiresIn: '1d'
    // });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    

    res.json({ token });
  } catch (error) {
    console.error("Google login failed:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};