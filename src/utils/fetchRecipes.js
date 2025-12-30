/**
 * Food Items Fetcher - Run this once to fetch food items from FatSecret and save locally
 * Usage: node fetchRecipes.js
 * 
 * This script fetches individual food items from FatSecret API and saves them to foodItems.json
 * for use in building custom meals in the meal plan generator
 */

const fs = require('fs');
const path = require('path');

const CLIENT_ID = '716441cb05264a859b6e271facbcb509';
const CLIENT_SECRET = '6c7f4339771f4422b8c196669b1962bc';

let accessToken = null;
let tokenExpiry = null;

/**
 * Get OAuth 2.0 access token
 */
const getAccessToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Using cached token');
    return accessToken;
  }

  try {
    console.log('🔐 Requesting FatSecret OAuth token...');
    
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
      throw new Error(`OAuth error: ${response.status}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

    console.log('✅ Token obtained');
    return accessToken;
  } catch (error) {
    console.error('❌ Error getting token:', error);
    throw error;
  }
};

/**
 * Search for food items
 */
const searchFoods = async (query, pageNumber = 0) => {
  try {
    const token = await getAccessToken();

    const params = new URLSearchParams({
      method: 'foods.search.v3',
      format: 'json',
      search_expression: query,
      page_number: pageNumber,
    });

    const response = await fetch(`https://platform.fatsecret.com/rest/server.api?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.foods?.food || [];
  } catch (error) {
    console.error(`Error searching foods for "${query}":`, error);
    return [];
  }
};

/**
 * Get food details
 */
const getFoodDetails = async (foodId) => {
  try {
    const token = await getAccessToken();

    const params = new URLSearchParams({
      method: 'food.get.v5',
      format: 'json',
      food_id: foodId,
    });

    const response = await fetch(`https://platform.fatsecret.com/rest/server.api?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.food;
  } catch (error) {
    console.error(`Error getting food ${foodId}:`, error);
    return null;
  }
};

/**
 * Extract macros from food
 */
const extractMacros = (food) => {
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
 * Categorize food by type
 */
const categorizeFoodType = (foodName) => {
  const name = foodName.toLowerCase();
  
  if (name.includes('chicken') || name.includes('beef') || name.includes('pork') || name.includes('turkey') || name.includes('fish') || name.includes('salmon') || name.includes('egg') || name.includes('meat')) {
    return 'protein';
  } else if (name.includes('rice') || name.includes('pasta') || name.includes('bread') || name.includes('oat') || name.includes('cereal') || name.includes('grain') || name.includes('potato')) {
    return 'carbs';
  } else if (name.includes('oil') || name.includes('butter') || name.includes('nut') || name.includes('seed') || name.includes('avocado')) {
    return 'fat';
  } else if (name.includes('broccoli') || name.includes('spinach') || name.includes('carrot') || name.includes('lettuce') || name.includes('tomato') || name.includes('vegetable')) {
    return 'vegetable';
  } else if (name.includes('apple') || name.includes('banana') || name.includes('berry') || name.includes('orange') || name.includes('fruit')) {
    return 'fruit';
  } else if (name.includes('milk') || name.includes('yogurt') || name.includes('cheese')) {
    return 'dairy';
  }
  
  return 'other';
};

/**
 * Main fetcher
 */
const fetchAllFoods = async () => {
  const searchQueries = [
    // Proteins
    'chicken', 'beef', 'salmon', 'turkey', 'pork', 'fish', 'egg', 'shrimp', 'tuna', 'lamb',
    // Carbs
    'rice', 'pasta', 'bread', 'oatmeal', 'potato', 'sweet potato', 'quinoa', 'barley', 'cereal',
    // Vegetables
    'broccoli', 'spinach', 'carrot', 'lettuce', 'tomato', 'bell pepper', 'cucumber', 'zucchini', 'asparagus', 'green beans',
    // Fruits
    'apple', 'banana', 'orange', 'strawberry', 'blueberry', 'grape', 'watermelon', 'mango', 'pineapple',
    // Dairy
    'milk', 'yogurt', 'cheese', 'cottage cheese',
    // Fats
    'olive oil', 'butter', 'almond', 'peanut', 'avocado', 'coconut oil',
    // Condiments/Other
    'honey', 'salt', 'pepper', 'garlic', 'lemon',
  ];

  const allFoods = {
    protein: [],
    carbs: [],
    fat: [],
    vegetable: [],
    fruit: [],
    dairy: [],
    other: [],
  };

  let totalFetched = 0;
  const maxFoodsPerCategory = 100; // Limit to avoid too many API calls

  for (const query of searchQueries) {
    console.log(`\n🔍 Searching for: "${query}"`);
    
    try {
      // Fetch first 3 pages (20 results per page = 60 foods per query)
      for (let page = 0; page < 3; page++) {
        const foods = await searchFoods(query, page);
        
        if (foods.length === 0) break;

        console.log(`  🍎 Found ${foods.length} foods on page ${page}`);

        for (const food of foods) {
          try {
            // Get full food details
            const details = await getFoodDetails(food.food_id);
            
            if (!details) continue;

            const macros = extractMacros(details);
            if (!macros) continue;

            const foodType = categorizeFoodType(details.food_name);
            
            // Check if we already have this food
            const isDuplicate = allFoods[foodType].some(f => f.name === details.food_name);
            
            if (!isDuplicate && allFoods[foodType].length < maxFoodsPerCategory) {
              allFoods[foodType].push({
                id: details.food_id,
                name: details.food_name,
                macros,
                servingSize: macros.servingSize,
              });

              totalFetched++;
              console.log(`    ✅ Added: ${details.food_name}`);
            }
          } catch (error) {
            console.error(`    ❌ Error processing food:`, error.message);
          }

          // Rate limiting - wait a bit between requests
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    } catch (error) {
      console.error(`  ❌ Error searching "${query}":`, error.message);
    }

    // Rate limiting between queries
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Proteins: ${allFoods.protein.length} items`);
  console.log(`  Carbs: ${allFoods.carbs.length} items`);
  console.log(`  Fats: ${allFoods.fat.length} items`);
  console.log(`  Vegetables: ${allFoods.vegetable.length} items`);
  console.log(`  Fruits: ${allFoods.fruit.length} items`);
  console.log(`  Dairy: ${allFoods.dairy.length} items`);
  console.log(`  Other: ${allFoods.other.length} items`);
  console.log(`  Total: ${totalFetched} food items`);

  // Save to file
  const outputPath = path.join(__dirname, 'foodItems.json');
  fs.writeFileSync(outputPath, JSON.stringify(allFoods, null, 2));
  console.log(`\n✅ Food items saved to ${outputPath}`);

  return allFoods;
};

// Run if executed directly
if (require.main === module) {
  fetchAllFoods().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { fetchAllFoods };
