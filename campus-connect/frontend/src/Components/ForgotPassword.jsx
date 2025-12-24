import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import '../styles/Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const SERVER_URL = 'https://campcon-test.onrender.com';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${SERVER_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
            } else {
                setError(data.message || 'Failed to send reset email');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Forgot password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-form-container">
                    <div className="success-message-container">
                        <CheckCircle size={64} className="success-icon" />
                        <h2>Check Your Email</h2>
                        <p>We've sent a password reset link to <strong>{email}</strong></p>
                        <p className="hint-text">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <button
                            className="auth-button"
                            onClick={() => navigate('/login')}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <button
                    className="back-button"
                    onClick={() => navigate('/login')}
                >
                    <ArrowLeft size={20} />
                    Back to Login
                </button>

                <h1 className="auth-title">Forgot Password</h1>
                <p className="auth-subtitle">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;