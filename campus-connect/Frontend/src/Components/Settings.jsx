import React, { useState, useEffect } from 'react';
import { X, User, Bell as BellSettings, Heart as HeartSettings, Bookmark as BookmarkSettings, MessageCircle as MessageCircleSettings, HelpCircle, Shield, UserCheck, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = ({ onClose, userData = {}, setUserData = () => { } }) => {
    // Provide default values for props to prevent undefined errors
    const [formDataSettings, setFormDataSettings] = useState({
        username: userData?.username || '',
        schoolName: userData?.schoolName || '',
        level: userData?.level || '',
        bio: userData?.bio || '',
        profileColor: userData?.profileColor || '#cc002e',
    });
    const [profileImage, setProfileImage] = useState(userData?.profileImage || null);
    const [isSubmittingSettings, setIsSubmittingSettings] = useState({
        username: false,
        schoolName: false,
        level: false,
        bio: false
    });
    const [activeSection, setActiveSection] = useState('editProfile');
    const navigate = useNavigate();

    const generateUserColor = (username) => {
        if (!username) return '#cc002e';
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 60%)`;
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            if (setUserData) {
                setUserData(prev => ({ ...prev, profileImage: file }));
            }
        }
    };

    const handleInputChangeSettings = (field, value) => {
        setFormDataSettings(prev => ({ ...prev, [field]: value }));
        if (setUserData) {
            setUserData(prev => ({ ...prev, [field]: value }));
            if (field === 'username') {
                setUserData(prev => ({ ...prev, profileColor: generateUserColor(value) }));
            }
        }
    };

    const handleSubmitSettings = async (field) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to update your profile.');
            return;
        }

        setIsSubmittingSettings(prev => ({ ...prev, [field]: true }));
        try {
            const formData = new FormData();
            formData.append('username', formDataSettings.username);
            formData.append('schoolName', formDataSettings.schoolName);
            formData.append('level', formDataSettings.level);
            formData.append('bio', formDataSettings.bio);
            formData.append('profileColor', formDataSettings.profileColor);
            if (profileImage) formData.append('profilePic', profileImage);

            const response = await fetch('https://campcon-test.onrender.com/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseData = await response.json();
            if (response.ok) {
                alert(`${field} updated successfully!`);
                if (setUserData) {
                    setUserData(prev => ({
                        ...prev,
                        username: formDataSettings.username,
                        profileImage: profileImage,
                        profileColor: formDataSettings.profileColor
                    }));
                }
            } else {
                throw new Error(responseData.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Submit error:', error.message);
            alert(`Failed to update ${field}: ${error.message}`);
        } finally {
            setIsSubmittingSettings(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/home');
        }
    };

    const handleNavigation = (id) => {
        setActiveSection(id);
        switch (id) {
            case 'notifications':
                navigate('/notifications');
                break;
            case 'likedPosts':
                navigate('/likedPosts');
                break;
            case 'savedPosts':
                navigate('/saved');
                break;
            case 'comments':
                navigate('/comments');
                break;
            case 'help':
                navigate('/help');
                break;
            case 'privacySupport':
                navigate('/privacy-support');
                break;
            case 'accountStatus':
                navigate('/account-status');
                break;
            case 'editProfile':
                break;
            default:
                break;
        }
    };

    const menuItems = [
        { category: 'How you use campus connect', items: [{ id: 'editProfile', label: 'Edit Profile', icon: User, active: true, color: "#2563eb" }] },
        { category: null, items: [{ id: 'notifications', label: 'Notifications', icon: BellSettings, color: "#2563eb" }] },
        {
            category: 'How others can interact with you', items: [
                { id: 'likedPosts', label: 'Liked Posts', icon: HeartSettings, color: "#2563eb" },
                { id: 'savedPosts', label: 'Saved Posts', icon: BookmarkSettings, color: "#2563eb" },
                { id: 'comments', label: 'Comments', icon: MessageCircleSettings, color: "#2563eb" },
            ]
        },
        {
            category: 'More info and support', items: [
                { id: 'help', label: 'Help', icon: HelpCircle, color: "#2563eb" },
                { id: 'privacySupport', label: 'Privacy Support', icon: Shield, color: "#2563eb" },
                { id: 'accountStatus', label: 'Account Status', icon: UserCheck, color: "#2563eb" },
            ]
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('https://campcon-test.onrender.com/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const newFormData = {
                            username: data.data.username || '',
                            schoolName: data.data.school || '',
                            level: data.data.gradeLevel || '',
                            bio: data.data.bio || '',
                            profileColor: data.data.profileColor || generateUserColor(data.data.username || '')
                        };
                        setFormDataSettings(newFormData);
                        setProfileImage(data.data.profilePic || null);
                        if (setUserData) {
                            setUserData({
                                username: data.data.username || '',
                                profileImage: data.data.profilePic || null,
                                profileColor: data.data.profileColor || generateUserColor(data.data.username || '')
                            });
                        }
                    }
                })
                .catch(error => console.log('Error fetching profile:', error.message));
        }
    }, [setUserData]);

    return (
        <div className="settings-container">
            <div className="settings-backdrop" onClick={handleClose} />
            <div className="settings-modal">
                <div className="settings-layout">
                    <div className="settings-sidebar">
                        <h2 className="settings-title">Settings</h2>
                        {menuItems.map((section, index) => (
                            <div key={index} className="menu-section">
                                {section.category && <h3 className="menu-category">{section.category}</h3>}
                                {section.items.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleNavigation(item.id)}
                                        className={`menu-item ${item.active || activeSection === item.id ? 'active' : ''}`}
                                    >
                                        <item.icon className="menu-icon" />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="settings-divider"></div>
                    <div className="settings-content">
                        <div className="content-header">
                            <h2 className="content-title">Edit Profile</h2>
                            <button onClick={handleClose} className="close-button"><X /></button>
                        </div>
                        <div className="profile-section">
                            <div className="profile-card">
                                <div className="profile-info">
                                    <div className="avatar-large">
                                        {profileImage ? (
                                            typeof profileImage === 'string' ? (
                                                <img src={profileImage} alt="Profile" className="profile-image-large" />
                                            ) : (
                                                <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image-large" />
                                            )
                                        ) : (
                                            <div className="avatar-inner-large" style={{ backgroundColor: formDataSettings.profileColor, color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                                {formDataSettings.username.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <span className="profile-username">@{formDataSettings.username || 'username'}</span>
                                </div>
                                <div className="profile-image-actions">
                                    <input type="file" id="profile-image-upload" style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                                    <label htmlFor="profile-image-upload" className="image-upload-btn"><Image size={16} />Choose Image</label>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-group">
                                    <label className="form-label">Change Username</label>
                                    <div className="form-input-group">
                                        <input type="text" value={formDataSettings.username} onChange={e => handleInputChangeSettings('username', e.target.value)} className="form-input" placeholder="Enter new username" />
                                        <button onClick={() => handleSubmitSettings('username')} disabled={isSubmittingSettings.username || !formDataSettings.username.trim()} className="submit-btn">
                                            {isSubmittingSettings.username ? <div className="loading-spinner-small" /> : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Change School Name</label>
                                    <div className="form-input-group">
                                        <input type="text" value={formDataSettings.schoolName} onChange={e => handleInputChangeSettings('schoolName', e.target.value)} className="form-input" placeholder="Enter school name" />
                                        <button onClick={() => handleSubmitSettings('schoolName')} disabled={isSubmittingSettings.schoolName || !formDataSettings.schoolName.trim()} className="submit-btn">
                                            {isSubmittingSettings.schoolName ? <div className="loading-spinner-small" /> : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Change Level</label>
                                    <div className="form-input-group">
                                        <input type="text" value={formDataSettings.level} onChange={e => handleInputChangeSettings('level', e.target.value)} className="form-input" placeholder="Enter level" />
                                        <button onClick={() => handleSubmitSettings('level')} disabled={isSubmittingSettings.level || !formDataSettings.level.trim()} className="submit-btn">
                                            {isSubmittingSettings.level ? <div className="loading-spinner-small" /> : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    <div className="form-input-group bio-group">
                                        <textarea value={formDataSettings.bio} onChange={e => handleInputChangeSettings('bio', e.target.value)} className="form-textarea" placeholder="Tell us about yourself" rows={4} />
                                        <button onClick={() => handleSubmitSettings('bio')} disabled={isSubmittingSettings.bio || !formDataSettings.bio.trim()} className="submit-btn bio-submit">
                                            {isSubmittingSettings.bio ? <div className="loading-spinner-small" /> : 'Submit'}
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

export default Settings;