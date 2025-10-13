const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
