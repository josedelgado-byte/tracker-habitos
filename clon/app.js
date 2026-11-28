const STORAGE_KEY = "tracker_habitos_v1";

function getTodayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDefaultState() {
  const today = getTodayISO();
  return {
    habits: [
      { id: "h-1", name: "Leer y despejar la mente", goal: "20 min al día" },
      { id: "h-2", name: "Hacer ejercicio", goal: "30 min de movimiento" },
      { id: "h-3", name: "Tomar agua e hidratarse", goal: "8 vasos al día" }
    ],
    checkins: {
      [today]: ["h-1"]
    }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultState();
      saveState(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return {
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      checkins: parsed.checkins && typeof parsed.checkins === "object" ? parsed.checkins : {}
    };
  } catch (err) {
    const fallback = getDefaultState();
    saveState(fallback);
    return fallback;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toggleHabitToday(habitId) {
  const state = loadState();
  const today = getTodayISO();
  const current = Array.isArray(state.checkins[today]) ? state.checkins[today] : [];
  const exists = current.includes(habitId);

  state.checkins[today] = exists
    ? current.filter((id) => id !== habitId)
    : [...current, habitId];

  saveState(state);
  renderTodayScreen();
}

function addHabit(name, goal) {
  const trimmedName = name.trim();
  const trimmedGoal = goal.trim() || "Meta diaria";
  if (!trimmedName) return;

  const state = loadState();
  state.habits.push({
    id: `h-${Date.now()}`,
    name: trimmedName,
    goal: trimmedGoal
  });
  saveState(state);
  renderHabitsScreen();
}

function deleteHabit(habitId) {
  const state = loadState();
  state.habits = state.habits.filter((h) => h.id !== habitId);
  Object.keys(state.checkins).forEach((day) => {
    state.checkins[day] = (state.checkins[day] || []).filter((id) => id !== habitId);
  });
  saveState(state);
  renderHabitsScreen();
}

function renderTodayScreen() {
  const listEl = document.getElementById("today-habits-list");
  if (!listEl) return;

  const state = loadState();
  const today = getTodayISO();
  const doneIds = state.checkins[today] || [];
  const total = state.habits.length;
  const doneCount = state.habits.filter((h) => doneIds.includes(h.id)).length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const pctEl = document.getElementById("today-pct");
  const barEl = document.getElementById("today-progress-bar");
  const countEl = document.getElementById("today-count");
  const streakEl = document.getElementById("streak-days");

  if (pctEl) pctEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (countEl) countEl.textContent = `${doneCount} de ${total}`;
  if (streakEl) streakEl.textContent = doneCount > 0 ? "1 día activo" : "0 días";

  if (total === 0) {
    listEl.innerHTML = `<div class="card"><p class="page-subtitle">No tienes hábitos registrados aún. Agrega uno en la pestaña Hábitos.</p></div>`;
    return;
  }

  listEl.innerHTML = "";
  state.habits.forEach((habit) => {
    const isDone = doneIds.includes(habit.id);
    const item = document.createElement("article");
    item.className = "habit-item";

    const info = document.createElement("div");
    info.className = "habit-meta";

    const title = document.createElement("h2");
    title.className = "habit-name";
    title.textContent = habit.name;

    const goal = document.createElement("p");
    goal.className = "habit-goal";
    goal.textContent = `Meta: ${habit.goal}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isDone ? "btn btn-done" : "btn btn-primary";
    btn.setAttribute("aria-pressed", String(isDone));
    btn.setAttribute("aria-label", `${isDone ? "Completado" : "Marcar como completado"}: ${habit.name}`);
    btn.textContent = isDone ? "Completado hoy" : "Marcar hoy";
    btn.addEventListener("click", () => toggleHabitToday(habit.id));

    info.appendChild(title);
    info.appendChild(goal);
    item.appendChild(info);
    item.appendChild(btn);
    listEl.appendChild(item);
  });
}

function renderStatsScreen() {
  const barsEl = document.getElementById("stats-bars");
  if (!barsEl) return;

  const state = loadState();
  const today = getTodayISO();
  const doneIds = state.checkins[today] || [];
  const total = state.habits.length;
  const doneCount = state.habits.filter((h) => doneIds.includes(h.id)).length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const avgEl = document.getElementById("stats-avg");
  const activeEl = document.getElementById("stats-active");
  if (avgEl) avgEl.textContent = `${pct}%`;
  if (activeEl) activeEl.textContent = `${total}`;

  if (total === 0) {
    barsEl.innerHTML = `<p class="page-subtitle">Aún no hay hábitos para calcular estadísticas.</p>`;
    return;
  }

  barsEl.innerHTML = "";
  state.habits.forEach((habit) => {
    const completed = doneIds.includes(habit.id) ? 100 : 0;
    const row = document.createElement("div");
    row.className = "bar-row";

    const head = document.createElement("div");
    head.className = "bar-header";
    head.innerHTML = `<span>${habit.name}</span><span>${completed}%</span>`;

    const track = document.createElement("div");
    track.className = "progress-track";
    track.innerHTML = `<div class="progress-fill" style="width: ${completed}%"></div>`;

    row.appendChild(head);
    row.appendChild(track);
    barsEl.appendChild(row);
  });
}

function renderHabitsScreen() {
  const formEl = document.getElementById("add-habit-form");
  const listEl = document.getElementById("manage-habits-list");
  if (!listEl) return;

  if (formEl && !formEl.dataset.bound) {
    formEl.dataset.bound = "true";
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("habit-name");
      const goalInput = document.getElementById("habit-goal");
      if (!nameInput || !goalInput) return;
      addHabit(nameInput.value, goalInput.value);
      nameInput.value = "";
      goalInput.value = "";
      nameInput.focus();
    });
  }

  const state = loadState();
  listEl.innerHTML = "";

  if (state.habits.length === 0) {
    listEl.innerHTML = `<div class="card"><p class="page-subtitle">No hay hábitos creados todavía.</p></div>`;
    return;
  }

  state.habits.forEach((habit) => {
    const item = document.createElement("article");
    item.className = "habit-item";

    const info = document.createElement("div");
    info.className = "habit-meta";
    info.innerHTML = `<h2 class="habit-name">${habit.name}</h2><p class="habit-goal">Meta: ${habit.goal}</p>`;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn btn-danger";
    delBtn.setAttribute("aria-label", `Eliminar hábito ${habit.name}`);
    delBtn.textContent = "Eliminar";
    delBtn.addEventListener("click", () => deleteHabit(habit.id));

    item.appendChild(info);
    item.appendChild(delBtn);
    listEl.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodayScreen();
  renderStatsScreen();
  renderHabitsScreen();
});