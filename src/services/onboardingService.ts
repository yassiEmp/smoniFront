const ONBOARDING_KEY = 'smoni_onboarding';

export const onboardingService = {
  getUserOnboardingKey: (userId: string) => {
    return `${ONBOARDING_KEY}_${userId}`;
  },

  hasCompletedOnboarding: (userId: string) => {
    return localStorage.getItem(onboardingService.getUserOnboardingKey(userId)) === 'completed';
  },

  completeOnboarding: (userId: string) => {
    localStorage.setItem(onboardingService.getUserOnboardingKey(userId), 'completed');
  },

  resetOnboarding: (userId: string) => {
    localStorage.removeItem(onboardingService.getUserOnboardingKey(userId));
  }
};
