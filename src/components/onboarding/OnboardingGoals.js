import React, { useState } from 'react';

function OnboardingGoals({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.primaryGoal) newErrors.primaryGoal = 'Primary goal required';
    if (!formData.motivation) newErrors.motivation = 'Motivation required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onComplete(formData);
    }
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Goals & Motivation</h2>
        <p>What are you working towards?</p>
      </div>

      <div className="form-group">
        <label>Primary Goal *</label>
        <select
          value={formData.primaryGoal || ''}
          onChange={(e) => handleChange('primaryGoal', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="strength">Build Strength</option>
          <option value="hypertrophy">Build Muscle</option>
          <option value="fat-loss">Lose Fat</option>
          <option value="endurance">Improve Endurance</option>
          <option value="general">General Fitness</option>
          <option value="athletic-performance">Athletic Performance</option>
          <option value="rehabilitation">Rehabilitation</option>
        </select>
        {errors.primaryGoal && <span style={{ color: '#c33', fontSize: 12 }}>{errors.primaryGoal}</span>}
      </div>

      <div className="form-group">
        <label>What's Your Main Motivation? *</label>
        <select
          value={formData.motivation || ''}
          onChange={(e) => handleChange('motivation', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="health">Better Health</option>
          <option value="appearance">Confidence & Appearance</option>
          <option value="performance">Athletic Performance</option>
          <option value="recovery">Recovery from Injury</option>
          <option value="lifestyle">Lifestyle Change</option>
          <option value="longevity">Longevity & Aging Well</option>
        </select>
        {errors.motivation && <span style={{ color: '#c33', fontSize: 12 }}>{errors.motivation}</span>}
      </div>

      <div className="form-group">
        <label>Timeline for Results</label>
        <select
          value={formData.timeline || ''}
          onChange={(e) => handleChange('timeline', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="1-month">1 Month</option>
          <option value="3-months">3 Months</option>
          <option value="6-months">6 Months</option>
          <option value="1-year">1 Year</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>

      <div className="form-group">
        <label>Additional Notes About Your Goals</label>
        <textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          placeholder="Tell us anything else about your goals..."
        />
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingGoals;
