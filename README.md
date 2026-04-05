# EduPlatform

EduPlatform - это backend на Node.js и Express для управления образовательными курсами, учебным контентом, записями на курсы, событиями и участниками событий.
Проект использует PostgreSQL через Sequelize и предоставляет Swagger-документацию для API.

Проект решает задачу централизованного управления образовательными процессами:

- управление курсами и их содержимым
- учет студентов и их записей
- организация событий и участников
- получение аналитики (например, количество студентов на курсах)

Ценность проекта:

- демонстрирует полноценный REST API
- включает работу с реляционной БД (PostgreSQL)
- использует ORM (Sequelize)
- поддерживает документирование API через Swagger
- готов к контейнеризации (Docker)

## Инструкции по установке

Требования:
- Node.js 18+
- PostgreSQL 15
- Docker

Установка:
1. Клонируй репозиторий:
```bash
git clone <your-repo-url>
cd EduPlatform
```
2. Установи зависимости:
```bash
npm install
```
3. Создай .env файл (опционально):
```env
POSTGRESDB_USER=postgres 
POSTGRESDB_ROOT_PASSWORD=1111 
POSTGRESDB_DATABASE=EduPlatform 
POSTGRESDB_LOCAL_PORT=5432 
POSTGRESDB_DOCKER_PORT=5433 
NODE_LOCAL_PORT=6868 
NODE_DOCKER_PORT=8080 
```
4. Запуск через Docker 
```bash
docker compose up --build
```

После запуска:
- API: http://localhost:8080
- Swagger: http://localhost:8080/api-docs

## Использование

Пример подключения:
```js
const axios = require('axios');

axios.get('http://localhost:8080/api/users')
  .then(res => console.log(res.data));
```
Основные эндпоинты:
- Получить пользователей:
  ```GET /api/users```
- Поиск по домену:
  ```GET /api/users/domain/:domain```
- Курсы с преподавателями:
  ```GET /api/courses/with-teacher```
- Контент курса:
  ```GET /api/content/course/:course_id```
- Статистика записей:
  ```GET /api/enrollments/stats/count-by-course```
- События по датам:
  ```GET /api/events/by-date?start_date=...&end_date=...```
- Участники события:
  ```GET /api/participants/event/:event_id```

Swagger
Документация API доступна по адресу: /api-docs

## Вклад

Если вы хотите внести вклад в проект:
1. Сделайте fork репозитория
2. Создайте новую ветку:
```bash 
git checkout -b feature/your-feature
```
3. Внесите изменения и закоммитьте:
```bash 
git commit -m "Add new feature"
```
4. Отправьте изменения:
```bash 
git push origin feature/your-feature
```
5. Создайте Pull Request

## Документация

- Swagger UI: /api-docs
- API построено по REST-принципам
- Используется Sequelize для работы с БД

## Лицензия

Этот проект распространяется под лицензией MIT.
Вы можете свободно использовать, изменять и распространять его с указанием авторства.

## Контактная информация
Если у вас есть вопросы или предложения:
GitHub: https://github.com/jemichka

## Благодарности
Проект использует следующие технологии:

- Node.js
- Express
- PostgreSQL
- Sequelize
- Swagger UI Express
- Docker