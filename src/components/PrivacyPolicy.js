import React from 'react';
import './LegalPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function PrivacyPolicy() {
  return (
    <>
      <TopNav />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: December 2025</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                AFYA ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including our fitness and nutrition planning tools.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services. By accessing and using AFYA, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Information You Provide Directly</h3>
              <ul className="legal-list">
                <li><strong>Account Registration:</strong> When you create an account, we collect your name, email address, password, date of birth, gender, and contact information.</li>
                <li><strong>Health & Fitness Information:</strong> We collect detailed health data including height, weight, fitness level, medical history, dietary restrictions, allergies, fitness goals, and training preferences.</li>
                <li><strong>Nutritional Data:</strong> Information about your dietary habits, food preferences, caloric intake, macronutrient targets, and meal plan selections.</li>
                <li><strong>Workout Information:</strong> Data about your exercise preferences, workout history, performance metrics, and training goals.</li>
                <li><strong>Payment Information:</strong> If you make purchases, we collect billing address, payment method details (processed securely through third-party payment processors).</li>
                <li><strong>Communication Data:</strong> Messages, feedback, support requests, and any other communications you send us.</li>
              </ul>

              <h3>2.2 Information Collected Automatically</h3>
              <ul className="legal-list">
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, and unique device identifiers.</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform, clicks, searches, and interaction patterns.</li>
                <li><strong>Location Data:</strong> General location information based on IP address (not precise GPS tracking without consent).</li>
                <li><strong>Cookies & Tracking:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and analyze usage patterns.</li>
              </ul>

              <h3>2.3 Information from Third Parties</h3>
              <ul className="legal-list">
                <li>Social media platforms (if you link your account)</li>
                <li>Third-party fitness trackers and health apps</li>
                <li>Payment processors and financial institutions</li>
                <li>Analytics providers and advertising partners</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="legal-list">
                <li><strong>Service Delivery:</strong> Creating and maintaining your account, generating personalized workout and meal plans, providing fitness recommendations.</li>
                <li><strong>Personalization:</strong> Tailoring content, features, and recommendations based on your preferences and goals.</li>
                <li><strong>Communication:</strong> Sending service updates, newsletters, promotional materials, and responding to your inquiries.</li>
                <li><strong>Health & Safety:</strong> Monitoring for suspicious activity, preventing fraud, and ensuring platform security.</li>
                <li><strong>Analytics & Improvement:</strong> Analyzing usage patterns to improve our services, features, and user experience.</li>
                <li><strong>Legal Compliance:</strong> Complying with applicable laws, regulations, and legal processes.</li>
                <li><strong>Marketing:</strong> With your consent, sending targeted advertisements and promotional content.</li>
                <li><strong>Research:</strong> Conducting anonymized research to advance fitness and nutrition science.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. How We Share Your Information</h2>
              
              <h3>4.1 We Do NOT Sell Your Data</h3>
              <p>
                AFYA does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your privacy is paramount to us.
              </p>

              <h3>4.2 We May Share Information With:</h3>
              <ul className="legal-list">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our platform, processing payments, sending communications, and analyzing data (all bound by confidentiality agreements).</li>
                <li><strong>Healthcare Professionals:</strong> If you authorize us to share information with your doctor or nutritionist.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
                <li><strong>Business Transfers:</strong> In the event of merger, acquisition, bankruptcy, or sale of assets.</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Data Security</h2>
              <p>
                We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="legal-list">
                <li>SSL/TLS encryption for all data in transit</li>
                <li>Encrypted storage for sensitive personal and health information</li>
                <li>Regular security audits and penetration testing</li>
                <li>Strict access controls and employee confidentiality agreements</li>
                <li>Multi-factor authentication options for account protection</li>
                <li>Compliance with industry security standards (HIPAA-aligned practices)</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. You use our services at your own risk.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Your Privacy Rights</h2>
              
              <h3>6.1 Access & Portability</h3>
              <p>You have the right to request a copy of all personal information we hold about you in a portable format.</p>

              <h3>6.2 Correction & Deletion</h3>
              <p>You can request correction of inaccurate information or deletion of your account and associated data (subject to legal retention requirements).</p>

              <h3>6.3 Opt-Out</h3>
              <p>You can opt out of marketing communications, cookies, and certain data collection practices through your account settings or by contacting us.</p>

              <h3>6.4 Do Not Track</h3>
              <p>Some browsers include a "Do Not Track" feature. Our platform does not currently respond to DNT signals, but you can control cookies through browser settings.</p>

              <h3>6.5 California Privacy Rights (CCPA)</h3>
              <p>
                If you are a California resident, you have specific rights under the California Consumer Privacy Act, including the right to know, delete, and opt-out of the sale of personal information.
              </p>

              <h3>6.6 European Privacy Rights (GDPR)</h3>
              <p>
                If you are located in the EU, you have rights under the General Data Protection Regulation, including data access, rectification, erasure, and data portability.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Cookies & Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, remember preferences, and analyze usage:
              </p>
              <ul className="legal-list">
                <li><strong>Essential Cookies:</strong> Required for platform functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Disabling cookies may affect platform functionality.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Third-Party Links & Services</h2>
              <p>
                Our platform may contain links to third-party websites and services. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Children's Privacy</h2>
              <p>
                AFYA is not intended for children under 13 years of age. We do not knowingly collect information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately. Parents or guardians who believe their child has provided information to us should contact us immediately.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your account at any time, subject to legal retention requirements (e.g., tax records, fraud prevention).
              </p>
            </section>

            <section className="legal-section">
              <h2>11. International Data Transfers</h2>
              <p>
                Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using AFYA, you consent to such transfers.
              </p>
            </section>

            <section className="legal-section">
              <h2>12. Policy Updates</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of AFYA following such notification constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="legal-section">
              <h2>13. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, wish to exercise your privacy rights, or have concerns about our privacy practices, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>AFYA Privacy Team</strong></p>
                <p>Email: privacy@afya.com</p>
                <p>Mailing Address: [Your Company Address]</p>
                <p>Response Time: We aim to respond to all privacy inquiries within 30 days</p>
              </div>
            </section>

            <section className="legal-section">
              <h2>14. Additional Information</h2>
              <p>
                <strong>Data Protection Officer:</strong> For EU residents, you may contact our Data Protection Officer at dpo@afya.com
              </p>
              <p>
                <strong>Dispute Resolution:</strong> If you are not satisfied with our response to your privacy concerns, you may have the right to lodge a complaint with your local data protection authority.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
