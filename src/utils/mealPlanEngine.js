/**
 * Meal Plan Generation Engine - Simplified Working Version
 */

/**
 * Calculate daily macro targets
 */
export const calculateMacroTargets = (responses) => {
  const {
    goal,
    gender = 'male',
    bodyweight = 150,
    height = 70,
    age = 30,
    activityLevel = 'moderate',
  } = responses;

  const weightKg = bodyweight * 0.453592;
  const heightCm = height * 2.54;

  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.55;
  let tdee = Math.round(bmr * multiplier);

  let dailyCalories = tdee;
  if (goal === 'fatLoss') {
    dailyCalories = Math.round(tdee * 0.85);
  } else if (goal === 'muscleGain') {
    dailyCalories = Math.round(tdee * 1.1);
  }

  const proteinGrams = Math.round(weightKg * 1.8);
  const proteinCalories = proteinGrams * 4;
  const fatGrams = Math.round(weightKg * 0.8);
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  const micronutrients = {
    fiber: { target: 25, unit: 'g', label: 'Fiber' },
    sodium: { target: 2300, unit: 'mg', label: 'Sodium' },
    potassium: { target: 3500, unit: 'mg', label: 'Potassium' },
    calcium: { target: 1000, unit: 'mg', label: 'Calcium' },
    iron: { target: gender === 'male' ? 8 : 18, unit: 'mg', label: 'Iron' },
    magnesium: { target: gender === 'male' ? 400 : 310, unit: 'mg', label: 'Magnesium' },
    zinc: { target: gender === 'male' ? 11 : 8, unit: 'mg', label: 'Zinc' },
    vitaminA: { target: gender === 'male' ? 900 : 700, unit: 'mcg', label: 'Vitamin A' },
    vitaminC: { target: gender === 'male' ? 90 : 75, unit: 'mg', label: 'Vitamin C' },
    vitaminD: { target: 600, unit: 'IU', label: 'Vitamin D' },
    vitaminE: { target: 15, unit: 'mg', label: 'Vitamin E' },
    vitaminK: { target: gender === 'male' ? 120 : 90, unit: 'mcg', label: 'Vitamin K' },
    vitaminB12: { target: 2.4, unit: 'mcg', label: 'Vitamin B12' },
    folate: { target: 400, unit: 'mcg', label: 'Folate' },
  };

  return {
    dailyCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    bmr: Math.round(bmr),
    tdee,
    micronutrients,
  };
};

/**
 * Generate 7-day meal plan
 */
export const generateMealPlan = async (responses) => {
  const macroTargets = calculateMacroTargets(responses);

  const mealPlan = {
    metadata: {
      goal: responses.goal,
      mealsPerDay: responses.mealsPerDay,
      dietaryPreference: responses.dietaryPreference,
      macroTargets,
      micronutrientTargets: macroTargets.micronutrients,
      createdAt: new Date().toISOString(),
      // Client summary
      clientInfo: {
        gender: responses.gender || 'Not specified',
        age: responses.age || 'Not specified',
        bodyweight: responses.bodyweight ? `${responses.bodyweight} lbs` : 'Not specified',
        height: responses.height ? `${responses.height} inches` : 'Not specified',
        activityLevel: responses.activityLevel || 'Not specified',
        cuisines: responses.cuisines?.join(', ') || 'Not specified',
        allergies: responses.allergies?.join(', ') || 'None',
        cookingSkill: responses.cookingSkill || 'Not specified',
        mealPrepTime: responses.mealPrepTime || 'Not specified',
      },
    },
    days: [],
  };

  for (let day = 1; day <= 7; day++) {
    const meals = generateDayMeals(responses.mealsPerDay);
    mealPlan.days.push({
      day,
      date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      meals,
      dailyTotals: calculateDayTotals(meals),
    });
  }

  return mealPlan;
};

/**
 * Generate meals for a day
 */
const generateDayMeals = (mealsPerDay) => {
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'].slice(0, mealsPerDay);
  const meals = [];

  for (const mealType of mealTypes) {
    const meal = generateMeal(mealType);
    if (meal) meals.push(meal);
  }

  return meals;
};

