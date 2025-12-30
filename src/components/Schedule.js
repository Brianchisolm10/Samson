import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserSavedWorkouts, getUserSavedMealPlans } from '../utils/userStorage';
import './Schedule.css';
import TopNav from './TopNav';
import Footer from './Footer';

function Schedule() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const savedWorkouts = user ? getUserSavedWorkouts(user.id) : [];
  const savedMealPlans = user ? getUserSavedMealPlans(user.id) : [];

  if (!user) {
    navigate('/login');
    return null;
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <TopNav />
      <div className="schedule-container">
        <button className="back-button" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        
        <div className="schedule-header">
          <h1>My Programs</h1>
          <p className="season-label">Your saved workouts and meal plans</p>
        </div>

        <div className="schedule-content">
          {/* Saved Workouts */}
          <section className="schedule-section">
            <h2 className="section-title">Saved Workouts</h2>
            {savedWorkouts.length > 0 ? (
              <div className="programs-list">
                {savedWorkouts.map(workout => (
                  <div key={workout.id} className="program-card">
                    <div className="program-header">
                      <h3>{workout.name || 'Untitled Workout'}</h3>
                      <span className="program-date">{formatDate(workout.savedAt)}</span>
                    </div>
                    <div className="program-details">
                      <p className="program-info">
                        {workout.daysPerWeek ? `${workout.daysPerWeek} days/week` : 'Custom program'}
                      </p>
                    </div>
                    <div className="program-action">
                      <button className="btn-view">View Program</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No saved workouts yet</p>
                <button 
                  className="btn-create"
                  onClick={() => navigate('/workout-generator')}
                >
                  Create Your First Workout
                </button>
              </div>
            )}
          </section>

          {/* Saved Meal Plans */}
          <section className="schedule-section">
            <h2 className="section-title">Saved Meal Plans</h2>
            {savedMealPlans.length > 0 ? (
              <div className="programs-list">
                {savedMealPlans.map(mealPlan => (
                  <div key={mealPlan.id} className="program-card">
                    <div className="program-header">
                      <h3>{mealPlan.name || 'Untitled Meal Plan'}</h3>
                      <span className="program-date">{formatDate(mealPlan.savedAt)}</span>
                    </div>
                    <div className="program-details">
                      <p className="program-info">
                        {mealPlan.dietaryPreference ? `${mealPlan.dietaryPreference} diet` : 'Custom meal plan'}
                      </p>
                    </div>
                    <div className="program-action">
                      <button className="btn-view">View Plan</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No saved meal plans yet</p>
                <button 
                  className="btn-create"
                  onClick={() => navigate('/meal-plan-generator')}
                >
                  Create Your First Meal Plan
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Schedule;
