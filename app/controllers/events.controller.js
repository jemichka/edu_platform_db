const db = require("../models");
const Event = db.events;
const { Sequelize } = db;

const handleError = (res, err, message = "Server error") => {
  console.error(err);
  return res.status(500).send({
    message,
    error: err.message,
  });
};

exports.create = async (req, res) => {
  try {
    const { title, course_id, start_time } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }

    if (!course_id) {
      return res.status(400).send({ message: "course_id is required" });
    }

    if (!start_time) {
      return res.status(400).send({ message: "start_time is required" });
    }

    const data = await Event.create(req.body);
    return res.status(201).send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Event.findAll({
      order: [["start_time", "ASC"]],
    });

    return res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Event.findByPk(id);
    if (!data) {
      return res.status(404).send({ message: "Event not found" });
    }

    return res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Event.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).send({ message: "Event not found" });
    }

    return res.send({ message: "Updated successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Event.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).send({ message: "Event not found" });
    }

    return res.send({ message: "Deleted successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.findByDateRangeRaw = async (req, res) => {
  try {
    const { start_date, end_date, course_id } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).send({
        message: "start_date and end_date are required",
      });
    }

    const query = `
      SELECT *
      FROM events
      WHERE start_time BETWEEN :start_date AND :end_date
      ${course_id ? "AND course_id = :course_id" : ""}
      ORDER BY start_time ASC
    `;

    const events = await db.sequelize.query(query, {
      replacements: {
        start_date,
        end_date,
        ...(course_id && { course_id }),
      },
      type: Sequelize.QueryTypes.SELECT,
    });

    return res.send(events);
  } catch (err) {
    return handleError(res, err);
  }
};