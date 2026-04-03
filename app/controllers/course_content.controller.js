const db = require("../models");
const Content = db.course_content;

/**
 * CREATE
 */
exports.create = (req, res) => {
  Content.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * GET ALL
 */
exports.findAll = (req, res) => {
  Content.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * GET BY ID
 */
exports.findOne = (req, res) => {
  Content.findByPk(req.params.id)
    .then(data => {
      if (!data) return res.status(404).send({ message: "Not found" });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * UPDATE
 */
exports.update = (req, res) => {
  Content.update(req.body, { where: { id: req.params.id } })
    .then(([count]) => {
      if (!count) return res.status(404).send({ message: "Not found" });
      res.send({ message: "Updated!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * DELETE
 */
exports.delete = (req, res) => {
  Content.destroy({ where: { id: req.params.id } })
    .then(count => {
      if (!count) return res.status(404).send({ message: "Not found" });
      res.send({ message: "Deleted!" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

/**
 * RAW: GET BY COURSE ID
 */
exports.findByCourseIdRaw = async (req, res) => {
  try {
    const courseId = req.params.course_id;

    const content = await db.sequelize.query(
      `
      SELECT *
      FROM course_content
      WHERE course_id = :course_id
      ORDER BY position ASC
      `,
      {
        replacements: { course_id: courseId },
        model: Content,
        mapToModel: true,
      }
    );

    res.send(content);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};