const express = require("express");
const path = require("path");
const Saree = require("../models/Saree");

const router = express.Router();

// Serve static images (if needed — usually in server.js, not here)
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// GET all sarees
router.get("/", async (req, res) => {
  try {
    const sarees = await Saree.find();
    res.json(sarees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET single saree by ID
router.get("/:id", async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) return res.status(404).json({ message: "Product Not Found" });
    res.json(saree);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
