import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import OnboardingAuth from './onboarding/OnboardingAuth';
import OnboardingIdentity from './onboarding/OnboardingIdentity';
import OnboardingServices from './onboarding/OnboardingServices';
import OnboardingTrainingSetup from './onboarding/OnboardingTrainingSetup';
import OnboardingGoals from './onboarding/OnboardingGoals';
import OnboardingHealthHistory from './onboarding/OnboardingHealthHistory';
import OnboardingMedications from './onboarding/OnboardingMedications';
import OnboardingInjuryProfile from './onboarding/OnboardingInjuryProfile';
import OnboardingActivityHistory from './onboarding/OnboardingActivityHistory';
import OnboardingCoachingPreferences from './onboarding/OnboardingCoachingPreferences';
import OnboardingNutritionSnapshot from './onboarding/OnboardingNutritionSnapshot';
import OnboardingReview from './onboarding/OnboardingReview';
import { 
  onboardingSteps, 
  saveDraft, 
  loadDraft, 
  submitOnboarding,
  deriveClientFlags
} from '../utils/onboardingStorage';
import { getCurrentUser } from '../utils/userStorage';
import './Onboarding.css';

function Onboarding() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize: check auth and load draft
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setCurrentStep(0); // Start at auth
      setIsLoading(false);
      return;
    }

    setCurrentUser(user);
    
    // Load draft if exists
    const draft = loadDraft(user.id);
    if (draft) {
      setFormData(draft.data);
      setCurrentStep(draft.lastCompletedStep + 1);
    } else {
      setCurrentStep(1); // Skip auth, go to identity
    }
    
    setIsLoading(false);
  }, []);

  const handleAuthComplete = (user) => {
    setCurrentUser(user);
    setCurrentStep(1);
  };

  const handleStepComplete = (stepData) => {
    const updated = { ...formData, ...stepData };
    setFormData(updated);

    // Autosave draft
    if (currentUser) {
      saveDraft(currentUser.id, currentStep, updated);
    }

    // Move to next step
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      if (!currentUser) {
        setError('User not authenticated');
        return;
      }

      // Derive flags
      const flags = deriveClientFlags(formData);
      const finalData = { ...formData, flags };

      // Submit
      const submission = submitOnboarding(currentUser.id, finalData);
      
      // TODO: Trigger packet pipeline
      // await triggerPacketPipeline(currentUser.id, finalData);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <>
        <TopNav />
        <div className="onboarding-loading">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  const stepName = onboardingSteps[currentStep];
  const progressPercent = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <>
      <TopNav />
      <div className="onboarding-container">
        {/* Progress Bar */}
        <div className="onboarding-progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="progress-text">
            Step {currentStep + 1} of {onboardingSteps.length}
          </div>
        </div>

        {/* Step Indicator */}
        <div className="onboarding-step-indicator">
          {onboardingSteps.map((step, idx) => (
            <div
              key={step}
              className={`step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
              title={step}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="onboarding-content">
          {error && <div className="error-banner">{error}</div>}

          {currentStep === 0 && (
            <OnboardingAuth onComplete={handleAuthComplete} />
          )}

          {currentStep === 1 && (
            <OnboardingIdentity
              data={formData.identity || {}}
              onComplete={(data) => handleStepComplete({ identity: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 2 && (
            <OnboardingServices
              data={formData.services || {}}
              onComplete={(data) => handleStepComplete({ services: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 3 && (
            <OnboardingTrainingSetup
              data={formData.trainingSetup || {}}
              onComplete={(data) => handleStepComplete({ trainingSetup: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 4 && (
            <OnboardingGoals
              data={formData.goals || {}}
              onComplete={(data) => handleStepComplete({ goals: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 5 && (
            <OnboardingHealthHistory
              data={formData.healthHistory || {}}
              onComplete={(data) => handleStepComplete({ healthHistory: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 6 && (
            <OnboardingMedications
              data={formData.medications || {}}
              healthHistory={formData.healthHistory || {}}
              onComplete={(data) => handleStepComplete({ medications: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 7 && (
            <OnboardingInjuryProfile
              data={formData.injuryProfile || {}}
              onComplete={(data) => handleStepComplete({ injuryProfile: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 8 && (
            <OnboardingActivityHistory
              data={formData.activityHistory || {}}
              onComplete={(data) => handleStepComplete({ activityHistory: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 9 && (
            <OnboardingCoachingPreferences
              data={formData.coachingPreferences || {}}
              onComplete={(data) => handleStepComplete({ coachingPreferences: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 10 && (
            <OnboardingNutritionSnapshot
              data={formData.nutritionSnapshot || {}}
              onComplete={(data) => handleStepComplete({ nutritionSnapshot: data })}
              onBack={handleStepBack}
            />
          )}

          {currentStep === 11 && (
            <OnboardingReview
              formData={formData}
              onSubmit={handleSubmit}
              onBack={handleStepBack}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Onboarding;
