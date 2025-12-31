import React, { useState } from 'react';

function OnboardingActivityHistory({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'recreational',
    frequency: 'weekly',
    yearsExperience: ''
  });

  const addActivity = () => {
    if (newActivity.name.trim()) {
      setFormData(prev => ({
        ...prev,
        currentActivities: [...(prev.currentActivities || []), newActivity]
      }));
      setNewActivity({
        name: '',
        type: 'recreational',
        frequency: 'weekly',
        yearsExperience: ''
      });
    }
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      currentActivities: prev.currentActivities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Activity & Training History</h2>
        <p>What activities are you currently doing or have done?</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="form-group">
          <label>Activity Name</label>
          <input
            type="text"
            value={newActivity.name}
            onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Running, Basketball, Weightlifting"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select
              value={newActivity.type}
              onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="recreational">Recreational</option>
              <option value="competitive">Competitive</option>
              <option value="sport">Sport</option>
              <option value="training">Training</option>
            </select>
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <select
              value={newActivity.frequency}
              onChange={(e) => setNewActivity(prev => ({ ...prev, frequency: e.target.value }))}
            >
              <option value="daily">Daily</option>
              <option value="several-weekly">Several times/week</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="occasional">Occasional</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="number"
            value={newActivity.yearsExperience}
            onChange={(e) => setNewActivity(prev => ({ ...prev, yearsExperience: e.target.value }))}
            placeholder="0"
            min="0"
            max="80"
          />
        </div>

        <button className="add-entry-btn" onClick={addActivity}>
          + Add Activity
        </button>
      </div>

      {formData.currentActivities && formData.currentActivities.length > 0 && (
        <div className="multi-entry-list">
          {formData.currentActivities.map((activity, idx) => (
            <div key={idx} className="entry-item">
              <div className="entry-item-content">
                <strong>{activity.name}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {activity.type} • {activity.frequency}
                  {activity.yearsExperience && ` • ${activity.yearsExperience} years`}
                </div>
              </div>
              <button
                className="entry-item-remove"
                onClick={() => removeActivity(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group" style={{ marginTop: 24 }}>
        <label>Training Background (Optional)</label>
        <textarea
          value={formData.trainingBackground || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, trainingBackground: e.target.value }))}
          placeholder="Tell us about your overall training history and experience"
        />
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingActivityHistory;
