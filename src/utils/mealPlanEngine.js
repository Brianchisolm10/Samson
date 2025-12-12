/**
 * Meal Plan Generation Engine
 * Creates personalized meal plans based on user preferences and goals
 */

import {
  searchRecipes,
  getRecipeDetails,
  searchFoods,
  getFoodDetails,
  extractMacros,
  extractRecipeMacros,
} from './fatsecretAPI';

/**
 * Calculate daily macro targets based on goal and activity level
 */
export const calculateMacroTargets = (responses) => {
  const {
    goal,
    gender = 'male',
    bodyweight = 150, // lbs
    height = 70, // inches
    age = 30,
    activityLevel = 'moderate',
  } = responses;

  // Convert to metric
  const weightKg = bodyweight * 0.453592;
  const heightCm = height * 2.54;

  // Mifflin-St Jeor BMR calculation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.55;
  let tdee = Math.round(bmr * multiplier);

  // Adjust calories based on goal
  let dailyCalories = tdee;
  if (goal === 'fatLoss') {
    dailyCalories = Math.round(tdee * 0.85); // 15% deficit
  } else if (goal === 'muscleGain') {
    dailyCalories = Math.round(tdee * 1.1); // 10% surplus
  }

  // Calculate macros using bodyweight-based approach
  // Protein: 1.6-2.2g per kg (use 1.8g for average)
  const proteinGrams = Math.round(weightKg * 1.8);
  const proteinCalories = proteinGrams * 4;

  // Fat: 0.6-1.0g per kg (use 0.8g for average)
  const fatGrams = Math.round(weightKg * 0.8);
  const fatCalories = fatGrams * 9;

  // Carbs: fill remaining calories
  const carbCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  console.log('📊 Macro Calculation:');
  console.log(`BMR: ${Math.round(bmr)} cal`);
  console.log(`TDEE: ${tdee} cal`);
  console.log(`Target Calories: ${dailyCalories} cal`);
  console.log(`Protein: ${proteinGrams}g (${proteinCalories} cal)`);
  console.log(`Fat: ${fatGrams}g (${fatCalories} cal)`);
  console.log(`Carbs: ${carbGrams}g (${carbCalories} cal)`);

  return {
    dailyCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    bmr: Math.round(bmr),
    tdee,
  };
};

/**
 * Generate a 7-day meal plan
 */
export const generateMealPlan = async (responses) => {
  const {
    goal,
    mealsPerDay = 3,
    dietaryPreference,
    cuisines = [],
    allergies = [],
  } = responses;

  console.log('🍽️ Generating meal plan with responses:', responses);

  const macroTargets = calculateMacroTargets(responses);
  console.log('📊 Macro targets:', macroTargets);

  const mealPlan = {
    metadata: {
      goal,
      mealsPerDay,
      dietaryPreference,
      cuisines,
      allergies,
      macroTargets,
      createdAt: new Date().toISOString(),
    },
    days: [],
  };

  // Generate meals for 7 days
  for (let day = 1; day <= 7; day++) {
    const dayMeals = await generateDayMeals({
      day,
      mealsPerDay,
      macroTargets,
      dietaryPreference,
      cuisines,
      allergies,
    });

    mealPlan.days.push(dayMeals);
  }

  return mealPlan;
};

/**
 * Generate meals for a single day
 */
const generateDayMeals = async ({
  day,
  mealsPerDay,
  macroTargets,
  dietaryPreference,
  cuisines,
  allergies,
}) => {
  const mealTypes = getMealTypes(mealsPerDay);
  const macrosPerMeal = distributeMacros(macroTargets, mealsPerDay);

  const meals = [];

  for (const mealType of mealTypes) {
    try {
      const meal = await generateMeal({
        mealType,
        targetMacros: macrosPerMeal,
        dietaryPreference,
        cuisines,
        allergies,
      });

      if (meal) {
        meals.push(meal);
      }
    } catch (error) {
      console.error(`Error generating ${mealType}:`, error);
    }
  }

  return {
    day,
    date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    meals,
    dailyTotals: calculateDayTotals(meals),
  };
};

