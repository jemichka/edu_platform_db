module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("enrollment", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    course_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id"
      }
    },
    status: {
      type: Sequelize.STRING(20),
      defaultValue: "active"
    },
    progress: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    enrolled_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: "enrollments",
    timestamps: false
  });

  return Enrollment;
};