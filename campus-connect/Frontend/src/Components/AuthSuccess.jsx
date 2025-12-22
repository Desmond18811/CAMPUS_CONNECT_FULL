import React, { useEffect, useRef } from 'react'; // Added useRef import
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const processed = useRef(false); // Added this ref to prevent double-processing

    useEffect(() => {
        if (processed.current) return; // Skip if already processed (handles Strict Mode)

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (error) {
            console.error('OAuth error:', error);
            navigate('/login');
            processed.current = true;
            return;
        }

        if (token && isValidToken(token)) {
            localStorage.setItem('token', token);

            // Clean up URL to remove token param (for security/cleanliness)
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            navigate('/home', { replace: true });
            processed.current = true;
        } else {
            console.error('Invalid or missing token');
            navigate('/login');
            processed.current = true;
        }
    }, [navigate]);

    // Basic JWT validation function
    const isValidToken = (token) => {
        return token && typeof token === 'string' && token.split('.').length === 3;
    };

    return <div>Authenticating...</div>; // Placeholder while processing
};

export default AuthSuccess;