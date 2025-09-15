import React, { useState, useRef } from 'react';
import { X, Image, FileText, Plus } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import '../styles/CreatePost.css';

const Create = () => {
    const [documentTitle, setDocumentTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileRef = useRef(null);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/home'); // or wherever you want to go back to
    };


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

        setIsLoading(true);
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
                }, 2000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
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

    return (
        <div className="container">
            {/* Backdrop */}
            <div className="backdrop" />

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
                    <button onClick={handleClose} className="close-button">
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
                        <button className="media-button" onClick={() => imageRef.current.click()}>
                            <Image />
                        </button>
                        <button className="media-button" onClick={() => fileRef.current.click()}>
                            <FileText />
                        </button>
                    </div>

                    {/* Hidden File Inputs */}
                    <input
                        type="file"
                        ref={imageRef}
                        style={{ display: 'none' }}
                        onChange={handleImageSelect}
                        accept="image/*"
                    />
                    <input
                        type="file"
                        ref={fileRef}
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />

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



// import React, { useState, useRef } from 'react';
// import { X, Image, FileText, Plus } from 'lucide-react';
// import '../styles/CreatePost.css';
//
// const Create = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [documentTitle, setDocumentTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [filters, setFilters] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const fileRef = useRef(null);
//     const imageRef = useRef(null);
//
//     const handleFileSelect = (e) => {
//         if (e.target.files[0]) {
//             setSelectedFile(e.target.files[0]);
//         }
//     };
//
//     const handleImageSelect = (e) => {
//         if (e.target.files[0]) {
//             setSelectedImage(e.target.files[0]);
//         }
//     };
//
//     const handlePost = async () => {
//         const token = localStorage.getItem('token'); // Assuming token is stored here after login
//         if (!token) {
//             alert('You must be logged in to create a post. Please log in.');
//             return;
//         }
//
//         if (!documentTitle.trim() || !selectedFile) {
//             alert('Please enter a document title and select a file');
//             return;
//         }
//
//         setIsLoading(true);
//         try {
//             const formData = new FormData();
//             formData.append('title', documentTitle);
//             formData.append('description', description);
//             formData.append('subject', 'General'); // Replace with dynamic input if needed
//             formData.append('gradeLevel', 'All'); // Replace with dynamic input if needed
//             formData.append('resourceType', 'document');
//             filters.forEach((filter) => {
//                 formData.append('tags[]', filter);
//             });
//             formData.append('file', selectedFile);
//             if (selectedImage) {
//                 formData.append('image', selectedImage);
//             }
//
//             const response = await fetch('https://campcon-test.onrender.com/api/resources', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Add auth token here
//                 },
//                 body: formData,
//             });
//
//             if (response.ok) {
//                 setShowSuccess(true);
//                 setTimeout(() => {
//                     setShowSuccess(false);
//                     setIsOpen(false);
//                     setDocumentTitle('');
//                     setDescription('');
//                     setFilters([]);
//                     setSelectedFile(null);
//                     setSelectedImage(null);
//                 }, 2000);
//             } else {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to create post');
//             }
//         } catch (error) {
//             alert('Error creating post: ' + error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const addFilter = () => {
//         const filterName = prompt('Enter filter name:');
//         if (filterName && filterName.trim()) {
//             setFilters([...filters, filterName.trim()]);
//         }
//     };
//
//     const removeFilter = (index) => {
//         setFilters(filters.filter((_, i) => i !== index));
//     };
//
//     if (!isOpen) {
//         return (
//             <div className="container">
//                 <button
//                     onClick={() => setIsOpen(true)}
//                     className="open-button"
//                 >
//                     Create Document Post
//                 </button>
//             </div>
//         );
//     }
//
//     return (
//         <div className="container">
//             {/* Backdrop */}
//             <div className="backdrop" onClick={() => setIsOpen(false)} />
//
//             {/* Popup */}
//             <div className="popup">
//                 {/* Header */}
//                 <div className="header">
//                     <div className="user-info">
//                         <div className="avatar">
//                             <div className="avatar-inner">
//                                 <div className="avatar-x1" />
//                                 <div className="avatar-x2" />
//                             </div>
//                         </div>
//                         <div className="username">
//                             <span>@username</span>
//                             <svg className="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="close-button"
//                     >
//                         <X />
//                     </button>
//                 </div>
//
//                 {/* Content */}
//                 <div className="content">
//                     {/* Document Title */}
//                     <div className="title-section">
//                         <h3>Document Title:</h3>
//                         <textarea
//                             value={documentTitle}
//                             onChange={(e) => setDocumentTitle(e.target.value)}
//                             placeholder="Type the Document Title"
//                             className="title-input"
//                             maxLength={500}
//                         />
//                     </div>
//
//                     {/* Description */}
//                     <div className="title-section">
//                         <h3>Description:</h3>
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             placeholder="Type the description (optional)"
//                             className="title-input"
//                             maxLength={1000}
//                         />
//                     </div>
//
//                     {/* Filters Section */}
//                     <div className="filters-section">
//                         <button
//                             onClick={addFilter}
//                             className="add-filter-button"
//                         >
//                             <Plus />
//                             Add Filters
//                         </button>
//
//                         {filters.length > 0 && (
//                             <div className="filters-container">
//                                 {filters.map((filter, index) => (
//                                     <span
//                                         key={index}
//                                         className="filter-tag"
//                                     >
//                                         {filter}
//                                         <button
//                                             onClick={() => removeFilter(index)}
//                                             className="filter-remove"
//                                         >
//                                             <X />
//                                         </button>
//                                     </span>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Media Icons */}
//                     <div className="media-icons">
//                         <button className="media-button" onClick={() => imageRef.current.click()}>
//                             <Image />
//                         </button>
//                         <button className="media-button" onClick={() => fileRef.current.click()}>
//                             <FileText />
//                         </button>
//                     </div>
//
//                     {/* Hidden File Inputs */}
//                     <input
//                         type="file"
//                         ref={imageRef}
//                         style={{ display: 'none' }}
//                         onChange={handleImageSelect}
//                         accept="image/*"
//                     />
//                     <input
//                         type="file"
//                         ref={fileRef}
//                         style={{ display: 'none' }}
//                         onChange={handleFileSelect}
//                     />
//
//                     {/* Post Button */}
//                     <div className="post-section">
//                         <button
//                             onClick={handlePost}
//                             disabled={isLoading || !documentTitle.trim()}
//                             className="post-button"
//                         >
//                             {isLoading ? (
//                                 <div className="loading-spinner" />
//                             ) : (
//                                 'Post'
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Success Message */}
//             {showSuccess && (
//                 <div className="success-message">
//                     Document posted successfully!
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Create;
