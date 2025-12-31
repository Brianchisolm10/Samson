import React, { useState } from 'react';

function OnboardingServices({ data, onComplete, onBack }) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const services = [
    { id: 'general-fitness', label: 'General Fitness', description: 'Build strength, endurance, and overall fitness' },
    { id: 'weight-loss', label: 'Weight Loss', description: 'Achieve sustainable fat loss with nutrition and training' },
    { id: 'athletic-performance', label: 'Athletic Performance', description: 'Enhance sport-specific skills and conditioning' },
    { id: 'injury-recovery', label: 'Injury Recovery', description: 'Rehabilitate and return to activity safely' },
    { id: 'youth-training', label: 'Youth Training', description: 'Age-appropriate training for young athletes' },
    { id: 'nutrition-coaching', label: 'Nutrition Coaching', description: 'Personalized meal planning and nutrition guidance' }
  ];

  const handleToggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices?.includes(serviceId)
        ? prev.selectedServices.filter(s => s !== serviceId)
        : [...(prev.selectedServices || []), serviceId]
    }));
    if (errors.selectedServices) {
      setErrors(prev => ({ ...prev, selectedServices: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.selectedServices || formData.selectedServices.length === 0) {
      newErrors.selectedServices = 'Select at least one service';
    }
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
        <h2>Service Selection</h2>
        <p>What services are you interested in? (Select all that apply)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
        {services.map(service => (
          <label
            key={service.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: 16,
              border: `2px solid ${formData.selectedServices?.includes(service.id) ? '#8B6F47' : '#d0ccc4'}`,
              borderRadius: 6,
              cursor: 'pointer',
              backgroundColor: formData.selectedServices?.includes(service.id) ? '#f9f8f6' : 'white',
              transition: 'all 0.2s'
            }}
          >
            <input
              type="checkbox"
              checked={formData.selectedServices?.includes(service.id) || false}
              onChange={() => handleToggleService(service.id)}
              style={{ marginTop: 2 }}
            />
            <div>
              <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>{service.label}</div>
              <div style={{ fontSize: 13, color: '#666 ' }}>{service.description}</div>
            </div>
          </label>
        ))}
      </div>

      {errors.selectedServices && (
        <div style={{ color: '#c33', fontSize: 12, marginBottom: 16 }}>{errors.selectedServices}</div>
      )}

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingServices;
