import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'campus-connect',
        allowed_formats: [
            // Images
            'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico', 'tiff',
            // Documents
            'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'csv',
            // Presentations
            'ppt', 'pptx', 'odp',
            // Videos
            'mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv',
            // Audio
            'mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a',
            // Archives
            'zip', 'rar', '7z', 'tar', 'gz'
        ],
        resource_type: 'auto',
    },
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for larger videos
});

export default upload;

