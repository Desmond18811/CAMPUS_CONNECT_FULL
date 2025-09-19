// Importing React and useState hook from React library
import React, { useState } from 'react';

// Importing multiple icons from the lucide-react icon library
// Each of these icons is an SVG React component you can render directly
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

// Importing custom React components that will be rendered inside this page
import Create from './Create';
import SettingsComponent from './Settings';

// Importing a JSON animation file (for Lottie animation player)
import animationData from '../assets/onlineLearning.json';

// Importing navigation hook from React Router
// useNavigate lets us move programmatically between routes
import { useNavigate } from 'react-router-dom';

// Importing the Lottie animation library to render the animationData JSON
import Lottie from "lottie-react";

// Defining a functional React component named Homepage
const Homepage = () => {
    // State to track if the sidebar is open (true by default)
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // State to check if settings modal/component is open
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // State to check if create post modal/component is open
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    // useNavigate hook lets us navigate to different routes
    const navigate = useNavigate();

    // Function to generate a unique color for each username
    // It creates a hash from the username and maps it to an HSL color
    const generateUserColor = (username) => {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 60%)`; // returns a bright HSL color
    };

    // Navigation handlers for different sidebar actions
    const handleSearch = () => navigate('/search');
    const handleLikedPost = () => navigate('/liked');
    const handleSavedPosts = () => navigate('/saved');
    const handleNotifications = () => navigate('/notifications');
    const handleExplore = () => navigate('/Home');
    const handleLogOut = () => navigate('/login');

    // When Create Post is clicked:
    // - close sidebar
    // - open create post modal
    const handleCreatePost = () => {
        setSidebarOpen(false);
        setIsCreatePostOpen(true);
    };

    // When Settings is clicked:
    // - close sidebar
    // - open settings modal
    const handleSettings = () => {
        setSidebarOpen(false);
        setIsSettingsOpen(true);
    };

    // Hardcoded list of post objects
    // Each post contains id, username, timeAgo, title, and tags
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

    // Component UI begins here
    return (
        <div className="campus-connect">
            
            {/* Sidebar (only visible if sidebarOpen = true) */}
            <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ display: sidebarOpen ? 'flex' : 'none' }}>
                <div className="sidebar-header">
                    <h1>Campus Connect</h1>
                </div>

                {/* Navigation Menu Items */}
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
                        <Settings size={20} color="#2563eb" />
                        <span>Settings</span>
                    </div>
                </nav>

                {/* Logout button at the bottom of the sidebar */}
                <div className="sidebar-footer" onClick={handleLogOut}>
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="main-content">

                {/* Search bar and animation */}
                <div className="search-container">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Search for contents" className="search-input" />
                    </div>

                    {/* Lottie animation card */}
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
                    {posts.map(post => {
                        // Generate unique color for the user's avatar circle
                        const userColor = generateUserColor(post.username);

                        return (
                            <div key={post.id} className="post-card">

                                {/* Post Header: user info + more options */}
                                <div className="post-header">
                                    <div className="post-user">
                                        {/* User initial inside colored circle */}
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
                                    {/* Button for more options (3 dots) */}
                                    <button className="more-options">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                {/* Document preview section (placeholder right now) */}
                                <div className="document-preview">
                                    <div className="document-placeholder">
                                        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Post content: time, tags, title, actions */}
                                <div className="post-content">
                                    <div className="post-time">{post.timeAgo}</div>

                                    {/* Render tags */}
                                    <div className="tags">
                                        {post.tags.map((tag, index) => (
                                            <div key={index} className={`tag tag-${tag}`} />
                                        ))}
                                    </div>

                                    {/* Post Title */}
                                    <h3 className="post-title">{post.title}</h3>

                                    {/* Action buttons (like, comment, save) */}
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
                    })}
                </div>
            </div>

            {/* Floating action button to create a post */}
            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>

            {/* Render settings component if open */}
            {isSettingsOpen && (
                <SettingsComponent onClose={() => {
                    setIsSettingsOpen(false);
                    setSidebarOpen(true);
                    navigate('/home');
                }} />
            )}

            {/* Render create post component if open */}
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

// Exporting the Homepage component so it can be imported elsewhere
export default Homepage;
