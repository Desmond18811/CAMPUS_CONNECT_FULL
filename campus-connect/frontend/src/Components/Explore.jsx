import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ArrowLeft,
    Heart,
    MessageCircle,
    Grid,
    List,
    Loader
} from 'lucide-react';
import '../styles/Explore.css';

const Explore = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();
    const SERVER_URL = 'https://campcon-test.onrender.com';

    const categories = [
        { id: 'all', label: 'All', emoji: '📚' },
        { id: 'notes', label: 'Notes', emoji: '📝' },
        { id: 'slides', label: 'Slides', emoji: '📊' },
        { id: 'videos', label: 'Videos', emoji: '🎥' },
        { id: 'documents', label: 'Documents', emoji: '📄' },
        { id: 'images', label: 'Images', emoji: '🖼️' },
    ];

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        filterResources();
    }, [searchQuery, selectedCategory, resources]);

    const fetchResources = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${SERVER_URL}/api/resources`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setResources(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterResources = () => {
        let filtered = [...resources];
        if (searchQuery.trim()) {
            filtered = filtered.filter(r =>
                r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(r => {
                const fileType = r.fileType?.toLowerCase() || '';
                switch (selectedCategory) {
                    case 'notes':
                        return fileType.includes('note') || r.tags?.includes('notes');
                    case 'slides':
                        return fileType.includes('ppt') || r.tags?.includes('slides');
                    case 'videos':
                        return fileType.includes('mp4') || fileType.includes('video');
                    case 'documents':
                        return fileType.includes('pdf') || fileType.includes('doc');
                    case 'images':
                        return fileType.includes('jpg') || fileType.includes('png') || fileType.includes('jpeg');
                    default:
                        return true;
                }
            });
        }
        setFilteredResources(filtered);
    };

    const getFullUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `${SERVER_URL}${url}`;
    };

    return (
        <div className="explore-page">
            <div className="explore-header">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Explore Resources</h1>
            </div>
            <div className="explore-search">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search resources, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="explore-categories">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        <span className="cat-emoji">{cat.emoji}</span>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>
            <div className="explore-toolbar">
                <p className="results-count">{filteredResources.length} resources found</p>
                <div className="view-toggle">
                    <button
                        className={viewMode === 'grid' ? 'active' : ''}
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        className={viewMode === 'list' ? 'active' : ''}
                        onClick={() => setViewMode('list')}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="explore-loader">
                    <Loader className="loader-spin" size={32} />
                    <span>Loading resources...</span>
                </div>
            ) : (
                <div className={`explore-resources ${viewMode}`}>
                    {filteredResources.length === 0 ? (
                        <div className="no-resources">
                            <p>No resources found</p>
                        </div>
                    ) : (
                        filteredResources.map(resource => (
                            <div
                                key={resource._id}
                                className="resource-card"
                                onClick={() => navigate(`/home`)}
                            >
                                <div className="resource-thumbnail">
                                    {resource.imageUrl ? (
                                        <img src={getFullUrl(resource.imageUrl)} alt={resource.title} />
                                    ) : (
                                        <div className="thumbnail-placeholder">
                                            📄
                                        </div>
                                    )}
                                </div>
                                <div className="resource-info">
                                    <h3>{resource.title}</h3>
                                    <p className="resource-author">
                                        by @{resource.uploader?.username || 'Unknown'}
                                    </p>
                                    <div className="resource-stats">
                                        <span><Heart size={14} /> {resource.likeCount || 0}</span>
                                        <span><MessageCircle size={14} /> {resource.commentCount || 0}</span>
                                    </div>
                                    <div className="resource-tags">
                                        {resource.tags?.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Explore;
