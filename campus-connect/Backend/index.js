import express from 'express';
import connectDb from './Database/db.js';
import dotenv from 'dotenv';
import subscriptionRouter from "./Router/subscriptionRouter.js";
import authRouter from "./Router/authRouter.js";
import resourcesRouter from "./Router/resourcesRouter.js";
import userRouter from "./Router/userRouter.js";
import cors from 'cors';
import passport from "./Database/passport.js";
import notificationRouter from "./Router/notificationRouter.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from "multer";
import commentsRouter from "./Router/commentsRouter.js";
import http from 'http';
import { initSocket } from './Socket.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

const PORT = process.env.PORT || 3000;

// Cloudinary is used for storage, no local uploads needed


// Add CORS middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'https://campcon-test.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach Socket.io to request object
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Initialize Passport
app.use(passport.initialize());

// Mount routes
app.use('/api/subscribe', subscriptionRouter);
app.use('/api/auth', authRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/users', userRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/comments', commentsRouter)

// Root endpoint
app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        statusCode: 200,
        message: 'Hello welcome to Campus Connect 🟢',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`
        });
    }
    res.status(500).json({
        success: false,
        message: `Server error: ${err.message || 'Internal Server Error'}`
    });
});

// Connect to MongoDB and start server
connectDb().then(() => {
    server.listen(PORT, () => {
        console.log(`🟢 Listening on port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to DB:', err);
});