import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Send, User, ThumbsUp, ThumbsDown, Loader, Share2, FileText, Music } from 'lucide-react';
import { useSocket } from '../Context/SocketContext';
import '../styles/ResourceDetail.css';

const ResourceDetailPopup = ({ resourceId, onClose, userData }) => {
    const [resource, setResource] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const socket = useSocket();

    const SERVER_URL = 'https://campcon-test.onrender.com';

    // File type detection helpers
    const getFileExtension = (url) => {
        if (!url) return '';
        const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
        return match ? match[1].toLowerCase() : '';
    };

    const getFileType = (url) => {
        const ext = getFileExtension(url);
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
        const videoExts = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
        const audioExts = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
        const pdfExts = ['pdf'];

        if (imageExts.includes(ext)) return 'image';
        if (videoExts.includes(ext)) return 'video';
        if (audioExts.includes(ext)) return 'audio';
        if (pdfExts.includes(ext)) return 'pdf';
        return 'file';
    };

    const handleShareDownloadLink = async () => {
        if (resource?.fileUrl) {
            try {
                await navigator.clipboard.writeText(resource.fileUrl);
                alert('Download link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    useEffect(() => {
        if (resourceId) {
            fetchResourceDetails();
            fetchComments();

            if (socket) {
                socket.emit('joinResource', resourceId);

                socket.on('newComment', (comment) => {
                    setComments(prev => [...prev, comment]);
                });

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
        setIsCommentsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/comments/${resourceId}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setComments(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsCommentsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        const optimisticComment = {
            _id: `temp-${Date.now()}`,
            text: newComment,
            user: { username: userData?.username || 'You', profilePic: userData?.profileImage },
            createdAt: new Date().toISOString(),
            likes: 0,
            dislikes: 0
        };
        setComments(prev => [...prev, optimisticComment]);
        setNewComment('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/comments/${resourceId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: optimisticComment.text })
            });
            const data = await response.json();
            if (data.success) {
                setComments(prev => prev.map(c =>
                    c._id === optimisticComment._id ? data.data : c
                ));
            } else {
                setComments(prev => prev.filter(c => c._id !== optimisticComment._id));
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            setComments(prev => prev.filter(c => c._id !== optimisticComment._id));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLikeComment = async (commentId) => {
        if (String(commentId).startsWith('temp-')) return;

        setComments(prev => prev.map(c =>
            c._id === commentId ? { ...c, likes: (c.likes || 0) + 1, userLiked: true } : c
        ));

        try {
            const token = localStorage.getItem('token');
            await fetch(`${SERVER_URL}/api/comments/comments/${commentId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error liking comment:', error);
            setComments(prev => prev.map(c =>
                c._id === commentId ? { ...c, likes: (c.likes || 0) - 1, userLiked: false } : c
            ));
        }
    };

    const handleDislikeComment = async (commentId) => {
        if (String(commentId).startsWith('temp-')) return;

        setComments(prev => prev.map(c =>
            c._id === commentId ? { ...c, dislikes: (c.dislikes || 0) + 1, userDisliked: true } : c
        ));

        try {
            const token = localStorage.getItem('token');
            await fetch(`${SERVER_URL}/api/comments/comments/${commentId}/dislike`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error disliking comment:', error);
            setComments(prev => prev.map(c =>
                c._id === commentId ? { ...c, dislikes: (c.dislikes || 0) - 1, userDisliked: false } : c
            ));
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
                <div className="resource-detail-modal loading-modal">
                    <div className="modal-loader">
                        <Loader className="loader-spin" size={40} />
                        <span>Loading resource...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="resource-detail-overlay" onClick={onClose}>
            <div className="resource-detail-modal" onClick={(e) => e.stopPropagation()}>
                {/* CLOSE ICON: Size increased to 36 and stroke thickened */}
                <button className="close-btn" onClick={onClose}>
                    <X size={36} strokeWidth={3} />
                </button>

                <div className="resource-detail-content">
                    <div className="resource-preview-section">
                        {(() => {
                            const fileType = getFileType(resource?.fileUrl);
                            const fileUrl = resource?.fileUrl || resource?.imageUrl;

                            if (fileType === 'image' || resource?.imageUrl) {
                                return <img src={resource?.imageUrl || fileUrl} alt={resource?.title} className="resource-preview-image" />;
                            } else if (fileType === 'video') {
                                return <video controls className="resource-preview-video" src={fileUrl}>Your browser does not support video playback.</video>;
                            } else if (fileType === 'audio') {
                                return (
                                    <div className="resource-preview-audio">
                                        <Music size={48} />
                                        <audio controls src={fileUrl}>Your browser does not support audio playback.</audio>
                                    </div>
                                );
                            } else if (fileType === 'pdf') {
                                return (
                                    <div className="resource-preview-pdf">
                                        <iframe src={fileUrl} title={resource?.title} className="pdf-viewer" />
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="resource-preview-placeholder">
                                        <FileText size={64} />
                                        <span>{getFileExtension(fileUrl).toUpperCase() || 'FILE'}</span>
                                    </div>
                                );
                            }
                        })()}

                        <div className="resource-info">
                            <h2 className="resource-title">{resource?.title}</h2>
                            <p className="resource-uploader">Uploaded by <strong>@{resource?.uploader?.username || 'Unknown'}</strong></p>
                            {resource?.description && <p className="resource-description">{resource.description}</p>}
                            <div className="resource-tags">
                                {resource?.tags?.map((tag, index) => (
                                    <span key={index} className="resource-tag">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="resource-actions">
                            <button className="download-btn" onClick={handleDownload}>
                                <Download size={20} /> Download
                            </button>
                            <button className="share-btn" onClick={handleShareDownloadLink}>
                                <Share2 size={20} /> Share Link
                            </button>
                        </div>
                    </div>

                    <div className="comments-section">
                        <h3 className="comments-header">
                            <MessageCircle size={20} /> Comments ({comments.length})
                        </h3>

                        <div className="comments-list">
                            {isCommentsLoading ? (
                                <div className="comments-loader">
                                    <Loader className="loader-spin" size={24} />
                                    <span>Loading comments...</span>
                                </div>
                            ) : comments.length === 0 ? (
                                <p className="no-comments">No comments yet. Be the first to comment!</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={comment._id || index} className="comment-item">
                                        <div className="comment-avatar">
                                            {comment.user?.profilePic ? <img src={comment.user.profilePic} alt="" /> : <User size={20} />}
                                        </div>
                                        <div className="comment-body">
                                            <div className="comment-header">
                                                <span className="comment-username">@{comment.user?.username || 'Anonymous'}</span>
                                                <span className="comment-time">{formatTimeAgo(comment.createdAt)}</span>
                                            </div>
                                            <p className="comment-text">{comment.text}</p>
                                            <div className="comment-actions">
                                                <button className={`comment-action-btn ${comment.userLiked ? 'active' : ''}`} onClick={() => handleLikeComment(comment._id)}>
                                                    <ThumbsUp size={14} /> <span>{comment.likes || 0}</span>
                                                </button>
                                                <button className={`comment-action-btn ${comment.userDisliked ? 'active' : ''}`} onClick={() => handleDislikeComment(comment._id)}>
                                                    <ThumbsDown size={14} /> <span>{comment.dislikes || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

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
                                    {/* SEND ICON: Size increased to 30 to fill the circle better */}
                                    <Send size={30} strokeWidth={2.5} style={{ marginLeft: '-3px', marginTop: '2px' }} />
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