import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/userStorage';

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate('/dashboard');
    } else {
      // Redirect to the new onboarding flow
      navigate('/onboarding');
    }
  }, [navigate]);

  return null;
}

export default Signup;
