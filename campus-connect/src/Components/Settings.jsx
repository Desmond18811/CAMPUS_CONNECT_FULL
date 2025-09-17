import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import '../styles/Settings.css';

const SettingsScreen = () => {
    const [activeSection, setActiveSection] = useState('editProfile');
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        schoolName: '',
        level: '',
        bio: ''
    });
    const [isSubmitting, setIsSubmitting] = useState({
        username: false,
        schoolName: false,
        level: false,
        bio: false
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (field) => {
        setIsSubmitting(prev => ({ ...prev, [field]: true }));

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`${field} updated successfully!`);
        } catch (error) {
            alert(`Failed to update ${field}`);
        } finally {
            setIsSubmitting(prev => ({ ...prev, [field]: false }));
        }
    };

    const menuItems = [
        {
            category: 'How you use campus connect',
            items: [
                { id: 'editProfile', label: 'Edit Profile', icon: User, active: true }
            ]
        },
        {
            category: null,
            items: [
                { id: 'notifications', label: 'Notifications', icon: Bell }
            ]
        },
        {
            category: 'How others can interact with you',
            items: [
                { id: 'likedPosts', label: 'Liked Posts', icon: Heart },
                { id: 'savedPosts', label: 'Saved Posts', icon: Bookmark },
                { id: 'comments', label: 'Comments', icon: MessageCircle }
            ]
        },
        {
            category: 'More info and support',
            items: [
                { id: 'help', label: 'Help', icon: HelpCircle },
                { id: 'privacySupport', label: 'Privacy Support', icon: Shield },
                { id: 'accountStatus', label: 'Account Status', icon: UserCheck }
            ]
        }
    ];

    if (!isOpen) {
        return (
            <div className="settings-container">
                <button
                    onClick={() => setIsOpen(true)}
                    className="open-settings-button"
                >
                    Open Settings
                </button>
            </div>
        );
    }

    return (
        <div className="settings-container">
            <div className="settings-backdrop" onClick={() => setIsOpen(false)} />

            <div className="settings-modal">
                <div className="settings-layout">
                    {/* Left Sidebar */}
                    <div className="settings-sidebar">
                        <h2 className="settings-title">Settings</h2>

                        {menuItems.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="menu-section">
                                {section.category && (
                                    <h3 className="menu-category">{section.category}</h3>
                                )}
                                {section.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`menu-item ${item.active || activeSection === item.id ? 'active' : ''}`}
                                    >
                                        <item.icon className="menu-icon" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Vertical Divider */}
                    <div className="settings-divider"></div>

                    {/* Right Content */}
                    <div className="settings-content">
                        <div className="content-header">
                            <h2 className="content-title">Edit Profile</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="profile-section">
                            {/* Profile Card */}
                            <div className="profile-card">
                                <div className="profile-info">
                                    <div className="avatar-large">
                                        <div className="avatar-inner-large">
                                            <div className="avatar-x1-large" />
                                            <div className="avatar-x2-large" />
                                        </div>
                                    </div>
                                    <span className="profile-username">@username</span>
                                </div>
                                <button className="edit-profile-btn">Edit Profile</button>
                            </div>

                            {/* Form Fields */}
                            <div className="form-section">
                                <div className="form-group">
                                    <label className="form-label">Change Username</label>
                                    <div className="form-input-group">
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => handleInputChange('username', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter new username"
                                        />
                                        <button
                                            onClick={() => handleSubmit('username')}
                                            disabled={isSubmitting.username || !formData.username.trim()}
                                            className="submit-btn"
                                        >
                                            {isSubmitting.username ? (
                                                <div className="loading-spinner-small" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Change School Name</label>
                                    <div className="form-input-group">
                                        <input
                                            type="text"
                                            value={formData.schoolName}
                                            onChange={(e) => handleInputChange('schoolName', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter school name"
                                        />
                                        <button
                                            onClick={() => handleSubmit('schoolName')}
                                            disabled={isSubmitting.schoolName || !formData.schoolName.trim()}
                                            className="submit-btn"
                                        >
                                            {isSubmitting.schoolName ? (
                                                <div className="loading-spinner-small" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Change Level</label>
                                    <div className="form-input-group">
                                        <input
                                            type="text"
                                            value={formData.level}
                                            onChange={(e) => handleInputChange('level', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter level"
                                        />
                                        <button
                                            onClick={() => handleSubmit('level')}
                                            disabled={isSubmitting.level || !formData.level.trim()}
                                            className="submit-btn"
                                        >
                                            {isSubmitting.level ? (
                                                <div className="loading-spinner-small" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    <div className="form-input-group bio-group">
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="form-textarea"
                        placeholder="Tell us about yourself"
                        rows={4}
                    />
                                        <button
                                            onClick={() => handleSubmit('bio')}
                                            disabled={isSubmitting.bio || !formData.bio.trim()}
                                            className="submit-btn bio-submit"
                                        >
                                            {isSubmitting.bio ? (
                                                <div className="loading-spinner-small" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;