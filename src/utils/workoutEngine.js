/**
 * Workout Generation Engine
 * Converts questionnaire responses into detailed, personalized workout programs
 * Never defaults - always generates valid programs based on exact client needs
 */

export const generateDetailedWorkout = async (responses) => {
  const {
    fitnessLevel,
    primaryGoal,
    daysPerWeek,
    equipment,
    sessionDuration,
    trainingStyle,
    injuries,
    weakPoints,
    experience,
    progressionStrategy
  } = responses;

  console.log('🚀 Generating workout with responses:', responses);

  // Fetch available exercises from the API
  const exercises = await fetchExercises();
  console.log(`✅ Total exercises loaded: ${exercises.length}`);
  
  if (exercises.length === 0) {
    console.error('❌ No exercises loaded! Check database connection.');
    throw new Error('Failed to load exercises from database');
  }

  // Build the program structure
  const program = {
    metadata: {
      createdAt: new Date().toISOString(),
      clientLevel: fitnessLevel,
      goal: primaryGoal,
      daysPerWeek,
      estimatedDuration: `${daysPerWeek * sessionDuration} minutes/week`
    },
    
    workoutSplit: generateWorkoutSplit({
      fitnessLevel,
      daysPerWeek,
      trainingStyle,
      primaryGoal
    }),

    warmup: generateWarmup(fitnessLevel),
    
    workouts: generateWorkouts({
      fitnessLevel,
      primaryGoal,
      daysPerWeek,
      equipment,
      sessionDuration,
      trainingStyle,
      weakPoints,
      experience,
      exercises
    }),

    cooldown: generateCooldown(fitnessLevel),

    progressionPlan: generateProgressionPlan({
      fitnessLevel,
      primaryGoal,
      progressionStrategy,
      daysPerWeek
    }),

    guidelines: generateGuidelines({
      fitnessLevel,
      primaryGoal,
      injuries,
      weakPoints,
      sessionDuration
    }),

    modifications: generateModifications({
      injuries,
      equipment,
      fitnessLevel
    })
  };

  return program;
};

