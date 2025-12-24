import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    fileUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    fileType: {
        type: String,
        default: ''
    },
    tags: [{
        type: String
    }],
    taggedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePic: {
        type: String
    },
    profileColor: {
        type: String,
        default: '#cc002e'
    },
    subject: {
        type: String,
        required: true
    },
    gradeLevel: {
        type: String,
        required: true
    },
    resourceType: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;