import React, { useState } from 'react';

function OnboardingMedications({ data, healthHistory, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [newMedication, setNewMedication] = useState({ name: '', reason: '' });

  const hasHealthConditions = Object.values(healthHistory).some(v => v === true);

  const addMedication = () => {
    if (newMedication.name.trim()) {
      setFormData(prev => ({
        ...prev,
        medications: [...(prev.medications || []), newMedication]
      }));
      setNewMedication({ name: '', reason: '' });
    }
  };

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Medications & Provider Context</h2>
        <p>List any medications you're currently taking</p>
      </div>

      {hasHealthConditions && (
        <div className="conditional-section">
          <h4>ℹ️ Note</h4>
          <p style={{ fontSize: 13, color: '#333', margin: 0 }}>
            Based on your health history, it's especially important to list any medications you're taking so we can ensure your program is safe and effective.
          </p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Medication Name
          </label>
          <input
            type="text"
            value={newMedication.name}
            onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Metformin, Lisinopril"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Reason / Condition
          </label>
          <input
            type="text"
            value={newMedication.reason}
            onChange={(e) => setNewMedication(prev => ({ ...prev, reason: e.target.value }))}
            placeholder="e.g., Diabetes, Blood Pressure"
          />
        </div>

        <button className="add-entry-btn" onClick={addMedication}>
          + Add Medication
        </button>
      </div>

      {formData.medications && formData.medications.length > 0 && (
        <div className="multi-entry-list" style={{ marginTop: 24 }}>
          {formData.medications.map((med, idx) => (
            <div key={idx} className="entry-item">
              <div className="entry-item-content">
                <strong>{med.name}</strong>
                {med.reason && <div style={{ fontSize: 12, color: '#666' }}>{med.reason}</div>}
              </div>
              <button
                className="entry-item-remove"
                onClick={() => removeMedication(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group" style={{ marginTop: 24 }}>
        <label>Healthcare Provider Information (Optional)</label>
        <textarea
          value={formData.providerInfo || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, providerInfo: e.target.value }))}
          placeholder="Doctor name, clinic, or any relevant provider information"
        />
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingMedications;
