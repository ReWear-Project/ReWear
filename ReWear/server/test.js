import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongo Connected Successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("❌ Connection Failed:", err.message);
    process.exit();
  });