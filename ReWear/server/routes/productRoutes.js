import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// CREATE
router.post("/", protect, async (req, res) => {
  const product = await Product.create({
    ...req.body,
    user: req.user._id
  });

  res.json(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

router.delete("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 🔥 IMPORTANT: ownership check
  if (product.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await product.deleteOne();

  res.json({ message: "Product removed" });
});

router.put("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  if (product.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  product.title = req.body.title || product.title;

  const updated = await product.save();

  res.json(updated);
});

export default router;