import express from 'express';
import passport from 'passport';
import { register, login, logout, getCurrentUser } from '../Controllers/users.js';
import jwt from "jsonwebtoken";

const router = express.Router();

// Regular registration and login
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
        session: false
    }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '90d' });

        // Redirect to client with token - use a proper page
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
);
// Logout (JWT stateless)
router.get('/logout', logout);

// Get the current user (protected with JWT)
router.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;