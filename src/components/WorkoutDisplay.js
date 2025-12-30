import React, { useState, useEffect } from 'react';
import './WorkoutDisplay.css';
import InfoTooltip from './InfoTooltip';
import { formatEquipment, formatExerciseName } from '../utils/formatters';

// Capitalize first letter of string
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function WorkoutDisplay({ program, responses }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPrintView, setShowPrintView] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    warmup: false,
    cooldown: false,
    guidelines: false,
    progression: false
  });

  useEffect(() => {
    if (!program || !program.workouts) {
      setLoading(false);
      return;
    }
    
    // Exercises already have gifUrl from the engine, just set them
    const details = {};
    for (const workout of program.workouts) {
      for (const exercise of workout.exercises) {
        details[exercise.name] = {
          gifUrl: exercise.gifUrl || `https://via.placeholder.com/300x300?text=${encodeURIComponent(exercise.name)}`
        };
      }
    }
    setExerciseDetails(details);
    setLoading(false);
  }, [program]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading || !program || !program.workouts) {
    return <div className="workout-display loading">Loading workout details...</div>;
  }

  const currentWorkout = program.workouts[selectedDay];

  // If showing print view, render a print-friendly layout
  if (showPrintView) {
    return (
      <div className="print-view">
        <button className="close-print-btn" onClick={() => setShowPrintView(false)}>✕ Close Print View</button>
        
        <div className="print-header">
          <h1>Your {program?.metadata?.goal || 'Personalized'} Program</h1>
          <p>{program?.metadata?.clientLevel || 'N/A'} • {program?.metadata?.daysPerWeek || 'N/A'}x/week</p>
        </div>

        <div className="print-week-layout">
          {program.workouts.map((workout, index) => (
            <div key={index} className="print-day-card">
              <div className="print-day-header">
                <h2>Day {workout.day}: {capitalize(workout.name)}</h2>
                <p className="print-duration">{workout.duration} min</p>
              </div>
              
              <div className="print-exercises">
                {workout.exercises.map((exercise, exIndex) => (
                  <div key={exIndex} className="print-exercise-item">
                    <div className="print-exercise-name">
                      {exIndex + 1}. {capitalize(exercise.name)}
                    </div>
                    {exercise.gifUrl && (
                      <img 
                        src={exercise.gifUrl} 
                        alt={exercise.name}
                        className="print-exercise-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="print-exercise-details">
                      <span className="print-detail">{exercise.sets}x{exercise.reps}</span>
                      <span className="print-detail">Rest: {exercise.rest}</span>
                      <span className="print-detail">{formatEquipment(exercise.equipment)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="print-guidelines">
          <h3>Guidelines</h3>
          <ul>
            {program?.guidelines?.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>

        <button className="print-button" onClick={() => window.print()}>🖨️ Print This Page</button>
      </div>
    );
  }

  return (
    <div className="workout-display">
      <div className="workout-content">
        {/* Action Bar - Horizontal at Top */}
        <div className="action-bar-horizontal">
        <button className="action-bar-btn" onClick={() => setShowPrintView(true)}>
          📄 Print
        </button>
        <button className="action-bar-btn" onClick={() => downloadProgram(program)}>
          ⬇️ Download
        </button>
        <button className="action-bar-btn" onClick={() => alert('Save feature coming soon!')}>
          💾 Save
        </button>
        <button className="action-bar-btn" onClick={() => window.location.href = '/hub'}>
          ← Back to Tools
        </button>
      </div>

      <div className="workout-header">
        <h1>Your {program?.metadata?.goal || 'Personalized'} Program</h1>
        <p className="program-meta">
          {program?.metadata?.clientLevel || 'N/A'} • {program?.metadata?.daysPerWeek || 'N/A'}x/week • {program?.metadata?.estimatedDuration || 'N/A'}
        </p>
      </div>

      {/* Your Choices - Visual Summary */}
      {responses && (
        <div className="choices-display">
          <div className="choice-badge">
            <span className="choice-label">Level</span>
            <span className="choice-value">{responses.fitnessLevel}</span>
          </div>
          <div className="choice-badge">
            <span className="choice-label">Goal</span>
            <span className="choice-value">{responses.primaryGoal}</span>
          </div>
          <div className="choice-badge">
            <span className="choice-label">Frequency</span>
            <span className="choice-value">{responses.daysPerWeek}x/week</span>
          </div>
          <div className="choice-badge">
            <span className="choice-label">Duration</span>
            <span className="choice-value">{responses.sessionDuration} min</span>
          </div>
          {responses.equipment && responses.equipment.length > 0 && (
            <div className="choice-badge">
              <span className="choice-label">Equipment</span>
              <span className="choice-value">{responses.equipment.map(eq => formatEquipment(eq)).join(', ')}</span>
            </div>
          )}
          {responses.trainingStyle && (
            <div className="choice-badge">
              <span className="choice-label">Style</span>
              <span className="choice-value">{responses.trainingStyle}</span>
            </div>
          )}
        </div>
      )}

      {/* Program Guidelines & Progression - Top Summary */}
      <div className="program-summary">
        <div className="summary-card">
          <h4>Guidelines</h4>
          <ul>
            {program?.guidelines?.slice(0, 3).map((guideline, index) => (
              <li key={index}>{guideline}</li>
            )) || <li>No guidelines available</li>}
          </ul>
        </div>
        <div className="summary-card">
          <h4>Progression</h4>
          <p className="progression-summary">
            <strong>{program?.progressionPlan?.name || 'N/A'}</strong><br/>
            {program?.progressionPlan?.description || 'N/A'}
          </p>
        </div>
      </div>

      <div className="workout-container">
        {/* Day Navigation */}
        <div className="day-navigation">
          <h3>Training Days</h3>
          <div className="day-buttons">
            {program.workouts.map((workout, index) => (
              <button
                key={index}
                className={`day-btn ${selectedDay === index ? 'active' : ''}`}
                onClick={() => setSelectedDay(index)}
              >
                <span className="day-number">Day {workout.day}</span>
                <span className="day-name">{capitalize(workout.name)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Workout */}
        <div className="current-workout">
          <div className="workout-info">
            <h2>{capitalize(currentWorkout.name)}</h2>
            <p className="workout-duration">⏱️ {currentWorkout.duration} minutes</p>
            <p className="workout-note">{currentWorkout.notes}</p>
          </div>

          {/* Warm-up Section - Per Day */}
          {program.warmup && (
            <div className="warmup-section">
              <button
                className="section-toggle"
                onClick={() => toggleSection('warmup')}
              >
                <div className="section-header">
                  <h3>🔥 Warm-up</h3>
                  <span className="section-duration">{program.warmup.duration}</span>
                </div>
                <span className="toggle-icon">{expandedSections.warmup ? '▼' : '▶'}</span>
              </button>
              {expandedSections.warmup && (
                <div className="section-content">
                  <p className="section-description">{program.warmup.description}</p>
                  <div className="warmup-exercises">
                    {program.warmup.exercises.map((exercise, index) => (
                      <div key={index} className="warmup-item">
                        <div className="warmup-header">
                          <h4>{capitalize(exercise.name)}</h4>
                          <span className="warmup-duration">{exercise.duration}</span>
                        </div>
                        <p className="warmup-description">{exercise.description}</p>
                        <p className="warmup-intensity">💪 {exercise.intensity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Exercises */}
          <div className="exercises-grid">
            {currentWorkout.exercises && currentWorkout.exercises.length > 0 ? (
              currentWorkout.exercises.map((exercise, index) => {
              const details = exerciseDetails[exercise.name];
              return (
                <div key={index} className="exercise-card">
                  <div className="exercise-header">
                    <div className="exercise-info">
                      <span className="exercise-number">{exercise.order}</span>
                      <div>
                        <h3>{formatExerciseName(exercise.name)}</h3>
                        <p className="exercise-meta">
                          {formatExerciseName(exercise.bodyPart)} • {formatExerciseName(exercise.target)}
                        </p>
                      </div>
                    </div>
                    <div className="exercise-equipment">
                      {formatEquipment(exercise.equipment)}
                    </div>
                  </div>

                  {/* Exercise GIF/Image */}
                  {(exercise.gifUrl || details?.gifUrl) && (
                    <div className="exercise-visual">
                      <img
                        src={exercise.gifUrl || details?.gifUrl}
                        alt={exercise.name}
                        className="exercise-gif"
                        onError={(e) => {
                          console.warn(`Failed to load image for ${exercise.name}:`, e.target.src);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log(`Loaded image for ${exercise.name}`);
                        }}
                      />
                    </div>
                  )}

                  {/* Muscle Groups */}
                  <div className="muscle-groups">
                    <div className="muscle-item">
                      <span className="muscle-label">Primary:</span>
                      <span className="muscle-value">{formatExerciseName(exercise.bodyPart)}</span>
                    </div>
                    <div className="muscle-item">
                      <span className="muscle-label">Target:</span>
                      <span className="muscle-value">{formatExerciseName(exercise.target)}</span>
                    </div>
                  </div>

                  {/* Exercise Prescription */}
                  <div className="exercise-prescription">
                    <div className="prescription-item">
                      <InfoTooltip explanation="Sets are the number of times you perform the exercise. More sets = more volume and muscle stimulus.">
                        <span className="label">Sets</span>
                      </InfoTooltip>
                      <span className="value">{exercise.sets}</span>
                    </div>
                    <div className="prescription-item">
                      <InfoTooltip explanation="Reps (repetitions) is how many times you perform the movement in each set. Lower reps build strength, higher reps build endurance.">
                        <span className="label">Reps</span>
                      </InfoTooltip>
                      <span className="value">{exercise.reps}</span>
                    </div>
                    <div className="prescription-item">
                      <InfoTooltip explanation="Rest is the time between sets. Longer rest allows more strength recovery, shorter rest builds muscular endurance.">
                        <span className="label">Rest</span>
                      </InfoTooltip>
                      <span className="value">{exercise.rest}</span>
                    </div>
                  </div>

                  {/* Exercise Notes */}
                  <div className="exercise-notes">
                    <p>{exercise.notes}</p>
                  </div>
                </div>
              );
              })
            ) : (
              <div className="no-exercises">
                <p>No exercises loaded for this workout. Please try again.</p>
              </div>
            )}
          </div>

          {/* Cool-down Section - Per Day */}
          {program.cooldown && (
            <div className="cooldown-section">
              <button
                className="section-toggle"
                onClick={() => toggleSection('cooldown')}
              >
                <div className="section-header">
                  <h3>❄️ Cool-down</h3>
                  <span className="section-duration">{program.cooldown.duration}</span>
                </div>
                <span className="toggle-icon">{expandedSections.cooldown ? '▼' : '▶'}</span>
              </button>
              {expandedSections.cooldown && (
                <div className="section-content">
                  <p className="section-description">{program.cooldown.description}</p>
                  <div className="cooldown-exercises">
                    {program.cooldown.exercises.map((exercise, index) => (
                      <div key={index} className="cooldown-item">
                        <div className="cooldown-header">
                          <h4>{capitalize(exercise.name)}</h4>
                          <span className="cooldown-duration">{exercise.duration}</span>
                        </div>
                        <p className="cooldown-description">{exercise.description}</p>
                        <p className="cooldown-intensity">✨ {exercise.intensity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modifications */}
      {program.modifications && program.modifications.length > 0 && (
        <div className="modifications-section">
          <h3>⚠️ Important Modifications</h3>
          {program.modifications.map((mod, index) => (
            <div key={index} className="modification-card">
              <h4>{mod.type}</h4>
              <p><strong>Issue:</strong> {mod.description}</p>
              <p><strong>Recommendation:</strong> {mod.recommendation}</p>
            </div>
          ))}
        </div>
      )}

      </div>
    </div>
  );
}

const downloadProgram = (program) => {
  if (!program || !program.workouts) {
    alert('No program data to download');
    return;
  }
  
  // Simple text export for now
  let content = `PERSONALIZED WORKOUT PROGRAM\n`;
  content += `================================\n\n`;
  content += `Level: ${program?.metadata?.clientLevel || 'N/A'}\n`;
  content += `Goal: ${program?.metadata?.goal || 'N/A'}\n`;
  content += `Frequency: ${program?.metadata?.daysPerWeek || 'N/A'}x/week\n\n`;

  program.workouts.forEach(workout => {
    content += `\n${capitalize(workout.name)} (${workout.duration} min)\n`;
    content += `---\n`;
    workout.exercises.forEach(ex => {
      content += `${ex.order}. ${capitalize(ex.name)}\n`;
      content += `   ${ex.sets}x${ex.reps} | Rest: ${ex.rest}\n`;
    });
  });

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', 'workout-program.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default WorkoutDisplay;
