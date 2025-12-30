import React from 'react';
import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="donate-section">
          <p className="donate-text">Support our mission to make elite wellness accessible to everyone</p>
          <a href="/community" className="donate-link">Join Our Community</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
