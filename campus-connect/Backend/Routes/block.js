import express from 'express';
import { blockUser, unblockUser, getBlockedUsers } from '../Controllers/block.js';
import { isAuthenticated } from '../Middleware/auth.js';

const router = express.Router();

// Block a user
router.post('/:userId/block', isAuthenticated, blockUser);

// Unblock a user
router.delete('/:userId/unblock', isAuthenticated, unblockUser);

// Get blocked users list
router.get('/blocked', isAuthenticated, getBlockedUsers);

export default router;