const fetchExercises = async () => {
  try {
    // Try to fetch from the API first
    const response = await fetch('/api/exercises');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Fetched exercises from API:', data.length);
      return data;
    }
  } catch (error) {
    console.error('❌ Error fetching from API:', error);
  }

  try {
    // Try to fetch from db.json - this has hundreds of exercises with GIFs
    const response = await fetch('/db.json');
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Loaded exercises from db.json: ${data.length} exercises`);
      return data;
    }
  } catch (error) {
    console.error('❌ Error loading db.json:', error);
  }

  // Last resort: return mock exercises
  console.log('⚠️ Using mock exercises (limited set)');
  return getMockExercises();
};

const getMockExercises = () => {
  // Fallback exercises if database can't be loaded - using exact equipment names from db.json
  return [
    // Chest
    { name: 'Push-up', bodyPart: 'chest', target: 'pectorals', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Push-up' },
    { name: 'Bench Press', bodyPart: 'chest', target: 'pectorals', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Bench+Press' },
    { name: 'Dumbbell Press', bodyPart: 'chest', target: 'pectorals', equipment: 'dumbbell', gifUrl: 'https://via.placeholder.com/300x300?text=DB+Press' },
    { name: 'Machine Chest Press', bodyPart: 'chest', target: 'pectorals', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Machine+Press' },
    
    // Back
    { name: 'Pull-up', bodyPart: 'back', target: 'lats', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Pull-up' },
    { name: 'Barbell Row', bodyPart: 'back', target: 'lats', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Barbell+Row' },
    { name: 'Dumbbell Row', bodyPart: 'back', target: 'lats', equipment: 'dumbbell', gifUrl: 'https://via.placeholder.com/300x300?text=DB+Row' },
    { name: 'Lat Pulldown', bodyPart: 'back', target: 'lats', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Lat+Pulldown' },
    
    // Shoulders
    { name: 'Shoulder Press', bodyPart: 'shoulders', target: 'deltoids', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Shoulder+Press' },
    { name: 'Lateral Raise', bodyPart: 'shoulders', target: 'deltoids', equipment: 'dumbbell', gifUrl: 'https://via.placeholder.com/300x300?text=Lateral+Raise' },
    { name: 'Pike Push-up', bodyPart: 'shoulders', target: 'deltoids', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Pike+Push-up' },
    { name: 'Machine Shoulder Press', bodyPart: 'shoulders', target: 'deltoids', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Machine+Press' },
    
    // Upper Arms
    { name: 'Bicep Curl', bodyPart: 'upper arms', target: 'biceps', equipment: 'dumbbell', gifUrl: 'https://via.placeholder.com/300x300?text=Bicep+Curl' },
    { name: 'Tricep Dip', bodyPart: 'upper arms', target: 'triceps', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Tricep+Dip' },
    { name: 'Barbell Curl', bodyPart: 'upper arms', target: 'biceps', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Barbell+Curl' },
    { name: 'Cable Curl', bodyPart: 'upper arms', target: 'biceps', equipment: 'cable', gifUrl: 'https://via.placeholder.com/300x300?text=Cable+Curl' },
    
    // Upper Legs
    { name: 'Bodyweight Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Squat' },
    { name: 'Barbell Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Barbell+Squat' },
    { name: 'Leg Press', bodyPart: 'upper legs', target: 'quads', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Leg+Press' },
    { name: 'Leg Curl', bodyPart: 'upper legs', target: 'hamstrings', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Leg+Curl' },
    
    // Lower Legs
    { name: 'Calf Raise', bodyPart: 'lower legs', target: 'calves', equipment: 'barbell', gifUrl: 'https://via.placeholder.com/300x300?text=Calf+Raise' },
    { name: 'Seated Calf Raise', bodyPart: 'lower legs', target: 'calves', equipment: 'machine', gifUrl: 'https://via.placeholder.com/300x300?text=Seated+Calf+Raise' },
    
    // Waist/Core
    { name: 'Plank', bodyPart: 'waist', target: 'abs', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Plank' },
    { name: 'Crunch', bodyPart: 'waist', target: 'abs', equipment: 'body weight', gifUrl: 'https://via.placeholder.com/300x300?text=Crunch' },
    { name: 'Cable Crunch', bodyPart: 'waist', target: 'abs', equipment: 'cable', gifUrl: 'https://via.placeholder.com/300x300?text=Cable+Crunch' }
  ];
};

const generateWorkoutSplit = ({ fitnessLevel, daysPerWeek, trainingStyle, primaryGoal }) => {
  const splits = {
    beginner: {
      3: {
        name: 'Full Body 3x/Week',
        days: ['Full Body A', 'Full Body B', 'Full Body C'],
        description: 'Each session hits all major muscle groups for balanced development'
      },
      4: {
        name: 'Full Body 4x/Week',
        days: ['Full Body A', 'Full Body B', 'Full Body C', 'Full Body D'],
        description: 'Increased frequency for better recovery and consistency'
      },
      5: {
        name: 'Full Body 5x/Week',
        days: ['Full Body A', 'Full Body B', 'Full Body C', 'Full Body D', 'Full Body E'],
        description: 'High frequency with lower volume per session'
      },
      6: {
        name: 'Full Body 6x/Week',
        days: ['Full Body A', 'Full Body B', 'Full Body C', 'Full Body A', 'Full Body B', 'Full Body C'],
        description: 'Repeat 3-day cycle twice per week'
      }
    },
    intermediate: {
      3: {
        name: 'Full Body 3x/Week',
        days: ['Full Body A', 'Full Body B', 'Full Body C'],
        description: 'Balanced approach with varied rep ranges'
      },
      4: {
        name: 'Upper/Lower Split',
        days: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
        description: 'Allows higher volume per muscle group'
      },
      5: {
        name: 'Push/Pull/Legs',
        days: ['Push', 'Pull', 'Legs', 'Push', 'Pull'],
        description: 'Optimal for hypertrophy and strength'
      },
      6: {
        name: 'Push/Pull/Legs (2x)',
        days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
        description: 'High frequency PPL split'
      }
    },
    advanced: {
      3: {
        name: 'Upper/Lower Split',
        days: ['Upper A', 'Lower A', 'Upper B'],
        description: 'Periodized approach with varying intensities'
      },
      4: {
        name: 'Upper/Lower Split',
        days: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
        description: 'Full upper/lower cycle twice per week'
      },
      5: {
        name: 'Push/Pull/Legs',
        days: ['Push', 'Pull', 'Legs', 'Push', 'Pull'],
        description: 'Advanced PPL with periodization'
      },
      6: {
        name: 'Push/Pull/Legs (2x)',
        days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
        description: 'Full PPL cycle twice per week'
      }
    }
  };

  return splits[fitnessLevel][daysPerWeek] || splits[fitnessLevel][3];
};

const generateWorkouts = ({
  fitnessLevel,
  primaryGoal,
  daysPerWeek,
  equipment,
  sessionDuration,
  trainingStyle,
  weakPoints,
  experience,
  exercises
}) => {
  const split = generateWorkoutSplit({
    fitnessLevel,
    daysPerWeek,
    trainingStyle,
    primaryGoal
  });

  console.log(`📅 Generating ${split.days.length} workout days:`, split.days);

  const usedExercises = new Set(); // Track exercises used across all days

  return split.days.map((dayName, index) => {
    const dayExercises = selectExercisesForDay({
      dayName,
      fitnessLevel,
      primaryGoal,
      equipment,
      weakPoints,
      exercises,
      usedExercises
    });

    // Add these exercises to the used set
    dayExercises.forEach(ex => usedExercises.add(ex.name));

    console.log(`✅ Day ${index + 1} (${dayName}): ${dayExercises.length} exercises selected`);
    dayExercises.forEach(ex => {
      console.log(`   - ${ex.name} (${ex.equipment})`);
    });

    return {
      day: index + 1,
      name: dayName,
      duration: sessionDuration,
      exercises: dayExercises,
      notes: generateDayNotes(dayName, fitnessLevel, primaryGoal)
    };
  });
};

const selectExercisesForDay = ({
  dayName,
  fitnessLevel,
  primaryGoal,
  equipment,
  weakPoints,
  exercises,
  usedExercises = new Set()
}) => {
  console.log(`Selecting exercises for ${dayName}, total available: ${exercises.length}`);
  console.log(`Equipment filter:`, equipment);
  
  // Filter exercises based on equipment availability
  let availableExercises = exercises;
  
  // If equipment is specified, filter by it with smart mapping
  if (equipment && Array.isArray(equipment) && equipment.length > 0) {
    const equipmentMap = {
      'barbell': ['barbell', 'olympic barbell', 'ez barbell', 'trap bar'],
      'dumbbell': ['dumbbell'],
      'leverage machine': ['leverage machine', 'machine', 'smith machine', 'sled machine'],
      'cable': ['cable'],
      'kettlebell': ['kettlebell'],
      'band': ['band', 'resistance band'],
      'body weight': ['body weight', 'bodyweight']
    };

    const allowedEquipment = new Set();
    equipment.forEach(e => {
      const mapped = equipmentMap[e.toLowerCase()] || [e.toLowerCase()];
      mapped.forEach(m => allowedEquipment.add(m));
    });

    availableExercises = exercises.filter(ex => {
      const exEquip = (ex.equipment || '').toLowerCase();
      const exName = (ex.name || '').toLowerCase();
      
      // Exclude exercises that require specific equipment not selected
      // Even if marked as "body weight", some exercises need bars/equipment
      const requiresDipBar = (exName.includes('dip') && !exName.includes('bench dip') && !exName.includes('floor dip')) || 
                             exName.includes('parallel bar');
      const requiresPullupBar = exName.includes('pull-up') || exName.includes('pullup') || exName.includes('chin-up');
      const requiresBarbell = exEquip.includes('barbell') && !allowedEquipment.has('barbell');
      const requiresCable = exEquip.includes('cable') && !allowedEquipment.has('cable');
      const requiresMachine = exEquip.includes('machine') && !allowedEquipment.has('leverage machine');
      const requiresWeighted = exEquip.includes('weighted') && !allowedEquipment.has('barbell') && !allowedEquipment.has('dumbbell');
      
      // If user only has body weight and dumbbells, exclude exercises needing bars
      if (allowedEquipment.has('body weight') && allowedEquipment.size === 1) {
        if (requiresDipBar || requiresPullupBar) return false;
      }
      
      if (requiresDipBar || requiresPullupBar || requiresBarbell || requiresCable || requiresMachine || requiresWeighted) {
        return false;
      }
      
      // Check if exercise equipment is in allowed list
      return Array.from(allowedEquipment).some(allowed => exEquip.includes(allowed));
    });
  }
  
  console.log(`After equipment filter: ${availableExercises.length}`);

  // Determine target body parts for this day
  const targetParts = getTargetBodyParts(dayName);
  console.log(`Target body parts for ${dayName}:`, targetParts);

  // Select exercises for this day - group by target to ensure variety
  let dayExercises = [];
  
  // For each target body part, get exercises
  for (const target of targetParts) {
    const targetExercises = availableExercises.filter(ex =>
      (ex.bodyPart === target || ex.target === target) && !usedExercises.has(ex.name)
    );
    dayExercises = dayExercises.concat(targetExercises);
  }
  
  console.log(`Exercises matching body parts: ${dayExercises.length}`);

  // If no exercises found, use all available exercises for this day (even if used before)
  if (dayExercises.length === 0) {
    console.warn(`No new exercises found for ${dayName}. Using previously used exercises.`);
    for (const target of targetParts) {
      const targetExercises = availableExercises.filter(ex =>
        ex.bodyPart === target || ex.target === target
      );
      dayExercises = dayExercises.concat(targetExercises);
    }
  }

  // Prioritize weak points
  const prioritized = prioritizeWeakPoints(dayExercises, weakPoints);

  // Build the workout with appropriate volume
  return buildDayWorkout({
    exercises: prioritized,
    fitnessLevel,
    primaryGoal,
    dayName,
    usedExercises
  });
};

const getTargetBodyParts = (dayName) => {
  const bodyPartMap = {
    'Full Body A': ['chest', 'back', 'upper legs'],
    'Full Body B': ['shoulders', 'upper arms', 'upper legs'],
    'Full Body C': ['chest', 'back', 'shoulders'],
    'Full Body D': ['upper arms', 'lower arms', 'upper legs'],
    'Full Body E': ['chest', 'shoulders', 'back'],
    'Upper A': ['chest', 'shoulders', 'upper arms'],
    'Upper B': ['back', 'upper arms', 'lower arms'],
    'Lower A': ['upper legs', 'lower legs'],
    'Lower B': ['upper legs', 'lower legs', 'waist'],
    'Push': ['chest', 'shoulders', 'upper arms'],
    'Pull': ['back', 'upper arms', 'lower arms'],
    'Legs': ['upper legs', 'lower legs']
  };

  return bodyPartMap[dayName] || ['chest', 'back', 'shoulders', 'upper legs', 'upper arms'];
};

const prioritizeWeakPoints = (exercises, weakPoints) => {
  if (!weakPoints || weakPoints.length === 0) {
    return exercises;
  }

  // Sort exercises so weak points come first
  return exercises.sort((a, b) => {
    const aIsWeak = weakPoints.includes(a.target);
    const bIsWeak = weakPoints.includes(b.target);
    return aIsWeak ? -1 : bIsWeak ? 1 : 0;
  });
};

const isCompoundExercise = (exerciseName) => {
  const compoundKeywords = [
    'squat', 'deadlift', 'bench press', 'row', 'pull-up', 'pullup',
    'dip', 'press', 'clean', 'snatch', 'thruster', 'lunge', 'step-up',
    'leg press', 'hack squat', 'smith machine squat'
  ];
  
  const name = exerciseName.toLowerCase();
  return compoundKeywords.some(keyword => name.includes(keyword));
};

const getExerciseVariant = (exerciseName) => {
  // Extract the base movement (e.g., "bench press" from "barbell bench press")
  const name = exerciseName.toLowerCase();
  
  // Remove equipment prefixes
  let variant = name
    .replace(/^(barbell|dumbbell|machine|cable|kettlebell|smith machine|leverage machine|ez)\s+/i, '')
    .replace(/\s+(barbell|dumbbell|machine|cable|kettlebell)$/i, '');
  
  // Normalize variations
  if (variant.includes('bench press')) return 'bench press';
  if (variant.includes('row')) return 'row';
  if (variant.includes('squat')) return 'squat';
  if (variant.includes('deadlift')) return 'deadlift';
  if (variant.includes('pull')) return 'pull';
  if (variant.includes('press')) return 'press';
  if (variant.includes('curl')) return 'curl';
  if (variant.includes('raise')) return 'raise';
  if (variant.includes('dip')) return 'dip';
  if (variant.includes('crunch')) return 'crunch';
  if (variant.includes('plank')) return 'plank';
  
  return variant;
};

const buildDayWorkout = ({ exercises, fitnessLevel, primaryGoal, dayName, usedExercises }) => {
  const volumeMap = {
    beginner: 4,
    intermediate: 5,
    advanced: 6
  };

  const maxExercises = volumeMap[fitnessLevel];
  
  // Prioritize compound exercises first, then isolation
  const compounds = exercises.filter(ex => isCompoundExercise(ex.name));
  const isolations = exercises.filter(ex => !isCompoundExercise(ex.name));
  
  // Combine: compounds first (for neuromuscular priority), then isolations
  const prioritized = [...compounds, ...isolations];
  
  // Remove duplicates by name AND by exercise variant to avoid similar exercises
  // BUT allow the same exercise if it's a compound and we need more volume
  const seen = new Set();
  const variantsSeen = new Set();
  const uniqueExercises = [];
  let compoundCount = 0;
  
  for (const exercise of prioritized) {
    const variant = getExerciseVariant(exercise.name);
    const isCompound = isCompoundExercise(exercise.name);
    
    // For compounds: allow up to 2 of the same exercise (e.g., bench press with different rep ranges)
    // For isolations: only allow one variant per movement
    if (isCompound && seen.has(exercise.name) && compoundCount < 2) {
      // Allow this compound exercise again
      uniqueExercises.push(exercise);
      compoundCount++;
    } else if (!seen.has(exercise.name) && !variantsSeen.has(variant)) {
      // New exercise or variant
      seen.add(exercise.name);
      variantsSeen.add(variant);
      if (isCompound) compoundCount = 1;
      uniqueExercises.push(exercise);
    }
    
    if (uniqueExercises.length >= maxExercises) break;
  }

  // If we don't have enough exercises, log a warning
  if (uniqueExercises.length < maxExercises) {
    console.warn(`Only found ${uniqueExercises.length} unique exercises for ${dayName}, needed ${maxExercises}`);
  }

  return uniqueExercises.map((exercise, index) => {
    const isCompound = isCompoundExercise(exercise.name);
    
    return {
      order: index + 1,
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      target: exercise.target,
      equipment: exercise.equipment,
      gifUrl: exercise.gifUrl || `https://via.placeholder.com/300x300?text=${encodeURIComponent(exercise.name)}`,
      sets: getSetCount(fitnessLevel, primaryGoal, index, isCompound),
      reps: getRepRange(fitnessLevel, primaryGoal, index, isCompound),
      rest: getRestPeriod(fitnessLevel, primaryGoal, isCompound),
      notes: getExerciseNotes(fitnessLevel, exercise.name),
      isCompound
    };
  });
};

