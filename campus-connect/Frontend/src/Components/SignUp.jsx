// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login.json';
import '../styles/Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '', // Changed from 'name' to 'username'
        email: '',
        password: '',
        confirmPassword: '',
        school: '' // Changed from 'schoolName' to 'school'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const validateForm = () => {
        const { username, email, password, confirmPassword, school } = formData;

        if (!username || !email || !password || !confirmPassword || !school) {
            setError('Please fill in all fields.');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
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
            const requestData = {
                username: formData.username, // Changed from name to username
                email: formData.email,
                password: formData.password,
                school: formData.school // Changed from schoolName to school
            };

            console.log('Sending registration data:', requestData);

            const response = await axios.post(
                'https://campcon-test.onrender.com/api/auth/register',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Store token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home', { replace: true });
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            console.error('Signup error:', err);
            console.error('Error response:', err.response?.data);

            if (err.response?.status === 409) {
                setError('An account with this email already exists.');
            } else if (err.response?.status >= 500) {
                setError('Server error. Please try again later.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleSignup = () => {
        setIsGoogleLoading(true);
        // Redirect to Google OAuth endpoint
        window.location.href = 'https://campcon-test.onrender.com/api/auth/google';
    };

    // Token parsing is now handled by AuthSuccess component


    return (
        <div className="auth-container">
            <div className="auth-content">
                {/* Left side with animation - same structure as Login */}
                <div className="auth-animation">
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                    {/* C logo */}
                    <div className="c-logo">
                        <div className="logo-box">C</div>
                    </div>
                </div>

                {/* Right side with form */}
                <div className="auth-card">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username" // Changed from name to username
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
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
                            placeholder="Password (min. 8 characters)"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
                        <input
                            type="text"
                            name="school" // Changed from schoolName to school
                            placeholder="School name (e.g. AUST)"
                            value={formData.school}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading || isGoogleLoading}
                        />
                        <button type="submit" disabled={isLoading || isGoogleLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        {/* Divider */}
                        <div className="divider">or</div>

                        {/* Google sign-in button */}
                        <div className="google-signin">
                            <button type="button" className="google-btn" onClick={handleGoogleSignup} disabled={isLoading || isGoogleLoading}>
                                {isGoogleLoading ? ('redirecting to Google...') : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M16.5 9.20455C16.5 8.56636 16.4318 7.95273 16.3064 7.36364H9V10.845H13.1932C12.9886 11.97 12.3409 12.9232 11.3523 13.5614V15.8195H14.1136C15.6259 14.4386 16.5 12.3864 16.5 9.20455Z" fill="#4285F4" />
                                            <path d="M9 17C11.2159 17 13.1068 16.2659 14.5136 14.9818L11.7523 12.7236C10.9659 13.2727 9.94318 13.6364 9 13.6364C6.88636 13.6364 5.11364 12.2045 4.46591 10.2545H1.61364V12.5727C3.01591 15.3545 5.77273 17 9 17Z" fill="#34A853" />
                                            <path d="M4.46591 10.2545C4.21591 9.52273 4.09091 8.73636 4.09091 7.90909C4.09091 7.08182 4.21591 6.29545 4.46591 5.56364V3.24545H1.61364C0.772727 4.93182 0.272727 6.84545 0.272727 7.90909C0.272727 8.97273 0.772727 10.8864 1.61364 12.5727L4.46591 10.2545Z" fill="#FBBC05" />
                                            <path d="M9 4.18182C10.1932 4.18182 11.2614 4.56818 12.1227 5.33182L14.5682 2.88636C13.1068 1.56818 11.2159 0.818182 9 0.818182C5.77273 0.818182 3.01591 2.46364 1.61364 5.24545L4.46591 7.56364C5.11364 5.61364 6.88636 4.18182 9 4.18182Z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}

                            </button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;