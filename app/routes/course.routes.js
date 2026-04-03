module.exports = app => {
  const courses = require("../controllers/course.controller.js");
  const router = require("express").Router();

/**
 * =========================
 * SWAGGER TAG
 * =========================
 */
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Курсы
 */

/**
 * =========================
 * CREATE COURSE
 * =========================
 */
/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создать курс
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - teacher_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               teacher_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created
 */
router.post("/", courses.create);

/**
 * =========================
 * GET ALL COURSES
 * =========================
 */
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Получить все курсы
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", courses.findAll);

/**
 * =========================
 * RAW JOIN (teacher)
 * =========================
 */
/**
 * @swagger
 * /api/courses/with-teacher:
 *   get:
 *     summary: Курсы с преподавателем
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: teacher_id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/with-teacher", courses.findAllWithTeacherRaw);

/**
 * =========================
 * GET BY ID
 * =========================
 */
/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Получить курс по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get("/:id", courses.findOne);

/**
 * =========================
 * UPDATE
 * =========================
 */
/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Обновить курс
 *     tags: [Courses]
 */
router.put("/:id", courses.update);

/**
 * =========================
 * DELETE
 * =========================
 */
/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Удалить курс
 *     tags: [Courses]
 */
router.delete("/:id", courses.delete);

/**
 * =========================
 * MOUNT
 * =========================
 */
app.use("/api/courses", router);
};