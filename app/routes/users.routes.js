module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Управление пользователями
   */

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Создать пользователя
   *     tags: [Users]
   */
  router.post("/", users.create);

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Получить всех пользователей
   *     tags: [Users]
   */
  router.get("/", users.findAll);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Получить пользователя по ID
   *     tags: [Users]
   */
  router.get("/:id", users.findOne);

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Обновить пользователя
   *     tags: [Users]
   */
  router.put("/:id", users.update);

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Удалить пользователя
   *     tags: [Users]
   */
  router.delete("/:id", users.delete);

  /**
   * @swagger
   * /api/users/domain/{domain}:
   *   get:
   *     summary: Получить пользователей по домену электронной почты
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: domain
   *         required: true
   *         schema:
   *           type: string
   *         example: gmail.com
   */
  router.get("/domain/:domain", users.findByEmailDomain);

  app.use("/api/users", router);
};