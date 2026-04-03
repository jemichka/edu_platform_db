const db = require("../models");
const Participant = db.eventParticipants;
const { Sequelize } = db;

const handleError = (res, err, message = "Server error") => {
  console.error(err);
  return res.status(500).send({ message, error: err.message });
};

exports.create = async (req, res) => {
  try {
    if (!req.body.event_id || !req.body.user_id) {
      return res.status(400).send({ message: "event_id and user_id are required" });
    }

    const data = await Participant.create(req.body);
    return res.status(201).send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Participant.findAll();
    return res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Participant.findByPk(id);
    if (!data) return res.status(404).send({ message: "Participant not found" });

    return res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Participant.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).send({ message: "Participant not found" });
    }

    return res.send({ message: "Updated successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Participant.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Participant not found" });
    }

    return res.send({ message: "Deleted successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findByEventWithUsersRaw = async (req, res) => {
  try {
    const eventId = req.params.event_id;

    if (!eventId) {
      return res.status(400).send({ message: "event_id is required" });
    }

    const participants = await db.sequelize.query(
      `
      SELECT ep.*, u.email
      FROM event_participants ep
      JOIN users u ON ep.user_id = u.id
      WHERE ep.event_id = :event_id
      `,
      {
        replacements: { event_id: eventId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return res.send(participants);
  } catch (err) {
    return handleError(res, err);
  }
};