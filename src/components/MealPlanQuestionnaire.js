import { useState } from 'react';
import './MealPlanQuestionnaire.css';
import MealPlanDisplay from './MealPlanDisplay';
import InfoTooltip from './InfoTooltip';

function MealPlanQuestionnaire({ onComplete }) {
  const [step, setStep] = useState('initial');
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

  const initialQuestions = [
    {
      id: 'goal',
      question: 'What\'s your primary nutrition goal?',
      explanation: 'Your goal determines calorie targets and macro ratios. Muscle gain requires a surplus, fat loss requires a deficit.',
      type: 'radio',
      options: [
        { value: 'muscleGain', label: 'Build Muscle' },
        { value: 'fatLoss', label: 'Lose Fat' },
        { value: 'maintenance', label: 'Maintain Weight' },
        { value: 'athletic', label: 'Athletic Performance' },
      ],
    },
    {
      id: 'dietaryPreference',
      question: 'What\'s your dietary preference?',
      explanation: 'This helps us select appropriate recipes and ingredients for your meal plan.',
      type: 'radio',
      options: [
        { value: 'omnivore', label: 'Omnivore (Everything)' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'keto', label: 'Keto' },
        { value: 'paleo', label: 'Paleo' },
      ],
    },
    {
      id: 'mealsPerDay',
      question: 'How many meals per day?',
      explanation: 'More meals help with portion control and energy levels. Fewer meals are simpler to manage.',
      type: 'radio',
      options: [
        { value: 3, label: '3 Meals' },
        { value: 4, label: '4 Meals' },
        { value: 5, label: '5 Meals' },
        { value: 6, label: '6 Meals' },
      ],
    },
  ];

  const intermediateQuestions = [
    {
      id: 'gender',
      question: 'What\'s your gender?',
      explanation: 'Used for accurate calorie calculations.',
      type: 'radio',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
    {
      id: 'bodyweight',
      question: 'What\'s your body weight (lbs)?',
      explanation: 'Used to calculate your daily calorie and macro targets.',
      type: 'number',
      placeholder: '150',
    },
    {
      id: 'height',
      question: 'What\'s your height (inches)?',
      explanation: 'Used for accurate calorie calculations.',
      type: 'number',
      placeholder: '70',
    },
    {
      id: 'age',
      question: 'What\'s your age?',
      explanation: 'Used for accurate calorie calculations.',
      type: 'number',
      placeholder: '30',
    },
    {
      id: 'activityLevel',
      question: 'What\'s your activity level?',
      explanation: 'Determines your daily calorie burn. More activity = higher calorie needs.',
      type: 'radio',
      options: [
        { value: 'sedentary', label: 'Sedentary (Little exercise)' },
        { value: 'light', label: 'Light (1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (3-5 days/week)' },
        { value: 'active', label: 'Active (6-7 days/week)' },
        { value: 'veryActive', label: 'Very Active (Intense training)' },
      ],
    },
    {
      id: 'cuisines',
      question: 'What cuisines do you enjoy?',
      explanation: 'Select your favorite cuisines for meal variety.',
      type: 'checkbox',
      options: [
        { value: 'italian', label: 'Italian' },
        { value: 'asian', label: 'Asian' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'mediterranean', label: 'Mediterranean' },
        { value: 'american', label: 'American' },
        { value: 'indian', label: 'Indian' },
      ],
    },
  ];

  const refinementQuestions = [
    {
      id: 'allergies',
      question: 'Any food allergies or intolerances?',
      explanation: 'We\'ll avoid these ingredients in your meal plan.',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'No allergies' },
        { value: 'peanuts', label: 'Peanuts' },
        { value: 'treeNuts', label: 'Tree Nuts' },
        { value: 'dairy', label: 'Dairy' },
        { value: 'gluten', label: 'Gluten' },
        { value: 'shellfish', label: 'Shellfish' },
        { value: 'soy', label: 'Soy' },
      ],
    },
    {
      id: 'cookingSkill',
      question: 'What\'s your cooking skill level?',
      explanation: 'Determines recipe complexity. Beginners get simpler recipes.',
      type: 'radio',
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
      ],
    },
    {
      id: 'mealPrepTime',
      question: 'How much time can you spend on meal prep?',
      explanation: 'Affects recipe selection and complexity.',
      type: 'radio',
      options: [
        { value: 'minimal', label: 'Minimal (Quick meals)' },
        { value: 'moderate', label: 'Moderate (30-60 min)' },
        { value: 'extensive', label: 'Extensive (1+ hours)' },
      ],
    },
  ];

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: Array.isArray(prev[questionId])
        ? prev[questionId].includes(value)
          ? prev[questionId].filter((v) => v !== value)
          : [...prev[questionId], value]
        : [value],
    }));
  };

  const canProceedInitial = () => {
    return responses.goal && responses.dietaryPreference && responses.mealsPerDay;
  };

  const canProceedIntermediate = () => {
    return (
      responses.gender &&
      responses.bodyweight &&
      responses.height &&
      responses.age &&
      responses.activityLevel &&
      Array.isArray(responses.cuisines) &&
      responses.cuisines.length > 0
    );
  };

  const canProceedRefinement = () => {
    return (
      Array.isArray(responses.allergies) &&
      responses.allergies.length > 0 &&
      responses.cookingSkill &&
      responses.mealPrepTime
    );
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { generateMealPlan } = await import('../utils/mealPlanEngine');
      const plan = await generateMealPlan(responses);
      setMealPlan(plan);
      if (onComplete) {
        onComplete(responses);
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'radio':
        return (
          <div key={question.id} className="question-block">
            <InfoTooltip explanation={question.explanation}>
              <h3>{question.question}</h3>
            </InfoTooltip>
            <div className="options">
              {question.options.map((option) => (
                <label key={option.value} className="option-label">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={responses[question.id] === option.value}
                    onChange={(e) => handleResponse(question.id, option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'checkbox':
        return (
          <div key={question.id} className="question-block">
            <InfoTooltip explanation={question.explanation}>
              <h3>{question.question}</h3>
            </InfoTooltip>
            <div className="options">
              {question.options.map((option) => (
                <label key={option.value} className="option-label">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(responses[question.id]) &&
                      responses[question.id].includes(option.value)
                    }
                    onChange={() => handleCheckboxChange(question.id, option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'number':
        return (
          <div key={question.id} className="question-block">
            <InfoTooltip explanation={question.explanation}>
              <h3>{question.question}</h3>
            </InfoTooltip>
            <input
              type="number"
              placeholder={question.placeholder}
              value={responses[question.id] || ''}
              onChange={(e) => handleResponse(question.id, e.target.value)}
              className="number-input"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`questionnaire-wrapper ${mealPlan ? 'has-results' : ''}`}>
      {!mealPlan && (
        <section className="meal-plan-hero">
          <div className="meal-plan-hero-content">
            <h1 className="meal-plan-hero-title">Build Your Meal Plan</h1>
            <p className="meal-plan-hero-subtitle">Personalized nutrition tailored to your goals</p>
            
            <div className="meal-plan-features-list">
              <div className="meal-plan-feature-item">
                <span className="meal-plan-feature-icon">✓</span>
                <span>Personalized Macros & Calories</span>
              </div>
              <div className="meal-plan-feature-item">
                <span className="meal-plan-feature-icon">✓</span>
                <span>Dietary Preference Support</span>
              </div>
              <div className="meal-plan-feature-item">
                <span className="meal-plan-feature-icon">✓</span>
                <span>Food Preference Customization</span>
              </div>
              <div className="meal-plan-feature-item">
                <span className="meal-plan-feature-icon">✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>

          <button className="meal-plan-back-btn" onClick={() => window.history.back()}>← Back</button>

          <div className="meal-plan-hero-visual">
            <div className="meal-plan-quiz-container">
              <div className="questionnaire-container meal-plan-questionnaire">
                {step === 'initial' && (
                  <div className="questionnaire-step">
                    <div className="step-header">
                      <h2>Let's Build Your Meal Plan</h2>
                      <p>Quick assessment - just 3 questions</p>
                    </div>
                    <div className="questions">
                      {initialQuestions.map((q) => renderQuestion(q))}
                    </div>
                    <button
                      className="btn-next"
                      onClick={() => setStep('intermediate')}
                      disabled={!canProceedInitial()}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {step === 'intermediate' && (
                  <div className="questionnaire-step">
                    <div className="step-header">
                      <h2>Customize Your Plan</h2>
                      <p>Goal: {responses.goal}</p>
                    </div>
                    <div className="questions">
                      {intermediateQuestions.map((q) => renderQuestion(q))}
                    </div>
                    <div className="button-group">
                      <button className="btn-back" onClick={() => setStep('initial')}>
                        Back
                      </button>
                      <button
                        className="btn-next"
                        onClick={() => setStep('refinement')}
                        disabled={!canProceedIntermediate()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 'refinement' && (
                  <div className="questionnaire-step">
                    <div className="step-header">
                      <h2>Final Details</h2>
                      <p>Help us optimize your meal plan</p>
                    </div>
                    <div className="questions">
                      {refinementQuestions.map((q) => renderQuestion(q))}
                    </div>
                    <div className="button-group">
                      <button className="btn-back" onClick={() => setStep('intermediate')}>
                        Back
                      </button>
                      <button
                        className="btn-generate"
                        onClick={handleGenerate}
                        disabled={!canProceedRefinement() || isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Generate My Meal Plan'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Panel */}
      {mealPlan && (
        <div className="results-side visible">
          <MealPlanDisplay mealPlan={mealPlan} responses={responses} />
        </div>
      )}
    </div>
  );
}

export default MealPlanQuestionnaire;
