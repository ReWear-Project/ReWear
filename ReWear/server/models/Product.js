import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  images: [String],
  price: Number,
  rent: Number,
  mode: String,
  category: String,
  size: String,
  condition: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);