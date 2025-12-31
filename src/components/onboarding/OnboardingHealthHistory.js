import React, { useState } from 'react';

function OnboardingHealthHistory({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);

  const conditions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'High Blood Pressure' },
    { id: 'cardiovascular', label: 'Heart Disease or Cardiovascular Issues' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'arthritis', label: 'Arthritis' },
    { id: 'thyroid', label: 'Thyroid Disorder' },
    { id: 'mental-health', label: 'Mental Health Condition' },
    { id: 'cancer', label: 'History of Cancer' }
  ];

  const handleToggleCondition = (conditionId) => {
    setFormData(prev => ({
      ...prev,
      [conditionId]: !prev[conditionId]
    }));
  };

  const hasAnyCondition = Object.values(formData).some(v => v === true);

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Health History</h2>
        <p>Do you have any of the following conditions? (Select all that apply)</p>
      </div>

      <div className="checkbox-group">
        {conditions.map(condition => (
          <label key={condition.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={formData[condition.id] || false}
              onChange={() => handleToggleCondition(condition.id)}
            />
            <span>{condition.label}</span>
          </label>
        ))}
      </div>

      {hasAnyCondition && (
        <div className="conditional-section">
          <h4>⚠️ Important Information</h4>
          <p style={{ fontSize: 13, color: '#333', margin: 0 }}>
            You've indicated one or more health conditions. Please consult with your healthcare provider before starting any new exercise program. We'll take these into account when designing your program.
          </p>
          <div className="form-group" style={{ marginTop: 12 }}>
            <label>Additional Health Details (Optional)</label>
            <textarea
              value={formData.additionalHealthDetails || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalHealthDetails: e.target.value }))}
              placeholder="Any other health information we should know about?"
            />
          </div>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingHealthHistory;