/**
 * Generate a single meal
 */
const generateMeal = (mealType) => {
  const mealOptions = {
    breakfast: [
      {
        name: 'Oatmeal with Berries',
        ingredients: [
          { name: 'Oatmeal', quantity: '1', unit: 'cup' },
          { name: 'Blueberries', quantity: '1', unit: 'cup' },
          { name: 'Honey', quantity: '1', unit: 'tbsp' },
        ],
        macros: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 8 },
        micronutrients: { sodium: 150, potassium: 500, calcium: 400, iron: 4, magnesium: 160, zinc: 2, vitaminA: 50, vitaminC: 20, vitaminD: 100, vitaminE: 8, vitaminK: 5, vitaminB12: 0.5, folate: 60 },
        prepTime: 5,
        cookTime: 5,
        difficulty: 'Easy',
      },
      {
        name: 'Scrambled Eggs with Toast',
        ingredients: [
          { name: 'Eggs', quantity: '3', unit: 'large' },
          { name: 'Whole Wheat Bread', quantity: '2', unit: 'slices' },
          { name: 'Butter', quantity: '1', unit: 'tbsp' },
        ],
        macros: { calories: 350, protein: 18, carbs: 28, fat: 18, fiber: 4 },
        prepTime: 5,
        cookTime: 10,
        difficulty: 'Easy',
      },
      {
        name: 'Protein Smoothie Bowl',
        ingredients: [
          { name: 'Greek Yogurt', quantity: '1', unit: 'cup' },
          { name: 'Banana', quantity: '1', unit: 'medium' },
          { name: 'Granola', quantity: '1/4', unit: 'cup' },
        ],
        macros: { calories: 420, protein: 28, carbs: 52, fat: 8, fiber: 3 },
        prepTime: 5,
        cookTime: 0,
        difficulty: 'Easy',
      },
    ],
    lunch: [
      {
        name: 'Grilled Chicken with Quinoa & Broccoli',
        ingredients: [
          { name: 'Chicken Breast', quantity: '6', unit: 'oz' },
          { name: 'Quinoa', quantity: '1', unit: 'cup cooked' },
          { name: 'Broccoli', quantity: '2', unit: 'cups' },
        ],
        macros: { calories: 480, protein: 52, carbs: 42, fat: 12, fiber: 6 },
        prepTime: 10,
        cookTime: 15,
        difficulty: 'Medium',
      },
      {
        name: 'Turkey & Avocado Wrap',
        ingredients: [
          { name: 'Whole Wheat Tortilla', quantity: '1', unit: 'large' },
          { name: 'Turkey Breast', quantity: '4', unit: 'oz' },
          { name: 'Avocado', quantity: '1/2', unit: 'whole' },
        ],
        macros: { calories: 420, protein: 32, carbs: 38, fat: 16, fiber: 7 },
        prepTime: 5,
        cookTime: 2,
        difficulty: 'Easy',
      },
      {
        name: 'Salmon Salad',
        ingredients: [
          { name: 'Salmon Fillet', quantity: '5', unit: 'oz' },
          { name: 'Mixed Greens', quantity: '3', unit: 'cups' },
          { name: 'Olive Oil', quantity: '1.5', unit: 'tbsp' },
        ],
        macros: { calories: 420, protein: 38, carbs: 18, fat: 22, fiber: 4 },
        prepTime: 10,
        cookTime: 10,
        difficulty: 'Medium',
      },
    ],
    dinner: [
      {
        name: 'Baked Salmon with Sweet Potato',
        ingredients: [
          { name: 'Salmon Fillet', quantity: '6', unit: 'oz' },
          { name: 'Sweet Potato', quantity: '1', unit: 'medium' },
          { name: 'Asparagus', quantity: '1', unit: 'bunch' },
        ],
        macros: { calories: 520, protein: 42, carbs: 48, fat: 16, fiber: 8 },
        prepTime: 10,
        cookTime: 25,
        difficulty: 'Medium',
      },
      {
        name: 'Beef Stir-Fry with Brown Rice',
        ingredients: [
          { name: 'Lean Beef', quantity: '5', unit: 'oz' },
          { name: 'Brown Rice', quantity: '1', unit: 'cup cooked' },
          { name: 'Bell Peppers', quantity: '2', unit: 'cups' },
        ],
        macros: { calories: 550, protein: 45, carbs: 55, fat: 14, fiber: 7 },
        prepTime: 15,
        cookTime: 15,
        difficulty: 'Medium',
      },
      {
        name: 'Grilled Chicken with Farro',
        ingredients: [
          { name: 'Chicken Breast', quantity: '6', unit: 'oz' },
          { name: 'Farro', quantity: '1', unit: 'cup cooked' },
          { name: 'Roasted Vegetables', quantity: '2', unit: 'cups' },
        ],
        macros: { calories: 520, protein: 48, carbs: 52, fat: 12, fiber: 8 },
        prepTime: 15,
        cookTime: 25,
        difficulty: 'Medium',
      },
    ],
    snack: [
      {
        name: 'Greek Yogurt with Granola',
        ingredients: [
          { name: 'Greek Yogurt', quantity: '1', unit: 'cup' },
          { name: 'Granola', quantity: '1/3', unit: 'cup' },
          { name: 'Berries', quantity: '1/2', unit: 'cup' },
        ],
        macros: { calories: 240, protein: 22, carbs: 32, fat: 4, fiber: 2 },
        prepTime: 2,
        cookTime: 0,
        difficulty: 'Easy',
      },
      {
        name: 'Almonds & Apple',
        ingredients: [
          { name: 'Almonds', quantity: '1/4', unit: 'cup' },
          { name: 'Apple', quantity: '1', unit: 'medium' },
        ],
        macros: { calories: 280, protein: 10, carbs: 28, fat: 16, fiber: 6 },
        prepTime: 3,
        cookTime: 0,
        difficulty: 'Easy',
      },
      {
        name: 'Protein Bar & Banana',
        ingredients: [
          { name: 'Protein Bar', quantity: '1', unit: 'bar' },
          { name: 'Banana', quantity: '1', unit: 'medium' },
        ],
        macros: { calories: 300, protein: 20, carbs: 40, fat: 6, fiber: 3 },
        prepTime: 1,
        cookTime: 0,
        difficulty: 'Easy',
      },
    ],
  };

  const options = mealOptions[mealType] || mealOptions.snack;
  const meal = options[Math.floor(Math.random() * options.length)];

  return {
    type: mealType,
    name: meal.name,
    ingredients: meal.ingredients,
    instructions: {
      steps: [{ number: 1, instruction: `Prepare ${meal.name}` }],
      full: `Prepare ${meal.name}`,
    },
    instructionSteps: [{ number: 1, instruction: `Prepare ${meal.name}` }],
    fullInstructions: `Prepare ${meal.name}`,
    macros: meal.macros,
    micronutrients: meal.micronutrients || {
      sodium: 200,
      potassium: 400,
      calcium: 150,
      iron: 2,
      magnesium: 80,
      zinc: 1.5,
      vitaminA: 200,
      vitaminC: 20,
      vitaminD: 100,
      vitaminE: 3,
      vitaminK: 50,
      vitaminB12: 0.5,
      folate: 80,
    },
    servings: 1,
    prepTime: meal.prepTime,
    cookTime: meal.cookTime,
    totalTime: meal.prepTime + meal.cookTime,
    difficulty: meal.difficulty,
    yield: '1 serving',
  };
};

/**
 * Calculate daily totals
 */
const calculateDayTotals = (meals) => {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    zinc: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB12: 0,
    folate: 0,
  };

  meals.forEach((meal) => {
    if (meal.macros) {
      totals.calories += meal.macros.calories || 0;
      totals.protein += meal.macros.protein || 0;
      totals.carbs += meal.macros.carbs || 0;
      totals.fat += meal.macros.fat || 0;
      totals.fiber += meal.macros.fiber || 0;
    }
  });

  return totals;
};