/**
 * Generate a single meal
 */
const generateMeal = async ({
  mealType,
  targetMacros,
  dietaryPreference,
  cuisines,
  allergies,
}) => {
  try {
    // Build search query - use simple meal type names
    const mealQueries = {
      breakfast: ['oatmeal', 'eggs', 'pancakes', 'smoothie', 'toast'],
      lunch: ['chicken salad', 'turkey sandwich', 'pasta', 'rice bowl', 'grilled fish'],
      dinner: ['grilled chicken', 'salmon', 'beef steak', 'pasta', 'stir fry'],
      snack: ['protein bar', 'yogurt', 'nuts', 'fruit', 'cheese'],
    };

    const queries = mealQueries[mealType] || [mealType];
    let searchQuery = queries[Math.floor(Math.random() * queries.length)];

    console.log(`🔍 Searching for ${mealType}:`, searchQuery);

    // Search for recipes
    const recipes = await searchRecipes(searchQuery);
    console.log(`Found ${recipes?.length || 0} recipes for "${searchQuery}"`);

    if (!recipes || recipes.length === 0) {
      console.warn(`No recipes found for ${mealType}, trying fallback`);
      // Try fallback search
      const fallbackRecipes = await searchRecipes(mealType);
      if (!fallbackRecipes || fallbackRecipes.length === 0) {
        return generateFallbackMeal(mealType, targetMacros);
      }
      recipes = fallbackRecipes;
    }

    // Get details for top recipe
    const recipe = recipes[0];
    console.log(`Getting details for recipe: ${recipe.recipe_name}`);
    
    const recipeDetails = await getRecipeDetails(recipe.recipe_id);

    if (!recipeDetails) {
      console.warn(`Could not get details for recipe ${recipe.recipe_id}`);
      return generateFallbackMeal(mealType, targetMacros);
    }

    const macros = extractRecipeMacros(recipeDetails);
    const instructions = parseInstructions(recipeDetails.directions);

    console.log(`✅ Generated meal: ${recipeDetails.recipe_name}`);

    return {
      type: mealType,
      name: recipeDetails.recipe_name,
      recipeId: recipeDetails.recipe_id,
      description: recipeDetails.recipe_description,
      ingredients: formatIngredients(recipeDetails.ingredients?.ingredient || []),
      instructions: instructions,
      instructionSteps: instructions.steps,
      fullInstructions: instructions.full,
      macros,
      servings: macros.servings,
      prepTime: recipeDetails.prep_time_minutes || 'N/A',
      cookTime: recipeDetails.cook_time_minutes || 'N/A',
      totalTime: (parseInt(recipeDetails.prep_time_minutes || 0) + parseInt(recipeDetails.cook_time_minutes || 0)) || 'N/A',
      difficulty: estimateDifficulty(recipeDetails),
      yield: recipeDetails.recipe_yield || 'N/A',
    };
  } catch (error) {
    console.error(`Error generating meal:`, error);
    return generateFallbackMeal(mealType, targetMacros);
  }
};

/**
 * Generate fallback meal if API fails
 */
