import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import TopNav from './TopNav';
import { createUser, loginUser, getCurrentUser } from '../utils/userStorage';
import { formatEquipment, formatTrainingStyle } from '../utils/formatters';

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('account');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '',
    age: '', gender: '', height: '', weight: '',
    fitnessLevel: '', trainingAge: '', previousExperience: '',
    primaryGoal: '', secondaryGoals: [], motivation: '',
    sleepHours: '', stressLevel: '', activityLevel: '', injuries: [],
    favoriteActivities: [], dislikedExercises: [], equipment: [], trainingStyle: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value) ? prev[name].filter(v => v !== value) : [...prev[name], value]
    }));
  };

  const validateStep = () => {
    if (step === 'account') {
      if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
        setError('All fields are required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      return true;
    }
    if (step === 'anthropometric') {
      if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
        setError('All fields are required');
        return false;
      }
      return true;
    }
    if (step === 'training') {
      if (!formData.fitnessLevel || !formData.trainingAge || !formData.previousExperience) {
        setError('All fields are required');
        return false;
      }
      return true;
    }
    if (step === 'goals') {
      if (!formData.primaryGoal || !formData.motivation) {
        setError('All fields are required');
        return false;
      }
      return true;
    }
    if (step === 'lifestyle') {
      if (!formData.sleepHours || !formData.stressLevel || !formData.activityLevel) {
        setError('All fields are required');
        return false;
      }
      return true;
    }
    if (step === 'preferences') {
      if (formData.equipment.length === 0 || !formData.trainingStyle) {
        setError('All fields are required');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    const steps = ['account', 'anthropometric', 'training', 'goals', 'lifestyle', 'preferences', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  };

  const handleBack = () => {
    const steps = ['account', 'anthropometric', 'training', 'goals', 'lifestyle', 'preferences', 'complete'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      createUser(formData);
      loginUser(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNav />
      <div className="signup-container">
        <div className="signup-card">
          <h1>Welcome to AFYA</h1>
          <p className="signup-subtitle">Let's build your personalized fitness journey</p>
          
          <div className="progress-bar">
            {['Account', 'Body', 'Training', 'Goals', 'Lifestyle', 'Preferences'].map((label, i) => (
              <div key={i} className={`progress-step ${step === ['account', 'anthropometric', 'training', 'goals', 'lifestyle', 'preferences'][i] ? 'active' : ['account', 'anthropometric', 'training', 'goals', 'lifestyle', 'preferences'].indexOf(step) > i ? 'completed' : ''}`}>
                <span>{i + 1}</span>
                <p>{label}</p>
              </div>
            ))}
            <div className={`progress-step ${step === 'complete' ? 'active' : ''}`}>
              <span>✓</span>
              <p>Done</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 'account' && (
              <div className="form-step">
                <h2>Create Your Account</h2>
                <p className="step-description">This is how you'll access AFYA</p>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" />
                </div>
              </div>
            )}

            {step === 'anthropometric' && (
              <div className="form-step">
                <h2>Your Body Metrics</h2>
                <p className="step-description">We calculate your BMI and BMR for personalized recommendations</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" min="15" max="100" />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Height (inches)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="70" min="48" max="96" />
                  </div>
                  <div className="form-group">
                    <label>Weight (lbs)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="180" min="50" max="500" />
                  </div>
                </div>
              </div>
            )}

            {step === 'training' && (
              <div className="form-step">
                <h2>Your Training Background</h2>
                <p className="step-description">Help us understand your experience level</p>
                <div className="form-group">
                  <label>Current Fitness Level</label>
                  <div className="radio-group">
                    {[{ value: 'beginner', label: 'Just starting out' }, { value: 'intermediate', label: 'Training 1-2 years' }, { value: 'advanced', label: 'Training 3+ years' }].map(opt => (
                      <label key={opt.value} className="radio-label">
                        <input type="radio" name="fitnessLevel" value={opt.value} checked={formData.fitnessLevel === opt.value} onChange={handleInputChange} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Years of Consistent Training</label>
                  <input type="number" name="trainingAge" value={formData.trainingAge} onChange={handleInputChange} placeholder="0" min="0" max="50" />
                </div>
                <div className="form-group">
                  <label>Previous Training Experience</label>
                  <select name="previousExperience" value={formData.previousExperience} onChange={handleInputChange}>
                    <option value="">Select...</option>
                    <option value="none">No previous experience</option>
                    <option value="gym">Gym training</option>
                    <option value="sports">Sports/Athletics</option>
                    <option value="crossfit">CrossFit</option>
                    <option value="yoga">Yoga/Pilates</option>
                    <option value="mixed">Mixed training</option>
                  </select>
                </div>
              </div>
            )}

            {step === 'goals' && (
              <div className="form-step">
                <h2>Your Fitness Goals</h2>
                <p className="step-description">What do you want to achieve?</p>
                <div className="form-group">
                  <label>Primary Goal</label>
                  <div className="radio-group">
                    {[{ value: 'strength', label: 'Build Strength' }, { value: 'hypertrophy', label: 'Build Muscle' }, { value: 'fatLoss', label: 'Lose Fat' }, { value: 'endurance', label: 'Improve Endurance' }, { value: 'general', label: 'General Fitness' }].map(opt => (
                      <label key={opt.value} className="radio-label">
                        <input type="radio" name="primaryGoal" value={opt.value} checked={formData.primaryGoal === opt.value} onChange={handleInputChange} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>What's Your Main Motivation?</label>
                  <select name="motivation" value={formData.motivation} onChange={handleInputChange}>
                    <option value="">Select...</option>
                    <option value="health">Better health</option>
                    <option value="confidence">Confidence & appearance</option>
                    <option value="performance">Athletic performance</option>
                    <option value="recovery">Recovery from injury</option>
                    <option value="lifestyle">Lifestyle change</option>
                  </select>
                </div>
              </div>
            )}

            {step === 'lifestyle' && (
              <div className="form-step">
                <h2>Your Lifestyle & Recovery</h2>
                <p className="step-description">Understanding your daily habits helps us optimize your program</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Average Sleep (hours/night)</label>
                    <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleInputChange} placeholder="7" min="3" max="12" step="0.5" />
                  </div>
                  <div className="form-group">
                    <label>Stress Level (1-10)</label>
                    <input type="number" name="stressLevel" value={formData.stressLevel} onChange={handleInputChange} placeholder="5" min="1" max="10" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Daily Activity Level</label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
                    <option value="">Select...</option>
                    <option value="sedentary">Sedentary (desk job)</option>
                    <option value="light">Light (some movement)</option>
                    <option value="moderate">Moderate (active job)</option>
                    <option value="active">Active (very active job)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Any Injuries or Limitations?</label>
                  <div className="checkbox-group">
                    {[{ value: 'none', label: 'No injuries' }, { value: 'lowerBack', label: 'Lower back' }, { value: 'shoulders', label: 'Shoulders' }, { value: 'knees', label: 'Knees' }, { value: 'other', label: 'Other' }].map(opt => (
                      <label key={opt.value} className="checkbox-label">
                        <input type="checkbox" checked={formData.injuries.includes(opt.value)} onChange={() => handleCheckboxChange('injuries', opt.value)} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'preferences' && (
              <div className="form-step">
                <h2>Your Training Preferences</h2>
                <p className="step-description">Customize your experience</p>
                <div className="form-group">
                  <label>Available Equipment</label>
                  <div className="checkbox-group">
                    {[{ value: 'barbell', label: 'Barbell' }, { value: 'dumbbell', label: 'Dumbbells' }, { value: 'leverage machine', label: 'Machines' }, { value: 'cable', label: 'Cable' }, { value: 'kettlebell', label: 'Kettlebell' }, { value: 'band', label: 'Bands' }, { value: 'body weight', label: 'Bodyweight' }].map(opt => (
                      <label key={opt.value} className="checkbox-label">
                        <input type="checkbox" checked={formData.equipment.includes(opt.value)} onChange={() => handleCheckboxChange('equipment', opt.value)} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Preferred Training Style</label>
                  <div className="radio-group">
                    {[{ value: 'fullBody', label: 'Full Body (all muscles each session)' }, { value: 'upperLower', label: 'Upper/Lower Split' }, { value: 'ppl', label: 'Push/Pull/Legs' }].map(opt => (
                      <label key={opt.value} className="radio-label">
                        <input type="radio" name="trainingStyle" value={opt.value} checked={formData.trainingStyle === opt.value} onChange={handleInputChange} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'complete' && (
              <div className="form-step">
                <div className="complete-message">
                  <div className="complete-icon">✓</div>
                  <h2>Welcome to AFYA, {formData.name}!</h2>
                  <p>Your profile is complete. You're ready to:</p>
                  <ul>
                    <li>Generate personalized workouts</li>
                    <li>Create custom meal plans</li>
                    <li>Track your progress</li>
                    <li>Save your programs</li>
                  </ul>
                </div>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="form-buttons">
              {step !== 'account' && step !== 'complete' && (
                <button type="button" className="btn-secondary" onClick={handleBack}>← Back</button>
              )}
              {step !== 'complete' ? (
                <button type="button" className="btn-primary" onClick={handleNext}>Next →</button>
              ) : (
                <button type="submit" className="btn-primary" disabled={loading} onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              )}
            </div>
          </form>

          <p className="login-link">Already have an account? <a href="/login">Log in here</a></p>
        </div>

        {/* Right Side Summary Panel */}
        <div className="signup-summary-panel">
          <h3>Your Profile</h3>
          
          {formData.name && (
            <div className="signup-summary-item">
              <h4>Name</h4>
              <p>{formData.name}</p>
            </div>
          )}
          
          {formData.email && (
            <div className="signup-summary-item">
              <h4>Email</h4>
              <p>{formData.email}</p>
            </div>
          )}
          
          {formData.age && (
            <div className="signup-summary-item">
              <h4>Age</h4>
              <p>{formData.age}</p>
            </div>
          )}
          
          {formData.gender && (
            <div className="signup-summary-item">
              <h4>Gender</h4>
              <p>{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</p>
            </div>
          )}
          
          {formData.height && (
            <div className="signup-summary-item">
              <h4>Height</h4>
              <p>{formData.height}"</p>
            </div>
          )}
          
          {formData.weight && (
            <div className="signup-summary-item">
              <h4>Weight</h4>
              <p>{formData.weight} lbs</p>
            </div>
          )}
          
          {formData.fitnessLevel && (
            <div className="signup-summary-item">
              <h4>Fitness Level</h4>
              <p>{formData.fitnessLevel.charAt(0).toUpperCase() + formData.fitnessLevel.slice(1)}</p>
            </div>
          )}
          
          {formData.primaryGoal && (
            <div className="signup-summary-item">
              <h4>Primary Goal</h4>
              <p>{formData.primaryGoal.charAt(0).toUpperCase() + formData.primaryGoal.slice(1)}</p>
            </div>
          )}
          
          {formData.equipment && formData.equipment.length > 0 && (
            <div className="signup-summary-item">
              <h4>Equipment</h4>
              <p>{formData.equipment.map(eq => formatEquipment(eq)).join(', ')}</p>
            </div>
          )}
          
          <div className="progress-indicator">
            <strong>Step {['account', 'anthropometric', 'training', 'goals', 'lifestyle', 'preferences', 'complete'].indexOf(step) + 1}</strong> of 7
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
