const db = require("../models");
const Course = db.courses;

/**
 * CREATE
 */
exports.create = (req, res) => {
  if (!req.body.title || !req.body.teacher_id) {
    return res.status(400).send({ message: "title and teacher_id required!" });
  }

  Course.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * FIND ALL
 */
exports.findAll = (req, res) => {
  Course.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * FIND ONE
 */
exports.findOne = (req, res) => {
  Course.findByPk(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Course not found" });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * UPDATE
 */
exports.update = (req, res) => {
  Course.update(req.body, { where: { id: req.params.id } })
    .then(([count]) => {
      if (!count) return res.status(404).send({ message: "Course not found" });
      res.send({ message: "Updated!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * DELETE
 */
exports.delete = (req, res) => {
  Course.destroy({ where: { id: req.params.id } })
    .then(count => {
      if (!count) return res.status(404).send({ message: "Course not found" });
      res.send({ message: "Deleted!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * RAW: courses + teacher join
 */
exports.findAllWithTeacherRaw = async (req, res) => {
  try {
    const teacherId = req.query.teacher_id;

    const query = `
      SELECT c.*, u.full_name AS teacher_name
      FROM courses c
      LEFT JOIN users u ON c.teacher_id = u.id
      ${teacherId ? "WHERE c.teacher_id = :teacher_id" : ""}
      ORDER BY c.created_at DESC
    `;

    const courses = await db.sequelize.query(query, {
      replacements: teacherId ? { teacher_id: teacherId } : {},
      model: Course,
      mapToModel: true,
    });

    res.send(courses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};