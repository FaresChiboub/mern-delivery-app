import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

// Accessing the environment variable for the backend URL
const url = process.env.NODE_ENV === 'production'
  ? "https://mern-delivery-app-1.onrender.com"
  : "http://localhost:5001";

// App config
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", async (req, res) => {
  res.send("Server running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} => http://localhost:${PORT}/`);
});
