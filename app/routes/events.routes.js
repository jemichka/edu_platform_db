module.exports = (app) => {
  const events = require("../controllers/events.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Events
   *   description: Event management
   */

  /**
   * @swagger
   * /api/events:
   *   post:
   *     summary: Create event
   *     tags: [Events]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/EventCreateInput'
   *     responses:
   *       201:
   *         description: Created event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   */
  router.post("/", events.create);

  /**
   * @swagger
   * /api/events:
   *   get:
   *     summary: Get all events
   *     tags: [Events]
   *     responses:
   *       200:
   *         description: Events list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Event'
   */
  router.get("/", events.findAll);

  /**
   * @swagger
   * /api/events/by-date:
   *   get:
   *     summary: Get events by date range
   *     tags: [Events]
   *     parameters:
   *       - in: query
   *         name: start_date
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *       - in: query
   *         name: end_date
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *       - in: query
   *         name: course_id
   *         required: false
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Events list in date range
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Event'
   */
  router.get("/by-date", events.findByDateRangeRaw);

  /**
   * @swagger
   * /api/events/{id}:
   *   get:
   *     summary: Get event by id
   *     tags: [Events]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Event found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Event'
   *       404:
   *         description: Event not found
   */
  router.get("/:id", events.findOne);

  /**
   * @swagger
   * /api/events/{id}:
   *   put:
   *     summary: Update event by id
   *     tags: [Events]
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
   *             $ref: '#/components/schemas/EventUpdateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: Event not found
   */
  router.put("/:id", events.update);

  /**
   * @swagger
   * /api/events/{id}:
   *   delete:
   *     summary: Delete event by id
   *     tags: [Events]
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
   *         description: Event not found
   */
  router.delete("/:id", events.delete);

  app.use("/api/events", router);
};
