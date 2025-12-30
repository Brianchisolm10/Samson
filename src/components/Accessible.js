import React from 'react';
import TopNav from './TopNav';
import './Accessible.css';

function Accessible() {
  return (
    <div className="accessible-page">
      <TopNav />
      
      <div className="accessible-container">
        <section className="accessible-hero">
          <h1>Accessibility & Inclusivity</h1>
          <p>Fitness is for everyone. AFYA is designed to be inclusive and accessible to all</p>
        </section>

        <section className="accessible-content">
          <div className="accessible-grid">
            <div className="accessible-card">
              <h2>🦾 Adaptive Training</h2>
              <p>Our workout generator accounts for injuries, limitations, and physical constraints. Whether you're recovering from an injury or managing a chronic condition, we can create programs that work for your body.</p>
              <ul>
                <li>Injury-aware exercise substitutions</li>
                <li>Mobility and flexibility modifications</li>
                <li>Progressive rehabilitation protocols</li>
                <li>Adaptive equipment options</li>
              </ul>
            </div>

            <div className="accessible-card">
              <h2>♿ Mobility Considerations</h2>
              <p>We understand that not everyone has access to a full gym. Our programs work with minimal equipment and can be adapted for wheelchair users and those with mobility challenges.</p>
              <ul>
                <li>Bodyweight-only options</li>
                <li>Seated exercise variations</li>
                <li>Standing alternatives</li>
                <li>Equipment-free workouts</li>
              </ul>
            </div>

            <div className="accessible-card">
              <h2>👁️ Visual Accessibility</h2>
              <p>AFYA is designed with visual accessibility in mind. Our interface supports screen readers and high-contrast modes for users with visual impairments.</p>
              <ul>
                <li>Screen reader compatible</li>
                <li>High contrast mode support</li>
                <li>Adjustable text sizes</li>
                <li>Clear navigation structure</li>
              </ul>
            </div>

            <div className="accessible-card">
              <h2>🔊 Audio Support</h2>
              <p>All content can be accessed through multiple formats. We provide text descriptions for all exercises and offer audio guidance options.</p>
              <ul>
                <li>Text descriptions for all exercises</li>
                <li>Audio workout guidance</li>
                <li>Captions for video content</li>
                <li>Multiple format options</li>
              </ul>
            </div>

            <div className="accessible-card">
              <h2>🧠 Cognitive Accessibility</h2>
              <p>We design with clarity and simplicity in mind. Complex information is broken down into digestible pieces with clear instructions and minimal jargon.</p>
              <ul>
                <li>Simple, clear language</li>
                <li>Step-by-step instructions</li>
                <li>Visual aids and diagrams</li>
                <li>Minimal cognitive load</li>
              </ul>
            </div>

            <div className="accessible-card">
              <h2>🌍 Language Support</h2>
              <p>Fitness shouldn't be limited by language barriers. We're committed to providing content in multiple languages to serve diverse communities.</p>
              <ul>
                <li>Multiple language options</li>
                <li>Translation services</li>
                <li>Culturally relevant content</li>
                <li>Global community support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="accessibility-features">
          <h2>Accessibility Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Keyboard Navigation</h3>
              <p>Navigate the entire platform using only your keyboard. All interactive elements are accessible via Tab key and Enter/Space to activate.</p>
            </div>
            <div className="feature-item">
              <h3>Color Contrast</h3>
              <p>All text meets WCAG AA standards for color contrast, ensuring readability for users with color blindness or low vision.</p>
            </div>
            <div className="feature-item">
              <h3>Focus Indicators</h3>
              <p>Clear visual indicators show which element has keyboard focus, making navigation transparent and predictable.</p>
            </div>
            <div className="feature-item">
              <h3>Responsive Design</h3>
              <p>Works seamlessly on all devices and screen sizes, from large desktop monitors to mobile phones and tablets.</p>
            </div>
            <div className="feature-item">
              <h3>Skip Links</h3>
              <p>Skip navigation links allow users to jump directly to main content, saving time for keyboard and screen reader users.</p>
            </div>
            <div className="feature-item">
              <h3>ARIA Labels</h3>
              <p>Proper ARIA labels and semantic HTML ensure screen readers can accurately describe all page elements and functionality.</p>
            </div>
          </div>
        </section>

        <section className="accessibility-commitment">
          <h2>Our Commitment</h2>
          <div className="commitment-content">
            <p>At AFYA, we believe fitness is a fundamental right, not a privilege. We're committed to:</p>
            <ul>
              <li>Continuously improving accessibility features based on user feedback</li>
              <li>Following WCAG 2.1 AA accessibility guidelines</li>
              <li>Testing with real users with disabilities</li>
              <li>Providing free resources for all fitness levels and abilities</li>
              <li>Building an inclusive community where everyone feels welcome</li>
              <li>Offering personalized support for users with specific needs</li>
            </ul>
          </div>
        </section>

        <section className="accessibility-contact">
          <h2>Need Help?</h2>
          <p>If you encounter any accessibility issues or have suggestions for improvement, we'd love to hear from you.</p>
          <div className="contact-methods">
            <div className="contact-method">
              <h3>📧 Email</h3>
              <p><a href="mailto:accessibility@theafya.org">accessibility@theafya.org</a></p>
            </div>
            <div className="contact-method">
              <h3>📞 Phone</h3>
              <p><a href="tel:+1-800-AFYA-123">+1-800-AFYA-123</a></p>
            </div>
            <div className="contact-method">
              <h3>💬 Chat</h3>
              <p>Available 24/7 for accessibility support</p>
            </div>
          </div>
        </section>

        <section className="accessibility-cta">
          <h2>Start Your Fitness Journey Today</h2>
          <p>No matter your abilities or limitations, AFYA has a program for you</p>
          <div className="cta-buttons">
            <a href="/workout-generator" className="btn btn-primary">Generate Workout</a>
            <a href="/signup" className="btn btn-secondary">Create Account</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Accessible;
