const resources = {
  users: {
    endpoint: "/api/users",
    requiredForCreate: ["email", "password_hash"],
    numericFields: [],
    listAction: "list-users",
  },
  courses: {
    endpoint: "/api/courses",
    requiredForCreate: ["title", "teacher_id"],
    numericFields: [],
    listAction: "list-courses",
  },
  content: {
    endpoint: "/api/content",
    requiredForCreate: ["course_id"],
    numericFields: ["position"],
    listAction: "list-content",
  },
  enrollments: {
    endpoint: "/api/enrollments",
    requiredForCreate: ["user_id", "course_id"],
    numericFields: ["progress"],
    listAction: "list-enrollments",
  },
  events: {
    endpoint: "/api/events",
    requiredForCreate: ["title", "course_id", "start_time"],
    numericFields: [],
    dateFields: ["start_time", "end_time"],
    listAction: "list-events",
  },
  participants: {
    endpoint: "/api/participants",
    requiredForCreate: ["event_id", "user_id"],
    numericFields: [],
    listAction: "list-participants",
  },
};

const queryForms = {
  usersByDomain: (data) => ({
    url: `/api/users/domain/${encodeURIComponent(data.domain)}`,
  }),
  coursesWithTeacher: (data) => ({
    url: withQuery("/api/courses/with-teacher", {
      teacher_id: data.teacher_id,
    }),
  }),
  contentByCourse: (data) => ({
    url: `/api/content/course/${encodeURIComponent(data.course_id)}`,
  }),
  enrollmentStats: (data) => ({
    url: withQuery("/api/enrollments/stats/count-by-course", {
      course_id: data.course_id,
    }),
  }),
  eventsByDate: (data) => ({
    url: withQuery("/api/events/by-date", {
      start_date: normalizeDateValue(data.start_date),
      end_date: normalizeDateValue(data.end_date),
      course_id: data.course_id,
    }),
  }),
  participantsByEvent: (data) => ({
    url: `/api/participants/event/${encodeURIComponent(data.event_id)}`,
  }),
};

const toast = document.getElementById("toast");

document.addEventListener("DOMContentLoaded", () => {
  bindResourceForms();
  bindListButtons();
  bindQueryForms();
  bindDashboardRefresh();
  refreshCurrentPage();
});

function bindResourceForms() {
  document.querySelectorAll("[data-resource-form]").forEach((form) => {
    const resourceKey = form.dataset.resourceForm;
    const config = resources[resourceKey];

    form.querySelectorAll("[data-submit]").forEach((button) => {
      button.addEventListener("click", async () => {
        const action = button.dataset.submit;
        const values = collectFormData(form, config);

        try {
          if (action === "create") {
            validateRequired(values, config.requiredForCreate);
            const payload = omitEmpty(values, ["id"]);
            const response = await apiFetch(config.endpoint, {
              method: "POST",
              body: JSON.stringify(payload),
            });
            setOutput(resourceKey, response);
            showToast("Создание выполнено");
            form.reset();
            await refreshResource(resourceKey);
            await refreshStats();
            return;
          }

          if (!values.id) {
            throw new Error("Укажите ID для этого действия");
          }

          if (action === "get") {
            const response = await apiFetch(`${config.endpoint}/${values.id}`);
            fillForm(form, response);
            setOutput(resourceKey, response);
            showToast("Запись загружена");
            return;
          }

          if (action === "update") {
            const payload = omitEmpty(values, ["id"]);
            if (!Object.keys(payload).length) {
              throw new Error("Добавьте хотя бы одно поле для обновления");
            }

            const response = await apiFetch(`${config.endpoint}/${values.id}`, {
              method: "PUT",
              body: JSON.stringify(payload),
            });
            setOutput(resourceKey, response);
            showToast("Обновление выполнено");
            await refreshResource(resourceKey);
            await refreshStats();
            return;
          }

          if (action === "delete") {
            const response = await apiFetch(`${config.endpoint}/${values.id}`, {
              method: "DELETE",
            });
            setOutput(resourceKey, response);
            showToast("Удаление выполнено");
            form.reset();
            await refreshResource(resourceKey);
            await refreshStats();
          }
        } catch (error) {
          setOutput(resourceKey, { error: error.message });
          showToast(error.message, true);
        }
      });
    });
  });
}

function bindListButtons() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;
      const entry = Object.entries(resources).find(([, value]) => value.listAction === action);
      if (!entry) {
        return;
      }

      const [resourceKey] = entry;
      await refreshResource(resourceKey);
      showToast("Список обновлён");
    });
  });
}

function bindQueryForms() {
  document.querySelectorAll("[data-query-form]").forEach((form) => {
    const key = form.dataset.queryForm;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = collectFormData(form, { dateFields: ["start_date", "end_date"] });

      try {
        const config = queryForms[key](values);
        const response = await apiFetch(config.url);
        setQueryOutput(key, response);
        showToast("Запрос выполнен");
      } catch (error) {
        setQueryOutput(key, { error: error.message });
        showToast(error.message, true);
      }
    });
  });
}

