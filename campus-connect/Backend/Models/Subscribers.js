import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    notified: {
        type: Boolean,
        default: false,
    },
    notifiedAt: {
        type: Date,
    },
});

subscriberSchema.index({ email: 1, subscribedAt: 1, notified: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;