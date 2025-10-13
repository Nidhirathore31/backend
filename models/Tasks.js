const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  description: String,
});

module.exports = mongoose.model('Task', taskSchema);
