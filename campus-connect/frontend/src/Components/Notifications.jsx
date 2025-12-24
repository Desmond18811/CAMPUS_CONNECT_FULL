import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotificationsPopup.css';

const NotificationsPopup = () => {
    const [activeSection, setActiveSection] = useState('notifications');
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
                { id: 'notifications', label: 'Notifications', icon: Bell, active: true }
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

    const notifications = {
        thisWeek: [
            {
                id: 1,
                username: '@username',
                action: 'Liked your post.',
                timeAgo: '1d'
            },
            {
                id: 2,
                username: '@username',
                action: 'Saved your post.',
                timeAgo: '2d'
            },
            {
                id: 3,
                username: '@username',
                action: 'Saved your post.',
                timeAgo: '2d'
            }
        ],
        thisMonth: [
            {
                id: 4,
                username: '@username',
                action: 'Liked your post.',
                timeAgo: '06 Sept'
            },
            {
                id: 5,
                username: '@username',
                action: 'Liked your post.',
                timeAgo: '06 Sept'
            },
            {
                id: 6,
                username: '@username',
                action: 'Saved your post.',
                timeAgo: '05 Sept'
            },
            {
                id: 7,
                username: '@username, @username, @username, and others',
                action: 'Liked your post.',
                timeAgo: '02 Sept'
            },
            {
                id: 8,
                username: '@username',
                action: 'Commented: "This document really helped me! I really recommend it if you\'re studying this course honestly helped me!" on your post.',
                timeAgo: '01 Sept'
            }
        ],
        previous: [
            {
                id: 9,
                username: '@username',
                action: 'Liked your post.',
                timeAgo: '31 Aug'
            }
        ]
    };

    return (
        <div className="notifications-container">
            <div className="notifications-backdrop" onClick={() => navigate('/home')} />

            <div className="notifications-modal">
                <div className="notifications-layout">
                    <div className="notifications-sidebar">
                        <h2 className="notifications-title">Settings</h2>

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

                    <div className="notifications-divider"></div>

                    <div className="notifications-content">
                        <div className="content-header">
                            <h2 className="content-title">Notifications</h2>
                            <button
                                onClick={() => navigate('/home')}
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="notifications-section">
                            <div className="time-section">
                                <h3 className="time-heading">THIS WEEK</h3>
                                {notifications.thisWeek.map((notification) => (
                                    <div key={notification.id} className="notification-item">
                                        <div className="notification-avatar">
                                            <div className="avatar-inner-notif">
                                                <div className="avatar-x1-notif" />
                                                <div className="avatar-x2-notif" />
                                            </div>
                                        </div>
                                        <div className="notification-content">
                                            <span className="notification-username">{notification.username}</span>
                                            <span className="notification-action">{notification.action}</span>
                                            <span className="notification-time">{notification.timeAgo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="time-section">
                                <h3 className="time-heading">THIS MONTH</h3>
                                {notifications.thisMonth.map((notification) => (
                                    <div key={notification.id} className="notification-item">
                                        <div className="notification-avatar">
                                            <div className="avatar-inner-notif">
                                                <div className="avatar-x1-notif" />
                                                <div className="avatar-x2-notif" />
                                            </div>
                                        </div>
                                        <div className="notification-content">
                                            <span className="notification-username">{notification.username}</span>
                                            <span className="notification-action">{notification.action}</span>
                                            <span className="notification-time">{notification.timeAgo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="time-section">
                                <h3 className="time-heading">PREVIOUS</h3>
                                {notifications.previous.map((notification) => (
                                    <div key={notification.id} className="notification-item">
                                        <div className="notification-avatar">
                                            <div className="avatar-inner-notif">
                                                <div className="avatar-x1-notif" />
                                                <div className="avatar-x2-notif" />
                                            </div>
                                        </div>
                                        <div className="notification-content">
                                            <span className="notification-username">{notification.username}</span>
                                            <span className="notification-action">{notification.action}</span>
                                            <span className="notification-time">{notification.timeAgo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPopup;