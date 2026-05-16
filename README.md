# Goodfood — Healthy Lifestyle Tracker

A single-page web app that tracks a low-carb, zero-sugar, organic lifestyle with macros, hydration, exercise, sleep, and stress.

## The plan it's built around

- **Eat**: fat, protein, fiber. Organic / grass-fed / wild-caught where possible.
- **Avoid**: sugar, milk, fruit, grains, legumes, starchy vegetables.
- **Move**: 60 minutes of exercise per day.
- **Recover**: 8 hours of sleep, low stress, daily mindfulness practice.
- **Hydrate**: 10 cups water + sodium / electrolytes (important on low-carb).

## Features

- **Macro tracking** — fat, protein, fiber tracked as targets; net carbs and sugar tracked as **caps** (bars turn red when exceeded).
- **Auto-calculated calories** from fat × 9 + protein × 4 + carb × 4.
- **Approved foods library** — click a food (organic ribeye, avocado, broccoli, etc.) to prefill its macros.
- **Banned-ingredient guard** — typing "milk", "sugar", "banana", "rice", etc. surfaces a warning and asks for confirmation before logging.
- **Organic share** — daily % of meals tagged organic.
- **Exercise log** — name, duration, intensity. Default goal: 60 min/day.
- **Sleep + stress + mood** — default goal: 8 hours, stress rating 1–5.
- **Stress-less practices** — outdoor walk, breathing, meditation, journal, screens-off, plus mindfulness minutes.
- **Hydration** — tap cups, log sodium mg, electrolytes taken.
- **Daily ring** — combined progress; ring turns red if carb or sugar cap is broken.
- **7-day macro trend** — at-a-glance recent days.
- **Date navigation, custom goals, JSON export, full reset.**
- All data stored in `localStorage` — nothing leaves your browser.

## Run it

No build step. Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

- `index.html` — markup and structure
- `styles.css` — layout and theming
- `app.js` — state, rendering, food library, event handling
