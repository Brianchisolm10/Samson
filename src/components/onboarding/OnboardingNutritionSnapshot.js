import React, { useState } from 'react';

function OnboardingNutritionSnapshot({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field].filter(v => v !== value)
        : [...(prev[field] || []), value]
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Nutrition Snapshot (Optional)</h2>
        <p>Tell us about your current eating habits</p>
      </div>

      <div className="form-group">
        <label>Typical Meals Per Day</label>
        <select
          value={formData.mealsPerDay || ''}
          onChange={(e) => handleChange('mealsPerDay', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="2">2 meals</option>
          <option value="3">3 meals</option>
          <option value="4">4 meals</option>
          <option value="5">5+ meals</option>
        </select>
      </div>

      <div className="form-group">
        <label>Dietary Restrictions or Preferences</label>
        <div className="checkbox-group">
          {[
            { id: 'vegetarian', label: 'Vegetarian' },
            { id: 'vegan', label: 'Vegan' },
            { id: 'gluten-free', label: 'Gluten-Free' },
            { id: 'dairy-free', label: 'Dairy-Free' },
            { id: 'keto', label: 'Keto/Low-Carb' },
            { id: 'paleo', label: 'Paleo' },
            { id: 'none', label: 'No restrictions' }
          ].map(restriction => (
            <label key={restriction.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.dietaryRestrictions?.includes(restriction.id) || false}
                onChange={() => handleToggle('dietaryRestrictions', restriction.id)}
              />
              <span>{restriction.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Foods You Love</label>
        <textarea
          value={formData.favoredFoods || ''}
          onChange={(e) => handleChange('favoredFoods', e.target.value)}
          placeholder="e.g., Chicken, rice, broccoli, salmon"
        />
      </div>

      <div className="form-group">
        <label>Foods You Dislike or Want to Avoid</label>
        <textarea
          value={formData.dislikedFoods || ''}
          onChange={(e) => handleChange('dislikedFoods', e.target.value)}
          placeholder="e.g., Fish, mushrooms, spicy foods"
        />
      </div>

      <div className="form-group">
        <label>Nutrition Goals</label>
        <select
          value={formData.nutritionGoals || ''}
          onChange={(e) => handleChange('nutritionGoals', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="performance">Athletic Performance</option>
          <option value="general-health">General Health</option>
          <option value="energy">Increased Energy</option>
        </select>
      </div>

      <div className="form-group">
        <label>Supplementation Interest</label>
        <div className="checkbox-group">
          {[
            { id: 'protein-powder', label: 'Protein Powder' },
            { id: 'multivitamin', label: 'Multivitamin' },
            { id: 'creatine', label: 'Creatine' },
            { id: 'omega-3', label: 'Omega-3' },
            { id: 'bcaa', label: 'BCAAs' },
            { id: 'none', label: 'No supplements' }
          ].map(supplement => (
            <label key={supplement.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.supplements?.includes(supplement.id) || false}
                onChange={() => handleToggle('supplements', supplement.id)}
              />
              <span>{supplement.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingNutritionSnapshot;
