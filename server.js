require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// SWAGGER SETUP
// =====================
const PORT = process.env.PORT || 8080;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EduPlatform API",
      version: "1.0.0",
      description: "API documentation"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ["./app/routes/*.js"] // где искать swagger-аннотации
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =====================
// DB
// =====================
const db = require("./app/models");

// =====================
// ROUTES
// =====================
require("./app/routes/users.routes")(app);
require("./app/routes/course.routes")(app);
require("./app/routes/course_content.routes")(app);
require("./app/routes/enrollments.routes")(app);
require("./app/routes/events.routes")(app);
require("./app/routes/event_participants.routes")(app);

// =====================
// TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EduPlatform application." });
});

// =====================
// STARTUP FLOW
// =====================
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });