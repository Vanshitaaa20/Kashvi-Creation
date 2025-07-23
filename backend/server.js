require("dotenv").config({ path: "./.env" });

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const passport = require("passport");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const connectToDatabase = require("./config/db");

const app = express();

// ─── ENV VALIDATION ───────────────────────────────
const requiredEnvs = [
  "JWT_SECRET",
  "REFRESH_SECRET",
  "MONGO_URI",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET"
];

const missing = requiredEnvs.filter(key => !process.env[key]);
if (missing.length) {
  console.error(`❌ Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

// ─── CONNECT TO DB ────────────────────────────────
connectToDatabase();

// ─── MIDDLEWARE ───────────────────────────────────
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(fileupload({ useTempFiles: true, tempFileDir: "./tmp/" }));

require("./config/passport");

// ─── CLOUDINARY CONFIG ────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── ROUTES & MODELS ──────────────────────────────
const Product = require("./models/Saree");
const Cart = require("./models/Cartb");
const Order = require("./models/Orders");

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// ─── IMAGE UPLOAD ROUTE ───────────────────────────
app.post("/upload-image/:id", async (req, res) => {
  try {
    const productId = req.params.id.trim();
    if (!req.files?.image) {
      return res.status(400).json({ error: "❌ No image file uploaded" });
    }

    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { folder: "sarees" }
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { image: result.secure_url },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "❌ Product not found" });
    }

    res.json({ message: "✅ Image uploaded", product: updatedProduct });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "❌ Error uploading image" });
  }
});

// ─── ORDER PROCEED ROUTE ──────────────────────────
app.post("/:userId/proceed", async (req, res) => {
  const { userId } = req.params;
  try {
    const userCart = await Cart.find({ userId });
    if (!userCart.length) {
      return res.status(400).json({ error: "❌ No items in cart" });
    }

    const newOrder = new Order({
      userId,
      items: userCart.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
      })),
    });

    await newOrder.save();
    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "✅ Order placed", order: newOrder });
  } catch (err) {
    console.error("❌ Proceed error:", err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ─── REACT STATIC FILES ───────────────────────────
const buildPath = path.join(__dirname, "frontend", "app", "build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(buildPath, "index.html"))
  );
} else {
  console.warn("React build not found. Static files won't be served.");
}

// ─── START SERVER ─────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
