const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Protected test route
const protect = require("./middleware/authMiddleware");
app.get("/api/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to Dayboard dashboard",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});     
