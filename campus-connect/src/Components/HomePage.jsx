import React, { useState } from 'react';
import {
    Search,
    Heart,
    Bookmark,
    Bell,
    Plus,
    Compass,
    Settings,
    LogOut,
    MoreHorizontal,
    MessageCircle,
    Edit, X
} from 'lucide-react';
import '../styles/HomePage.css'; // Fixed case sensitivity
import Create from './Create';
import SettingsComponent from './Settings';
import animationData from '../assets/onlineLearning.json'
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";

const Homepage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/search');
        console.log('Navigate to Search');
    };

    const handleLikedPost = () => {
        navigate('/liked');
        console.log('Navigate to Liked Posts');
    };

    const handleSavedPosts = () => {
        navigate('/saved');
        console.log('Navigate to Saved Posts');
    };

    const handleNotifications = () => {
        navigate('/notifications');
        console.log('Navigate to Notifications');
    };

    const handleCreatePost = () => {
        setSidebarOpen(false);
        setIsCreatePostOpen(true);
    };

    const handleExplore = () => console.log('Navigate to Explore');

    const handleSettings = () => {
        setSidebarOpen(false);
        setIsSettingsOpen(true);
    };

    const handleLogOut = () => console.log('Navigate to Sign Up');

    const posts = [
        { id: 1, username: "Osoba's balls", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 2, username: "User is weird", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 3, username: "User is desmond", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 4, username: "User is weird", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 5, username: "User is desmond", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 6, username: "User is black", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 7, username: "User is fat", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 8, username: "DaVid", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
    ];

    return (
        <div className="campus-connect">
            {/* Sidebar */}
            <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ display: sidebarOpen ? 'flex' : 'none' }}>
                <div className="sidebar-header">
                    <h1>Campus Connect</h1>
                </div>

                <nav className="navigation">
                    <div className="nav-item" onClick={handleSearch}>
                        <Search size={20} color="#2563eb" />
                        <span>Search</span>
                    </div>

                    <div className="nav-item" onClick={handleLikedPost}>
                        <Heart size={20} color="#2563eb" />
                        <span>Liked Posts</span>
                    </div>

                    <div className="nav-item" onClick={handleSavedPosts}>
                        <Bookmark size={20} color="#2563eb" />
                        <span>Saved Posts</span>
                    </div>

                    <div className="nav-item" onClick={handleNotifications}>
                        <Bell size={20} color="#2563eb" />
                        <span>Notifications</span>
                    </div>

                    <div className="nav-item" onClick={handleCreatePost}>
                        <Plus size={20} color="#2563eb" />
                        <span>Create Post</span>
                    </div>

                    <div className="nav-item" onClick={handleExplore}>
                        <Compass size={20} color="#2563eb" />
                        <span>Explore</span>
                    </div>

                    <div className="nav-item" onClick={handleSettings}>
                        <Settings size={20} color="#2563eb" /> {/* Fixed: Settings instead of Setting */}
                        <span>Settings</span>
                    </div>
                </nav>

                <div className="sidebar-footer" onClick={handleLogOut}>
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="search-container">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Search for contents" className="search-input" />
                    </div>
                    <div className="lottie-card">
                        <Lottie
                                                    animationData={animationData}
                                                    loop={true}
                                                    className="lottie-animation"
                                                 /></div>
                </div>

                <div className="posts-feed">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <div className="post-user">
                                    <div className="user-logo" style={{
                                        backgroundColor: '#1d4ed8',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%'
                                    }}>
                                        {post.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="username">{post.username}</span>
                                </div>
                                <button className="more-options">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <div className="document-preview">
                                <div className="document-placeholder">
                                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="post-content">
                                <div className="post-time">{post.timeAgo}</div>
                                <div className="tags">
                                    {post.tags.map((tag, index) => (
                                        <div key={index} className={`tag tag-${tag}`} />
                                    ))}
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <div className="post-actions">
                                    <div className="action-buttons">
                                        <button className="action-btn">
                                            <Heart size={20} />
                                        </button>
                                        <button className="action-btn">
                                            <MessageCircle size={20} />
                                        </button>
                                    </div>
                                    <button className="action-btn">
                                        <Bookmark size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>

            {/* Modals */}
            {isSettingsOpen && (
                <SettingsComponent onClose={() => {
                    setIsSettingsOpen(false);
                    setSidebarOpen(true);
                }} />
            )}

            {isCreatePostOpen && (
                <Create onClose={() => {
                    setIsCreatePostOpen(false);
                    setSidebarOpen(true);
                }} />
            )}
        </div>
    );
};

export default Homepage;
