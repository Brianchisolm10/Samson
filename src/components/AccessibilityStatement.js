import React from 'react';
import './LegalPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function AccessibilityStatement() {
  return (
    <>
      <TopNav />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Accessibility Statement</h1>
            <p className="last-updated">Last Updated: December 2025</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Our Commitment to Accessibility</h2>
              <p>
                AFYA is committed to ensuring digital accessibility for people with disabilities. We believe that everyone deserves equal access to fitness and nutrition tools, regardless of their abilities. We are continuously working to improve the accessibility of our website and mobile application to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
              <p>
                This Accessibility Statement outlines our commitment, current accessibility features, known limitations, and how to report accessibility issues.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Accessibility Standards & Compliance</h2>
              
              <h3>2.1 Standards We Follow</h3>
              <p>AFYA aims to comply with the following accessibility standards:</p>
              <ul className="legal-list">
                <li><strong>WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines published by the World Wide Web Consortium (W3C)</li>
                <li><strong>Section 508:</strong> U.S. federal law requiring accessibility of electronic and information technology</li>
                <li><strong>ADA Compliance:</strong> Americans with Disabilities Act requirements for digital accessibility</li>
                <li><strong>AODA:</strong> Accessibility for Ontarians with Disabilities Act (for Canadian users)</li>
              </ul>

              <h3>2.2 Compliance Status</h3>
              <p>
                AFYA is currently working toward full WCAG 2.1 Level AA compliance. We have implemented many accessibility features and continue to identify and remediate accessibility barriers. We conduct regular accessibility audits and user testing with people with disabilities.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Accessibility Features</h2>
              
              <h3>3.1 Visual Accessibility</h3>
              <ul className="legal-list">
                <li><strong>High Contrast Mode:</strong> Option to enable high contrast colors for better visibility</li>
                <li><strong>Adjustable Font Sizes:</strong> Users can increase or decrease text size</li>
                <li><strong>Color Blind Friendly:</strong> Color schemes designed to be distinguishable for color blind users</li>
                <li><strong>Alt Text:</strong> All images include descriptive alternative text</li>
                <li><strong>Readable Fonts:</strong> Sans-serif fonts chosen for readability</li>
                <li><strong>Sufficient Color Contrast:</strong> Text and background colors meet WCAG contrast requirements</li>
              </ul>

              <h3>3.2 Keyboard Navigation</h3>
              <ul className="legal-list">
                <li><strong>Full Keyboard Access:</strong> All features accessible via keyboard without requiring a mouse</li>
                <li><strong>Tab Navigation:</strong> Logical tab order through interactive elements</li>
                <li><strong>Focus Indicators:</strong> Clear visual indicators showing which element has keyboard focus</li>
                <li><strong>Keyboard Shortcuts:</strong> Common keyboard shortcuts available (e.g., Ctrl+S to save)</li>
                <li><strong>Skip Links:</strong> "Skip to main content" links to bypass repetitive navigation</li>
              </ul>

              <h3>3.3 Screen Reader Compatibility</h3>
              <ul className="legal-list">
                <li><strong>ARIA Labels:</strong> Semantic HTML and ARIA labels for screen reader users</li>
                <li><strong>Form Labels:</strong> All form fields properly labeled and associated</li>
                <li><strong>Heading Structure:</strong> Proper heading hierarchy for easy navigation</li>
                <li><strong>List Markup:</strong> Lists properly marked up for screen reader interpretation</li>
                <li><strong>Tested with:</strong> NVDA, JAWS, and VoiceOver screen readers</li>
              </ul>

              <h3>3.4 Motor & Mobility Accessibility</h3>
              <ul className="legal-list">
                <li><strong>Large Click Targets:</strong> Buttons and links sized for easy clicking</li>
                <li><strong>Spacing:</strong> Adequate spacing between interactive elements</li>
                <li><strong>Voice Control:</strong> Compatible with voice control software</li>
                <li><strong>Switch Control:</strong> Compatible with switch access devices</li>
                <li><strong>No Time Limits:</strong> No forced time limits on interactions (except where necessary for security)</li>
              </ul>

              <h3>3.5 Cognitive Accessibility</h3>
              <ul className="legal-list">
                <li><strong>Clear Language:</strong> Simple, clear language avoiding jargon where possible</li>
                <li><strong>Consistent Navigation:</strong> Consistent layout and navigation patterns</li>
                <li><strong>Error Prevention:</strong> Clear error messages and suggestions for correction</li>
                <li><strong>Predictable Behavior:</strong> Features behave predictably and consistently</li>
                <li><strong>Glossary:</strong> Definitions available for technical terms</li>
              </ul>

              <h3>3.6 Hearing Accessibility</h3>
              <ul className="legal-list">
                <li><strong>Captions:</strong> All video content includes accurate captions</li>
                <li><strong>Transcripts:</strong> Audio content includes transcripts</li>
                <li><strong>Visual Alerts:</strong> Important notifications include visual indicators, not just audio</li>
                <li><strong>No Audio-Only Content:</strong> Critical information is not conveyed through audio alone</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Known Accessibility Limitations</h2>
              <p>
                While we strive for full accessibility, some limitations currently exist:
              </p>
              <ul className="legal-list">
                <li><strong>Third-Party Integrations:</strong> Some third-party tools and widgets may not be fully accessible</li>
                <li><strong>PDF Documents:</strong> Some older PDF documents may not be fully accessible (we are working to remediate these)</li>
                <li><strong>Video Content:</strong> Some older videos may lack captions (we are adding captions to all content)</li>
                <li><strong>Complex Data Visualizations:</strong> Some charts and graphs may require alternative text descriptions</li>
                <li><strong>Mobile App:</strong> Mobile app accessibility is being improved in ongoing updates</li>
              </ul>
              <p>
                We are actively working to address these limitations and appreciate your patience as we improve.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Accessibility Tools & Settings</h2>
              
              <h3>5.1 Browser Accessibility Features</h3>
              <p>
                Most modern browsers include built-in accessibility features. We recommend:
              </p>
              <ul className="legal-list">
                <li><strong>Chrome:</strong> Settings → Accessibility</li>
                <li><strong>Firefox:</strong> Preferences → General → Browsing</li>
                <li><strong>Safari:</strong> System Preferences → Accessibility</li>
                <li><strong>Edge:</strong> Settings → Accessibility</li>
              </ul>

              <h3>5.2 Operating System Accessibility</h3>
              <p>
                Your device's operating system includes accessibility features:
              </p>
              <ul className="legal-list">
                <li><strong>Windows:</strong> Settings → Ease of Access</li>
                <li><strong>macOS:</strong> System Preferences → Accessibility</li>
                <li><strong>iOS:</strong> Settings → Accessibility</li>
                <li><strong>Android:</strong> Settings → Accessibility</li>
              </ul>

              <h3>5.3 Assistive Technology</h3>
              <p>
                AFYA is compatible with popular assistive technologies:
              </p>
              <ul className="legal-list">
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Speech recognition software (Dragon NaturallySpeaking)</li>
                <li>Switch access devices</li>
                <li>Eye tracking software</li>
                <li>Text-to-speech tools</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Accessibility for Specific Disabilities</h2>
              
              <h3>6.1 Visual Impairments</h3>
              <p>
                Users with visual impairments can use AFYA with screen readers. We recommend:
              </p>
              <ul className="legal-list">
                <li>Using a screen reader (NVDA, JAWS, or VoiceOver)</li>
                <li>Enabling high contrast mode in your browser or operating system</li>
                <li>Increasing font size through browser zoom or accessibility settings</li>
                <li>Using browser extensions for additional magnification if needed</li>
              </ul>

              <h3>6.2 Hearing Impairments</h3>
              <p>
                Users with hearing impairments can access AFYA through:
              </p>
              <ul className="legal-list">
                <li>Reading captions on all video content</li>
                <li>Reading transcripts of audio content</li>
                <li>Using visual indicators for notifications and alerts</li>
              </ul>

              <h3>6.3 Motor Impairments</h3>
              <p>
                Users with motor impairments can access AFYA through:
              </p>
              <ul className="legal-list">
                <li>Full keyboard navigation without requiring a mouse</li>
                <li>Voice control software compatibility</li>
                <li>Switch access device compatibility</li>
                <li>Large, well-spaced interactive elements</li>
              </ul>

              <h3>6.4 Cognitive Disabilities</h3>
              <p>
                Users with cognitive disabilities benefit from:
              </p>
              <ul className="legal-list">
                <li>Clear, simple language</li>
                <li>Consistent, predictable navigation</li>
                <li>Clear error messages and guidance</li>
                <li>Ability to save progress and return later</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Reporting Accessibility Issues</h2>
              
              <h3>7.1 How to Report</h3>
              <p>
                If you encounter accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>AFYA Accessibility Team</strong></p>
                <p>Email: accessibility@afya.com</p>
                <p>Phone: [Your Phone Number]</p>
                <p>Mailing Address: [Your Company Address]</p>
              </div>

              <h3>7.2 What to Include</h3>
              <p>
                When reporting an accessibility issue, please include:
              </p>
              <ul className="legal-list">
                <li>Description of the accessibility barrier</li>
                <li>Page or feature where the issue occurs</li>
                <li>Your browser and operating system</li>
                <li>Assistive technology you're using (if applicable)</li>
                <li>Steps to reproduce the issue</li>
                <li>Your contact information (optional)</li>
              </ul>

              <h3>7.3 Response Time</h3>
              <p>
                We aim to acknowledge accessibility reports within 2 business days and provide updates on remediation efforts within 10 business days.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Accessibility Roadmap</h2>
              <p>
                We are committed to continuous improvement. Our accessibility roadmap includes:
              </p>
              <ul className="legal-list">
                <li>Full WCAG 2.1 Level AA compliance by [Target Date]</li>
                <li>Regular accessibility audits (quarterly)</li>
                <li>User testing with people with disabilities (semi-annually)</li>
                <li>Accessibility training for all development team members</li>
                <li>Automated accessibility testing in our development process</li>
                <li>Accessibility documentation and guides for users</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>9. Third-Party Content</h2>
              <p>
                AFYA may contain links to third-party websites and services. We are not responsible for the accessibility of third-party content. However, we encourage all partners to maintain accessibility standards.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Accessibility Resources</h2>
              
              <h3>10.1 External Resources</h3>
              <ul className="legal-list">
                <li><strong>WebAIM:</strong> Web Accessibility In Mind - www.webaim.org</li>
                <li><strong>W3C WCAG:</strong> Web Content Accessibility Guidelines - www.w3.org/WAI/WCAG21/quickref/</li>
                <li><strong>Section 508:</strong> U.S. Federal Accessibility Standards - www.section508.gov</li>
                <li><strong>AODA:</strong> Accessibility for Ontarians with Disabilities Act - www.aoda.ca</li>
              </ul>

              <h3>10.2 Assistive Technology Resources</h3>
              <ul className="legal-list">
                <li><strong>NVDA:</strong> Free screen reader - www.nvaccess.org</li>
                <li><strong>JAWS:</strong> Commercial screen reader - www.freedomscientific.com</li>
                <li><strong>VoiceOver:</strong> Built into Apple devices</li>
                <li><strong>Narrator:</strong> Built into Windows devices</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>11. Feedback & Suggestions</h2>
              <p>
                We welcome feedback and suggestions for improving accessibility. Even if you don't encounter barriers, your suggestions help us serve all users better. Please contact our accessibility team with any ideas.
              </p>
            </section>

            <section className="legal-section">
              <h2>12. Policy Updates</h2>
              <p>
                This Accessibility Statement may be updated periodically as we improve our accessibility features and practices. We will notify users of significant changes.
              </p>
            </section>

            <section className="legal-section">
              <h2>13. Contact Information</h2>
              <p>
                For accessibility questions or concerns, please contact:
              </p>
              <div className="contact-info">
                <p><strong>AFYA Accessibility Team</strong></p>
                <p>Email: accessibility@afya.com</p>
                <p>Response Time: We aim to respond within 2 business days</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccessibilityStatement;
