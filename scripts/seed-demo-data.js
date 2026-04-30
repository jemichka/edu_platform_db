require("dotenv").config();

const db = require("../app/models");

const users = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    email: "admin@eduplatform.ru",
    password_hash: "admin-demo-hash",
    full_name: "Анна Соколова",
    role: "admin",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    email: "teacher.analytics@eduplatform.ru",
    password_hash: "teacher-demo-hash",
    full_name: "Илья Романов",
    role: "teacher",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    email: "teacher.design@eduplatform.ru",
    password_hash: "teacher-demo-hash",
    full_name: "Мария Лебедева",
    role: "teacher",
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    email: "student.one@eduplatform.ru",
    password_hash: "student-demo-hash",
    full_name: "Егор Смирнов",
    role: "student",
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    email: "student.two@eduplatform.ru",
    password_hash: "student-demo-hash",
    full_name: "София Морозова",
    role: "student",
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    email: "student.three@university.ru",
    password_hash: "student-demo-hash",
    full_name: "Тимур Волков",
    role: "student",
  },
];

const courses = [
  {
    id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    title: "Аналитика данных с нуля",
    description: "Базовый курс по аналитике, визуализации и работе с метриками.",
    teacher_id: "22222222-2222-4222-8222-222222222222",
  },
  {
    id: "aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    title: "UX/UI для цифровых продуктов",
    description: "Практический курс по исследованиям, прототипированию и интерфейсам.",
    teacher_id: "33333333-3333-4333-8333-333333333333",
  },
];

const contentItems = [
  {
    id: "bbbbbbb1-bbbb-4bbb-8bbb-bbbbbbbbbbb1",
    course_id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    title: "Модуль 1. Введение в аналитику",
    content: "Разбираем ключевые метрики, постановку вопросов и базовые инструменты.",
    video_url: "https://example.com/analytics-intro",
    position: 1,
    type: "module",
  },
  {
    id: "bbbbbbb2-bbbb-4bbb-8bbb-bbbbbbbbbbb2",
    course_id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    title: "Урок 2. Построение дашбордов",
    content: "Практика визуализации данных и чтения отчётов.",
    video_url: "https://example.com/analytics-dashboards",
    position: 2,
    type: "lesson",
  },
  {
    id: "bbbbbbb3-bbbb-4bbb-8bbb-bbbbbbbbbbb3",
    course_id: "aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    title: "Модуль 1. Исследование пользователей",
    content: "Интервью, CJM и определение точек роста продукта.",
    video_url: "https://example.com/ux-research",
    position: 1,
    type: "module",
  },
];

const enrollments = [
  {
    id: "ccccccc1-cccc-4ccc-8ccc-ccccccccccc1",
    user_id: "44444444-4444-4444-8444-444444444444",
    course_id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    status: "active",
    progress: 35,
  },
  {
    id: "ccccccc2-cccc-4ccc-8ccc-ccccccccccc2",
    user_id: "55555555-5555-4555-8555-555555555555",
    course_id: "aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    status: "active",
    progress: 68,
  },
  {
    id: "ccccccc3-cccc-4ccc-8ccc-ccccccccccc3",
    user_id: "66666666-6666-4666-8666-666666666666",
    course_id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    status: "active",
    progress: 12,
  },
];

const events = [
  {
    id: "ddddddd1-dddd-4ddd-8ddd-ddddddddddd1",
    course_id: "aaaaaaa1-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    title: "Открытый вебинар по аналитике",
    description: "Разбор карьерных траекторий и практических кейсов из аналитики данных.",
    start_time: "2026-05-12T16:00:00.000Z",
    end_time: "2026-05-12T17:30:00.000Z",
    location: "Zoom",
  },
  {
    id: "ddddddd2-dddd-4ddd-8ddd-ddddddddddd2",
    course_id: "aaaaaaa2-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    title: "Практикум по UX-исследованиям",
    description: "Совместная работа над интервью и картой пути пользователя.",
    start_time: "2026-05-15T14:00:00.000Z",
    end_time: "2026-05-15T16:00:00.000Z",
    location: "Аудитория 204",
  },
];

const participants = [
  {
    id: "eeeeeee1-eeee-4eee-8eee-eeeeeeeeeee1",
    event_id: "ddddddd1-dddd-4ddd-8ddd-ddddddddddd1",
    user_id: "44444444-4444-4444-8444-444444444444",
    status: "confirmed",
  },
  {
    id: "eeeeeee2-eeee-4eee-8eee-eeeeeeeeeee2",
    event_id: "ddddddd1-dddd-4ddd-8ddd-ddddddddddd1",
    user_id: "66666666-6666-4666-8666-666666666666",
    status: "registered",
  },
  {
    id: "eeeeeee3-eeee-4eee-8eee-eeeeeeeeeee3",
    event_id: "ddddddd2-dddd-4ddd-8ddd-ddddddddddd2",
    user_id: "55555555-5555-4555-8555-555555555555",
    status: "confirmed",
  },
];

async function upsertMany(model, items) {
  for (const item of items) {
    await model.upsert(item);
  }
}

async function seed() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    await upsertMany(db.users.scope("withPassword"), users);
    await upsertMany(db.courses, courses);
    await upsertMany(db.courseContent, contentItems);
    await upsertMany(db.enrollments, enrollments);
    await upsertMany(db.events, events);
    await upsertMany(db.eventParticipants, participants);

    console.log("Demo data has been seeded successfully.");
  } catch (error) {
    console.error("Failed to seed demo data:", error.message);
    process.exitCode = 1;
  } finally {
    await db.sequelize.close();
  }
}

seed();