const getSetCount = (fitnessLevel, primaryGoal, exerciseIndex, isCompound) => {
  // Compound movements get more sets than isolation
  const compoundSets = {
    beginner: 3,
    intermediate: 4,
    advanced: 5
  };
  
  const isolationSets = {
    beginner: 2,
    intermediate: 3,
    advanced: 3
  };

  const baseSet = isCompound ? compoundSets[fitnessLevel] : isolationSets[fitnessLevel];
  
  // Strength goals need more sets for heavy work
  if (primaryGoal === 'strength' && isCompound) {
    return baseSet + 1;
  }
  
  return baseSet;
};

const getRepRange = (fitnessLevel, primaryGoal, exerciseIndex, isCompound) => {
  // Goal-specific rep ranges
  const repRanges = {
    strength: { beginner: '5-8', intermediate: '3-6', advanced: '1-5' },
    hypertrophy: { beginner: '8-12', intermediate: '8-12', advanced: '6-12' },
    endurance: { beginner: '12-15', intermediate: '12-15', advanced: '10-15' },
    fatLoss: { beginner: '10-12', intermediate: '8-12', advanced: '8-12' },
    general: { beginner: '8-12', intermediate: '8-12', advanced: '6-12' }
  };

  return repRanges[primaryGoal][fitnessLevel];
};

