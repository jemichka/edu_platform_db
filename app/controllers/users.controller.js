const db = require("../models");
const User = db.users;
const sequelize = db.sequelize;
const { Sequelize } = db;

const sanitizeUser = (user) => {
  const values = user && typeof user.get === "function" ? user.get({ plain: true }) : user;
  if (!values) {
    return values;
  }

  const { password_hash, ...safeUser } = values;
  return safeUser;
};

const handleError = (res, err, message = "Server error") => {
  console.error(err);
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({
      message: "User with this email already exists",
      error: err.message,
    });
  }
  return res.status(500).send({
    message,
    error: err.message,
  });
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    if (!password_hash) {
      return res.status(400).send({ message: "Password is required" });
    }

    const user = await User.create(req.body);
    return res.status(201).send(sanitizeUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

// GET ALL
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.send(users);
  } catch (err) {
    return handleError(res, err);
  }
};

// GET ONE
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send(sanitizeUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await User.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send({ message: "Updated successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await User.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send({ message: "Deleted successfully" });
  } catch (err) {
    return handleError(res, err);
  }
};

// RAW QUERY: users by email domain
exports.findByEmailDomain = async (req, res) => {
  try {
    const domain = req.params.domain;

    if (!domain) {
      return res.status(400).send({ message: "Domain is required" });
    }

    const results = await sequelize.query(
      `
      SELECT id, email, full_name, role, created_at
      FROM users
      WHERE email LIKE :pattern
      ORDER BY created_at DESC
      `,
      {
        replacements: { pattern: `%@${domain}` },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const users = results.map((u) => ({
      id: u.id,
      email: u.email,
      fullName: u.full_name,
      role: u.role,
      createdAt: u.created_at,
    }));

    return res.send(users);
  } catch (err) {
    return handleError(res, err);
  }
};
