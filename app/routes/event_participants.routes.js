module.exports = (app) => {
  const participants = require("../controllers/event_participants.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: EventParticipants
   *   description: Управление участниками мероприятия
   */

  /**
   * @swagger
   * /api/participants:
   *   post:
   *     summary: Создать участника
   *     tags: [EventParticipants]
   */
  router.post("/", participants.create);

  /**
   * @swagger
   * /api/participants:
   *   get:
   *     summary: Получить всех участников
   *     tags: [EventParticipants]
   */
  router.get("/", participants.findAll);

  /**
   * @swagger
   * /api/participants/event/{event_id}:
   *   get:
   *     summary: Получить участников по событиям с помощью адресов электронной почты 
   *     tags: [EventParticipants]
   *     parameters:
   *       - in: path
   *         name: event_id
   *         required: true
   *         schema:
   *           type: string
   */
  router.get("/event/:event_id", participants.findByEventWithUsersRaw);

  /**
   * @swagger
   * /api/participants/{id}:
   *   get:
   *     summary: Получить участника по ID
   *     tags: [EventParticipants]
   */
  router.get("/:id", participants.findOne);

  /**
   * @swagger
   * /api/participants/{id}:
   *   put:
   *     summary: Обновить участника
   *     tags: [EventParticipants]
   */
  router.put("/:id", participants.update);

  /**
   * @swagger
   * /api/participants/{id}:
   *   delete:
   *     summary: Удалить участника
   *     tags: [EventParticipants]
   */
  router.delete("/:id", participants.delete);

  app.use("/api/participants", router);
};