const getRestPeriod = (fitnessLevel, primaryGoal, isCompound) => {
  // Rest periods vary by goal and exercise type
  const restMap = {
    strength: {
      compound: { beginner: '2-3 min', intermediate: '2-3 min', advanced: '3-5 min' },
      isolation: { beginner: '1-2 min', intermediate: '1.5-2 min', advanced: '1.5-2 min' }
    },
    hypertrophy: {
      compound: { beginner: '1.5-2 min', intermediate: '1.5-2 min', advanced: '2-3 min' },
      isolation: { beginner: '60-90 sec', intermediate: '60-90 sec', advanced: '90-120 sec' }
    },
    endurance: {
      compound: { beginner: '60-90 sec', intermediate: '60-90 sec', advanced: '90-120 sec' },
      isolation: { beginner: '45-60 sec', intermediate: '45-60 sec', advanced: '60-90 sec' }
    },
    fatLoss: {
      compound: { beginner: '60-90 sec', intermediate: '60-90 sec', advanced: '90-120 sec' },
      isolation: { beginner: '45-60 sec', intermediate: '45-60 sec', advanced: '60-90 sec' }
    },
    general: {
      compound: { beginner: '1.5-2 min', intermediate: '1.5-2 min', advanced: '2-3 min' },
      isolation: { beginner: '60-90 sec', intermediate: '60-90 sec', advanced: '90-120 sec' }
    }
  };

  const exerciseType = isCompound ? 'compound' : 'isolation';
  return restMap[primaryGoal][exerciseType][fitnessLevel];
};

