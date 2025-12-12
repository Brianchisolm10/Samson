import React from 'react';
import './Hero.css';

function Hero({ onToolClick }) {
  return (
    <section className="hero">
      <div className="hero-split">
        <div className="hero-left">
          <h1 className="hero-title">
            A Happier,<br />Healthier You.<br /><span className="highlight">Your Way</span>
          </h1>
        </div>
        <div className="hero-right">
          <div className="hero-nav-grid">
            <a href="#features" className="nav-item">
              <span className="nav-label">Why AFYA</span>
            </a>
            <a href="#tools-section" className="nav-item">
              <span className="nav-label">Tools</span>
            </a>
            <a href="mailto:afya@theafya.org" className="nav-item">
              <span className="nav-label">Contact</span>
            </a>
            <a href="/education" className="nav-item">
              <span className="nav-label">Education</span>
            </a>
            <a href="/community" className="nav-item">
              <span className="nav-label">Community</span>
            </a>
            <a href="/accessibility" className="nav-item">
              <span className="nav-label">Accessible</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;
