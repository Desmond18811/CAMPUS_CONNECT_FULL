import React, { useState, useEffect } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/LikedPostsPopup.css';

const LikedPostsPopup = () => {
    const [activeSection, setActiveSection] = useState('likedPosts');
    const [posts, setPosts] = useState([]);
    const [savedIds, setSavedIds] = useState([]);
    const navigate = useNavigate();

    const SERVER_URL = 'https://campcon-test.onrender.com';

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

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((Date.now() - date) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
            return;
        }

        const fetchData = async () => {
            try {
                const [likedRes, savedRes] = await Promise.all([
                    fetch(`${SERVER_URL}/api/resources/liked`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch(`${SERVER_URL}/api/resources/saved`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    })
                ]);

                const [likedData, savedData] = await Promise.all([
                    likedRes.json(),
                    savedRes.json()
                ]);

                if (likedData.success && savedData.success) {
                    setSavedIds(savedData.data.map(post => post._id));
                    const fetchedPosts = likedData.data.map(post => ({
                        id: post._id,
                        username: post.uploader?.username || 'Unknown',
                        timeAgo: formatTimeAgo(new Date(post.createdAt)),
                        title: post.title,
                        tags: post.tags || [],
                        liked: true,
                        saved: savedData.data.map(p => p._id).includes(post._id),
                        likeCount: post.likeCount || 0
                    }));
                    setPosts(fetchedPosts);
                } else {
                    console.error('Failed to fetch liked/saved:', likedData.message || savedData.message);
                }
            } catch (error) {
                console.error('Error fetching liked/saved:', error.message);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLike = async (resourceId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                if (data.message === 'Like removed') {
                    setPosts(prev => prev.filter(post => post.id !== resourceId));
                } else {
                    setPosts(prev => prev.map(post =>
                        post.id === resourceId
                            ? { ...post, liked: true, likeCount: data.likeCount }
                            : post
                    ));
                }
            } else {
                console.error('Failed to like resource:', data.message);
            }
        } catch (error) {
            console.error('Error liking resource:', error.message);
        }
    };

    const handleSave = async (resourceId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}/save`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setPosts(prev => prev.map(post =>
                    post.id === resourceId
                        ? { ...post, saved: data.saved }
                        : post
                ));
            } else {
                console.error('Failed to save resource:', data.message);
            }
        } catch (error) {
            console.error('Error saving resource:', error.message);
        }
    };

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
                            {posts.map((post) => (
                                <div key={post.id} className="liked-post-card">
                                    <div className="liked-post-header">
                                        <div className="post-user">
                                            <div className="user-avatar">{post.username.charAt(0).toUpperCase()}</div>
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
                                                <button
                                                    className={`action-btn ${post.liked ? 'liked' : ''}`}
                                                    onClick={() => handleLike(post.id)}
                                                >
                                                    <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                                                </button>
                                                <button className="action-btn">
                                                    <MessageCircle size={18} />
                                                </button>
                                            </div>
                                            <button
                                                className={`action-btn ${post.saved ? 'saved' : ''}`}
                                                onClick={() => handleSave(post.id)}
                                            >
                                                <Bookmark size={18} fill={post.saved ? 'currentColor' : 'none'} />
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