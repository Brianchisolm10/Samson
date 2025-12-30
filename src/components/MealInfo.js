import React from 'react';
import './InfoPage.css';
import TopNav from './TopNav';

function MealInfo() {
  return (
    <>
      <TopNav />
      <section className="info-page">
      <div className="info-container">
        <div className="info-header">
          <h1>Meal Plan Creator</h1>
          <p>Balanced nutrition plans aligned with your fitness goals</p>
        </div>

        <div className="info-content">
          <div className="info-section">
            <h2>How It Works</h2>
            <p>Our nutrition algorithm creates macro-balanced meal plans tailored to your fitness objectives and dietary preferences. Every meal is optimized for your goals, whether you're building muscle, losing weight, or improving overall health.</p>
          </div>

          <div className="info-section">
            <h2>What You Get</h2>
            <ul className="info-list">
              <li>Personalized meal plans based on your goals</li>
              <li>Macro-balanced nutrition for optimal results</li>
              <li>Respect for dietary preferences and restrictions</li>
              <li>Variety in meals to keep nutrition interesting</li>
              <li>Complete shopping lists for easy grocery planning</li>
              <li>Instant delivery - start eating better today</li>
            </ul>
          </div>

          <div className="info-section">
            <h2>Perfect For</h2>
            <p>Whether you're vegan, keto, or simply looking for balanced nutrition, our Meal Plan Creator adapts to your lifestyle. From athletes optimizing performance to individuals seeking sustainable healthy eating habits, we make nutrition simple and accessible.</p>
          </div>

          <div className="info-cta">
            <a href="/" className="btn-back">← Back to Home</a>
            <a href="/" className="btn-primary">Create Your Meal Plan</a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default MealInfo;
