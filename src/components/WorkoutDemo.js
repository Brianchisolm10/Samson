import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutQuestionnaire from './WorkoutQuestionnaire';
import AdvancedWorkoutQuestionnaire from './AdvancedWorkoutQuestionnaire';
import QuickWorkoutCustomizer from './QuickWorkoutCustomizer';
import TopNav from './TopNav';
import Footer from './Footer';
import { getCurrentUser, saveWorkoutToUser } from '../utils/userStorage';
import { generateDetailedWorkout } from '../utils/workoutEngine';
import './WorkoutDemo.css';

function WorkoutDemo() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [step, setStep] = useState(currentUser ? 'customizer' : 'choice'); // choice, customizer, questionnaire, advanced, or display
  const [error, setError] = useState(null);
  const [workoutMode, setWorkoutMode] = useState(null); // 'detailed' or 'quick'

  const handleChoiceQuick = () => {
    setWorkoutMode('quick');
    setStep('questionnaire');
  };

  const handleQuestionnaireComplete = async (workout, responses) => {
    try {
      setError(null);
      
      // Save workout to user profile if logged in
      if (currentUser) {
        saveWorkoutToUser(currentUser.id, {
          name: `${responses.trainingStyle || 'Custom'} Workout`,
          ...workout,
          responses: responses
        });
      }
      
      console.log('Workout generated and saved successfully');
    } catch (error) {
      console.error('Error generating program:', error);
      setError('Error generating program. Please try again.');
    }
  };

  const handleCustomizerComplete = async (customizedResponses) => {
    try {
      setError(null);
      
      // Generate workout based on customized responses
      const workout = await generateDetailedWorkout(customizedResponses);
      
      // Save workout to user profile
      if (currentUser) {
        saveWorkoutToUser(currentUser.id, {
          name: `${customizedResponses.focusArea || 'Custom'} Workout - ${new Date().toLocaleDateString()}`,
          ...workout,
          responses: customizedResponses
        });
      }
      
      console.log('Customized workout generated and saved successfully');
    } catch (error) {
      console.error('Error generating customized workout:', error);
      setError('Error generating workout. Please try again.');
    }
  };

  const handleBackToChoice = () => {
    setStep('choice');
    setWorkoutMode(null);
    setError(null);
  };

  return (
    <div className="workout-demo">
      <TopNav />
      <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {step === 'choice' && !error && (
        <div className="choice-modal-overlay">
          <div className="choice-modal">
            <h1>Generate Your Workout</h1>
            <p className="choice-subtitle">
              {currentUser ? 'Choose how detailed you want your analysis' : 'Choose your experience'}
            </p>

            <div className="choice-cards">
              {/* For logged-in users: Quick Customizer */}
              {currentUser && (
                <div className="choice-card quick">
                  <div className="choice-icon">⚡</div>
                  <h2>Quick Customizer</h2>
                  <p className="choice-description">
                    We have your profile. Just tell us what you need today.
                  </p>
                  <div className="choice-features-list">
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Fast customization</span>
                    </div>
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Based on your profile</span>
                    </div>
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Instant generation</span>
                    </div>
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Perfect for quick workouts</span>
                    </div>
                  </div>
                  <button className="btn-choice quick" onClick={() => setStep('customizer')}>
                    Quick Customizer
                  </button>
                </div>
              )}

              {/* Detailed Analysis Card */}
              <div className="choice-card detailed">
                <div className="choice-icon">🔬</div>
                <h2>{currentUser ? 'Full Analysis' : 'Detailed Analysis'}</h2>
                <p className="choice-description">
                  {currentUser 
                    ? 'Answer detailed questions for a comprehensive program'
                    : 'Get a personalized workout program based on your complete fitness profile'
                  }
                </p>
                <div className="choice-features-list">
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Comprehensive assessment</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Personalized exercise selection</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Progressive overload plan</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Save your programs</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Track progress over time</span>
                  </div>
                </div>
                <button className="btn-choice detailed" onClick={() => {
                  setWorkoutMode('detailed');
                  setStep('advanced');
                }}>
                  {currentUser ? 'Full Analysis' : 'Sign Up & Analyze'}
                </button>
              </div>

              {/* Quick Workout Card - only for non-logged-in users */}
              {!currentUser && (
                <div className="choice-card quick">
                  <div className="choice-icon">⚡</div>
                  <h2>Quick Workout</h2>
                  <p className="choice-description">
                    Get a workout program right now without creating an account
                  </p>
                  <div className="choice-features-list">
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Fast questionnaire</span>
                    </div>
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Instant program generation</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Save your programs</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Track progress over time</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Create account later</span>
                    </div>
                  </div>
                  <button className="btn-choice quick" onClick={handleChoiceQuick}>
                    Generate Quick Workout
                  </button>
                </div>
              )}
            </div>

            {currentUser && (
              <p className="logged-in-message">
                ✓ You're logged in as <strong>{currentUser.name}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {step === 'customizer' && !error && (
        <QuickWorkoutCustomizer 
          onComplete={handleCustomizerComplete}
          onBack={handleBackToChoice}
        />
      )}

      {step === 'advanced' && !error && (
        <AdvancedWorkoutQuestionnaire 
          onComplete={handleQuestionnaireComplete}
          onBack={handleBackToChoice}
        />
      )}

      {step === 'questionnaire' && !error && (
        <WorkoutQuestionnaire 
          onComplete={handleQuestionnaireComplete}
          mode={workoutMode}
          onBack={handleBackToChoice}
        />
      )}
      <Footer />
    </div>
  );
}

export default WorkoutDemo;
