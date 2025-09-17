import React, { useState } from 'react';
import { Search, Heart, Bookmark, Bell, Plus, Compass, Settings, LogOut, MoreHorizontal, MessageCircle, Edit } from 'lucide-react';
import { X, User, Bell as BellSettings, Heart as HeartSettings, Bookmark as BookmarkSettings, MessageCircle as MessageCircleSettings, HelpCircle, Shield, UserCheck, Image, FileText } from 'lucide-react';
import '../styles/HomePage.css';
import '../styles/Settings.css';
import animationData from '../assets/onlineLearning.json';
import {useNavigate} from "react-router-dom";
import Lottie from "lottie-react"

const HomePage = () => {
    const getRandomColors  = () => {
        const colors = ['#cc002e', '#256cff', '#ffd05b', '#007070', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4BC0C0', '#cc002e', '#CCCCCC'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    const [likedPosts, setLikedPosts] = useState(new Set());
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [formDataSettings, setFormDataSettings] = useState({
        username: '',
        schoolName: '',
        level: '',
        bio: '',
        profileColor: getRandomColors()
    });
    const [profileImage, setProfileImage] = useState(null);

// Add this handler for image selection
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [isSubmittingSettings, setIsSubmittingSettings] = useState({
        username: false,
        schoolName: false,
        level: false,
        bio: false
    });
    const [activeSection, setActiveSection] = useState('editProfile');
    const [documentTitle, setDocumentTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filters, setFilters] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
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
        console.log('Navigate to Search');
    };

    const handleLikedPost = () => {
    navigate('/liked')
        console.log('Navigate to Liked Posts');
    };

    const handleSavedPosts = () => {
        navigate('/saved')
        console.log('Navigate to Saved Posts');
    };

    const handleNotifications = () => {
        navigate('/notifications')
        console.log('Navigate to Notifications');
    };

    const handleCreatePost = () => {
        setSidebarOpen(false);
        setIsCreatePostOpen(true);
    };

    const handleExplore = () => {
        console.log('Navigate to Explore');
    };

    const handleSettings = () => {
        setSidebarOpen(false);
        setIsSettingsOpen(true);
    };

    const handleLogOut = () => {
        console.log('Navigate to Sign Up');
    };

    // Settings Handlers
    const handleInputChangeSettings = (field, value) => {
        setFormDataSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitSettings = async (field) => {
        setIsSubmittingSettings(prev => ({ ...prev, [field]: true }));

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`${field} updated successfully!`);
        } catch (error) {
            alert(`Failed to update ${field}`);
            console.log(error);
        } finally {
            setIsSubmittingSettings(prev => ({ ...prev, [field]: false }));
        }
    };

    const menuItems = [
        {
            category: 'How you use campus connect',
            items: [
                { id: 'editProfile', label: 'Edit Profile', icon: User, active: true }
            ]
        },
        {
            category: null,
            items: [
                { id: 'notifications', label: 'Notifications', icon: BellSettings }
            ]
        },
        {
            category: 'How others can interact with you',
            items: [
                { id: 'likedPosts', label: 'Liked Posts', icon: HeartSettings },
                { id: 'savedPosts', label: 'Saved Posts', icon: BookmarkSettings },
                { id: 'comments', label: 'Comments', icon: MessageCircleSettings }
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

    // Create Post Handlers
    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleImageSelect = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handlePost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a post. Please log in.');
            return;
        }

        if (!documentTitle.trim() || !selectedFile) {
            alert('Please enter a document title and select a file');
            return;
        }

        setIsLoadingPost(true);
        try {
            const formData = new FormData();
            formData.append('title', documentTitle);
            formData.append('description', description);
            formData.append('subject', 'General');
            formData.append('gradeLevel', 'All');
            formData.append('resourceType', 'document');
            filters.forEach((filter) => {
                formData.append('tags[]', filter);
            });
            formData.append('file', selectedFile);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const response = await fetch('https://campcon-test.onrender.com/api/resources', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setDocumentTitle('');
                    setDescription('');
                    setFilters([]);
                    setSelectedFile(null);
                    setSelectedImage(null);
                    setIsCreatePostOpen(false);
                    setSidebarOpen(true); // Reopen sidebar after success
                }, 2000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
            }
        } catch (error) {
            alert('Error creating post: ' + error.message);
        } finally {
            setIsLoadingPost(false);
        }
    };

    const addFilter = () => {
        const filterName = prompt('Enter filter name:');
        if (filterName && filterName.trim()) {
            setFilters([...filters, filterName.trim()]);
        }
    };

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    // Generic post data
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
        },
        {
            id: 6,
            username: "User is black",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 7,
            username: "User is fat",
            timeAgo: "Posted 1s ago",
            title: "Document Title",
            tags: ['red', 'blue', 'orange', 'green']
        }
    ];

    return (
        <div className="campus-connect">
            {/* Sidebar */}
            <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ display: sidebarOpen ? 'flex' : 'none' }}>
                {/* Header */}
                <div className="sidebar-header">
                    <h1>Campus Connect</h1>
                </div>


                {/* Navigation */}
                <nav className="navigation">
                    <div className="nav-item">
                        <Search size={20} color='#2563eb' />
                        <span onClick={handleSearch}>Search</span>
                    </div>

                    <div className="nav-item">
                        <Heart size={20} color='#2563eb' />
                        <span onClick={handleLikedPost}>Liked Posts</span>
                    </div>

                    <div className="nav-item">
                        <Bookmark size={20} color='#2563eb' />
                        <span onClick={handleSavedPosts}>Saved Posts</span>
                    </div>

                    <div className="nav-item">
                        <Bell size={20} color='#2563eb' />
                        <span onClick={handleNotifications}>Notifications</span>
                    </div>

                    <div className="nav-item">
                        <Plus size={20} color='#2563eb' />
                        <span onClick={handleCreatePost}>Create Post</span>
                    </div>

                    <div className="nav-item">
                        <Compass size={20} color='#2563eb' />
                        <span onClick={handleExplore}>Explore</span>
                    </div>

                    <div className="nav-item">
                        <Settings size={20} color='#2563eb' />
                        <span onClick={handleSettings}>Settings</span>
                    </div>
                </nav>

                {/* Log Out Button */}
                <div className="sidebar-footer" onClick={handleLogOut}>
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Log Out</span>
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
                    <div className="lottie-card">
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            className="lottie-animation"
                        /></div>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card">
                            {/* Post Header */}
                            <div className="post-header">
                                <div className="post-user">
                                    <div className="user-logo" style={{
                                        backgroundColor: getRandomColors(),
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}>
                                        {getInitial(post.username)}
                                    </div>
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
            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>

            {/* Settings Popup */}
            {isSettingsOpen && (
                <div className="settings-container">
                    <div className="settings-backdrop" onClick={() => { setIsSettingsOpen(false); setSidebarOpen(true); }} />

                    <div className="settings-modal">
                        <div className="settings-layout">
                            {/* Left Sidebar */}
                            <div className="settings-sidebar">
                                <h2 className="settings-title">Settings</h2>

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

                            {/* Vertical Divider */}
                            <div className="settings-divider"></div>

                            {/* Right Content */}
                            <div className="settings-content">
                                <div className="content-header">
                                    <h2 className="content-title">Edit Profile</h2>
                                    <button
                                        onClick={() => { setIsSettingsOpen(false); setSidebarOpen(true); }}
                                        className="close-button"
                                    >
                                        <X />
                                    </button>
                                </div>

                                <div className="profile-section">
                                    {/* Profile Card */}
                                    <div className="profile-card">
                                        <div className="profile-info">
                                            <div className="avatar-large">
                                                {profileImage ? (
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile"
                                                        className="profile-image-large"
                                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="avatar-inner-large"
                                                        style={{
                                                            backgroundColor: formDataSettings.profileColor,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white',
                                                            fontSize: '24px',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {getInitial(formDataSettings.username || 'User')}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="profile-username">@{formDataSettings.username || 'username'}</span>
                                        </div>

                                        <div className="profile-image-actions">
                                            <input
                                                type="file"
                                                id="profile-image-upload"
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            <label htmlFor="profile-image-upload" className="image-upload-btn">
                                                <Image size={16} />
                                                Choose Image
                                            </label>
                                            <button className="edit-profile-btn">Edit Profile</button>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="form-section">
                                        <div className="form-group">
                                            <label className="form-label">Change Username</label>
                                            <div className="form-input-group">
                                                <input
                                                    type="text"
                                                    value={formDataSettings.username}
                                                    onChange={(e) => handleInputChangeSettings('username', e.target.value)}
                                                    className="form-input"
                                                    placeholder="Enter new username"
                                                />
                                                <button
                                                    onClick={() => handleSubmitSettings('username')}
                                                    disabled={isSubmittingSettings.username || !formDataSettings.username.trim()}
                                                    className="submit-btn"
                                                >
                                                    {isSubmittingSettings.username ? (
                                                        <div className="loading-spinner-small" />
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Change School Name</label>
                                            <div className="form-input-group">
                                                <input
                                                    type="text"
                                                    value={formDataSettings.schoolName}
                                                    onChange={(e) => handleInputChangeSettings('schoolName', e.target.value)}
                                                    className="form-input"
                                                    placeholder="Enter school name"
                                                />
                                                <button
                                                    onClick={() => handleSubmitSettings('schoolName')}
                                                    disabled={isSubmittingSettings.schoolName || !formDataSettings.schoolName.trim()}
                                                    className="submit-btn"
                                                >
                                                    {isSubmittingSettings.schoolName ? (
                                                        <div className="loading-spinner-small" />
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Change Level</label>
                                            <div className="form-input-group">
                                                <input
                                                    type="text"
                                                    value={formDataSettings.level}
                                                    onChange={(e) => handleInputChangeSettings('level', e.target.value)}
                                                    className="form-input"
                                                    placeholder="Enter level"
                                                />
                                                <button
                                                    onClick={() => handleSubmitSettings('level')}
                                                    disabled={isSubmittingSettings.level || !formDataSettings.level.trim()}
                                                    className="submit-btn"
                                                >
                                                    {isSubmittingSettings.level ? (
                                                        <div className="loading-spinner-small" />
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Bio</label>
                                            <div className="form-input-group bio-group">
                                                <textarea
                                                    value={formDataSettings.bio}
                                                    onChange={(e) => handleInputChangeSettings('bio', e.target.value)}
                                                    className="form-textarea"
                                                    placeholder="Tell us about yourself"
                                                    rows={4}
                                                />
                                                <button
                                                    onClick={() => handleSubmitSettings('bio')}
                                                    disabled={isSubmittingSettings.bio || !formDataSettings.bio.trim()}
                                                    className="submit-btn bio-submit"
                                                >
                                                    {isSubmittingSettings.bio ? (
                                                        <div className="loading-spinner-small" />
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Post Popup */}
            {isCreatePostOpen && (
                <div className="settings-container"> {/* Reusing settings-container class for consistency */}
                    <div className="settings-backdrop" onClick={() => { setIsCreatePostOpen(false); setSidebarOpen(true); }} />

                    <div className="settings-modal">
                        <div className="header">
                            <div className="user-info">
                                <div className="avatar">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div
                                            className="avatar-inner"
                                            style={{
                                                backgroundColor: formDataSettings.profileColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {getInitial(formDataSettings.username || 'User')}
                                        </div>
                                    )}
                                </div>
                                <div className="username">
                                    <span>@username</span>
                                    <svg className="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <button onClick={() => { setIsCreatePostOpen(false); setSidebarOpen(true); }} className="close-button">
                                <X />
                            </button>
                        </div>

                        <div className="content">
                            {/* Document Title */}
                            <div className="title-section">
                                <h3>Document Title:</h3>
                                <textarea
                                    value={documentTitle}
                                    onChange={(e) => setDocumentTitle(e.target.value)}
                                    placeholder="Type the Document Title"
                                    className="title-input"
                                    maxLength={500}
                                />
                            </div>

                            {/* Description */}
                            <div className="title-section">
                                <h3>Description:</h3>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type the description (optional)"
                                    className="title-input"
                                    maxLength={1000}
                                />
                            </div>

                            {/* Filters Section */}
                            <div className="filters-section">
                                <button
                                    onClick={addFilter}
                                    className="add-filter-button"
                                >
                                    <Plus />
                                    Add Filters
                                </button>

                                {filters.length > 0 && (
                                    <div className="filters-container">
                                        {filters.map((filter, index) => (
                                            <span
                                                key={index}
                                                className="filter-tag"
                                            >
                                                {filter}
                                                <button
                                                    onClick={() => removeFilter(index)}
                                                    className="filter-remove"
                                                >
                                                    <X />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Media Icons */}
                            <div className="media-icons">
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleImageSelect}
                                    accept="image/*"
                                />
                                <button className="media-button" onClick={() => document.querySelector('input[type="file"]').click()}>
                                    <Image />
                                </button>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                <button className="media-button" onClick={() => document.querySelectorAll('input[type="file"]')[1].click()}>
                                    <FileText />
                                </button>
                            </div>

                            {/* Post Button */}
                            <div className="post-section">
                                <button
                                    onClick={handlePost}
                                    disabled={isLoadingPost || !documentTitle.trim()}
                                    className="post-button"
                                >
                                    {isLoadingPost ? (
                                        <div className="loading-spinner" />
                                    ) : (
                                        'Post'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="success-message">
                            Document posted successfully!
                        </div>
                    )}
                </div>
            )}

            {/* Floating Action Button */}
            <button className="fab" onClick={handleCreatePost}>
                <Edit size={24} />
            </button>
        </div>
    );
};

export default HomePage;
