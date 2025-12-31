import React, { useState } from 'react';

function OnboardingIdentity({ data, onComplete, onBack }) {
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
    if (!formData.firstName) newErrors.firstName = 'First name required';
    if (!formData.lastName) newErrors.lastName = 'Last name required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.phone) newErrors.phone = 'Phone required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth required';
    if (!formData.gender) newErrors.gender = 'Gender required';
    
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
        <h2>Identity & Contact Information</h2>
        <p>Let's start with the basics</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
          />
          {errors.firstName && <span style={{ color: '#c33', fontSize: 12 }}>{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
          />
          {errors.lastName && <span style={{ color: '#c33', fontSize: 12 }}>{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
        />
        {errors.email && <span style={{ color: '#c33', fontSize: 12 }}>{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <span style={{ color: '#c33', fontSize: 12 }}>{errors.phone}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
          {errors.dateOfBirth && <span style={{ color: '#c33', fontSize: 12 }}>{errors.dateOfBirth}</span>}
        </div>
        <div className="form-group">
          <label>Gender *</label>
          <select
            value={formData.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <span style={{ color: '#c33', fontSize: 12 }}>{errors.gender}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Height (inches)</label>
          <input
            type="number"
            value={formData.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="70"
            min="48"
            max="96"
          />
        </div>
        <div className="form-group">
          <label>Weight (lbs)</label>
          <input
            type="number"
            value={formData.weight || ''}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="180"
            min="50"
            max="500"
          />
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={handleSubmit}>Next →</button>
      </div>
    </div>
  );
}

export default OnboardingIdentity;
