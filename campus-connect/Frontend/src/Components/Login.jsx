// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login.json';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'https://campcon-test.onrender.com/api/auth/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home', { replace: true });
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 401) {
                setError('Invalid email or password. Please try again.');
            } else if (err.response?.status >= 500) {
                setError('Server error. Please try again later.');
            } else {
                setError('Login failed. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true);
        // Redirect to Google OAuth endpoint
        window.location.href = 'https://campcon-test.onrender.com/api/auth/google';
    };

    // Token parsing is now handled by AuthSuccess component


    // Optional: Add cleanup for loading state on component unmount
    React.useEffect(() => {
        return () => {
            setIsGoogleLoading(false);
        };
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-animation">
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <div className="c-logo">
                        <div className="logo-box">C</div>
                    </div>
                </div>

                <div className="auth-card">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
                        <button type="submit" disabled={isLoading || isGoogleLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="divider">or</div>

                        <div className="google-signin">
                            <button
                                type="button"
                                className="google-btn"
                                onClick={handleGoogleLogin}
                                disabled={isLoading || isGoogleLoading}
                            >
                                {isGoogleLoading ? (
                                    'Redirecting to Google...'
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M16.5 9.20455C16.5 8.56636 16.4318 7.95273 16.3064 7.36364H9V10.845H13.1932C12.9886 11.97 12.3409 12.9232 11.3523 13.5614V15.8195H14.1136C15.6259 14.4386 16.5 12.3864 16.5 9.20455Z" fill="#4285F4" />
                                            <path d="M9 17C11.2159 17 13.1068 16.2659 14.5136 14.9818L11.7523 12.7236C10.9659 13.2727 9.94318 13.6364 9 13.6364C6.88636 13.6364 5.11364 12.2045 4.46591 10.2545H1.61364V12.5727C3.01591 15.3545 5.77273 17 9 17Z" fill="#34A853" />
                                            <path d="M4.46591 10.2545C4.21591 9.52273 4.09091 8.73636 4.09091 7.90909C4.09091 7.08182 4.21591 6.29545 4.46591 5.56364V3.24545H1.61364C0.772727 4.93182 0.272727 6.84545 0.272727 7.90909C0.272727 8.97273 0.772727 10.8864 1.61364 12.5727L4.46591 10.2545Z" fill="#FBBC05" />
                                            <path d="M9 4.18182C10.1932 4.18182 11.2614 4.56818 12.1227 5.33182L14.5682 2.88636C13.1068 1.56818 11.2159 0.818182 9 0.818182C5.77273 0.818182 3.01591 2.46364 1.61364 5.24545L4.46591 7.56364C5.11364 5.61364 6.88636 4.18182 9 4.18182Z" fill="#EA4335" />
                                        </svg>
                                        Login with Google
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                    <p>
                        Forgot your password? <Link to="/forgot-password">Reset Password</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;