const getExerciseNotes = (fitnessLevel, exerciseName) => {
  const name = exerciseName.toLowerCase();
  
  // Dynamic notes based on exercise type
  if (name.includes('press')) {
    return 'Control the descent. Explosive up, controlled down.';
  } else if (name.includes('curl') || name.includes('row')) {
    return 'Squeeze at the top. Feel the muscle working.';
  } else if (name.includes('squat') || name.includes('deadlift')) {
    return 'Keep chest up. Drive through heels.';
  } else if (name.includes('pull') || name.includes('lat')) {
    return 'Pull elbows down and back. Full range of motion.';
  } else if (name.includes('raise')) {
    return 'Controlled movement. Avoid momentum.';
  } else if (name.includes('dip')) {
    return 'Lower until elbows are 90°. Full range.';
  } else if (name.includes('crunch') || name.includes('ab')) {
    return 'Crunch up, not pull. Feel the abs contract.';
  } else if (name.includes('plank')) {
    return 'Keep body straight. Engage core throughout.';
  }
  
  // Default notes by level
  const notes = {
    beginner: 'Focus on form and control. Don\'t rush the movement.',
    intermediate: 'Maintain consistent tempo. Track your weight.',
    advanced: 'Control the eccentric. Maximize time under tension.'
  };

  return notes[fitnessLevel];
};

