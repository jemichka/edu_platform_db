module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    full_name: {
      type: Sequelize.STRING(255)
    },
    role: {
      type: Sequelize.STRING(20) // student | teacher | admin
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: "users",
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password_hash"] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password_hash"] }
      }
    }
  });

  return User;
};
