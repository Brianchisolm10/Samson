import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealPlanQuestionnaire from './MealPlanQuestionnaire';
import AdvancedMealPlanQuestionnaire from './AdvancedMealPlanQuestionnaire';
import QuickMealPlanCustomizer from './QuickMealPlanCustomizer';
import MealPlanDisplay from './MealPlanDisplay';
import TopNav from './TopNav';
import Footer from './Footer';
import { generateMealPlan } from '../utils/mealPlanEngine';
import { getCurrentUser, saveMealPlanToUser } from '../utils/userStorage';
import './MealPlanDemo.css';

function MealPlanDemo() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [step, setStep] = useState(currentUser ? 'customizer' : 'choice'); // choice, customizer, questionnaire, advanced, display
  const [generatedMealPlan, setGeneratedMealPlan] = useState(null);
  const [clientResponses, setClientResponses] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlanMode, setMealPlanMode] = useState(null); // 'detailed' or 'quick'

  const handleChoiceDetailed = () => {
    if (currentUser) {
      // Logged-in users see a choice between quick and detailed
      setStep('choice');
      setMealPlanMode('detailed');
    } else {
      // User not logged in, redirect to signup
      navigate('/signup');
    }
  };

  const handleChoiceQuick = () => {
    setMealPlanMode('quick');
    setStep('questionnaire');
  };

  const handleQuestionnaireComplete = async (responses) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log('🍽️ Generating meal plan with responses:', responses);

      // Generate meal plan
      const mealPlan = await generateMealPlan(responses);
      console.log('✅ Meal plan generated:', mealPlan);

      // Save meal plan to user profile if logged in
      if (currentUser) {
        saveMealPlanToUser(currentUser.id, {
          name: `${responses.dietaryPreference || 'Custom'} Meal Plan`,
          ...mealPlan,
          responses: responses
        });
      }

      setGeneratedMealPlan(mealPlan);
      setClientResponses(responses);
      setStep('display');
    } catch (error) {
      console.error('❌ Error generating meal plan:', error);
      setError('Error generating meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomizerComplete = async (customizedResponses) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log('🍽️ Generating customized meal plan:', customizedResponses);

      // Generate meal plan based on customized responses
      const mealPlan = await generateMealPlan(customizedResponses);
      console.log('✅ Customized meal plan generated:', mealPlan);

      // Save meal plan to user profile
      if (currentUser) {
        saveMealPlanToUser(currentUser.id, {
          name: `${customizedResponses.specificGoal || 'Custom'} Meal Plan - ${new Date().toLocaleDateString()}`,
          ...mealPlan,
          responses: customizedResponses
        });
      }

      setGeneratedMealPlan(mealPlan);
      setClientResponses(customizedResponses);
      setStep('display');
    } catch (error) {
      console.error('❌ Error generating customized meal plan:', error);
      setError('Error generating meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToChoice = () => {
    setStep('choice');
    setGeneratedMealPlan(null);
    setClientResponses(null);
    setError(null);
    setMealPlanMode(null);
  };

  const handleBackToQuestionnaire = () => {
    setStep('questionnaire');
    setGeneratedMealPlan(null);
    setClientResponses(null);
    setError(null);
  };

  return (
    <div className="meal-plan-demo">
      <TopNav />
      <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleBackToQuestionnaire}>Try Again</button>
        </div>
      )}

      {step === 'choice' && !error && (
        <div className="choice-modal-overlay">
          <div className="choice-modal">
            <h1>Generate Your Meal Plan</h1>
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
                    We have your profile. Just tell us what you need this week.
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
                      <span>Perfect for quick plans</span>
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
                    ? 'Answer detailed questions for a comprehensive meal plan'
                    : 'Get a personalized meal plan based on your complete nutritional profile'
                  }
                </p>
                <div className="choice-features-list">
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>BMR & TDEE calculations</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Personalized macros</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Micronutrient tracking</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Save your meal plans</span>
                  </div>
                  <div className="feature-checkbox checked">
                    <input type="checkbox" checked disabled />
                    <span>Track nutrition over time</span>
                  </div>
                </div>
                <button className="btn-choice detailed" onClick={() => {
                  setMealPlanMode('detailed');
                  setStep('advanced');
                }}>
                  {currentUser ? 'Full Analysis' : 'Sign Up & Analyze'}
                </button>
              </div>

              {/* Quick Meal Plan Card - only for non-logged-in users */}
              {!currentUser && (
                <div className="choice-card quick">
                  <div className="choice-icon">⚡</div>
                  <h2>Quick Meal Plan</h2>
                  <p className="choice-description">
                    Get a meal plan right now without creating an account
                  </p>
                  <div className="choice-features-list">
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Fast questionnaire</span>
                    </div>
                    <div className="feature-checkbox checked">
                      <input type="checkbox" checked disabled />
                      <span>Instant meal plan generation</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Save your meal plans</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Track nutrition over time</span>
                    </div>
                    <div className="feature-checkbox unchecked">
                      <input type="checkbox" disabled />
                      <span>Create account later</span>
                    </div>
                  </div>
                  <button className="btn-choice quick" onClick={handleChoiceQuick}>
                    Generate Quick Meal Plan
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

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Generating your personalized meal plan...</p>
          </div>
        </div>
      )}

      {step === 'customizer' && !error && (
        <QuickMealPlanCustomizer 
          onComplete={handleCustomizerComplete}
          onBack={handleBackToChoice}
        />
      )}

      {step === 'advanced' && !error && (
        <AdvancedMealPlanQuestionnaire 
          onComplete={handleCustomizerComplete}
          onBack={handleBackToChoice}
        />
      )}

      {step === 'questionnaire' && !error && (
        <MealPlanQuestionnaire 
          onComplete={handleQuestionnaireComplete}
          mode={mealPlanMode}
          onBack={handleBackToChoice}
        />
      )}

      {step === 'display' && generatedMealPlan && !error && (
        <MealPlanDisplay 
          mealPlan={generatedMealPlan} 
          responses={clientResponses}
          mode={mealPlanMode}
          currentUser={currentUser}
        />
      )}
      <Footer />
    </div>
  );
}

export default MealPlanDemo;
