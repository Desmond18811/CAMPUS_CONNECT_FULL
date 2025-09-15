import React, { useState } from 'react';
import { X, Image, FileText, Plus } from 'lucide-react';
import '../styles/CreatePost.css';

const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [documentTitle, setDocumentTitle] = useState('');
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePost = async () => {
        if (!documentTitle.trim()) {
            alert('Please enter a document title');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('https://campcon-test.onrender.com/api/resources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: documentTitle,
                    filters: filters,
                    type: 'document'
                }),
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setIsOpen(false);
                    setDocumentTitle('');
                    setFilters([]);
                }, 2000);
            } else {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            alert('Error creating post: ' + error.message);
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

    if (!isOpen) {
        return (
            <div className="container">
                <button
                    onClick={() => setIsOpen(true)}
                    className="open-button"
                >
                    Create Document Post
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Backdrop */}
            <div className="backdrop" onClick={() => setIsOpen(false)} />

            {/* Popup */}
            <div className="popup">
                {/* Header */}
                <div className="header">
                    <div className="user-info">
                        <div className="avatar">
                            <div className="avatar-inner">
                                <div className="avatar-x1" />
                                <div className="avatar-x2" />
                            </div>
                        </div>
                        <div className="username">
                            <span>@username</span>
                            <svg className="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="close-button"
                    >
                        <X />
                    </button>
                </div>

                {/* Content */}
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
                        <button className="media-button">
                            <Image />
                        </button>
                        <button className="media-button">
                            <FileText />
                        </button>
                    </div>

                    {/* Post Button */}
                    <div className="post-section">
                        <button
                            onClick={handlePost}
                            disabled={isLoading || !documentTitle.trim()}
                            className="post-button"
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
                <div className="success-message">
                    Document posted successfully!
                </div>
            )}
        </div>
    );
};

export default Create;