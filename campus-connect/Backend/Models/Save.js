import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
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
})

saveSchema.index({ user: 1, resource: 1 }, { unique: true });

const Save = mongoose.model('Save', saveSchema);

export default Save;