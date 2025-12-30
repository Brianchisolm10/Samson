import React from 'react';
import './LegalPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function TermsOfService() {
  return (
    <>
      <TopNav />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Terms of Service</h1>
            <p className="last-updated">Last Updated: December 2025</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and AFYA ("Company," "we," "us," or "our"). By accessing, browsing, or using the AFYA platform, website, mobile application, and all associated services (collectively, the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.
              </p>
              <p>
                If you do not agree to these Terms, you must immediately cease using the Service. Your continued use of the Service constitutes your acceptance of these Terms and any modifications we may make.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Eligibility & Account Registration</h2>
              
              <h3>2.1 Eligibility Requirements</h3>
              <p>To use AFYA, you must:</p>
              <ul className="legal-list">
                <li>Be at least 18 years of age (or the age of majority in your jurisdiction)</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be prohibited from using the Service under applicable laws</li>
                <li>Provide accurate, current, and complete information</li>
              </ul>

              <h3>2.2 Account Registration</h3>
              <p>
                When you create an account, you agree to provide truthful, accurate, and complete information. You are responsible for maintaining the confidentiality of your password and account credentials. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>

              <h3>2.3 Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without notice. Grounds for termination include, but are not limited to: violation of these Terms, illegal activity, abuse, or misuse of the Service.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Medical Disclaimer & Health Warnings</h2>
              
              <h3>3.1 Not Medical Advice</h3>
              <p>
                <strong>IMPORTANT:</strong> AFYA provides fitness and nutrition information for educational and informational purposes only. The content, recommendations, and tools provided by AFYA are NOT medical advice, medical treatment, or a substitute for professional medical advice, diagnosis, or treatment.
              </p>

              <h3>3.2 Consult Healthcare Professionals</h3>
              <p>
                Before beginning any fitness program, changing your diet, or using AFYA's recommendations, you should consult with a qualified healthcare provider, including a physician, registered dietitian, or certified fitness professional. This is especially important if you have:
              </p>
              <ul className="legal-list">
                <li>Pre-existing medical conditions</li>
                <li>Cardiovascular disease or risk factors</li>
                <li>Diabetes or metabolic disorders</li>
                <li>Joint, bone, or muscle problems</li>
                <li>Pregnancy or postpartum status</li>
                <li>Mental health conditions</li>
                <li>Eating disorders or disordered eating patterns</li>
                <li>Are taking medications that may affect exercise or nutrition</li>
              </ul>

              <h3>3.3 Assumption of Risk</h3>
              <p>
                You acknowledge that fitness activities and dietary changes carry inherent risks, including but not limited to injury, illness, or death. You assume all risks associated with your use of AFYA and any fitness or nutritional recommendations. You agree that AFYA is not responsible for any injuries or adverse effects resulting from your use of the Service.
              </p>

              <h3>3.4 Individual Variation</h3>
              <p>
                Results vary significantly between individuals based on genetics, lifestyle, adherence, and other factors. AFYA makes no guarantees regarding specific results or outcomes. Past results do not guarantee future results.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Intellectual Property Rights</h2>
              
              <h3>4.1 AFYA's Intellectual Property</h3>
              <p>
                All content on the AFYA platform, including but not limited to text, graphics, logos, images, videos, workout plans, meal plans, algorithms, software, and design elements, are the exclusive property of AFYA or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3>4.2 Limited License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works, or publicly display any content without our express written permission.
              </p>

              <h3>4.3 User-Generated Content</h3>
              <p>
                If you submit content to AFYA (comments, feedback, photos, etc.), you grant us a worldwide, royalty-free, perpetual license to use, reproduce, modify, and distribute such content. You represent that you own or have the right to grant such license.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Prohibited Conduct</h2>
              <p>You agree NOT to:</p>
              <ul className="legal-list">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights of AFYA or others</li>
                <li>Harass, threaten, defame, or abuse other users</li>
                <li>Engage in spam, phishing, or fraudulent activity</li>
                <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                <li>Reverse engineer, decompile, or attempt to discover source code</li>
                <li>Use automated tools, bots, or scrapers to access the Service</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Interfere with the operation or security of the Service</li>
                <li>Impersonate another person or entity</li>
                <li>Sell, trade, or transfer your account</li>
                <li>Use the Service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Limitation of Liability</h2>
              
              <h3>6.1 Disclaimer of Warranties</h3>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. AFYA DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3>6.2 Limitation of Damages</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, AFYA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR LOST BUSINESS OPPORTUNITIES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>

              <h3>6.3 Cap on Liability</h3>
              <p>
                AFYA'S TOTAL LIABILITY FOR ANY CLAIM ARISING FROM OR RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO AFYA IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>

              <h3>6.4 Exceptions</h3>
              <p>
                These limitations do not apply to: (a) death or personal injury caused by our negligence, (b) fraud or fraudulent misrepresentation, or (c) any liability that cannot be limited by applicable law.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless AFYA, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from or related to: (a) your use of the Service, (b) your violation of these Terms, (c) your violation of any applicable law, or (d) your infringement of any third-party rights.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Third-Party Content & Links</h2>
              <p>
                AFYA may contain links to third-party websites and services. We do not endorse, control, or assume responsibility for third-party content. Your use of third-party services is governed by their terms and privacy policies. We are not liable for any harm resulting from third-party content or services.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Payment & Billing</h2>
              
              <h3>9.1 Pricing</h3>
              <p>
                All prices are subject to change without notice. We will notify you of price changes before they take effect. Continued use of the Service after notification constitutes acceptance of new pricing.
              </p>

              <h3>9.2 Billing</h3>
              <p>
                You authorize AFYA to charge your payment method for any fees or charges incurred. You are responsible for maintaining accurate payment information. Failed payments may result in service suspension.
              </p>

              <h3>9.3 Refunds</h3>
              <p>
                Refund policies are detailed in our Refund Policy. Generally, we do not offer refunds for services already rendered, but we may offer refunds for unused services within 30 days of purchase at our discretion.
              </p>

              <h3>9.4 Taxes</h3>
              <p>
                You are responsible for any applicable taxes. We will collect and remit taxes as required by law.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Privacy & Data Protection</h2>
              <p>
                Your use of AFYA is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Modifications to Service</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We are not liable for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section className="legal-section">
              <h2>12. Modifications to Terms</h2>
              <p>
                We may modify these Terms at any time. Material changes will be posted on our website with an updated "Last Updated" date. Your continued use of the Service following notification of changes constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section className="legal-section">
              <h2>13. Governing Law & Dispute Resolution</h2>
              
              <h3>13.1 Governing Law</h3>
              <p>
                These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.
              </p>

              <h3>13.2 Arbitration</h3>
              <p>
                Any dispute arising from or relating to these Terms or the Service shall be resolved through binding arbitration, except for claims involving intellectual property rights or injunctive relief. Arbitration shall be conducted in accordance with the rules of [Arbitration Organization].
              </p>

              <h3>13.3 Class Action Waiver</h3>
              <p>
                You agree that any arbitration or legal proceeding shall be conducted on an individual basis and not as a class action, collective action, or representative action.
              </p>

              <h3>13.4 Exceptions</h3>
              <p>
                Notwithstanding the above, either party may seek injunctive relief in court for intellectual property infringement or other urgent matters.
              </p>
            </section>

            <section className="legal-section">
              <h2>14. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid, or if not possible, severed. The remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="legal-section">
              <h2>15. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and AFYA regarding the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="legal-section">
              <h2>16. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>AFYA Legal Team</strong></p>
                <p>Email: legal@afya.com</p>
                <p>Mailing Address: [Your Company Address]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfService;
