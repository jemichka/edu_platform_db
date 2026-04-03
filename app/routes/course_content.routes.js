module.exports = app => {
  const content = require("../controllers/course_content.controller.js");
  const router = require("express").Router();

/**
 * =========================
 * SWAGGER TAGS
 * =========================
 */
/**
 * @swagger
 * tags:
 *   name: CourseContent
 *   description: Контент курсов
 */

/**
 * =========================
 * CREATE
 * =========================
 */
/**
 * @swagger
 * /api/content:
 *   post:
 *     summary: Создать контент курса
 *     tags: [CourseContent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_id
 *             properties:
 *               course_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               video_url:
 *                 type: string
 *               position:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [module, lesson]
 *     responses:
 *       200:
 *         description: Created
 */
router.post("/", content.create);

/**
 * =========================
 * GET ALL
 * =========================
 */
/**
 * @swagger
 * /api/content:
 *   get:
 *     summary: Получить весь контент
 *     tags: [CourseContent]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", content.findAll);

/**
 * =========================
 * GET BY COURSE ID (SPECIFIC → ВЫШЕ /:id)
 * =========================
 */
/**
 * @swagger
 * /api/content/course/{course_id}:
 *   get:
 *     summary: Получить контент по course_id
 *     tags: [CourseContent]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/course/:course_id", content.findByCourseIdRaw);

/**
 * =========================
 * GET BY ID
 * =========================
 */
/**
 * @swagger
 * /api/content/{id}:
 *   get:
 *     summary: Получить контент по ID
 *     tags: [CourseContent]
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
router.get("/:id", content.findOne);

/**
 * =========================
 * UPDATE
 * =========================
 */
/**
 * @swagger
 * /api/content/{id}:
 *   put:
 *     summary: Обновить контент
 *     tags: [CourseContent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", content.update);

/**
 * =========================
 * DELETE
 * =========================
 */
/**
 * @swagger
 * /api/content/{id}:
 *   delete:
 *     summary: Удалить контент
 *     tags: [CourseContent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", content.delete);

/**
 * =========================
 * MOUNT ROUTER
 * =========================
 */
app.use("/api/content", router);
};