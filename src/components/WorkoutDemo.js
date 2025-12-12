import React, { useState } from 'react';
import WorkoutQuestionnaire from './WorkoutQuestionnaire';
import WorkoutDisplay from './WorkoutDisplay';
import Navigation from './Navigation';
import { generateDetailedWorkout } from '../utils/workoutEngine';
import './WorkoutDemo.css';

function WorkoutDemo() {
  const [step, setStep] = useState('questionnaire');
  const [generatedProgram, setGeneratedProgram] = useState(null);
  const [clientResponses, setClientResponses] = useState(null);
  const [error, setError] = useState(null);

  const handleQuestionnaireComplete = async (workout, responses) => {
    try {
      setError(null);
      console.log('Generating workout with responses:', responses);
      // Generate detailed program from responses
      const detailedProgram = await generateDetailedWorkout(responses);
      console.log('Generated program:', detailedProgram);
      setGeneratedProgram(detailedProgram);
      setClientResponses(responses);
      setStep('display');
    } catch (error) {
      console.error('Error generating program:', error);
      setError('Error generating program. Please try again.');
    }
  };

  const handleBackToQuestionnaire = () => {
    setStep('questionnaire');
    setGeneratedProgram(null);
    setClientResponses(null);
    setError(null);
  };

  return (
    <div className="workout-demo">
      <Navigation />
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleBackToQuestionnaire}>Try Again</button>
        </div>
      )}

      {step === 'questionnaire' && !error && (
        <WorkoutQuestionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {step === 'display' && generatedProgram && !error && (
        <>
          <button className="btn-back-to-questionnaire" onClick={handleBackToQuestionnaire}>
            ← Start Over
          </button>
          <WorkoutDisplay program={generatedProgram} responses={clientResponses} />
        </>
      )}
    </div>
  );
}

export default WorkoutDemo;
