import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'campus-connect', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'mp4', 'mov', 'mp3', 'wav', 'zip', 'rar'],
        resource_type: 'auto', // Automatically detect image, video, or raw file
    },
});

// File filter (optional, but good for security)
const fileFilter = (req, file, cb) => {
    // You can add more specific logic here if needed, consistent with previous multerConfig.js
    // For now, relying on Cloudinary's allowed_formats or accepting all passed by CloudinaryStorage
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Increase limit to 50MB for videos/large files if needed, Cloudinary handles large files well
});

export default upload;
