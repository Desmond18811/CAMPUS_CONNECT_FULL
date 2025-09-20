// Importing React and useState hook from React library
import React, { useState } from 'react';

// Importing multiple icons from the lucide-react icon library
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
    Edit,
    X
} from 'lucide-react';

// Importing CSS styles specific to the HomePage component
import '../styles/HomePage.css';

// Importing custom React components
import Create from './Create';
import SettingsComponent from './Settings';

// Importing a JSON animation file
import animationData from '../assets/onlineLearning.json';

// Importing navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Importing the Lottie animation library
import Lottie from "lottie-react";

// Defining the Homepage component
const Homepage = () => {
    // State for sidebar visibility
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // State for settings modal
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // State for create post modal
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Navigation hook
    const navigate = useNavigate();

    // Function to generate a unique color for each username
    const generateUserColor = (username) => {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 60%)`;
    };

    // Handle search input change
    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };

    // Optional: Keep navigation to /search if needed
    const handleSearchNavigation = () => {
        navigate('/search');
    };

    const handleLikedPost = () => {
        navigate('/liked');
    };

    const handleSavedPosts = () => {
        navigate('/saved');
    };

    const handleNotifications = () => {
        navigate('/notifications');
    };

    const handleExplore = () => {
        navigate('/Home');
    };

    const handleLogout = () => {
        navigate('/Login');
    };

    const handleCreatePost = () => {
        setSidebarOpen(false);
        setIsCreatePostOpen(true);
    };

    const handleSettings = () => {
        setSidebarOpen(false);
        setIsSettingsOpen(true);
    };

    // Hardcoded list of posts
    const posts = [
        { id: 1, username: "Osoba's balls", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 2, username: "User is weird", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 3, username: "User is desmond", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 4, username: "User is weird", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 5, username: "User is desmond", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 6, username: "User is black", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 7, username: "User is fat", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['red', 'blue', 'orange', 'green'] },
        { id: 8, username: "DaVid", timeAgo: "Posted 1s ago", title: "Document Title", tags: ['purple', 'red', 'orange', 'yellow'] },
        { id: 9, username: "Creator", timeAgo: "Posted 12s ago", title: "ballered", tags: ['red', 'blue', 'orange', 'green'] },
    ];

    // Filter posts based on search query
    const filteredPosts = posts.filter(post =>
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="campus-connect">
            {/* Sidebar */}
            <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ display: sidebarOpen ? 'flex' : 'none' }}>
                <div className="sidebar-header">
                    <h1>Campus Connect</h1>
                </div>
                <nav className="navigation">
                    <div className="nav-item" onClick={handleSearchNavigation}>
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
                        <Settings size={20} color="#2563eb" />
                        <span>Settings</span>
                    </div>
                </nav>
                <div className="sidebar-footer" onClick={handleLogout}>
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                {/* Search bar and animation */}
                <div className="search-container">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search for contents"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchInput}
                        />
                    </div>
                    <div className="lottie-card">
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            className="lottie-animation"
                        />
                    </div>
                </div>

                {/* Feed of posts */}
                <div className="posts-feed">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => {
                            const userColor = generateUserColor(post.username);
                            return (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <div className="post-user">
                                            <div className="user-logo" style={{
                                                backgroundColor: userColor,
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
                            );
                        })
                    ) : (
                        <div className="no-posts">No posts found</div>
                    )}
                </div>
            </div>

            {/* Floating action button */}
            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>

            {/* Settings and Create Post modals */}
            {isSettingsOpen && (
                <SettingsComponent onClose={() => {
                    setIsSettingsOpen(false);
                    setSidebarOpen(true);
                    navigate('/home');
                }} />
            )}
            {isCreatePostOpen && (
                <Create onClose={() => {
                    setIsCreatePostOpen(false);
                    setSidebarOpen(true);
                    navigate('/home');
                }} />
            )}
        </div>
    );
};

export default Homepage;