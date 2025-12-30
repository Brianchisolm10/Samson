import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/userStorage';
import { exerciseCategories, equipmentOptions, difficultyLevels } from '../utils/exerciseDatabase';
import { formatExerciseName, formatEquipment } from '../utils/formatters';
import './ExerciseLibraryManager.css';
import TopNav from './TopNav';
import Footer from './Footer';

function ExerciseLibraryManager() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [apiExercises, setApiExercises] = useState([]);
  const [customExercises, setCustomExercises] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [targetMuscleCategories, setTargetMuscleCategories] = useState([]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    bodyPart: 'chest',
    target: 'pectorals',
    category: 'chest',
    equipment: 'body weight',
    difficulty: 'beginner',
    gifUrl: '',
    description: '',
    sets: '3',
    reps: '8-12',
    rest: '60-90 sec',
    notes: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Load API exercises from db.json
  useEffect(() => {
    const loadApiExercises = async () => {
      try {
        console.log('📂 Loading exercises from db.json...');
        const response = await fetch('/db.json');
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Loaded from db.json:', data.length, 'exercises');
          setApiExercises(data);
          
          // Extract unique target muscle values and create categories
          const uniqueTargetMuscles = [...new Set(data.map(ex => ex.target))].sort();
          const categories = uniqueTargetMuscles.map(target => ({
            value: target,
            label: target.charAt(0).toUpperCase() + target.slice(1)
          }));
          setTargetMuscleCategories(categories);
          
          console.log(`✅ Loaded ${data.length} exercises from db.json`);
          console.log(`📂 Found ${categories.length} target muscle categories`);
        } else {
          console.error('Failed to fetch db.json, status:', response.status);
        }
      } catch (error) {
        console.error('Error loading exercises from db.json:', error);
      }
    };

    loadApiExercises();
  }, []);

  // Load custom exercises from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customExercises');
    if (saved) {
      setCustomExercises(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('State updated - apiExercises:', apiExercises.length, 'customExercises:', customExercises.length, 'targetMuscleCategories:', targetMuscleCategories.length);
  }, [apiExercises, customExercises, targetMuscleCategories]);

  const allAvailableExercises = [...apiExercises, ...customExercises];

  const handleAddExercise = () => {
    if (!newExercise.name || !newExercise.bodyPart) {
      alert('Please fill in name and body part');
      return;
    }

    if (editingId) {
      const updatedExercises = customExercises.map(e => e.id === editingId ? newExercise : e);
      setCustomExercises(updatedExercises);
      localStorage.setItem('customExercises', JSON.stringify(updatedExercises));
      setEditingId(null);
    } else {
      const updatedExercises = [...customExercises, { ...newExercise, id: Date.now() }];
      setCustomExercises(updatedExercises);
      localStorage.setItem('customExercises', JSON.stringify(updatedExercises));
    }

    setNewExercise({
      name: '',
      bodyPart: 'chest',
      target: 'pectorals',
      category: 'chest',
      equipment: 'body weight',
      difficulty: 'beginner',
      gifUrl: '',
      description: '',
      sets: '3',
      reps: '8-12',
      rest: '60-90 sec',
      notes: ''
    });
  };

  const handleDeleteExercise = (id) => {
    const updatedExercises = customExercises.filter(e => e.id !== id);
    setCustomExercises(updatedExercises);
    localStorage.setItem('customExercises', JSON.stringify(updatedExercises));
  };

  const handleEditExercise = (exercise) => {
    setNewExercise(exercise);
    setEditingId(exercise.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewExercise({
      name: '',
      bodyPart: 'chest',
      target: 'pectorals',
      category: 'chest',
      equipment: 'body weight',
      difficulty: 'beginner',
      gifUrl: '',
      description: '',
      sets: '3',
      reps: '8-12',
      rest: '60-90 sec',
      notes: ''
    });
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const filteredExercises = allAvailableExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.target === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopNav />
      <div className="exercise-library-manager">
        <section className="manager-hero">
          <div className="hero-content">
            <h1>Exercise Library Manager</h1>
            <p className="hero-subtitle">Manage exercises with detailed training information</p>
          </div>
          <div className="hero-actions">
            <button className="btn-dashboard" onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </section>

        <div className="manager-layout">
          {/* Add Exercise Section */}
          <section className="manager-card">
            <div className="card-title">
              <h2>{editingId ? 'Edit Exercise' : 'Add New Exercise'}</h2>
            </div>
            <div className="exercise-form">
              <div className="form-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'training' ? 'active' : ''}`}
                  onClick={() => setActiveTab('training')}
                >
                  Training
                </button>
              </div>

              <div className="form-content">
                {activeTab === 'basic' && (
                  <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Exercise Name</label>
                        <input
                          type="text"
                          placeholder="e.g., Bench Press"
                          value={newExercise.name}
                          onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Body Part</label>
                        <select
                          value={newExercise.bodyPart}
                          onChange={(e) => setNewExercise({...newExercise, bodyPart: e.target.value})}
                          className="form-input"
                        >
                          <option value="chest">Chest</option>
                          <option value="back">Back</option>
                          <option value="shoulders">Shoulders</option>
                          <option value="upper arms">Upper Arms</option>
                          <option value="upper legs">Upper Legs</option>
                          <option value="lower legs">Lower Legs</option>
                          <option value="waist">Waist/Core</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Target Muscle</label>
                        <input
                          type="text"
                          placeholder="e.g., Pectorals"
                          value={newExercise.target}
                          onChange={(e) => setNewExercise({...newExercise, target: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={newExercise.category}
                          onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                          className="form-input"
                        >
                          {exerciseCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Equipment</label>
                        <select
                          value={newExercise.equipment}
                          onChange={(e) => setNewExercise({...newExercise, equipment: e.target.value})}
                          className="form-input"
                        >
                          {equipmentOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Difficulty</label>
                        <select
                          value={newExercise.difficulty}
                          onChange={(e) => setNewExercise({...newExercise, difficulty: e.target.value})}
                          className="form-input"
                        >
                          {difficultyLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="form-section">
                    <h3>Exercise Details</h3>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                          placeholder="Brief description of the exercise"
                          value={newExercise.description}
                          onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                          className="form-input"
                          rows="3"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>GIF URL</label>
                        <input
                          type="text"
                          placeholder="https://example.com/exercise.gif"
                          value={newExercise.gifUrl}
                          onChange={(e) => setNewExercise({...newExercise, gifUrl: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Notes</label>
                        <textarea
                          placeholder="Form tips and important notes"
                          value={newExercise.notes}
                          onChange={(e) => setNewExercise({...newExercise, notes: e.target.value})}
                          className="form-input"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'training' && (
                  <div className="form-section">
                    <h3>Training Parameters</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Sets</label>
                        <input
                          type="text"
                          placeholder="e.g., 3, 4, 3-4"
                          value={newExercise.sets}
                          onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Reps</label>
                        <input
                          type="text"
                          placeholder="e.g., 8-12, 6-10"
                          value={newExercise.reps}
                          onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Rest Period</label>
                        <input
                          type="text"
                          placeholder="e.g., 60-90 sec, 2-3 min"
                          value={newExercise.rest}
                          onChange={(e) => setNewExercise({...newExercise, rest: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button onClick={handleAddExercise} className="btn-add-exercise">
                  {editingId ? 'Update Exercise' : 'Add Exercise to Library'}
                </button>
                {editingId && (
                  <button onClick={handleCancelEdit} className="btn-cancel">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Exercises List Section */}
          <section className="manager-card">
            <div className="list-header">
              <h2>Exercise Library ({filteredExercises.length})</h2>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="category-tabs">
              <button 
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Exercises ({allAvailableExercises.length})
              </button>
              {targetMuscleCategories.map(cat => {
                const count = allAvailableExercises.filter(ex => ex.target === cat.value).length;
                return (
                  <button 
                    key={cat.value}
                    className={`category-tab ${selectedCategory === cat.value ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            <div style={{padding: '16px', background: '#f9f7f4', marginBottom: '16px', fontSize: '12px', color: '#666', borderRadius: '0'}}>
              Showing {filteredExercises.length} of {allAvailableExercises.length} exercises | API: {apiExercises.length} | Custom: {customExercises.length} | Categories: {targetMuscleCategories.length}
              {apiExercises.length > 0 && (
                <div style={{marginTop: '8px', fontSize: '11px', color: '#999'}}>
                  First exercise: {apiExercises[0]?.name} - GIF: {apiExercises[0]?.gifUrl ? '✓' : '✗'}
                </div>
              )}
            </div>

            {filteredExercises.length === 0 ? (
              <p className="empty-state">No exercises found</p>
            ) : (
              <div className="exercises-grid">
                {filteredExercises.map((exercise) => (
                  <div key={exercise.id} className="exercise-card">
                    <div className="exercise-card-header">
                      <div className="exercise-info">
                        <h3>{formatExerciseName(exercise.name)}</h3>
                        <div className="exercise-badges">
                          {exercise.difficulty && (
                            <span className={`badge badge-${exercise.difficulty}`}>
                              {exercise.difficulty}
                            </span>
                          )}
                          <span className={`badge badge-equipment`}>
                            {formatEquipment(exercise.equipment)}
                          </span>
                        </div>
                      </div>
                      <div className="exercise-actions">
                        {customExercises.some(e => e.id === exercise.id) && (
                          <>
                            <button 
                              onClick={() => handleEditExercise(exercise)}
                              className="btn-edit"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteExercise(exercise.id)}
                              className="btn-delete"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="exercise-card-body">
                      <div className="body-part-info">
                        <span className="label">Body Part:</span>
                        <span className="value">{formatExerciseName(exercise.bodyPart)}</span>
                      </div>
                      {exercise.target && (
                        <div className="target-info">
                          <span className="label">Target:</span>
                          <span className="value">{formatExerciseName(exercise.target)}</span>
                        </div>
                      )}

                      {exercise.gifUrl && (
                        <div className="exercise-gif-preview">
                          <img 
                            src={exercise.gifUrl} 
                            alt={exercise.name}
                            className="exercise-gif-thumbnail"
                            onError={(e) => {
                              console.error(`Failed to load GIF for ${exercise.name}:`, exercise.gifUrl);
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #999; font-size: 12px;">GIF not available</div>';
                            }}
                            onLoad={() => {
                              console.log(`Loaded GIF for ${exercise.name}`);
                            }}
                          />
                        </div>
                      )}

                      {exercise.description && (
                        <div className="description">
                          <p>{exercise.description}</p>
                        </div>
                      )}

                      {exercise.sets && (
                        <div className="training-params">
                          <div className="param-item">
                            <span className="param-label">Sets</span>
                            <span className="param-value">{exercise.sets}</span>
                          </div>
                          <div className="param-item">
                            <span className="param-label">Reps</span>
                            <span className="param-value">{exercise.reps}</span>
                          </div>
                          <div className="param-item">
                            <span className="param-label">Rest</span>
                            <span className="param-value">{exercise.rest}</span>
                          </div>
                        </div>
                      )}

                      {exercise.notes && (
                        <div className="notes">
                          <p><strong>Notes:</strong> {exercise.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExerciseLibraryManager;
