module.exports = app => {
  const enrollments = require("../controllers/enrollments.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Enrollments
   *   description: Enrollment management
   */

  /**
   * @swagger
   * /api/enrollments:
   *   post:
   *     summary: Create enrollment
   *     tags: [Enrollments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/EnrollmentCreateInput'
   *     responses:
   *       201:
   *         description: Created enrollment
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Enrollment'
   *       409:
   *         description: Duplicate enrollment
   */
  router.post("/", enrollments.create);

  /**
   * @swagger
   * /api/enrollments:
   *   get:
   *     summary: Get all enrollments
   *     tags: [Enrollments]
   *     responses:
   *       200:
   *         description: Enrollments list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Enrollment'
   */
  router.get("/", enrollments.findAll);

  /**
   * @swagger
   * /api/enrollments/stats/count-by-course:
   *   get:
   *     summary: Get student counts by course
   *     tags: [Enrollments]
   *     parameters:
   *       - in: query
   *         name: course_id
   *         required: false
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Students count by course
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/EnrollmentStats'
   */
  router.get("/stats/count-by-course", enrollments.getStudentsCountByCourseRaw);

  /**
   * @swagger
   * /api/enrollments/{id}:
   *   get:
   *     summary: Get enrollment by id
   *     tags: [Enrollments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Enrollment found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Enrollment'
   *       404:
   *         description: Enrollment not found
   */
  router.get("/:id", enrollments.findOne);

  /**
   * @swagger
   * /api/enrollments/{id}:
   *   put:
   *     summary: Update enrollment by id
   *     tags: [Enrollments]
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
   *             $ref: '#/components/schemas/EnrollmentUpdateInput'
   *     responses:
   *       200:
   *         description: Update result
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MessageResponse'
   *       404:
   *         description: Enrollment not found
   */
  router.put("/:id", enrollments.update);

  /**
   * @swagger
   * /api/enrollments/{id}:
   *   delete:
   *     summary: Delete enrollment by id
   *     tags: [Enrollments]
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
   *         description: Enrollment not found
   */
  router.delete("/:id", enrollments.delete);

  app.use("/api/enrollments", router);
};
