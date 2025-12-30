import React, { useState } from 'react';
import { getCurrentUser } from '../utils/userStorage';
import './QuickWorkoutCustomizer.css';

function QuickWorkoutCustomizer({ onComplete, onBack }) {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    day: 'any',
    mood: 'energetic',
    timeAvailable: 60,
    energyLevel: 'high',
    focusArea: 'full-body',
    specificNeeds: '',
    newTechnique: false,
    techniqueDescription: ''
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
    <div className="quick-customizer">
      <div className="customizer-header">
        <h2>Customize Your Workout</h2>
        <p>We already have your profile. Just tell us what you're looking for today.</p>
      </div>

      <form onSubmit={handleSubmit} className="customizer-form">
        <div className="form-group">
          <label htmlFor="day">What day is this for?</label>
          <select 
            id="day" 
            name="day" 
            value={formData.day} 
            onChange={handleChange}
          >
            <option value="any">Any day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mood">How's your mood?</label>
          <select 
            id="mood" 
            name="mood" 
            value={formData.mood} 
            onChange={handleChange}
          >
            <option value="energetic">Energetic & Ready</option>
            <option value="motivated">Motivated</option>
            <option value="neutral">Neutral</option>
            <option value="tired">Tired but willing</option>
            <option value="recovering">Recovering</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeAvailable">Time available (minutes)</label>
          <input 
            type="number" 
            id="timeAvailable" 
            name="timeAvailable" 
            min="15" 
            max="180" 
            value={formData.timeAvailable}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="energyLevel">Energy level</label>
          <select 
            id="energyLevel" 
            name="energyLevel" 
            value={formData.energyLevel} 
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="peak">Peak</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="focusArea">Focus area</label>
          <select 
            id="focusArea" 
            name="focusArea" 
            value={formData.focusArea} 
            onChange={handleChange}
          >
            <option value="full-body">Full Body</option>
            <option value="upper-body">Upper Body</option>
            <option value="lower-body">Lower Body</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specificNeeds">Any specific needs or injuries to avoid?</label>
          <textarea 
            id="specificNeeds" 
            name="specificNeeds" 
            value={formData.specificNeeds}
            onChange={handleChange}
            placeholder="e.g., Lower back pain, recovering from injury, etc."
            rows="3"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="newTechnique" 
              checked={formData.newTechnique}
              onChange={handleChange}
            />
            <span>I want to learn a new technique</span>
          </label>
        </div>

        {formData.newTechnique && (
          <div className="form-group">
            <label htmlFor="techniqueDescription">What technique are you interested in?</label>
            <textarea 
              id="techniqueDescription" 
              name="techniqueDescription" 
              value={formData.techniqueDescription}
              onChange={handleChange}
              placeholder="e.g., Drop sets, supersets, tempo training, etc."
              rows="2"
            />
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-generate">
            Generate Workout
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuickWorkoutCustomizer;