const generateProgressionPlan = ({ fitnessLevel, primaryGoal, progressionStrategy, daysPerWeek }) => {
  // Goal-specific progression strategies
  const progressionMap = {
    strength: {
      name: 'Linear Progression (Strength)',
      description: 'Add weight each week when you hit all reps',
      frequency: 'Weekly',
      details: 'Increase weight by 5-10 lbs on compounds, 2-5 lbs on isolations when you complete all sets × reps'
    },
    hypertrophy: {
      name: 'Double Progression (Hypertrophy)',
      description: 'Increase reps first, then weight',
      frequency: 'Every 2-3 weeks',
      details: 'Hit upper rep range (12 reps), then increase weight by 5-10 lbs and drop to lower rep range (8 reps)'
    },
    endurance: {
      name: 'Volume Progression (Endurance)',
      description: 'Increase reps or reduce rest periods',
      frequency: 'Every 2 weeks',
      details: 'Add 1-2 reps per set, or reduce rest periods by 15 seconds'
    },
    fatLoss: {
      name: 'Density Progression (Fat Loss)',
      description: 'Do more work in same time',
      frequency: 'Every 2 weeks',
      details: 'Reduce rest periods by 15 seconds, or add 1 rep per set while maintaining weight'
    },
    general: {
      name: 'Flexible Progression',
      description: 'Mix of rep and weight increases',
      frequency: 'Every 2-3 weeks',
      details: 'Increase weight when hitting upper rep range, or add reps if weight increases stall'
    }
  };

  return progressionMap[primaryGoal] || progressionMap.general;
};

const generateGuidelines = ({ fitnessLevel, primaryGoal, injuries, weakPoints, sessionDuration }) => {
  const guidelines = [];

  // Fitness level guidelines
  if (fitnessLevel === 'beginner') {
    guidelines.push('Focus on learning proper form before adding weight');
    guidelines.push('Consistency is more important than intensity');
    guidelines.push('Rest 48 hours between training the same muscle groups');
  } else if (fitnessLevel === 'intermediate') {
    guidelines.push('Progressive overload is essential for continued gains');
    guidelines.push('Track your workouts to monitor progress');
    guidelines.push('Vary rep ranges to stimulate different adaptations');
  } else {
    guidelines.push('Implement periodization for long-term progress');
    guidelines.push('Monitor recovery metrics (sleep, HRV, soreness)');
    guidelines.push('Deload every 4-6 weeks to prevent overtraining');
  }

  // Goal-specific guidelines with intensity zones
  if (primaryGoal === 'strength') {
    guidelines.push('Prioritize compound movements (squat, bench, deadlift)');
    guidelines.push('Use heavy weight: 85%+ of your 1RM (weight you can lift once)');
    guidelines.push('Rest 2-3 minutes between heavy sets');
    guidelines.push('Aim for 3-6 reps on main lifts');
    guidelines.push('Quality over quantity - stop if form breaks down');
  } else if (primaryGoal === 'hypertrophy') {
    guidelines.push('Maintain constant tension on the muscle');
    guidelines.push('Use moderate weight: 67-85% of your 1RM');
    guidelines.push('Use 8-12 rep range for optimal muscle growth');
    guidelines.push('Include both compound and isolation exercises');
    guidelines.push('Rest 60-90 seconds between sets for isolation work');
  } else if (primaryGoal === 'endurance') {
    guidelines.push('Use lighter weight: 50-70% of your 1RM');
    guidelines.push('Higher reps (12-15) with shorter rest periods');
    guidelines.push('Focus on muscular endurance and work capacity');
    guidelines.push('Rest 45-60 seconds between sets');
  } else if (primaryGoal === 'fatLoss') {
    guidelines.push('Maintain high protein intake (0.8-1g per lb bodyweight)');
    guidelines.push('Use moderate weight: 60-80% of your 1RM');
    guidelines.push('Include 2-3 cardio sessions per week');
    guidelines.push('Create a moderate caloric deficit (300-500 cal/day)');
    guidelines.push('Keep rest periods short (60-90 sec) to maintain elevated heart rate');
  }

  // Injury considerations
  if (injuries && injuries !== 'None') {
    guidelines.push(`⚠️ Injury consideration: ${injuries}`);
    guidelines.push('Modify exercises as needed and consult a professional if pain occurs');
  }

  return guidelines;
};

