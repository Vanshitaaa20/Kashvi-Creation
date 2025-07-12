const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
