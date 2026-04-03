module.exports = (app) => {
  const events = require("../controllers/events.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Events
   *   description: Управление событиями
   */

  /**
   * @swagger
   * /api/events:
   *   post:
   *     summary: Создать событие
   *     tags: [Events]
   */
  router.post("/", events.create);

  /**
   * @swagger
   * /api/events:
   *   get:
   *     summary: Получить все события
   *     tags: [Events]
   */
  router.get("/", events.findAll);

  /**
   * @swagger
   * /api/events/by-date:
   *   get:
   *     summary: Получить события по диапазону дат
   *     tags: [Events]
   *     parameters:
   *       - in: query
   *         name: start_date
   *         required: true
   *         schema:
   *           type: string
   *         description: Start date (ISO)
   *       - in: query
   *         name: end_date
   *         required: true
   *         schema:
   *           type: string
   *         description: End date (ISO)
   *       - in: query
   *         name: course_id
   *         required: false
   *         schema:
   *           type: string
   */
  router.get("/by-date", events.findByDateRangeRaw);

  /**
   * @swagger
   * /api/events/{id}:
   *   get:
   *     summary: Получить событие по ID
   *     tags: [Events]
   */
  router.get("/:id", events.findOne);

  /**
   * @swagger
   * /api/events/{id}:
   *   put:
   *     summary: Обновить событие
   *     tags: [Events]
   */
  router.put("/:id", events.update);

  /**
   * @swagger
   * /api/events/{id}:
   *   delete:
   *     summary: Удалить событие
   *     tags: [Events]
   */
  router.delete("/:id", events.delete);

  app.use("/api/events", router);
};