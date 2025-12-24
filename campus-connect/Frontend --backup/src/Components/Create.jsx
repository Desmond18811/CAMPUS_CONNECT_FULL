import React, { useState, useRef } from 'react';
import { X, Plus, Image as ImageIcon, FileText } from 'lucide-react';
import '../styles/CreatePost.css';

const Create = ({ onClose, userData }) => {
    const [documentTitle, setDocumentTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filters, setFilters] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        if (e.target.files[0]) setSelectedFile(e.target.files[0]);
    };

    const handleImageSelect = (e) => {
        if (e.target.files[0]) setSelectedImage(e.target.files[0]);
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
            formData.append('username', userData.username);
            formData.append('profileColor', userData.profileColor);
            if (userData.profileImage) formData.append('profilePic', userData.profileImage);
            if (selectedFile) formData.append('file', selectedFile);
            if (selectedImage) formData.append('image', selectedImage);
            filters.forEach((filter) => formData.append('tags[]', filter));

            // Log FormData contents
            const formDataEntries = {};
            for (const [key, value] of formData.entries()) {
                formDataEntries[key] = value instanceof File ? { name: value.name, size: value.size, type: value.type } : value;
            }
            console.log('FormData:', formDataEntries);

            const response = await fetch('https://campcon-test.onrender.com/api/resources', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (response.ok) {
                const data = JSON.parse(responseText);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setDocumentTitle('');
                    setDescription('');
                    setFilters([]);
                    setSelectedFile(null);
                    setSelectedImage(null);
                    onClose();
                }, 2000);
            } else {
                let errorData;
                try {
                    errorData = JSON.parse(responseText);
                } catch {
                    errorData = { message: 'Server returned non-JSON response' };
                }
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating post:', { message: error.message, stack: error.stack });
            alert(`Error creating post: ${error.message}`);
        } finally {
            setIsLoadingPost(false);
        }
    };

    const addFilter = () => {
        const filterName = prompt('Enter filter name:');
        if (filterName?.trim()) setFilters([...filters, filterName.trim()]);
    };

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    return (
        <div className="settings-container">
            <div className="settings-backdrop" onClick={onClose} />
            <div className="settings-modal">
                <div className="header">
                    <div className="user-info">
                        <div className="avatar" style={{ backgroundColor: '#f3f4f6' }}>
                            {userData.profileImage ? (
                                <img
                                    src={typeof userData.profileImage === 'string' ? userData.profileImage : URL.createObjectURL(userData.profileImage)}
                                    alt="Profile"
                                    className="profile-image-large"
                                />
                            ) : (
                                <div
                                    className="avatar-inner"
                                    style={{
                                        backgroundColor: userData.profileColor,
                                        color: 'white',
                                        fontSize: '14px',
                                    }}
                                >
                                    {userData.username.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        <div className="username">
                            <span>@{userData.username || 'username'}</span>
                            <svg
                                className="dropdown-icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <button onClick={onClose} className="close-button">
                        <X />
                    </button>
                </div>

                <div className="content">
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

                    <div className="title-section">
                        <h3>Description:</h3>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Type the description (optional). Tag users with @username"
                            className="title-input"
                            maxLength={1000}
                        />
                    </div>

                    <div className="filters-section">
                        <button onClick={addFilter} className="add-filter-button">
                            <Plus /> Add Filters
                        </button>
                        {filters.length > 0 && (
                            <div className="filters-container">
                                {filters.map((filter, index) => (
                                    <span key={index} className="filter-tag">
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

                    <div className="media-icons">
                        <input
                            type="file"
                            ref={imageInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageSelect}
                            accept="image/*"
                        />
                        <button
                            className="media-button"
                            onClick={() => imageInputRef.current.click()}
                        >
                            <ImageIcon />
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                            accept=".jpeg,.jpg,.png,.gif,.webp,.bmp,.pdf,.doc,.docx,.txt,.rtf,.odt,.ppt,.pptx,.xls,.xlsx,.csv,.mp4,.mov,.avi,.mp3,.wav,.zip,.rar"
                        />
                        <button
                            className="media-button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FileText />
                        </button>
                    </div>

                    <div className="post-section">
                        <button
                            onClick={handlePost}
                            disabled={isLoadingPost || !documentTitle.trim()}
                            className="post-button"
                        >
                            {isLoadingPost ? <div className="loading-spinner" /> : 'Post'}
                        </button>
                    </div>
                </div>

                {showSuccess && (
                    <div className="success-message">Document posted successfully!</div>
                )}
            </div>
        </div>
    );
};

export default Create;