import React, { useState, useEffect } from 'react';
import './WorkoutDisplay.css';
import InfoTooltip from './InfoTooltip';

function WorkoutDisplay({ program, responses }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    warmup: false,
    cooldown: false,
    guidelines: false,
    progression: false
  });

  useEffect(() => {
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

  if (loading) {
    return <div className="workout-display loading">Loading workout details...</div>;
  }

  const currentWorkout = program.workouts[selectedDay];

  return (
    <div className="workout-display">
      <div className="workout-header">
        <h1>Your {program.metadata.goal} Program</h1>
        <p className="program-meta">
          {program.metadata.clientLevel} • {program.metadata.daysPerWeek}x/week • {program.metadata.estimatedDuration}
        </p>
      </div>

      {/* Warm-up Section */}
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
                      <h4>{exercise.name}</h4>
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

      {/* Program Guidelines & Progression - Top Summary */}
      <div className="program-summary">
        <div className="summary-card">
          <h4>Guidelines</h4>
          <ul>
            {program.guidelines.slice(0, 3).map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>
        <div className="summary-card">
          <h4>Progression</h4>
          <p className="progression-summary">
            <strong>{program.progressionPlan.name}</strong><br/>
            {program.progressionPlan.description}
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
                <span className="day-name">{workout.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Workout */}
        <div className="current-workout">
          <div className="workout-info">
            <h2>{currentWorkout.name}</h2>
            <p className="workout-duration">⏱️ {currentWorkout.duration} minutes</p>
            <p className="workout-note">{currentWorkout.notes}</p>
          </div>

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
                        <h3>{exercise.name}</h3>
                        <p className="exercise-meta">
                          {exercise.bodyPart} • {exercise.target}
                        </p>
                      </div>
                    </div>
                    <div className="exercise-equipment">
                      {exercise.equipment}
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
                      <span className="muscle-value">{exercise.bodyPart}</span>
                    </div>
                    <div className="muscle-item">
                      <span className="muscle-label">Target:</span>
                      <span className="muscle-value">{exercise.target}</span>
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

      {/* Cool-down Section */}
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
                      <h4>{exercise.name}</h4>
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

      {/* Export/Save Options */}
      <div className="action-buttons">
        <button className="btn-print" onClick={() => window.print()}>
          📄 Print Program
        </button>
        <button className="btn-download" onClick={() => downloadProgram(program)}>
          ⬇️ Download PDF
        </button>
      </div>
    </div>
  );
}

const downloadProgram = (program) => {
  // Simple text export for now
  let content = `PERSONALIZED WORKOUT PROGRAM\n`;
  content += `================================\n\n`;
  content += `Level: ${program.metadata.clientLevel}\n`;
  content += `Goal: ${program.metadata.goal}\n`;
  content += `Frequency: ${program.metadata.daysPerWeek}x/week\n\n`;

  program.workouts.forEach(workout => {
    content += `\n${workout.name} (${workout.duration} min)\n`;
    content += `---\n`;
    workout.exercises.forEach(ex => {
      content += `${ex.order}. ${ex.name}\n`;
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
