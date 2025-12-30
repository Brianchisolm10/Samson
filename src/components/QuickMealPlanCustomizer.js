import React, { useState } from 'react';
import { getCurrentUser } from '../utils/userStorage';
import './QuickMealPlanCustomizer.css';

function QuickMealPlanCustomizer({ onComplete, onBack }) {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    mealCount: 3,
    dietaryPreference: user.profile?.dietaryPreference || 'balanced',
    cuisinePreference: 'any',
    timeForMeals: 'moderate',
    budgetLevel: 'moderate',
    specificGoal: 'maintenance',
    restrictions: '',
    newRecipes: false,
    recipePreference: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine user's stored profile with quick customization
    const customizedResponses = {
      ...user.profile,
      ...formData,
      isQuickCustomization: true
    };
    
    onComplete(customizedResponses);
  };

  return (
    <div className="quick-meal-customizer">
      <div className="customizer-header">
        <h2>Customize Your Meal Plan</h2>
        <p>We already have your profile. Just tell us what you're looking for this week.</p>
      </div>

      <form onSubmit={handleSubmit} className="customizer-form">
        <div className="form-group">
          <label htmlFor="mealCount">Meals per day</label>
          <select 
            id="mealCount" 
            name="mealCount" 
            value={formData.mealCount} 
            onChange={handleChange}
          >
            <option value="2">2 meals</option>
            <option value="3">3 meals</option>
            <option value="4">4 meals</option>
            <option value="5">5 meals</option>
            <option value="6">6 meals</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dietaryPreference">Dietary preference</label>
          <select 
            id="dietaryPreference" 
            name="dietaryPreference" 
            value={formData.dietaryPreference} 
            onChange={handleChange}
          >
            <option value="balanced">Balanced</option>
            <option value="high-protein">High Protein</option>
            <option value="low-carb">Low Carb</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cuisinePreference">Cuisine preference</label>
          <select 
            id="cuisinePreference" 
            name="cuisinePreference" 
            value={formData.cuisinePreference} 
            onChange={handleChange}
          >
            <option value="any">Any cuisine</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="asian">Asian</option>
            <option value="mexican">Mexican</option>
            <option value="italian">Italian</option>
            <option value="american">American</option>
            <option value="middle-eastern">Middle Eastern</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeForMeals">Time available for meal prep</label>
          <select 
            id="timeForMeals" 
            name="timeForMeals" 
            value={formData.timeForMeals} 
            onChange={handleChange}
          >
            <option value="minimal">Minimal (quick meals)</option>
            <option value="moderate">Moderate (30-60 min)</option>
            <option value="plenty">Plenty (1+ hours)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budgetLevel">Budget level</label>
          <select 
            id="budgetLevel" 
            name="budgetLevel" 
            value={formData.budgetLevel} 
            onChange={handleChange}
          >
            <option value="budget">Budget-friendly</option>
            <option value="moderate">Moderate</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specificGoal">Specific goal for this plan</label>
          <select 
            id="specificGoal" 
            name="specificGoal" 
            value={formData.specificGoal} 
            onChange={handleChange}
          >
            <option value="maintenance">Maintenance</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="performance">Athletic Performance</option>
            <option value="energy">Sustained Energy</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="restrictions">Any allergies or restrictions?</label>
          <textarea 
            id="restrictions" 
            name="restrictions" 
            value={formData.restrictions}
            onChange={handleChange}
            placeholder="e.g., Gluten-free, nut allergy, lactose intolerant, etc."
            rows="2"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="newRecipes" 
              checked={formData.newRecipes}
              onChange={handleChange}
            />
            <span>I want to try new recipes</span>
          </label>
        </div>

        {formData.newRecipes && (
          <div className="form-group">
            <label htmlFor="recipePreference">What type of recipes?</label>
            <textarea 
              id="recipePreference" 
              name="recipePreference" 
              value={formData.recipePreference}
              onChange={handleChange}
              placeholder="e.g., Quick & easy, international, comfort food, etc."
              rows="2"
            />
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-generate">
            Generate Meal Plan
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuickMealPlanCustomizer;
