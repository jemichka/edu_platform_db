module.exports = app => {
  const enrollments = require("../controllers/enrollments.controller.js");
  const router = require("express").Router();

/**
 * =========================
 * TAG
 * =========================
 */
/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Записи пользователей на курсы
 */

/**
 * =========================
 * CREATE
 * =========================
 */
/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Записать пользователя на курс
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - course_id
 *             properties:
 *               user_id:
 *                 type: string
 *               course_id:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: active
 *               progress:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Created
 */
router.post("/", enrollments.create);

/**
 * =========================
 * GET ALL
 * =========================
 */
/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Получить все записи
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", enrollments.findAll);

/**
 * =========================
 * STATS
 * =========================
 */
/**
 * @swagger
 * /api/enrollments/stats/count-by-course:
 *   get:
 *     summary: Количество студентов по курсам
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: course_id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/stats/count-by-course", enrollments.getStudentsCountByCourseRaw);

/**
 * =========================
 * GET BY ID
 * =========================
 */
/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Получить запись по ID
 *     tags: [Enrollments]
 */
router.get("/:id", enrollments.findOne);

/**
 * =========================
 * UPDATE
 * =========================
 */
/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Обновить запись
 *     tags: [Enrollments]
 */
router.put("/:id", enrollments.update);

/**
 * =========================
 * DELETE
 * =========================
 */
/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Удалить запись
 *     tags: [Enrollments]
 */
router.delete("/:id", enrollments.delete);

/**
 * =========================
 * MOUNT
 * =========================
 */
app.use("/api/enrollments", router);
};