import React, { useState, useEffect } from 'react';
import { X, Download, Heart, Bookmark, MessageCircle, Send, ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import '../styles/ResourceDetail.css';

// Generate consistent random color from username
const generateAvatarColor = (username) => {
    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
        '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
        '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
        '#ec4899', '#f43f5e'
    ];
    if (!username) return colors[0];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const ResourceDetailPopup = ({ resource, onClose, onLike, onSave }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const SERVER_URL = 'https://campcon-test.onrender.com';

    useEffect(() => {
        if (resource?.id) {
            fetchComments();
        }
    }, [resource?.id]);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/${resource.id}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setComments(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        const tempComment = {
            _id: `temp-${Date.now()}`,
            text: newComment,
            user: { username: 'You', profileColor: generateAvatarColor('You') },
            createdAt: new Date().toISOString(),
            likes: [],
            dislikes: []
        };

        // Optimistic update
        setComments(prev => [tempComment, ...prev]);
        setNewComment('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/${resource.id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: tempComment.text })
            });
            const data = await response.json();
            if (data.success) {
                // Replace temp comment with real one
                setComments(prev => prev.map(c =>
                    c._id === tempComment._id ? data.data : c
                ));
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            // Remove temp comment on error
            setComments(prev => prev.filter(c => c._id !== tempComment._id));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLikeComment = async (commentId) => {
        // Optimistic update
        setComments(prev => prev.map(c => {
            if (c._id === commentId) {
                const newLikes = [...(c.likes || [])];
                newLikes.push('user');
                return { ...c, likes: newLikes };
            }
            return c;
        }));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/comments/${commentId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setComments(prev => prev.map(c =>
                    c._id === commentId ? { ...c, likes: Array(data.likes).fill(null), dislikes: Array(data.dislikes || 0).fill(null) } : c
                ));
            }
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleDislikeComment = async (commentId) => {
        // Optimistic update
        setComments(prev => prev.map(c => {
            if (c._id === commentId) {
                const newDislikes = [...(c.dislikes || [])];
                newDislikes.push('user');
                return { ...c, dislikes: newDislikes };
            }
            return c;
        }));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/comments/${commentId}/dislike`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setComments(prev => prev.map(c =>
                    c._id === commentId ? { ...c, likes: Array(data.likes).fill(null), dislikes: Array(data.dislikes).fill(null) } : c
                ));
            }
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    };

    const handleDownload = () => {
        if (resource?.fileUrl) {
            window.open(resource.fileUrl, '_blank');
        }
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return past.toLocaleDateString();
    };

    if (!resource) return null;

    return (
        <div className="resource-detail-overlay" onClick={onClose}>
            <div className="resource-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="resource-detail-content">
                    {/* Resource Preview Section */}
                    <div className="resource-preview-section">
                        <div className="resource-thumbnail">
                            {resource.imageUrl ? (
                                <img
                                    src={resource.imageUrl}
                                    alt={resource.title}
                                    className="resource-preview-image"
                                />
                            ) : (
                                <div className="resource-preview-placeholder">
                                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="resource-info">
                            <h2 className="resource-title">{resource.title}</h2>
                            <p className="resource-uploader">
                                Uploaded by <strong>@{resource.username || 'Unknown'}</strong>
                            </p>
                            <div className="resource-tags">
                                {resource.tags?.map((tag, index) => (
                                    <span key={index} className="resource-tag">#{tag}</span>
                                ))}
                            </div>
                            <div className="resource-meta">
                                <span className="meta-item">{resource.timeAgo}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="resource-actions">
                            <button
                                className={`action-btn ${resource.liked ? 'active' : ''}`}
                                onClick={() => onLike && onLike(resource.id)}
                            >
                                <Heart size={20} fill={resource.liked ? '#ff0000' : 'none'} color={resource.liked ? '#ff0000' : '#666'} />
                                <span>{resource.likeCount || 0}</span>
                            </button>
                            <button
                                className={`action-btn ${resource.saved ? 'active' : ''}`}
                                onClick={() => onSave && onSave(resource.id)}
                            >
                                <Bookmark size={20} fill={resource.saved ? '#000' : 'none'} color={resource.saved ? '#000' : '#666'} />
                            </button>
                        </div>

                        {/* Download Button */}
                        <button className="download-btn" onClick={handleDownload}>
                            <Download size={20} />
                            Download File
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <h3 className="comments-header">
                            <MessageCircle size={20} />
                            Comments ({comments.length})
                        </h3>

                        {/* Comment Input */}
                        <form className="comment-input-form" onSubmit={handleSubmitComment}>
                            <div className="comment-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    disabled={!newComment.trim() || isSubmitting}
                                    className="send-btn"
                                >
                                    {isSubmitting ? (
                                        <Loader size={16} className="spin" />
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            <span>Send</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="comments-list">
                            {isLoading ? (
                                <div className="comments-loader">
                                    <div className="loader-spinner"></div>
                                    <span>Loading comments...</span>
                                </div>
                            ) : comments.length === 0 ? (
                                <p className="no-comments">No comments yet. Be the first to comment!</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment._id} className="comment-item">
                                        <div className="comment-avatar">
                                            {comment.user?.profilePic ? (
                                                <img src={`${SERVER_URL}${comment.user.profilePic}`} alt="" />
                                            ) : (
                                                <div
                                                    className="avatar-placeholder"
                                                    style={{ backgroundColor: comment.user?.profileColor || generateAvatarColor(comment.user?.username) }}
                                                >
                                                    {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="comment-body">
                                            <div className="comment-header">
                                                <span className="comment-username">
                                                    @{comment.user?.username || 'Anonymous'}
                                                </span>
                                                <span className="comment-time">
                                                    {formatTimeAgo(comment.createdAt)}
                                                </span>
                                            </div>
                                            <p className="comment-text">{comment.text}</p>
                                            <div className="comment-actions">
                                                <button
                                                    className="comment-action-btn"
                                                    onClick={() => handleLikeComment(comment._id)}
                                                >
                                                    <ThumbsUp size={14} />
                                                    <span>{comment.likes?.length || 0}</span>
                                                </button>
                                                <button
                                                    className="comment-action-btn"
                                                    onClick={() => handleDislikeComment(comment._id)}
                                                >
                                                    <ThumbsDown size={14} />
                                                    <span>{comment.dislikes?.length || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetailPopup;

