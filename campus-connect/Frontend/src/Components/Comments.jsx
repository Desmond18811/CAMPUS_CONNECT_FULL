import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/CommentsPopup.css';

const CommentsPopup = () => {
    const [activeSection, setActiveSection] = useState('comments');
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
                { id: 'likedPosts', label: 'Liked Posts', icon: Heart },
                { id: 'savedPosts', label: 'Saved Posts', icon: Bookmark },
                { id: 'comments', label: 'Comments', icon: MessageCircle, active: true }
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

    const comments = [
        {
            id: 1,
            username: '@username',
            comment: 'Commented: "This document really helped me! I really recommend it if you\'re studying this course honestly helped me!" on your post.',
            timeAgo: '01 Sept'
        },
        {
            id: 2,
            username: '@username',
            comment: 'Commented: "This document really helped me! I really recommend it if you\'re studying this course honestly helped me!" on your post.',
            timeAgo: '01 Sept'
        },
        {
            id: 3,
            username: '@username',
            comment: 'Commented: "This document really helped me! I really recommend it if you\'re studying this course honestly helped me!" on your post.',
            timeAgo: '01 Sept'
        },
        {
            id: 4,
            username: '@username',
            comment: 'Commented: "This document really helped me! I really recommend it if you\'re studying this course honestly helped me!" on your post.',
            timeAgo: '01 Sept'
        }
    ];

    return (
        <div className="comments-container">
            <div className="comments-backdrop" onClick={() => navigate('/home')} />

            <div className="comments-modal">
                <div className="comments-layout">
                    <div className="comments-sidebar">
                        <h2 className="comments-title">Settings</h2>

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

                    <div className="comments-divider"></div>

                    <div className="comments-content">
                        <div className="content-header">
                            <h2 className="content-title">Comments</h2>
                            <button
                                onClick={() => navigate('/home')}
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="comments-section">
                            <h3 className="time-heading">THIS MONTH</h3>

                            {comments.map((commentItem) => (
                                <div key={commentItem.id} className="comment-item">
                                    <div className="comment-avatar">
                                        <div className="avatar-inner-comment">
                                            <div className="avatar-x1-comment" />
                                            <div className="avatar-x2-comment" />
                                        </div>
                                    </div>
                                    <div className="comment-content">
                                        <div className="comment-text">
                                            <span className="comment-username">{commentItem.username}</span>
                                            <span className="comment-message">{commentItem.comment}</span>
                                        </div>
                                        <div className="comment-time">{commentItem.timeAgo}</div>
                                    </div>
                                    <div className="comment-thumbnail">
                                        <div className="thumbnail-placeholder">
                                            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
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

export default CommentsPopup;