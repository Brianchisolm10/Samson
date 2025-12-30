import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/userStorage';
import { foodCategories, defaultFoods, carbFoods, vegetableFoods, fruitFoods, nutFoods, oilFoods } from '../utils/foodDatabase';
import './FoodLibraryManager.css';
import TopNav from './TopNav';
import Footer from './Footer';

const USDA_API_KEY = 'NjTkdXF2l12vR81507rRyVoc3uwp12nGvhONSBki';

function FoodLibraryManager() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [apiFoods, setApiFoods] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newFood, setNewFood] = useState({
    name: '',
    category: 'protein',
    servingSize: '100g',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    sugar: '',
    vitaminA: '',
    vitaminB12: '',
    vitaminC: '',
    vitaminD: '',
    vitaminE: '',
    vitaminK: '',
    folate: '',
    niacin: '',
    calcium: '',
    iron: '',
    magnesium: '',
    phosphorus: '',
    potassium: '',
    zinc: '',
    sodium: '',
    copper: '',
    manganese: '',
    selenium: '',
    cholesterol: '',
    saturatedFat: '',
    transFat: '',
    monounsaturatedFat: '',
    polyunsaturatedFat: '',
    omega3: '',
    omega6: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Load foods from USDA FoodData Central API
  useEffect(() => {
    const loadApiFoods = async () => {
      try {
        console.log('Fetching foods from USDA FoodData Central API...');
        
        // Fetch common foods from USDA API with multiple queries
        const queries = ['chicken', 'beef', 'fish', 'egg', 'milk', 'bread', 'rice', 'apple', 'banana', 'broccoli'];
        let allFoods = [];
        
        for (const query of queries) {
          try {
            const response = await fetch(
              `https://fdc.nal.usda.gov/api/v0/foods/search?query=${query}&pageSize=50&api_key=${USDA_API_KEY}`
            );
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.foods && data.foods.length > 0) {
                const foods = data.foods
                  .filter(food => food.description && food.foodNutrients)
                  .map((food, index) => {
                    // Extract nutrient values from USDA response
                    const getNutrient = (nutrientId) => {
                      const nutrient = food.foodNutrients?.find(n => n.nutrientId === nutrientId);
                      return nutrient?.value || 0;
                    };

                    return {
                      id: `usda_${food.fdcId || index}`,
                      name: food.description,
                      category: 'protein',
                      servingSize: '100g',
                      calories: getNutrient(1008) || 0, // Energy (kcal)
                      protein: getNutrient(1003) || 0, // Protein
                      carbs: getNutrient(1005) || 0, // Carbohydrates
                      fat: getNutrient(1004) || 0, // Total lipid (fat)
                      fiber: getNutrient(1079) || 0, // Fiber
                      sugar: getNutrient(2000) || 0, // Sugars
                      saturatedFat: getNutrient(1258) || 0, // Saturated fat
                      transFat: getNutrient(1257) || 0, // Trans fat
                      monounsaturatedFat: getNutrient(1292) || 0, // Monounsaturated fat
                      polyunsaturatedFat: getNutrient(1293) || 0, // Polyunsaturated fat
                      omega3: getNutrient(1851) || 0, // Omega-3
                      omega6: getNutrient(1852) || 0, // Omega-6
                      cholesterol: getNutrient(1253) || 0, // Cholesterol
                      sodium: getNutrient(1093) || 0, // Sodium
                      potassium: getNutrient(1092) || 0, // Potassium
                      calcium: getNutrient(1087) || 0, // Calcium
                      iron: getNutrient(1089) || 0, // Iron
                      magnesium: getNutrient(1090) || 0, // Magnesium
                      phosphorus: getNutrient(1091) || 0, // Phosphorus
                      zinc: getNutrient(1095) || 0, // Zinc
                      copper: getNutrient(1098) || 0, // Copper
                      manganese: getNutrient(1106) || 0, // Manganese
                      selenium: getNutrient(1103) || 0, // Selenium
                      vitaminA: getNutrient(1104) || 0, // Vitamin A
                      vitaminB12: getNutrient(1146) || 0, // Vitamin B12
                      vitaminC: getNutrient(1162) || 0, // Vitamin C
                      vitaminD: getNutrient(1114) || 0, // Vitamin D
                      vitaminE: getNutrient(1109) || 0, // Vitamin E
                      vitaminK: getNutrient(1185) || 0, // Vitamin K
                      folate: getNutrient(1123) || 0, // Folate
                      niacin: getNutrient(1165) || 0, // Niacin
                    };
                  });
                
                allFoods = [...allFoods, ...foods];
                console.log(`✅ Loaded ${foods.length} foods for query "${query}"`);
              }
            }
          } catch (err) {
            console.error(`Error fetching foods for query "${query}":`, err);
          }
        }
        
        // Remove duplicates based on fdcId
        const uniqueFoods = Array.from(new Map(allFoods.map(f => [f.id, f])).values()).slice(0, 500);
        
        if (uniqueFoods.length > 0) {
          console.log(`✅ Total unique foods loaded: ${uniqueFoods.length}`);
          setApiFoods(uniqueFoods);
        } else {
          console.warn('No foods from API, using fallback foods');
          const fallbackFoods = [...defaultFoods, ...carbFoods, ...vegetableFoods, ...fruitFoods, ...nutFoods, ...oilFoods];
          setApiFoods(fallbackFoods);
        }
      } catch (error) {
        console.error('Error loading foods from API:', error);
        const fallbackFoods = [...defaultFoods, ...carbFoods, ...vegetableFoods, ...fruitFoods, ...nutFoods, ...oilFoods];
        setApiFoods(fallbackFoods);
      }
    };

    loadApiFoods();
  }, []);

  useEffect(() => {
    // Load custom foods from localStorage
    const saved = localStorage.getItem('customFoods');
    if (saved) {
      setCustomFoods(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const allAvailableFoods = [...apiFoods, ...customFoods];

  const handleAddFood = () => {
    if (!newFood.name || !newFood.calories) {
      alert('Please fill in name and calories');
      return;
    }
    
    const updatedFoods = [...customFoods, { ...newFood, id: Date.now() }];
    setCustomFoods(updatedFoods);
    localStorage.setItem('customFoods', JSON.stringify(updatedFoods));
    
    setNewFood({
      name: '',
      category: 'protein',
      servingSize: '100g',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sugar: '',
      vitaminA: '',
      vitaminB12: '',
      vitaminC: '',
      vitaminD: '',
      vitaminE: '',
      vitaminK: '',
      folate: '',
      niacin: '',
      calcium: '',
      iron: '',
      magnesium: '',
      phosphorus: '',
      potassium: '',
      zinc: '',
      sodium: '',
      copper: '',
      manganese: '',
      selenium: '',
      cholesterol: '',
      saturatedFat: '',
      transFat: '',
      monounsaturatedFat: '',
      polyunsaturatedFat: '',
      omega3: '',
      omega6: ''
    });
  };

  const handleDeleteFood = (id) => {
    // Delete from custom foods only
    const updatedCustomFoods = customFoods.filter(f => f.id !== id);
    setCustomFoods(updatedCustomFoods);
    localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
  };

  const handleEditFood = (food) => {
    setNewFood(food);
    setEditingId(food.id);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateFood = () => {
    if (!newFood.name || !newFood.calories) {
      alert('Please fill in name and calories');
      return;
    }

    if (editingId) {
      // Update custom food
      const updatedCustomFoods = customFoods.map(f => f.id === editingId ? newFood : f);
      setCustomFoods(updatedCustomFoods);
      localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
      setEditingId(null);
    } else {
      // Add new food
      const updatedCustomFoods = [...customFoods, { ...newFood, id: Date.now() }];
      setCustomFoods(updatedCustomFoods);
      localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    }

    setNewFood({
      name: '',
      category: 'protein',
      servingSize: '100g',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sugar: '',
      vitaminA: '',
      vitaminB12: '',
      vitaminC: '',
      vitaminD: '',
      vitaminE: '',
      vitaminK: '',
      folate: '',
      niacin: '',
      calcium: '',
      iron: '',
      magnesium: '',
      phosphorus: '',
      potassium: '',
      zinc: '',
      sodium: '',
      copper: '',
      manganese: '',
      selenium: '',
      cholesterol: '',
      saturatedFat: '',
      transFat: '',
      monounsaturatedFat: '',
      polyunsaturatedFat: '',
      omega3: '',
      omega6: ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewFood({
      name: '',
      category: 'protein',
      servingSize: '100g',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sugar: '',
      vitaminA: '',
      vitaminB12: '',
      vitaminC: '',
      vitaminD: '',
      vitaminE: '',
      vitaminK: '',
      folate: '',
      niacin: '',
      calcium: '',
      iron: '',
      magnesium: '',
      phosphorus: '',
      potassium: '',
      zinc: '',
      sodium: '',
      copper: '',
      manganese: '',
      selenium: '',
      cholesterol: '',
      saturatedFat: '',
      transFat: '',
      monounsaturatedFat: '',
      polyunsaturatedFat: '',
      omega3: '',
      omega6: ''
    });
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const filteredFoods = allAvailableFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <>
      <TopNav />
      <div className="food-library-manager">
        <section className="manager-hero">
          <div className="hero-content">
            <h1>Food Library Manager</h1>
            <p className="hero-subtitle">Comprehensive nutrition database with macro and micronutrients</p>
          </div>
          <div className="hero-actions">
            <button className="btn-dashboard" onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </section>

        <div className="manager-layout">
          {/* Add Food Section */}
          <section className="manager-card">
            <div className="card-title">
              <h2>{editingId ? 'Edit Food' : 'Add New Food'}</h2>
            </div>
            <div className="food-form">
              <div className="form-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'macros' ? 'active' : ''}`}
                  onClick={() => setActiveTab('macros')}
                >
                  Macros
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'vitamins' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vitamins')}
                >
                  Vitamins
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'minerals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('minerals')}
                >
                  Minerals
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'fats' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fats')}
                >
                  Fats & Other
                </button>
              </div>

              <div className="form-content">

                {activeTab === 'basic' && (
                  <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                      <label>Food Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Chicken Breast"
                        value={newFood.name}
                        onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={newFood.category}
                        onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                        className="form-input"
                      >
                        {foodCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Serving Size</label>
                      <input
                        type="text"
                        placeholder="e.g., 100g, 1 cup"
                        value={newFood.servingSize}
                        onChange={(e) => setNewFood({...newFood, servingSize: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'macros' && (
                  <div className="form-section">
                    <h3>Macronutrients</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Calories</label>
                        <input type="number" placeholder="0" value={newFood.calories} onChange={(e) => setNewFood({...newFood, calories: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Protein (g)</label>
                        <input type="number" placeholder="0" value={newFood.protein} onChange={(e) => setNewFood({...newFood, protein: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Carbs (g)</label>
                        <input type="number" placeholder="0" value={newFood.carbs} onChange={(e) => setNewFood({...newFood, carbs: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Fat (g)</label>
                        <input type="number" placeholder="0" value={newFood.fat} onChange={(e) => setNewFood({...newFood, fat: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Fiber (g)</label>
                        <input type="number" placeholder="0" value={newFood.fiber} onChange={(e) => setNewFood({...newFood, fiber: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Sugar (g)</label>
                        <input type="number" placeholder="0" value={newFood.sugar} onChange={(e) => setNewFood({...newFood, sugar: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'vitamins' && (
                  <div className="form-section">
                    <h3>Vitamins</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Vitamin A (mcg)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminA} onChange={(e) => setNewFood({...newFood, vitaminA: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Vitamin B12 (mcg)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminB12} onChange={(e) => setNewFood({...newFood, vitaminB12: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Vitamin C (mg)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminC} onChange={(e) => setNewFood({...newFood, vitaminC: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Vitamin D (IU)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminD} onChange={(e) => setNewFood({...newFood, vitaminD: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Vitamin E (mg)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminE} onChange={(e) => setNewFood({...newFood, vitaminE: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Vitamin K (mcg)</label>
                        <input type="number" placeholder="0" value={newFood.vitaminK} onChange={(e) => setNewFood({...newFood, vitaminK: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Folate (mcg)</label>
                        <input type="number" placeholder="0" value={newFood.folate} onChange={(e) => setNewFood({...newFood, folate: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Niacin (mg)</label>
                        <input type="number" placeholder="0" value={newFood.niacin} onChange={(e) => setNewFood({...newFood, niacin: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'minerals' && (
                  <div className="form-section">
                    <h3>Minerals</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Calcium (mg)</label>
                        <input type="number" placeholder="0" value={newFood.calcium} onChange={(e) => setNewFood({...newFood, calcium: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Iron (mg)</label>
                        <input type="number" placeholder="0" value={newFood.iron} onChange={(e) => setNewFood({...newFood, iron: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Magnesium (mg)</label>
                        <input type="number" placeholder="0" value={newFood.magnesium} onChange={(e) => setNewFood({...newFood, magnesium: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Phosphorus (mg)</label>
                        <input type="number" placeholder="0" value={newFood.phosphorus} onChange={(e) => setNewFood({...newFood, phosphorus: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Potassium (mg)</label>
                        <input type="number" placeholder="0" value={newFood.potassium} onChange={(e) => setNewFood({...newFood, potassium: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Zinc (mg)</label>
                        <input type="number" placeholder="0" value={newFood.zinc} onChange={(e) => setNewFood({...newFood, zinc: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Sodium (mg)</label>
                        <input type="number" placeholder="0" value={newFood.sodium} onChange={(e) => setNewFood({...newFood, sodium: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Copper (mg)</label>
                        <input type="number" placeholder="0" value={newFood.copper} onChange={(e) => setNewFood({...newFood, copper: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Manganese (mg)</label>
                        <input type="number" placeholder="0" value={newFood.manganese} onChange={(e) => setNewFood({...newFood, manganese: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Selenium (mcg)</label>
                        <input type="number" placeholder="0" value={newFood.selenium} onChange={(e) => setNewFood({...newFood, selenium: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'fats' && (
                  <div className="form-section">
                    <h3>Fat Breakdown & Other</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Saturated Fat (g)</label>
                        <input type="number" placeholder="0" value={newFood.saturatedFat} onChange={(e) => setNewFood({...newFood, saturatedFat: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Trans Fat (g)</label>
                        <input type="number" placeholder="0" value={newFood.transFat} onChange={(e) => setNewFood({...newFood, transFat: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Monounsaturated Fat (g)</label>
                        <input type="number" placeholder="0" value={newFood.monounsaturatedFat} onChange={(e) => setNewFood({...newFood, monounsaturatedFat: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Polyunsaturated Fat (g)</label>
                        <input type="number" placeholder="0" value={newFood.polyunsaturatedFat} onChange={(e) => setNewFood({...newFood, polyunsaturatedFat: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Omega-3 (mg)</label>
                        <input type="number" placeholder="0" value={newFood.omega3} onChange={(e) => setNewFood({...newFood, omega3: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Omega-6 (mg)</label>
                        <input type="number" placeholder="0" value={newFood.omega6} onChange={(e) => setNewFood({...newFood, omega6: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Cholesterol (mg)</label>
                        <input type="number" placeholder="0" value={newFood.cholesterol} onChange={(e) => setNewFood({...newFood, cholesterol: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={handleUpdateFood} className="btn-add-food">
                  {editingId ? 'Update Food' : 'Add Food to Library'}
                </button>
                {editingId && (
                  <button onClick={handleCancelEdit} className="btn-cancel">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Foods List Section */}
          <section className="manager-card">
            <div className="list-header">
              <h2>Food Library ({filteredFoods.length})</h2>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="category-tabs">
              <button 
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Foods
              </button>
              {foodCategories.map(cat => (
                <button 
                  key={cat.value}
                  className={`category-tab ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {filteredFoods.length === 0 ? (
              <p className="empty-state">No foods found</p>
            ) : (
              <div className="foods-grid">
                {filteredFoods.map((food) => (
                  <div key={food.id} className="food-card">
                    <div className="food-card-header">
                      <div className="food-info">
                        <h3>{food.name}</h3>
                        <span className={`category-badge category-${food.category}`}>
                          {foodCategories.find(c => c.value === food.category)?.label || food.category}
                        </span>
                      </div>
                      <div className="food-actions">
                        <button 
                          onClick={() => handleEditFood(food)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteFood(food.id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="food-card-body">
                      <div className="serving-info">
                        <span className="label">Serving:</span>
                        <span className="value">{food.servingSize}</span>
                      </div>

                      <div className="macros-summary">
                        <div className="macro-item">
                          <span className="macro-label">Calories</span>
                          <span className="macro-value">{food.calories || '-'}</span>
                        </div>
                        <div className="macro-item">
                          <span className="macro-label">Protein</span>
                          <span className="macro-value">{food.protein || '-'}g</span>
                        </div>
                        <div className="macro-item">
                          <span className="macro-label">Carbs</span>
                          <span className="macro-value">{food.carbs || '-'}g</span>
                        </div>
                        <div className="macro-item">
                          <span className="macro-label">Fat</span>
                          <span className="macro-value">{food.fat || '-'}g</span>
                        </div>
                      </div>

                      {(food.fiber || food.sugar || food.sodium || food.potassium || food.calcium || food.iron) && (
                        <div className="nutrition-details">
                          <div className="detail-row">
                            {food.fiber && <div className="detail-item"><span>Fiber:</span> {food.fiber}g</div>}
                            {food.sugar && <div className="detail-item"><span>Sugar:</span> {food.sugar}g</div>}
                            {food.sodium && <div className="detail-item"><span>Sodium:</span> {food.sodium}mg</div>}
                          </div>
                          <div className="detail-row">
                            {food.potassium && <div className="detail-item"><span>Potassium:</span> {food.potassium}mg</div>}
                            {food.calcium && <div className="detail-item"><span>Calcium:</span> {food.calcium}mg</div>}
                            {food.iron && <div className="detail-item"><span>Iron:</span> {food.iron}mg</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FoodLibraryManager;
