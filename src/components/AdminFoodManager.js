import React, { useState } from 'react';
import './AdminFoodManager.css';
import TopNav from './TopNav';

function AdminFoodManager() {
  const [step, setStep] = useState('menu'); // menu, search, add, manage
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('protein');
  const [newFood, setNewFood] = useState({
    name: '',
    category: 'protein',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    servingSize: '100g',
  });
  const [foods, setFoods] = useState([]);

  // Load foods from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('customFoods');
    if (saved) {
      setFoods(JSON.parse(saved));
    }
  }, []);

  // Save foods to localStorage
  const saveFoods = (updatedFoods) => {
    setFoods(updatedFoods);
    localStorage.setItem('customFoods', JSON.stringify(updatedFoods));
  };

  // Search USDA API
  const searchUSDA = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const USDA_API_KEY = 'BEgMM35b5UchuQZ1aeX0URI9ZPWz7aWzHWKDD27e';
      const response = await fetch(
        `https://fdc.nal.usda.gov/api/foods/search?query=${encodeURIComponent(searchQuery)}&pageSize=20&api_key=${USDA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const formatted = data.foods?.map((food) => {
        const nutrients = food.foodNutrients || [];
        const getNutrient = (name) => {
          const nutrient = nutrients.find(n => 
            n.nutrientName?.toLowerCase().includes(name.toLowerCase())
          );
          return nutrient?.value || 0;
        };

        return {
          id: food.fdcId,
          name: food.description,
          calories: Math.round(getNutrient('Energy')),
          protein: Math.round(getNutrient('Protein')),
          carbs: Math.round(getNutrient('Carbohydrate')),
          fat: Math.round(getNutrient('Total lipid')),
          fiber: Math.round(getNutrient('Fiber')),
          servingSize: '100g',
        };
      }) || [];

      if (formatted.length === 0) {
        alert('No foods found. Try a different search term.');
      }
      
      setSearchResults(formatted);
    } catch (error) {
      console.error('Error searching USDA:', error);
      alert('Error searching foods. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add food from search results
  const addFromSearch = (food) => {
    const newId = Math.max(...foods.map(f => f.id || 0), 260) + 1;
    const foodToAdd = {
      id: newId,
      name: food.name,
      category: selectedCategory,
      macros: {
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
      },
      servingSize: food.servingSize,
    };

    saveFoods([...foods, foodToAdd]);
    alert(`Added "${food.name}" to ${selectedCategory}!`);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Add custom food
  const addCustomFood = () => {
    if (!newFood.name.trim()) {
      alert('Please enter a food name');
      return;
    }

    const newId = Math.max(...foods.map(f => f.id || 0), 260) + 1;
    const foodToAdd = {
      id: newId,
      name: newFood.name,
      category: newFood.category,
      macros: {
        calories: parseFloat(newFood.calories) || 0,
        protein: parseFloat(newFood.protein) || 0,
        carbs: parseFloat(newFood.carbs) || 0,
        fat: parseFloat(newFood.fat) || 0,
        fiber: parseFloat(newFood.fiber) || 0,
      },
      servingSize: newFood.servingSize,
    };

    saveFoods([...foods, foodToAdd]);
    alert(`Added "${newFood.name}"!`);
    setNewFood({
      name: '',
      category: 'protein',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      servingSize: '100g',
    });
    setStep('menu');
  };

  // Delete food
  const deleteFood = (id) => {
    if (window.confirm('Delete this food?')) {
      saveFoods(foods.filter(f => f.id !== id));
    }
  };

  // Export foods
  const exportFoods = () => {
    const dataStr = JSON.stringify(foods, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foods.json';
    link.click();
  };

  // Import foods
  const importFoods = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        saveFoods([...foods, ...imported]);
        alert(`Imported ${imported.length} foods!`);
      } catch (error) {
        alert('Error importing file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <TopNav />
      <div className="admin-food-manager">
      <button className="btn-back-home" onClick={() => window.location.href = '/hub'}>
        ← Back to Hub
      </button>
      <div className="manager-header">
        <h1>🍽️ Food Database Manager</h1>
        <p>Add, manage, and organize foods for meal planning</p>
      </div>

      {step === 'menu' && (
        <div className="menu-section">
          <div className="menu-grid">
            <button className="menu-btn" onClick={() => setStep('search')}>
              🔍 Search & Add Foods
              <span>From USDA Database</span>
            </button>
            <button className="menu-btn" onClick={() => setStep('add')}>
              ➕ Add Custom Food
              <span>Manual entry</span>
            </button>
            <button className="menu-btn" onClick={() => setStep('manage')}>
              📋 Manage Foods
              <span>{foods.length} foods</span>
            </button>
            <button className="menu-btn" onClick={exportFoods}>
              ⬇️ Export Foods
              <span>Download JSON</span>
            </button>
            <label className="menu-btn">
              ⬆️ Import Foods
              <span>Upload JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={importFoods}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      )}

      {step === 'search' && (
        <div className="search-section">
          <button className="back-btn" onClick={() => setStep('menu')}>← Back</button>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search foods (e.g., chicken, rice, broccoli)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchUSDA()}
            />
            <button onClick={searchUSDA} disabled={loading}>
              {loading ? 'Searching...' : 'Search USDA'}
            </button>
          </div>

          <div className="category-select">
            <label>Add to category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="protein">Protein</option>
              <option value="carbs">Carbs</option>
              <option value="vegetable">Vegetables</option>
              <option value="fruit">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="fat">Fats</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((food) => (
                <div key={food.id} className="result-item">
                  <div className="result-info">
                    <h4>{food.name}</h4>
                    <p>{food.calories} cal | {food.protein}g P | {food.carbs}g C | {food.fat}g F</p>
                  </div>
                  <button onClick={() => addFromSearch(food)}>Add</button>
                </div>
              ))
            ) : searchQuery ? (
              <p className="no-results">No results found. Try a different search.</p>
            ) : (
              <p className="no-results">Search for foods to get started</p>
            )}
          </div>
        </div>
      )}

      {step === 'add' && (
        <div className="add-section">
          <button className="back-btn" onClick={() => setStep('menu')}>← Back</button>
          
          <div className="form-group">
            <label>Food Name *</label>
            <input
              type="text"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              placeholder="e.g., Grilled Salmon"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={newFood.category}
              onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
            >
              <option value="protein">Protein</option>
              <option value="carbs">Carbs</option>
              <option value="vegetable">Vegetables</option>
              <option value="fruit">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="fat">Fats</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                value={newFood.calories}
                onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Protein (g)</label>
              <input
                type="number"
                value={newFood.protein}
                onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Carbs (g)</label>
              <input
                type="number"
                value={newFood.carbs}
                onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Fat (g)</label>
              <input
                type="number"
                value={newFood.fat}
                onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fiber (g)</label>
              <input
                type="number"
                value={newFood.fiber}
                onChange={(e) => setNewFood({ ...newFood, fiber: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Serving Size</label>
              <input
                type="text"
                value={newFood.servingSize}
                onChange={(e) => setNewFood({ ...newFood, servingSize: e.target.value })}
                placeholder="100g"
              />
            </div>
          </div>

          <button className="btn-add" onClick={addCustomFood}>Add Food</button>
        </div>
      )}

      {step === 'manage' && (
        <div className="manage-section">
          <button className="back-btn" onClick={() => setStep('menu')}>← Back</button>
          
          <div className="foods-list">
            <h3>Total Foods: {foods.length}</h3>
            {foods.length > 0 ? (
              foods.map((food) => (
                <div key={food.id} className="food-item">
                  <div className="food-info">
                    <h4>{food.name}</h4>
                    <p className="category">{food.category}</p>
                    <p className="macros">
                      {food.macros.calories} cal | {food.macros.protein}g P | {food.macros.carbs}g C | {food.macros.fat}g F
                    </p>
                  </div>
                  <button className="btn-delete" onClick={() => deleteFood(food.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No custom foods added yet</p>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default AdminFoodManager;