const generateModifications = ({ injuries, equipment, fitnessLevel }) => {
  const modifications = [];

  // Handle injuries - only add if not "none"
  if (injuries && Array.isArray(injuries) && injuries.length > 0 && !injuries.includes('none')) {
    const injuryMap = {
      lowerBack: 'Lower back pain',
      shoulders: 'Shoulder issues',
      knees: 'Knee pain',
      wrists: 'Wrist pain',
      elbows: 'Elbow pain',
      hips: 'Hip pain',
      ankles: 'Ankle pain',
      other: 'Other limitations'
    };

    const injuryDescriptions = injuries.map(inj => injuryMap[inj] || inj).join(', ');
    
    modifications.push({
      type: 'Injury Accommodation',
      description: injuryDescriptions,
      recommendation: 'Avoid exercises that cause pain. Substitute with pain-free alternatives. Consider consulting a physical therapist for personalized modifications.'
    });
  }

  if (equipment && !equipment.includes('barbell')) {
    modifications.push({
      type: 'Equipment Limitation',
      description: 'No barbell available',
      recommendation: 'Use dumbbells or machines for compound movements'
    });
  }

  if (equipment && equipment.includes('bodyweight') && equipment.length === 1) {
    modifications.push({
      type: 'Bodyweight Only',
      description: 'Limited to bodyweight exercises',
      recommendation: 'Focus on progressive calisthenics and leverage variations'
    });
  }

  return modifications;
};

const generateDayNotes = (dayName, fitnessLevel, primaryGoal) => {
  const notes = {
    beginner: 'Warm up thoroughly. Focus on form over weight.',
    intermediate: 'Warm up 5-10 minutes. Track your performance.',
    advanced: 'Dynamic warm-up. Prepare for intensity.'
  };

  return notes[fitnessLevel];
};

const generateWarmup = (fitnessLevel) => {
  const warmups = {
    beginner: {
      duration: '5-10 minutes',
      description: 'Light activity to increase heart rate and prepare your body',
      exercises: [
        {
          name: 'Light Cardio',
          duration: '3-5 minutes',
          description: 'Walk, jog lightly, or use a stationary bike at easy pace',
          intensity: 'Light - should be able to talk'
        },
        {
          name: 'Dynamic Stretching',
          duration: '2-3 minutes',
          description: 'Arm circles, leg swings, torso twists - controlled movements through full range of motion',
          intensity: 'Controlled - no bouncing'
        },
        {
          name: 'Activation Exercises',
          duration: '2 minutes',
          description: 'Bodyweight squats, push-ups, or band work to activate muscles',
          intensity: 'Light - focus on movement quality'
        }
      ]
    },
    intermediate: {
      duration: '8-12 minutes',
      description: 'Structured warm-up to elevate heart rate and prepare nervous system',
      exercises: [
        {
          name: 'General Warm-up',
          duration: '3-5 minutes',
          description: 'Light jogging, rowing, or cycling at 50-60% max effort',
          intensity: 'Moderate - elevated heart rate but can still talk'
        },
        {
          name: 'Dynamic Mobility',
          duration: '3-4 minutes',
          description: 'Leg swings, arm circles, cat-cow stretches, hip circles, thoracic rotations',
          intensity: 'Controlled - full range of motion'
        },
        {
          name: 'Movement Prep',
          duration: '2-3 minutes',
          description: 'Light versions of main lift patterns - bodyweight squats, push-ups, rows',
          intensity: 'Light - prepare movement patterns'
        }
      ]
    },
    advanced: {
      duration: '10-15 minutes',
      description: 'Sport-specific warm-up with CNS activation and movement preparation',
      exercises: [
        {
          name: 'General Warm-up',
          duration: '3-5 minutes',
          description: 'Moderate intensity cardio (rowing, bike, or running) at 60-70% max effort',
          intensity: 'Moderate - elevated heart rate'
        },
        {
          name: 'Dynamic Stretching & Mobility',
          duration: '3-4 minutes',
          description: 'Leg swings, arm circles, inchworms, world\'s greatest stretch, hip mobility drills',
          intensity: 'Controlled - full range of motion'
        },
        {
          name: 'Movement Activation',
          duration: '2-3 minutes',
          description: 'Band pull-aparts, glute bridges, scapular push-ups, dead bugs',
          intensity: 'Light - activate stabilizers'
        },
        {
          name: 'Lift-Specific Warm-up',
          duration: '2-3 minutes',
          description: 'Light sets of main lift at 40-50% working weight, focusing on form',
          intensity: 'Light - prepare for working sets'
        }
      ]
    }
  };

  return warmups[fitnessLevel];
};

