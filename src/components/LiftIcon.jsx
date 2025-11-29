import React from 'react';

const LiftIcon = ({ lift, size = 24, className = '' }) => {
    const icons = {
        'Squat': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
        ),
        'Bench Press': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M6 5v14" /><path d="M18 5v14" /><path d="M2 12h20" />
            </svg>
        ),
        'Deadlift': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M4 12h16" /><path d="M6 12v8" /><path d="M18 12v8" /><path d="M2 12h2" /><path d="M20 12h2" />
            </svg>
        ),
        'Overhead Press': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M4 18v-8" /><path d="M20 18v-8" /><path d="M2 10h20" /><path d="M12 10v10" /><path d="M8 20h8" />
            </svg>
        ),
        'Lunges': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="m2 22 1-1h3l9-9" /><path d="M3 21v-8" /><path d="M16 4.04V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-.04" />
            </svg>
        ),
        'Bulgarian Split Squat': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M4 22h16" /><path d="M12 2v20" /><path d="M12 12H4" />
            </svg>
        ),
        'Dips': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M4 22h16" /><path d="M6 2v20" /><path d="M18 2v20" />
            </svg>
        ),
        'Incline Bench Press': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="m19 5-7 7-7-7" /><path d="M12 22V12" />
            </svg>
        ),
        'Push-ups': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M2 12h20" /><path d="m5 12 7-7 7 7" /><path d="M12 17v-5" />
            </svg>
        ),
        'Pull-ups': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 2v20" /><path d="m5 9 7-7 7 7" />
            </svg>
        ),
        'Barbell Rows': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 15 7 7 7-7" />
            </svg>
        ),
        'Lat Pulldown': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 2v20" /><path d="m5 9 7-7 7 7" />
            </svg>
        ),
        'Single-Arm Dumbbell Row': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 15 7 7 7-7" />
            </svg>
        ),
        'Lateral Raises': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 9 7-7 7 7" />
            </svg>
        ),
        'Face Pulls': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        'Barbell Bicep Curl': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 9 7-7 7 7" />
            </svg>
        ),
        'Hammer Curls': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 9 7-7 7 7" />
            </svg>
        ),
        'Tricep Pushdown': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 15 7 7 7-7" />
            </svg>
        ),
        'Skull Crushers': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 15 7 7 7-7" />
            </svg>
        ),
        'Plank': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="16" x2="2" y2="12" /><line x1="22" y1="16" x2="22" y2="12" />
            </svg>
        ),
        'Russian Twist': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M2 12h20" /><path d="m12 2 3 3-3 3-3-3z" /><path d="m12 22 3-3-3-3-3 3z" />
            </svg>
        ),
        'Hanging Leg Raise': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 22V2" /><path d="m5 15 7 7 7-7" />
            </svg>
        )
    };

    // Default icon (dumbbell)
    const defaultIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6.5 6.5h11" /><path d="M6.5 17.5h11" /><path d="M6 20v-2a6 6 0 1 1 12 0v2" /><path d="M6 4v2a6 6 0 0 1 12 0V4" />
        </svg>
    );

    return icons[lift] || defaultIcon;
};

export default LiftIcon;
