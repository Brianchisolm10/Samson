import React, { useState, useEffect } from 'react';
import './WorkoutQuestionnaire.css';
import InfoTooltip from './InfoTooltip';

function WorkoutQuestionnaire({ onComplete }) {
  const [step, setStep] = useState('initial');
  const [responses, setResponses] = useState({});
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initial quick assessment - determines complexity level
  const initialQuestions = [
    {
      id: 'fitnessLevel',
      question: 'What\'s your current fitness level?',
      explanation: 'Your fitness level helps us choose the right exercises and volume. Beginners need simpler movements and more recovery, while advanced lifters can handle complex programming.',
      type: 'radio',
      options: [
        { value: 'beginner', label: 'Just starting out' },
        { value: 'intermediate', label: 'Training 1-2 years' },
        { value: 'advanced', label: 'Training 3+ years' }
      ]
    },
    {
      id: 'primaryGoal',
      question: 'What\'s your main goal?',
      explanation: 'Your goal determines exercise selection, rep ranges, and rest periods. Building muscle requires different training than building strength or losing fat.',
      type: 'radio',
      options: [
        { value: 'strength', label: 'Build Strength' },
        { value: 'hypertrophy', label: 'Build Muscle' },
        { value: 'endurance', label: 'Improve Endurance' },
        { value: 'fatLoss', label: 'Lose Fat' },
        { value: 'general', label: 'General Fitness' }
      ]
    },
    {
      id: 'daysPerWeek',
      question: 'How many days per week can you train?',
      explanation: 'Training frequency affects how we structure your program. More days allows for specialized splits, while fewer days means full-body sessions.',
      type: 'radio',
      options: [
        { value: 3, label: '3 days' },
        { value: 4, label: '4 days' },
        { value: 5, label: '5 days' },
        { value: 6, label: '6 days' }
      ]
    }
  ];

  // Intermediate questions - based on fitness level
  const intermediateQuestions = {
    beginner: [
      {
        id: 'equipment',
        question: 'What equipment do you have access to?',
        explanation: 'Equipment availability determines which exercises we can include. You can select multiple options if you have access to a gym or home setup.',
        type: 'checkbox',
        options: [
          { value: 'barbell', label: 'Barbell' },
          { value: 'dumbbell', label: 'Dumbbells' },
          { value: 'leverage machine', label: 'Machines' },
          { value: 'cable', label: 'Cable Machine' },
          { value: 'kettlebell', label: 'Kettlebell' },
          { value: 'band', label: 'Resistance Band' },
          { value: 'body weight', label: 'Bodyweight' }
        ]
      },
      {
        id: 'sessionDuration',
        question: 'How long can each session be?',
        explanation: 'Session length affects how many exercises we include. Shorter sessions focus on key movements, while longer sessions allow more volume.',
        type: 'radio',
        options: [
          { value: 30, label: '20-30 minutes' },
          { value: 45, label: '30-45 minutes' },
          { value: 60, label: '45-60 minutes' }
        ]
      }
    ],
    intermediate: [
      {
        id: 'equipment',
        question: 'What equipment do you have access to?',
        explanation: 'Equipment availability determines which exercises we can include. You can select multiple options if you have access to a gym or home setup.',
        type: 'checkbox',
        options: [
          { value: 'barbell', label: 'Barbell' },
          { value: 'dumbbell', label: 'Dumbbells' },
          { value: 'leverage machine', label: 'Machines' },
          { value: 'cable', label: 'Cable Machine' },
          { value: 'kettlebell', label: 'Kettlebell' },
          { value: 'band', label: 'Resistance Band' },
          { value: 'body weight', label: 'Bodyweight' }
        ]
      },
      {
        id: 'sessionDuration',
        question: 'How long can each session be?',
        explanation: 'Session length affects how many exercises we include. Shorter sessions focus on key movements, while longer sessions allow more volume.',
        type: 'radio',
        options: [
          { value: 30, label: '20-30 minutes' },
          { value: 45, label: '30-45 minutes' },
          { value: 60, label: '45-60 minutes' },
          { value: 90, label: '60-90 minutes' }
        ]
      },
      {
        id: 'trainingStyle',
        question: 'Preferred training style?',
        explanation: 'Full Body hits all muscles each session. Upper/Lower splits separate upper and lower body. Push/Pull/Legs groups movements by function.',
        type: 'radio',
        options: [
          { value: 'fullBody', label: 'Full Body (3-4x/week)' },
          { value: 'upperLower', label: 'Upper/Lower Split' },
          { value: 'ppl', label: 'Push/Pull/Legs' }
        ]
      }
    ],
    advanced: [
      {
        id: 'equipment',
        question: 'What equipment do you have access to?',
        explanation: 'Equipment availability determines which exercises we can include. You can select multiple options if you have access to a gym or home setup.',
        type: 'checkbox',
        options: [
          { value: 'barbell', label: 'Barbell' },
          { value: 'dumbbell', label: 'Dumbbells' },
          { value: 'leverage machine', label: 'Machines' },
          { value: 'cable', label: 'Cable Machine' },
          { value: 'kettlebell', label: 'Kettlebell' },
          { value: 'band', label: 'Resistance Band' },
          { value: 'body weight', label: 'Bodyweight' }
        ]
      },
      {
        id: 'sessionDuration',
        question: 'How long can each session be?',
        explanation: 'Session length affects how many exercises we include. Shorter sessions focus on key movements, while longer sessions allow more volume.',
        type: 'radio',
        options: [
          { value: 45, label: '45-60 minutes' },
          { value: 60, label: '60-75 minutes' },
          { value: 90, label: '75-90 minutes' },
          { value: 120, label: '90+ minutes' }
        ]
      },
      {
        id: 'trainingStyle',
        question: 'Preferred training split?',
        explanation: 'Upper/Lower allows high frequency. Push/Pull/Legs is optimal for hypertrophy. Body Part splits allow deep focus on individual muscles.',
        type: 'radio',
        options: [
          { value: 'upperLower', label: 'Upper/Lower Split' },
          { value: 'ppl', label: 'Push/Pull/Legs' },
          { value: 'bodyPart', label: 'Body Part Split' },
          { value: 'custom', label: 'Custom Periodization' }
        ]
      },
      {
        id: 'experience',
        question: 'Any specific experience or focus?',
        explanation: 'Your training background helps us tailor programming. Powerlifters need strength focus, bodybuilders need hypertrophy emphasis, etc.',
        type: 'checkbox',
        options: [
          { value: 'powerlifting', label: 'Powerlifting' },
          { value: 'bodybuilding', label: 'Bodybuilding' },
          { value: 'athletic', label: 'Athletic Performance' },
          { value: 'functional', label: 'Functional Fitness' }
        ]
      }
    ]
  };

  // Advanced refinement questions - infinite iterations
  const refinementQuestions = {
    beginner: [
      {
        id: 'injuries',
        question: 'Any injuries or limitations we should know about?',
        explanation: 'Telling us about injuries helps us modify exercises to keep you safe. We\'ll suggest alternatives that work around your limitations.',
        type: 'checkbox',
        options: [
          { value: 'none', label: 'No injuries or limitations' },
          { value: 'lowerBack', label: 'Lower back pain' },
          { value: 'shoulders', label: 'Shoulder issues' },
          { value: 'knees', label: 'Knee pain' },
          { value: 'wrists', label: 'Wrist pain' },
          { value: 'other', label: 'Other (will ask for details)' }
        ]
      }
    ],
    intermediate: [
      {
        id: 'injuries',
        question: 'Any injuries or limitations?',
        explanation: 'Telling us about injuries helps us modify exercises to keep you safe. We\'ll suggest alternatives that work around your limitations.',
        type: 'checkbox',
        options: [
          { value: 'none', label: 'No injuries or limitations' },
          { value: 'lowerBack', label: 'Lower back pain' },
          { value: 'shoulders', label: 'Shoulder issues' },
          { value: 'knees', label: 'Knee pain' },
          { value: 'wrists', label: 'Wrist pain' },
          { value: 'elbows', label: 'Elbow pain' },
          { value: 'other', label: 'Other (will ask for details)' }
        ]
      },
      {
        id: 'weakPoints',
        question: 'Weak points to prioritize?',
        explanation: 'We\'ll place these muscle groups earlier in your workouts when you\'re fresh, and include more volume for them.',
        type: 'checkbox',
        options: [
          { value: 'chest', label: 'Chest' },
          { value: 'back', label: 'Back' },
          { value: 'shoulders', label: 'Shoulders' },
          { value: 'arms', label: 'Arms' },
          { value: 'legs', label: 'Legs' },
          { value: 'core', label: 'Core' }
        ]
      }
    ],
    advanced: [
      {
        id: 'injuries',
        question: 'Any injuries or movement restrictions?',
        explanation: 'Telling us about injuries helps us modify exercises to keep you safe. We\'ll suggest alternatives that work around your limitations.',
        type: 'checkbox',
        options: [
          { value: 'none', label: 'No injuries or limitations' },
          { value: 'lowerBack', label: 'Lower back pain' },
          { value: 'shoulders', label: 'Shoulder issues' },
          { value: 'knees', label: 'Knee pain' },
          { value: 'wrists', label: 'Wrist pain' },
          { value: 'elbows', label: 'Elbow pain' },
          { value: 'hips', label: 'Hip pain' },
          { value: 'ankles', label: 'Ankle pain' },
          { value: 'other', label: 'Other (will ask for details)' }
        ]
      },
      {
        id: 'weakPoints',
        question: 'Weak points or lagging muscle groups?',
        explanation: 'We\'ll place these muscle groups earlier in your workouts when you\'re fresh, and include more volume for them.',
        type: 'checkbox',
        options: [
          { value: 'chest', label: 'Chest' },
          { value: 'back', label: 'Back' },
          { value: 'shoulders', label: 'Shoulders' },
          { value: 'biceps', label: 'Biceps' },
          { value: 'triceps', label: 'Triceps' },
          { value: 'forearms', label: 'Forearms' },
          { value: 'quads', label: 'Quads' },
          { value: 'hamstrings', label: 'Hamstrings' },
          { value: 'glutes', label: 'Glutes' },
          { value: 'calves', label: 'Calves' },
          { value: 'core', label: 'Core' }
        ]
      },
      {
        id: 'progressionStrategy',
        question: 'Preferred progression method?',
        explanation: 'Linear adds weight each week. Double Progression increases reps first. Periodization cycles intensity. RPE trains by feel.',
        type: 'radio',
        options: [
          { value: 'linearProgression', label: 'Linear Progression' },
          { value: 'doubleProgression', label: 'Double Progression' },
          { value: 'periodization', label: 'Periodization' },
          { value: 'rpe', label: 'RPE-Based' }
        ]
      }
    ]
  };

  const handleInitialResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: Array.isArray(prev[questionId])
        ? prev[questionId].includes(value)
          ? prev[questionId].filter(v => v !== value)
          : [...prev[questionId], value]
        : [value]
    }));
  };

  const handleTextChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canProceedInitial = () => {
    return responses.fitnessLevel && responses.primaryGoal && responses.daysPerWeek;
  };

  const canProceedIntermediate = () => {
    const level = responses.fitnessLevel;
    const questions = intermediateQuestions[level];
    return questions.every(q => {
      if (q.type === 'checkbox') {
        return Array.isArray(responses[q.id]) && responses[q.id].length > 0;
      }
      return responses[q.id];
    });
  };

  const canProceedRefinement = () => {
    const level = responses.fitnessLevel;
    const questions = refinementQuestions[level];
    return questions.every(q => {
      if (q.type === 'checkbox') {
        return Array.isArray(responses[q.id]) && responses[q.id].length > 0;
      }
      if (q.type === 'text') {
        return responses[q.id] !== undefined && responses[q.id] !== '';
      }
      return true;
    });
  };

  const generateWorkout = async () => {
    setIsLoading(true);
    try {
      const workout = buildWorkoutProgram(responses);
      setGeneratedWorkout(workout);
      setStep('complete');
      if (onComplete) {
        onComplete(workout, responses);
      }
    } catch (error) {
      console.error('Error generating workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildWorkoutProgram = (data) => {
    // Core program structure based on responses
    const program = {
      clientProfile: {
        fitnessLevel: data.fitnessLevel,
        goal: data.primaryGoal,
        daysPerWeek: data.daysPerWeek,
        equipment: data.equipment || [],
        sessionDuration: data.sessionDuration || 45,
        trainingStyle: data.trainingStyle || 'fullBody',
        injuries: data.injuries || 'None',
        weakPoints: data.weakPoints || [],
        experience: data.experience || []
      },
      workoutSplit: generateSplit(data),
      progressionStrategy: data.progressionStrategy || 'linearProgression',
      notes: generateProgramNotes(data)
    };
    return program;
  };

  const generateSplit = (data) => {
    const { fitnessLevel, daysPerWeek, trainingStyle, primaryGoal } = data;
    
    // Default splits based on days and level
    const splits = {
      3: ['Full Body A', 'Full Body B', 'Full Body C'],
      4: fitnessLevel === 'beginner' 
        ? ['Full Body A', 'Full Body B', 'Full Body C', 'Full Body D']
        : ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
      5: ['Push', 'Pull', 'Legs', 'Upper', 'Lower'],
      6: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs']
    };

    return splits[daysPerWeek] || splits[3];
  };

  const generateProgramNotes = (data) => {
    const notes = [];
    
    if (data.fitnessLevel === 'beginner') {
      notes.push('Focus on form and consistency over weight');
      notes.push('Rest 2-3 minutes between compound lifts');
      notes.push('Aim for 8-12 reps per set');
    } else if (data.fitnessLevel === 'intermediate') {
      notes.push('Progressive overload is key - track your lifts');
      notes.push('Vary rep ranges: 6-8 for strength, 8-12 for hypertrophy');
      notes.push('Rest 1.5-2 minutes between sets');
    } else {
      notes.push('Implement periodization for continued progress');
      notes.push('Track RPE and adjust intensity accordingly');
      notes.push('Deload every 4-6 weeks');
    }

    if (data.primaryGoal === 'fatLoss') {
      notes.push('Maintain protein intake - aim for 0.8-1g per lb bodyweight');
      notes.push('Include 2-3 cardio sessions per week');
    }

    if (data.weakPoints && data.weakPoints.length > 0) {
      notes.push(`Priority areas: ${data.weakPoints.join(', ')}`);
    }

    return notes;
  };

  const handleRefinement = () => {
    // Reset for next iteration but keep core profile
    setStep('refinement');
  };

  const handleNewIteration = () => {
    // Keep the generated workout but allow refinement
    setStep('refinement');
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
              {question.options.map(option => (
                <label key={option.value} className="option-label">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={responses[question.id] === option.value}
                    onChange={(e) => handleInitialResponse(question.id, option.value)}
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
              {question.options.map(option => (
                <label key={option.value} className="option-label">
                  <input
                    type="checkbox"
                    checked={Array.isArray(responses[question.id]) && responses[question.id].includes(option.value)}
                    onChange={() => handleCheckboxChange(question.id, option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'text':
        return (
          <div key={question.id} className="question-block">
            <InfoTooltip explanation={question.explanation}>
              <h3>{question.question}</h3>
            </InfoTooltip>
            <input
              type="text"
              placeholder={question.placeholder}
              value={responses[question.id] || ''}
              onChange={(e) => handleTextChange(question.id, e.target.value)}
              className="text-input"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="questionnaire-container">
      {step === 'initial' && (
        <div className="questionnaire-step">
          <div className="step-header">
            <h2>Let's Build Your Perfect Workout</h2>
            <p>Quick assessment - just 3 questions</p>
          </div>
          <div className="questions">
            {initialQuestions.map(q => renderQuestion(q))}
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
            <h2>Customize Your Program</h2>
            <p>Level: {responses.fitnessLevel}</p>
          </div>
          <div className="questions">
            {intermediateQuestions[responses.fitnessLevel].map(q => renderQuestion(q))}
          </div>
          <div className="button-group">
            <button className="btn-back" onClick={() => setStep('initial')}>Back</button>
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
            <p>Help us optimize your program</p>
          </div>
          <div className="questions">
            {refinementQuestions[responses.fitnessLevel].map(q => renderQuestion(q))}
          </div>
          <div className="button-group">
            <button className="btn-back" onClick={() => setStep('intermediate')}>Back</button>
            <button
              className="btn-generate"
              onClick={generateWorkout}
              disabled={!canProceedRefinement() || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate My Workout'}
            </button>
          </div>
        </div>
      )}

      {step === 'complete' && generatedWorkout && (
        <div className="questionnaire-step">
          <div className="step-header">
            <h2>Your Personalized Program</h2>
            <p>Ready to get started</p>
          </div>
          <div className="workout-summary">
            <div className="summary-card">
              <h3>Program Overview</h3>
              <ul>
                <li><strong>Level:</strong> {generatedWorkout.clientProfile.fitnessLevel}</li>
                <li><strong>Goal:</strong> {generatedWorkout.clientProfile.goal}</li>
                <li><strong>Days/Week:</strong> {generatedWorkout.clientProfile.daysPerWeek}</li>
                <li><strong>Session Duration:</strong> {generatedWorkout.clientProfile.sessionDuration} min</li>
                <li><strong>Split:</strong> {generatedWorkout.workoutSplit.join(' / ')}</li>
              </ul>
            </div>
            <div className="summary-card">
              <h3>Program Notes</h3>
              <ul>
                {generatedWorkout.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="button-group">
            <button className="btn-refine" onClick={handleNewIteration}>
              Refine Program
            </button>
            <button className="btn-primary" onClick={() => onComplete && onComplete(generatedWorkout, responses)}>
              Start Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutQuestionnaire;
