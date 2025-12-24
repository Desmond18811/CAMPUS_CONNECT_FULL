import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 500
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    taggedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    },
})

commentSchema.index({ resource: 1, createdAt: -1 });
commentSchema.index({ user: 1, resource: 1 });

commentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;