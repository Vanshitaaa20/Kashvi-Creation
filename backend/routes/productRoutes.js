const express = require("express");
const router = express.Router();
const Saree = require("../models/Saree");

// Get all sarees (Catalogue Page)
router.get("/", async (req, res) => {
  try {
    const sarees = await Saree.find();
    res.json(sarees);
  } catch (error) {
    console.error(" Error fetching products:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get individual saree by ID (Product Page)
router.get("/:id", async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) {
      return res.status(404).json({ error: "Saree not found" });
    }
    res.json(saree);
  } catch (error) {
    console.error(" Error fetching saree:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
