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
        <div className="cta-footer">
          <div className="footer-content">
            <p>Questions? Reach out to us</p>
            <a href="mailto:afya@theafya.org" className="contact-link">afya@theafya.org</a>
          </div>
          <div className="copyright">
            <p>&copy; 2025 AFYA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
