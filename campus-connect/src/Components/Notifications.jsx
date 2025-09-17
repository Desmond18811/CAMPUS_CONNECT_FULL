import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import '../styles/NotificationsPopup.css';

const Notifications = () => {
    const [activeSection, setActiveSection] = useState('notifications');

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
            <div className="notifications-backdrop"  />

            <div className="notifications-modal">
                <div className="notifications-layout">
                    {/* Left Sidebar */}
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
                    <div className="notifications-divider"></div>

                    {/* Right Content */}
                    <div className="notifications-content">
                        <div className="content-header">
                            <h2 className="content-title">Notifications</h2>
                            <button
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="notifications-section">
                            {/* This Week */}
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

                            {/* This Month */}
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

                            {/* Previous */}
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

export default Notifications;