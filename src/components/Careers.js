import React, { useState } from 'react';
import './Careers.css';
import TopNav from './TopNav';
import Footer from './Footer';

function Careers() {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Fitness Coach',
      department: 'Coaching',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead personalized fitness coaching sessions and develop customized workout programs for our diverse client base.',
      requirements: [
        'Certified fitness professional (NASM, ACE, or equivalent)',
        '5+ years of coaching experience',
        'Strong communication and motivational skills',
        'Experience with fitness assessment and program design'
      ]
    },
    {
      id: 2,
      title: 'Nutrition Specialist',
      department: 'Nutrition',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create evidence-based nutrition plans and provide guidance to help clients achieve their health and fitness goals.',
      requirements: [
        'Registered Dietitian (RD) or Certified Nutrition Specialist (CNS)',
        '3+ years of professional experience',
        'Knowledge of sports nutrition and wellness',
        'Excellent client communication skills'
      ]
    },
    {
      id: 3,
      title: 'Content Creator & Wellness Writer',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      description: 'Develop engaging, evidence-based content about fitness, nutrition, and wellness for our blog and social media platforms.',
      requirements: [
        'Strong writing and editing skills',
        'Background in health, fitness, or wellness',
        'Experience with content management systems',
        'Ability to research and fact-check health information'
      ]
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain our fitness platform, developing new features and improving user experience.',
      requirements: [
        'Proficiency in React, Node.js, and modern web technologies',
        '3+ years of full-stack development experience',
        'Experience with responsive design and mobile development',
        'Strong problem-solving and collaboration skills'
      ]
    },
    {
      id: 5,
      title: 'Community Manager',
      department: 'Community',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and nurture our community, manage social media, and create meaningful engagement with our members.',
      requirements: [
        '2+ years of community management experience',
        'Strong social media expertise',
        'Excellent interpersonal and communication skills',
        'Passion for fitness and wellness'
      ]
    },
    {
      id: 6,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive and beautiful user interfaces for our fitness platform and web applications.',
      requirements: [
        'Proficiency in design tools (Figma, Adobe XD, or similar)',
        '3+ years of UX/UI design experience',
        'Portfolio demonstrating design work',
        'Understanding of user research and usability principles'
      ]
    }
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Compensation', description: 'Attractive salary and performance bonuses' },
    { icon: '🏥', title: 'Health Benefits', description: 'Comprehensive health, dental, and vision coverage' },
    { icon: '🏋️', title: 'Fitness Perks', description: 'Free access to AFYA platform and fitness resources' },
    { icon: '🌍', title: 'Remote Work', description: 'Work from anywhere with flexible schedules' },
    { icon: '📚', title: 'Professional Development', description: 'Training budget and career growth opportunities' },
    { icon: '🤝', title: 'Supportive Culture', description: 'Collaborative team focused on wellness and growth' }
  ];

  return (
    <>
      <TopNav />
      <div className="careers-page">
        {/* Hero Section */}
        <section className="careers-hero">
          <div className="careers-hero-content">
            <h1>Join the AFYA Team</h1>
            <p>Help us transform fitness and wellness for everyone</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="careers-mission">
          <div className="careers-container">
            <h2>Our Mission</h2>
            <p>At AFYA, we're building a comprehensive fitness and wellness platform that empowers people to achieve their health goals. We're looking for passionate, talented individuals who share our vision of making fitness accessible, personalized, and sustainable for everyone.</p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="careers-benefits">
          <div className="careers-container">
            <h2>Why Join AFYA?</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="careers-positions">
          <div className="careers-container">
            <h2>Open Positions</h2>
            <div className="positions-list">
              {jobOpenings.map((job) => (
                <div key={job.id} className="job-card">
                  <div 
                    className="job-header"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="job-title-section">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-department">{job.department}</span>
                        <span className="job-location">{job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    <div className="job-toggle">
                      {expandedJob === job.id ? '−' : '+'}
                    </div>
                  </div>
                  
                  {expandedJob === job.id && (
                    <div className="job-details">
                      <p className="job-description">{job.description}</p>
                      <div className="job-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <a href="mailto:afya@theafya.org" className="btn-apply">Apply Now</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="careers-cta">
          <div className="careers-container">
            <h2>Don't See Your Role?</h2>
            <p>We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute to AFYA's mission.</p>
            <a href="mailto:afya@theafya.org" className="btn-contact">Get in Touch</a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Careers;
