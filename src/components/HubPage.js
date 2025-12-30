import React, { useState, useEffect } from 'react';
import './HubPage.css';
import TopNav from './TopNav';
import Footer from './Footer';

function HubPage() {
  const [sampleExerciseGif, setSampleExerciseGif] = useState(null);

  useEffect(() => {
    const fetchSampleExercise = async () => {
      try {
        // Try to fetch from db.json directly
        const response = await fetch('/db.json');
        if (response.ok) {
          const exercises = await response.json();
          // Get first exercise with a gifUrl
          const exerciseWithGif = exercises.find(ex => ex.gifUrl);
          if (exerciseWithGif) {
            setSampleExerciseGif(exerciseWithGif.gifUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching sample exercise:', error);
      }
    };

    fetchSampleExercise();
  }, []);

  return (
    <>
      <TopNav />
      <div className="hub-page">
        <section className="hub-hero-small">
          <h2 className="hub-hero-subtitle-small">THE HUB</h2>
          <h1 className="hub-hero-title-small">Your Fitness Command Center</h1>
          <p className="hub-hero-description">Manage your workouts, meal plans, and fitness journey all in one place</p>
        </section>

      <div className="hub-page-container">
        
        <div className="tools-grid-hub">
          <div className="tool-card-page">
            <div className="tool-content">
              <h3>Create Your Own Workout Program</h3>
              <p className="tool-description">Get a complete, science-backed training program tailored to your fitness level, goals, and available equipment. Each program includes detailed exercise prescriptions with sets, reps, and rest periods. Warm-up protocols prepare your body for intensity, while progressive overload strategies ensure continuous strength and muscle gains. Injury modifications keep you safe, and recovery guidance helps you maximize results.</p>
              <ul className="tool-features-page">
                <li>✓ Personalized to your level</li>
                <li>✓ Progressive overload built-in</li>
                <li>✓ Instant delivery</li>
              </ul>
              <p className="example-label">Example Output:</p>
              <div className="example-items-grid">
                <div className="example-item">
                  <strong>Monday: Push</strong>
                  <span>Bench Press • 4x6-8 reps</span>
                  <span>Incline Dumbbell Press • 3x8-10 reps</span>
                  <span>Tricep Dips • 3x6-12 reps</span>
                  <span className="example-duration">60 minutes</span>
                </div>
                <div className="example-item">
                  <strong>Wednesday: Pull</strong>
                  <span>Barbell Rows • 4x6-8 reps</span>
                  <span>Pull-ups • 3x8-12 reps</span>
                  <span>Lat Pulldowns • 3x10-12 reps</span>
                  <span className="example-duration">60 minutes</span>
                </div>
                <div className="example-item">
                  <strong>Friday: Legs</strong>
                  <span>Squats • 4x6-8 reps</span>
                  <span>Leg Press • 3x8-10 reps</span>
                  <span>Hamstring Curls • 3x10-12 reps</span>
                  <span className="example-duration">60 minutes</span>
                </div>
              </div>
              <a href="/workout-generator" className="btn-primary-page">Generate Workout</a>
            </div>
            <div className="tool-visual-example">
              {sampleExerciseGif ? (
                <img 
                  src={sampleExerciseGif} 
                  alt="Workout example" 
                  className="example-workout-gif"
                />
              ) : (
                <div className="example-workout-placeholder">
                  <div className="placeholder-icon">💪</div>
                  <p>Personalized workout with exercise demonstrations</p>
                </div>
              )}
            </div>
          </div>

          <div className="tool-card-page">
            <div className="tool-content">
              <h3>Meal Plan Creator</h3>
              <p className="tool-description">Get personalized nutrition plans designed to support your fitness goals. Each plan includes macro-balanced meals tailored to your dietary preferences, calorie targets, and lifestyle. Complete with detailed recipes, nutritional breakdowns, and organized shopping lists to make meal prep effortless. Whether you're building muscle, losing fat, or maintaining, your plan adapts to your needs.</p>
              <ul className="tool-features-page">
                <li>✓ Macro-balanced nutrition</li>
                <li>✓ Respects dietary preferences</li>
                <li>✓ Shopping list included</li>
              </ul>
              <p className="example-label">Example Output:</p>
              <div className="example-items-grid">
                <div className="example-item">
                  <strong>Breakfast</strong>
                  <span>Oats with Berries & Almonds</span>
                  <span>45g carbs • 15g protein • 8g fat • 310 cal</span>
                </div>
                <div className="example-item">
                  <strong>Lunch</strong>
                  <span>Grilled Chicken Breast & Brown Rice</span>
                  <span>50g carbs • 40g protein • 6g fat • 420 cal</span>
                </div>
                <div className="example-item">
                  <strong>Dinner</strong>
                  <span>Salmon Fillet & Roasted Vegetables</span>
                  <span>30g carbs • 35g protein • 12g fat • 380 cal</span>
                </div>
              </div>
              <a href="/meal-plan-generator" className="btn-primary-page">Create Meal Plan</a>
            </div>
            <div className="tool-visual-example">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop" 
                alt="Meal plan example" 
                className="example-workout-gif"
              />
            </div>
          </div>
        </div>

        <div className="coming-soon-section">
          <h3 className="section-title">COMING SOON</h3>
          <div className="coming-soon-content">
            <div className="coming-soon-text">
              <p className="coming-soon-label">Get Notified</p>
              <h2 className="coming-soon-heading">When We Launch</h2>
              <form className="coming-soon-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="coming-soon-input"
                  required
                />
                <button type="submit" className="coming-soon-button">Notify Me</button>
              </form>
              <p className="coming-soon-disclaimer">*Don't worry we will not spam you :</p>
            </div>
            <div className="coming-soon-features">
              <div className="feature-item">
                <div>
                  <h4>Progress Tracker</h4>
                  <p>Monitor your fitness and nutrition progress with detailed analytics.</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4>Community Hub</h4>
                  <p>Connect with others on their wellness journey and share experiences.</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4>Education Center</h4>
                  <p>Learn from science-backed articles and video tutorials.</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4>AI Coach</h4>
                  <p>Get personalized guidance and support from our AI assistant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="signup-section">
          <h2>Save & Continue Your Results</h2>
          <p>Create an account to save your personalized programs and track your progress over time. Once you've signed up, you can access your saved workouts, meal plans, and progress tracking from anywhere. Pick up where you left off and keep moving toward your goals.</p>
          
          <div className="signup-actions">
            <a href="/signup" className="btn-signup">Sign Up Now</a>
            <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
          </div>

          <div className="continue-features">
            <div className="continue-feature">
              <h4>Access Anytime</h4>
              <p>View your programs on any device</p>
            </div>
            <div className="continue-feature">
              <h4>Track Progress</h4>
              <p>Monitor your fitness journey with detailed analytics</p>
            </div>
            <div className="continue-feature">
              <h4>Personalized Updates</h4>
              <p>Get recommendations based on your progress</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default HubPage;
