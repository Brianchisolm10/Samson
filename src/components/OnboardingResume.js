import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/userStorage';
import { loadDraft } from '../utils/onboardingStorage';

function OnboardingResume() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const userDraft = loadDraft(user.id);
      if (userDraft) {
        setDraft(userDraft);
        setIsVisible(true);
      }
    }
  }, []);

  if (!isVisible || !draft) {
    return null;
  }

  const handleResume = () => {
    navigate('/onboarding');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div style={{
      background: '#f0ede8',
      border: '1px solid #d0ccc4',
      borderRadius: 6,
      padding: 16,
      marginBottom: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#333' }}>
          📋 Resume Your Onboarding
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
          You have an incomplete onboarding in progress. Pick up where you left off.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={handleResume}
          style={{
            background: '#8B6F47',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500
          }}
        >
          Resume
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: 16,
            padding: '4px 8px'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default OnboardingResume;
