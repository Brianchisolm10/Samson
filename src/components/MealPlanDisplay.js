import React, { useState } from 'react';
import './MealPlanDisplay.css';
import InfoTooltip from './InfoTooltip';

function MealPlanDisplay({ mealPlan, responses }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    shoppingList: false,
    micronutrients: false,
  });

  if (!mealPlan || !mealPlan.days || mealPlan.days.length === 0) {
    return (
      <div className="meal-plan-display loading">
        <p>Loading meal plan...</p>
      </div>
    );
  }

  const currentDay = mealPlan.days[selectedDay];
  const macroTargets = mealPlan.metadata.macroTargets;

  const toggleMealExpand = (mealIndex) => {
    setExpandedMeal(expandedMeal === mealIndex ? null : mealIndex);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getMacroPercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const renderMacroBar = (macros, targets) => {
    const total = macros.calories;
    const targetTotal = targets.dailyCalories;
    const percentage = getMacroPercentage(total, targetTotal);

    return (
      <div className="macro-bar-container">
        <div className="macro-bar">
          <div
            className="macro-bar-fill"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="macro-percentage">{percentage}% of daily target</span>
      </div>
    );
  };

  return (
    <div className="meal-plan-display">
      {/* Action Bar - Horizontal at Top */}
      <div className="action-bar-horizontal">
        <button className="action-bar-btn" onClick={() => window.print()}>
          📄 Print
        </button>
        <button className="action-bar-btn" onClick={() => downloadMealPlan(mealPlan)}>
          ⬇️ Download
        </button>
        <button className="action-bar-btn" onClick={() => alert('Save feature coming soon!')}>
          💾 Save
        </button>
        <button className="action-bar-btn" onClick={() => window.location.href = '/hub'}>
          ← Back to Tools
        </button>
      </div>

      <div className="meal-plan-header">
        <h1>Your 7-Day Meal Plan</h1>
        <p className="plan-meta">
          {mealPlan.metadata.goal} • {mealPlan.metadata.mealsPerDay} meals/day •{' '}
          {macroTargets.dailyCalories} cal/day
        </p>
      </div>

      {/* Client Summary */}
      {mealPlan.metadata.clientInfo && (
        <div className="client-summary">
          <h3>Your Profile</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Gender:</span>
              <span className="value">{mealPlan.metadata.clientInfo.gender}</span>
            </div>
            <div className="summary-item">
              <span className="label">Age:</span>
              <span className="value">{mealPlan.metadata.clientInfo.age}</span>
            </div>
            <div className="summary-item">
              <span className="label">Weight:</span>
              <span className="value">{mealPlan.metadata.clientInfo.bodyweight}</span>
            </div>
            <div className="summary-item">
              <span className="label">Height:</span>
              <span className="value">{mealPlan.metadata.clientInfo.height}</span>
            </div>
            <div className="summary-item">
              <span className="label">Activity Level:</span>
              <span className="value">{mealPlan.metadata.clientInfo.activityLevel}</span>
            </div>
            <div className="summary-item">
              <span className="label">Dietary Preference:</span>
              <span className="value">{mealPlan.metadata.dietaryPreference}</span>
            </div>
            <div className="summary-item">
              <span className="label">Cuisines:</span>
              <span className="value">{mealPlan.metadata.clientInfo.cuisines}</span>
            </div>
            <div className="summary-item">
              <span className="label">Allergies:</span>
              <span className="value">{mealPlan.metadata.clientInfo.allergies}</span>
            </div>
          </div>
        </div>
      )}

      {/* Macro Summary */}
      <div className="macro-summary">
        <div className="summary-card">
          <h4>Macronutrient Targets</h4>
          <div className="macro-item">
            <span className="macro-label">Calories</span>
            <span className="macro-value">{macroTargets.dailyCalories}</span>
          </div>
          <div className="macro-item">
            <span className="macro-label">Protein</span>
            <span className="macro-value">{macroTargets.protein}g</span>
          </div>
          <div className="macro-item">
            <span className="macro-label">Carbs</span>
            <span className="macro-value">{macroTargets.carbs}g</span>
          </div>
          <div className="macro-item">
            <span className="macro-label">Fat</span>
            <span className="macro-value">{macroTargets.fat}g</span>
          </div>
        </div>

        {mealPlan.metadata.micronutrientTargets && (
          <div className="summary-card">
            <h4>Key Micronutrients</h4>
            {['fiber', 'sodium', 'calcium', 'iron', 'vitaminC', 'vitaminD'].map((key) => {
              const nutrient = mealPlan.metadata.micronutrientTargets[key];
              return nutrient ? (
                <div key={key} className="macro-item">
                  <span className="macro-label">{nutrient.label}</span>
                  <span className="macro-value">{nutrient.target}{nutrient.unit}</span>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className="meal-plan-container">
        {/* Day Navigation */}
        <div className="day-navigation">
          <h3>Select Day</h3>
          <div className="day-buttons">
            {mealPlan.days.map((day, index) => (
              <button
                key={index}
                className={`day-btn ${selectedDay === index ? 'active' : ''}`}
                onClick={() => setSelectedDay(index)}
              >
                <span className="day-number">Day {day.day}</span>
                <span className="day-date">{day.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Meals */}
        <div className="current-day">
          <div className="day-header">
            <h2>Day {currentDay.day}</h2>
            <p className="day-date-full">{currentDay.date}</p>
          </div>

          {/* Day Totals */}
          <div className="day-totals">
            <div className="total-item">
              <span className="label">Calories</span>
              <span className="value">{Math.round(currentDay.dailyTotals.calories)}</span>
              <span className="target">/ {macroTargets.dailyCalories}</span>
            </div>
            <div className="total-item">
              <span className="label">Protein</span>
              <span className="value">{Math.round(currentDay.dailyTotals.protein)}g</span>
              <span className="target">/ {macroTargets.protein}g</span>
            </div>
            <div className="total-item">
              <span className="label">Carbs</span>
              <span className="value">{Math.round(currentDay.dailyTotals.carbs)}g</span>
              <span className="target">/ {macroTargets.carbs}g</span>
            </div>
            <div className="total-item">
              <span className="label">Fat</span>
              <span className="value">{Math.round(currentDay.dailyTotals.fat)}g</span>
              <span className="target">/ {macroTargets.fat}g</span>
            </div>
            <div className="total-item">
              <span className="label">Fiber</span>
              <span className="value">{Math.round(currentDay.dailyTotals.fiber)}g</span>
              <span className="target">/ 25g</span>
            </div>
          </div>

          {/* Micronutrient Totals - Collapsible */}
          {mealPlan.metadata.micronutrientTargets && (
            <div className="micronutrient-totals">
              <button
                className="micronutrient-toggle"
                onClick={() => toggleSection('micronutrients')}
              >
                <h4>Micronutrient Summary</h4>
                <span className="toggle-icon">
                  {expandedSections.micronutrients ? '▼' : '▶'}
                </span>
              </button>

              {expandedSections.micronutrients && (
                <div className="micronutrient-grid">
                  {Object.entries(mealPlan.metadata.micronutrientTargets).map(([key, nutrient]) => {
                    const actual = Math.round(currentDay.dailyTotals[key] || 0);
                    const percentage = Math.round((actual / nutrient.target) * 100);
                    return (
                      <div key={key} className="micronutrient-item">
                        <span className="nutrient-name">{nutrient.label}</span>
                        <span className="nutrient-value">
                          {actual}{nutrient.unit}
                        </span>
                        <span className="nutrient-target">
                          / {nutrient.target}{nutrient.unit}
                        </span>
                        <div className="nutrient-bar">
                          <div
                            className="nutrient-bar-fill"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="nutrient-percentage">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Meals */}
          <div className="meals-list">
            {currentDay.meals && currentDay.meals.length > 0 ? (
              currentDay.meals.map((meal, index) => (
                <div key={index} className="meal-card">
                  <div
                    className="meal-header"
                    onClick={() => toggleMealExpand(index)}
                  >
                    <div className="meal-title">
                      <span className="meal-type">{meal.type.toUpperCase()}</span>
                      <h3>{meal.name}</h3>
                    </div>
                    <div className="meal-macros-quick">
                      <span className="macro-badge calories">
                        {Math.round(meal.macros?.calories || 0)} cal
                      </span>
                      <span className="macro-badge protein">
                        {Math.round(meal.macros?.protein || 0)}g P
                      </span>
                      <span className="macro-badge carbs">
                        {Math.round(meal.macros?.carbs || 0)}g C
                      </span>
                      <span className="macro-badge fat">
                        {Math.round(meal.macros?.fat || 0)}g F
                      </span>
                    </div>
                    <span className="expand-icon">
                      {expandedMeal === index ? '▼' : '▶'}
                    </span>
                  </div>

                  {expandedMeal === index && (
                    <div className="meal-details">
                      {/* Meal Info */}
                      <div className="meal-info">
                        <div className="info-item">
                          <span className="label">Servings:</span>
                          <span className="value">{meal.servings}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Prep Time:</span>
                          <span className="value">{meal.prepTime} min</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Cook Time:</span>
                          <span className="value">{meal.cookTime} min</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Total Time:</span>
                          <span className="value">{meal.totalTime} min</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Difficulty:</span>
                          <span className="value">{meal.difficulty}</span>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div className="meal-section">
                        <h4>Ingredients</h4>
                        <ul className="ingredients-list">
                          {meal.ingredients && meal.ingredients.length > 0 ? (
                            meal.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="ingredient-item">
                                <span className="ingredient-name">
                                  {ingredient.name}
                                </span>
                                <span className="ingredient-quantity">
                                  {ingredient.quantity} {ingredient.unit}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li>No ingredients available</li>
                          )}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div className="meal-section">
                        <h4>Instructions</h4>
                        {meal.instructionSteps && meal.instructionSteps.length > 0 ? (
                          <ol className="instructions-list">
                            {meal.instructionSteps.map((step, idx) => (
                              <li key={idx} className="instruction-step">
                                {step.instruction}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="no-instructions">
                            {meal.fullInstructions || 'No instructions available'}
                          </p>
                        )}
                      </div>

                      {/* Macros Breakdown */}
                      <div className="meal-section">
                        <h4>Nutritional Info</h4>
                        <div className="macros-breakdown">
                          <div className="macro-detail">
                            <span className="macro-name">Calories</span>
                            <span className="macro-amount">
                              {Math.round(meal.macros?.calories || 0)}
                            </span>
                          </div>
                          <div className="macro-detail">
                            <span className="macro-name">Protein</span>
                            <span className="macro-amount">
                              {Math.round(meal.macros?.protein || 0)}g
                            </span>
                          </div>
                          <div className="macro-detail">
                            <span className="macro-name">Carbs</span>
                            <span className="macro-amount">
                              {Math.round(meal.macros?.carbs || 0)}g
                            </span>
                          </div>
                          <div className="macro-detail">
                            <span className="macro-name">Fat</span>
                            <span className="macro-amount">
                              {Math.round(meal.macros?.fat || 0)}g
                            </span>
                          </div>
                          <div className="macro-detail">
                            <span className="macro-name">Fiber</span>
                            <span className="macro-amount">
                              {Math.round(meal.macros?.fiber || 0)}g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-meals">
                <p>No meals available for this day</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

const downloadMealPlan = (mealPlan) => {
  let content = `PERSONALIZED 7-DAY MEAL PLAN\n`;
  content += `================================\n\n`;
  content += `Goal: ${mealPlan.metadata.goal}\n`;
  content += `Meals Per Day: ${mealPlan.metadata.mealsPerDay}\n`;
  content += `Daily Calories: ${mealPlan.metadata.macroTargets.dailyCalories}\n\n`;

  mealPlan.days.forEach((day) => {
    content += `\nDAY ${day.day} - ${day.date}\n`;
    content += `---\n`;
    day.meals.forEach((meal) => {
      content += `\n${meal.type.toUpperCase()}: ${meal.name}\n`;
      content += `Calories: ${Math.round(meal.macros?.calories || 0)} | Protein: ${Math.round(meal.macros?.protein || 0)}g | Carbs: ${Math.round(meal.macros?.carbs || 0)}g | Fat: ${Math.round(meal.macros?.fat || 0)}g\n`;
      content += `Prep: ${meal.prepTime}min | Cook: ${meal.cookTime}min\n`;
      content += `\nIngredients:\n`;
      meal.ingredients?.forEach((ing) => {
        content += `- ${ing.name}: ${ing.quantity} ${ing.unit}\n`;
      });
      content += `\nInstructions:\n`;
      meal.instructionSteps?.forEach((step) => {
        content += `${step.number}. ${step.instruction}\n`;
      });
    });
    content += `\nDaily Totals:\n`;
    content += `Calories: ${Math.round(day.dailyTotals.calories)} | Protein: ${Math.round(day.dailyTotals.protein)}g | Carbs: ${Math.round(day.dailyTotals.carbs)}g | Fat: ${Math.round(day.dailyTotals.fat)}g\n`;
  });

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', 'meal-plan.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default MealPlanDisplay;
