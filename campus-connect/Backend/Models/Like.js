import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

likeSchema.index({ user: 1, resource: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;