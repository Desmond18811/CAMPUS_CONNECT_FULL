<<<<<<< Updated upstream
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

import "../styles/like.css";

function Liked() {
  const navigate = useNavigate();

  // Navigation handlers
  const handleSearch = () => navigate("/search");
  const handleLikedPost = () => navigate("/liked");
  const handleSavedPosts = () => navigate("/saved");
  const handleNotifications = () => navigate("/notifications");
  const handleCreatePost = () => navigate("/create");
  const handleExplore = () => navigate("/explore");
  const handleSettings = () => navigate("/settings");
  const handleLogOut = () => navigate("/login");

  // Dummy post data
  const posts = [
    {
      id: 1,
      username: "John Doe",
      timeAgo: "Posted 5m ago",
      title: "Understanding React useState Hook",
      tags: ["react", "javascript", "hooks"],
    },
    {
      id: 2,
      username: "Jane Smith",
      timeAgo: "Posted 10m ago",
      title: "Getting Started with Tailwind CSS",
      tags: ["css", "tailwind", "frontend"],
    },
    {
      id: 3,
      username: "Chris Evans",
      timeAgo: "Posted 30m ago",
      title: "Top 10 Git Commands Every Developer Should Know",
      tags: ["git", "github", "version-control"],
    },
    {
      id: 4,
      username: "Alice Johnson",
      timeAgo: "Posted 1h ago",
      title: "Building a REST API with Node.js",
      tags: ["nodejs", "backend", "api"],
    },
    {
      id: 5,
      username: "Michael Brown",
      timeAgo: "Posted 2h ago",
      title: "Understanding Flexbox in CSS",
      tags: ["css", "flexbox", "layout"],
    },
  ];

  // Liked posts state
const [likedPosts, setLikedPosts] = useState(new Set(posts.map((post) => post.id)));

const toggleLike = (postId) => {
  const newLikedPosts = new Set(likedPosts);
  if (newLikedPosts.has(postId)) {
    newLikedPosts.delete(postId);
  } else {
    newLikedPosts.add(postId);
  }
  setLikedPosts(newLikedPosts);
};

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Campus Connect</h1>
        </div>

        <nav className="navigation">
          <div className="nav-item" onClick={handleSearch}>
            <Search size={20} />
            <span>Search</span>
          </div>
          <div className="nav-item" onClick={handleLikedPost}>
            <Heart size={20} />
            <span>Liked Posts</span>
          </div>
          <div className="nav-item" onClick={handleSavedPosts}>
            <Bookmark size={20} />
            <span>Saved Posts</span>
          </div>
          <div className="nav-item" onClick={handleNotifications}>
            <Bell size={20} />
            <span>Notifications</span>
          </div>
          <div className="nav-item" onClick={handleCreatePost}>
            <Plus size={20} />
            <span>Create Post</span>
          </div>
          <div className="nav-item" onClick={handleExplore}>
            <Compass size={20} />
            <span>Explore</span>
          </div>
          <div className="nav-item" onClick={handleSettings}>
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogOut}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

 
  {/* Main Content */}
{/* Main Content */}
<main className="liked-content">
  {/* Tabs */}
  <nav className="liked-tabs">
    <div className="head">
        Liked post
    </div>
    <div className="buttons">
    <button className="tab-btn">Posts</button>
    <button className="tab-btn">Saved</button>
    <button className="tab-btn">Liked</button>
    </div>
    
  </nav>

  <div className="like-content-area">
    {/* Posts Section */}
    <section className="like-posts-section">
      {posts.map((post) => (
        <article key={post.id} className="like-post-card">
          {/* Post Header */}
          <header className="like-post-header">
            <div className="like-post-user">
              <div className="like-user-logo">{post.username[0]}</div>
              <span className="like-username">{post.username}</span>
            </div>
            <button className="more-options">
              <MoreHorizontal size={20} />
            </button>
          </header>

          {/* Document Preview */}
       <div className="document-preview">
                                <div className="document-placeholder">
                                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
        </div>

          {/* Post Content */}
          <div className="like-post-content">
            <div className="like-post-time">{post.timeAgo}</div>

            <div className="like-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="like-tag">
                  #{tag}
                </span>
              ))}
            </div>

            <h3 className="like-post-title">{post.title}</h3>

            {/* Post Actions */}
            <div className="like-post-actions">
              <button
                onClick={() => toggleLike(post.id)}
                className={`like-action-btn ${
                  likedPosts.has(post.id) ? "liked" : ""
                }`}
              >
                <Heart
                  size={20}
                  fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                />
              </button>
              <button className="like-action-btn">
                <MessageCircle size={20} />
              </button>
              <button className="like-action-btn">
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>

    {/* Profile Card */}
<aside className="profile-card">
  <div className="card-content">
    <div className="profile-icon">
      <img
        src="https://placehold.co/100x100"
        alt="Profile placeholder"
        className="profile-img"
      />
    </div>
    <div className="user-details">
      <p className="username">@campus-connect-team_23</p>
      <p className="bio">
        <h2>Bio: </h2>
        We are a group of sensible people and Ebube who are working together
        to build a project, although it was meant to be a hook up site sha...
      </p>
    </div>
  </div>
</aside>

  </div>
</main>


    </div>
  );
}
=======
import React, { useState } from 'react';
import { X, User, Bell, Heart, Bookmark, MessageCircle, HelpCircle, Shield, UserCheck } from 'lucide-react';
import '../styles/LikedPostsPopup.css';

const Liked = () => {
    const [activeSection, setActiveSection] = useState('likedPosts');

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

    const likedPosts = [
        {
            id: 1,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 2,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 3,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        },
        {
            id: 4,
            username: 'Username',
            timeAgo: 'Posted 1s ago',
            title: 'Document Title',
            tags: ['purple', 'red', 'orange', 'yellow']
        }
    ];


    return (
        <div className="liked-posts-container">
            <div className="liked-posts-backdrop"/>

            <div className="liked-posts-modal">
                <div className="liked-posts-layout">
                    {/* Left Sidebar */}
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
                    <div className="liked-posts-divider"></div>

                    {/* Right Content */}
                    <div className="liked-posts-content">
                        <div className="content-header">
                            <h2 className="content-title">Liked Posts</h2>
                            <button
                                className="close-button"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="posts-grid">
                            {likedPosts.map((post) => (
                                <div key={post.id} className="liked-post-card">
                                    {/* Post Header */}
                                    <div className="liked-post-header">
                                        <div className="post-user">
                                            <div className="user-avatar">C</div>
                                            <span className="username">{post.username}</span>
                                        </div>
                                        <button className="more-options">
                                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Document Preview */}
                                    <div className="document-preview">
                                        <div className="document-placeholder">
                                            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Post Footer */}
                                    <div className="liked-post-footer">
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
                                                <button className="action-btn liked">
                                                    <Heart size={18} fill="currentColor" />
                                                </button>
                                                <button className="action-btn">
                                                    <MessageCircle size={18} />
                                                </button>
                                            </div>
                                            <button className="action-btn">
                                                <Bookmark size={18} />
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
>>>>>>> Stashed changes

export default Liked;
