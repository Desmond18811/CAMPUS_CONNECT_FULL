import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/LikedPostsPopup.css';

const LikedPostsPopup = () => {
    const [activeSection, setActiveSection] = useState('likedPosts');
    const navigate = useNavigate();

    const menuItems = [
        {
            category: 'How you use campus connect',
            items: [
                { id: 'editProfile', label: 'Edit Profile', icon: User }
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
                { id: 'likedPosts', label: 'Liked Posts', icon: Heart, active: true },
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

    const likedPosts = [
        {
            id: 1,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 2,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 3,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 4,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        }
    ];

    return (
        <div className="liked-posts-container">
            <div className="liked-posts-backdrop" onClick={() => { navigate('/home'); }} />

            <div className="liked-posts-modal">
                <div className="liked-posts-layout">
                    <div className="liked-posts-sidebar">
                        <h2 className="liked-posts-title">Settings</h2>

                        {menuItems.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="menu-section">
                                {section.category && (
                                    <h3 className="menu-category">{section.category}</h3>
                                )}
                                {section.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveSection(item.id);
                                            if (item.id === 'notifications') navigate('/notifications');
                                            else if (item.id === 'likedPosts') navigate('/likedPosts');
                                            else if (item.id === 'savedPosts') navigate('/saved');
                                            else if (item.id === 'comments') navigate('/comments');
                                            else if (item.id === 'help') navigate('/help');
                                            else if (item.id === 'privacySupport') navigate('/privacy-support');
                                            else if (item.id === 'accountStatus') navigate('/account-status');
                                            else if (item.id === 'editProfile') navigate('/settings');
                                        }}
                                        className={`menu-item ${item.active || activeSection === item.id ? 'active' : ''}`}
                                    >
                                        <item.icon className="menu-icon" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="liked-posts-divider"></div>

                    <div className="liked-posts-content">
                        <div className="content-header">
                            <h2 className="content-title">Liked Posts</h2>
                            <button
                                onClick={() => navigate('/home')}
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="posts-grid">
                            {likedPosts.map((post) => (
                                <div key={post.id} className="liked-post-card">
                                    <div className="liked-post-header">
                                        <div className="post-user">
                                            <div className="user-avatar">C</div>
                                            <span className="username">{post.username}</span>
                                        </div>
                                        <button className="more-options">
                                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="document-preview">
                                        <div className="document-placeholder">
                                            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="liked-post-footer">
                                        <div className="post-time">{post.timeAgo}</div>

                                        <div className="tags">
                                            {post.tags.map((tag, index) => (
                                                <div key={index} className={`tag tag-${tag}`} />
                                            ))}
                                        </div>

                                        <h3 className="post-title">{post.title}</h3>

                                        <div className="post-actions">
                                            <div className="action-buttons">
                                                <button className="action-btn liked">
                                                    <Heart size={18} fill="currentColor" />
                                                </button>
                                                <button className="action-btn">
                                                    <MessageCircle size={18} />
                                                </button>
                                            </div>
                                            <button className="action-btn">
                                                <Bookmark size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikedPostsPopup;
