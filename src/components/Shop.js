import React, { useState } from 'react';
import TopNav from './TopNav';
import Footer from './Footer';
import './Shop.css';

function Shop() {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'Beginner Strength Training',
      category: 'training',
      price: 'Free',
      description: 'Learn foundational strength training principles',
      lessons: 8,
      duration: '2 hours',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Macro Calculation Masterclass',
      category: 'nutrition',
      price: '$29',
      description: 'Understand macronutrients and create balanced meal plans',
      lessons: 12,
      duration: '3 hours',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Sleep Optimization Toolkit',
      category: 'recovery',
      price: '$19',
      description: 'Science-backed strategies to improve sleep quality',
      lessons: 6,
      duration: '1.5 hours',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Athletic Performance Protocol',
      category: 'athletes',
      price: '$49',
      description: 'Sport-specific training and conditioning',
      lessons: 16,
      duration: '5 hours',
      level: 'Advanced'
    }
  ];

  const equipment = [
    {
      id: 1,
      title: 'Adjustable Dumbbells Set',
      price: '$89',
      description: 'Premium adjustable dumbbells, 5-50 lbs',
      category: 'weights'
    },
    {
      id: 2,
      title: 'Resistance Bands Kit',
      price: '$24',
      description: 'Set of 5 resistance bands with varying resistance levels',
      category: 'accessories'
    },
    {
      id: 3,
      title: 'Yoga Mat Pro',
      price: '$35',
      description: 'Non-slip yoga mat with carrying strap',
      category: 'accessories'
    },
    {
      id: 4,
      title: 'Foam Roller',
      price: '$28',
      description: 'High-density foam roller for muscle recovery',
      category: 'recovery'
    },
    {
      id: 5,
      title: 'Jump Rope',
      price: '$15',
      description: 'Speed jump rope with adjustable length',
      category: 'cardio'
    },
    {
      id: 6,
      title: 'Pull-up Bar',
      price: '$45',
      description: 'Doorway pull-up bar, no installation required',
      category: 'weights'
    }
  ];

  return (
    <>
      <TopNav />
      <div className="shop-page">
        {/* Hero Section */}
        <section className="shop-hero">
          <h1 className="shop-hero-title">AFYA Shop</h1>
          <p className="shop-hero-subtitle">Courses, Equipment & Gear</p>
        </section>

        <div className="shop-container">
          {/* Tab Navigation */}
          <section className="shop-tabs">
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button 
              className={`tab-btn ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              Equipment & Gear
            </button>
            <button 
              className={`tab-btn ${activeTab === 'donate' ? 'active' : ''}`}
              onClick={() => setActiveTab('donate')}
            >
              Donate
            </button>
          </section>

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <section className="tab-content">
              <div className="content-header">
                <h2>Learn & Grow</h2>
                <p>Structured courses to guide your fitness journey</p>
              </div>
              <div className="items-grid">
                {courses.map(course => (
                  <div key={course.id} className="item-card course-card">
                    <div className="item-header">
                      <h3>{course.title}</h3>
                      <span className="item-price">{course.price}</span>
                    </div>
                    <p className="item-description">{course.description}</p>
                    <div className="item-meta">
                      <span>📚 {course.lessons} lessons</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                    <button className="item-btn">Enroll Now</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <section className="tab-content">
              <div className="content-header">
                <h2>Equipment & Gear</h2>
                <p>Quality equipment to support your training</p>
              </div>
              <div className="items-grid">
                {equipment.map(item => (
                  <div key={item.id} className="item-card equipment-card">
                    <div className="item-header">
                      <h3>{item.title}</h3>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <p className="item-description">{item.description}</p>
                    <button className="item-btn">Add to Cart</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Donate Tab */}
          {activeTab === 'donate' && (
            <section className="tab-content">
              <div className="donate-section">
                <div className="donate-header">
                  <h2>Donate Equipment & Gear</h2>
                  <p>Help us recycle and redistribute quality fitness equipment to our community</p>
                </div>

                <div className="donate-content">
                  <div className="donate-info">
                    <h3>Why Donate?</h3>
                    <ul className="donate-benefits">
                      <li>Give equipment a second life</li>
                      <li>Support community members in need</li>
                      <li>Reduce waste and environmental impact</li>
                      <li>Receive a tax-deductible receipt</li>
                    </ul>
                  </div>

                  <div className="donate-form">
                    <h3>What We Accept</h3>
                    <div className="accepted-items">
                      <div className="accepted-item">
                        <span>✓ Dumbbells & Weights</span>
                      </div>
                      <div className="accepted-item">
                        <span>✓ Resistance Bands</span>
                      </div>
                      <div className="accepted-item">
                        <span>✓ Yoga Mats</span>
                      </div>
                      <div className="accepted-item">
                        <span>✓ Foam Rollers</span>
                      </div>
                      <div className="accepted-item">
                        <span>✓ Jump Ropes</span>
                      </div>
                      <div className="accepted-item">
                        <span>✓ Pull-up Bars</span>
                      </div>
                    </div>

                    <form className="donation-form-fields">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" placeholder="Full name" />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="your@email.com" />
                      </div>
                      <div className="form-group">
                        <label>What are you donating?</label>
                        <textarea placeholder="Describe the equipment and condition..." rows="4"></textarea>
                      </div>
                      <button type="submit" className="donate-btn">Submit Donation</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
