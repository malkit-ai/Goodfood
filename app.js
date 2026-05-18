(() => {
  const STORAGE_KEY = "goodfood.v2";

  // Defaults aligned with: low-carb, zero-sugar, 8h sleep, 1h exercise, stress less.
  const DEFAULT_GOALS = {
    fat: 130,
    protein: 130,
    fiber: 25,
    carbCap: 20,
    sugarCap: 0,
    water: 10,
    sleep: 8,
    exercise: 60,
    mindfulness: 10,
  };

  const BANNED_KEYWORDS = [
    "sugar", "syrup", "honey", "agave", "maple",
    "milk", "yogurt", "yoghurt",
    "fruit", "apple", "banana", "orange", "grape", "mango", "pear",
    "peach", "pineapple", "berry", "berries", "date", "raisin", "juice",
    "bread", "rice", "pasta", "oat", "cereal", "wheat", "flour",
    "potato", "corn", "bean", "lentil", "chickpea", "pea",
  ];

  const FOOD_LIBRARY = {
    fat: [
      { name: "Avocado (1 medium)", fat: 22, protein: 3, fiber: 10, carb: 2, sugar: 0 },
      { name: "Olive oil (1 tbsp)", fat: 14, protein: 0, fiber: 0, carb: 0, sugar: 0 },
      { name: "Butter (1 tbsp)", fat: 12, protein: 0, fiber: 0, carb: 0, sugar: 0 },
      { name: "Macadamia nuts (1 oz)", fat: 21, protein: 2, fiber: 2.5, carb: 2, sugar: 1 },
      { name: "Coconut oil (1 tbsp)", fat: 14, protein: 0, fiber: 0, carb: 0, sugar: 0 },
      { name: "Hard cheese (1 oz)", fat: 9, protein: 7, fiber: 0, carb: 0.5, sugar: 0 },
      { name: "Egg yolks (2)", fat: 9, protein: 5, fiber: 0, carb: 1, sugar: 0 },
      // Punjab NIN data
      { name: "Desi ghee (1 tbsp)", fat: 13, protein: 0, fiber: 0, carb: 0, sugar: 0 },
      { name: "Paneer (1 oz)", fat: 7, protein: 7, fiber: 0, carb: 1, sugar: 0 },
      { name: "Malai / fresh cream (1 tbsp)", fat: 5, protein: 0, fiber: 0, carb: 0, sugar: 0 },
    ],
    protein: [
      { name: "Ribeye steak (6 oz)", fat: 36, protein: 42, fiber: 0, carb: 0, sugar: 0 },
      { name: "Chicken thigh (6 oz, skin on)", fat: 18, protein: 32, fiber: 0, carb: 0, sugar: 0 },
      { name: "Wild salmon (6 oz)", fat: 22, protein: 34, fiber: 0, carb: 0, sugar: 0 },
      { name: "Ground beef 80/20 (6 oz)", fat: 30, protein: 36, fiber: 0, carb: 0, sugar: 0 },
      { name: "Sardines in oil (1 can)", fat: 12, protein: 23, fiber: 0, carb: 0, sugar: 0 },
      { name: "Whole eggs (3)", fat: 15, protein: 18, fiber: 0, carb: 1.5, sugar: 0 },
      { name: "Pork belly (4 oz)", fat: 53, protein: 10, fiber: 0, carb: 0, sugar: 0 },
      // Punjab NIN data
      { name: "Tandoori chicken (6 oz)", fat: 8, protein: 42, fiber: 0, carb: 2, sugar: 0 },
      { name: "Goat mutton (6 oz)", fat: 18, protein: 40, fiber: 0, carb: 0, sugar: 0 },
      { name: "Amritsari fish, grilled (6 oz)", fat: 10, protein: 34, fiber: 0, carb: 2, sugar: 0 },
      { name: "Keema / minced goat (4 oz)", fat: 20, protein: 26, fiber: 0, carb: 2, sugar: 0 },
    ],
    fiber: [
      { name: "Spinach, cooked (1 cup)", fat: 0, protein: 5, fiber: 4, carb: 3, sugar: 0.4 },
      { name: "Broccoli (1 cup)", fat: 0, protein: 2, fiber: 2.4, carb: 4, sugar: 1.5 },
      { name: "Kale, sautéed (1 cup)", fat: 0, protein: 2.5, fiber: 2.6, carb: 4, sugar: 1 },
      { name: "Cauliflower (1 cup)", fat: 0, protein: 2, fiber: 2, carb: 3, sugar: 2 },
      { name: "Asparagus (1 cup)", fat: 0, protein: 3, fiber: 2.8, carb: 4, sugar: 2 },
      { name: "Brussels sprouts (1 cup)", fat: 0, protein: 3, fiber: 3, carb: 5, sugar: 1.5 },
      { name: "Chia seeds (1 tbsp)", fat: 5, protein: 2, fiber: 5, carb: 1, sugar: 0 },
      { name: "Flax seeds (1 tbsp)", fat: 4, protein: 2, fiber: 3, carb: 0.5, sugar: 0 },
      // Punjab NIN data
      { name: "Sarson da saag (1 cup)", fat: 1, protein: 3, fiber: 4, carb: 5, sugar: 0 },
      { name: "Methi / fenugreek leaves (1 cup)", fat: 0, protein: 3, fiber: 3, carb: 4, sugar: 0 },
      { name: "Karela / bitter gourd (1 cup)", fat: 0, protein: 1, fiber: 2, carb: 4, sugar: 1 },
      { name: "Tinda / apple gourd (1 cup)", fat: 0, protein: 1, fiber: 2, carb: 5, sugar: 2 },
    ],
  };

  const state = load();
  let currentDate = todayKey();

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { goals: { ...DEFAULT_GOALS }, days: {} };
      const parsed = JSON.parse(raw);
      return {
        goals: { ...DEFAULT_GOALS, ...(parsed.goals || {}) },
        days: parsed.days || {},
      };
    } catch {
      return { goals: { ...DEFAULT_GOALS }, days: {} };
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function dayData(key = currentDate) {
    if (!state.days[key]) {
      state.days[key] = {
        water: 0,
        sodium: 0,
        electrolytes: "",
        meals: [],
        exercises: [],
        sleep: null,
        stress: null,
        mood: "",
        mindfulness: 0,
        practices: [],
      };
    }
    const d = state.days[key];
    if (!Array.isArray(d.practices)) d.practices = [];
    return d;
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 1800);
  }

  function fmtTime(ts) {
    const d = new Date(ts);
    const loc = window.i18n ? window.i18n.getLocale() : undefined;
    return d.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit" });
  }
  function tr(key, vars) { return window.t ? window.t(key, vars) : key; }
  function trOpt(key, fallback) {
    const v = window.t ? window.t(key) : null;
    return v && v !== key ? v : fallback;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function flagText(name) {
    const lower = name.toLowerCase();
    const hits = BANNED_KEYWORDS.filter((k) => lower.includes(k));
    return hits.length ? hits : null;
  }

  function totals(day) {
    const t = { fat: 0, protein: 0, fiber: 0, carb: 0, sugar: 0, kcal: 0 };
    for (const m of day.meals) {
      t.fat += +m.fat || 0;
      t.protein += +m.protein || 0;
      t.fiber += +m.fiber || 0;
      t.carb += +m.carb || 0;
      t.sugar += +m.sugar || 0;
    }
    t.kcal = Math.round(t.fat * 9 + t.protein * 4 + t.carb * 4);
    return t;
  }
  function totalExercise(day) {
    return day.exercises.reduce((s, e) => s + (+e.minutes || 0), 0);
  }

  function renderSummary() {
    const day = dayData();
    const goals = state.goals;
    const t = totals(day);

    const setText = (id, v) => (document.getElementById(id).textContent = v);
    setText("fat-total", t.fat.toFixed(0));
    setText("fat-goal", goals.fat);
    setText("pro-total", t.protein.toFixed(0));
    setText("pro-goal", goals.protein);
    setText("fib-total", t.fiber.toFixed(0));
    setText("fib-goal", goals.fiber);
    setText("carb-total", t.carb.toFixed(1));
    setText("carb-goal", goals.carbCap);
    setText("sugar-total", t.sugar.toFixed(1));
    setText("sugar-goal", goals.sugarCap);
    setText("water-total", day.water);
    setText("water-goal", goals.water);

    const orgCount = day.meals.filter((m) => m.organic).length;
    const mealCount = day.meals.length;
    const orgPct = mealCount ? orgCount / mealCount : 0;
    setText("org-total", orgCount);
    setText("org-count", mealCount);
    setText("org-pct", `${Math.round(orgPct * 100)}%`);
    document.getElementById("org-bar").style.width = `${(orgPct * 100).toFixed(0)}%`;

    const pct = (v, g) => Math.max(0, Math.min(1, g ? v / g : 0));
    const setBar = (id, p, capOver = false) => {
      const el = document.getElementById(id);
      el.style.width = `${(p * 100).toFixed(0)}%`;
      el.classList.toggle("over", capOver);
    };

    const pf = pct(t.fat, goals.fat);
    const pp = pct(t.protein, goals.protein);
    const pfb = pct(t.fiber, goals.fiber);
    const pw = pct(day.water, goals.water);

    setBar("fat-bar", pf);
    setBar("pro-bar", pp);
    setBar("fib-bar", pfb);
    setBar("water-bar", pw);

    const carbOver = t.carb > goals.carbCap;
    const sugarOver = t.sugar > goals.sugarCap;
    setBar(
      "carb-bar",
      goals.carbCap ? Math.min(1, t.carb / Math.max(goals.carbCap, 1)) : (t.carb > 0 ? 1 : 0),
      carbOver
    );
    setBar(
      "sugar-bar",
      goals.sugarCap ? Math.min(1, t.sugar / Math.max(goals.sugarCap, 1)) : (t.sugar > 0 ? 1 : 0),
      sugarOver
    );

    // Overall = avg of positive macros + water + sleep + exercise hit, minus penalties for caps.
    const ex = totalExercise(day);
    const sleepP = pct(day.sleep || 0, goals.sleep);
    const exP = pct(ex, goals.exercise);
    let overall = (pf + pp + pfb + pw + sleepP + exP) / 6;
    if (carbOver) overall -= 0.15;
    if (sugarOver) overall -= 0.15;
    overall = Math.max(0, Math.min(1, overall));

    const C = 2 * Math.PI * 52;
    const ring = document.getElementById("overall-ring");
    ring.style.strokeDashoffset = String(C * (1 - overall));
    ring.style.stroke = carbOver || sugarOver ? "var(--cap)" : "var(--accent)";
    document.getElementById("overall-percent").textContent =
      `${Math.round(overall * 100)}%`;
  }

  function renderCups() {
    const day = dayData();
    const goal = state.goals.water;
    const cups = document.getElementById("cups");
    cups.innerHTML = "";
    const total = Math.max(goal, day.water);
    for (let i = 0; i < total; i++) {
      const c = document.createElement("button");
      c.className = "cup" + (i < day.water ? " filled" : "");
      c.title = `Cup ${i + 1}`;
      c.addEventListener("click", () => {
        const d = dayData();
        d.water = i < d.water ? i : i + 1;
        save();
        renderCups();
        renderSummary();
        renderTrend();
      });
      cups.appendChild(c);
    }
    document.getElementById("sodium").value = day.sodium || "";
    document.getElementById("electrolytes").value = day.electrolytes || "";
  }

  function renderMealForm() {
    const dl = document.getElementById("food-suggestions");
    dl.innerHTML = "";
    for (const cat of Object.values(FOOD_LIBRARY)) {
      for (const f of cat) {
        const o = document.createElement("option");
        o.value = f.name;
        dl.appendChild(o);
      }
    }
    const nameInput = document.getElementById("meal-name");
    nameInput.addEventListener("input", () => {
      const warn = document.getElementById("meal-warning");
      const hits = flagText(nameInput.value);
      if (hits) {
        warn.hidden = false;
        warn.textContent = tr("meal.warningTpl", { words: hits.join(", ") });
      } else {
        warn.hidden = true;
      }
      const match = findFoodByName(nameInput.value);
      if (match) prefillMacros(match);
    });
  }

  function findFoodByName(name) {
    const lower = name.trim().toLowerCase();
    for (const cat of Object.values(FOOD_LIBRARY)) {
      for (const f of cat) if (f.name.toLowerCase() === lower) return f;
    }
    return null;
  }

  function prefillMacros(f) {
    document.getElementById("meal-fat").value = f.fat;
    document.getElementById("meal-pro").value = f.protein;
    document.getElementById("meal-fib").value = f.fiber;
    document.getElementById("meal-carb").value = f.carb;
    document.getElementById("meal-sugar").value = f.sugar;
  }

  function renderFoodLibrary() {
    for (const [cat, items] of Object.entries(FOOD_LIBRARY)) {
      const ul = document.querySelector(`.food-list[data-cat="${cat}"]`);
      if (!ul) continue;
      ul.innerHTML = "";
      for (const f of items) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${escapeHtml(f.name)}</span><small>F${f.fat} · P${f.protein} · Fib${f.fiber} · C${f.carb}</small>`;
        li.addEventListener("click", () => {
          document.getElementById("meal-name").value = f.name;
          prefillMacros(f);
          document.getElementById("meal-warning").hidden = true;
          document.getElementById("meal-name").focus();
        });
        ul.appendChild(li);
      }
    }
  }

  function renderMeals() {
    const day = dayData();
    const list = document.getElementById("meal-list");
    list.innerHTML = "";
    if (day.meals.length === 0) {
      list.innerHTML = `<li class="entry-meta">${tr("status.noMeals")}</li>`;
      return;
    }
    for (const m of day.meals) {
      const li = document.createElement("li");
      const flagged = !!m.flagged || !!flagText(m.name);
      if (flagged) li.classList.add("flagged");
      const kcal = Math.round((m.fat || 0) * 9 + (m.protein || 0) * 4 + (m.carb || 0) * 4);
      const typeLabel = tr(`opt.${m.type}`);
      const orgTag = " · " + tr(m.organic ? "meal.organic" : "meal.conventional");
      li.innerHTML = `
        <div>
          <div class="entry-name">${escapeHtml(m.name)}${flagged ? " ⚠" : ""}</div>
          <div class="entry-meta">${typeLabel}${orgTag} · F${(+m.fat).toFixed(0)} P${(+m.protein).toFixed(0)} Fib${(+m.fiber).toFixed(0)} C${(+m.carb).toFixed(1)} S${(+m.sugar).toFixed(1)} · ${kcal} ${tr("unit.kcal")} · ${fmtTime(m.ts)}</div>
        </div>
        <button class="del-btn" aria-label="Delete">&times;</button>
      `;
      li.querySelector(".del-btn").addEventListener("click", () => {
        day.meals = day.meals.filter((x) => x.id !== m.id);
        save();
        renderMeals();
        renderSummary();
        renderTrend();
      });
      list.appendChild(li);
    }
  }

  function renderExercises() {
    const day = dayData();
    const list = document.getElementById("ex-list");
    list.innerHTML = "";
    if (day.exercises.length === 0) {
      list.innerHTML = `<li class="entry-meta">${tr("status.noExercise", { n: state.goals.exercise })}</li>`;
      return;
    }
    for (const e of day.exercises) {
      const li = document.createElement("li");
      const intensity = tr(`opt.${e.intensity}`);
      li.innerHTML = `
        <div>
          <div class="entry-name">${escapeHtml(e.name)}</div>
          <div class="entry-meta">${intensity} · ${e.minutes} ${tr("unit.min")} · ${fmtTime(e.ts)}</div>
        </div>
        <button class="del-btn" aria-label="Delete">&times;</button>
      `;
      li.querySelector(".del-btn").addEventListener("click", () => {
        day.exercises = day.exercises.filter((x) => x.id !== e.id);
        save();
        renderExercises();
        renderSummary();
        renderTrend();
      });
      list.appendChild(li);
    }
  }

  function renderSleep() {
    const day = dayData();
    const status = document.getElementById("sleep-status");
    document.getElementById("sleep-hours").value = day.sleep ?? "";
    document.getElementById("stress").value = day.stress ?? "";
    document.getElementById("mood").value = day.mood || "";
    document.getElementById("mindful-min").value = day.mindfulness || "";
    document.querySelectorAll("#practice-tags .tag").forEach((btn) => {
      btn.classList.toggle("on", day.practices.includes(btn.dataset.practice));
    });

    const bits = [];
    if (day.sleep != null) {
      const onTarget = day.sleep >= state.goals.sleep;
      bits.push(`${tr("label.hoursSlept")}: ${day.sleep} ${tr("unit.hrs")}${onTarget ? " ✓" : ` (${tr("status.belowSleep")})`}`);
    }
    if (day.stress) bits.push(`${tr("label.stress")}: ${day.stress}/5`);
    if (day.mood) bits.push(`${tr("label.mood")}: ${tr(`opt.${day.mood}`)}`);
    if (day.mindfulness) bits.push(`${day.mindfulness} ${tr("unit.min")} ${tr("label.mindfulness").split(" ")[0]}`);
    if (day.practices.length) {
      const map = { walk: "practice.walk", breathing: "practice.breathing", meditation: "practice.meditation", journal: "practice.journal", "screens-off": "practice.screens" };
      bits.push(day.practices.map((p) => tr(map[p] || p)).join(" · "));
    }
    status.textContent = bits.length ? bits.join(" • ") : tr("status.noEntries");
  }

  function renderGoals() {
    document.getElementById("goal-fat").value = state.goals.fat;
    document.getElementById("goal-pro").value = state.goals.protein;
    document.getElementById("goal-fib").value = state.goals.fiber;
    document.getElementById("goal-carb").value = state.goals.carbCap;
    document.getElementById("goal-sugar").value = state.goals.sugarCap;
    document.getElementById("goal-water").value = state.goals.water;
  }

  function renderTrend() {
    const container = document.getElementById("trend");
    container.innerHTML = "";
    const today = new Date(currentDate + "T00:00:00");
    const goals = state.goals;
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = todayKey(d);
      const day = state.days[key] || { meals: [], exercises: [], water: 0, sleep: 0 };
      const t = totals(day);
      const segs = [
        { cls: "fat", v: Math.min(1, t.fat / goals.fat) },
        { cls: "pro", v: Math.min(1, t.protein / goals.protein) },
        { cls: "fib", v: Math.min(1, t.fiber / goals.fiber) },
        { cls: "carb", v: goals.carbCap ? Math.min(1, t.carb / Math.max(goals.carbCap, 1)) : 0 },
        { cls: "sugar", v: goals.sugarCap ? Math.min(1, t.sugar / Math.max(goals.sugarCap, 1)) : (t.sugar > 0 ? 1 : 0) },
      ];
      const dayEl = document.createElement("div");
      dayEl.className = "trend-day";
      const stack = document.createElement("div");
      stack.className = "trend-bar-stack";
      for (const s of segs) {
        const seg = document.createElement("div");
        seg.className = "trend-seg " + s.cls;
        seg.style.height = `${(s.v / segs.length) * 100}%`;
        stack.appendChild(seg);
      }
      const label = document.createElement("small");
      label.textContent = d.toLocaleDateString([], { weekday: "short" });
      dayEl.appendChild(stack);
      dayEl.appendChild(label);
      container.appendChild(dayEl);
    }
  }

  function renderAll() {
    document.getElementById("date-picker").value = currentDate;
    renderSummary();
    renderCups();
    renderMeals();
    renderExercises();
    renderSleep();
    renderGoals();
    renderTrend();
  }

  // Event wiring
  document.getElementById("date-picker").addEventListener("change", (e) => {
    currentDate = e.target.value || todayKey();
    renderAll();
  });
  document.getElementById("prev-day").addEventListener("click", () => {
    const d = new Date(currentDate + "T00:00:00");
    d.setDate(d.getDate() - 1);
    currentDate = todayKey(d);
    renderAll();
  });
  document.getElementById("next-day").addEventListener("click", () => {
    const d = new Date(currentDate + "T00:00:00");
    d.setDate(d.getDate() + 1);
    currentDate = todayKey(d);
    renderAll();
  });

  document.getElementById("add-cup").addEventListener("click", () => {
    const d = dayData();
    d.water += 1;
    save();
    renderCups();
    renderSummary();
    renderTrend();
  });
  document.getElementById("save-hydration").addEventListener("click", () => {
    const d = dayData();
    d.sodium = Number(document.getElementById("sodium").value) || 0;
    d.electrolytes = document.getElementById("electrolytes").value;
    save();
    toast(tr("toast.hydrationSaved"));
  });

  document.getElementById("meal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("meal-name").value.trim();
    const fat = Number(document.getElementById("meal-fat").value);
    const protein = Number(document.getElementById("meal-pro").value);
    const fiber = Number(document.getElementById("meal-fib").value) || 0;
    const carb = Number(document.getElementById("meal-carb").value) || 0;
    const sugar = Number(document.getElementById("meal-sugar").value) || 0;
    const type = document.getElementById("meal-type").value;
    const organic = document.getElementById("meal-organic").checked;
    if (!name || !Number.isFinite(fat) || !Number.isFinite(protein)) return;

    const flagged = !!flagText(name);
    if (flagged && !confirm(tr("confirm.bannedFood"))) return;

    dayData().meals.push({
      id: uid(), name, type,
      fat, protein, fiber, carb, sugar,
      organic, flagged, ts: Date.now(),
    });
    save();
    e.target.reset();
    document.getElementById("meal-fib").value = 0;
    document.getElementById("meal-carb").value = 0;
    document.getElementById("meal-sugar").value = 0;
    document.getElementById("meal-organic").checked = true;
    document.getElementById("meal-warning").hidden = true;
    renderMeals();
    renderSummary();
    renderTrend();
    toast(tr("toast.mealAdded"));
  });

  document.getElementById("ex-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("ex-name").value.trim();
    const min = Number(document.getElementById("ex-min").value);
    const intensity = document.getElementById("ex-intensity").value;
    if (!name || !Number.isFinite(min) || min <= 0) return;
    dayData().exercises.push({ id: uid(), name, minutes: min, intensity, ts: Date.now() });
    save();
    e.target.reset();
    document.getElementById("ex-intensity").value = "moderate";
    renderExercises();
    renderSummary();
    renderTrend();
    toast(tr("toast.exerciseLogged"));
  });

  document.getElementById("sleep-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const hrs = document.getElementById("sleep-hours").value;
    const stress = document.getElementById("stress").value;
    const mood = document.getElementById("mood").value;
    const day = dayData();
    day.sleep = hrs === "" ? null : Number(hrs);
    day.stress = stress === "" ? null : Number(stress);
    day.mood = mood;
    save();
    renderSleep();
    renderSummary();
    renderTrend();
    toast(tr("toast.sleepSaved"));
  });

  document.querySelectorAll("#practice-tags .tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = dayData();
      const p = btn.dataset.practice;
      if (day.practices.includes(p)) {
        day.practices = day.practices.filter((x) => x !== p);
      } else {
        day.practices.push(p);
      }
      save();
      btn.classList.toggle("on");
    });
  });

  document.getElementById("save-practice").addEventListener("click", () => {
    const day = dayData();
    day.mindfulness = Number(document.getElementById("mindful-min").value) || 0;
    save();
    renderSleep();
    toast(tr("toast.practiceSaved"));
  });

  document.getElementById("goals-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.goals = {
      ...state.goals,
      fat: Number(document.getElementById("goal-fat").value) || DEFAULT_GOALS.fat,
      protein: Number(document.getElementById("goal-pro").value) || DEFAULT_GOALS.protein,
      fiber: Number(document.getElementById("goal-fib").value) || DEFAULT_GOALS.fiber,
      carbCap: Number(document.getElementById("goal-carb").value),
      sugarCap: Number(document.getElementById("goal-sugar").value),
      water: Number(document.getElementById("goal-water").value) || DEFAULT_GOALS.water,
    };
    save();
    renderAll();
    toast(tr("toast.goalsUpdated"));
  });

  document.getElementById("export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goodfood-${todayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm(tr("confirm.reset"))) return;
    localStorage.removeItem(STORAGE_KEY);
    state.goals = { ...DEFAULT_GOALS };
    state.days = {};
    renderAll();
    toast(tr("toast.allCleared"));
  });

  renderMealForm();
  renderFoodLibrary();
  renderAll();

  window.addEventListener("langchange", () => {
    renderAll();
  });
})();
