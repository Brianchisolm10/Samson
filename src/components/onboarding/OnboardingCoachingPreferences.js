import React, { useState } from 'react';

function OnboardingCoachingPreferences({ data, onComplete, onBack }) {
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
        <h2>Coaching & Delivery Preferences</h2>
        <p>How do you prefer to receive coaching and guidance?</p>
      </div>

      <div className="form-group">
        <label>Coaching Style</label>
        <select
          value={formData.coachingStyle || ''}
          onChange={(e) => handleChange('coachingStyle', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="hands-on">Hands-On (detailed guidance)</option>
          <option value="balanced">Balanced (guidance + autonomy)</option>
          <option value="autonomous">Autonomous (minimal guidance)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Preferred Session Format</label>
        <div className="checkbox-group">
          {[
            { id: 'in-person', label: 'In-Person' },
            { id: 'virtual', label: 'Virtual/Online' },
            { id: 'hybrid', label: 'Hybrid (mix of both)' },
            { id: 'app-based', label: 'App-Based (self-guided)' }
          ].map(format => (
            <label key={format.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.sessionFormats?.includes(format.id) || false}
                onChange={() => handleToggle('sessionFormats', format.id)}
              />
              <span>{format.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Communication Preference</label>
        <select
          value={formData.communicationPreference || ''}
          onChange={(e) => handleChange('communicationPreference', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="email">Email</option>
          <option value="text">Text/SMS</option>
          <option value="app">App Notifications</option>
          <option value="phone">Phone Calls</option>
          <option value="mixed">Mixed (multiple channels)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Feedback Frequency</label>
        <select
          value={formData.feedbackFrequency || ''}
          onChange={(e) => handleChange('feedbackFrequency', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="as-needed">As Needed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Learning Preference</label>
        <div className="checkbox-group">
          {[
            { id: 'video', label: 'Video Demonstrations' },
            { id: 'written', label: 'Written Instructions' },
            { id: 'audio', label: 'Audio Explanations' },
            { id: 'visual', label: 'Charts & Diagrams' }
          ].map(pref => (
            <label key={pref.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.learningPreferences?.includes(pref.id) || false}
                onChange={() => handleToggle('learningPreferences', pref.id)}
              />
              <span>{pref.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Additional Preferences (Optional)</label>
        <textarea
          value={formData.additionalPreferences || ''}
          onChange={(e) => handleChange('additionalPreferences', e.target.value)}
          placeholder="Any other preferences or special requests?"
        />
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingCoachingPreferences;
