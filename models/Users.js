const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  // googleId: { type: String, unique: true, sparse: true },
  googleId: { type: String },
  
});

module.exports = mongoose.model('User', userSchema);
