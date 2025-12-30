import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './HelpPages.css';
import TopNav from './TopNav';
import Footer from './Footer';

function HelpTopics() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get search query from URL params
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredArticles([]);
      return;
    }

    const results = [];
    topics.forEach(topic => {
      topic.articles.forEach(article => {
        if (
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            ...article,
            topicId: topic.id,
            topicTitle: topic.title,
            topicIcon: topic.icon
          });
        }
      });
    });
    setFilteredArticles(results);
  };

  const topics = [
    {
      id: 'workouts',
      title: 'Workouts',
      icon: '',
      description: 'Everything about generating, customizing, and tracking your workout programs',
      articles: [
        {
          title: 'How to Generate a Personalized Workout',
          content: 'Click on "Generate Workout" from the hub and answer our 3-step questionnaire about your fitness level, goals, and available equipment. Our AI will create a customized program tailored to your needs.'
        },
        {
          title: 'Understanding Workout Structure',
          content: 'Each workout includes warm-up, main exercises with sets/reps, and cool-down. Exercises are organized by muscle groups and intensity levels to maximize results while minimizing injury risk.'
        },
        {
          title: 'Modifying Your Workouts',
          content: 'Feel free to adjust exercises, sets, reps, or rest periods based on your preferences. You can swap similar exercises or adjust intensity to match your current fitness level.'
        },
        {
          title: 'Progressive Overload Tips',
          content: 'Gradually increase weight, reps, or sets over time. Track your progress and aim to improve by 5-10% every 2-3 weeks for consistent gains.'
        },
        {
          title: 'Recovery and Rest Days',
          content: 'Rest days are crucial for muscle growth. Our programs include strategic rest days. Listen to your body and take extra rest if needed.'
        }
      ]
    },
    {
      id: 'meal-plans',
      title: 'Meal Plans',
      icon: '',
      description: 'Nutrition guidance, meal planning, and dietary preferences',
      articles: [
        {
          title: 'Generating Your Meal Plan',
          content: 'Select your dietary preference (omnivore, vegetarian, vegan, keto, paleo) and answer questions about your goals and calorie needs. We\'ll create a balanced meal plan for you.'
        },
        {
          title: 'Understanding Macronutrients',
          content: 'Proteins build muscle, carbs provide energy, and fats support hormones. Our plans use evidence-based macro ratios optimized for your fitness goals.'
        },
        {
          title: 'Meal Prep Strategies',
          content: 'Prepare meals in bulk on weekends. Store in containers and reheat throughout the week. This saves time and ensures you stick to your nutrition plan.'
        },
        {
          title: 'Dietary Preferences and Restrictions',
          content: 'We support omnivore, vegetarian, vegan, keto, and paleo diets. Let us know about allergies or restrictions, and we\'ll customize your meals accordingly.'
        },
        {
          title: 'Adjusting Portions and Calories',
          content: 'If you\'re not seeing results, adjust portions slightly. Increase calories if losing too much weight, decrease if gaining unwanted fat.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account',
      icon: '',
      description: 'Profile management, settings, and account security',
      articles: [
        {
          title: 'Creating Your Account',
          content: 'Sign up with your email and create a secure password. You can also use social login options for faster registration.'
        },
        {
          title: 'Updating Your Profile',
          content: 'Go to Settings > Profile to update your personal information, fitness goals, and preferences. Changes take effect immediately.'
        },
        {
          title: 'Saving Your Programs',
          content: 'Create an account to save multiple workouts and meal plans. Access them anytime and track how your programs evolve as you progress.'
        },
        {
          title: 'Password and Security',
          content: 'Use a strong password with uppercase, lowercase, numbers, and symbols. Enable two-factor authentication for added security.'
        },
        {
          title: 'Deleting Your Account',
          content: 'Go to Settings > Account > Delete Account. This action is permanent and will remove all your data. Download your data first if needed.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: '',
      description: 'Subscriptions, payments, and billing information',
      articles: [
        {
          title: 'Subscription Plans',
          content: 'We offer Free, Pro, and Premium plans. Free includes basic features, Pro adds advanced analytics, and Premium includes personal coaching.'
        },
        {
          title: 'Upgrading Your Plan',
          content: 'Go to Settings > Billing > Upgrade Plan. Choose your desired plan and complete payment. Upgrades take effect immediately.'
        },
        {
          title: 'Managing Payment Methods',
          content: 'Add, update, or remove payment methods in Settings > Billing. We accept all major credit cards and digital wallets.'
        },
        {
          title: 'Canceling Your Subscription',
          content: 'You can cancel anytime in Settings > Billing > Manage Subscription. Your access continues until the end of your billing period.'
        },
        {
          title: 'Refund Policy',
          content: 'We offer a 30-day money-back guarantee. Contact support within 30 days of purchase for a full refund, no questions asked.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical',
      icon: '',
      description: 'Technical issues, performance, and troubleshooting',
      articles: [
        {
          title: 'Browser Compatibility',
          content: 'AFYA works best on Chrome, Firefox, Safari, and Edge. Ensure your browser is up to date for optimal performance.'
        },
        {
          title: 'Clearing Cache and Cookies',
          content: 'If experiencing issues, clear your browser cache and cookies. This often resolves loading problems and improves performance.'
        },
        {
          title: 'Slow Performance',
          content: 'Check your internet connection speed. Disable browser extensions that might interfere. Try accessing from a different device to isolate the issue.'
        },
        {
          title: 'Login Issues',
          content: 'Ensure caps lock is off. Try resetting your password. Clear cookies and try again. Contact support if problems persist.'
        },
        {
          title: 'Mobile Responsiveness',
          content: 'AFYA is fully responsive on mobile devices. Rotate your device to landscape for better viewing of detailed charts and data.'
        }
      ]
    },
    {
      id: 'general',
      title: 'General',
      icon: '',
      description: 'General questions and getting started',
      articles: [
        {
          title: 'What is AFYA?',
          content: 'AFYA is an AI-powered fitness platform that generates personalized workouts and meal plans based on your goals, fitness level, and preferences.'
        },
        {
          title: 'Do I Need an Account?',
          content: 'No! You can generate workouts and meal plans without an account. However, creating an account lets you save programs and track progress over time.'
        },
        {
          title: 'How Accurate Are the Calculations?',
          content: 'We use scientifically-backed formulas like Mifflin-St Jeor for BMR calculations and evidence-based macro ratios. Results are personalized to your data.'
        },
        {
          title: 'Is There a Mobile App?',
          content: 'AFYA is currently available as a web application accessible on any device with a browser. Native iOS and Android apps are in development.'
        },
        {
          title: 'How Can I Get Started?',
          content: 'Visit the hub, click "Generate Workout" or "Generate Meal Plan", and answer the questionnaire. You\'ll have a personalized program in minutes!'
        }
      ]
    }
  ];

  return (
    <>
      <TopNav />
      <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div className="help-page">
        <section className="help-hero">
          <h2 className="hero-subtitle">HELP CENTER</h2>
          <h1>Browse Topics</h1>
          <p className="hero-description">Find detailed information about each feature</p>
        </section>

        <div className="help-content">
          <div className="search-bar-container">
            <input
              type="text"
              className="help-search-bar"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {searchQuery && filteredArticles.length > 0 ? (
            <div className="search-results">
              <h3 className="results-title">Search Results ({filteredArticles.length})</h3>
              <div className="results-list">
                {filteredArticles.map((article, idx) => (
                  <div key={idx} className="search-result-card">
                    <div className="result-topic">
                      <span className="result-topic-name">{article.topicTitle}</span>
                    </div>
                    <h4>{article.title}</h4>
                    <p>{article.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery && filteredArticles.length === 0 ? (
            <div className="no-results">
              <p>No articles found matching "{searchQuery}"</p>
            </div>
          ) : (
            <>
              <div className="topics-sidebar">
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    className={`topic-button ${selectedTopic?.id === topic.id ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <span className="topic-name">{topic.title}</span>
                  </button>
                ))}
              </div>

              <div className="topics-main">
                {selectedTopic ? (
                  <div className="topic-detail">
                    <div className="topic-header">
                      <h2>{selectedTopic.title}</h2>
                      <p>{selectedTopic.description}</p>
                    </div>

                    <div className="articles-list">
                      {selectedTopic.articles.map((article, idx) => (
                        <div key={idx} className="article-card">
                          <h3>{article.title}</h3>
                          <p>{article.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-selection">
                    <p>Select a topic from the left to view articles</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpTopics;
