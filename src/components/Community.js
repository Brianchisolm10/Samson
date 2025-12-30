import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import Footer from './Footer';
import './Community.css';

function Community() {
  const [activeTab, setActiveTab] = useState('overview');
  const [minutesMoved, setMinutesMoved] = useState(0);

  useEffect(() => {
    // Simulate live tracker - increment minutes moved
    const interval = setInterval(() => {
      setMinutesMoved(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const challenges = [
    {
      id: 1,
      title: '30-Day Strength Challenge',
      description: 'Build foundational strength with progressive overload',
      participants: 1240,
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Nutrition Mastery Month',
      description: 'Learn macro tracking and meal prep fundamentals',
      participants: 856,
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Endurance Builder',
      description: 'Improve cardiovascular fitness and stamina',
      participants: 623,
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Body Composition Transformation',
      description: 'Combine training and nutrition for optimal results',
      participants: 1089,
      difficulty: 'Advanced'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Beginner\'s Guide to Strength Training',
      type: 'Guide',
      downloads: 3420
    },
    {
      id: 2,
      title: 'Macro Calculation Spreadsheet',
      type: 'Tool',
      downloads: 2156
    },
    {
      id: 3,
      title: 'Exercise Form Video Library',
      type: 'Video',
      downloads: 5890
    },
    {
      id: 4,
      title: 'Meal Prep Templates',
      type: 'Template',
      downloads: 4123
    }
  ];

  return (
    <>
      <TopNav />
      <div className="community-page">
        <section className="community-hero">
          <h2 className="community-hero-subtitle">COMMUNITY</h2>
          <h1 className="community-hero-title">Join the AFYA Community</h1>
          <p className="community-hero-description">Connect with thousands of fitness enthusiasts on their transformation journey</p>
        </section>

        <div className="community-container">
          <section className="live-tracker-section">
            <div className="tracker-content">
              <div className="tracker-left">
                <h3>Community Activity</h3>
                <p className="tracker-label">Minutes Moved Today</p>
                <div className="minutes-display">
                  <span className="minutes-number">{minutesMoved.toLocaleString()}</span>
                  <span className="minutes-unit">minutes</span>
                </div>
                <p className="tracker-description">Real-time tracking of community members staying active</p>
              </div>
              <div className="tracker-right">
                <div className="tracker-stats">
                  <div className="tracker-stat">
                    <h4>50,000+</h4>
                    <p>Active Members</p>
                  </div>
                  <div className="tracker-stat">
                    <h4>100,000+</h4>
                    <p>Workouts Generated</p>
                  </div>
                  <div className="tracker-stat">
                    <h4>75,000+</h4>
                    <p>Meal Plans Created</p>
                  </div>
                  <div className="tracker-stat">
                    <h4>4.8★</h4>
                    <p>Community Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        <section className="community-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </button>
            <button 
              className={`tab-btn ${activeTab === 'resource-hub' ? 'active' : ''}`}
              onClick={() => setActiveTab('resource-hub')}
            >
              Resource Hub
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h2>What is the AFYA Community?</h2>
                <p>The AFYA Community is a supportive network of fitness enthusiasts, athletes, and health-conscious individuals working toward their goals. Whether you're just starting your fitness journey or you're an experienced athlete, there's a place for you here.</p>
                
                <div className="features-grid">
                    <div className="feature-item">
                      <h4>Connect</h4>
                      <p>Share your progress, ask questions, and get support from like-minded individuals</p>
                    </div>
                    <div className="feature-item">
                      <h4>Learn</h4>
                      <p>Access educational resources, guides, and expert tips from fitness professionals</p>
                    </div>
                    <div className="feature-item">
                      <h4>Compete</h4>
                      <p>Join challenges, track progress, and celebrate wins with the community</p>
                    </div>
                    <div className="feature-item">
                      <h4>Grow</h4>
                      <p>Get personalized feedback and motivation to reach your fitness goals</p>
                    </div>
                  </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="challenges-content">
                <h2>Active Challenges</h2>
                <p>Join thousands of members in our community challenges and transform your fitness</p>
                <div className="challenges-grid">
                  {challenges.map(challenge => (
                    <div key={challenge.id} className="challenge-card">
                      <h3>{challenge.title}</h3>
                      <p>{challenge.description}</p>
                      <div className="challenge-meta">
                        <span className="participants">👥 {challenge.participants.toLocaleString()} joined</span>
                        <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
                      </div>
                      <button className="join-btn">Join Challenge</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resource-hub' && (
              <div className="resource-hub-content">
                <div className="hub-intro">
                  <p>Free, evidence-based wellness education for everyone. This hub is organized by how people think about their health, not by products or services.</p>
                </div>

                <div className="hub-categories">
                  <div className="hub-category">
                    <h3>Training & Movement</h3>
                    <p className="category-desc">How the body gets stronger, faster, and more resilient</p>
                    <ul className="category-topics">
                      <li>Physical activity guidelines</li>
                      <li>Strength training basics</li>
                      <li>Cardiovascular fitness</li>
                      <li>Injury prevention</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.cdc.gov/physicalactivity/" target="_blank" rel="noopener noreferrer">CDC Activity Guidelines</a>
                      <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener noreferrer">WHO Guidelines</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Nutrition & Fueling</h3>
                    <p className="category-desc">How food supports health, energy, and performance</p>
                    <ul className="category-topics">
                      <li>Balanced meals & portioning</li>
                      <li>Macronutrients & micronutrients</li>
                      <li>Hydration & electrolytes</li>
                      <li>Dietary preferences</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.myplate.gov/" target="_blank" rel="noopener noreferrer">USDA MyPlate</a>
                      <a href="https://ods.od.nih.gov/" target="_blank" rel="noopener noreferrer">NIH Dietary Supplements</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Recovery, Sleep & Stress</h3>
                    <p className="category-desc">How the body repairs, adapts, and stays healthy</p>
                    <ul className="category-topics">
                      <li>Sleep duration & quality</li>
                      <li>Stress and recovery</li>
                      <li>Active recovery</li>
                      <li>Rest days and deloads</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.cdc.gov/sleep/" target="_blank" rel="noopener noreferrer">CDC Sleep Education</a>
                      <a href="https://www.nimh.nih.gov/health/topics/stress-and-health" target="_blank" rel="noopener noreferrer">NIMH Stress Resources</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Mental Wellness & Lifestyle</h3>
                    <p className="category-desc">The mind–body connection in long-term wellness</p>
                    <ul className="category-topics">
                      <li>Stress management</li>
                      <li>Motivation & habit formation</li>
                      <li>Mental health awareness</li>
                      <li>Work-life balance</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.nimh.nih.gov/" target="_blank" rel="noopener noreferrer">NIMH Mental Health</a>
                      <a href="https://www.nih.gov/health-information" target="_blank" rel="noopener noreferrer">NIH Health Info</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Special Populations & Conditions</h3>
                    <p className="category-desc">Adapting health and fitness to real life</p>
                    <ul className="category-topics">
                      <li>Youth & adolescents</li>
                      <li>Older adults</li>
                      <li>Chronic conditions</li>
                      <li>Injury history & recovery</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://medlineplus.gov/" target="_blank" rel="noopener noreferrer">MedlinePlus</a>
                      <a href="https://www.cdc.gov/chronicdisease/" target="_blank" rel="noopener noreferrer">CDC Chronic Disease</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Athletes & Performance</h3>
                    <p className="category-desc">For those training with sport or competition in mind</p>
                    <ul className="category-topics">
                      <li>Speed, power, and agility</li>
                      <li>Strength training for athletes</li>
                      <li>Energy systems</li>
                      <li>Youth athlete development</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.who.int/teams/noncommunicable-diseases/physical-activity" target="_blank" rel="noopener noreferrer">WHO Sports Science</a>
                      <a href="https://www.nsca.com/" target="_blank" rel="noopener noreferrer">NSCA Resources</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Research & Science Corner</h3>
                    <p className="category-desc">Where our recommendations come from</p>
                    <ul className="category-topics">
                      <li>How to read research</li>
                      <li>Evidence-based principles</li>
                      <li>Common myths vs data</li>
                      <li>Current research trends</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed</a>
                      <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener noreferrer">ClinicalTrials.gov</a>
                    </div>
                  </div>

                  <div className="hub-category">
                    <h3>Tools & Calculators</h3>
                    <p className="category-desc">Simple tools anyone can use</p>
                    <ul className="category-topics">
                      <li>Activity level estimators</li>
                      <li>Calorie & energy estimators</li>
                      <li>Bodyweight tracking</li>
                      <li>Training readiness</li>
                    </ul>
                    <div className="category-links">
                      <a href="https://www.niddk.nih.gov/bwp" target="_blank" rel="noopener noreferrer">NIH Body Weight Planner</a>
                      <a href="https://www.cdc.gov/healthyweight/assessing/index.html" target="_blank" rel="noopener noreferrer">CDC Health Tools</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="community-cta">
          <h2>Ready to Join?</h2>
          <p>Start your fitness journey with AFYA today</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn-cta-primary">Create Account</a>
            <a href="/hub" className="btn-cta-secondary">Try Free Tools</a>
          </div>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Community;
