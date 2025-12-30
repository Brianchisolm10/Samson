import React from 'react';
import './Hero.css';
import TopNav from './TopNav';

function Hero({ onToolClick }) {
  return (
    <>
      <TopNav />
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
