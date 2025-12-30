import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedQuestionnaire.css';
import WorkoutDisplay from './WorkoutDisplay';
import InfoTooltip from './InfoTooltip';
import { generateDetailedWorkout } from '../utils/workoutEngine';

function AdvancedWorkoutQuestionnaire({ onComplete, onBack }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('advanced');
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    warmup: true,
    cooldown: false,
    guidelines: true,
    progression: true
  });

  const advancedQuestions = [
    {
      id: 'trainingPhase',
      question: 'What training phase are you in?',
      explanation: 'Different phases require different rep ranges and intensity.',
      type: 'radio',
      options: [
        { value: 'hypertrophy', label: 'Hypertrophy (8-12 reps)' },
        { value: 'strength', label: 'Strength (3-6 reps)' },
        { value: 'powerEndurance', label: 'Power/Endurance (12-20 reps)' },
        { value: 'deload', label: 'Deload/Recovery' },
        { value: 'peaking', label: 'Peaking' }
      ]
    },
    {
      id: 'volumePreference',
      question: 'Preferred training volume per muscle group per week?',
      explanation: 'Higher volume = more sets per muscle group weekly.',
      type: 'radio',
      options: [
        { value: 'low', label: 'Low (8-12 sets/week)' },
        { value: 'moderate', label: 'Moderate (12-18 sets/week)' },
        { value: 'high', label: 'High (18-25 sets/week)' },
        { value: 'veryHigh', label: 'Very High (25+ sets/week)' }
      ]
    },
    {
      id: 'exerciseVariety',
      question: 'How much exercise variation do you want?',
      explanation: 'More variation = different exercises each week. Less = same exercises for longer.',
      type: 'radio',
      options: [
        { value: 'high', label: 'High (change exercises frequently)' },
        { value: 'moderate', label: 'Moderate (rotate every 3-4 weeks)' },
        { value: 'low', label: 'Low (stick with same exercises)' }
      ]
    },
    {
      id: 'intensityTechniques',
      question: 'Advanced intensity techniques you\'re interested in?',
      explanation: 'Drop sets, supersets, rest-pause, etc. can boost intensity.',
      type: 'checkbox',
      options: [
        { value: 'dropSets', label: 'Drop Sets' },
        { value: 'supersets', label: 'Supersets' },
        { value: 'restPause', label: 'Rest-Pause Sets' },
        { value: 'tempo', label: 'Tempo Training' },
        { value: 'amrap', label: 'AMRAP (As Many Reps As Possible)' },
        { value: 'none', label: 'Keep it simple' }
      ]
    },
    {
      id: 'weakPoints',
      question: 'Any weak points or lagging muscle groups?',
      explanation: 'We can prioritize these with extra volume or frequency.',
      type: 'checkbox',
      options: [
        { value: 'chest', label: 'Chest' },
        { value: 'back', label: 'Back' },
        { value: 'shoulders', label: 'Shoulders' },
        { value: 'arms', label: 'Arms' },
        { value: 'legs', label: 'Legs' },
        { value: 'glutes', label: 'Glutes' },
        { value: 'none', label: 'Balanced' }
      ]
    },
    {
      id: 'recoveryCapacity',
      question: 'Your recovery capacity?',
      explanation: 'Sleep, nutrition, stress, and age all affect recovery.',
      type: 'radio',
      options: [
        { value: 'excellent', label: 'Excellent (8+ hrs sleep, low stress)' },
        { value: 'good', label: 'Good (7-8 hrs sleep, moderate stress)' },
        { value: 'moderate', label: 'Moderate (6-7 hrs sleep, high stress)' },
        { value: 'poor', label: 'Poor (less than 6 hrs, very high stress)' }
      ]
    },
    {
      id: 'progressionStrategy',
      question: 'Preferred progression strategy?',
      explanation: 'How you want to increase difficulty over time.',
      type: 'radio',
      options: [
        { value: 'linearProgression', label: 'Linear (add weight each week)' },
        { value: 'doubleProgression', label: 'Double (reps then weight)' },
        { value: 'periodized', label: 'Periodized (planned cycles)' },
        { value: 'autoRegulated', label: 'Auto-Regulated (RPE/RIR based)' }
      ]
    },
    {
      id: 'injuries',
      question: 'Any current injuries or limitations?',
      explanation: 'We\'ll modify exercises to work around these.',
      type: 'text',
      placeholder: 'e.g., Lower back pain, shoulder impingement, etc. (leave blank if none)'
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

  const handleGenerateWorkout = async () => {
    try {
      setIsLoading(true);
      const program = await generateDetailedWorkout(responses);
      setWorkout(program);
      setStep('display');
      if (onComplete) {
        onComplete(program, responses);
      }
    } catch (error) {
      console.error('Error generating workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (step === 'display' && workout) {
    return (
      <WorkoutDisplay
        workout={workout}
        responses={responses}
        onBack={() => setStep('advanced')}
      />
    );
  }

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Advanced Workout Analysis</h2>
        <p>Answer these detailed questions for a comprehensive program tailored to your experience level.</p>
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
                rows="3"
              />
            )}
          </div>
        ))}

        <div className="form-actions">
          <button className="btn-back" onClick={onBack}>Back</button>
          <button 
            className="btn-generate" 
            onClick={handleGenerateWorkout}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Advanced Workout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedWorkoutQuestionnaire;
