import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function FrequentlyAsked() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData = [
    {
      category: 'getting-started',
      categoryName: 'Getting Started',
      icon: '',
      questions: [
        {
          q: 'Do I need an account to use AFYA?',
          a: 'No! You can generate workouts and meal plans without an account. However, creating an account allows you to save your programs and track your progress over time.'
        },
        {
          q: 'How do I generate a workout?',
          a: 'Click on "Generate Workout" from the hub, answer a quick 3-step questionnaire about your fitness level, goals, and available equipment, and we\'ll create a personalized program for you.'
        },
        {
          q: 'How do I generate a meal plan?',
          a: 'Select "Generate Meal Plan", choose your dietary preference, and answer questions about your goals and calorie needs. We\'ll create a balanced meal plan tailored to you.'
        },
        {
          q: 'How long does it take to generate a program?',
          a: 'Most programs are generated in under 2 minutes. The time depends on the complexity of your preferences and the amount of customization you request.'
        }
      ]
    },
    {
      category: 'workouts',
      categoryName: 'Workouts',
      icon: '',
      questions: [
        {
          q: 'Can I modify the workout programs?',
          a: 'Absolutely! The programs are starting points. Feel free to adjust exercises, sets, reps, or rest periods based on your preferences and how your body responds to training.'
        },
        {
          q: 'How often should I work out?',
          a: 'This depends on your fitness level and goals. Our programs typically recommend 3-6 days per week. Beginners should start with 3 days, while advanced lifters can do 5-6 days.'
        },
        {
          q: 'What if I don\'t have access to certain equipment?',
          a: 'Tell us what equipment you have available during the questionnaire. We\'ll create a program using only the equipment you have access to.'
        },
        {
          q: 'How do I track my progress?',
          a: 'Create a profile to save your programs and track metrics over time. Monitor your strength gains, body composition changes, and workout consistency through your saved programs.'
        },
        {
          q: 'What is progressive overload?',
          a: 'Progressive overload means gradually increasing the challenge of your workouts by adding weight, reps, sets, or reducing rest periods. This is key to continuous improvement.'
        }
      ]
    },
    {
      category: 'nutrition',
      categoryName: 'Nutrition & Meal Plans',
      icon: '',
      questions: [
        {
          q: 'How accurate are the calorie calculations?',
          a: 'We use scientifically-backed formulas like the Mifflin-St Jeor equation for BMR calculations and evidence-based macro ratios. Results are personalized based on your specific data and training goals.'
        },
        {
          q: 'What dietary preferences do you support?',
          a: 'We support omnivore, vegetarian, vegan, keto, and paleo diets. You can also specify allergies and restrictions, and we\'ll customize your meals accordingly.'
        },
        {
          q: 'Can I adjust portion sizes?',
          a: 'Yes! If you\'re not seeing results, adjust portions slightly. Increase calories if losing too much weight, decrease if gaining unwanted fat.'
        },
        {
          q: 'How do I meal prep?',
          a: 'Prepare meals in bulk on weekends. Store in containers and reheat throughout the week. This saves time and ensures you stick to your nutrition plan.'
        },
        {
          q: 'What if I have food allergies?',
          a: 'Let us know about your allergies during the questionnaire. We\'ll exclude those ingredients and suggest alternatives that fit your dietary needs.'
        }
      ]
    },
    {
      category: 'account',
      categoryName: 'Account & Settings',
      icon: '',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up", enter your email, create a secure password, and verify your email. You can also use social login options for faster registration.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox. The reset link expires after 24 hours.'
        },
        {
          q: 'Can I change my email address?',
          a: 'Yes! Go to Settings > Profile > Email and enter your new email. You\'ll need to verify the new email address before the change takes effect.'
        },
        {
          q: 'How do I delete my account?',
          a: 'Go to Settings > Account > Delete Account. This action is permanent and will remove all your data. Download your data first if needed.'
        },
        {
          q: 'Is my data secure?',
          a: 'Yes! We use industry-standard encryption and security practices. Your data is never shared with third parties without your consent.'
        }
      ]
    },
    {
      category: 'billing',
      categoryName: 'Billing & Subscriptions',
      icon: '',
      questions: [
        {
          q: 'What subscription plans do you offer?',
          a: 'We offer Free, Pro, and Premium plans. Free includes basic features, Pro adds advanced analytics, and Premium includes personal coaching.'
        },
        {
          q: 'Can I upgrade or downgrade my plan?',
          a: 'Yes! You can change your plan anytime in Settings > Billing. Upgrades take effect immediately, downgrades take effect at the end of your billing period.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets (Apple Pay, Google Pay).'
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Yes! You can cancel anytime in Settings > Billing > Manage Subscription. Your access continues until the end of your billing period.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 30-day money-back guarantee. Contact support within 30 days of purchase for a full refund, no questions asked.'
        }
      ]
    },
    {
      category: 'technical',
      categoryName: 'Technical Support',
      icon: '',
      questions: [
        {
          q: 'What browsers does AFYA support?',
          a: 'AFYA works best on Chrome, Firefox, Safari, and Edge. Ensure your browser is up to date for optimal performance.'
        },
        {
          q: 'Is there a mobile app?',
          a: 'AFYA is currently available as a web application accessible on any device with a browser. Native iOS and Android apps are in development.'
        },
        {
          q: 'Why is AFYA loading slowly?',
          a: 'Check your internet connection speed. Disable browser extensions that might interfere. Try accessing from a different device to isolate the issue.'
        },
        {
          q: 'I\'m having login issues. What should I do?',
          a: 'Ensure caps lock is off. Try resetting your password. Clear cookies and try again. Contact support if problems persist.'
        },
        {
          q: 'How do I clear my browser cache?',
          a: 'In Chrome: Settings > Privacy > Clear browsing data. In Firefox: History > Clear Recent History. In Safari: History > Clear History.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const categories = [
    { id: 'all', name: 'All Topics' },
    ...faqData.map(cat => ({ id: cat.category, name: cat.categoryName }))
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqData.flatMap(cat => cat.questions.map((q, idx) => ({ ...q, category: cat.category, globalIdx: `${cat.category}-${idx}` })))
    : faqData.find(cat => cat.category === selectedCategory)?.questions.map((q, idx) => ({ ...q, category: selectedCategory, globalIdx: `${selectedCategory}-${idx}` })) || [];

  return (
    <>
      <TopNav />
      <div className="help-page">
        <Link to="/contact" className="back-button">← Back to Support</Link>
        <section className="help-hero">
          <h2 className="hero-subtitle">HELP CENTER</h2>
          <h1>Frequently Asked Questions</h1>
          <p className="hero-description">Find answers to common questions</p>
        </section>

        <div className="faq-page-content">
          <div className="faq-categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="category-name">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="faq-list-container">
            {filteredFaqs.length > 0 ? (
              <div className="faq-list">
                {filteredFaqs.map((item, index) => (
                  <div key={item.globalIdx} className="faq-item">
                    <button
                      className={`faq-question ${expandedFaq === item.globalIdx ? 'active' : ''}`}
                      onClick={() => toggleFaq(item.globalIdx)}
                    >
                      <span className="faq-text">{item.q}</span>
                      <span className="faq-toggle">{expandedFaq === item.globalIdx ? '−' : '+'}</span>
                    </button>
                    {expandedFaq === item.globalIdx && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No FAQs found for this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FrequentlyAsked;
