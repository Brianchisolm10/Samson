import React from 'react';
import './Tools.css';

function Tools({ onToolClick }) {
  return (
    <section id="tools-section" className="tools">
      <div className="tools-container">
        <h2>Start Your Journey</h2>
        <p>Create your personalized program in seconds</p>
        
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-header">
              <span className="tool-icon">🏋️</span>
              <h3>Workout Generator</h3>
            </div>
            <ul className="tool-features">
              <li>✓ Science-backed programming</li>
              <li>✓ Personalized to your level</li>
              <li>✓ Progressive overload built-in</li>
            </ul>
            <div className="tool-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onToolClick('workout')}
              >
                Generate Workout
              </button>
              <a href="/workout-info" className="btn btn-secondary">Learn More</a>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-header">
              <span className="tool-icon">🍽️</span>
              <h3>Meal Plan Creator</h3>
            </div>
            <ul className="tool-features">
              <li>✓ Macro-balanced nutrition</li>
              <li>✓ Respects dietary preferences</li>
              <li>✓ Shopping list included</li>
            </ul>
            <div className="tool-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onToolClick('meal')}
              >
                Create Meal Plan
              </button>
              <a href="/meal-info" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tools;
