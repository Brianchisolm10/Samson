import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <a href="/why-afya">Why AFYA</a>
          <a href="/hub">The Hub</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="nav-center">
          <a href="/" className="logo-text">AFYA</a>
        </div>
        <div className="nav-right">
          <a href="/education">Education</a>
          <a href="/community">Community</a>
          <a href="/accessible">Accessible</a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
