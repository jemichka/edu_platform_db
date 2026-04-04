module.exports = app => {
  const content = require("../controllers/course_content.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: CourseContent
   *   description: Course content management
   */

  /**
   * @swagger
   * /api/content:
   *   post:
   *     summary: Create course content
   *     tags: [CourseContent]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CourseContentCreateInput'
   *     responses:
   *       201:
   *         description: Created content item
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CourseContent'
   */
  router.post("/", content.create);

  /**
   * @swagger
   * /api/content:
   *   get:
   *     summary: Get all course content
   *     tags: [CourseContent]
   *     responses:
   *       200:
   *         description: Content list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CourseContent'
   */
  router.get("/", content.findAll);

  /**
   * @swagger
   * /api/content/course/{course_id}:
   *   get:
   *     summary: Get content by course id
   *     tags: [CourseContent]
   *     parameters:
   *       - in: path
   *         name: course_id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Content list for course
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CourseContent'
   */
  router.get("/course/:course_id", content.findByCourseIdRaw);

  /**
   * @swagger
   * /api/content/{id}:
   *   get:
   *     summary: Get content by id
   *     tags: [CourseContent]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Content item found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CourseContent'
   *       404:
   *         description: Content not found
   */
  router.get("/:id", content.findOne);

  /**
   * @swagger
   * /api/content/{id}:
   *   put:
   *     summary: Update content by id
   *     tags: [CourseContent]
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
   *             $ref: '#/components/schemas/CourseContentUpdateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: Content not found
   */
  router.put("/:id", content.update);

  /**
   * @swagger
   * /api/content/{id}:
   *   delete:
   *     summary: Delete content by id
   *     tags: [CourseContent]
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
   *         description: Content not found
   */
  router.delete("/:id", content.delete);

  app.use("/api/content", router);
};
