/**
 * Onboarding Storage & State Management
 * Handles draft autosave, submission, and data persistence
 */

const DRAFT_KEY = 'afya_onboarding_draft';
const SUBMISSION_KEY = 'afya_onboarding_submission';

export const onboardingSteps = [
  'identity',
  'services',
  'training-setup',
  'goals',
  'health-history',
  'medications',
  'injury-profile',
  'activity-history',
  'coaching-preferences',
  'nutrition-snapshot',
  'review'
];

export const saveDraft = (userId, stepIndex, formData) => {
  const draft = {
    userId,
    lastCompletedStep: stepIndex,
    data: formData,
    savedAt: new Date().toISOString(),
    version: 1
  };
  
  localStorage.setItem(`${DRAFT_KEY}_${userId}`, JSON.stringify(draft));
  return draft;
};

export const loadDraft = (userId) => {
  const draft = localStorage.getItem(`${DRAFT_KEY}_${userId}`);
  return draft ? JSON.parse(draft) : null;
};

export const clearDraft = (userId) => {
  localStorage.removeItem(`${DRAFT_KEY}_${userId}`);
};

export const submitOnboarding = (userId, formData) => {
  const submission = {
    userId,
    submittedAt: new Date().toISOString(),
    data: formData,
    status: 'submitted',
    version: 1,
    id: `submission_${userId}_${Date.now()}`
  };
  
  // Store versioned submission (never overwrite)
  const submissions = JSON.parse(localStorage.getItem(`${SUBMISSION_KEY}_${userId}`) || '[]');
  submissions.push(submission);
  localStorage.setItem(`${SUBMISSION_KEY}_${userId}`, JSON.stringify(submissions));
  
  // Clear draft
  clearDraft(userId);
  
  return submission;
};

export const getSubmissions = (userId) => {
  const submissions = localStorage.getItem(`${SUBMISSION_KEY}_${userId}`);
  return submissions ? JSON.parse(submissions) : [];
};

export const getLatestSubmission = (userId) => {
  const submissions = getSubmissions(userId);
  return submissions.length > 0 ? submissions[submissions.length - 1] : null;
};

export const deriveClientFlags = (formData) => {
  const flags = {
    hasMedicalRedFlags: false,
    requiresInjuryModifications: false,
    limitedEquipmentAccess: false,
    isYouthClient: false,
    isAthlete: false,
    isPostRehab: false
  };

  // Medical red flags
  if (formData.healthHistory) {
    const redFlagConditions = ['diabetes', 'hypertension', 'cardiovascular', 'asthma', 'arthritis'];
    flags.hasMedicalRedFlags = redFlagConditions.some(condition =>
      formData.healthHistory[condition] === true
    );
  }

  // Injury modifications
  if (formData.injuryProfile && formData.injuryProfile.injuries && formData.injuryProfile.injuries.length > 0) {
    flags.requiresInjuryModifications = true;
  }

  // Limited equipment
  if (formData.trainingSetup && formData.trainingSetup.equipment && formData.trainingSetup.equipment.length <= 1) {
    flags.limitedEquipmentAccess = true;
  }

  // Youth client
  if (formData.identity && formData.identity.age && formData.identity.age < 18) {
    flags.isYouthClient = true;
  }

  // Athlete
  if (formData.activityHistory && formData.activityHistory.currentActivities) {
    flags.isAthlete = formData.activityHistory.currentActivities.some(activity =>
      activity.type === 'competitive' || activity.type === 'sport'
    );
  }

  // Post-rehab
  if (formData.injuryProfile && formData.injuryProfile.injuries) {
    flags.isPostRehab = formData.injuryProfile.injuries.some(injury =>
      injury.status === 'recovering' || injury.status === 'post-surgery'
    );
  }

  return flags;
};
