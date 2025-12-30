import React, { useState } from 'react';
import TopNav from './TopNav';
import Footer from './Footer';
import './Resources.css';

function Resources() {
  const [activeCategory, setActiveCategory] = useState('training');

  const categories = [
    {
      id: 'training',
      title: 'Training & Movement',
      subtitle: 'How the body gets stronger, faster, and more resilient',
      topics: [
        'Physical activity guidelines (youth, adults, older adults)',
        'Strength training basics (frequency, intensity, rest)',
        'Cardiovascular fitness & endurance',
        'Flexibility, mobility, and warm-ups',
        'Injury prevention principles',
        'Training for beginners vs advanced individuals'
      ],
      resources: [
        { name: 'CDC & WHO activity guidelines', type: 'External' },
        { name: 'NSCA-style training concepts', type: 'Guide' },
        { name: 'Exercise explanations and movement patterns', type: 'Education' }
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Fueling',
      subtitle: 'How food supports health, energy, and performance',
      topics: [
        'Balanced meals & portioning',
        'Macronutrients (protein, carbs, fats)',
        'Micronutrients (vitamins & minerals)',
        'Hydration & electrolytes',
        'Nutrition for different goals (energy, fat loss, muscle gain)',
        'Cultural and dietary preferences'
      ],
      resources: [
        { name: 'USDA MyPlate tools and guides', type: 'External' },
        { name: 'NIH dietary supplement fact sheets', type: 'Reference' },
        { name: 'Simple meal-building frameworks', type: 'Guide' }
      ]
    },
    {
      id: 'recovery',
      title: 'Recovery, Sleep & Stress',
      subtitle: 'How the body repairs, adapts, and stays healthy',
      topics: [
        'Sleep duration & quality',
        'Stress and physical recovery',
        'Overtraining vs productive fatigue',
        'Active recovery',
        'Rest days and deloads'
      ],
      resources: [
        { name: 'CDC sleep education', type: 'External' },
        { name: 'NIH emotional wellness tools', type: 'Tool' },
        { name: 'Evidence-based recovery principles', type: 'Guide' }
      ]
    },
    {
      id: 'mental',
      title: 'Mental Wellness & Lifestyle',
      subtitle: 'The mind–body connection in long-term wellness',
      topics: [
        'Stress management',
        'Motivation & habit formation',
        'Mental health awareness',
        'Emotional regulation',
        'Balance between life, work, and training'
      ],
      resources: [
        { name: 'NIMH public mental health resources', type: 'External' },
        { name: 'NIH emotional wellness toolkits', type: 'Tool' },
        { name: 'Behavior change fundamentals', type: 'Guide' }
      ]
    },
    {
      id: 'special',
      title: 'Special Populations & Conditions',
      subtitle: 'Adapting health and fitness to real life',
      topics: [
        'Youth & adolescents',
        'Older adults',
        'Chronic conditions (hypertension, diabetes, arthritis, MS, etc.)',
        'Injury history & pain-aware movement',
        'Return-to-activity principles'
      ],
      resources: [
        { name: 'CDC & NIH condition-specific education', type: 'External' },
        { name: 'MedlinePlus medical explainers', type: 'Reference' },
        { name: 'General safety and adaptation principles', type: 'Guide' }
      ]
    },
    {
      id: 'athletes',
      title: 'Athletes & Performance',
      subtitle: 'For those training with sport or competition in mind',
      topics: [
        'Speed, power, and agility concepts',
        'Strength training for athletes',
        'Conditioning and energy systems',
        'In-season vs off-season training',
        'Youth athlete development principles'
      ],
      resources: [
        { name: 'WHO/CDC youth activity data', type: 'External' },
        { name: 'Research summaries (plain language)', type: 'Guide' },
        { name: 'Performance training education', type: 'Education' }
      ]
    },
    {
      id: 'research',
      title: 'Research & Science Corner',
      subtitle: 'Where our recommendations come from',
      topics: [
        'How to read fitness & health research',
        'What "evidence-based" means',
        'Common myths vs data',
        'Current research trends'
      ],
      resources: [
        { name: 'PubMed (abstract-level access)', type: 'External' },
        { name: 'ClinicalTrials.gov', type: 'External' },
        { name: 'Curated study summaries', type: 'Guide' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Calculators',
      subtitle: 'Simple tools anyone can use',
      topics: [
        'Activity level estimators',
        'Calorie & energy estimators',
        'Bodyweight trend education',
        'Training readiness concepts'
      ],
      resources: [
        { name: 'NIH Body Weight Planner', type: 'Tool' },
        { name: 'Educational calculators', type: 'Tool' },
        { name: 'Activity level guides', type: 'Guide' }
      ]
    }
  ];

  const activeTab = categories.find(cat => cat.id === activeCategory);

  return (
    <>
      <TopNav />
      <div className="resources-page">
        <section className="resources-hero">
          <h2 className="resources-hero-subtitle">RESOURCES</h2>
          <h1 className="resources-hero-title">AFYA Public Resource Hub</h1>
          <p className="resources-hero-description">Free, evidence-based wellness education for everyone</p>
        </section>

        <div className="resources-container">
          <section className="resources-intro">
            <p>This hub is organized by how people think about their health, not by products or services. Each section can start simple (links + short explanations) and later expand into articles, videos, calculators, and AFYA-created guides.</p>
          </section>

          <section className="resources-tabs">
            <div className="tab-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title.split(' & ')[0]}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab && (
                <div className="category-content">
                  <div className="category-header">
                    <h2>{activeTab.title}</h2>
                    <p className="category-subtitle">{activeTab.subtitle}</p>
                  </div>

                  <div className="category-section">
                    <h3>Core Topics</h3>
                    <ul className="topics-list">
                      {activeTab.topics.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="category-section">
                    <h3>Resource Types</h3>
                    <div className="resources-list">
                      {activeTab.resources.map((resource, idx) => (
                        <div key={idx} className="resource-item">
                          <div className="resource-name">{resource.name}</div>
                          <div className="resource-type">{resource.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="category-footer">
                    <p className="coming-soon-note">Future expansions and AFYA-created content coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Resources;
