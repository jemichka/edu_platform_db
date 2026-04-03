const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// sequelize instance
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    define: {
      underscored: true,  
    },

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },

    logging: false,
  }
);

const db = {};

// core
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*
  MODELS
*/

// users
db.users = require("./user.model.js")(sequelize, Sequelize);

// courses
db.courses = require("./course.model.js")(sequelize, Sequelize);

// course content
db.courseContent = require("./courseContent.model.js")(sequelize, Sequelize);

// enrollments
db.enrollments = require("./enrollment.model.js")(sequelize, Sequelize);

// events
db.events = require("./events.model.js")(sequelize, Sequelize);

// event participants
db.eventParticipants = require("./eventParticipant.model.js")(sequelize, Sequelize);

// USER → COURSES (teacher)
db.users.hasMany(db.courses, {
  foreignKey: "teacher_id",
  as: "taughtCourses",
});

db.courses.belongsTo(db.users, {
  foreignKey: "teacher_id",
  as: "teacher",
});

// COURSE → CONTENT
db.courses.hasMany(db.courseContent, {
  foreignKey: "course_id",
  as: "content",
});

db.courseContent.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course",
});

// USER ↔ COURSES (ENROLLMENTS)
db.users.belongsToMany(db.courses, {
  through: db.enrollments,
  foreignKey: "user_id",
  otherKey: "course_id",
  as: "enrolledCourses",
});

db.courses.belongsToMany(db.users, {
  through: db.enrollments,
  foreignKey: "course_id",
  otherKey: "user_id",
  as: "students",
});

// COURSE → ENROLLMENTS
db.courses.hasMany(db.enrollments, {
  foreignKey: "course_id",
  as: "enrollments",
});

db.enrollments.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course",
});

db.users.hasMany(db.enrollments, {
  foreignKey: "user_id",
  as: "enrollments",
});

db.enrollments.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

// COURSE → EVENTS
db.courses.hasMany(db.events, {
  foreignKey: "course_id",
  as: "events",
});

db.events.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course",
});

// EVENT → PARTICIPANTS
db.events.hasMany(db.eventParticipants, {
  foreignKey: "event_id",
  as: "participants",
});

db.eventParticipants.belongsTo(db.events, {
  foreignKey: "event_id",
  as: "event",
});

db.users.hasMany(db.eventParticipants, {
  foreignKey: "user_id",
  as: "eventParticipation",
});

db.eventParticipants.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

/* DB CONNECTION CHECK */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connection established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to PostgreSQL:", err.message);
  });

module.exports = db;