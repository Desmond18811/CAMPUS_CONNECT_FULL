import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText, AlertTriangle } from 'lucide-react';
import '../styles/SupportPages.css';

const PrivacySupport = () => {
    const navigate = useNavigate();

    const privacyItems = [
        {
            title: 'Data Collection',
            description: 'We collect minimal data necessary to provide our service, including your profile information and uploaded resources.',
            icon: <FileText size={24} />
        },
        {
            title: 'Data Protection',
            description: 'Your data is encrypted and stored securely. We never sell your personal information to third parties.',
            icon: <Shield size={24} />
        },
        {
            title: 'Profile Visibility',
            description: 'Your profile and resources are visible to other Campus Connect users. You can control what information is shown.',
            icon: <Eye size={24} />
        },
        {
            title: 'Account Security',
            description: 'We use industry-standard security measures including JWT authentication and password hashing.',
            icon: <Lock size={24} />
        }
    ];

    return (
        <div className="support-page">
            <div className="support-header">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Privacy & Support</h1>
            </div>

            <div className="support-content">
                {/* Privacy Overview */}
                <section className="help-section">
                    <div className="privacy-hero">
                        <Shield size={48} className="hero-icon" />
                        <h2>Your Privacy Matters</h2>
                        <p>We're committed to protecting your data and ensuring a safe learning environment.</p>
                    </div>
                </section>

                {/* Privacy Items */}
                <section className="help-section">
                    <h2>Privacy Policy Highlights</h2>
                    <div className="privacy-grid">
                        {privacyItems.map((item, index) => (
                            <div key={index} className="privacy-card">
                                <div className="privacy-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Report Issue */}
                <section className="help-section">
                    <h2>Report a Privacy Concern</h2>
                    <div className="report-section">
                        <AlertTriangle size={24} className="warning-icon" />
                        <p>If you believe your privacy has been compromised or you've encountered inappropriate content, please report it immediately.</p>
                        <button className="report-btn">Report an Issue</button>
                    </div>
                </section>

                {/* Rights */}
                <section className="help-section">
                    <h2>Your Rights</h2>
                    <ul className="rights-list">
                        <li>Right to access your personal data</li>
                        <li>Right to correct inaccurate information</li>
                        <li>Right to delete your account and data</li>
                        <li>Right to data portability</li>
                        <li>Right to withdraw consent</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrivacySupport;
