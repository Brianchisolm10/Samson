import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function SendFeedback() {
  const [feedbackType, setFeedbackType] = useState('product');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'product',
      title: 'Product Feedback',
      icon: '💪',
      description: 'Share ideas about workouts, meal plans, or features you\'d like to see',
      categories: ['Workouts', 'Meal Plans', 'Features', 'Performance', 'Other']
    },
    {
      id: 'website',
      title: 'Website Feedback',
      icon: '🌐',
      description: 'Report bugs or suggest improvements to the AFYA website',
      categories: ['Bug Report', 'Design', 'Navigation', 'Performance', 'Other']
    },
    {
      id: 'developer',
      title: 'Developer Feedback',
      icon: '👨‍💻',
      description: 'Technical issues, performance concerns, or API feedback',
      categories: ['API', 'Performance', 'Integration', 'Documentation', 'Other']
    }
  ];

  const currentType = feedbackTypes.find(t => t.id === feedbackType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', category: '', message: '', rating: 5 });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <TopNav />
      <div className="help-page">
        <Link to="/contact" className="back-button">← Back to Support</Link>
        <section className="help-hero">
          <h2 className="hero-subtitle">HELP CENTER</h2>
          <h1>Send Feedback</h1>
          <p className="hero-description">Help us improve AFYA with your valuable insights</p>
        </section>

        <div className="feedback-page-content">
          <div className="feedback-types">
            {feedbackTypes.map(type => (
              <button
                key={type.id}
                className={`feedback-type-card ${feedbackType === type.id ? 'active' : ''}`}
                onClick={() => setFeedbackType(type.id)}
              >
                <div className="feedback-type-icon">{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </button>
            ))}
          </div>

          <div className="feedback-form-container">
            <div className="form-header">
              <h2>{currentType.icon} {currentType.title}</h2>
              <p>{currentType.description}</p>
            </div>

            {submitted && (
              <div className="feedback-success">
                <div className="success-icon">✓</div>
                <h3>Thank you for your feedback!</h3>
                <p>We appreciate your input and will review it shortly.</p>
              </div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {currentType.categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rating">How satisfied are you with AFYA?</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        className={`rating-star ${formData.rating >= num ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you think..."
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">Submit Feedback</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendFeedback;
