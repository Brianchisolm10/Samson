import React from 'react';
import './InfoPage.css';
import TopNav from './TopNav';

function WorkoutInfo() {
  return (
    <>
      <TopNav />
      <section className="info-page">
      <div className="info-container">
        <div className="info-header">
          <h1>Workout Generator</h1>
          <p>Science-backed strength and conditioning programs tailored to you</p>
        </div>

        <div className="info-content">
          <div className="info-section">
            <h2>How It Works</h2>
            <p>Our intelligent algorithm analyzes your fitness level, goals, and preferences to create a personalized workout program. Each session is designed with progressive overload in mind, ensuring continuous improvement and adaptation to your performance.</p>
          </div>

          <div className="info-section">
            <h2>What You Get</h2>
            <ul className="info-list">
              <li>Personalized workout plans based on your fitness level</li>
              <li>Science-backed programming rooted in exercise physiology</li>
              <li>Progressive overload built into every program</li>
              <li>Exercise alternatives for equipment variations</li>
              <li>Detailed form cues and technique guidance</li>
              <li>Instant delivery - start your first workout today</li>
            </ul>
          </div>

          <div className="info-section">
            <h2>Perfect For</h2>
            <p>Whether you're just starting your fitness journey or looking to optimize your training, our Workout Generator adapts to your needs. From beginners building foundational strength to advanced athletes seeking periodized programming, we have you covered.</p>
          </div>

          <div className="info-cta">
            <a href="/" className="btn-back">← Back to Home</a>
            <a href="/" className="btn-primary">Generate Your Workout</a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default WorkoutInfo;
