import React, { useState } from 'react';

function OnboardingTrainingSetup({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleToggleEquipment = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment?.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...(prev.equipment || []), equipment]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fitnessLevel) newErrors.fitnessLevel = 'Fitness level required';
    if (!formData.daysPerWeek) newErrors.daysPerWeek = 'Training frequency required';
    if (!formData.sessionDuration) newErrors.sessionDuration = 'Session duration required';
    if (!formData.equipment || formData.equipment.length === 0) newErrors.equipment = 'Select at least one equipment option';
    
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
        <h2>Training Setup</h2>
        <p>Tell us about your training environment and preferences</p>
      </div>

      <div className="form-group">
        <label>Current Fitness Level *</label>
        <select
          value={formData.fitnessLevel || ''}
          onChange={(e) => handleChange('fitnessLevel', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="beginner">Beginner (just starting)</option>
          <option value="intermediate">Intermediate (1-2 years)</option>
          <option value="advanced">Advanced (3+ years)</option>
        </select>
        {errors.fitnessLevel && <span style={{ color: '#c33', fontSize: 12 }}>{errors.fitnessLevel}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Days Per Week Available *</label>
          <select
            value={formData.daysPerWeek || ''}
            onChange={(e) => handleChange('daysPerWeek', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
            <option value="6">6 days</option>
          </select>
          {errors.daysPerWeek && <span style={{ color: '#c33', fontSize: 12 }}>{errors.daysPerWeek}</span>}
        </div>
        <div className="form-group">
          <label>Session Duration (minutes) *</label>
          <select
            value={formData.sessionDuration || ''}
            onChange={(e) => handleChange('sessionDuration', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="30">20-30 minutes</option>
            <option value="45">30-45 minutes</option>
            <option value="60">45-60 minutes</option>
            <option value="90">60-90 minutes</option>
          </select>
          {errors.sessionDuration && <span style={{ color: '#c33', fontSize: 12 }}>{errors.sessionDuration}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Available Equipment *</label>
        <div className="checkbox-group">
          {['barbell', 'dumbbell', 'machine', 'cable', 'kettlebell', 'band', 'body weight'].map(equipment => (
            <label key={equipment} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.equipment?.includes(equipment) || false}
                onChange={() => handleToggleEquipment(equipment)}
              />
              <span>{equipment.charAt(0).toUpperCase() + equipment.slice(1)}</span>
            </label>
          ))}
        </div>
        {errors.equipment && <span style={{ color: '#c33', fontSize: 12 }}>{errors.equipment}</span>}
      </div>

      <div className="form-group">
        <label>Training Style Preference</label>
        <select
          value={formData.trainingStyle || ''}
          onChange={(e) => handleChange('trainingStyle', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="full-body">Full Body (all muscles each session)</option>
          <option value="upper-lower">Upper/Lower Split</option>
          <option value="ppl">Push/Pull/Legs</option>
          <option value="body-part">Body Part Split</option>
        </select>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingTrainingSetup;
