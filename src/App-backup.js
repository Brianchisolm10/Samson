import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Features from './components/Features';
import CTA from './components/CTA';
import Navigation from './components/Navigation';

function App() {
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
      <Tools onToolClick={handleToolClick} />
      <Features />
      <CTA onToolClick={handleToolClick} />
      
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{activeModal === 'workout' ? 'Workout Program Generator' : 'Meal Plan Creator'}</h2>
            <p>Loading {activeModal === 'workout' ? 'workout' : 'meal plan'} tool...</p>
            {/* Replace with actual tool components */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
