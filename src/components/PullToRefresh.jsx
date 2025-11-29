import React, { useState, useRef, useEffect } from 'react';

const PullToRefresh = ({ onRefresh, children, enabled = true }) => {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [startY, setStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const PULL_THRESHOLD = 120; // Increased from 80 for less sensitivity
    const MAX_PULL = 150; // Increased from 120

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e) => {
            if (!enabled) return;
            // Only trigger if scrolled to top
            if (container.scrollTop === 0) {
                setStartY(e.touches[0].clientY);
                setIsDragging(false);
            }
        };

        const handleTouchMove = (e) => {
            if (!enabled || startY === 0 || isRefreshing) return;

            const currentY = e.touches[0].clientY;
            const distance = currentY - startY;

            // Only pull down when at top of page and pulling down
            if (distance > 0 && container.scrollTop === 0) {
                setIsDragging(true);
                e.preventDefault();
                const pullDist = Math.min(distance * 0.35, MAX_PULL); // Reduced from 0.5 to 0.35
                setPullDistance(pullDist);
            } else {
                // Allow normal scrolling
                setIsDragging(false);
                setPullDistance(0);
                setStartY(0);
            }
        };

        const handleTouchEnd = async () => {
            if (!isDragging) {
                setStartY(0);
                setPullDistance(0);
                return;
            }

            if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
                setIsRefreshing(true);
                setPullDistance(PULL_THRESHOLD);

                try {
                    // Add timeout to prevent infinite spinning
                    await Promise.race([
                        onRefresh(),
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Refresh timeout')), 3000)
                        )
                    ]);
                } catch (error) {
                    console.error('Refresh failed:', error);
                }

                setTimeout(() => {
                    setIsRefreshing(false);
                    setPullDistance(0);
                }, 500);
            } else {
                setPullDistance(0);
            }
            setStartY(0);
            setIsDragging(false);
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [startY, pullDistance, isRefreshing, isDragging, onRefresh]);

    const getRefreshText = () => {
        if (isRefreshing) return 'Refreshing...';
        if (pullDistance >= PULL_THRESHOLD) return 'Release to refresh';
        if (pullDistance > 0) return 'Pull to refresh';
        return '';
    };

    return (
        <div
            ref={containerRef}
            style={{
                flex: 1,
                overflow: 'auto',
                overflowY: 'scroll',
                WebkitOverflowScrolling: 'touch',
                position: 'relative',
                minHeight: 0
            }}
        >
            {/* Pull indicator */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: pullDistance,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '0.5rem',
                    transition: isRefreshing ? 'height 0.3s ease' : 'none',
                    overflow: 'hidden',
                    zIndex: 1000
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {/* Spinner */}
                    {(pullDistance > 0 || isRefreshing) && (
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                border: '3px solid var(--color-border)',
                                borderTop: '3px solid var(--color-primary)',
                                borderRadius: '50%',
                                animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                                transform: `rotate(${pullDistance * 3}deg)`,
                                transition: 'transform 0.1s ease'
                            }}
                        />
                    )}
                    {/* Text */}
                    {getRefreshText() && (
                        <span style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            fontWeight: 500
                        }}>
                            {getRefreshText()}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{
                transform: `translateY(${pullDistance}px)`,
                transition: pullDistance === 0 ? 'transform 0.3s ease' : 'none'
            }}>
                {children}
            </div>

            {/* Spinner animation */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PullToRefresh;
