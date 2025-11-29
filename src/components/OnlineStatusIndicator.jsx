import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const OnlineStatusIndicator = () => {
    const { isOnline, isServerReachable } = useOnlineStatus();

    // Don't show anything when fully online and server is reachable
    if (isOnline && isServerReachable) return null;

    const isOffline = !isOnline;
    const backgroundColor = isOffline ? '#f59e0b' : '#ef4444'; // Orange for offline, red for server unreachable
    const message = isOffline ? 'Offline' : 'No Server';

    return (
        <div style={{
            position: 'fixed',
            top: 'calc(0.75rem + env(safe-area-inset-top))',
            right: '1rem',
            backgroundColor,
            color: '#fff',
            padding: '0.375rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
            {message}
        </div>
    );
};

export default OnlineStatusIndicator;
