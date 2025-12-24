import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password not required if using Google OAuth
        },
        minlength: [6, 'Password must be at least 8 characters'] // Added basic validation
    },
    googleId: {
        type: String,
        sparse: true // Allows multiple null values but enforces uniqueness for non-null
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    school: {
        type: String,
        required: true
    },
    gradeLevel: { // New field for "Change Level"
        type: String,
        required: false // Optional; make required if needed
    },
    bio: { // New field for "Bio"
        type: String,
        default: '',
        maxlength: 500 // Optional limit to prevent overly long bios
    },
    profilePic: { // New field for profile picture URL
        type: String,
        default: '' // Can set a default placeholder URL if desired, e.g., '/default-avatar.png'
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.add({
    likedResources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    savedResources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;