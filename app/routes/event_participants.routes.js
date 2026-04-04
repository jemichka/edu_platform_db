module.exports = (app) => {
  const participants = require("../controllers/event_participants.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: EventParticipants
   *   description: Event participant management
   */

  /**
   * @swagger
   * /api/participants:
   *   post:
   *     summary: Create event participant
   *     tags: [EventParticipants]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/EventParticipantCreateInput'
   *     responses:
   *       201:
   *         description: Created participant
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/EventParticipant'
   *       409:
   *         description: Duplicate participant
   */
  router.post("/", participants.create);

  /**
   * @swagger
   * /api/participants:
   *   get:
   *     summary: Get all event participants
   *     tags: [EventParticipants]
   *     responses:
   *       200:
   *         description: Participants list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/EventParticipant'
   */
  router.get("/", participants.findAll);

  /**
   * @swagger
   * /api/participants/event/{event_id}:
   *   get:
   *     summary: Get participants by event id with user emails
   *     tags: [EventParticipants]
   *     parameters:
   *       - in: path
   *         name: event_id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Participants for event
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/EventParticipantWithEmail'
   */
  router.get("/event/:event_id", participants.findByEventWithUsersRaw);

  /**
   * @swagger
   * /api/participants/{id}:
   *   get:
   *     summary: Get event participant by id
   *     tags: [EventParticipants]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Participant found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/EventParticipant'
   *       404:
   *         description: Participant not found
   */
  router.get("/:id", participants.findOne);

  /**
   * @swagger
   * /api/participants/{id}:
   *   put:
   *     summary: Update event participant by id
   *     tags: [EventParticipants]
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
   *             $ref: '#/components/schemas/EventParticipantCreateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: Participant not found
   */
  router.put("/:id", participants.update);

  /**
   * @swagger
   * /api/participants/{id}:
   *   delete:
   *     summary: Delete event participant by id
   *     tags: [EventParticipants]
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
   *         description: Participant not found
   */
  router.delete("/:id", participants.delete);

  app.use("/api/participants", router);
};
