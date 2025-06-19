const mongoose = require("mongoose");

const SareeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  style: { type: String, required: true }
});

const Saree = mongoose.models.Saree || mongoose.model("Saree", SareeSchema);

module.exports = Saree;
