import React from 'react';
import './Hero.css';

function Hero({ onToolClick }) {
  return (
    <>
      <nav className="top-nav">
        <div className="nav-left">
          <a href="#features" className="nav-link">Why AFYA</a>
          <a href="/hub" className="nav-link">The Hub</a>
          <a href="mailto:afya@theafya.org" className="nav-link">Contact</a>
        </div>
        <div className="nav-center">
          <span className="logo">AFYA</span>
        </div>
        <div className="nav-right">
          <a href="/education" className="nav-link">Education</a>
          <a href="/community" className="nav-link">Community</a>
          <a href="/accessibility" className="nav-link">Accessible</a>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-image">
          <img src="/afya-hero.png" alt="AFYA" className="hero-img" />
        </div>
        <div className="hero-split">
          <div className="hero-left">
            <h1 className="hero-title">
              A Happier,<br />Healthier You.<br />Your Way.
            </h1>
            <a href="/hub" className="cta-button">Start Your Journey</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
