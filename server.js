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
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            full_name: { type: "string" },
            role: { type: "string", enum: ["student", "teacher", "admin"] },
            created_at: { type: "string", format: "date-time" }
          }
        },
        UserCreateInput: {
          type: "object",
          required: ["email", "password_hash"],
          properties: {
            email: { type: "string", format: "email" },
            password_hash: { type: "string" },
            full_name: { type: "string" },
            role: { type: "string", enum: ["student", "teacher", "admin"] }
          }
        },
        UserUpdateInput: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password_hash: { type: "string" },
            full_name: { type: "string" },
            role: { type: "string", enum: ["student", "teacher", "admin"] }
          }
        },
        Course: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            teacher_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" }
          }
        },
        CourseCreateInput: {
          type: "object",
          required: ["title", "teacher_id"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            teacher_id: { type: "string", format: "uuid" }
          }
        },
        CourseUpdateInput: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            teacher_id: { type: "string", format: "uuid" }
          }
        },
        CourseWithTeacher: {
          allOf: [
            { $ref: "#/components/schemas/Course" },
            {
              type: "object",
              properties: {
                teacher_name: { type: "string", nullable: true }
              }
            }
          ]
        },
        CourseContent: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            content: { type: "string" },
            video_url: { type: "string", nullable: true },
            position: { type: "integer" },
            type: { type: "string", enum: ["module", "lesson"] }
          }
        },
        CourseContentCreateInput: {
          type: "object",
          required: ["course_id"],
          properties: {
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            content: { type: "string" },
            video_url: { type: "string" },
            position: { type: "integer" },
            type: { type: "string", enum: ["module", "lesson"] }
          }
        },
        CourseContentUpdateInput: {
          type: "object",
          properties: {
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            content: { type: "string" },
            video_url: { type: "string" },
            position: { type: "integer" },
            type: { type: "string", enum: ["module", "lesson"] }
          }
        },
        Enrollment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            user_id: { type: "string", format: "uuid" },
            course_id: { type: "string", format: "uuid" },
            status: { type: "string" },
            progress: { type: "integer" },
            enrolled_at: { type: "string", format: "date-time" }
          }
        },
        EnrollmentCreateInput: {
          type: "object",
          required: ["user_id", "course_id"],
          properties: {
            user_id: { type: "string", format: "uuid" },
            course_id: { type: "string", format: "uuid" },
            status: { type: "string" },
            progress: { type: "integer" }
          }
        },
        EnrollmentUpdateInput: {
          type: "object",
          properties: {
            status: { type: "string" },
            progress: { type: "integer" }
          }
        },
        EnrollmentStats: {
          type: "object",
          properties: {
            course_id: { type: "string", format: "uuid" },
            students_count: { type: "string" }
          }
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            start_time: { type: "string", format: "date-time" },
            end_time: { type: "string", format: "date-time", nullable: true },
            location: { type: "string", nullable: true },
            created_at: { type: "string", format: "date-time" }
          }
        },
        EventCreateInput: {
          type: "object",
          required: ["title", "course_id", "start_time"],
          properties: {
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            start_time: { type: "string", format: "date-time" },
            end_time: { type: "string", format: "date-time" },
            location: { type: "string" }
          }
        },
        EventUpdateInput: {
          type: "object",
          properties: {
            course_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            start_time: { type: "string", format: "date-time" },
            end_time: { type: "string", format: "date-time" },
            location: { type: "string" }
          }
        },
        EventParticipant: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            event_id: { type: "string", format: "uuid" },
            user_id: { type: "string", format: "uuid" },
            status: { type: "string" }
          }
        },
        EventParticipantCreateInput: {
          type: "object",
          required: ["event_id", "user_id"],
          properties: {
            event_id: { type: "string", format: "uuid" },
            user_id: { type: "string", format: "uuid" },
            status: { type: "string" }
          }
        },
        EventParticipantWithEmail: {
          allOf: [
            { $ref: "#/components/schemas/EventParticipant" },
            {
              type: "object",
              properties: {
                email: { type: "string", format: "email" }
              }
            }
          ]
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
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
