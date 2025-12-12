import React, { useState } from 'react';
import './InfoTooltip.css';

function InfoTooltip({ label, explanation, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="info-tooltip-wrapper">
      <div className="info-tooltip-trigger">
        {children}
        <button
          className="info-icon"
          onClick={() => setIsOpen(!isOpen)}
          title="Learn more"
          aria-label="Learn more"
        >
          ?
        </button>
      </div>
      {isOpen && (
        <div className="info-tooltip-content">
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default InfoTooltip;
