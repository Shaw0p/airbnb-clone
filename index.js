import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// ✅ Set CORS options for local frontend (Vite on port 5173)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// ✅ Start server only after DB connects
app.listen(port, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${port}`);
});
