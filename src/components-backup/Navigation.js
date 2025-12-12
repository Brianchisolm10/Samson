import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">AFYA</span>
        </div>
        <ul className="nav-menu">
          <li><a href="#features">Why AFYA</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="mailto:afya@theafya.org">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
