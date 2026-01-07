import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const PlateStacking = ({ onComplete }) => {
    const [showText, setShowText] = useState(false);
    const [visiblePlates, setVisiblePlates] = useState([]);

    // Minimal, flat 2D colors - neutral gym-inspired
    const plates = [
        { color: '#444', width: 8, height: 70 },
        { color: '#555', width: 8, height: 70 },
        { color: '#333', width: 10, height: 90 },
        { color: '#666', width: 10, height: 90 }
    ];

    useEffect(() => {
        // Sequentially reveal plates
        plates.forEach((_, i) => {
            setTimeout(() => {
                setVisiblePlates(prev => [...prev, i]);
            }, i * 200);
        });

        // Show text after plates are done
        const textTimer = setTimeout(() => setShowText(true), plates.length * 200 + 400);

        // Complete overall animation
        const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            pointerEvents: 'none'
        }}>
            {/* Barbell Container */}
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '120px'
            }}>
                {/* Left Plates */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    marginRight: '4px'
                }}>
                    {plates.slice().reverse().map((plate, i) => {
                        const actualIndex = plates.length - 1 - i;
                        const isVisible = visiblePlates.includes(actualIndex);
                        return (
                            <div
                                key={`left-${i}`}
                                style={{
                                    width: `${plate.width}px`,
                                    height: `${plate.height}px`,
                                    backgroundColor: plate.color,
                                    borderRadius: '2px',
                                    marginLeft: '2px',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                                    transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)'
                                }}
                            />
                        );
                    })}
                </div>

                {/* Left Collar */}
                <div style={{
                    width: '6px',
                    height: '100px',
                    backgroundColor: '#777',
                    borderRadius: '1px'
                }} />

                {/* Bar */}
                <div style={{
                    width: '120px',
                    height: '14px',
                    backgroundColor: '#888',
                    borderRadius: '2px'
                }} />

                {/* Right Collar */}
                <div style={{
                    width: '6px',
                    height: '100px',
                    backgroundColor: '#777',
                    borderRadius: '1px'
                }} />

                {/* Right Plates */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '4px'
                }}>
                    {plates.map((plate, i) => {
                        const isVisible = visiblePlates.includes(i);
                        return (
                            <div
                                key={`right-${i}`}
                                style={{
                                    width: `${plate.width}px`,
                                    height: `${plate.height}px`,
                                    backgroundColor: plate.color,
                                    borderRadius: '2px',
                                    marginRight: '2px',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                                    transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)'
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Completion Text */}
            <div style={{
                marginTop: '32px',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#fff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: showText ? 1 : 0,
                transform: showText ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s ease-out'
            }}>
                Workout Completed
            </div>
        </div>,
        document.body
    );
};

export default PlateStacking;
