import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, getAllUsers } from '../utils/userStorage';
import './AdminDashboard.css';
import TopNav from './TopNav';
import Footer from './Footer';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    users: true,
    programs: true
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Calculate real analytics from users
    const allUsers = getAllUsers();
    const clientUsers = allUsers.filter(u => u.role !== 'admin');
    
    // Count workouts and meal plans
    let totalWorkouts = 0;
    let totalMealPlans = 0;
    const workoutSplits = { fullBody: 0, upperLower: 0, ppl: 0, bodyPart: 0 };
    const mealGoals = { bulking: 0, cutting: 0, maintenance: 0 };
    
    clientUsers.forEach(client => {
      if (client.profile?.savedWorkouts) {
        totalWorkouts += client.profile.savedWorkouts.length;
      }
      if (client.profile?.savedMealPlans) {
        totalMealPlans += client.profile.savedMealPlans.length;
      }
      
      // Count training styles
      const style = client.profile?.trainingStyle;
      if (style === 'fullBody') workoutSplits.fullBody++;
      else if (style === 'upperLower') workoutSplits.upperLower++;
      else if (style === 'ppl') workoutSplits.ppl++;
      else if (style === 'bodyPart') workoutSplits.bodyPart++;
      
      // Count meal plan goals
      const goal = client.profile?.primaryGoal;
      if (goal === 'bulking') mealGoals.bulking++;
      else if (goal === 'cutting') mealGoals.cutting++;
      else if (goal === 'maintenance') mealGoals.maintenance++;
    });

    setAnalyticsData({
      totalUsers: clientUsers.length,
      totalWorkouts,
      totalMealPlans,
      activeUsers: clientUsers.length,
      userGrowth: [
        { date: 'Jan', users: 0 },
        { date: 'Feb', users: 0 },
        { date: 'Mar', users: clientUsers.length }
      ],
      workoutStats: workoutSplits,
      mealPlanStats: mealGoals,
      clientUsers
    });
  }, []);



  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopNav />
      <div className="admin-dashboard">
        <section className="admin-hero">
          <div className="hero-content">
            <h1>Admin Dashboard</h1>
            <p className="hero-subtitle">Platform analytics and management</p>
          </div>
          <div className="hero-actions">
            <button className="btn-food-library" onClick={() => navigate('/admin/food-library')}>
              Food Library Manager
            </button>
            <button className="btn-exercise-library" onClick={() => navigate('/admin/exercise-library')}>
              Exercise Library Manager
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </section>

        <div className="admin-layout">
          {/* Overview Cards */}
          <section className="overview-section">
            <div className="metrics-row">
              <div className="metric-card metric-card-1">
                <div className="metric-content">
                  <div className="metric-label">Total Users</div>
                  <div className="metric-value">{analyticsData.totalUsers}</div>
                  <div className="metric-change positive">+0% this month</div>
                </div>
              </div>

              <div className="metric-card metric-card-2">
                <div className="metric-content">
                  <div className="metric-label">Total Workouts</div>
                  <div className="metric-value">{analyticsData.totalWorkouts}</div>
                  <div className="metric-change neutral">0 this month</div>
                </div>
              </div>

              <div className="metric-card metric-card-3">
                <div className="metric-content">
                  <div className="metric-label">Total Meal Plans</div>
                  <div className="metric-value">{analyticsData.totalMealPlans}</div>
                  <div className="metric-change neutral">0 this month</div>
                </div>
              </div>

              <div className="metric-card metric-card-4">
                <div className="metric-content">
                  <div className="metric-label">Active Users</div>
                  <div className="metric-value">{analyticsData.activeUsers}</div>
                  <div className="metric-change positive">100% engagement</div>
                </div>
              </div>
            </div>
          </section>

          {/* User Growth Chart */}
          <section className="dashboard-card">
            <div className="card-header" onClick={() => toggleSection('overview')}>
              <h2>User Growth</h2>
              <span className={`toggle-icon ${expandedSections.overview ? 'expanded' : ''}`}>▼</span>
            </div>
            {expandedSections.overview && (
              <div className="card-content">
                <div className="chart-container">
                  <svg width="100%" height="240" viewBox="0 0 500 240" className="line-chart" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="40" y1="40" x2="40" y2="200" stroke="#e8e4dc" strokeWidth="1" />
                    <line x1="40" y1="200" x2="480" y2="200" stroke="#e8e4dc" strokeWidth="1" />
                    
                    {/* Animated line */}
                    <polyline
                      points={analyticsData.userGrowth.map((point, i) => `${40 + (i * 220)},${200 - (point.users * 80)}`).join(' ')}
                      fill="none"
                      stroke="#8B6F47"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="chart-line"
                      filter="url(#glow)"
                    />
                    
                    {/* Animated data points */}
                    {analyticsData.userGrowth.map((point, idx) => (
                      <circle
                        key={idx}
                        cx={40 + (idx * 220)}
                        cy={200 - (point.users * 80)}
                        r="4"
                        fill="#8B6F47"
                        className="chart-point"
                        style={{'--point-delay': `${idx * 0.15}s`}}
                      />
                    ))}
                    
                    {/* X-axis labels */}
                    {analyticsData.userGrowth.map((point, idx) => (
                      <text
                        key={`label-${idx}`}
                        x={40 + (idx * 220)}
                        y="225"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#666"
                        fontWeight="400"
                      >
                        {point.date}
                      </text>
                    ))}
                    
                    {/* Y-axis labels */}
                    <text x="15" y="205" textAnchor="end" fontSize="12" fill="#999" fontWeight="400">0</text>
                    <text x="15" y="125" textAnchor="end" fontSize="12" fill="#999" fontWeight="400">1</text>
                  </svg>
                  
                  {/* Hover tooltip */}
                  {hoveredPoint !== null && (
                    <div 
                      className="chart-tooltip"
                      style={{
                        left: `${(hoveredPoint / (analyticsData.userGrowth.length - 1)) * 90 + 5}%`,
                        top: '0px'
                      }}
                    >
                      <div className="tooltip-date">{analyticsData.userGrowth[hoveredPoint].date}</div>
                      <div className="tooltip-value">{analyticsData.userGrowth[hoveredPoint].users} users</div>
                    </div>
                  )}
                  
                  {/* Invisible hover areas */}
                  <div className="chart-hover-areas">
                    {analyticsData.userGrowth.map((point, idx) => (
                      <div
                        key={idx}
                        className="hover-area"
                        onMouseEnter={() => setHoveredPoint(idx)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        style={{
                          left: `${(idx / (analyticsData.userGrowth.length - 1)) * 90 + 5}%`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Users Section */}
          <section className="dashboard-card">
            <div className="card-header" onClick={() => toggleSection('users')}>
              <h2>Users</h2>
              <span className={`toggle-icon ${expandedSections.users ? 'expanded' : ''}`}>▼</span>
            </div>
            {expandedSections.users && (
              <div className="card-content">
                <div className="users-table">
                  <div className="table-header">
                    <div className="table-cell">Name</div>
                    <div className="table-cell">Email</div>
                    <div className="table-cell">Fitness Level</div>
                    <div className="table-cell">Joined</div>
                  </div>
                  {analyticsData.clientUsers.map((client, idx) => (
                    <div key={idx} className="table-row">
                      <div className="table-cell">{client.name}</div>
                      <div className="table-cell">{client.email}</div>
                      <div className="table-cell">
                        <span className={`badge badge-${client.profile?.fitnessLevel || 'beginner'}`}>
                          {client.profile?.fitnessLevel ? client.profile.fitnessLevel.charAt(0).toUpperCase() + client.profile.fitnessLevel.slice(1) : 'Not set'}
                        </span>
                      </div>
                      <div className="table-cell">{new Date(client.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Programs Section */}
          <section className="dashboard-card">
            <div className="card-header" onClick={() => toggleSection('programs')}>
              <h2>Program Statistics</h2>
              <span className={`toggle-icon ${expandedSections.programs ? 'expanded' : ''}`}>▼</span>
            </div>
            {expandedSections.programs && (
              <div className="card-content">
                <div className="stats-grid">
                  <div className="stat-box">
                    <h3>Workout Splits</h3>
                    <div className="stat-items">
                      <div className="stat-item">
                        <span className="stat-label">Full Body</span>
                        <span className="stat-value">{analyticsData.workoutStats.fullBody}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Upper/Lower</span>
                        <span className="stat-value">{analyticsData.workoutStats.upperLower}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Push/Pull/Legs</span>
                        <span className="stat-value">{analyticsData.workoutStats.ppl}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Body Part</span>
                        <span className="stat-value">{analyticsData.workoutStats.bodyPart}</span>
                      </div>
                    </div>
                  </div>

                  <div className="stat-box">
                    <h3>Meal Plan Goals</h3>
                    <div className="stat-items">
                      <div className="stat-item">
                        <span className="stat-label">Bulking</span>
                        <span className="stat-value">{analyticsData.mealPlanStats.bulking}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Cutting</span>
                        <span className="stat-value">{analyticsData.mealPlanStats.cutting}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Maintenance</span>
                        <span className="stat-value">{analyticsData.mealPlanStats.maintenance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
