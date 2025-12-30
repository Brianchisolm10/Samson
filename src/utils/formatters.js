// Format training style values
export const formatTrainingStyle = (style) => {
  if (!style) return 'Not set';
  if (style === 'upperLower') return 'Upper/Lower';
  if (style === 'ppl') return 'Push/Pull/Legs';
  if (style === 'fullBody') return 'Full Body';
  if (style === 'bodyPart') return 'Body Part Split';
  return style.charAt(0).toUpperCase() + style.slice(1);
};

// Format equipment values
export const formatEquipment = (equipment) => {
  if (!equipment) return 'Not set';
  const equipmentMap = {
    'body weight': 'Body Weight',
    'bodyweight': 'Body Weight',
    'barbell': 'Barbell',
    'dumbbell': 'Dumbbell',
    'dumbbells': 'Dumbbells',
    'cable': 'Cable',
    'kettlebell': 'Kettlebell',
    'resistance band': 'Resistance Band',
    'band': 'Bands',
    'medicine ball': 'Medicine Ball',
    'foam roller': 'Foam Roller',
    'pull up bar': 'Pull Up Bar',
    'bench': 'Bench',
    'leverage machine': 'Machines',
    'machine': 'Machine'
  };
  return equipmentMap[equipment.toLowerCase()] || equipment.charAt(0).toUpperCase() + equipment.slice(1);
};

// Format fitness level
export const formatFitnessLevel = (level) => {
  if (!level) return 'Not set';
  return level.charAt(0).toUpperCase() + level.slice(1);
};

// Format primary goal
export const formatPrimaryGoal = (goal) => {
  if (!goal) return 'Not set';
  return goal.charAt(0).toUpperCase() + goal.slice(1);
};

// Format motivation
export const formatMotivation = (motivation) => {
  if (!motivation) return 'Not set';
  return motivation.charAt(0).toUpperCase() + motivation.slice(1);
};

// Format activity level
export const formatActivityLevel = (level) => {
  if (!level) return 'Not set';
  return level.charAt(0).toUpperCase() + level.slice(1);
};

// Format gender
export const formatGender = (gender) => {
  if (!gender) return 'Not set';
  return gender.charAt(0).toUpperCase() + gender.slice(1);
};

// Format exercise names - capitalize each word
export const formatExerciseName = (name) => {
  if (!name) return 'Not set';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
