import { useState, useEffect } from 'react';

const STORAGE_KEY = 'onboarding_status';

const useOnboarding = () => {
    const [state, setState] = useState(() => {
        // Initialize from localStorage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading onboarding status:', error);
        }

        // Default state for new users
        return {
            isOnboardingComplete: false,
            currentStep: 0,
            hasSkipped: false
        };
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving onboarding status:', error);
        }
    }, [state]);

    const completeOnboarding = () => {
        setState({
            isOnboardingComplete: true,
            currentStep: 0,
            hasSkipped: false
        });
    };

    const skipOnboarding = () => {
        setState({
            isOnboardingComplete: true,
            currentStep: 0,
            hasSkipped: true
        });
    };

    const restartOnboarding = () => {
        setState({
            isOnboardingComplete: false,
            currentStep: 0,
            hasSkipped: false
        });
    };

    const setCurrentStep = (step) => {
        setState(prev => ({
            ...prev,
            currentStep: step
        }));
    };

    const nextStep = () => {
        setState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
        }));
    };

    const previousStep = () => {
        setState(prev => ({
            ...prev,
            currentStep: Math.max(0, prev.currentStep - 1)
        }));
    };

    return {
        isOnboardingComplete: state.isOnboardingComplete,
        currentStep: state.currentStep,
        hasSkipped: state.hasSkipped,
        completeOnboarding,
        skipOnboarding,
        restartOnboarding,
        setCurrentStep,
        nextStep,
        previousStep
    };
};

export default useOnboarding;
