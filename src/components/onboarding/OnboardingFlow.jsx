import React, { useState } from 'react';
import WelcomeStep from './WelcomeStep';
import ProgramExplanation from './ProgramExplanation';
import TrainingMaxSetup from './TrainingMaxSetup';
import ReadyToStart from './ReadyToStart';

const OnboardingFlow = ({ oneRepMaxData, onComplete, onSkip }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showSkipConfirm, setShowSkipConfirm] = useState(false);

    const steps = [
        { component: WelcomeStep, name: 'Welcome' },
        { component: ProgramExplanation, name: 'Learn' },
        { component: TrainingMaxSetup, name: 'Setup' },
        { component: ReadyToStart, name: 'Ready' }
    ];

    const CurrentStepComponent = steps[currentStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkipClick = () => {
        setShowSkipConfirm(true);
    };

    const handleSkipConfirm = () => {
        onSkip();
    };

    const handleSkipCancel = () => {
        setShowSkipConfirm(false);
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9998,
                animation: 'fadeIn 0.3s ease-out'
            }} />

            {/* Onboarding Modal */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                overflowY: 'auto'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(var(--glass-blur))',
                    WebkitBackdropFilter: 'blur(var(--glass-blur))',
                    border: '1px solid var(--glass-border-strong)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    animation: 'fadeIn 0.3s ease-out',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}>
                    {/* Skip Button */}
                    {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleSkipClick}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                transition: 'all var(--transition-fast)',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'var(--glass-bg-light)';
                                e.target.style.color = 'var(--color-text)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = 'var(--color-text-muted)';
                            }}
                        >
                            Skip
                        </button>
                    )}

                    {/* Progress Dots */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '1.5rem 1rem 0 1rem'
                    }}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    width: index === currentStep ? '32px' : '8px',
                                    height: '8px',
                                    background: index === currentStep
                                        ? 'var(--gradient-primary)'
                                        : index < currentStep
                                            ? 'var(--color-primary)'
                                            : 'var(--glass-border)',
                                    borderRadius: 'var(--radius-pill)',
                                    transition: 'all var(--transition-normal)',
                                    boxShadow: index === currentStep ? 'var(--shadow-glow)' : 'none'
                                }}
                            />
                        ))}
                    </div>

                    {/* Step Content */}
                    <div style={{ minHeight: '400px' }}>
                        <CurrentStepComponent
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            oneRepMaxData={oneRepMaxData}
                            oneRepMaxes={oneRepMaxData?.oneRepMaxes}
                            onComplete={onComplete}
                        />
                    </div>
                </div>
            </div>

            {/* Skip Confirmation Dialog */}
            {showSkipConfirm && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(var(--glass-blur))',
                        WebkitBackdropFilter: 'blur(var(--glass-blur))',
                        border: '1px solid var(--glass-border-strong)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        boxShadow: 'var(--shadow-xl)'
                    }}>
                        <h3 style={{ marginBottom: '0.75rem' }}>Skip Onboarding?</h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6'
                        }}>
                            You can always restart the tutorial from Settings. Make sure to enter your training maxes before starting your first workout.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handleSkipCancel}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSkipConfirm}
                                style={{ flex: 1 }}
                            >
                                Skip
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OnboardingFlow;
