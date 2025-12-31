import React, { useState } from 'react';

function OnboardingInjuryProfile({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [newInjury, setNewInjury] = useState({
    location: '',
    severity: 'mild',
    status: 'current',
    triggers: '',
    limitations: ''
  });

  const addInjury = () => {
    if (newInjury.location.trim()) {
      setFormData(prev => ({
        ...prev,
        injuries: [...(prev.injuries || []), newInjury]
      }));
      setNewInjury({
        location: '',
        severity: 'mild',
        status: 'current',
        triggers: '',
        limitations: ''
      });
    }
  };

  const removeInjury = (index) => {
    setFormData(prev => ({
      ...prev,
      injuries: prev.injuries.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Injury & Pain Profile</h2>
        <p>Tell us about any current or past injuries</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="form-group">
          <label>Injury Location *</label>
          <input
            type="text"
            value={newInjury.location}
            onChange={(e) => setNewInjury(prev => ({ ...prev, location: e.target.value }))}
            placeholder="e.g., Lower back, Right shoulder"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Severity</label>
            <select
              value={newInjury.severity}
              onChange={(e) => setNewInjury(prev => ({ ...prev, severity: e.target.value }))}
            >
              <option value="mild">Mild (occasional discomfort)</option>
              <option value="moderate">Moderate (regular pain)</option>
              <option value="severe">Severe (limiting activity)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={newInjury.status}
              onChange={(e) => setNewInjury(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="current">Current</option>
              <option value="recovering">Recovering</option>
              <option value="post-surgery">Post-Surgery</option>
              <option value="chronic">Chronic</option>
              <option value="past">Past (resolved)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>What Triggers It?</label>
          <textarea
            value={newInjury.triggers}
            onChange={(e) => setNewInjury(prev => ({ ...prev, triggers: e.target.value }))}
            placeholder="e.g., Heavy squats, overhead pressing, prolonged sitting"
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>Current Limitations</label>
          <textarea
            value={newInjury.limitations}
            onChange={(e) => setNewInjury(prev => ({ ...prev, limitations: e.target.value }))}
            placeholder="e.g., Can't do heavy deadlifts, limited range of motion"
            rows="2"
          />
        </div>

        <button className="add-entry-btn" onClick={addInjury}>
          + Add Injury
        </button>
      </div>

      {formData.injuries && formData.injuries.length > 0 && (
        <div className="multi-entry-list">
          {formData.injuries.map((injury, idx) => (
            <div key={idx} className="entry-item">
              <div className="entry-item-content">
                <strong>{injury.location}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {injury.severity} • {injury.status}
                </div>
                {injury.triggers && (
                  <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                    Triggers: {injury.triggers}
                  </div>
                )}
              </div>
              <button
                className="entry-item-remove"
                onClick={() => removeInjury(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingInjuryProfile;
