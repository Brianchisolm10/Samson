import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import CTA from './components/CTA';
import HubPage from './components/HubPage';
import WorkoutInfo from './components/WorkoutInfo';
import MealInfo from './components/MealInfo';
import WorkoutDemo from './components/WorkoutDemo';

function HomePage() {
  const [activeModal, setActiveModal] = useState(null);

  const handleToolClick = (tool) => {
    setActiveModal(tool);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="App">
      <Hero onToolClick={handleToolClick} />
      <CTA onToolClick={handleToolClick} />
      
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{activeModal === 'workout' ? 'Workout Program Generator' : 'Meal Plan Creator'}</h2>
            <p>Loading {activeModal === 'workout' ? 'workout' : 'meal plan'} tool...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/workout-info" element={<WorkoutInfo />} />
        <Route path="/meal-info" element={<MealInfo />} />
        <Route path="/workout-generator" element={<WorkoutDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
