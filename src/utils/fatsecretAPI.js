/**
 * FatSecret API Integration
 * Handles all API calls to FatSecret platform for nutrition data
 */

const CLIENT_ID = '716441cb05264a859b6e271facbcb509';
const CLIENT_SECRET = '6c7f4339771f4422b8c196669b1962bc';
const BASE_URL = 'https://platform.fatsecret.com/rest/server.api';

let accessToken = null;
let tokenExpiry = null;

/**
 * Get OAuth 2.0 access token
 */
const getAccessToken = async () => {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'barcode_read food_read recipe_read',
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth error: ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

    console.log('✅ FatSecret OAuth token obtained');
    return accessToken;
  } catch (error) {
    console.error('❌ Error getting FatSecret token:', error);
    throw error;
  }
};

/**
 * Make authenticated request to FatSecret API
 */
const makeRequest = async (method, params) => {
  try {
    const token = await getAccessToken();

    const queryParams = new URLSearchParams({
      method,
      format: 'json',
      ...params,
    });

    const response = await fetch(`${BASE_URL}?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ FatSecret API error (${method}):`, error);
    throw error;
  }
};

/**
 * Search for foods
 */
export const searchFoods = async (query, pageNumber = 0) => {
  try {
    const data = await makeRequest('foods.search.v3', {
      search_expression: query,
      page_number: pageNumber,
    });

    return data.foods?.food || [];
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

/**
 * Get detailed food information
 */
export const getFoodDetails = async (foodId) => {
  try {
    const data = await makeRequest('food.get.v4', {
      food_id: foodId,
    });

    return data.food;
  } catch (error) {
    console.error('Error getting food details:', error);
    return null;
  }
};

/**
 * Search for recipes
 */
export const searchRecipes = async (query, pageNumber = 0) => {
  try {
    const data = await makeRequest('recipes.search.v3', {
      search_expression: query,
      page_number: pageNumber,
    });

    return data.recipes?.recipe || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

/**
 * Get detailed recipe information
 */
export const getRecipeDetails = async (recipeId) => {
  try {
    const data = await makeRequest('recipe.get.v2', {
      recipe_id: recipeId,
    });

    return data.recipe;
  } catch (error) {
    console.error('Error getting recipe details:', error);
    return null;
  }
};

/**
 * Get all food categories
 */
export const getFoodCategories = async () => {
  try {
    const data = await makeRequest('food_categories.get.v2');
    return data.food_categories?.food_category || [];
  } catch (error) {
    console.error('Error getting food categories:', error);
    return [];
  }
};

/**
 * Get all food brands
 */
export const getFoodBrands = async () => {
  try {
    const data = await makeRequest('food_brands.get.v2');
    return data.food_brands?.food_brand || [];
  } catch (error) {
    console.error('Error getting food brands:', error);
    return [];
  }
};

/**
 * Find food by barcode
 */
export const findFoodByBarcode = async (barcode) => {
  try {
    const data = await makeRequest('food.barcode.find_by_id.v2', {
      barcode,
      region: 'US',
      language: 'en',
      include_food_images: 'true',
      include_food_attributes: 'true',
    });

    return data.food;
  } catch (error) {
    console.error('Error finding food by barcode:', error);
    return null;
  }
};

/**
 * Extract macros from food
 */
export const extractMacros = (food) => {
  if (!food || !food.servings) return null;

  const serving = food.servings.serving[0]; // Default serving
  return {
    calories: parseFloat(serving.calories) || 0,
    protein: parseFloat(serving.protein) || 0,
    carbs: parseFloat(serving.carbohydrates) || 0,
    fat: parseFloat(serving.fat) || 0,
    fiber: parseFloat(serving.fiber) || 0,
    servingSize: serving.serving_description,
  };
};

/**
 * Extract macros from recipe
 */
export const extractRecipeMacros = (recipe) => {
  if (!recipe) return null;

  return {
    calories: parseFloat(recipe.nutrition?.calories) || 0,
    protein: parseFloat(recipe.nutrition?.protein) || 0,
    carbs: parseFloat(recipe.nutrition?.carbohydrates) || 0,
    fat: parseFloat(recipe.nutrition?.fat) || 0,
    fiber: parseFloat(recipe.nutrition?.fiber) || 0,
    servings: parseInt(recipe.nutrition?.servings) || 1,
  };
};
