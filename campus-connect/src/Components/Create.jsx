import React, { useState } from 'react';
import { X, Plus, Image, FileText } from 'lucide-react';
import '../styles/CreatePost.css';
import {useNavigate} from "react-router-dom";

const Create = ({ onClose }) => {
    const navigate = useNavigate();
    const [documentTitle, setDocumentTitle] = useState('');
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePost = async () => {
        if (!documentTitle.trim()) {
            alert('Please enter a document title');
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setDocumentTitle('');
                setFilters([]);
                setSelectedFile(null);
                setSelectedImage(null);
                if (onClose) onClose();
            }, 2000);
        } catch (error) {
            alert('Error creating document: ' + error.message);
        } finally {
            setIsLoading(false);
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

    const handleImageSelect = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage(null);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="create-document-container">
            {/* Backdrop */}
            <div className="create-backdrop" onClick={onClose} />

            {/* Main Modal */}
            <div className="create-modal">
                {/* Header */}
                <div className="create-header">
                    <div className="user-info">
                        <div className="user-avatar">
                            <div className="avatar-inner">
                                <div className="avatar-x1" />
                                <div className="avatar-x2" />
                            </div>
                        </div>
                        <div className="username-section">
                            <span className="username">@username</span>
                            <svg className="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="close-button"
                    >
                        <X />
                    </button>
                </div>

                {/* Content */}
                <div className="create-content">
                    {/* Document Title Section */}
                    <div className="title-section">
                        <h3 className="section-title">Document Title:</h3>
                        <textarea
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder="Type the Document Title"
                            className="title-textarea"
                            rows={6}
                            maxLength={500}
                        />
                        <div className="char-count">{documentTitle.length}/500</div>
                    </div>

                    {/* Add Filters Section */}
                    <div className="filters-section">
                        <button
                            onClick={addFilter}
                            className="add-filters-btn"
                        >
                            <Plus className="plus-icon" />
                            Add Filters
                        </button>

                        {filters.length > 0 && (
                            <div className="filters-list">
                                {filters.map((filter, index) => (
                                    <span
                                        key={index}
                                        className="filter-tag"
                                    >
                                        {filter}
                                        <button
                                            onClick={() => removeFilter(index)}
                                            className="remove-filter-btn"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Media Section with previews */}
                    <div className="media-preview-section">
                        {selectedImage && (
                            <div className="media-preview">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    className="image-preview"
                                />
                                <button onClick={removeSelectedImage} className="remove-media-btn">
                                    <X size={16} />
                                </button>
                                <span className="media-type-tag">Image</span>
                            </div>
                        )}

                        {selectedFile && (
                            <div className="media-preview">
                                <div className="file-preview">
                                    <FileText size={32} />
                                    <span className="file-name">{selectedFile.name}</span>
                                </div>
                                <button onClick={removeSelectedFile} className="remove-media-btn">
                                    <X size={16} />
                                </button>
                                <span className="media-type-tag">Document</span>
                            </div>
                        )}
                    </div>

                    {/* Media Icons */}
                    <div className="media-section">
                        <input
                            type="file"
                            id="image-input"
                            style={{ display: 'none' }}
                            onChange={handleImageSelect}
                            accept="image/*"
                        />
                        <label htmlFor="image-input" className="media-btn">
                            <Image size={24} />
                            <span>Add Image</span>
                        </label>

                        <input
                            type="file"
                            id="file-input"
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                        />
                        <label htmlFor="file-input" className="media-btn">
                            <FileText size={24} />
                            <span>Add File</span>
                        </label>
                    </div>

                    {/* Post Button */}
                    <div className="post-section">
                        <button
                            onClick={handlePost}
                            disabled={isLoading || !documentTitle.trim()}
                            className="post-btn"
                        >
                            {isLoading ? (
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
                <div className="success-toast">
                    Document posted successfully!
                </div>
            )}
        </div>
    );
};

export default Create;