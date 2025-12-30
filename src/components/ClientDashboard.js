import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUserProfile } from '../utils/userStorage';
import { formatTrainingStyle } from '../utils/formatters';
import './ClientDashboard.css';
import TopNav from './TopNav';
import Footer from './Footer';

function ClientDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [goals, setGoals] = useState({
    weight: user?.profile?.weight || '',
    bmi: user?.profile?.bmi || '',
    bodyFat: '',
    muscleMass: ''
  });
  const [savedMessage, setSavedMessage] = useState('');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    metrics: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateProgress = (current, goal) => {
    if (!current || !goal || goal <= 0) return 0;
    const progress = ((current - goal) / current) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const renderMiniChart = (metric = 'weight') => {
    // Check if user has any weight history data
    const hasData = user.profile?.weightHistory && user.profile.weightHistory.length > 0;

    if (!hasData) {
      return (
        <div className="mini-chart-container">
          <div className="chart-empty-state">
            <span className="empty-text">No data yet. Start logging to see your progress.</span>
          </div>
        </div>
      );
    }

    // Sample data points for the chart (only shown if data exists)
    const dataPoints = [
      { x: 0, y: 30, label: '4 weeks ago', value: 195 },
      { x: 25, y: 20, label: '3 weeks ago', value: 190 },
      { x: 50, y: 25, label: '2 weeks ago', value: 188 },
      { x: 75, y: 15, label: '1 week ago', value: 186 },
      { x: 100, y: 10, label: 'Today', value: user.profile?.weight || 185 }
    ];

    return (
      <div className="mini-chart-container">
        <svg width="100%" height="40" viewBox="0 0 100 40" style={{marginBottom: '8px'}}>
          <polyline
            points="0,30 25,20 50,25 75,15 100,10"
            fill="none"
            stroke="#8B6F47"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {dataPoints.map((point, idx) => (
            <circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#8B6F47"
              vectorEffect="non-scaling-stroke"
              style={{cursor: 'pointer'}}
              onMouseEnter={() => setHoveredPoint({...point, metric})}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>
        {hoveredPoint && hoveredPoint.metric === metric && (
          <div className="chart-tooltip">
            <div className="tooltip-label">{hoveredPoint.label}</div>
            <div className="tooltip-value">{hoveredPoint.value} {metric === 'weight' ? 'lbs' : 'kg/m²'}</div>
          </div>
        )}
      </div>
    );
  };

  const handleGoalChange = (metric, value) => {
    setGoals(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleSaveGoals = () => {
    if (user) {
      updateUserProfile(user.id, {
        goals: goals
      });
      setSavedMessage('Goals saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  if (!user) {
    return null;
  }

  const mainActions = [
    {
      title: 'Generate Workout',
      description: 'Create a personalized workout program',
      icon: '💪',
      action: () => navigate('/workout-generator')
    },
    {
      title: 'Create Meal Plan',
      description: 'Design your nutrition strategy',
      icon: '🍽️',
      action: () => navigate('/meal-plan-generator')
    },
    {
      title: 'View Programs',
      description: 'Access your saved workouts and meals',
      icon: '📋',
      action: () => navigate('/schedule')
    },
    {
      title: 'Track Progress',
      description: 'Monitor your fitness journey',
      icon: '📊',
      action: () => navigate('/profile')
    },
    {
      title: 'Education Hub',
      description: 'Learn from research-backed articles',
      icon: '📚',
      action: () => navigate('/education')
    },
    {
      title: 'Help Center',
      description: 'Get answers to your questions',
      icon: '❓',
      action: () => navigate('/help/topics')
    }
  ];

  return (
    <>
      <TopNav />
      <div className="client-dashboard">
        <section className="dashboard-hero">
          <div className="hero-content">
            <h1>Welcome, {user.name}!</h1>
            <p className="hero-subtitle">Your personalized fitness dashboard</p>
          </div>
        </section>

        <div className="dashboard-layout">
          {/* Left Sidebar - Action Cards */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-content">
              {mainActions.map((action, idx) => (
                <button
                  key={idx}
                  className="sidebar-card"
                  onClick={action.action}
                >
                  <span className="sidebar-icon">{action.icon}</span>
                  <div className="sidebar-text">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                  <span className="sidebar-arrow">→</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Right Content - Profile Stats & Metrics */}
          <main className="dashboard-main">
            {/* Profile Stats */}
            <section className="dashboard-card">
              <div className="card-header" onClick={() => toggleSection('profile')}>
                <h2>Your Profile</h2>
                <span className={`toggle-icon ${expandedSections.profile ? 'expanded' : ''}`}>▼</span>
              </div>
              {expandedSections.profile && (
                <div className="card-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-label">Fitness Level</div>
                      <div className="stat-value">{user.profile?.fitnessLevel ? user.profile.fitnessLevel.charAt(0).toUpperCase() + user.profile.fitnessLevel.slice(1) : 'Not set'}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Primary Goal</div>
                      <div className="stat-value">{user.profile?.primaryGoal ? user.profile.primaryGoal.charAt(0).toUpperCase() + user.profile.primaryGoal.slice(1) : 'Not set'}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Training Style</div>
                      <div className="stat-value">
                        {formatTrainingStyle(user.profile?.trainingStyle)}
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Equipment</div>
                      <div className="stat-value">{user.profile?.equipment && user.profile.equipment.length > 0 ? user.profile.equipment.length + ' items' : 'Not set'}</div>
                    </div>
                  </div>
                  <button className="edit-profile-btn" onClick={() => navigate('/profile')}>
                    Edit Profile
                  </button>
                </div>
              )}
            </section>

            {/* Body Metrics & Progress */}
            <section className="dashboard-card">
              <div className="card-header" onClick={() => toggleSection('metrics')}>
                <h2>Body Metrics & Progress</h2>
                <span className={`toggle-icon ${expandedSections.metrics ? 'expanded' : ''}`}>▼</span>
              </div>
              {expandedSections.metrics && (
                <div className="card-content">
                  {savedMessage && <span className="save-message">{savedMessage}</span>}
                  <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-header">
                    <h3>Weight</h3>
                    <span className="metric-unit">lbs</span>
                  </div>
                  <div className="metric-current">
                    <span className="current-label">Current</span>
                    <span className="current-value">{user.profile?.weight || '—'}</span>
                  </div>
                  <div className="metric-goal">
                    <span className="goal-label">Goal</span>
                    <input 
                      type="number" 
                      className="goal-input" 
                      placeholder="Set goal" 
                      value={goals.weight}
                      onChange={(e) => handleGoalChange('weight', e.target.value)}
                    />
                  </div>
                  <div className="metric-progress">
                    {renderMiniChart('weight')}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${calculateProgress(user.profile?.weight, goals.weight)}%`}}></div>
                    </div>
                    <span className="progress-text">{Math.round(calculateProgress(user.profile?.weight, goals.weight))}% to goal</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <h3>BMI</h3>
                    <span className="metric-unit">kg/m²</span>
                  </div>
                  <div className="metric-current">
                    <span className="current-label">Current</span>
                    <span className="current-value">{user.profile?.bmi || '—'}</span>
                  </div>
                  <div className="metric-goal">
                    <span className="goal-label">Goal</span>
                    <input 
                      type="number" 
                      className="goal-input" 
                      placeholder="Set goal" 
                      step="0.1"
                      value={goals.bmi}
                      onChange={(e) => handleGoalChange('bmi', e.target.value)}
                    />
                  </div>
                  <div className="metric-progress">
                    {renderMiniChart('bmi')}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${calculateProgress(user.profile?.bmi, goals.bmi)}%`}}></div>
                    </div>
                    <span className="progress-text">{Math.round(calculateProgress(user.profile?.bmi, goals.bmi))}% to goal</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <h3>Body Fat</h3>
                    <span className="metric-unit">%</span>
                  </div>
                  <div className="metric-current">
                    <span className="current-label">Current</span>
                    <span className="current-value">—</span>
                  </div>
                  <div className="metric-goal">
                    <span className="goal-label">Goal</span>
                    <input 
                      type="number" 
                      className="goal-input" 
                      placeholder="Set goal" 
                      step="0.1"
                      value={goals.bodyFat}
                      onChange={(e) => handleGoalChange('bodyFat', e.target.value)}
                    />
                  </div>
                  <div className="metric-progress">
                    {renderMiniChart('bodyFat')}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '0%'}}></div>
                    </div>
                    <span className="progress-text">0% to goal</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <h3>Muscle Mass</h3>
                    <span className="metric-unit">lbs</span>
                  </div>
                  <div className="metric-current">
                    <span className="current-label">Current</span>
                    <span className="current-value">—</span>
                  </div>
                  <div className="metric-goal">
                    <span className="goal-label">Goal</span>
                    <input 
                      type="number" 
                      className="goal-input" 
                      placeholder="Set goal"
                      value={goals.muscleMass}
                      onChange={(e) => handleGoalChange('muscleMass', e.target.value)}
                    />
                  </div>
                  <div className="metric-progress">
                    {renderMiniChart('muscleMass')}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '0%'}}></div>
                    </div>
                    <span className="progress-text">0% to goal</span>
                  </div>
                </div>
              </div>
              <button className="save-goals-btn" onClick={handleSaveGoals}>
                Save Goals
              </button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClientDashboard;
