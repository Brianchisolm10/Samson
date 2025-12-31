import React, { useState } from 'react';

function OnboardingReview({ formData, onSubmit, onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit();
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value || '—';
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Review Your Information</h2>
        <p>Please review your answers before submitting</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* Identity */}
      {formData.identity && (
        <div className="review-section">
          <h3>Identity & Contact</h3>
          <div className="review-item">
            <div className="review-label">Name</div>
            <div className="review-value">
              {formData.identity.firstName} {formData.identity.lastName}
            </div>
          </div>
          <div className="review-item">
            <div className="review-label">Email</div>
            <div className="review-value">{formData.identity.email}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Phone</div>
            <div className="review-value">{formData.identity.phone}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Age</div>
            <div className="review-value">
              {formData.identity.dateOfBirth
                ? new Date().getFullYear() - new Date(formData.identity.dateOfBirth).getFullYear()
                : '—'}
            </div>
          </div>
          <div className="review-item">
            <div className="review-label">Height / Weight</div>
            <div className="review-value">
              {formData.identity.height && formData.identity.weight
                ? `${formData.identity.height}" / ${formData.identity.weight} lbs`
                : '—'}
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      {formData.services && (
        <div className="review-section">
          <h3>Services</h3>
          <div className="review-item">
            <div className="review-label">Selected Services</div>
            <div className="review-value">{renderValue(formData.services.selectedServices)}</div>
          </div>
        </div>
      )}

      {/* Training Setup */}
      {formData.trainingSetup && (
        <div className="review-section">
          <h3>Training Setup</h3>
          <div className="review-item">
            <div className="review-label">Fitness Level</div>
            <div className="review-value">{renderValue(formData.trainingSetup.fitnessLevel)}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Days Per Week</div>
            <div className="review-value">{renderValue(formData.trainingSetup.daysPerWeek)}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Session Duration</div>
            <div className="review-value">{renderValue(formData.trainingSetup.sessionDuration)} min</div>
          </div>
          <div className="review-item">
            <div className="review-label">Equipment</div>
            <div className="review-value">{renderValue(formData.trainingSetup.equipment)}</div>
          </div>
        </div>
      )}

      {/* Goals */}
      {formData.goals && (
        <div className="review-section">
          <h3>Goals & Motivation</h3>
          <div className="review-item">
            <div className="review-label">Primary Goal</div>
            <div className="review-value">{renderValue(formData.goals.primaryGoal)}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Motivation</div>
            <div className="review-value">{renderValue(formData.goals.motivation)}</div>
          </div>
        </div>
      )}

      {/* Health History */}
      {formData.healthHistory && Object.values(formData.healthHistory).some(v => v === true) && (
        <div className="review-section">
          <h3>Health Conditions</h3>
          <div style={{ fontSize: 13, color: '#666 ' }}>
            {Object.entries(formData.healthHistory)
              .filter(([_, v]) => v === true)
              .map(([key]) => key)
              .join(', ')}
          </div>
        </div>
      )}

      {/* Injuries */}
      {formData.injuryProfile?.injuries && formData.injuryProfile.injuries.length > 0 && (
        <div className="review-section">
          <h3>Injuries</h3>
          {formData.injuryProfile.injuries.map((injury, idx) => (
            <div key={idx} style={{ marginBottom: 12, fontSize: 13 }}>
              <strong>{injury.location}</strong> ({injury.severity}, {injury.status})
            </div>
          ))}
        </div>
      )}

      {/* Coaching Preferences */}
      {formData.coachingPreferences && (
        <div className="review-section">
          <h3>Coaching Preferences</h3>
          <div className="review-item">
            <div className="review-label">Coaching Style</div>
            <div className="review-value">{renderValue(formData.coachingPreferences.coachingStyle)}</div>
          </div>
          <div className="review-item">
            <div className="review-label">Session Format</div>
            <div className="review-value">{renderValue(formData.coachingPreferences.sessionFormats)}</div>
          </div>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-back" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </button>
        <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit & Complete Onboarding'}
        </button>
      </div>
    </div>
  );
}

export default OnboardingReview;
