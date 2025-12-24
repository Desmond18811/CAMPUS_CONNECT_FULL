import React, { useState, useEffect } from 'react';
import { X, Download, Heart, Bookmark, MessageCircle, Send, User } from 'lucide-react';
import { useSocket } from '../Context/SocketContext';
import '../styles/ResourceDetail.css';

const ResourceDetailPopup = ({ resourceId, onClose, userData }) => {
    const [resource, setResource] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const socket = useSocket();

    const SERVER_URL = 'https://campcon-test.onrender.com';

    useEffect(() => {
        if (resourceId) {
            fetchResourceDetails();
            fetchComments();

            // Join resource room for real-time updates
            if (socket) {
                socket.emit('joinResource', resourceId);

                // Listen for new comments
                socket.on('newComment', (comment) => {
                    setComments(prev => [...prev, comment]);
                });

                // Listen for comment updates
                socket.on('commentUpdated', (updatedComment) => {
                    setComments(prev => prev.map(c =>
                        c._id === updatedComment._id ? updatedComment : c
                    ));
                });

                return () => {
                    socket.emit('leaveResource', resourceId);
                    socket.off('newComment');
                    socket.off('commentUpdated');
                };
            }
        }
    }, [resourceId, socket]);

    const fetchResourceDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setResource(data.data);
            }
        } catch (error) {
            console.error('Error fetching resource:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setComments(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/resources/${resourceId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newComment })
            });
            const data = await response.json();
            if (data.success) {
                setNewComment('');
                // Socket will broadcast the new comment
                if (!socket) {
                    setComments(prev => [...prev, data.data]);
                }
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setIsSubmitting(false);
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

    if (isLoading) {
        return (
            <div className="resource-detail-overlay">
                <div className="resource-detail-modal">
                    <div className="loading-spinner">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="resource-detail-overlay" onClick={onClose}>
            <div className="resource-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="resource-detail-content">
                    {/* Resource Preview Section */}
                    <div className="resource-preview-section">
                        {resource?.imageUrl ? (
                            <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="resource-preview-image"
                            />
                        ) : (
                            <div className="resource-preview-placeholder">
                                <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        )}

                        <div className="resource-info">
                            <h2 className="resource-title">{resource?.title}</h2>
                            <p className="resource-uploader">
                                Uploaded by <strong>@{resource?.uploader?.username || 'Unknown'}</strong>
                            </p>
                            {resource?.description && (
                                <p className="resource-description">{resource.description}</p>
                            )}
                            <div className="resource-tags">
                                {resource?.tags?.map((tag, index) => (
                                    <span key={index} className="resource-tag">#{tag}</span>
                                ))}
                            </div>
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

                        <div className="comments-list">
                            {comments.length === 0 ? (
                                <p className="no-comments">No comments yet. Be the first to comment!</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={comment._id || index} className="comment-item">
                                        <div className="comment-avatar">
                                            {comment.user?.profilePic ? (
                                                <img src={comment.user.profilePic} alt="" />
                                            ) : (
                                                <User size={20} />
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
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

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
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetailPopup;
