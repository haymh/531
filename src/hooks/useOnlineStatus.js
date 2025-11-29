import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isServerReachable, setIsServerReachable] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => {
            setIsOnline(false);
            setIsServerReachable(false);
        };

        // Check server reachability periodically when online
        const checkServer = async () => {
            if (!navigator.onLine) {
                setIsServerReachable(false);
                return;
            }

            try {
                // Try to fetch a small resource from the server
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 1000); // Reduced from 3000ms to 1000ms

                await fetch(window.location.origin + '/manifest.webmanifest', {
                    method: 'HEAD',
                    cache: 'no-cache',
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                setIsServerReachable(true);
            } catch (error) {
                setIsServerReachable(false);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check server connectivity every 3 seconds when online (reduced from 10s)
        const intervalId = setInterval(checkServer, 3000);
        checkServer(); // Initial check

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(intervalId);
        };
    }, []);

    return { isOnline, isServerReachable };
};
