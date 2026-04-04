module.exports = app => {
  const courses = require("../controllers/course.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Courses
   *   description: Course management
   */

  /**
   * @swagger
   * /api/courses:
   *   post:
   *     summary: Create course
   *     tags: [Courses]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CourseCreateInput'
   *     responses:
   *       200:
   *         description: Created course
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Course'
   */
  router.post("/", courses.create);

  /**
   * @swagger
   * /api/courses:
   *   get:
   *     summary: Get all courses
   *     tags: [Courses]
   *     responses:
   *       200:
   *         description: Courses list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Course'
   */
  router.get("/", courses.findAll);

  /**
   * @swagger
   * /api/courses/with-teacher:
   *   get:
   *     summary: Get courses with teacher name
   *     tags: [Courses]
   *     parameters:
   *       - in: query
   *         name: teacher_id
   *         required: false
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Courses list with teacher names
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CourseWithTeacher'
   */
  router.get("/with-teacher", courses.findAllWithTeacherRaw);

  /**
   * @swagger
   * /api/courses/{id}:
   *   get:
   *     summary: Get course by id
   *     tags: [Courses]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Course found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Course'
   *       404:
   *         description: Course not found
   */
  router.get("/:id", courses.findOne);

  /**
   * @swagger
   * /api/courses/{id}:
   *   put:
   *     summary: Update course by id
   *     tags: [Courses]
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
   *             $ref: '#/components/schemas/CourseUpdateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: Course not found
   */
  router.put("/:id", courses.update);

  /**
   * @swagger
   * /api/courses/{id}:
   *   delete:
   *     summary: Delete course by id
   *     tags: [Courses]
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
   *         description: Course not found
   */
  router.delete("/:id", courses.delete);

  app.use("/api/courses", router);
};
