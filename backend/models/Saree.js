// models/Saree.js
const mongoose = require('mongoose');

const sareeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  color: { type: String },
  style: { type: String },
  price: { type: Number },
  material: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Saree', sareeSchema);