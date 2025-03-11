// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // ✅ Load environment variables

// Configure environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fartun"; // ✅ Use env variable
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "mystrongsecretkey";

// Connect to MongoDB
mongoose.set("strictQuery", false); // ✅ Recommended setting
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Create an Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Import routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
  next(); // ✅ Ensure error middleware flow continues
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection:", reason);
  process.exit(1);
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
 