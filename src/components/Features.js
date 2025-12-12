import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Fully Automated',
      description: 'Instant program delivery. Fill out a form, get your personalized plan in minutes.'
    },
    {
      icon: '🔬',
      title: 'Science-Backed',
      description: 'Evidence-based fitness and nutrition rooted in exercise science and health research.'
    },
    {
      icon: '🚀',
      title: 'Accessible First',
      description: 'Quality wellness education available to everyone. No barriers to getting started.'
    },
    {
      icon: '🌍',
      title: 'Equitable Access',
      description: 'Designed for underserved communities. Multilingual and adaptable for all ability levels.'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Built-in dashboards to monitor check-ins, mood, and fitness progress with real-time alerts.'
    },
    {
      icon: '🎓',
      title: 'Education-First',
      description: 'Learn why, not just what. Understand the science behind every program and recommendation.'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">Why AFYA</h2>
        <p className="section-subtitle">Bridging the gap between elite fitness and universal access</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
