import React, { useState, useEffect } from 'react';
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
import '../styles/HomePage.css';
import Create from './Create';
import SettingsComponent from './Settings';
import Comments from './Comments';
import animationData from '../assets/onlineLearning.json';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";

const Homepage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [selectedResourceId, setSelectedResourceId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState({
        username: '',
        profileImage: null,
        profileColor: '#cc002e'
    });
    const [posts, setPosts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const SERVER_URL = 'https://campcon-test.onrender.com';

    const generateUserColor = (username) => {
        if (!username) return userData.profileColor;
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 60%)`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
            return;
        }

        // Fetch user profile
        fetch(`${SERVER_URL}/api/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserData({
                        username: data.data.username || '',
                        profileImage: data.data.profilePic ? `${SERVER_URL}${data.data.profilePic}` : null,
                        profileColor: data.data.profileColor || '#cc002e'
                    });
                } else {
                    console.error('Failed to fetch profile:', data.message);
                }
            })
            .catch(error => console.error('Error fetching profile:', error.message));

        // Fetch resources, liked, and saved concurrently
        const fetchData = async () => {
            try {
                const [resourcesRes, likedRes, savedRes] = await Promise.all([
                    fetch(`${SERVER_URL}/api/resources`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch(`${SERVER_URL}/api/resources/liked`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch(`${SERVER_URL}/api/resources/saved`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    })
                ]);

                const [resourcesData, likedData, savedData] = await Promise.all([
                    resourcesRes.json(),
                    likedRes.json(),
                    savedRes.json()
                ]);

                if (resourcesData.success && likedData.success && savedData.success) {
                    const likedIds = likedData.data.map(post => post._id);
                    const savedIds = savedData.data.map(post => post._id);

                    const fetchedPosts = resourcesData.data.map(post => ({
                        id: post._id,
                        username: post.uploader?.username || 'Unknown',
                        profileImage: post.profilePic ? `${SERVER_URL}${post.profilePic}` : post.uploader?.profilePic ? `${SERVER_URL}${post.uploader.profilePic}` : null,
                        profileColor: post.profileColor || post.uploader?.profileColor || generateUserColor(post.uploader?.username || ''),
                        imageUrl: post.imageUrl ? `${SERVER_URL}${post.imageUrl}` : '',
                        fileUrl: post.fileUrl ? `${SERVER_URL}${post.fileUrl}` : '',
                        fileType: post.fileType || '',
                        timeAgo: formatTimeAgo(new Date(post.createdAt)),
                        title: post.title,
                        tags: post.tags || [],
                        taggedUsers: post.taggedUsers || [],
                        likeCount: post.likeCount || 0,
                        liked: likedIds.includes(post._id),
                        saved: savedIds.includes(post._id)
                    }));
                    setPosts(fetchedPosts);
                } else {
                    console.error('Failed to fetch resources/liked/saved:', resourcesData.message || likedData.message || savedData.message);
                }
            } catch (error) {
                console.error('Error fetching posts/liked/saved:', error.message);
            }
        };

        fetchData();

        // Fetch notifications
        fetch(`${SERVER_URL}/api/notifications`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setNotifications(data.data);
                } else {
                    console.error('Failed to fetch notifications:', data.message);
                }
            })
            .catch(error => console.error('Error fetching notifications:', error.message));
    }, [navigate]);

    // Format time ago
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

    const handleLike = async (resourceId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setPosts(prev => prev.map(post =>
                    post.id === resourceId
                        ? {
                            ...post,
                            liked: data.message === 'Resource liked',
                            likeCount: data.likeCount
                        }
                        : post
                ));
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

    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };

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
        localStorage.removeItem('token');
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

    const handleOpenComments = (resourceId) => {
        setSelectedResourceId(resourceId);
        setIsCommentsOpen(true);
        setSidebarOpen(false);
    };

    const filteredPosts = posts.filter(post =>
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Determine if file is a video
    const isVideo = (fileType) => ['.mp4', '.mov', '.avi'].includes(fileType);

    // Determine if file is an image
    const isImage = (fileType) => ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp'].includes(fileType);

    return (
        <div className="campus-connect">
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
                        <span>Notifications ({notifications.length})</span>
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

            <div className="main-content">
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

                <div className="posts-feed">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <div className="post-user">
                                        {post.profileImage ? (
                                            <img
                                                src={post.profileImage}
                                                alt="Profile"
                                                className="user-logo"
                                                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className="user-logo"
                                            style={{
                                                backgroundColor: post.profileColor,
                                                color: 'white',
                                                display: post.profileImage ? 'none' : 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            {post.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="username">{post.username}</span>
                                    </div>
                                    <button className="more-options">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                                <div className="document-preview">
                                    <a href={post.fileUrl} target="_blank" rel="noopener noreferrer">
                                        {isVideo(post.fileType) ? (
                                            <video
                                                src={post.fileUrl}
                                                poster={post.imageUrl}
                                                style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '8px' }}
                                                controls
                                                muted
                                            />
                                        ) : post.imageUrl || isImage(post.fileType) ? (
                                            <img
                                                src={post.imageUrl || post.fileUrl}
                                                alt={post.title}
                                                style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '8px' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                        ) : (
                                            <div className="document-placeholder">
                                                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="document-placeholder" style={{ display: 'none' }}>
                                            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                                <div className="post-content">
                                    <div className="post-time">{post.timeAgo}</div>
                                    <div className="tags">
                                        {post.tags.map((tag, index) => (
                                            <div key={index} className={`tag tag-${tag.toLowerCase()}`} />
                                        ))}
                                    </div>
                                    <h3 className="post-title">{post.title}</h3>
                                    <div className="post-actions">
                                        <div className="action-buttons">
                                            <button
                                                className={`action-btn ${post.liked ? 'liked' : ''}`}
                                                onClick={() => handleLike(post.id)}
                                                style={{ color: post.liked ? '#ff0000' : '#666' }}
                                            >
                                                <Heart size={20} fill={post.liked ? '#ff0000' : 'none'} /> {post.likeCount}
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() => handleOpenComments(post.id)}
                                            >
                                                <MessageCircle size={20} />
                                            </button>
                                        </div>
                                        <button
                                            className={`action-btn ${post.saved ? 'saved' : ''}`}
                                            onClick={() => handleSave(post.id)}
                                            style={{ color: post.saved ? '#000000' : '#666' }}
                                        >
                                            <Bookmark size={20} fill={post.saved ? '#000000' : 'none'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-posts">No posts found</div>
                    )}
                </div>
            </div>

            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>

            {isSettingsOpen && (
                <SettingsComponent
                    onClose={() => {
                        setIsSettingsOpen(false);
                        setSidebarOpen(true);
                        navigate('/home');
                    }}
                    userData={userData}
                    setUserData={setUserData}
                />
            )}
            {isCreatePostOpen && (
                <Create
                    onClose={() => {
                        setIsCreatePostOpen(false);
                        setSidebarOpen(true);
                        navigate('/home');
                        // Refresh posts after creating a new one
                        const token = localStorage.getItem('token');
                        const refreshData = async () => {
                            try {
                                const [resourcesRes, likedRes, savedRes] = await Promise.all([
                                    fetch(`${SERVER_URL}/api/resources`, {
                                        headers: { 'Authorization': `Bearer ${token}` },
                                    }),
                                    fetch(`${SERVER_URL}/api/resources/liked`, {
                                        headers: { 'Authorization': `Bearer ${token}` },
                                    }),
                                    fetch(`${SERVER_URL}/api/resources/saved`, {
                                        headers: { 'Authorization': `Bearer ${token}` },
                                    })
                                ]);

                                const [resourcesData, likedData, savedData] = await Promise.all([
                                    resourcesRes.json(),
                                    likedRes.json(),
                                    savedRes.json()
                                ]);

                                if (resourcesData.success && likedData.success && savedData.success) {
                                    const likedIds = likedData.data.map(post => post._id);
                                    const savedIds = savedData.data.map(post => post._id);

                                    const fetchedPosts = resourcesData.data.map(post => ({
                                        id: post._id,
                                        username: post.uploader?.username || 'Unknown',
                                        profileImage: post.profilePic ? `${SERVER_URL}${post.profilePic}` : post.uploader?.profilePic ? `${SERVER_URL}${post.uploader.profilePic}` : null,
                                        profileColor: post.profileColor || post.uploader?.profileColor || generateUserColor(post.uploader?.username || ''),
                                        imageUrl: post.imageUrl ? `${SERVER_URL}${post.imageUrl}` : '',
                                        fileUrl: post.fileUrl ? `${SERVER_URL}${post.fileUrl}` : '',
                                        fileType: post.fileType || '',
                                        timeAgo: formatTimeAgo(new Date(post.createdAt)),
                                        title: post.title,
                                        tags: post.tags || [],
                                        taggedUsers: post.taggedUsers || [],
                                        likeCount: post.likeCount || 0,
                                        liked: likedIds.includes(post._id),
                                        saved: savedIds.includes(post._id)
                                    }));
                                    setPosts(fetchedPosts);
                                }
                            } catch (error) {
                                console.error('Error refreshing posts:', error);
                            }
                        };
                        refreshData();
                    }}
                    userData={userData}
                />
            )}
            {isCommentsOpen && (
                <Comments
                    resourceId={selectedResourceId}
                    onClose={() => {
                        setIsCommentsOpen(false);
                        setSidebarOpen(true);
                        navigate('/home');
                    }}
                />
            )}
        </div>
    );
};

export default Homepage;