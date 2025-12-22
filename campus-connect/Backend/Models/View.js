import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
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
    lastViewedAt: {
        type: Date,
        default: Date.now
    }
})

viewSchema.index({ user: 1, resource: 1 }, { unique: true });

const View = mongoose.model('View', viewSchema);

export default View;