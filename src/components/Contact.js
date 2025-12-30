import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import TopNav from './TopNav';
import Footer from './Footer';

function Contact() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [messageForm, setMessageForm] = useState({ email: '', message: '' });
  const [messageSent, setMessageSent] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to help topics with search query
      window.location.href = `/help/topics?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setMessageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', messageForm);
    setMessageSent(true);
    setTimeout(() => {
      setMessageForm({ email: '', message: '' });
      setMessageSent(false);
    }, 3000);
  };

  return (
    <>
      <TopNav />
      <div className="contact-page">
        {/* Dark Hero Section */}
        <section className="contact-hero">
          <h2 className="hero-subtitle">AFYA Support</h2>
          <h1>HELP CENTER</h1>
          <div className="search-box">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="How can we help?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="search-btn"
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  background: '#8B6F47',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'white',
                  borderRadius: '0',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                🔍
              </button>
            </form>
          </div>
        </section>

        {/* Main Content */}
        <div className="contact-content">
          {/* Left Side - Help Topics */}
          <div className="help-topics">
            <h3>HELP TOPICS</h3>
            <div className="topics-grid">
              <Link to="/help/topics" className="topic-card">
                <h4>Workouts</h4>
              </Link>
              <Link to="/help/topics" className="topic-card">
                <h4>Meal Plans</h4>
              </Link>
              <Link to="/help/topics" className="topic-card">
                <h4>Account</h4>
              </Link>
              <Link to="/help/topics" className="topic-card">
                <h4>Billing</h4>
              </Link>
              <Link to="/help/topics" className="topic-card">
                <h4>Technical</h4>
              </Link>
              <Link to="/help/topics" className="topic-card">
                <h4>General</h4>
              </Link>
            </div>

            {/* Feedback Section */}
            <div className="feedback-section">
              <h3>SEND FEEDBACK</h3>
              <p className="feedback-intro">Help us improve AFYA by sharing your thoughts and suggestions</p>
              <div className="feedback-grid">
                <Link to="/help/feedback" className="feedback-card">
                  <div className="feedback-icon">💪</div>
                  <h4>Product Feedback</h4>
                  <p>Share ideas about workouts, meal plans, or features you'd like to see</p>
                  <span className="feedback-link">Send Feedback →</span>
                </Link>
                <Link to="/help/feedback" className="feedback-card">
                  <div className="feedback-icon">🌐</div>
                  <h4>Website Feedback</h4>
                  <p>Report bugs or suggest improvements to the AFYA website</p>
                  <span className="feedback-link">Send Feedback →</span>
                </Link>
                <Link to="/help/feedback" className="feedback-card">
                  <div className="feedback-icon">👨‍💻</div>
                  <h4>Developer Feedback</h4>
                  <p>Technical issues, performance concerns, or API feedback</p>
                  <span className="feedback-link">Send Feedback →</span>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>FREQUENTLY ASKED</h3>
                <Link to="/help/faq" style={{ fontSize: '12px', color: '#8B6F47', textDecoration: 'none', fontWeight: '600' }}>View All →</Link>
              </div>
              <div className="faq-list">
                {[
                  { q: "How do I generate a workout?", a: "Click on \"Generate Workout\" from the hub, answer a quick 3-step questionnaire about your fitness level, goals, and available equipment, and we'll create a personalized program for you." },
                  { q: "How accurate are the calculations?", a: "We use scientifically-backed formulas like the Mifflin-St Jeor equation for BMR calculations and evidence-based macro ratios. Results are personalized based on your specific data and training goals." },
                  { q: "Can I modify the programs?", a: "Absolutely! The programs are starting points. Feel free to adjust exercises, sets, reps, or meals based on your preferences and how your body responds to training." },
                  { q: "Do I need an account?", a: "No! You can generate workouts and meal plans without an account. However, creating an account allows you to save your programs and track your progress over time." },
                  { q: "Can I save my programs?", a: "Yes! Create an account to save multiple workout and meal plans. You can access them anytime and track how your programs evolve as you progress." },
                  { q: "What about dietary preferences?", a: "Our meal plan generator supports various dietary preferences including omnivore, vegetarian, vegan, keto, and paleo. Select your preference during the questionnaire." },
                  { q: "How do I track progress?", a: "Create a profile to save your programs and track metrics over time. Monitor your strength gains, body composition changes, and nutrition adherence through your saved programs." },
                  { q: "Is there a mobile app?", a: "AFYA is currently available as a web application. You can access it on any device with a browser. We're working on native mobile apps for iOS and Android." }
                ].map((item, index) => (
                  <div key={index} className="faq-item">
                    <button 
                      className={`faq-question ${expandedFaq === index ? 'active' : ''}`}
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                    </button>
                    {expandedFaq === index && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Methods */}
          <aside className="contact-sidebar">
            <div className="contact-methods-container">
              <h3>CONTACT US</h3>
              <p className="contact-intro">Choose how you'd like to reach us</p>
              
              <div className="contact-methods-grid">
                <div className="contact-method-box call-method">
                  <div className="method-header">
                    <h4>📞 Call</h4>
                  </div>
                  <div className="method-details">
                    <p className="contact-phone">1-800-AFYA-123</p>
                    <p className="availability">Mon-Fri: 9am - 5pm PST</p>
                    <p className="method-note">Best for urgent issues or detailed questions</p>
                  </div>
                </div>

                <div className="contact-method-box message-method">
                  <div className="method-header">
                    <h4>✉️ Message</h4>
                  </div>
                  {messageSent && (
                    <div className="message-success">✓ Message sent! We'll get back to you soon.</div>
                  )}
                  <form onSubmit={handleMessageSubmit} className="message-form">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={messageForm.email}
                      onChange={handleMessageChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={messageForm.message}
                      onChange={handleMessageChange}
                      required
                      rows="3"
                    />
                    <button type="submit" className="message-submit">Send</button>
                  </form>
                  <p className="method-note">Response within 24 hours. Great for feedback and feature requests</p>
                  <p className="contact-email"><a href="mailto:afya@theafya.org">afya@theafya.org</a></p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
