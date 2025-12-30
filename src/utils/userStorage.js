/**
 * User Storage Utility
 * Handles all user profile data persistence using localStorage
 */

const USERS_KEY = 'afya_users';
const CURRENT_USER_KEY = 'afya_current_user';

// Initialize users storage if it doesn't exist
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
    
    // Create test user
    const testUser = {
      id: 'test-user-001',
      email: 'brianchisolm12@gmail.com',
      password: 'Mememe23!',
      name: 'Brian Chisolm',
      createdAt: new Date().toISOString(),
      profile: {
        age: 28,
        gender: 'male',
        height: 70,
        weight: 185,
        fitnessLevel: 'intermediate',
        trainingAge: 3,
        primaryGoal: 'hypertrophy',
        daysPerWeek: 4,
        sessionDuration: 60,
        equipment: ['barbell', 'dumbbell', 'cable', 'body weight'],
        trainingStyle: 'upperLower',
        injuries: [],
        weakPoints: [],
        sleepHours: 7,
        stressLevel: 5,
        favoriteExercises: [],
        dislikedExercises: [],
        progressionStrategy: null,
        bmi: 26.5,
        bmr: 1750,
        tdee: 2625,
        savedWorkouts: [],
        savedMealPlans: [],
        updatedAt: new Date().toISOString()
      }
    };

    // Create admin user
    const adminUser = {
      id: 'admin-user-001',
      email: 'admin@afya.com',
      password: 'Memememe23?',
      name: 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
      profile: {
        age: 30,
        gender: 'male',
        height: 72,
        weight: 190,
        fitnessLevel: 'advanced',
        trainingAge: 8,
        primaryGoal: 'maintenance',
        daysPerWeek: 5,
        sessionDuration: 90,
        equipment: ['barbell', 'dumbbell', 'cable', 'body weight', 'kettlebell'],
        trainingStyle: 'upperLower',
        injuries: [],
        weakPoints: [],
        sleepHours: 8,
        stressLevel: 3,
        favoriteExercises: [],
        dislikedExercises: [],
        progressionStrategy: null,
        bmi: 26.5,
        bmr: 1800,
        tdee: 2700,
        savedWorkouts: [],
        savedMealPlans: [],
        updatedAt: new Date().toISOString()
      }
    };
    
    const users = [testUser, adminUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// Get all users
export const getAllUsers = () => {
  initializeStorage();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Get current logged-in user
export const getCurrentUser = () => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  
  const users = getAllUsers();
  return users.find(u => u.id === userId) || null;
};

// Create new user profile
export const createUser = (userData) => {
  const users = getAllUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    password: userData.password, // In production, this should be hashed
    name: userData.name,
    createdAt: new Date().toISOString(),
    profile: {
      // Anthropometric data
      age: userData.age || null,
      gender: userData.gender || null,
      height: userData.height || null, // in inches
      weight: userData.weight || null, // in lbs
      
      // Training data
      fitnessLevel: userData.fitnessLevel || null,
      trainingAge: userData.trainingAge || null, // years of consistent training
      primaryGoal: userData.primaryGoal || null,
      
      // Lifestyle data
      daysPerWeek: userData.daysPerWeek || null,
      sessionDuration: userData.sessionDuration || null,
      equipment: userData.equipment || [],
      trainingStyle: userData.trainingStyle || null,
      
      // Health data
      injuries: userData.injuries || [],
      weakPoints: userData.weakPoints || [],
      
      // Recovery data
      sleepHours: userData.sleepHours || null,
      stressLevel: userData.stressLevel || null, // 1-10
      
      // Preferences
      favoriteExercises: userData.favoriteExercises || [],
      dislikedExercises: userData.dislikedExercises || [],
      progressionStrategy: userData.progressionStrategy || null,
      
      // Calculated metrics
      bmi: null,
      bmr: null,
      tdee: null,
      
      // Saved programs
      savedWorkouts: [],
      savedMealPlans: [],
      
      // Last updated
      updatedAt: new Date().toISOString()
    }
  };
  
  // Calculate BMI and BMR if we have the data
  if (newUser.profile.weight && newUser.profile.height && newUser.profile.age && newUser.profile.gender) {
    newUser.profile.bmi = calculateBMI(newUser.profile.weight, newUser.profile.height);
    newUser.profile.bmr = calculateBMR(
      newUser.profile.weight,
      newUser.profile.height,
      newUser.profile.age,
      newUser.profile.gender
    );
  }
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
};

// Login user
export const loginUser = (email, password) => {
  const users = getAllUsers();
  console.log('Available users:', users.map(u => ({ email: u.email, role: u.role })));
  console.log('Login attempt:', { email, password });
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  localStorage.setItem(CURRENT_USER_KEY, user.id);
  return user;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Update user profile
export const updateUserProfile = (userId, profileData) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Merge profile data
  users[userIndex].profile = {
    ...users[userIndex].profile,
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  
  // Recalculate BMI and BMR if relevant data changed
  if (profileData.weight || profileData.height || profileData.age || profileData.gender) {
    const profile = users[userIndex].profile;
    if (profile.weight && profile.height) {
      profile.bmi = calculateBMI(profile.weight, profile.height);
    }
    if (profile.weight && profile.height && profile.age && profile.gender) {
      profile.bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    }
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Update current user if it's the logged-in user
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
  if (currentUserId === userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  }
  
  return users[userIndex];
};

// Save workout to user profile
export const saveWorkoutToUser = (userId, workout) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const savedWorkout = {
    id: Date.now().toString(),
    ...workout,
    savedAt: new Date().toISOString()
  };
  
  users[userIndex].profile.savedWorkouts.push(savedWorkout);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return savedWorkout;
};

// Save meal plan to user profile
export const saveMealPlanToUser = (userId, mealPlan) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const savedMealPlan = {
    id: Date.now().toString(),
    ...mealPlan,
    savedAt: new Date().toISOString()
  };
  
  users[userIndex].profile.savedMealPlans.push(savedMealPlan);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return savedMealPlan;
};

// Get user's saved workouts
export const getUserSavedWorkouts = (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  return user ? user.profile.savedWorkouts : [];
};

// Get user's saved meal plans
export const getUserSavedMealPlans = (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  return user ? user.profile.savedMealPlans : [];
};

// Calculate BMI (weight in lbs, height in inches)
export const calculateBMI = (weightLbs, heightInches) => {
  return Math.round((weightLbs / (heightInches * heightInches)) * 703 * 10) / 10;
};

// Calculate BMR using Mifflin-St Jeor equation
export const calculateBMR = (weightLbs, heightInches, age, gender) => {
  const weightKg = weightLbs * 0.453592;
  const heightCm = heightInches * 2.54;
  
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  
  return Math.round(bmr);
};

// Calculate TDEE
export const calculateTDEE = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};
