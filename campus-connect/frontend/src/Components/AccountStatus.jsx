import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, Activity, Clock, FileText, Heart, MessageCircle, AlertCircle, Loader } from 'lucide-react';
import '../styles/SupportPages.css';

const AccountStatus = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const SERVER_URL = 'https://campcon-test.onrender.com';

    useEffect(() => {
        fetchAccountStatus();
    }, []);

    const fetchAccountStatus = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/users/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setAccountData(data.data);
            }
        } catch (error) {
            console.error('Error fetching account status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="support-page">
                <div className="support-header">
                    <button className="back-btn" onClick={() => navigate('/home')}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1>Account Status</h1>
                </div>
                <div className="loading-container">
                    <Loader className="loader-spin" size={32} />
                    <span>Loading account status...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="support-page">
            <div className="support-header">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Account Status</h1>
            </div>

            <div className="support-content">
                {/* Account Status Hero */}
                <section className="help-section">
                    <div className="status-hero">
                        <div className="status-badge active">
                            <UserCheck size={32} />
                            <span>Active</span>
                        </div>
                        <h2>Your account is in good standing</h2>
                        <p>No issues or restrictions on your account.</p>
                    </div>
                </section>

                {/* Account Stats */}
                <section className="help-section">
                    <h2>Account Overview</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <Activity size={24} />
                            <div className="stat-info">
                                <span className="stat-value">{accountData?.resourceCount || 0}</span>
                                <span className="stat-label">Resources Uploaded</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <Heart size={24} />
                            <div className="stat-info">
                                <span className="stat-value">{accountData?.totalLikes || 0}</span>
                                <span className="stat-label">Total Likes Received</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <MessageCircle size={24} />
                            <div className="stat-info">
                                <span className="stat-value">{accountData?.commentCount || 0}</span>
                                <span className="stat-label">Comments Made</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <Clock size={24} />
                            <div className="stat-info">
                                <span className="stat-value">
                                    {accountData?.createdAt ? new Date(accountData.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                                <span className="stat-label">Member Since</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Account Actions */}
                <section className="help-section">
                    <h2>Account Actions</h2>
                    <div className="actions-list">
                        <button className="action-item">
                            <FileText size={20} />
                            <span>Download My Data</span>
                        </button>
                        <button className="action-item warning">
                            <AlertCircle size={20} />
                            <span>Deactivate Account</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountStatus;
