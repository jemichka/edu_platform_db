module.exports = (sequelize, Sequelize) => {
  const CourseContent = sequelize.define("course_content", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    course_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id"
      }
    },
    title: {
      type: Sequelize.STRING(255)
    },
    content: {
      type: Sequelize.TEXT
    },
    video_url: {
      type: Sequelize.TEXT
    },
    position: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.STRING(20) // module | lesson
    }
  }, {
    tableName: "course_content",
    timestamps: false
  });

  return CourseContent;
};