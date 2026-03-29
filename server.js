require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// ROUTES
// =====================
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EduPlatform application." });
});

// =====================
// DB
// =====================
const db = require("./app/models");

const PORT = process.env.PORT || 8080;

// =====================
// STARTUP FLOW
// =====================
db.sequelize
  .sync({ alter: true })   // 🔥 ВАЖНО
  .then(() => {
    console.log("✅ Database synced.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });