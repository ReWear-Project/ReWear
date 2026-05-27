import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

//
// CREATE ORDER
//
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      items: req.body.items,
      total: req.body.total,
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

//
// GET USER ORDERS
//
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

//
// DELETE ORDER
//
router.delete("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    // ORDER NOT FOUND
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // SECURITY CHECK
    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // DELETE
    await order.deleteOne();

    res.json({
      message:
        "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete order",
    });
  }
});

export default router;