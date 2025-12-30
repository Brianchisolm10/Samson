import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import TopNav from './TopNav';
import { getCurrentUser, logoutUser } from '../utils/userStorage';
import { formatTrainingStyle, formatEquipment, formatFitnessLevel, formatPrimaryGoal, formatMotivation, formatActivityLevel, formatGender } from '../utils/formatters';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const profile = user.profile;
  const bmi = profile.bmi ? profile.bmi.toFixed(1) : 'N/A';
  const bmr = profile.bmr ? profile.bmr : 'N/A';
  const tdee = profile.tdee ? profile.tdee : 'N/A';

  return (
    <>
      <TopNav />
      <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="profile-actions">
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'training' ? 'active' : ''}`}
            onClick={() => setActiveTab('training')}
          >
            Training
          </button>
          <button 
            className={`tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            Programs
          </button>
        </div>

        <div className="profile-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <section className="profile-section">
                <h2>Your Profile</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Age</label>
                    <span>{profile.age || 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Gender</label>
                    <span>{formatGender(profile.gender)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Height</label>
                    <span>{profile.height ? `${profile.height}"` : 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Weight</label>
                    <span>{profile.weight ? `${profile.weight} lbs` : 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Fitness Level</label>
                    <span>{formatFitnessLevel(profile.fitnessLevel)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Primary Goal</label>
                    <span>{formatPrimaryGoal(profile.primaryGoal)}</span>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h2>Training Preferences</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Training Style</label>
                    <span>{formatTrainingStyle(profile.trainingStyle)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Years of Training</label>
                    <span>{profile.trainingAge || 'Not set'}</span>
                  </div>
                  <div className="profile-item full-width">
                    <label>Available Equipment</label>
                    <div className="tag-list">
                      {profile.equipment && profile.equipment.length > 0 ? (
                        profile.equipment.map((eq, i) => (
                          <span key={i} className="tag">{formatEquipment(eq)}</span>
                        ))
                      ) : (
                        <span>Not set</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <>
              <section className="profile-section">
                <h2>Your Metrics</h2>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">BMI</div>
                    <div className="metric-value">{bmi}</div>
                    <div className="metric-unit">kg/m²</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">BMR</div>
                    <div className="metric-value">{bmr}</div>
                    <div className="metric-unit">kcal/day</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">TDEE</div>
                    <div className="metric-value">{tdee}</div>
                    <div className="metric-unit">kcal/day</div>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h2>Body Metrics</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Age</label>
                    <span>{profile.age || 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Gender</label>
                    <span>{formatGender(profile.gender)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Height</label>
                    <span>{profile.height ? `${profile.height}"` : 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Weight</label>
                    <span>{profile.weight ? `${profile.weight} lbs` : 'Not set'}</span>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h2>Lifestyle & Recovery</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Sleep (hours/night)</label>
                    <span>{profile.sleepHours || 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Stress Level</label>
                    <span>{profile.stressLevel ? `${profile.stressLevel}/10` : 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Activity Level</label>
                    <span>{formatActivityLevel(profile.activityLevel)}</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
            <>
              <section className="profile-section">
                <h2>Training Background</h2>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Fitness Level</label>
                    <span>{formatFitnessLevel(profile.fitnessLevel)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Years of Training</label>
                    <span>{profile.trainingAge || 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Previous Experience</label>
                    <span>{profile.previousExperience || 'Not set'}</span>
                  </div>
                  <div className="profile-item">
                    <label>Primary Goal</label>
                    <span>{formatPrimaryGoal(profile.primaryGoal)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Motivation</label>
                    <span>{formatMotivation(profile.motivation)}</span>
                  </div>
                  <div className="profile-item">
                    <label>Training Style</label>
                    <span>{formatTrainingStyle(profile.trainingStyle)}</span>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h2>Equipment & Preferences</h2>
                <div className="profile-grid">
                  <div className="profile-item full-width">
                    <label>Available Equipment</label>
                    <div className="tag-list">
                      {profile.equipment && profile.equipment.length > 0 ? (
                        profile.equipment.map((eq, i) => (
                          <span key={i} className="tag">{formatEquipment(eq)}</span>
                        ))
                      ) : (
                        <span>Not set</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <>
              <section className="profile-section">
                <h2>Your Programs</h2>
                <div className="programs-grid">
                  <div className="program-card">
                    <div className="program-count">{profile.savedWorkouts ? profile.savedWorkouts.length : 0}</div>
                    <div className="program-label">Saved Workouts</div>
                  </div>
                  <div className="program-card">
                    <div className="program-count">{profile.savedMealPlans ? profile.savedMealPlans.length : 0}</div>
                    <div className="program-label">Saved Meal Plans</div>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                  <button className="btn-action" onClick={() => navigate('/workout-generator')}>
                    Generate Workout
                  </button>
                  <button className="btn-action" onClick={() => navigate('/meal-plan-generator')}>
                    Create Meal Plan
                  </button>
                  <button className="btn-action" onClick={() => navigate('/hub')}>
                    Back to Hub
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