const generateFallbackMeal = (mealType, targetMacros) => {
  const fallbackMeals = {
    breakfast: {
      name: 'Oatmeal with Berries',
      ingredients: [
        { name: 'Oats', quantity: '1', unit: 'cup' },
        { name: 'Blueberries', quantity: '1', unit: 'cup' },
        { name: 'Honey', quantity: '1', unit: 'tbsp' },
        { name: 'Almond Milk', quantity: '1', unit: 'cup' },
      ],
      instructions: {
        steps: [
          { number: 1, instruction: 'Boil water or milk' },
          { number: 2, instruction: 'Add oats and cook for 5 minutes' },
          { number: 3, instruction: 'Top with berries and honey' },
        ],
        full: 'Cook oats, top with berries and honey',
      },
      macros: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 8, servings: 1 },
      prepTime: 5,
      cookTime: 5,
    },
    lunch: {
      name: 'Grilled Chicken Salad',
      ingredients: [
        { name: 'Chicken Breast', quantity: '6', unit: 'oz' },
        { name: 'Mixed Greens', quantity: '2', unit: 'cups' },
        { name: 'Olive Oil', quantity: '1', unit: 'tbsp' },
        { name: 'Lemon Juice', quantity: '1', unit: 'tbsp' },
      ],
      instructions: {
        steps: [
          { number: 1, instruction: 'Grill chicken breast until cooked through' },
          { number: 2, instruction: 'Slice chicken' },
          { number: 3, instruction: 'Toss greens with olive oil and lemon' },
          { number: 4, instruction: 'Top with sliced chicken' },
        ],
        full: 'Grill chicken, slice, and serve over dressed greens',
      },
      macros: { calories: 400, protein: 45, carbs: 15, fat: 18, fiber: 3, servings: 1 },
      prepTime: 10,
      cookTime: 15,
    },
    dinner: {
      name: 'Salmon with Sweet Potato',
      ingredients: [
        { name: 'Salmon Fillet', quantity: '6', unit: 'oz' },
        { name: 'Sweet Potato', quantity: '1', unit: 'medium' },
        { name: 'Broccoli', quantity: '2', unit: 'cups' },
        { name: 'Olive Oil', quantity: '1', unit: 'tbsp' },
      ],
      instructions: {
        steps: [
          { number: 1, instruction: 'Preheat oven to 400°F' },
          { number: 2, instruction: 'Bake salmon for 12-15 minutes' },
          { number: 3, instruction: 'Roast sweet potato and broccoli' },
          { number: 4, instruction: 'Serve together' },
        ],
        full: 'Bake salmon and roast vegetables',
      },
      macros: { calories: 450, protein: 40, carbs: 45, fat: 15, fiber: 8, servings: 1 },
      prepTime: 10,
      cookTime: 20,
    },
    snack: {
      name: 'Greek Yogurt with Granola',
      ingredients: [
        { name: 'Greek Yogurt', quantity: '1', unit: 'cup' },
        { name: 'Granola', quantity: '1/4', unit: 'cup' },
        { name: 'Honey', quantity: '1', unit: 'tsp' },
      ],
      instructions: {
        steps: [
          { number: 1, instruction: 'Pour yogurt into bowl' },
          { number: 2, instruction: 'Top with granola' },
          { number: 3, instruction: 'Drizzle with honey' },
        ],
        full: 'Layer yogurt, granola, and honey',
      },
      macros: { calories: 200, protein: 20, carbs: 25, fat: 4, fiber: 2, servings: 1 },
      prepTime: 2,
      cookTime: 0,
    },
  };

  const meal = fallbackMeals[mealType] || fallbackMeals.snack;
  return {
    type: mealType,
    ...meal,
    totalTime: (meal.prepTime + meal.cookTime) || 'N/A',
    difficulty: 'Easy',
    yield: '1 serving',
  };
};

/**
 * Get meal types based on meals per day
 */
const getMealTypes = (mealsPerDay) => {
  const allMeals = ['breakfast', 'lunch', 'dinner', 'snack'];
  return allMeals.slice(0, mealsPerDay);
};

/**
 * Distribute daily macros across meals
 */
const distributeMacros = (macroTargets, mealsPerDay) => {
  return {
    calories: Math.round(macroTargets.dailyCalories / mealsPerDay),
    protein: Math.round(macroTargets.protein / mealsPerDay),
    carbs: Math.round(macroTargets.carbs / mealsPerDay),
    fat: Math.round(macroTargets.fat / mealsPerDay),
  };
};

/**
 * Calculate daily totals from meals
 */