function bindDashboardRefresh() {
  const button = document.getElementById("refresh-dashboard");
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    await refreshCurrentPage();
    showToast("Данные панели обновлены");
  });
}

async function refreshCurrentPage() {
  const page = document.body.dataset.page;

  const pageResources = {
    home: [],
    users: ["users"],
    courses: ["courses", "content", "enrollments"],
    events: ["events", "participants"],
    queries: [],
  };

  const jobs = [];
  if (page === "home") {
    jobs.push(refreshStats());
  }

  (pageResources[page] || []).forEach((resourceKey) => {
    jobs.push(refreshResource(resourceKey));
  });

  await Promise.all(jobs);
}

async function refreshStats() {
  const statEntries = [
    ["users", "/api/users"],
    ["courses", "/api/courses"],
    ["content", "/api/content"],
    ["enrollments", "/api/enrollments"],
    ["events", "/api/events"],
    ["participants", "/api/participants"],
  ];

  await Promise.all(
    statEntries.map(async ([key, url]) => {
      const node = document.querySelector(`[data-stat="${key}"]`);
      if (!node) {
        return;
      }

      try {
        const data = await apiFetch(url);
        node.textContent = Array.isArray(data) ? data.length : "0";
      } catch (error) {
        node.textContent = "!";
      }
    })
  );
}

async function refreshResource(resourceKey) {
  const config = resources[resourceKey];
  const target = document.querySelector(`[data-table="${resourceKey}"]`);
  if (!target) {
    return;
  }

  try {
    const data = await apiFetch(config.endpoint);
    target.innerHTML = renderTable(data);
  } catch (error) {
    target.innerHTML = `<div class="empty-state">Не удалось загрузить данные: ${escapeHtml(error.message)}</div>`;
  }
}

function collectFormData(form, config = {}) {
  const formData = new FormData(form);
  const result = {};

  for (const [key, rawValue] of formData.entries()) {
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;
    if (!value) {
      result[key] = "";
      continue;
    }

    if (config.numericFields && config.numericFields.includes(key)) {
      result[key] = Number(value);
      continue;
    }

    if (config.dateFields && config.dateFields.includes(key)) {
      result[key] = normalizeDateValue(value);
      continue;
    }

    result[key] = value;
  }

  return result;
}

function fillForm(form, data) {
  Object.entries(data || {}).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field || value === null || value === undefined) {
      return;
    }

    if (field.type === "datetime-local") {
      field.value = toDatetimeLocalValue(value);
      return;
    }

    field.value = String(value);
  });
}

function validateRequired(values, requiredFields) {
  requiredFields.forEach((field) => {
    if (!values[field]) {
      throw new Error(`Поле "${field}" обязательно`);
    }
  });
}

function omitEmpty(values, excludedKeys = []) {
  return Object.fromEntries(
    Object.entries(values).filter(([key, value]) => {
      if (excludedKeys.includes(key)) {
        return false;
      }

      if (typeof value === "number") {
        return !Number.isNaN(value);
      }

      return value !== "";
    })
  );
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  let payload = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch (error) {
    payload = text;
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && payload.message
        ? payload.message
        : `Ошибка запроса (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

function renderTable(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return '<div class="empty-state">Записей пока нет.</div>';
  }

  const keys = Array.from(
    data.reduce((set, item) => {
      Object.keys(item || {}).forEach((key) => set.add(key));
      return set;
    }, new Set())
  );

  const head = keys.map((key) => `<th>${escapeHtml(key)}</th>`).join("");
  const rows = data
    .map((item) => {
      const cells = keys
        .map((key) => `<td>${formatCellValue(item[key])}</td>`)
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

function formatCellValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "object") {
    return escapeHtml(JSON.stringify(value));
  }

  return escapeHtml(String(value));
}

function setOutput(resourceKey, data) {
  const target = document.querySelector(`[data-output="${resourceKey}"]`);
  if (!target) {
    return;
  }
  target.textContent = JSON.stringify(data, null, 2);
}

function setQueryOutput(queryKey, data) {
  const target = document.querySelector(`[data-query-output="${queryKey}"]`);
  if (!target) {
    return;
  }
  target.textContent = JSON.stringify(data, null, 2);
}

function showToast(message, isError = false) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.style.background = isError ? "rgba(132, 67, 50, 0.95)" : "rgba(28, 24, 20, 0.92)";
  toast.classList.add("visible");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

function normalizeDateValue(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString();
}

function toDatetimeLocalValue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function withQuery(baseUrl, params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      search.set(key, value);
    }
  });

  const query = search.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
