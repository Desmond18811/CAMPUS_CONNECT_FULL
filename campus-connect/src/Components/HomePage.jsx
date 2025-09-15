import React, { useState } from 'react';
import { Search, Heart, Bookmark, Bell, Plus, Compass, Settings, LogOut, MoreHorizontal, MessageCircle, Edit } from 'lucide-react';
import '../styles/HomePage.css';
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());

    const navigate = useNavigate();
    const toggleLike = (postId) => {
        const newLikedPosts = new Set(likedPosts);
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
        } else {
            newLikedPosts.add(postId);
        }
        setLikedPosts(newLikedPosts);
    };

    const handleSearch = () => {
     navigate('/search');
    }

    const handleLikedPost = () => {
       navigate('/liked');
    }

    const handleSavedPosts = () => {
         navigate('/saved')
    }

    const handleNotifications = () => {
       navigate('/notifications')
    }

    const handleCreatePost = () => {
        navigate('/create')
    }

    const handleExplore = () => {
        navigate('/explore')
    }

    const handleSettings = () => {
        navigate('/settings')
    }

    const handleLogOut = () => {
        navigate('/login')
    }
    //Generic post data
    const posts = [
        {
            id: 1,
            username: "Osoba's balls",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['red', 'blue', 'orange', 'green']
        },
        {
            id: 2,
            username: "User is weird",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 3,
            username: "User is desmond",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['red', 'blue', 'orange', 'green']
        },
        {
            id: 4,
            username: "User is weird",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 5,
            username: "User is desmond",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['red', 'blue', 'orange', 'green']
        }

    ];

    return (
        <div className="campus-connect">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Header */}
                <div className="sidebar-header">
                    <h1>Campus Connect</h1>
                </div>

                {/* Navigation */}
                <nav className="navigation">
                    <div className="nav-item">
                        <Search size={20} color='#2563eb'/>
                        <span onClick={handleSearch}>Search</span>
                    </div>

                    <div className="nav-item">
                        <Heart size={20} color='#2563eb'/>
                        <span onClick={handleLikedPost}>Liked Posts</span>
                    </div>

                    <div className="nav-item">
                        <Bookmark size={20} color='#2563eb'/>
                        <span onClick={handleSavedPosts}>Saved Posts</span>
                    </div>

                    <div className="nav-item">
                        <Bell size={20} color='#2563eb'/>
                        <span onClick={handleNotifications}>Notifications</span>
                    </div>

                    <div className="nav-item">
                        <Plus size={20} color='#2563eb'/>
                        <span onClick={handleCreatePost}>Create Post</span>
                    </div>

                    <div className="nav-item">
                        <Compass size={20} color='#2563eb'/>
                        <span onClick={handleExplore}>Explore</span>
                    </div>

                    <div className="nav-item">
                        <Settings size={20} color='#2563eb'/>
                        <span onClick={handleSettings}>Settings</span>
                    </div>
                </nav>

                {/* Log Out Button */}
                <div className="sidebar-footer">
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span onClick={handleLogOut}>Log Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Search Bar */}
                <div className="search-container">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search for contents"
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card">
                            {/* Post Header */}
                            <div className="post-header">
                                <div className="post-user">
                                    <div className="user-logo">C</div>
                                    <span className="username">{post.username}</span>
                                </div>
                                <button className="more-options">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Document Preview */}
                            <div className="document-preview">
                                <div className="document-placeholder">
                                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="post-content">
                                <div className="post-time">{post.timeAgo}</div>

                                {/* Tags */}
                                <div className="tags">
                                    {post.tags.map((tag, index) => (
                                        <div key={index} className={`tag tag-${tag}`} />
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="post-title">{post.title}</h3>

                                {/* Actions */}
                                <div className="post-actions">
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`action-btn ${likedPosts.has(post.id) ? 'liked' : ''}`}
                                        >
                                            <Heart size={20} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
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
            <button className="fab">
                <Edit size={24} />
            </button>
        </div>
    );
};

export default HomePage;