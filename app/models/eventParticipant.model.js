module.exports = (sequelize, Sequelize) => {
  const EventParticipant = sequelize.define("event_participant", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    event_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "events",
        key: "id"
      }
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    status: {
      type: Sequelize.STRING(20)
    }
  }, {
    tableName: "event_participants",
    timestamps: false
  });

  return EventParticipant;
};