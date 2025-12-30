import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedQuestionnaire.css';
import MealPlanDisplay from './MealPlanDisplay';
import InfoTooltip from './InfoTooltip';
import { generateMealPlan } from '../utils/mealPlanEngine';

function AdvancedMealPlanQuestionnaire({ onComplete, onBack }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('advanced');
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const advancedQuestions = [
    {
      id: 'macroStrategy',
      question: 'Preferred macro strategy?',
      explanation: 'Different approaches to distributing carbs, protein, and fats.',
      type: 'radio',
      options: [
        { value: 'balanced', label: 'Balanced (40/30/30)' },
        { value: 'highProtein', label: 'High Protein (30/40/30)' },
        { value: 'lowCarb', label: 'Low Carb (20/40/40)' },
        { value: 'cyclical', label: 'Cyclical (varies by training)' },
        { value: 'flexible', label: 'Flexible (no strict targets)' }
      ]
    },
    {
      id: 'mealTiming',
      question: 'Meal timing preference?',
      explanation: 'When you prefer to eat relative to training.',
      type: 'radio',
      options: [
        { value: 'preWorkout', label: 'Pre-workout focused' },
        { value: 'postWorkout', label: 'Post-workout focused' },
        { value: 'distributed', label: 'Evenly distributed' },
        { value: 'flexible', label: 'Flexible timing' }
      ]
    },
    {
      id: 'supplementation',
      question: 'Supplements you\'re using or interested in?',
      explanation: 'We can account for protein powder, creatine, etc.',
      type: 'checkbox',
      options: [
        { value: 'proteinPowder', label: 'Protein Powder' },
        { value: 'creatine', label: 'Creatine' },
        { value: 'bcaa', label: 'BCAAs' },
        { value: 'multivitamin', label: 'Multivitamin' },
        { value: 'omega3', label: 'Omega-3' },
        { value: 'none', label: 'No supplements' }
      ]
    },
    {
      id: 'foodPreferences',
      question: 'Foods you particularly enjoy?',
      explanation: 'We\'ll incorporate these into your plan.',
      type: 'text',
      placeholder: 'e.g., Chicken, rice, broccoli, salmon, etc.'
    },
    {
      id: 'foodAversions',
      question: 'Foods you dislike or want to avoid?',
      explanation: 'We\'ll exclude these from your plan.',
      type: 'text',
      placeholder: 'e.g., Fish, mushrooms, etc.'
    },
    {
      id: 'mealPrepCapacity',
      question: 'Meal prep capacity?',
      explanation: 'How much time and effort you want to invest.',
      type: 'radio',
      options: [
        { value: 'minimal', label: 'Minimal (quick, simple meals)' },
        { value: 'moderate', label: 'Moderate (some prep, mostly simple)' },
        { value: 'high', label: 'High (willing to meal prep)' },
        { value: 'veryHigh', label: 'Very High (detailed meal prep)' }
      ]
    },
    {
      id: 'budgetConstraints',
      question: 'Budget constraints?',
      explanation: 'We can optimize for cost-effectiveness.',
      type: 'radio',
      options: [
        { value: 'tight', label: 'Tight (budget-friendly)' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'flexible', label: 'Flexible' },
        { value: 'premium', label: 'Premium (quality over cost)' }
      ]
    },
    {
      id: 'hydrationGoal',
      question: 'Daily water intake goal?',
      explanation: 'Affects hydration recommendations.',
      type: 'radio',
      options: [
        { value: 'minimal', label: 'Minimal (just enough)' },
        { value: 'moderate', label: 'Moderate (8-10 cups)' },
        { value: 'high', label: 'High (1+ gallon)' },
        { value: 'veryHigh', label: 'Very High (1.5+ gallons)' }
      ]
    },
    {
      id: 'digestiveIssues',
      question: 'Any digestive issues or sensitivities?',
      explanation: 'We\'ll adjust fiber, fat, and food choices accordingly.',
      type: 'text',
      placeholder: 'e.g., IBS, lactose intolerance, etc. (leave blank if none)'
    }
  ];

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId, value) => {
    const current = responses[questionId] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setResponses(prev => ({
      ...prev,
      [questionId]: updated
    }));
  };

  const handleGenerateMealPlan = async () => {
    try {
      setIsLoading(true);
      const plan = await generateMealPlan(responses);
      setMealPlan(plan);
      setStep('display');
      if (onComplete) {
        onComplete(responses);
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'display' && mealPlan) {
    return (
      <MealPlanDisplay
        mealPlan={mealPlan}
        responses={responses}
        onBack={() => setStep('advanced')}
      />
    );
  }

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Advanced Meal Plan Analysis</h2>
        <p>Answer these detailed questions for a comprehensive nutrition plan tailored to your needs.</p>
      </div>

      <div className="questionnaire-form">
        {advancedQuestions.map((question, idx) => (
          <div key={question.id} className="question-block">
            <div className="question-header">
              <label>{question.question}</label>
              {question.explanation && <InfoTooltip text={question.explanation} />}
            </div>

            {question.type === 'radio' && (
              <div className="options-group">
                {question.options.map(option => (
                  <label key={option.value} className="option-label">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'checkbox' && (
              <div className="options-group">
                {question.options.map(option => (
                  <button
                    key={option.value}
                    className={`checkbox-button ${(responses[question.id] || []).includes(option.value) ? 'active' : ''}`}
                    onClick={() => handleCheckboxChange(question.id, option.value)}
                  >
                    <span className="checkbox-button-icon">
                      {(responses[question.id] || []).includes(option.value) ? '✓' : ''}
                    </span>
                    <span className="checkbox-button-text">{option.label}</span>
                  </button>
                ))}
              </div>
            )}

            {question.type === 'text' && (
              <textarea
                className="text-input"
                placeholder={question.placeholder}
                value={responses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                rows="2"
              />
            )}
          </div>
        ))}

        <div className="form-actions">
          <button className="btn-back" onClick={onBack}>Back</button>
          <button 
            className="btn-generate" 
            onClick={handleGenerateMealPlan}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Advanced Meal Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedMealPlanQuestionnaire;
