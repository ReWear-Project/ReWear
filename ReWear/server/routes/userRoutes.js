import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  const orders = await Order.find({ user: req.user._id });

  res.json({
    totalProducts: products.length,
    totalOrders: orders.length
  });
});

export default router;