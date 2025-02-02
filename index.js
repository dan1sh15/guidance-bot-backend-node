const express = require("express");
const app = express();
const { dbConnect } = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

// Load environment variables from .env file
require("dotenv").config();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS to allow cross-origin requests
app.use(
  cors({
    origin: "*", // Allows requests from all origins (Can be restricted for security)
  })
);

// Define the port from environment variables or use default (4000)
const PORT = process.env.PORT || 4000;

// Root route to check server status
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is up and running...",
  });
});

// Connect to MongoDB database
dbConnect();

// Mount authentication routes under /api/v1/auth
app.use("/api/v1/auth", userRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`App is running successfully at port: ${PORT}`);
});