const calculateDayTotals = (meals) => {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + (meal.macros?.calories || 0),
      protein: totals.protein + (meal.macros?.protein || 0),
      carbs: totals.carbs + (meal.macros?.carbs || 0),
      fat: totals.fat + (meal.macros?.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

/**
 * Estimate difficulty based on ingredients and instructions
 */
const estimateDifficulty = (recipe) => {
  const ingredientCount = recipe.ingredients?.ingredient?.length || 0;
  const instructionLength = recipe.directions?.length || 0;

  if (ingredientCount <= 5 && instructionLength <= 3) {
    return 'Easy';
  } else if (ingredientCount <= 10 && instructionLength <= 6) {
    return 'Medium';
  }
  return 'Advanced';
};

/**
 * Generate shopping list from meal plan
 */
export const generateShoppingList = (mealPlan) => {
  const ingredients = {};

  mealPlan.days.forEach((day) => {
    day.meals.forEach((meal) => {
      if (meal.ingredients) {
        meal.ingredients.forEach((ingredient) => {
          const name = ingredient.ingredient_name || ingredient;
          if (!ingredients[name]) {
            ingredients[name] = {
              name,
              quantity: 1,
              unit: ingredient.measurement_description || 'unit',
            };
          } else {
            ingredients[name].quantity += 1;
          }
        });
      }
    });
  });

  // Group by category (simplified)
  const categories = {
    Proteins: [],
    Vegetables: [],
    Fruits: [],
    Grains: [],
    Dairy: [],
    Other: [],
  };

  Object.values(ingredients).forEach((item) => {
    const name = item.name.toLowerCase();
    if (
      name.includes('chicken') ||
      name.includes('beef') ||
      name.includes('fish') ||
      name.includes('egg')
    ) {
      categories.Proteins.push(item);
    } else if (
      name.includes('broccoli') ||
      name.includes('spinach') ||
      name.includes('carrot')
    ) {
      categories.Vegetables.push(item);
    } else if (
      name.includes('apple') ||
      name.includes('banana') ||
      name.includes('berry')
    ) {
      categories.Fruits.push(item);
    } else if (
      name.includes('rice') ||
      name.includes('bread') ||
      name.includes('pasta')
    ) {
      categories.Grains.push(item);
    } else if (
      name.includes('milk') ||
      name.includes('cheese') ||
      name.includes('yogurt')
    ) {
      categories.Dairy.push(item);
    } else {
      categories.Other.push(item);
    }
  });

  return categories;
};

/**
 * Parse and format recipe instructions
 */
const parseInstructions = (directions) => {
  if (!directions) {
    return {
      full: 'No instructions available',
      steps: [],
    };
  }

  // If directions is a string, split by common delimiters
  let instructionText = directions;
  if (typeof directions === 'object') {
    instructionText = JSON.stringify(directions);
  }

  // Split by numbers followed by period (1. 2. 3.) or by line breaks
  const steps = instructionText
    .split(/\d+\.\s+|[\n]+/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0)
    .map((step, index) => ({
      number: index + 1,
      instruction: step,
    }));

  return {
    full: instructionText,
    steps: steps.length > 0 ? steps : [{ number: 1, instruction: instructionText }],
  };
};

/**
 * Format ingredients for display
 */
const formatIngredients = (ingredients) => {
  if (!Array.isArray(ingredients)) {
    return [];
  }

  return ingredients.map((ingredient) => {
    if (typeof ingredient === 'string') {
      return {
        name: ingredient,
        quantity: 'N/A',
        unit: '',
      };
    }

    return {
      name: ingredient.ingredient_name || ingredient.name || 'Unknown',
      quantity: ingredient.measurement_value || ingredient.quantity || 'N/A',
      unit: ingredient.measurement_description || ingredient.unit || '',
      calories: ingredient.calories || 0,
      protein: ingredient.protein || 0,
      carbs: ingredient.carbohydrates || 0,
      fat: ingredient.fat || 0,
    };
  });
};
