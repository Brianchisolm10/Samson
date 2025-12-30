import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import './Resources.css';

function Resources() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const resources = [
    // Training & Movement
    {
      id: 1,
      title: 'Physical Activity Guidelines',
      category: 'Training',
      type: 'Guide',
      description: 'Evidence-based activity recommendations for youth, adults, and older adults',
      tags: ['guidelines', 'beginner-friendly'],
      url: 'https://www.cdc.gov/physicalactivity/basics/index.htm',
      external: true
    },
    {
      id: 2,
      title: 'Strength Training Fundamentals',
      category: 'Training',
      type: 'Education',
      description: 'Learn frequency, intensity, rest periods, and progressive overload principles',
      tags: ['strength', 'beginner-friendly', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 3,
      title: 'Cardiovascular Fitness & Endurance',
      category: 'Training',
      type: 'Guide',
      description: 'Understanding aerobic capacity, energy systems, and conditioning',
      tags: ['cardio', 'endurance'],
      url: '#',
      external: false
    },
    {
      id: 4,
      title: 'Flexibility & Mobility Essentials',
      category: 'Training',
      type: 'Education',
      description: 'Warm-ups, stretching protocols, and mobility work for all fitness levels',
      tags: ['flexibility', 'recovery', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 5,
      title: 'Injury Prevention Principles',
      category: 'Training',
      type: 'Guide',
      description: 'Evidence-based strategies to prevent common fitness injuries',
      tags: ['injury-prevention', 'safety'],
      url: 'https://www.apta.org/patient-care/evidence-based-practice-resources',
      external: true
    },
    {
      id: 35,
      title: 'American College of Sports Medicine',
      category: 'Training',
      type: 'External',
      description: 'Professional organization with evidence-based exercise guidelines and research',
      tags: ['guidelines', 'research', 'professional'],
      url: 'https://www.acsm.org/',
      external: true
    },
    {
      id: 36,
      title: 'National Strength & Conditioning Association',
      category: 'Training',
      type: 'External',
      description: 'Resources on strength training, conditioning, and athletic performance',
      tags: ['strength', 'athletes', 'professional'],
      url: 'https://www.nsca.com/',
      external: true
    },
    {
      id: 37,
      title: 'WHO Physical Activity Guidelines',
      category: 'Training',
      type: 'Guide',
      description: 'World Health Organization recommendations for physical activity',
      tags: ['guidelines', 'international'],
      url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
      external: true
    },

    // Nutrition
    {
      id: 6,
      title: 'USDA MyPlate Guidelines',
      category: 'Nutrition',
      type: 'Tool',
      description: 'Interactive tool for balanced meal planning and portion guidance',
      tags: ['nutrition', 'beginner-friendly', 'meal-planning'],
      url: 'https://www.myplate.gov/',
      external: true
    },
    {
      id: 7,
      title: 'Macronutrients Explained',
      category: 'Nutrition',
      type: 'Education',
      description: 'Deep dive into proteins, carbohydrates, fats, and their roles in fitness',
      tags: ['nutrition', 'macros', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 8,
      title: 'Micronutrients & Supplementation',
      category: 'Nutrition',
      type: 'Reference',
      description: 'NIH fact sheets on vitamins, minerals, and dietary supplements',
      tags: ['nutrition', 'supplements', 'reference'],
      url: 'https://ods.od.nih.gov/',
      external: true
    },
    {
      id: 9,
      title: 'Hydration & Performance',
      category: 'Nutrition',
      type: 'Guide',
      description: 'Electrolytes, fluid intake, and hydration strategies for athletes',
      tags: ['nutrition', 'hydration', 'athletes'],
      url: '#',
      external: false
    },
    {
      id: 38,
      title: 'Academy of Nutrition and Dietetics',
      category: 'Nutrition',
      type: 'External',
      description: 'Professional nutrition organization with evidence-based resources',
      tags: ['nutrition', 'professional', 'dietetics'],
      url: 'https://www.eatright.org/',
      external: true
    },
    {
      id: 39,
      title: 'USDA FoodData Central',
      category: 'Nutrition',
      type: 'Tool',
      description: 'Comprehensive database of food composition and nutritional information',
      tags: ['nutrition', 'database', 'reference'],
      url: 'https://fdc.nal.usda.gov/',
      external: true
    },
    {
      id: 40,
      title: 'American Heart Association Nutrition',
      category: 'Nutrition',
      type: 'Guide',
      description: 'Heart-healthy eating guidelines and nutrition recommendations',
      tags: ['nutrition', 'cardiovascular', 'health'],
      url: 'https://www.heart.org/en/healthy-living/healthy-eating',
      external: true
    },

    // Recovery & Sleep
    {
      id: 10,
      title: 'Sleep Science & Optimization',
      category: 'Recovery',
      type: 'Guide',
      description: 'CDC resources on sleep duration, quality, and health impact',
      tags: ['sleep', 'recovery', 'beginner-friendly'],
      url: 'https://www.cdc.gov/sleep/index.html',
      external: true
    },
    {
      id: 11,
      title: 'Stress Management Techniques',
      category: 'Recovery',
      type: 'Education',
      description: 'Evidence-based strategies for managing stress and supporting recovery',
      tags: ['stress', 'mental-health', 'recovery'],
      url: '#',
      external: false
    },
    {
      id: 12,
      title: 'Active Recovery Methods',
      category: 'Recovery',
      type: 'Guide',
      description: 'Light movement, foam rolling, and recovery protocols between workouts',
      tags: ['recovery', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 41,
      title: 'National Sleep Foundation',
      category: 'Recovery',
      type: 'External',
      description: 'Sleep research and recommendations for optimal sleep health',
      tags: ['sleep', 'recovery', 'research'],
      url: 'https://www.thensf.org/',
      external: true
    },
    {
      id: 42,
      title: 'American Psychological Association - Stress',
      category: 'Recovery',
      type: 'Guide',
      description: 'Resources on stress management and mental health',
      tags: ['stress', 'mental-health', 'professional'],
      url: 'https://www.apa.org/topics/stress',
      external: true
    },

    // Mental Wellness
    {
      id: 13,
      title: 'Mental Health Resources',
      category: 'Mental Wellness',
      type: 'Reference',
      description: 'NIMH and NIH resources for mental health awareness and support',
      tags: ['mental-health', 'wellness'],
      url: 'https://www.nimh.nih.gov/health',
      external: true
    },
    {
      id: 14,
      title: 'Habit Formation & Motivation',
      category: 'Mental Wellness',
      type: 'Education',
      description: 'Behavioral science principles for building lasting fitness habits',
      tags: ['habits', 'motivation', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 43,
      title: 'SAMHSA National Helpline',
      category: 'Mental Wellness',
      type: 'External',
      description: 'Free, confidential mental health and substance abuse support',
      tags: ['mental-health', 'support', 'crisis'],
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      external: true
    },
    {
      id: 44,
      title: 'Psychology Today - Find Help',
      category: 'Mental Wellness',
      type: 'External',
      description: 'Directory to find mental health professionals and resources',
      tags: ['mental-health', 'professional', 'support'],
      url: 'https://www.psychologytoday.com/us/basics/therapy',
      external: true
    },

    // Special Populations
    {
      id: 15,
      title: 'Youth & Adolescent Fitness',
      category: 'Special Populations',
      type: 'Guide',
      description: 'Age-appropriate training and development principles for young athletes',
      tags: ['youth', 'athletes', 'special-populations'],
      url: '#',
      external: false
    },
    {
      id: 16,
      title: 'Fitness for Older Adults',
      category: 'Special Populations',
      type: 'Guide',
      description: 'Safe, effective training strategies for maintaining strength and mobility',
      tags: ['older-adults', 'special-populations', 'safety'],
      url: '#',
      external: false
    },
    {
      id: 17,
      title: 'Chronic Condition Management',
      category: 'Special Populations',
      type: 'Reference',
      description: 'Adaptations for diabetes, hypertension, arthritis, and other conditions',
      tags: ['chronic-conditions', 'special-populations', 'medical'],
      url: 'https://www.medlineplus.gov/',
      external: true
    },
    {
      id: 45,
      title: 'National Institute on Aging',
      category: 'Special Populations',
      type: 'External',
      description: 'Resources on aging, exercise, and health for older adults',
      tags: ['older-adults', 'aging', 'research'],
      url: 'https://www.nia.nih.gov/',
      external: true
    },
    {
      id: 46,
      title: 'American Diabetes Association',
      category: 'Special Populations',
      type: 'External',
      description: 'Diabetes management, nutrition, and exercise resources',
      tags: ['diabetes', 'chronic-conditions', 'nutrition'],
      url: 'https://www.diabetes.org/',
      external: true
    },
    {
      id: 47,
      title: 'Arthritis Foundation',
      category: 'Special Populations',
      type: 'External',
      description: 'Exercise and movement resources for arthritis management',
      tags: ['arthritis', 'chronic-conditions', 'exercise'],
      url: 'https://www.arthritis.org/',
      external: true
    },

    // Research & Science
    {
      id: 18,
      title: 'PubMed Central',
      category: 'Research',
      type: 'External',
      description: 'Access peer-reviewed fitness and health research studies',
      tags: ['research', 'studies', 'advanced'],
      url: 'https://www.ncbi.nlm.nih.gov/pmc/',
      external: true
    },
    {
      id: 19,
      title: 'How to Read Research',
      category: 'Research',
      type: 'Education',
      description: 'Learn to evaluate fitness studies and understand evidence-based claims',
      tags: ['research', 'education', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 20,
      title: 'Clinical Trials Database',
      category: 'Research',
      type: 'External',
      description: 'Find ongoing fitness and health research studies',
      tags: ['research', 'studies', 'advanced'],
      url: 'https://clinicaltrials.gov/',
      external: true
    },
    {
      id: 48,
      title: 'Google Scholar',
      category: 'Research',
      type: 'External',
      description: 'Search academic papers and citations across disciplines',
      tags: ['research', 'academic', 'database'],
      url: 'https://scholar.google.com/',
      external: true
    },
    {
      id: 49,
      title: 'ResearchGate',
      category: 'Research',
      type: 'External',
      description: 'Platform where researchers share and discuss scientific papers',
      tags: ['research', 'academic', 'community'],
      url: 'https://www.researchgate.net/',
      external: true
    },
    {
      id: 50,
      title: 'Cochrane Library',
      category: 'Research',
      type: 'External',
      description: 'Systematic reviews and meta-analyses of health interventions',
      tags: ['research', 'evidence-based', 'systematic-review'],
      url: 'https://www.cochranelibrary.com/',
      external: true
    },

    // Tools & Calculators
    {
      id: 21,
      title: 'Calorie & Energy Calculator',
      category: 'Tools',
      type: 'Calculator',
      description: 'Estimate daily caloric needs based on activity level and goals',
      tags: ['calculator', 'nutrition', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 22,
      title: 'BMI & Body Composition',
      category: 'Tools',
      type: 'Calculator',
      description: 'Calculate BMI and understand body composition metrics',
      tags: ['calculator', 'assessment', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 23,
      title: 'Training Readiness Assessment',
      category: 'Tools',
      type: 'Tool',
      description: 'Evaluate your readiness for intense training based on recovery metrics',
      tags: ['assessment', 'recovery', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 51,
      title: 'NIH Body Weight Planner',
      category: 'Tools',
      type: 'Calculator',
      description: 'Personalized weight loss and gain projections based on diet and exercise',
      tags: ['calculator', 'weight-management', 'nutrition'],
      url: 'https://bwsimulator.niddk.nih.gov/',
      external: true
    },
    {
      id: 52,
      title: 'American Heart Association - Heart Rate Calculator',
      category: 'Tools',
      type: 'Calculator',
      description: 'Calculate target heart rate zones for exercise',
      tags: ['calculator', 'cardio', 'training'],
      url: 'https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates',
      external: true
    },

    // Women's Health
    {
      id: 24,
      title: 'Menstrual Cycle & Training',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'How to optimize training and nutrition throughout your menstrual cycle',
      tags: ['menstrual-cycle', 'women', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 25,
      title: 'Pregnancy & Postpartum Fitness',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Safe exercise guidelines during pregnancy and postpartum recovery',
      tags: ['pregnancy', 'postpartum', 'women', 'special-populations'],
      url: '#',
      external: false
    },
    {
      id: 26,
      title: 'Pelvic Floor Health',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Understanding pelvic floor function, exercises, and common issues',
      tags: ['pelvic-floor', 'women', 'recovery'],
      url: '#',
      external: false
    },
    {
      id: 27,
      title: 'Hormonal Health & Fitness',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'How hormones affect training, recovery, and body composition',
      tags: ['hormones', 'women', 'intermediate'],
      url: '#',
      external: false
    },
    {
      id: 28,
      title: 'Bone Health for Women',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Preventing osteoporosis and maintaining bone density through exercise and nutrition',
      tags: ['bone-health', 'women', 'nutrition'],
      url: '#',
      external: false
    },
    {
      id: 29,
      title: 'Breast Health & Exercise',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Proper support, exercise modifications, and health considerations',
      tags: ['breast-health', 'women', 'safety'],
      url: '#',
      external: false
    },
    {
      id: 30,
      title: 'Menopause & Fitness',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Training strategies and lifestyle modifications for menopause transition',
      tags: ['menopause', 'women', 'older-adults'],
      url: '#',
      external: false
    },
    {
      id: 31,
      title: 'Female Athlete Triad',
      category: 'Women\'s Health',
      type: 'Reference',
      description: 'Understanding the relationship between energy availability, bone health, and menstrual function',
      tags: ['athletes', 'women', 'medical'],
      url: '#',
      external: false
    },
    {
      id: 32,
      title: 'Nutrition for Women',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Gender-specific nutritional needs and considerations for optimal health',
      tags: ['nutrition', 'women', 'beginner-friendly'],
      url: '#',
      external: false
    },
    {
      id: 33,
      title: 'Iron & Anemia in Women',
      category: 'Women\'s Health',
      type: 'Reference',
      description: 'Understanding iron needs, deficiency signs, and dietary sources',
      tags: ['nutrition', 'women', 'medical'],
      url: 'https://www.cdc.gov/nutrition/data-statistics/added-sugars.html',
      external: true
    },
    {
      id: 34,
      title: 'Women\'s Mental Health & Exercise',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'How exercise supports mental health, mood, and emotional wellbeing in women',
      tags: ['mental-health', 'women', 'wellness'],
      url: '#',
      external: false
    },
    {
      id: 53,
      title: 'American College of Obstetricians and Gynecologists',
      category: 'Women\'s Health',
      type: 'External',
      description: 'Evidence-based guidelines for women\'s health, pregnancy, and exercise',
      tags: ['women', 'pregnancy', 'professional'],
      url: 'https://www.acog.org/',
      external: true
    },
    {
      id: 54,
      title: 'National Women\'s Health Information Center',
      category: 'Women\'s Health',
      type: 'External',
      description: 'Comprehensive women\'s health information and resources',
      tags: ['women', 'health', 'reference'],
      url: 'https://www.womenshealth.gov/',
      external: true
    },
    {
      id: 55,
      title: 'Office on Women\'s Health - Exercise & Fitness',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Government resources on women\'s fitness and health',
      tags: ['women', 'fitness', 'health'],
      url: 'https://www.womenshealth.gov/fitness-nutrition/fitness',
      external: true
    },
    {
      id: 56,
      title: 'North American Menopause Society',
      category: 'Women\'s Health',
      type: 'External',
      description: 'Menopause information, research, and professional resources',
      tags: ['menopause', 'women', 'professional'],
      url: 'https://www.menopause.org/',
      external: true
    },
  ];

  const categories = ['Training', 'Nutrition', 'Recovery', 'Mental Wellness', 'Special Populations', 'Research', 'Tools', 'Women\'s Health'];
  const types = ['Guide', 'Education', 'Tool', 'Calculator', 'Reference', 'External'];
  const allTags = [...new Set(resources.flatMap(r => r.tags))];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = !searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => 
          resource.category === filter || 
          resource.type === filter || 
          resource.tags.includes(filter)
        );

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
  };

  return (
    <>
      <TopNav />
      <div className="resources-page">
        {/* Hero Section */}
        <section className="resources-hero">
          <div className="hero-content">
            <h1>AFYA Resource Hub</h1>
            <p>Your mecca for free, evidence-based fitness, nutrition, and wellness knowledge</p>
            <p className="hero-subtext">Guides • Calculators • Studies • Definitions • External Resources</p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="resources-search-section">
          <div className="resources-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search resources, topics, definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Filter Pills */}
            <div className="filters-section">
              <div className="filter-group">
                <h4>Categories</h4>
                <div className="filter-pills">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`filter-pill ${selectedFilters.includes(cat) ? 'active' : ''}`}
                      onClick={() => toggleFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Resource Type</h4>
                <div className="filter-pills">
                  {types.map(type => (
                    <button
                      key={type}
                      className={`filter-pill ${selectedFilters.includes(type) ? 'active' : ''}`}
                      onClick={() => toggleFilter(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Topics</h4>
                <div className="filter-pills">
                  {allTags.slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      className={`filter-pill ${selectedFilters.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {selectedFilters.length > 0 && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="resources-results">
          <div className="resources-container">
            <div className="results-header">
              <h2>
                {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  ≡
                </button>
              </div>
            </div>

            {filteredResources.length > 0 ? (
              <div className={`resources-${viewMode}`}>
                {filteredResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-header">
                      <div className="resource-meta">
                        <span className="resource-category">{resource.category}</span>
                        <span className="resource-type">{resource.type}</span>
                      </div>
                      {resource.external && <span className="external-badge">External</span>}
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-tags">
                      {resource.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <a
                      href={resource.url}
                      className="resource-link"
                      target={resource.external ? '_blank' : '_self'}
                      rel={resource.external ? 'noopener noreferrer' : ''}
                      onClick={(e) => {
                        if (!resource.external && resource.url === '#') {
                          e.preventDefault();
                          navigate(`/resources/${resource.id}`);
                        }
                      }}
                    >
                      {resource.external ? 'Visit Resource →' : 'Learn More →'}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No resources found matching your search. Try adjusting your filters or search terms.</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="resources-cta">
          <div className="resources-container">
            <h2>Can't Find What You're Looking For?</h2>
            <p>We're constantly adding new resources and guides. Suggest a topic or resource you'd like to see.</p>
            <a href="mailto:afya@theafya.org" className="cta-button">
              Send a Suggestion
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Resources;
