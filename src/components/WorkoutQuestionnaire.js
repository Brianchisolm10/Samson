import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkoutQuestionnaire.css';
import WorkoutDisplay from './WorkoutDisplay';
import InfoTooltip from './InfoTooltip';
import { formatEquipment } from '../utils/formatters';

function WorkoutQuestionnaire({ onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('initial');
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

  const initialQuestions = [
    {
      id: 'fitnessLevel',
      question: 'What\'s your current fitness level?',
      explanation: 'Your fitness level helps us choose the right exercises and volume.',
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
      explanation: 'Your goal determines exercise selection, rep ranges, and rest periods.',
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
      explanation: 'Training frequency affects how we structure your program.',
      type: 'radio',
      options: [
        { value: 3, label: '3 days' },
        { value: 4, label: '4 days' },
        { value: 5, label: '5 days' },
        { value: 6, label: '6 days' }
      ]
    }
  ];

  const intermediateQuestions = [
    {
      id: 'equipment',
      question: 'What equipment do you have access to?',
      explanation: 'Equipment availability determines which exercises we can include.',
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
      explanation: 'Session length affects how many exercises we include.',
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
      explanation: 'Full Body hits all muscles each session. Upper/Lower separates upper and lower body.',
      type: 'radio',
      options: [
        { value: 'fullBody', label: 'Full Body' },
        { value: 'upperLower', label: 'Upper/Lower Split' },
        { value: 'ppl', label: 'Push/Pull/Legs' },
        { value: 'bodyPart', label: 'Body Part Split' }
      ]
    }
  ];

  const refinementQuestions = [
    {
      id: 'injuries',
      question: 'Any injuries or limitations?',
      explanation: 'Telling us about injuries helps us modify exercises to keep you safe.',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'No injuries or limitations' },
        { value: 'lowerBack', label: 'Lower back pain' },
        { value: 'shoulders', label: 'Shoulder issues' },
        { value: 'knees', label: 'Knee pain' },
        { value: 'wrists', label: 'Wrist pain' },
        { value: 'elbows', label: 'Elbow pain' },
        { value: 'hips', label: 'Hip pain' }
      ]
    },
    {
      id: 'weakPoints',
      question: 'Weak points or lagging muscle groups?',
      explanation: 'We\'ll place these muscle groups earlier in your workouts when you\'re fresh.',
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
    }
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
    return responses.fitnessLevel && responses.primaryGoal && responses.daysPerWeek;
  };

  const canProceedIntermediate = () => {
    return (
      Array.isArray(responses.equipment) &&
      responses.equipment.length > 0 &&
      responses.sessionDuration &&
      responses.trainingStyle
    );
  };

  const canProceedRefinement = () => {
    return (
      Array.isArray(responses.injuries) &&
      responses.injuries.length > 0 &&
      Array.isArray(responses.weakPoints) &&
      responses.weakPoints.length > 0
    );
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { generateDetailedWorkout } = await import('../utils/workoutEngine');
      const program = await generateDetailedWorkout(responses);
      setWorkout(program);
      if (onComplete) {
        onComplete(program, responses);
      }
    } catch (error) {
      console.error('Error generating workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToQuiz = () => {
    setWorkout(null);
    setStep('initial');
    setResponses({});
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
      default:
        return null;
    }
  };

  return (
    <div className={`questionnaire-wrapper ${workout ? 'has-results' : ''}`}>
      {!workout && (
        <section className="workout-hero">
          <div className="workout-hero-content">
            <h1 className="workout-hero-title">Build Your Workout</h1>
            <p className="workout-hero-subtitle">Personalized training tailored to your goals</p>
            
            <div className="workout-features-list">
              <div className="workout-feature-item">
                <span className="workout-feature-icon">✓</span>
                <span>Personalized Exercise Selection</span>
              </div>
              <div className="workout-feature-item">
                <span className="workout-feature-icon">✓</span>
                <span>Progressive Overload Plan</span>
              </div>
              <div className="workout-feature-item">
                <span className="workout-feature-icon">✓</span>
                <span>Injury Modifications Included</span>
              </div>
              <div className="workout-feature-item">
                <span className="workout-feature-icon">✓</span>
                <span>Instant Results</span>
              </div>
            </div>

            <button className="workout-back-btn" onClick={() => navigate('/hub')}>← Back to Hub</button>
          </div>

          <div className="workout-hero-visual">
            <div className="workout-quiz-container">
              {step === 'initial' && (
                <div className="questionnaire-step">
                  <div className="step-header">
                    <h2>Build Your Workout</h2>
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
                    <h2>Customize Your Program</h2>
                    <p>Goal: {responses.primaryGoal}</p>
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
                    <p>Help us optimize your program</p>
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
                      {isLoading ? 'Generating...' : 'Generate My Workout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {workout && (
        <div className="results-side visible">
          <div className="results-container">
            {/* Top Action Bar */}
            <div className="results-top-bar">
              <div className="results-actions">
                <button className="results-btn">⬇️ Download</button>
                <button className="results-btn" onClick={handleBackToQuiz}>← Back to Quiz</button>
              </div>
              <div className="results-auth">
                <button className="results-signin-btn">Sign In to Save</button>
              </div>
            </div>

            {/* Client Choices Summary */}
            <div className="results-choices-summary">
              <div className="choices-row">
                <div className="choice-item">
                  <span className="choice-label">Level</span>
                  <span className="choice-value">{responses?.fitnessLevel}</span>
                </div>
                <div className="choice-item">
                  <span className="choice-label">Goal</span>
                  <span className="choice-value">{responses?.primaryGoal}</span>
                </div>
                <div className="choice-item">
                  <span className="choice-label">Frequency</span>
                  <span className="choice-value">{responses?.daysPerWeek}x/week</span>
                </div>
                <div className="choice-item">
                  <span className="choice-label">Duration</span>
                  <span className="choice-value">{responses?.sessionDuration} min</span>
                </div>
                <div className="choice-item">
                  <span className="choice-label">Equipment</span>
                  <span className="choice-value">{responses?.equipment?.map(eq => formatEquipment(eq)).join(', ')}</span>
                </div>
                <div className="choice-item">
                  <span className="choice-label">Style</span>
                  <span className="choice-value">{responses?.trainingStyle}</span>
                </div>
              </div>
            </div>

            {/* Day Dropdown & Content */}
            <div className="results-main">
              <div className="results-day-selector">
                <select className="day-dropdown" onChange={(e) => setSelectedDay(parseInt(e.target.value))} defaultValue={0}>
                  {workout?.workouts?.map((day, idx) => (
                    <option key={idx} value={idx}>
                      Day {day.day}: {day.name.charAt(0).toUpperCase() + day.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="results-day-layout">
                {/* Main Content */}
                <div className="results-day-main">
                  {/* Warm-up Section */}
                  {workout?.warmup && (
                    <div className="results-section">
                      <button className="results-section-toggle" onClick={() => setExpandedSections({...expandedSections, warmup: !expandedSections.warmup})}>
                        <h3>🔥 Warm-up</h3>
                        <span>{expandedSections.warmup ? '▼' : '▶'}</span>
                      </button>
                      {expandedSections.warmup && (
                        <div className="results-section-content">
                          <p className="section-description">{workout.warmup.description}</p>
                          <div className="warmup-items">
                            {workout.warmup.exercises?.map((ex, idx) => (
                              <div key={idx} className="warmup-item">
                                <h4>{ex.name.charAt(0).toUpperCase() + ex.name.slice(1)}</h4>
                                <p>{ex.description}</p>
                                <span className="warmup-duration">{ex.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Exercises Grid */}
                  <div className="results-section">
                    <h3>Exercises</h3>
                    <div className="exercises-grid">
                      {workout?.workouts?.[selectedDay]?.exercises?.map((exercise, idx) => (
                        <div key={idx} className="exercise-card-full">
                          <div className="exercise-header-full">
                            <h4>{exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}</h4>
                            <span className="exercise-number">{idx + 1}</span>
                          </div>
                          {exercise.gifUrl && (
                            <img src={exercise.gifUrl} alt={exercise.name} className="exercise-image" />
                          )}
                          <div className="exercise-details">
                            <div className="detail-row">
                              <span className="detail-label">Sets:</span>
                              <span className="detail-value">{exercise.sets}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Reps:</span>
                              <span className="detail-value">{exercise.reps}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Rest:</span>
                              <span className="detail-value">{exercise.rest}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Equipment:</span>
                              <span className="detail-value">{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Primary:</span>
                              <span className="detail-value">{exercise.bodyPart.charAt(0).toUpperCase() + exercise.bodyPart.slice(1)}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Target:</span>
                              <span className="detail-value">{exercise.target.charAt(0).toUpperCase() + exercise.target.slice(1)}</span>
                            </div>
                            {exercise.notes && (
                              <div className="exercise-notes">
                                <p>{exercise.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cool-down Section */}
                  {workout?.cooldown && (
                    <div className="results-section">
                      <button className="results-section-toggle" onClick={() => setExpandedSections({...expandedSections, cooldown: !expandedSections.cooldown})}>
                        <h3>❄️ Cool-down</h3>
                        <span>{expandedSections.cooldown ? '▼' : '▶'}</span>
                      </button>
                      {expandedSections.cooldown && (
                        <div className="results-section-content">
                          <p className="section-description">{workout.cooldown.description}</p>
                          <div className="cooldown-items">
                            {workout.cooldown.exercises?.map((ex, idx) => (
                              <div key={idx} className="cooldown-item">
                                <h4>{ex.name.charAt(0).toUpperCase() + ex.name.slice(1)}</h4>
                                <p>{ex.description}</p>
                                <span className="cooldown-duration">{ex.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="results-sidebar">
                  {/* Guidelines */}
                  {workout?.guidelines && (
                    <div className="sidebar-section">
                      <button className="sidebar-toggle" onClick={() => setExpandedSections({...expandedSections, guidelines: !expandedSections.guidelines})}>
                        <h4>Guidelines</h4>
                        <span>{expandedSections.guidelines ? '▼' : '▶'}</span>
                      </button>
                      {expandedSections.guidelines && (
                        <ul className="guidelines-list">
                          {workout.guidelines.map((guideline, idx) => (
                            <li key={idx}>{guideline}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Progression */}
                  {workout?.progressionPlan && (
                    <div className="sidebar-section">
                      <button className="sidebar-toggle" onClick={() => setExpandedSections({...expandedSections, progression: !expandedSections.progression})}>
                        <h4>Progression</h4>
                        <span>{expandedSections.progression ? '▼' : '▶'}</span>
                      </button>
                      {expandedSections.progression && (
                        <div className="progression-content">
                          <h5>{workout.progressionPlan.name}</h5>
                          <p>{workout.progressionPlan.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutQuestionnaire;
