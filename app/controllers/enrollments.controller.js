const db = require("../models");
const Enrollment = db.enrollments;

/**
 * CREATE
 */
exports.create = (req, res) => {
  if (!req.body.user_id || !req.body.course_id) {
    return res.status(400).send({ message: "user_id and course_id required" });
  }

  Enrollment.findOne({
    where: {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
    },
  })
    .then(existing => {
      if (existing) {
        return res.status(409).send({ message: "User is already enrolled in this course" });
      }

      return Enrollment.create(req.body).then(data => res.status(201).send(data));
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).send({ message: "User is already enrolled in this course" });
      }

      return res.status(500).send({ message: err.message });
    });
};

/**
 * FIND ALL
 */
exports.findAll = (req, res) => {
  Enrollment.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * FIND ONE
 */
exports.findOne = (req, res) => {
  Enrollment.findByPk(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Enrollment not found" });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * UPDATE
 */
exports.update = (req, res) => {
  Enrollment.update(req.body, { where: { id: req.params.id } })
    .then(([count]) => {
      if (!count) return res.status(404).send({ message: "Enrollment not found" });
      res.send({ message: "Updated!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * DELETE
 */
exports.delete = (req, res) => {
  Enrollment.destroy({ where: { id: req.params.id } })
    .then(count => {
      if (!count) return res.status(404).send({ message: "Enrollment not found" });
      res.send({ message: "Deleted!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * STATS: students count per course
 */
exports.getStudentsCountByCourseRaw = async (req, res) => {
  try {
    const courseId = req.query.course_id;

    const query = `
      SELECT 
        e.course_id,
        COUNT(DISTINCT e.user_id) AS students_count
      FROM enrollments e
      ${courseId ? "WHERE e.course_id = :course_id" : ""}
      GROUP BY e.course_id
      ORDER BY students_count DESC
    `;

    const result = await db.sequelize.query(query, {
      replacements: courseId ? { course_id: courseId } : {},
      type: db.Sequelize.QueryTypes.SELECT,
    });

    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
