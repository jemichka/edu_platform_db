module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Create a user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserCreateInput'
   *     responses:
   *       201:
   *         description: Created user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Validation error
   *       409:
   *         description: Email already exists
   */
  router.post("/", users.create);

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Users list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  router.get("/", users.findAll);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */
  router.get("/:id", users.findOne);

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Update user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserUpdateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: User not found
   */
  router.put("/:id", users.update);

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Delete user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Delete result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: User not found
   */
  router.delete("/:id", users.delete);

  /**
   * @swagger
   * /api/users/domain/{domain}:
   *   get:
   *     summary: Get users by email domain
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: domain
   *         required: true
   *         schema:
   *           type: string
   *         example: gmail.com
   *     responses:
   *       200:
   *         description: Users list filtered by domain
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     format: uuid
   *                   email:
   *                     type: string
   *                     format: email
   *                   fullName:
   *                     type: string
   *                   role:
   *                     type: string
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   */
  router.get("/domain/:domain", users.findByEmailDomain);

  app.use("/api/users", router);
};
