import express from "express";
import rateLimit from "express-rate-limit";
import { getAllSubscribers, getSubscriberCount, notifyLaunch, subscribe } from "../Controllers/subscription.js";
import { validateEmail } from "../Middleware/validation.js";

const router = express.Router();

// Rate limiting: 5 requests per hour per IP
const subscribeLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: {
        status: 'error',
        error: 'Too many subscription requests. Please try again in an hour.'
    }
});

// Subscribe users to our waitlist
router.post('/', subscribeLimiter, validateEmail, subscribe);

// Get subscriber count
router.get('/count', getSubscriberCount);

// Get all subscribers with their data
router.get('/all', getAllSubscribers);

// Notify all subscribers about launch
router.post('/notify-launch', notifyLaunch);

export default router;