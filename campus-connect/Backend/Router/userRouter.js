import express from 'express';
import { getProfile, updateProfile, createProfile } from '../Controllers/users.js';
import { isAuthenticated } from '../Middleware/Auth.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

// Get profile
router.get('/profile', isAuthenticated, getProfile);

// Create a profile (new endpoint)
router.post('/profile', isAuthenticated, upload.single('profilePic'), createProfile);

// Update profile (with optional file upload)
router.put('/profile', isAuthenticated, upload.single('profilePic'), updateProfile);

export default router;