const generateCooldown = (fitnessLevel) => {
  const cooldowns = {
    beginner: {
      duration: '5-10 minutes',
      description: 'Bring heart rate down and stretch major muscle groups',
      exercises: [
        {
          name: 'Light Cardio',
          duration: '2-3 minutes',
          description: 'Slow walking or easy cycling to gradually lower heart rate',
          intensity: 'Very light - catch your breath'
        },
        {
          name: 'Static Stretching',
          duration: '3-5 minutes',
          description: 'Hold stretches for 20-30 seconds: chest, shoulders, hamstrings, quads, hip flexors',
          intensity: 'Gentle - no pain, just mild tension'
        },
        {
          name: 'Deep Breathing',
          duration: '1-2 minutes',
          description: 'Slow, deep breaths to activate parasympathetic nervous system',
          intensity: 'Relaxed - focus on breathing'
        }
      ]
    },
    intermediate: {
      duration: '8-12 minutes',
      description: 'Active recovery and flexibility work to aid recovery',
      exercises: [
        {
          name: 'Active Recovery',
          duration: '3-4 minutes',
          description: 'Light walking or easy cycling at 40-50% max effort',
          intensity: 'Light - gradually lower heart rate'
        },
        {
          name: 'Static Stretching',
          duration: '3-4 minutes',
          description: 'Hold stretches for 30 seconds each: all major muscle groups worked today',
          intensity: 'Gentle - feel the stretch but no pain'
        },
        {
          name: 'Foam Rolling (Optional)',
          duration: '2-3 minutes',
          description: 'Roll out tight muscles from the workout - quads, hamstrings, calves, back',
          intensity: 'Moderate pressure - tender but not painful'
        },
        {
          name: 'Breathing & Relaxation',
          duration: '1-2 minutes',
          description: 'Deep breathing exercises to promote recovery',
          intensity: 'Relaxed - focus on parasympathetic activation'
        }
      ]
    },
    advanced: {
      duration: '10-15 minutes',
      description: 'Comprehensive cool-down for optimal recovery and mobility',
      exercises: [
        {
          name: 'Active Recovery',
          duration: '3-5 minutes',
          description: 'Light cardio (walking, easy bike, or rowing) at 40-50% max effort',
          intensity: 'Light - gradually lower heart rate'
        },
        {
          name: 'Static Stretching',
          duration: '3-4 minutes',
          description: 'Hold stretches for 30-45 seconds: all major muscle groups, especially worked areas',
          intensity: 'Gentle - feel the stretch but no pain'
        },
        {
          name: 'Myofascial Release',
          duration: '2-3 minutes',
          description: 'Foam roll or lacrosse ball on tight areas - quads, hamstrings, calves, lats, thoracic spine',
          intensity: 'Moderate pressure - tender but not painful'
        },
        {
          name: 'Mobility Work',
          duration: '1-2 minutes',
          description: 'Targeted mobility drills for areas of restriction',
          intensity: 'Controlled - improve range of motion'
        },
        {
          name: 'Breathing & Meditation',
          duration: '1-2 minutes',
          description: 'Box breathing or guided meditation to activate parasympathetic nervous system',
          intensity: 'Relaxed - focus on recovery'
        }
      ]
    }
  };

  return cooldowns[fitnessLevel];
};
