(() => {
  const STORAGE_KEY = "goodfood.plan.v1";

  const DEFAULT_PREFS = {
    kcal: 2000,
    bio: { sex: "m", age: 35, weight: 75, height: 175, activity: 1.55, goal: 1 },
    diet: {
      lowcarb: true, nosugar: true, nomilk: true, nodairy: false,
      nofruit: true, noeggs: false, noshellfish: false, organic: true,
    },
    love: [],
    avoid: [],
    schedule: { b: "07:30", l: "12:30", d: "19:00", s: "16:00", snack: false, repeatMax: 2 },
    location: { text: "", lat: null, lon: null },
    week: null,
    weekStart: null,
  };

  // ----- Meal library -----
  // qty units: g, oz, tbsp, tsp, cup, can, item, strip, clove, mL
  // category drives grocery grouping
  const MEALS = [
    // Breakfasts
    { id: "b1", slot: ["breakfast"], name: "Spinach & cheese omelette",
      ing: [
        { n: "Eggs", q: 3, u: "item", c: "eggs" },
        { n: "Butter", q: 1, u: "tbsp", c: "dairy" },
        { n: "Spinach", q: 1, u: "cup", c: "produce" },
        { n: "Cheddar cheese", q: 1, u: "oz", c: "dairy" },
      ], m: { fat: 32, protein: 26, fiber: 1, carb: 2, sugar: 0 }, prep: 10 },
    { id: "b2", slot: ["breakfast"], name: "Bacon, eggs & avocado",
      ing: [
        { n: "Bacon", q: 3, u: "strip", c: "meat" },
        { n: "Eggs", q: 3, u: "item", c: "eggs" },
        { n: "Avocado", q: 0.5, u: "item", c: "produce" },
      ], m: { fat: 38, protein: 27, fiber: 5, carb: 4, sugar: 0 }, prep: 12 },
    { id: "b3", slot: ["breakfast"], name: "Smoked salmon plate",
      ing: [
        { n: "Smoked salmon (wild)", q: 3, u: "oz", c: "seafood" },
        { n: "Avocado", q: 0.5, u: "item", c: "produce" },
        { n: "Cucumber", q: 0.5, u: "item", c: "produce" },
        { n: "Olive oil", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 28, protein: 22, fiber: 6, carb: 5, sugar: 1 }, prep: 5 },
    { id: "b4", slot: ["breakfast"], name: "Sausage & sautéed kale",
      ing: [
        { n: "Pork sausage", q: 3, u: "oz", c: "meat" },
        { n: "Kale", q: 1, u: "cup", c: "produce" },
        { n: "Ghee", q: 1, u: "tbsp", c: "dairy" },
      ], m: { fat: 28, protein: 18, fiber: 2, carb: 4, sugar: 1 }, prep: 12 },
    { id: "b5", slot: ["breakfast"], name: "Coconut chia bowl",
      ing: [
        { n: "Chia seeds", q: 2, u: "tbsp", c: "pantry" },
        { n: "Coconut milk (unsweetened, canned)", q: 0.5, u: "cup", c: "pantry" },
        { n: "MCT oil", q: 1, u: "tbsp", c: "pantry" },
        { n: "Cinnamon", q: 0.5, u: "tsp", c: "pantry" },
      ], m: { fat: 28, protein: 5, fiber: 10, carb: 6, sugar: 0 }, prep: 5 },
    { id: "b6", slot: ["breakfast", "lunch"], name: "Ground beef hash",
      ing: [
        { n: "Ground beef (grass-fed)", q: 4, u: "oz", c: "meat" },
        { n: "Zucchini", q: 1, u: "item", c: "produce" },
        { n: "Onion", q: 2, u: "tbsp", c: "produce" },
        { n: "Butter", q: 1, u: "tbsp", c: "dairy" },
      ], m: { fat: 32, protein: 28, fiber: 2, carb: 6, sugar: 3 }, prep: 15 },
    { id: "b7", slot: ["breakfast", "lunch"], name: "Steak & eggs",
      ing: [
        { n: "Sirloin steak (grass-fed)", q: 4, u: "oz", c: "meat" },
        { n: "Eggs", q: 2, u: "item", c: "eggs" },
        { n: "Butter", q: 1, u: "tbsp", c: "dairy" },
      ], m: { fat: 32, protein: 40, fiber: 0, carb: 1, sugar: 0 }, prep: 12 },
    { id: "b8", slot: ["breakfast", "snack"], name: "Sardines on cucumber",
      ing: [
        { n: "Sardines in olive oil", q: 1, u: "can", c: "seafood" },
        { n: "Cucumber", q: 1, u: "item", c: "produce" },
        { n: "Capers", q: 1, u: "tbsp", c: "pantry" },
        { n: "Lemon", q: 0.25, u: "item", c: "produce" },
      ], m: { fat: 16, protein: 24, fiber: 2, carb: 4, sugar: 1 }, prep: 5 },

    // Lunches
    { id: "l1", slot: ["lunch", "dinner"], name: "Ribeye, butter & spinach",
      ing: [
        { n: "Ribeye steak (grass-fed)", q: 6, u: "oz", c: "meat" },
        { n: "Butter", q: 1, u: "tbsp", c: "dairy" },
        { n: "Spinach", q: 2, u: "cup", c: "produce" },
        { n: "Garlic", q: 1, u: "clove", c: "produce" },
      ], m: { fat: 48, protein: 47, fiber: 4, carb: 3, sugar: 0 }, prep: 15 },
    { id: "l2", slot: ["lunch", "dinner"], name: "Chicken thigh & broccoli",
      ing: [
        { n: "Chicken thigh (organic, skin-on)", q: 6, u: "oz", c: "meat" },
        { n: "Broccoli", q: 1, u: "cup", c: "produce" },
        { n: "Olive oil", q: 1, u: "tbsp", c: "pantry" },
        { n: "Lemon", q: 0.25, u: "item", c: "produce" },
      ], m: { fat: 25, protein: 34, fiber: 3, carb: 5, sugar: 1 }, prep: 25 },
    { id: "l3", slot: ["lunch", "dinner"], name: "Wild salmon & asparagus",
      ing: [
        { n: "Wild salmon", q: 6, u: "oz", c: "seafood" },
        { n: "Asparagus", q: 1, u: "cup", c: "produce" },
        { n: "Butter", q: 1, u: "tbsp", c: "dairy" },
        { n: "Lemon", q: 0.25, u: "item", c: "produce" },
      ], m: { fat: 28, protein: 36, fiber: 3, carb: 4, sugar: 2 }, prep: 18 },
    { id: "l4", slot: ["lunch"], name: "Beef burger lettuce wraps",
      ing: [
        { n: "Ground beef (grass-fed)", q: 5, u: "oz", c: "meat" },
        { n: "Romaine lettuce", q: 4, u: "item", c: "produce" },
        { n: "Cheddar cheese", q: 1, u: "oz", c: "dairy" },
        { n: "Pickles", q: 4, u: "item", c: "pantry" },
        { n: "Mustard", q: 1, u: "tsp", c: "pantry" },
      ], m: { fat: 35, protein: 36, fiber: 2, carb: 3, sugar: 1 }, prep: 15 },
    { id: "l5", slot: ["lunch", "dinner"], name: "Lamb chops & cauliflower mash",
      ing: [
        { n: "Lamb chops", q: 5, u: "oz", c: "meat" },
        { n: "Cauliflower", q: 1, u: "cup", c: "produce" },
        { n: "Butter", q: 2, u: "tbsp", c: "dairy" },
        { n: "Rosemary", q: 1, u: "tsp", c: "pantry" },
      ], m: { fat: 40, protein: 33, fiber: 3, carb: 5, sugar: 2 }, prep: 25 },
    { id: "l6", slot: ["lunch", "snack"], name: "Tuna olive salad",
      ing: [
        { n: "Tuna (wild, in olive oil)", q: 1, u: "can", c: "seafood" },
        { n: "Mayonnaise (avocado oil)", q: 2, u: "tbsp", c: "pantry" },
        { n: "Celery", q: 1, u: "item", c: "produce" },
        { n: "Olives", q: 6, u: "item", c: "pantry" },
      ], m: { fat: 28, protein: 30, fiber: 2, carb: 3, sugar: 1 }, prep: 8 },
    { id: "l7", slot: ["lunch", "dinner"], name: "Pork belly & bok choy",
      ing: [
        { n: "Pork belly", q: 4, u: "oz", c: "meat" },
        { n: "Bok choy", q: 1, u: "cup", c: "produce" },
        { n: "Ginger", q: 1, u: "tsp", c: "produce" },
        { n: "Coconut aminos", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 52, protein: 14, fiber: 2, carb: 4, sugar: 1 }, prep: 20 },
    { id: "l8", slot: ["lunch"], name: "Chicken Caesar (no croutons)",
      ing: [
        { n: "Chicken breast (organic)", q: 5, u: "oz", c: "meat" },
        { n: "Romaine lettuce", q: 2, u: "cup", c: "produce" },
        { n: "Parmesan cheese", q: 1, u: "oz", c: "dairy" },
        { n: "Anchovy", q: 2, u: "item", c: "seafood" },
        { n: "Olive oil", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 26, protein: 42, fiber: 2, carb: 4, sugar: 1 }, prep: 15 },

    // Dinners
    { id: "d1", slot: ["dinner"], name: "Slow-cooked short ribs",
      ing: [
        { n: "Beef short ribs (grass-fed)", q: 8, u: "oz", c: "meat" },
        { n: "Cauliflower", q: 1, u: "cup", c: "produce" },
        { n: "Garlic", q: 2, u: "clove", c: "produce" },
        { n: "Beef broth", q: 1, u: "cup", c: "pantry" },
      ], m: { fat: 52, protein: 44, fiber: 2, carb: 5, sugar: 2 }, prep: 180 },
    { id: "d2", slot: ["dinner"], name: "Duck breast & kale",
      ing: [
        { n: "Duck breast", q: 6, u: "oz", c: "meat" },
        { n: "Kale", q: 1, u: "cup", c: "produce" },
        { n: "Ghee", q: 1, u: "tbsp", c: "dairy" },
        { n: "Garlic", q: 1, u: "clove", c: "produce" },
      ], m: { fat: 38, protein: 35, fiber: 2, carb: 4, sugar: 1 }, prep: 25 },
    { id: "d3", slot: ["dinner"], name: "NY strip & Brussels sprouts",
      ing: [
        { n: "NY strip steak (grass-fed)", q: 6, u: "oz", c: "meat" },
        { n: "Brussels sprouts", q: 1, u: "cup", c: "produce" },
        { n: "Bacon", q: 2, u: "strip", c: "meat" },
        { n: "Olive oil", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 42, protein: 48, fiber: 3, carb: 7, sugar: 2 }, prep: 25 },
    { id: "d4", slot: ["dinner"], name: "Baked cod & zucchini noodles",
      ing: [
        { n: "Wild cod", q: 6, u: "oz", c: "seafood" },
        { n: "Zucchini", q: 2, u: "item", c: "produce" },
        { n: "Butter", q: 2, u: "tbsp", c: "dairy" },
        { n: "Lemon", q: 0.5, u: "item", c: "produce" },
        { n: "Parsley", q: 1, u: "tbsp", c: "produce" },
      ], m: { fat: 24, protein: 38, fiber: 3, carb: 8, sugar: 4 }, prep: 22 },
    { id: "d5", slot: ["dinner"], name: "Pork chops & cabbage slaw",
      ing: [
        { n: "Pork chops (pasture-raised)", q: 6, u: "oz", c: "meat" },
        { n: "Green cabbage", q: 1, u: "cup", c: "produce" },
        { n: "Mayonnaise (avocado oil)", q: 1, u: "tbsp", c: "pantry" },
        { n: "Apple cider vinegar", q: 1, u: "tsp", c: "pantry" },
      ], m: { fat: 32, protein: 42, fiber: 2, carb: 4, sugar: 2 }, prep: 20 },
    { id: "d6", slot: ["dinner"], name: "Lamb stew",
      ing: [
        { n: "Lamb stew meat", q: 6, u: "oz", c: "meat" },
        { n: "Celery", q: 2, u: "item", c: "produce" },
        { n: "Mushrooms", q: 1, u: "cup", c: "produce" },
        { n: "Beef broth", q: 1, u: "cup", c: "pantry" },
        { n: "Olive oil", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 32, protein: 40, fiber: 2, carb: 5, sugar: 2 }, prep: 60 },
    { id: "d7", slot: ["dinner"], name: "Shrimp stir-fry",
      ing: [
        { n: "Shrimp (wild)", q: 6, u: "oz", c: "seafood" },
        { n: "Broccoli", q: 1, u: "cup", c: "produce" },
        { n: "Bell pepper", q: 0.5, u: "item", c: "produce" },
        { n: "Ginger", q: 1, u: "tsp", c: "produce" },
        { n: "Sesame oil", q: 1, u: "tbsp", c: "pantry" },
        { n: "Coconut aminos", q: 1, u: "tbsp", c: "pantry" },
      ], m: { fat: 18, protein: 36, fiber: 4, carb: 8, sugar: 3 }, prep: 18 },
    { id: "d8", slot: ["dinner"], name: "Liver & onions",
      ing: [
        { n: "Beef liver (grass-fed)", q: 4, u: "oz", c: "meat" },
        { n: "Onion", q: 0.5, u: "item", c: "produce" },
        { n: "Butter", q: 2, u: "tbsp", c: "dairy" },
      ], m: { fat: 24, protein: 26, fiber: 1, carb: 6, sugar: 3 }, prep: 15 },

    // Snacks
    { id: "s1", slot: ["snack"], name: "Macadamia nuts",
      ing: [{ n: "Macadamia nuts", q: 1, u: "oz", c: "pantry" }],
      m: { fat: 21, protein: 2, fiber: 2.5, carb: 2, sugar: 1 }, prep: 0 },
    { id: "s2", slot: ["snack"], name: "Hard-boiled eggs",
      ing: [{ n: "Eggs", q: 2, u: "item", c: "eggs" }, { n: "Sea salt", q: 1, u: "tsp", c: "pantry" }],
      m: { fat: 10, protein: 12, fiber: 0, carb: 1, sugar: 0 }, prep: 12 },
    { id: "s3", slot: ["snack"], name: "Pork rinds & guac",
      ing: [
        { n: "Pork rinds", q: 1, u: "oz", c: "pantry" },
        { n: "Avocado", q: 0.5, u: "item", c: "produce" },
        { n: "Lime", q: 0.25, u: "item", c: "produce" },
      ], m: { fat: 22, protein: 12, fiber: 5, carb: 4, sugar: 0 }, prep: 5 },
    { id: "s4", slot: ["snack"], name: "Beef jerky (sugar-free)",
      ing: [{ n: "Grass-fed beef jerky (no sugar)", q: 1, u: "oz", c: "pantry" }],
      m: { fat: 4, protein: 14, fiber: 0, carb: 1, sugar: 0 }, prep: 0 },
    { id: "s5", slot: ["snack"], name: "Olives & hard cheese",
      ing: [
        { n: "Castelvetrano olives", q: 8, u: "item", c: "pantry" },
        { n: "Manchego cheese", q: 1, u: "oz", c: "dairy" },
      ], m: { fat: 16, protein: 7, fiber: 1, carb: 2, sugar: 0 }, prep: 0 },
    { id: "s6", slot: ["snack"], name: "Bone broth cup",
      ing: [{ n: "Bone broth (grass-fed)", q: 1, u: "cup", c: "pantry" }, { n: "Sea salt", q: 0.5, u: "tsp", c: "pantry" }],
      m: { fat: 1, protein: 10, fiber: 0, carb: 1, sugar: 0 }, prep: 5 },
  ];

  // ----- State -----
  const state = load();
  if (!state.weekStart) state.weekStart = mondayOf(new Date()).toISOString();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_PREFS));
      const parsed = JSON.parse(raw);
      return { ...JSON.parse(JSON.stringify(DEFAULT_PREFS)), ...parsed,
        bio: { ...DEFAULT_PREFS.bio, ...(parsed.bio || {}) },
        diet: { ...DEFAULT_PREFS.diet, ...(parsed.diet || {}) },
        schedule: { ...DEFAULT_PREFS.schedule, ...(parsed.schedule || {}) },
        location: { ...DEFAULT_PREFS.location, ...(parsed.location || {}) },
      };
    } catch {
      return JSON.parse(JSON.stringify(DEFAULT_PREFS));
    }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  // ----- Helpers -----
  function mondayOf(d) {
    const x = new Date(d);
    x.setHours(0,0,0,0);
    const day = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - day);
    return x;
  }
  function fmtDate(d) {
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  function calcKcal(meal) {
    return Math.round(meal.m.fat * 9 + meal.m.protein * 4 + meal.m.carb * 4);
  }
  function uid() { return Math.random().toString(36).slice(2, 9); }
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 1800);
  }

  // ----- Filtering / scoring -----
  function mealAllowed(meal) {
    const d = state.diet;
    const ingNames = meal.ing.map((i) => i.n.toLowerCase());
    const has = (re) => ingNames.some((n) => re.test(n));
    if (d.nomilk && has(/\b(milk|yogurt)\b/)) return false;
    if (d.nodairy && meal.ing.some((i) => i.c === "dairy")) return false;
    if (d.nofruit && has(/\b(apple|banana|orange|grape|berry|berries|mango|peach|pear|date|raisin|fruit|pineapple)\b/)) return false;
    if (d.noeggs && (has(/\beggs?\b/) || meal.ing.some((i) => i.c === "eggs"))) return false;
    if (d.noshellfish && has(/shrimp|prawn|lobster|crab|clam|mussel|oyster|scallop/)) return false;
    if (d.nosugar && meal.m.sugar > 4) return false;
    if (d.lowcarb && meal.m.carb > 12) return false;
    const avoidWords = (state.avoid || []).map((s) => s.toLowerCase());
    if (avoidWords.length && ingNames.some((n) => avoidWords.some((w) => n.includes(w)))) return false;
    return true;
  }

  function scoreMeal(meal) {
    let s = 0;
    const loved = (state.love || []).map((x) => x.toLowerCase());
    if (loved.length) {
      const hits = meal.ing.filter((i) => loved.some((w) => i.n.toLowerCase().includes(w))).length;
      s += hits * 5;
    }
    s += Math.random() * 2;
    return s;
  }

  function pickMeals(slot, count) {
    const pool = MEALS.filter((m) => m.slot.includes(slot) && mealAllowed(m));
    if (pool.length === 0) return [];
    const sorted = [...pool].sort((a, b) => scoreMeal(b) - scoreMeal(a));
    const out = [];
    const repeatMax = Math.max(1, Math.min(7, state.schedule.repeatMax || 2));
    const counts = {};
    let i = 0;
    while (out.length < count && i < count * 6) {
      const meal = sorted[i % sorted.length];
      const used = counts[meal.id] || 0;
      if (used < repeatMax) {
        out.push(meal.id);
        counts[meal.id] = used + 1;
      }
      i++;
      if (i % sorted.length === 0) sorted.sort(() => Math.random() - 0.5);
    }
    while (out.length < count) out.push(sorted[Math.floor(Math.random() * sorted.length)].id);
    return out;
  }

  function generateWeek() {
    const days = 7;
    const slots = ["breakfast", "lunch", "dinner"];
    if (state.schedule.snack) slots.push("snack");
    const week = [];
    const slotPicks = {};
    for (const s of slots) slotPicks[s] = pickMeals(s, days);
    for (let d = 0; d < days; d++) {
      const day = { meals: [] };
      for (const s of slots) {
        const id = slotPicks[s][d];
        if (id) day.meals.push({ slot: s, mealId: id });
      }
      week.push(day);
    }
    state.week = week;
    save();
  }

  function swapMeal(dayIdx, slot) {
    const day = state.week[dayIdx];
    const slotMeal = day.meals.find((m) => m.slot === slot);
    if (!slotMeal) return;
    const pool = MEALS.filter((m) => m.slot.includes(slot) && mealAllowed(m) && m.id !== slotMeal.mealId);
    if (pool.length === 0) return;
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    slotMeal.mealId = candidate.id;
    save();
    renderWeek();
    renderTotals();
    renderGrocery();
  }

  // ----- Rendering -----
  function renderLoveAvoidChips() {
    const loveCandidates = [
      "Beef", "Chicken", "Salmon", "Pork", "Lamb", "Duck", "Eggs",
      "Avocado", "Spinach", "Broccoli", "Kale", "Cauliflower",
      "Asparagus", "Brussels sprouts", "Zucchini", "Cucumber",
      "Butter", "Olive oil", "Coconut", "Cheese",
      "Sardines", "Tuna", "Shrimp", "Bacon", "Liver",
    ];
    const avoidCandidates = [
      "Liver", "Lamb", "Pork", "Shellfish", "Eggs",
      "Cheese", "Butter", "Coconut", "Olives", "Mushrooms", "Onion",
      "Bell pepper", "Cabbage", "Bok choy", "Anchovy",
    ];
    const renderChips = (id, list, key) => {
      const c = document.getElementById(id);
      c.innerHTML = "";
      for (const item of list) {
        const lbl = document.createElement("label");
        lbl.className = "chip";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = item;
        cb.checked = (state[key] || []).map((x) => x.toLowerCase()).includes(item.toLowerCase());
        cb.addEventListener("change", () => {
          const set = new Set((state[key] || []).map((x) => x.toLowerCase()));
          if (cb.checked) set.add(item.toLowerCase()); else set.delete(item.toLowerCase());
          state[key] = Array.from(set);
          save();
          updateSummary();
        });
        const span = document.createElement("span");
        span.textContent = item;
        lbl.appendChild(cb);
        lbl.appendChild(span);
        c.appendChild(lbl);
      }
    };
    renderChips("love-chips", loveCandidates, "love");
    renderChips("avoid-chips", avoidCandidates, "avoid");
  }

  function readPrefsFromForm() {
    state.kcal = Number(document.getElementById("kcal-target").value) || 2000;
    state.bio = {
      sex: document.getElementById("bio-sex").value,
      age: Number(document.getElementById("bio-age").value) || 35,
      weight: Number(document.getElementById("bio-weight").value) || 75,
      height: Number(document.getElementById("bio-height").value) || 175,
      activity: Number(document.getElementById("bio-activity").value) || 1.55,
      goal: Number(document.getElementById("bio-goal").value) || 1,
    };
    state.diet = {
      lowcarb: document.getElementById("diet-lowcarb").checked,
      nosugar: document.getElementById("diet-nosugar").checked,
      nomilk: document.getElementById("diet-nomilk").checked,
      nodairy: document.getElementById("diet-nodairy").checked,
      nofruit: document.getElementById("diet-nofruit").checked,
      noeggs: document.getElementById("diet-noeggs").checked,
      noshellfish: document.getElementById("diet-noshellfish").checked,
      organic: document.getElementById("diet-organic").checked,
    };
    state.schedule = {
      b: document.getElementById("time-b").value,
      l: document.getElementById("time-l").value,
      d: document.getElementById("time-d").value,
      s: document.getElementById("time-s").value,
      snack: document.getElementById("want-snack").checked,
      repeatMax: Number(document.getElementById("repeat-max").value) || 2,
    };
    state.location.text = document.getElementById("loc-input").value.trim();
  }

  function writePrefsToForm() {
    document.getElementById("kcal-target").value = state.kcal;
    document.getElementById("bio-sex").value = state.bio.sex;
    document.getElementById("bio-age").value = state.bio.age;
    document.getElementById("bio-weight").value = state.bio.weight;
    document.getElementById("bio-height").value = state.bio.height;
    document.getElementById("bio-activity").value = state.bio.activity;
    document.getElementById("bio-goal").value = state.bio.goal;
    document.getElementById("diet-lowcarb").checked = state.diet.lowcarb;
    document.getElementById("diet-nosugar").checked = state.diet.nosugar;
    document.getElementById("diet-nomilk").checked = state.diet.nomilk;
    document.getElementById("diet-nodairy").checked = state.diet.nodairy;
    document.getElementById("diet-nofruit").checked = state.diet.nofruit;
    document.getElementById("diet-noeggs").checked = state.diet.noeggs;
    document.getElementById("diet-noshellfish").checked = state.diet.noshellfish;
    document.getElementById("diet-organic").checked = state.diet.organic;
    document.getElementById("time-b").value = state.schedule.b;
    document.getElementById("time-l").value = state.schedule.l;
    document.getElementById("time-d").value = state.schedule.d;
    document.getElementById("time-s").value = state.schedule.s;
    document.getElementById("want-snack").checked = !!state.schedule.snack;
    document.getElementById("repeat-max").value = state.schedule.repeatMax;
    document.getElementById("loc-input").value = state.location.text || "";
  }

  function updateSummary() {
    const dietBits = Object.entries(state.diet).filter(([, v]) => v).map(([k]) => k);
    const bits = [
      `${state.kcal} kcal/day`,
      dietBits.length ? dietBits.length + " diet rules" : "no diet rules",
      state.love.length ? `${state.love.length} loved` : null,
      state.avoid.length ? `${state.avoid.length} avoided` : null,
      state.location.text ? `📍 ${state.location.text}` : null,
    ].filter(Boolean);
    document.getElementById("prefs-summary").textContent = bits.join(" · ");
  }

  function renderWeek() {
    const grid = document.getElementById("week-grid");
    grid.innerHTML = "";
    if (!state.week) {
      grid.innerHTML = `<p class="hint center">Set preferences above and click <strong>Generate week</strong>.</p>`;
      document.getElementById("week-label").textContent = "—";
      return;
    }
    const start = new Date(state.weekStart);
    document.getElementById("week-label").textContent =
      `${fmtDate(start)} – ${fmtDate(new Date(start.getTime() + 6 * 86400000))}`;
    const slotMeta = {
      breakfast: { label: "Breakfast", t: state.schedule.b },
      lunch: { label: "Lunch", t: state.schedule.l },
      dinner: { label: "Dinner", t: state.schedule.d },
      snack: { label: "Snack", t: state.schedule.s },
    };
    state.week.forEach((day, di) => {
      const date = new Date(start.getTime() + di * 86400000);
      const col = document.createElement("div");
      col.className = "day-col";
      col.innerHTML = `<h3>${fmtDate(date)}</h3>`;
      for (const sm of day.meals) {
        const meal = MEALS.find((m) => m.id === sm.mealId);
        if (!meal) continue;
        const kcal = calcKcal(meal);
        const card = document.createElement("div");
        card.className = "meal-slot";
        const meta = slotMeta[sm.slot];
        card.innerHTML = `
          <div class="slot-head">
            <span class="slot-time">${meta.label} · ${meta.t}</span>
            <button class="link-btn" data-swap aria-label="Swap meal">↻</button>
          </div>
          <div class="meal-name">${escapeHtml(meal.name)}</div>
          <div class="meal-macros">${kcal} kcal · F${meal.m.fat} P${meal.m.protein} Fib${meal.m.fiber} C${meal.m.carb}</div>
          <details class="meal-ings">
            <summary>${meal.ing.length} ingredients · ${meal.prep} min</summary>
            <ul>${meal.ing.map((i) => `<li>${formatQty(i.q, i.u)} ${escapeHtml(i.n)}</li>`).join("")}</ul>
          </details>
        `;
        card.querySelector("[data-swap]").addEventListener("click", () => swapMeal(di, sm.slot));
        col.appendChild(card);
      }
      grid.appendChild(col);
    });
  }

  function renderTotals() {
    const c = document.getElementById("totals-grid");
    c.innerHTML = "";
    if (!state.week) return;
    const start = new Date(state.weekStart);
    state.week.forEach((day, di) => {
      const t = { fat: 0, protein: 0, fiber: 0, carb: 0, sugar: 0, kcal: 0 };
      for (const sm of day.meals) {
        const meal = MEALS.find((m) => m.id === sm.mealId);
        if (!meal) continue;
        t.fat += meal.m.fat;
        t.protein += meal.m.protein;
        t.fiber += meal.m.fiber;
        t.carb += meal.m.carb;
        t.sugar += meal.m.sugar;
        t.kcal += calcKcal(meal);
      }
      const date = new Date(start.getTime() + di * 86400000);
      const goalPct = Math.round((t.kcal / state.kcal) * 100);
      const card = document.createElement("div");
      card.className = "total-card";
      card.innerHTML = `
        <strong>${date.toLocaleDateString([], { weekday: "short" })}</strong>
        <div class="big">${t.kcal} <small>kcal</small></div>
        <div class="hint">${goalPct}% of ${state.kcal}</div>
        <div class="macro-row">F${t.fat} · P${t.protein} · Fib${t.fiber} · C${t.carb} · S${t.sugar}</div>
      `;
      c.appendChild(card);
    });
  }

  function formatQty(q, u) {
    if (Number.isInteger(q)) return `${q} ${u}`;
    return `${(+q.toFixed(2))} ${u}`;
  }

  function buildGrocery() {
    if (!state.week) return {};
    const agg = {};
    for (const day of state.week) {
      for (const sm of day.meals) {
        const meal = MEALS.find((m) => m.id === sm.mealId);
        if (!meal) continue;
        for (const ing of meal.ing) {
          const key = `${ing.c}::${ing.n}::${ing.u}`;
          if (!agg[key]) agg[key] = { ...ing, q: 0 };
          agg[key].q += ing.q;
        }
      }
    }
    const byCat = {};
    for (const v of Object.values(agg)) {
      (byCat[v.c] = byCat[v.c] || []).push(v);
    }
    for (const arr of Object.values(byCat)) arr.sort((a, b) => a.n.localeCompare(b.n));
    return byCat;
  }

  function renderGrocery() {
    const grid = document.getElementById("grocery-grid");
    grid.innerHTML = "";
    const byCat = buildGrocery();
    if (Object.keys(byCat).length === 0) {
      grid.innerHTML = `<p class="hint center">Generate a week to see your grocery list.</p>`;
      return;
    }
    const labels = {
      meat: "Meat", seafood: "Seafood", produce: "Produce",
      dairy: "Dairy", eggs: "Eggs", pantry: "Pantry & oils",
    };
    const order = ["meat", "seafood", "eggs", "dairy", "produce", "pantry"];
    for (const k of order) {
      if (!byCat[k]) continue;
      const block = document.createElement("div");
      block.className = "grocery-block";
      block.innerHTML = `<h4>${labels[k] || k}</h4>`;
      const ul = document.createElement("ul");
      for (const i of byCat[k]) {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="checkbox" /> <span>${formatQty(i.q, i.u)} ${escapeHtml(i.n)}</span></label>`;
        ul.appendChild(li);
      }
      block.appendChild(ul);
      grid.appendChild(block);
    }
  }

  function groceryAsText() {
    const byCat = buildGrocery();
    const labels = { meat:"Meat", seafood:"Seafood", produce:"Produce", dairy:"Dairy", eggs:"Eggs", pantry:"Pantry & oils" };
    const order = ["meat","seafood","eggs","dairy","produce","pantry"];
    const lines = ["Goodfood — Weekly grocery list", ""];
    for (const k of order) {
      if (!byCat[k]) continue;
      lines.push(`== ${labels[k] || k} ==`);
      for (const i of byCat[k]) lines.push(`- ${formatQty(i.q, i.u)} ${i.n}`);
      lines.push("");
    }
    return lines.join("\n");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#39;",
    })[c]);
  }

  // ----- Store finder -----
  function renderStores() {
    const grid = document.getElementById("stores-grid");
    grid.innerHTML = "";
    const loc = state.location;
    const where = loc.lat && loc.lon ? `${loc.lat},${loc.lon}` : loc.text;
    document.getElementById("nearby-loc").textContent = where
      ? `Searching near: ${loc.text || `${loc.lat.toFixed(3)}, ${loc.lon.toFixed(3)}`}`
      : "Set your location above";
    if (!where) return;
    const searches = [
      { label: "Organic grocery", q: "organic grocery store" },
      { label: "Farmers market", q: "farmers market" },
      { label: "Butcher (grass-fed)", q: "grass-fed butcher" },
      { label: "Fishmonger / seafood", q: "seafood market wild caught" },
      { label: "Whole Foods", q: "Whole Foods Market" },
      { label: "Sprouts", q: "Sprouts Farmers Market" },
      { label: "Trader Joe's", q: "Trader Joe's" },
      { label: "Costco (bulk)", q: "Costco Wholesale" },
      { label: "Health food store", q: "health food store" },
      { label: "Local CSA / farm box", q: "CSA farm box subscription" },
    ];
    for (const s of searches) {
      const params = new URLSearchParams({ api: "1", query: `${s.q} near ${where}` });
      const url = `https://www.google.com/maps/search/?${params.toString()}`;
      const a = document.createElement("a");
      a.className = "store-link";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.href = url;
      a.innerHTML = `<strong>${s.label}</strong><span>Open in Maps →</span>`;
      grid.appendChild(a);
    }
  }

  // ----- Wire events -----
  document.getElementById("calc-kcal").addEventListener("click", () => {
    const sex = document.getElementById("bio-sex").value;
    const age = +document.getElementById("bio-age").value;
    const w = +document.getElementById("bio-weight").value;
    const h = +document.getElementById("bio-height").value;
    const act = +document.getElementById("bio-activity").value;
    const goal = +document.getElementById("bio-goal").value;
    const bmr = sex === "m"
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;
    const target = Math.round((bmr * act * goal) / 25) * 25;
    document.getElementById("kcal-target").value = target;
    toast(`Target set to ${target} kcal`);
  });

  document.getElementById("save-prefs").addEventListener("click", () => {
    readPrefsFromForm();
    save();
    updateSummary();
    toast("Preferences saved");
  });

  document.getElementById("generate-btn").addEventListener("click", () => {
    readPrefsFromForm();
    save();
    generateWeek();
    renderWeek();
    renderTotals();
    renderGrocery();
    renderStores();
    updateSummary();
    toast("Week generated");
  });

  document.getElementById("reshuffle-btn").addEventListener("click", () => {
    if (!state.week) return;
    generateWeek();
    renderWeek();
    renderTotals();
    renderGrocery();
    toast("Reshuffled");
  });

  document.getElementById("prev-week").addEventListener("click", () => {
    state.weekStart = new Date(new Date(state.weekStart).getTime() - 7 * 86400000).toISOString();
    save();
    renderWeek();
    renderTotals();
  });
  document.getElementById("next-week").addEventListener("click", () => {
    state.weekStart = new Date(new Date(state.weekStart).getTime() + 7 * 86400000).toISOString();
    save();
    renderWeek();
    renderTotals();
  });

  document.getElementById("print-btn").addEventListener("click", () => window.print());

  document.getElementById("copy-grocery").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(groceryAsText());
      toast("Copied to clipboard");
    } catch { toast("Copy failed"); }
  });
  document.getElementById("download-grocery").addEventListener("click", () => {
    const blob = new Blob([groceryAsText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `goodfood-grocery-${new Date(state.weekStart).toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("loc-geo").addEventListener("click", () => {
    const status = document.getElementById("loc-status");
    if (!navigator.geolocation) { status.textContent = "Geolocation not supported."; return; }
    status.textContent = "Finding your location…";
    navigator.geolocation.getCurrentPosition((pos) => {
      state.location.lat = pos.coords.latitude;
      state.location.lon = pos.coords.longitude;
      state.location.text = `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;
      document.getElementById("loc-input").value = state.location.text;
      save();
      status.textContent = "Location set.";
      renderStores();
      updateSummary();
    }, (err) => {
      status.textContent = `Could not get location: ${err.message}`;
    });
  });
  document.getElementById("loc-input").addEventListener("change", (e) => {
    state.location.text = e.target.value.trim();
    state.location.lat = null;
    state.location.lon = null;
    save();
    renderStores();
    updateSummary();
  });

  // ----- Init -----
  renderLoveAvoidChips();
  writePrefsToForm();
  updateSummary();
  if (!state.week) {
    // generate a default first week so it's useful immediately
    generateWeek();
  }
  renderWeek();
  renderTotals();
  renderGrocery();
  renderStores();
})();
