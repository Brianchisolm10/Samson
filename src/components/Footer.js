import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-newsletter">
            <h4>Subscribe to Our Newsletter</h4>
            <p>Get fitness tips, meal plans, and exclusive updates delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            {subscribed && <p className="subscribe-success">✓ Thanks for subscribing!</p>}
            
            <div className="footer-social">
              <span>Follow Us</span>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook">f</a>
                <a href="https://instagram.com" aria-label="Instagram">📷</a>
                <a href="https://twitter.com" aria-label="Twitter">𝕏</a>
                <a href="https://youtube.com" aria-label="YouTube">▶</a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Tools</h4>
            <ul>
              <li><a href="/workout-generator">Workout Generator</a></li>
              <li><a href="/meal-plan-generator">Meal Plan Creator</a></li>
              <li><a href="/hub">The Hub</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/education">Education</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/help/topics">Help Topics</a></li>
              <li><a href="/help/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/contact/feedback">Send Feedback</a></li>
              <li><a href="/help/topics">Help Center</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/why-afya">Why AFYA</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container-full">
          <p className="footer-copyright">&copy; 2025 AFYA. All Rights Reserved</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
