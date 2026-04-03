# 📘 EduPlatform

EduPlatform — это современная веб-платформа для организации профессиональных курсов и семинаров.  
Платформа объединяет преподавателей и студентов в едином образовательном пространстве и обеспечивает:

* управление курсами и мероприятиями
* регистрацию пользователей и зачисление на курсы
* участие в событиях (events)
* хранение структуры обучения и прогресса студентов

## 🎯 Цель проекта

Упростить организацию образовательного процесса и обеспечить централизованное управление обучением, расписанием и участниками курсов.

## 💡 Ценность

* прозрачное управление обучением
* масштабируемая backend-архитектура
* поддержка ролей пользователей (student / teacher / admin)
* возможность расширения под LMS-систему

---

## ⚙️ Installation Instructions

### 📦 1. Клонирование проекта

```bash
git clone https://github.com/your-username/eduplatform.git
cd eduplatform

📦 2. Установка зависимостей
Bashnpm install
🐳 3. Запуск через Docker (рекомендуется)
Bashdocker compose up --build
🗄️ 4. Переменные окружения (.env)
Создай .env файл:
envDB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=eduplatform
DB_PORT=5432
PORT=3000
🚀 5. Запуск без Docker (опционально)
Bashnpm start

🧪 Usage
📌 Базовый запуск API
После запуска сервер доступен:
Bashhttp://localhost:3000
📌 Пример использования API (Users)
JavaScriptconst axios = require("axios");

axios.post("http://localhost:3000/api/users", {
  email: "test@mail.com",
  password_hash: "hashed_password",
  full_name: "John Doe",
  role: "student"
});
📌 Получение событий
JavaScriptaxios.get("http://localhost:3000/api/events").then(res => {
  console.log(res.data);
});
📌 Swagger документация
texthttp://localhost:3000/api-docs

🤝 Contributing
Проект открыт для улучшений.
Как внести вклад:

Сделайте fork репозитория
Создайте feature-ветку:

Bashgit checkout -b feature/new-feature

Сделайте commit:

Bashgit commit -m "Add new feature"

Отправьте Pull Request


📚 Documentation
Проект использует:

Express.js — backend framework
Sequelize — ORM для PostgreSQL
PostgreSQL — база данных
Swagger — документация API
Docker — контейнеризация

API документация:
text/api-docs

📜 License
Этот проект распространяется под лицензией MIT.
textMIT License

📞 Contact Information
Автор: Джемиле

GitHub: (добавь свой username)
Email: (если хочешь — добавь)
Telegram: (опционально)


🙏 Acknowledgments
Проект использует open-source технологии:

Express.js community
Sequelize ORM
PostgreSQL
Swagger UI
Docker ecosystem

text