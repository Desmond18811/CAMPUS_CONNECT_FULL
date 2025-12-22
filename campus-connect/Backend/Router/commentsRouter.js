import express from 'express';
import {isAuthenticated} from "../Middleware/Auth.js";
import {createComment, deleteComment, getComments, likeComment, updateComment} from "../Controllers/comments.js";

const router = express.Router();

router.get('/:resourceId/comments', isAuthenticated, getComments);
router.post('/:resourceId/comments', isAuthenticated, createComment);
router.put('/comments/:commentId', isAuthenticated, updateComment);
router.delete('/comments/:commentId', isAuthenticated, deleteComment);
router.post('/comments/:commentId/like', isAuthenticated, likeComment);

export default router;