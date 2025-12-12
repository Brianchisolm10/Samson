import React, { useState } from 'react';
import MealPlanQuestionnaire from './MealPlanQuestionnaire';
import MealPlanDisplay from './MealPlanDisplay';
import Navigation from './Navigation';
import { generateMealPlan } from '../utils/mealPlanEngine';
import './MealPlanDemo.css';

function MealPlanDemo() {
  const [step, setStep] = useState('questionnaire');
  const [generatedMealPlan, setGeneratedMealPlan] = useState(null);
  const [clientResponses, setClientResponses] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionnaireComplete = async (responses) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log('🍽️ Generating meal plan with responses:', responses);

      // Generate meal plan
      const mealPlan = await generateMealPlan(responses);
      console.log('✅ Meal plan generated:', mealPlan);

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

  const handleBackToQuestionnaire = () => {
    setStep('questionnaire');
    setGeneratedMealPlan(null);
    setClientResponses(null);
    setError(null);
  };

  return (
    <div className="meal-plan-demo">
      <Navigation />

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleBackToQuestionnaire}>Try Again</button>
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

      {step === 'questionnaire' && !error && (
        <MealPlanQuestionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {step === 'display' && generatedMealPlan && !error && (
        <>
          <button className="btn-back-to-questionnaire" onClick={handleBackToQuestionnaire}>
            ← Start Over
          </button>
          <MealPlanDisplay mealPlan={generatedMealPlan} responses={clientResponses} />
        </>
      )}
    </div>
  );
}

export default MealPlanDemo;
