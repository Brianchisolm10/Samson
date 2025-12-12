import React from 'react';
import './HubPage.css';

function HubPage() {
  return (
    <div className="hub-page">
      <div className="hub-page-container">
        <h1 className="hub-page-title">Create Your Personalized Program</h1>
        <p className="hub-page-subtitle">Get started in seconds. Sign up to save your results and access your client portal.</p>
        
        <div className="tools-grid-hub">
          <div className="tool-card-page">
            <div className="tool-header-page">
              <span className="tool-icon-page">🏋️</span>
              <h3>Workout Generator</h3>
            </div>
            <ul className="tool-features-page">
              <li>✓ Science-backed programming</li>
              <li>✓ Personalized to your level</li>
              <li>✓ Progressive overload built-in</li>
              <li>✓ Instant delivery</li>
            </ul>
            <a href="/workout-generator" className="btn-primary-page">Generate Workout</a>
          </div>

          <div className="tool-card-page">
            <div className="tool-header-page">
              <span className="tool-icon-page">🍽️</span>
              <h3>Meal Plan Creator</h3>
            </div>
            <ul className="tool-features-page">
              <li>✓ Macro-balanced nutrition</li>
              <li>✓ Respects dietary preferences</li>
              <li>✓ Aligned with your goals</li>
              <li>✓ Shopping list included</li>
            </ul>
            <a href="/signup?tool=meal" className="btn-primary-page">Create Meal Plan</a>
          </div>
        </div>

        <div className="coming-soon-section">
          <h2>Coming Soon</h2>
          <p>More tools and features are on the way to enhance your wellness journey.</p>
          <div className="coming-soon-grid">
            <div className="coming-soon-card">
              <span className="coming-soon-icon">📊</span>
              <h3>Progress Tracker</h3>
              <p>Monitor your fitness and nutrition progress with detailed analytics.</p>
            </div>
            <div className="coming-soon-card">
              <span className="coming-soon-icon">👥</span>
              <h3>Community Hub</h3>
              <p>Connect with others on their wellness journey and share experiences.</p>
            </div>
            <div className="coming-soon-card">
              <span className="coming-soon-icon">🎓</span>
              <h3>Education Center</h3>
              <p>Learn from science-backed articles and video tutorials.</p>
            </div>
            <div className="coming-soon-card">
              <span className="coming-soon-icon">💬</span>
              <h3>AI Coach</h3>
              <p>Get personalized guidance and support from our AI assistant.</p>
            </div>
          </div>
        </div>

        <div className="signup-section">
          <h2>Save Your Results</h2>
          <p>Sign up to save your personalized programs and access your client portal for more services.</p>
          <a href="/signup" className="btn-signup">Sign Up Now</a>
          <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
}

export default HubPage;
