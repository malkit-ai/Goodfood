(() => {
  const STORAGE_KEY = "goodfood.lang";

  const dict = {
    en: {
      "lang.en": "EN",
      "lang.pa": "ਪੰ",
      "brand.title": "Goodfood",
      "tagline.tracker": "Organic · low-carb · zero-sugar · fat · protein · fiber",
      "tagline.plan": "Plan the week · groceries · fresh near you",
      "nav.tracker": "Tracker",
      "nav.plan": "Meal Plan",

      // Tracker — summary
      "stat.fat": "Fat",
      "stat.protein": "Protein",
      "stat.fiber": "Fiber",
      "stat.netCarbsCap": "Net carbs (cap)",
      "stat.sugarCap": "Sugar (cap)",
      "stat.water": "Water",
      "stat.organicMeals": "Organic meals",
      "stat.dailyGoals": "daily goals",
      "unit.g": "g",
      "unit.cups": "cups",
      "unit.kcal": "kcal",
      "unit.min": "min",
      "unit.hrs": "hrs",

      // Tracker cards
      "card.waterTitle": "Water & electrolytes",
      "card.waterHint": "Low-carb increases water + sodium needs. Tap cups; log salt & electrolytes.",
      "btn.addCup": "+ Add cup",
      "label.sodium": "Sodium (mg)",
      "label.electrolytes": "Electrolytes",
      "opt.dash": "—",
      "opt.taken": "Taken",
      "opt.skipped": "Skipped",
      "btn.save": "Save",

      "card.mealsTitle": "Meal log",
      "card.mealsHint": "Macros only — organic, no milk, no fruit, no sugar. Calories auto-calculated.",
      "ph.mealName": "e.g. Ribeye with butter & spinach",
      "opt.breakfast": "Breakfast",
      "opt.lunch": "Lunch",
      "opt.dinner": "Dinner",
      "opt.snack": "Snack",
      "label.fatG": "Fat (g)",
      "label.proG": "Protein (g)",
      "label.fibG": "Fiber (g)",
      "label.netCarbsG": "Net carbs (g)",
      "label.sugarG": "Sugar (g)",
      "label.organicToggle": "Organic / grass-fed / wild-caught",
      "btn.addMeal": "Add meal",

      "card.approvedTitle": "Approved foods",
      "card.approvedHint": "Choose organic / grass-fed / wild whenever possible. Click to prefill the meal form.",
      "h.fat": "Fat",
      "h.protein": "Protein",
      "h.fiber": "Fiber (low-carb veg)",
      "h.avoid": "Avoid",
      "avoid.sugar": "All sugars & sweeteners with calories",
      "avoid.milk": "Milk, yogurt drinks (cream & hard cheese ok if tolerated)",
      "avoid.fruit": "All fruit (incl. bananas, apples, grapes, dates)",
      "avoid.grains": "Grains, bread, rice, pasta, oats",
      "avoid.legumes": "Legumes (beans, lentils, chickpeas)",
      "avoid.starchy": "Starchy veg (potato, corn, peas)",
      "avoid.drinks": "Sweetened drinks & juice",

      "card.exerciseTitle": "Exercise",
      "ph.exName": "e.g. Heavy lifts, walk, sprints",
      "ph.minutes": "minutes",
      "opt.light": "Light",
      "opt.moderate": "Moderate",
      "opt.vigorous": "Vigorous",
      "btn.add": "Add",

      "card.sleepTitle": "Sleep, stress & mood",
      "card.sleepHint": "Target: 8h sleep · stress less every day.",
      "label.hoursSlept": "Hours slept",
      "label.stress": "Stress (1–5)",
      "opt.stress1": "1 — calm",
      "opt.stress5": "5 — overwhelmed",
      "label.mood": "Mood",
      "opt.great": "Great",
      "opt.good": "Good",
      "opt.okay": "Okay",
      "opt.low": "Low",
      "label.mindfulness": "Mindfulness / breathing (min)",
      "practice.walk": "Outdoor walk",
      "practice.breathing": "Breathing",
      "practice.meditation": "Meditation",
      "practice.journal": "Journal",
      "practice.screens": "Screens off 1h",
      "btn.savePractice": "Save practice",

      "card.trendTitle": "7-day macro trend",
      "legend.fat": "Fat",
      "legend.protein": "Protein",
      "legend.fiber": "Fiber",
      "legend.carbs": "Net carbs",
      "legend.sugar": "Sugar",

      "card.goalsTitle": "Goals",
      "label.carbCap": "Net carbs cap (g)",
      "label.sugarCap": "Sugar cap (g)",
      "label.waterCups": "Water (cups)",
      "btn.saveGoals": "Save goals",
      "btn.exportData": "Export data",
      "btn.resetData": "Reset all data",

      // Tracker statuses / toasts
      "status.noMeals": "No meals logged yet.",
      "status.noExercise": "No exercise logged yet. Goal: {n} min.",
      "status.noEntries": "No entries yet.",
      "status.belowSleep": "below 8h target",
      "toast.mealAdded": "Meal added",
      "toast.exerciseLogged": "Exercise logged",
      "toast.sleepSaved": "Sleep & mood saved",
      "toast.practiceSaved": "Practice saved",
      "toast.goalsUpdated": "Goals updated",
      "toast.hydrationSaved": "Hydration saved",
      "toast.allCleared": "All data cleared",
      "confirm.reset": "Erase all logged data and goals? This cannot be undone.",
      "confirm.bannedFood": "This food is on the avoid list. Log it anyway?",
      "meal.organic": "organic",
      "meal.conventional": "conventional",
      "meal.warningTpl": "\"{words}\" doesn't fit the plan (no sugar, milk, fruit, grains, starch). Pick a fat / protein / fiber option.",

      // Planner — prefs
      "prefs.title": "Your preferences",
      "legend.kcalTarget": "Calorie target",
      "label.targetKcal": "Target (kcal/day)",
      "bmr.summary": "Calculate from my stats",
      "label.sex": "Sex",
      "opt.male": "Male",
      "opt.female": "Female",
      "label.age": "Age",
      "label.weightKg": "Weight (kg)",
      "label.heightCm": "Height (cm)",
      "label.activity": "Activity",
      "opt.sedentary": "Sedentary",
      "opt.lightAct": "Light (1–3 d/wk)",
      "opt.moderateAct": "Moderate (3–5 d/wk)",
      "opt.active": "Active (6–7 d/wk)",
      "opt.veryActive": "Very active",
      "label.goal": "Goal",
      "opt.loseFat": "Lose fat",
      "opt.maintain": "Maintain",
      "opt.gainMuscle": "Gain muscle",
      "btn.apply": "Apply",

      "legend.dietStyle": "Diet style",
      "diet.lowcarb": "Low-carb / keto",
      "diet.nosugar": "Zero added sugar",
      "diet.nomilk": "No milk / yogurt",
      "diet.nodairy": "No dairy at all (excludes butter/cheese)",
      "diet.nofruit": "No fruit",
      "diet.noeggs": "No eggs",
      "diet.noshellfish": "No shellfish",
      "diet.organic": "Prefer organic / grass-fed / wild",

      "legend.love": "Foods you love",
      "hint.love": "Picked meals lean on these.",
      "legend.avoidList": "Foods to avoid",
      "hint.avoidList": "Meals containing these are skipped.",

      "legend.schedule": "Meal schedule",
      "label.includeSnack": "Include a snack",
      "label.repeatMax": "Meals/week to repeat max",

      "legend.location": "Location",
      "label.cityZip": "City or ZIP/postcode",
      "ph.cityZip": "e.g. 94110 or Berkeley, CA",
      "btn.useLocation": "Use my location",
      "hint.locationOptional": "Optional — used to find fresh groceries.",

      "btn.generateWeek": "Generate week",
      "btn.reshuffle": "Reshuffle",
      "btn.savePrefs": "Save preferences",

      "card.thisWeek": "This week",
      "btn.print": "Print",
      "card.dailyTotals": "Daily totals",
      "card.groceryList": "Grocery list",
      "btn.copy": "Copy",
      "btn.downloadTxt": "Download .txt",
      "card.storesTitle": "Fresh groceries near you",
      "stores.placeholder": "Set your location above",
      "stores.searchingNear": "Searching near: {where}",
      "stores.openInMaps": "Open in Maps →",
      "store.organic": "Organic grocery",
      "store.farmers": "Farmers market",
      "store.butcher": "Butcher (grass-fed)",
      "store.fishmonger": "Fishmonger / seafood",
      "store.wholeFoods": "Whole Foods",
      "store.sprouts": "Sprouts",
      "store.traderJoes": "Trader Joe's",
      "store.costco": "Costco (bulk)",
      "store.healthFood": "Health food store",
      "store.csa": "Local CSA / farm box",

      "grocery.cat.meat": "Meat",
      "grocery.cat.seafood": "Seafood",
      "grocery.cat.eggs": "Eggs",
      "grocery.cat.dairy": "Dairy",
      "grocery.cat.produce": "Produce",
      "grocery.cat.pantry": "Pantry & oils",
      "grocery.empty": "Generate a week to see your grocery list.",
      "grocery.weekHeader": "Goodfood — Weekly grocery list",
      "week.empty": "Set preferences above and click Generate week.",
      "week.kcalOfTarget": "{pct}% of {target}",
      "week.ingredients": "{n} ingredients · {min} min",
      "toast.weekGenerated": "Week generated",
      "toast.reshuffled": "Reshuffled",
      "toast.copied": "Copied to clipboard",
      "toast.copyFailed": "Copy failed",
      "toast.prefsSaved": "Preferences saved",
      "toast.targetSet": "Target set to {n} kcal",
      "loc.finding": "Finding your location…",
      "loc.set": "Location set.",
      "loc.errPrefix": "Could not get location: ",
      "loc.unsupported": "Geolocation not supported.",
    },

    pa: {
      "lang.en": "EN",
      "lang.pa": "ਪੰ",
      "brand.title": "ਗੁਡਫੂਡ",
      "tagline.tracker": "ਆਰਗੈਨਿਕ · ਘੱਟ-ਕਾਰਬ · ਜ਼ੀਰੋ ਸ਼ੂਗਰ · ਚਰਬੀ · ਪ੍ਰੋਟੀਨ · ਫਾਈਬਰ",
      "tagline.plan": "ਹਫ਼ਤੇ ਦੀ ਯੋਜਨਾ · ਕਰਿਆਨਾ · ਤੁਹਾਡੇ ਨੇੜੇ ਤਾਜ਼ਾ",
      "nav.tracker": "ਟ੍ਰੈਕਰ",
      "nav.plan": "ਮੀਲ ਪਲੈਨ",

      "stat.fat": "ਚਰਬੀ",
      "stat.protein": "ਪ੍ਰੋਟੀਨ",
      "stat.fiber": "ਫਾਈਬਰ",
      "stat.netCarbsCap": "ਨੈੱਟ ਕਾਰਬਸ (ਹੱਦ)",
      "stat.sugarCap": "ਸ਼ੂਗਰ (ਹੱਦ)",
      "stat.water": "ਪਾਣੀ",
      "stat.organicMeals": "ਆਰਗੈਨਿਕ ਖਾਣੇ",
      "stat.dailyGoals": "ਰੋਜ਼ਾਨਾ ਟੀਚੇ",
      "unit.g": "g",
      "unit.cups": "ਕੱਪ",
      "unit.kcal": "kcal",
      "unit.min": "ਮਿੰਟ",
      "unit.hrs": "ਘੰਟੇ",

      "card.waterTitle": "ਪਾਣੀ ਤੇ ਇਲੈਕਟ੍ਰੋਲਾਈਟ",
      "card.waterHint": "ਘੱਟ-ਕਾਰਬ ਨਾਲ ਪਾਣੀ ਤੇ ਸੋਡੀਅਮ ਦੀ ਲੋੜ ਵਧਦੀ ਹੈ। ਕੱਪ ਉੱਤੇ ਟੈਪ ਕਰੋ; ਨਮਕ ਤੇ ਇਲੈਕਟ੍ਰੋਲਾਈਟ ਲੌਗ ਕਰੋ।",
      "btn.addCup": "+ ਕੱਪ ਜੋੜੋ",
      "label.sodium": "ਸੋਡੀਅਮ (mg)",
      "label.electrolytes": "ਇਲੈਕਟ੍ਰੋਲਾਈਟ",
      "opt.dash": "—",
      "opt.taken": "ਲਿਆ",
      "opt.skipped": "ਛੱਡਿਆ",
      "btn.save": "ਸੰਭਾਲੋ",

      "card.mealsTitle": "ਖਾਣੇ ਦਾ ਲੌਗ",
      "card.mealsHint": "ਸਿਰਫ਼ ਮੈਕਰੋ — ਆਰਗੈਨਿਕ, ਦੁੱਧ ਨਹੀਂ, ਫਲ ਨਹੀਂ, ਸ਼ੂਗਰ ਨਹੀਂ। ਕੈਲੋਰੀ ਆਪੇ ਗਿਣੇ ਜਾਣਗੇ।",
      "ph.mealName": "ਜਿਵੇਂ ਮੱਖਣ ਤੇ ਪਾਲਕ ਨਾਲ ਰਿਬਆਈ",
      "opt.breakfast": "ਨਾਸ਼ਤਾ",
      "opt.lunch": "ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ",
      "opt.dinner": "ਰਾਤ ਦਾ ਖਾਣਾ",
      "opt.snack": "ਸਨੈਕ",
      "label.fatG": "ਚਰਬੀ (g)",
      "label.proG": "ਪ੍ਰੋਟੀਨ (g)",
      "label.fibG": "ਫਾਈਬਰ (g)",
      "label.netCarbsG": "ਨੈੱਟ ਕਾਰਬਸ (g)",
      "label.sugarG": "ਸ਼ੂਗਰ (g)",
      "label.organicToggle": "ਆਰਗੈਨਿਕ / ਘਾਹ-ਖਾਧਾ / ਜੰਗਲੀ",
      "btn.addMeal": "ਖਾਣਾ ਜੋੜੋ",

      "card.approvedTitle": "ਮਨਜ਼ੂਰ ਖਾਣੇ",
      "card.approvedHint": "ਜਿੱਥੇ ਹੋ ਸਕੇ ਆਰਗੈਨਿਕ / ਘਾਹ-ਖਾਧਾ / ਜੰਗਲੀ ਚੁਣੋ। ਫਾਰਮ ਭਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ।",
      "h.fat": "ਚਰਬੀ",
      "h.protein": "ਪ੍ਰੋਟੀਨ",
      "h.fiber": "ਫਾਈਬਰ (ਘੱਟ-ਕਾਰਬ ਸਬਜ਼ੀ)",
      "h.avoid": "ਪਰਹੇਜ਼",
      "avoid.sugar": "ਹਰ ਕਿਸਮ ਦੀ ਸ਼ੂਗਰ ਤੇ ਮਿੱਠੇ ਪਦਾਰਥ",
      "avoid.milk": "ਦੁੱਧ, ਦਹੀਂ ਡ੍ਰਿੰਕ (ਕਰੀਮ ਤੇ ਸਖ਼ਤ ਪਨੀਰ ਜੇ ਸਹਿਣ ਹੋਣ ਤਾਂ ਠੀਕ)",
      "avoid.fruit": "ਸਾਰੇ ਫਲ (ਕੇਲਾ, ਸੇਬ, ਅੰਗੂਰ, ਖਜੂਰ ਸਮੇਤ)",
      "avoid.grains": "ਅਨਾਜ, ਰੋਟੀ, ਚੌਲ, ਪਾਸਤਾ, ਜਵੀ",
      "avoid.legumes": "ਦਾਲਾਂ (ਰਾਜਮਾ, ਮਸਰ, ਛੋਲੇ)",
      "avoid.starchy": "ਨਿਸ਼ਾਸਤੇਦਾਰ ਸਬਜ਼ੀਆਂ (ਆਲੂ, ਮੱਕੀ, ਮਟਰ)",
      "avoid.drinks": "ਮਿੱਠੇ ਪੀਣ ਵਾਲੇ ਤੇ ਜੂਸ",

      "card.exerciseTitle": "ਕਸਰਤ",
      "ph.exName": "ਜਿਵੇਂ ਭਾਰੀ ਲਿਫ਼ਟ, ਸੈਰ, ਸਪ੍ਰਿੰਟ",
      "ph.minutes": "ਮਿੰਟ",
      "opt.light": "ਹਲਕੀ",
      "opt.moderate": "ਦਰਮਿਆਨੀ",
      "opt.vigorous": "ਤੇਜ਼",
      "btn.add": "ਜੋੜੋ",

      "card.sleepTitle": "ਨੀਂਦ, ਤਣਾਅ ਤੇ ਮੂਡ",
      "card.sleepHint": "ਟੀਚਾ: 8 ਘੰਟੇ ਨੀਂਦ · ਰੋਜ਼ਾਨਾ ਘੱਟ ਤਣਾਅ।",
      "label.hoursSlept": "ਸੁੱਤੇ ਘੰਟੇ",
      "label.stress": "ਤਣਾਅ (1–5)",
      "opt.stress1": "1 — ਸ਼ਾਂਤ",
      "opt.stress5": "5 — ਬਹੁਤ ਜ਼ਿਆਦਾ",
      "label.mood": "ਮੂਡ",
      "opt.great": "ਬਹੁਤ ਵਧੀਆ",
      "opt.good": "ਵਧੀਆ",
      "opt.okay": "ਠੀਕ",
      "opt.low": "ਘੱਟ",
      "label.mindfulness": "ਮਨਨ / ਸਾਹ (ਮਿੰਟ)",
      "practice.walk": "ਬਾਹਰ ਦੀ ਸੈਰ",
      "practice.breathing": "ਸਾਹ",
      "practice.meditation": "ਮਨਨ",
      "practice.journal": "ਡਾਇਰੀ",
      "practice.screens": "1 ਘੰਟਾ ਸਕਰੀਨ ਬੰਦ",
      "btn.savePractice": "ਪ੍ਰੈਕਟਿਸ ਸੰਭਾਲੋ",

      "card.trendTitle": "7-ਦਿਨ ਮੈਕਰੋ ਰੁਝਾਨ",
      "legend.fat": "ਚਰਬੀ",
      "legend.protein": "ਪ੍ਰੋਟੀਨ",
      "legend.fiber": "ਫਾਈਬਰ",
      "legend.carbs": "ਨੈੱਟ ਕਾਰਬਸ",
      "legend.sugar": "ਸ਼ੂਗਰ",

      "card.goalsTitle": "ਟੀਚੇ",
      "label.carbCap": "ਨੈੱਟ ਕਾਰਬਸ ਹੱਦ (g)",
      "label.sugarCap": "ਸ਼ੂਗਰ ਹੱਦ (g)",
      "label.waterCups": "ਪਾਣੀ (ਕੱਪ)",
      "btn.saveGoals": "ਟੀਚੇ ਸੰਭਾਲੋ",
      "btn.exportData": "ਡਾਟਾ ਨਿਰਯਾਤ",
      "btn.resetData": "ਸਾਰਾ ਡਾਟਾ ਮਿਟਾਓ",

      "status.noMeals": "ਅਜੇ ਕੋਈ ਖਾਣਾ ਲੌਗ ਨਹੀਂ ਕੀਤਾ।",
      "status.noExercise": "ਅਜੇ ਕੋਈ ਕਸਰਤ ਨਹੀਂ। ਟੀਚਾ: {n} ਮਿੰਟ।",
      "status.noEntries": "ਅਜੇ ਕੋਈ ਐਂਟਰੀ ਨਹੀਂ।",
      "status.belowSleep": "8 ਘੰਟੇ ਤੋਂ ਘੱਟ",
      "toast.mealAdded": "ਖਾਣਾ ਜੋੜਿਆ",
      "toast.exerciseLogged": "ਕਸਰਤ ਲੌਗ ਕੀਤੀ",
      "toast.sleepSaved": "ਨੀਂਦ ਤੇ ਮੂਡ ਸੰਭਾਲੇ",
      "toast.practiceSaved": "ਪ੍ਰੈਕਟਿਸ ਸੰਭਾਲੀ",
      "toast.goalsUpdated": "ਟੀਚੇ ਅੱਪਡੇਟ ਹੋਏ",
      "toast.hydrationSaved": "ਪਾਣੀ ਸੰਭਾਲਿਆ",
      "toast.allCleared": "ਸਾਰਾ ਡਾਟਾ ਮਿਟਾਇਆ",
      "confirm.reset": "ਸਾਰਾ ਡਾਟਾ ਤੇ ਟੀਚੇ ਮਿਟਾਉਣੇ ਹਨ? ਇਹ ਵਾਪਸ ਨਹੀਂ ਹੋ ਸਕਦਾ।",
      "confirm.bannedFood": "ਇਹ ਖਾਣਾ ਮਨਾਹੀ ਸੂਚੀ ਵਿੱਚ ਹੈ। ਫਿਰ ਵੀ ਲੌਗ ਕਰਨਾ?",
      "meal.organic": "ਆਰਗੈਨਿਕ",
      "meal.conventional": "ਆਮ",
      "meal.warningTpl": "\"{words}\" ਯੋਜਨਾ ਵਿੱਚ ਫ਼ਿੱਟ ਨਹੀਂ ਹੁੰਦਾ (ਸ਼ੂਗਰ, ਦੁੱਧ, ਫਲ, ਅਨਾਜ, ਨਿਸ਼ਾਸਤਾ ਨਹੀਂ)। ਚਰਬੀ / ਪ੍ਰੋਟੀਨ / ਫਾਈਬਰ ਚੁਣੋ।",

      "prefs.title": "ਤੁਹਾਡੀਆਂ ਤਰਜੀਹਾਂ",
      "legend.kcalTarget": "ਕੈਲੋਰੀ ਟੀਚਾ",
      "label.targetKcal": "ਟੀਚਾ (kcal/ਦਿਨ)",
      "bmr.summary": "ਮੇਰੇ ਅੰਕੜਿਆਂ ਤੋਂ ਗਿਣਤੀ",
      "label.sex": "ਲਿੰਗ",
      "opt.male": "ਮਰਦ",
      "opt.female": "ਔਰਤ",
      "label.age": "ਉਮਰ",
      "label.weightKg": "ਵਜ਼ਨ (kg)",
      "label.heightCm": "ਕੱਦ (cm)",
      "label.activity": "ਐਕਟੀਵਿਟੀ",
      "opt.sedentary": "ਨਿਠੱਲਾ",
      "opt.lightAct": "ਹਲਕੀ (1–3 ਦਿਨ/ਹਫ਼ਤਾ)",
      "opt.moderateAct": "ਦਰਮਿਆਨੀ (3–5 ਦਿਨ/ਹਫ਼ਤਾ)",
      "opt.active": "ਸਰਗਰਮ (6–7 ਦਿਨ/ਹਫ਼ਤਾ)",
      "opt.veryActive": "ਬਹੁਤ ਸਰਗਰਮ",
      "label.goal": "ਟੀਚਾ",
      "opt.loseFat": "ਚਰਬੀ ਘਟਾਓ",
      "opt.maintain": "ਬਣਾਈ ਰੱਖੋ",
      "opt.gainMuscle": "ਮਾਸਪੇਸ਼ੀ ਵਧਾਓ",
      "btn.apply": "ਲਾਗੂ",

      "legend.dietStyle": "ਖੁਰਾਕ ਸਟਾਈਲ",
      "diet.lowcarb": "ਘੱਟ-ਕਾਰਬ / ਕੀਟੋ",
      "diet.nosugar": "ਜ਼ੀਰੋ ਸ਼ੂਗਰ",
      "diet.nomilk": "ਦੁੱਧ / ਦਹੀਂ ਨਹੀਂ",
      "diet.nodairy": "ਕੋਈ ਡੇਅਰੀ ਨਹੀਂ (ਮੱਖਣ/ਪਨੀਰ ਵੀ ਨਹੀਂ)",
      "diet.nofruit": "ਫਲ ਨਹੀਂ",
      "diet.noeggs": "ਆਂਡੇ ਨਹੀਂ",
      "diet.noshellfish": "ਸ਼ੈੱਲਫਿਸ਼ ਨਹੀਂ",
      "diet.organic": "ਆਰਗੈਨਿਕ / ਘਾਹ-ਖਾਧਾ / ਜੰਗਲੀ ਨੂੰ ਤਰਜੀਹ",

      "legend.love": "ਪਸੰਦੀਦਾ ਖਾਣੇ",
      "hint.love": "ਚੁਣੇ ਖਾਣਿਆਂ ਵਿੱਚ ਇਹਨਾਂ ਨੂੰ ਤਰਜੀਹ ਦਿੱਤੀ ਜਾਏਗੀ।",
      "legend.avoidList": "ਪਰਹੇਜ਼ ਵਾਲੇ ਖਾਣੇ",
      "hint.avoidList": "ਇਨ੍ਹਾਂ ਵਾਲੇ ਖਾਣੇ ਛੱਡੇ ਜਾਣਗੇ।",

      "legend.schedule": "ਖਾਣੇ ਦਾ ਸਮਾਂ",
      "label.includeSnack": "ਸਨੈਕ ਸ਼ਾਮਲ ਕਰੋ",
      "label.repeatMax": "ਹਫ਼ਤੇ ਵਿੱਚ ਖਾਣਾ ਵੱਧ ਤੋਂ ਵੱਧ ਦੁਹਰਾਓ",

      "legend.location": "ਥਾਂ",
      "label.cityZip": "ਸ਼ਹਿਰ ਜਾਂ ZIP/ਪੋਸਟਕੋਡ",
      "ph.cityZip": "ਜਿਵੇਂ 94110 ਜਾਂ ਅੰਮ੍ਰਿਤਸਰ",
      "btn.useLocation": "ਮੇਰੀ ਥਾਂ ਵਰਤੋ",
      "hint.locationOptional": "ਚੋਣਵਾਂ — ਤਾਜ਼ੀਆਂ ਚੀਜ਼ਾਂ ਲੱਭਣ ਲਈ।",

      "btn.generateWeek": "ਹਫ਼ਤਾ ਬਣਾਓ",
      "btn.reshuffle": "ਮੁੜ ਬਦਲੋ",
      "btn.savePrefs": "ਤਰਜੀਹਾਂ ਸੰਭਾਲੋ",

      "card.thisWeek": "ਇਹ ਹਫ਼ਤਾ",
      "btn.print": "ਪ੍ਰਿੰਟ",
      "card.dailyTotals": "ਰੋਜ਼ਾਨਾ ਜੋੜ",
      "card.groceryList": "ਕਰਿਆਨੇ ਦੀ ਸੂਚੀ",
      "btn.copy": "ਕਾਪੀ",
      "btn.downloadTxt": ".txt ਡਾਊਨਲੋਡ",
      "card.storesTitle": "ਤੁਹਾਡੇ ਨੇੜੇ ਤਾਜ਼ੀਆਂ ਚੀਜ਼ਾਂ",
      "stores.placeholder": "ਉੱਪਰ ਆਪਣੀ ਥਾਂ ਪਾਓ",
      "stores.searchingNear": "ਨੇੜੇ ਖੋਜ ਰਹੇ: {where}",
      "stores.openInMaps": "ਮੈਪਸ ਵਿੱਚ ਖੋਲ੍ਹੋ →",
      "store.organic": "ਆਰਗੈਨਿਕ ਕਰਿਆਨਾ",
      "store.farmers": "ਕਿਸਾਨ ਮੰਡੀ",
      "store.butcher": "ਮੀਟ ਵਾਲਾ (ਘਾਹ-ਖਾਧਾ)",
      "store.fishmonger": "ਮੱਛੀ / ਸਮੁੰਦਰੀ",
      "store.wholeFoods": "Whole Foods",
      "store.sprouts": "Sprouts",
      "store.traderJoes": "Trader Joe's",
      "store.costco": "Costco (ਥੋਕ)",
      "store.healthFood": "ਹੈਲਥ ਫੂਡ ਸਟੋਰ",
      "store.csa": "ਸਥਾਨਕ ਫਾਰਮ ਬਾਕਸ",

      "grocery.cat.meat": "ਮੀਟ",
      "grocery.cat.seafood": "ਸਮੁੰਦਰੀ ਖਾਣਾ",
      "grocery.cat.eggs": "ਆਂਡੇ",
      "grocery.cat.dairy": "ਡੇਅਰੀ",
      "grocery.cat.produce": "ਸਬਜ਼ੀਆਂ",
      "grocery.cat.pantry": "ਪੈਂਟਰੀ ਤੇ ਤੇਲ",
      "grocery.empty": "ਕਰਿਆਨੇ ਦੀ ਸੂਚੀ ਵੇਖਣ ਲਈ ਹਫ਼ਤਾ ਬਣਾਓ।",
      "grocery.weekHeader": "ਗੁਡਫੂਡ — ਹਫ਼ਤੇ ਦੀ ਕਰਿਆਨਾ ਸੂਚੀ",
      "week.empty": "ਉੱਪਰ ਤਰਜੀਹਾਂ ਪਾਓ ਤੇ \"ਹਫ਼ਤਾ ਬਣਾਓ\" ਦਬਾਓ।",
      "week.kcalOfTarget": "{target} ਦਾ {pct}%",
      "week.ingredients": "{n} ਸਮੱਗਰੀ · {min} ਮਿੰਟ",
      "toast.weekGenerated": "ਹਫ਼ਤਾ ਬਣ ਗਿਆ",
      "toast.reshuffled": "ਮੁੜ ਬਦਲ ਦਿੱਤਾ",
      "toast.copied": "ਕਲਿੱਪਬੋਰਡ ਉੱਤੇ ਕਾਪੀ",
      "toast.copyFailed": "ਕਾਪੀ ਨਹੀਂ ਹੋਇਆ",
      "toast.prefsSaved": "ਤਰਜੀਹਾਂ ਸੰਭਾਲੀਆਂ",
      "toast.targetSet": "ਟੀਚਾ {n} kcal ਉੱਤੇ ਸੈੱਟ",
      "loc.finding": "ਤੁਹਾਡੀ ਥਾਂ ਲੱਭੀ ਜਾ ਰਹੀ ਹੈ…",
      "loc.set": "ਥਾਂ ਸੈੱਟ ਹੋ ਗਈ।",
      "loc.errPrefix": "ਥਾਂ ਨਹੀਂ ਮਿਲੀ: ",
      "loc.unsupported": "ਜੀਓਲੋਕੇਸ਼ਨ ਸਪੋਰਟ ਨਹੀਂ।",
    },
  };

  let lang = localStorage.getItem(STORAGE_KEY) || "en";
  if (!dict[lang]) lang = "en";

  function fmt(s, vars) {
    if (!vars) return s;
    return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
  }

  function t(key, vars) {
    const raw = (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || key;
    return fmt(raw, vars);
  }

  function setLang(newLang) {
    if (!dict[newLang]) return;
    lang = newLang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pa" ? "pa" : "en";
    apply();
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function getLang() { return lang; }
  function getLocale() { return lang === "pa" ? "pa-IN" : undefined; }

  function applyAttr(selector, attr, prefix) {
    document.querySelectorAll(selector).forEach((el) => {
      const key = el.getAttribute(prefix);
      if (!key) return;
      const value = t(key);
      if (attr === "text") el.textContent = value;
      else el.setAttribute(attr, value);
    });
  }

  function apply() {
    applyAttr("[data-i18n]", "text", "data-i18n");
    applyAttr("[data-i18n-placeholder]", "placeholder", "data-i18n-placeholder");
    applyAttr("[data-i18n-aria]", "aria-label", "data-i18n-aria");
    applyAttr("[data-i18n-title]", "title", "data-i18n-title");
    document.querySelectorAll("[data-lang-btn]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang);
    });
  }

  function init() {
    document.documentElement.lang = lang === "pa" ? "pa" : "en";
    apply();
    document.querySelectorAll("[data-lang-btn]").forEach((b) => {
      b.addEventListener("click", () => setLang(b.getAttribute("data-lang-btn")));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.i18n = { t, setLang, getLang, getLocale, apply };
  window.t = t;
})();
