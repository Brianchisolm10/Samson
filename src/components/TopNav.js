import React from 'react';
import './TopNav.css';

function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <a href="/" className="logo">The AFYA</a>
      </div>
      <div className="nav-right">
        <div className="nav-menu">
          <button className="nav-dropdown-btn">
            Platform
          </button>
          <div className="dropdown-menu">
            <a href="/hub" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">THE HUB</span>
                <span className="dropdown-desc">Access all tools</span>
              </span>
            </a>
            <a href="/workout-generator" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">WORKOUT GENERATOR</span>
                <span className="dropdown-desc">Create custom workouts</span>
              </span>
            </a>
            <a href="/meal-plan-generator" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">MEAL PLAN CREATOR</span>
                <span className="dropdown-desc">Build meal plans</span>
              </span>
            </a>
          </div>
        </div>

        <div className="nav-menu">
          <button className="nav-dropdown-btn">
            Learn
          </button>
          <div className="dropdown-menu">
            <a href="/education" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">EDUCATION</span>
                <span className="dropdown-desc">Learn fitness basics</span>
              </span>
            </a>
            <a href="/blog" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">BLOG</span>
                <span className="dropdown-desc">Expert insights</span>
              </span>
            </a>
            <a href="/resources" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">RESOURCES</span>
                <span className="dropdown-desc">Guides & tools</span>
              </span>
            </a>
          </div>
        </div>

        <div className="nav-menu">
          <button className="nav-dropdown-btn">
            Community
          </button>
          <div className="dropdown-menu">
            <a href="/community" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">JOIN COMMUNITY</span>
                <span className="dropdown-desc">Connect with others</span>
              </span>
            </a>
            <a href="/why-afya" className="dropdown-link">
              <span className="dropdown-text">
                <span className="dropdown-title">WHY AFYA</span>
                <span className="dropdown-desc">Our mission</span>
              </span>
            </a>
          </div>
        </div>

        <a href="/contact" className="nav-link">SUPPORT</a>
        <a href="/shop" className="nav-link">SHOP</a>
      </div>
    </nav>
  );
}

export default TopNav;
