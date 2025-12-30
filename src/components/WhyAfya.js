import React, { useState } from 'react';
import './WhyAfya.css';
import TopNav from './TopNav';
import Footer from './Footer';

function WhyAfya() {
  const [activeTab, setActiveTab] = useState('who');

  return (
    <>
      <TopNav />
      <div className="why-afya-page">
        {/* Hero Section */}
        <section className="why-hero">
          <h2 className="why-hero-subtitle">ABOUT AFYA</h2>
          <h1 className="why-hero-title">Who We Are, Where We're Going, What We Do</h1>
          <p className="why-hero-description">Elite-level fitness, nutrition, and health education—universally accessible</p>
        </section>

        {/* Who, Where, What Tabs */}
        <section className="why-content">
          <div className="why-tabs">
            <button 
              className={`why-tab-btn ${activeTab === 'who' ? 'active' : ''}`}
              onClick={() => setActiveTab('who')}
            >
              Who We Are
            </button>
            <button 
              className={`why-tab-btn ${activeTab === 'where' ? 'active' : ''}`}
              onClick={() => setActiveTab('where')}
            >
              Where We're Going
            </button>
            <button 
              className={`why-tab-btn ${activeTab === 'what' ? 'active' : ''}`}
              onClick={() => setActiveTab('what')}
            >
              What We Do
            </button>
          </div>

          {/* Who We Are */}
          {activeTab === 'who' && (
            <div className="why-tab-content">
              <div className="why-section-grid">
                <div className="why-section-left">
                  <h2>Who We Are</h2>
                  <p>AFYA is a wellness-tech platform on a mission to make elite-level fitness, nutrition, and health education universally accessible. Built with the ethos of community, discipline, and joy, we deliver automated, science-backed programs to youth, adults, and educators—rooted in equity, powered by automation, and guided by empathy.</p>
                  <p>As global health inequities rise and misinformation dominates online spaces, AFYA bridges the gap by offering structured, evidence-based fitness and wellness resources for free, with scalable monetization pathways.</p>
                  <div className="why-values">
                    <div className="value-item">
                      <h4>Community</h4>
                      <p>Building together, supporting each other</p>
                    </div>
                    <div className="value-item">
                      <h4>Discipline</h4>
                      <p>Science-backed, structured programs</p>
                    </div>
                    <div className="value-item">
                      <h4>Joy</h4>
                      <p>Making fitness accessible and fun</p>
                    </div>
                  </div>
                </div>
                <div className="why-section-right">
                  <div className="why-stat-box">
                    <div className="stat-number">24+</div>
                    <div className="stat-label">Clients Served</div>
                  </div>
                  <div className="why-stat-box">
                    <div className="stat-number">5+</div>
                    <div className="stat-label">U.S. States Reached</div>
                  </div>
                  <div className="why-stat-box">
                    <div className="stat-number">23+</div>
                    <div className="stat-label">Templates Created</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Where We're Going */}
          {activeTab === 'where' && (
            <div className="why-tab-content">
              <div className="why-section-grid">
                <div className="why-section-left">
                  <h2>Where We're Going</h2>
                  <p>AFYA is scaling across three phases to become a comprehensive wellness operating system serving youth, adults, educators, and enterprises globally.</p>
                  <div className="why-roadmap">
                    <div className="roadmap-item">
                      <h4>Phase 1: Foundation</h4>
                      <p>Free tier launch, community building, initial partnerships</p>
                    </div>
                    <div className="roadmap-item">
                      <h4>Phase 2: Growth</h4>
                      <p>Premium subscriptions, product sales, B2B licensing</p>
                    </div>
                    <div className="roadmap-item">
                      <h4>Phase 3: Scale</h4>
                      <p>SaaS licensing, enterprise solutions, global reach</p>
                    </div>
                    <div className="roadmap-item">
                      <h4>AI-Powered Coaching</h4>
                      <p>Personalized guidance that adapts in real-time</p>
                    </div>
                    <div className="roadmap-item">
                      <h4>University Partnerships</h4>
                      <p>Integrating with educational institutions</p>
                    </div>
                    <div className="roadmap-item">
                      <h4>Corporate Wellness</h4>
                      <p>Enterprise solutions for workplace health</p>
                    </div>
                  </div>
                </div>
                <div className="why-section-right">
                  <div className="why-vision-box">
                    <h3>Market Opportunity</h3>
                    <div className="market-stats">
                      <div className="market-item">
                        <div className="market-value">$4.9T</div>
                        <div className="market-label">Health & Wellness Market</div>
                      </div>
                      <div className="market-item">
                        <div className="market-value">$15.2B</div>
                        <div className="market-label">Fitness App Industry</div>
                      </div>
                      <div className="market-item">
                        <div className="market-value">$399B</div>
                        <div className="market-label">eLearning Market</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* What We Do */}
          {activeTab === 'what' && (
            <div className="why-tab-content">
              <div className="why-section-grid">
                <div className="why-section-left">
                  <h2>What We Do</h2>
                  <p>AFYA delivers automated, personalized wellness programs powered by science and technology. Our scalable infrastructure makes elite-level coaching accessible to everyone.</p>
                  <div className="why-features">
                    <div className="feature-block">
                      <h4>Personalized Programs</h4>
                      <p>Automated intake forms generate customized workouts and nutrition plans in minutes</p>
                    </div>
                    <div className="feature-block">
                      <h4>Science-Backed</h4>
                      <p>Every program built on exercise science and nutritional research</p>
                    </div>
                    <div className="feature-block">
                      <h4>Progress Tracking</h4>
                      <p>Built-in dashboards monitor check-ins, mood, and progress with alerts</p>
                    </div>
                    <div className="feature-block">
                      <h4>Instant Delivery</h4>
                      <p>Branded PDFs and digital tools delivered automatically within minutes</p>
                    </div>
                  </div>
                </div>
                <div className="why-section-right">
                  <div className="why-process-box">
                    <h3>How It Works</h3>
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-text">Complete intake questionnaire</div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-text">Our system generates your program</div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-text">Receive branded, personalized plan</div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-text">Track progress and adjust as needed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Why Choose AFYA */}
        <section className="why-choose">
          <div className="why-choose-header">
            <h2>Why Choose AFYA?</h2>
            <p>The smarter way to fitness</p>
          </div>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <h3>Personalized</h3>
              <p>Every program tailored to your goals, fitness level, equipment, and lifestyle</p>
            </div>
            <div className="why-choose-card">
              <h3>Automated</h3>
              <p>Get your program in minutes, not days. Powered by intelligent systems</p>
            </div>
            <div className="why-choose-card">
              <h3>Science-Based</h3>
              <p>Built on exercise science and nutritional research, not trends</p>
            </div>
            <div className="why-choose-card">
              <h3>Accessible</h3>
              <p>Free tier available. Elite-level coaching for everyone</p>
            </div>
            <div className="why-choose-card">
              <h3>Scalable</h3>
              <p>From individuals to enterprises, AFYA grows with you</p>
            </div>
            <div className="why-choose-card">
              <h3>Mission-Led</h3>
              <p>Aligned with UN Sustainable Development Goals for global impact</p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="why-impact">
          <div className="why-impact-header">
            <h2>Our Impact</h2>
            <p>Committed to equity, sustainability, and global health</p>
          </div>
          <div className="why-impact-grid">
            <div className="impact-card">
              <h3>SDG 3: Good Health & Well-Being</h3>
              <p>Ensuring healthy lives and promoting well-being for all at all ages</p>
            </div>
            <div className="impact-card">
              <h3>SDG 4: Quality Education</h3>
              <p>Providing accessible, evidence-based health and fitness education</p>
            </div>
            <div className="impact-card">
              <h3>SDG 10: Reduced Inequalities</h3>
              <p>Making elite-level wellness resources universally accessible</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="why-cta">
          <h2>Ready to Start Your Fitness Journey?</h2>
          <p>Experience personalized fitness today</p>
          <div className="why-cta-buttons">
            <a href="/workout-generator" className="why-btn-primary">Generate Workout</a>
            <a href="/meal-plan-generator" className="why-btn-secondary">Create Meal Plan</a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default WhyAfya;
