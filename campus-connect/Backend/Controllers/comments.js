import Comment from "../Models/Comment.js";
import Resource from "../Models/Resource.js";
import User from "../Models/User.js";
import Notification from "../Models/Notification.js";

export const getComments = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const { page = 1, limit = 20, parentId } = req.query

        const filter = { resource: resourceId };
        if (parentId) {
            filter.parentId = parentId;
        }
        const comments = await Comment.find(filter)
            .populate('user', 'username profilePic profileColor')
            .populate('taggedUsers', 'username profilePic profileColor')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Comment.countDocuments(filter);
        const commentsWithReplies = await Promise.all(comments.map(async (comment) => {
            const replyCount = await Comment.countDocuments({ parent: comment._id });
            return {
                ...comment._doc,
                replyCount
            };
        }));

        res.json({
            success: true,
            data: commentsWithReplies,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            statusCode: 'error',
            message: error.message,
        })
    }
}

export const createComment = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const { text, parentId } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const resource = await Resource.findById(resourceId).populate('uploader', 'username');
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        let parentComment = null;
        if (parentId) {
            parentComment = await Comment.findById(parentId);
            if (!parentComment || parentComment.resource.toString() !== resourceId) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent comment not found or does not belong to this resource'
                });
            }
        }

        // Parse @username tags
        const tagMatches = text.match(/@(\w+)/g) || [];
        const taggedUsernames = tagMatches.map(tag => tag.slice(1).toLowerCase());
        const foundUsers = await User.find({ username: { $in: taggedUsernames } }).select('_id');
        const validTaggedUsers = foundUsers.map(user => user._id);

        const newComment = await Comment.create({
            user: userId,
            resource: resourceId,
            text,
            parent: parentId || undefined,
            taggedUsers: validTaggedUsers
        });

        const populatedComment = await Comment.findById(newComment._id)
            .populate('user', 'username profilePic profileColor')
            .populate('taggedUsers', 'username profilePic profileColor');

        // Notification logic for tagged users, resource owner, and parent commenter
        for (const taggedUserId of validTaggedUsers) {
            if (taggedUserId.toString() !== userId.toString()) {
                await Notification.create({
                    recipient: taggedUserId,
                    type: 'tag_comment',
                    from: userId,
                    resource: resourceId,
                    message: `${req.user.username} tagged you in a comment on "${resource.title}"`
                });
            }
        }

        if (resource.uploader._id.toString() !== userId.toString()) {
            await Notification.create({
                recipient: resource.uploader._id,
                type: 'comment',
                from: userId,
                resource: resourceId,
                message: `${req.user.username} commented on your resource "${resource.title}"`
            });
        }

        if (parentComment && parentComment.user.toString() !== userId.toString()) {
            await Notification.create({
                recipient: parentComment.user,
                type: 'reply',
                from: userId,
                resource: resourceId,
                message: `${req.user.username} replied to your comment on "${resource.title}"`
            });
        }

        // Real-time event
        req.io.to(resourceId).emit('newComment', populatedComment);

        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: populatedComment
        });
    } catch (error) {
        console.error('Error in createComment:', { message: error.message, stack: error.stack });
        res.status(500).json({
            success: false,
            message: `Failed to create comment: ${error.message}`
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this comment'
            });
        }

        // Parse tags and find new mentions
        const tagMatches = text.match(/@(\w+)/g) || [];
        const taggedUsernames = tagMatches.map(tag => tag.slice(1).toLowerCase());
        const foundUsers = await User.find({ username: { $in: taggedUsernames } }).select('_id');
        const validTaggedUsers = foundUsers.map(user => user._id);

        const existingTagged = comment.taggedUsers.map(id => id.toString());
        const newTagged = validTaggedUsers.filter(id => !existingTagged.includes(id.toString()));

        comment.text = text;
        comment.taggedUsers = validTaggedUsers;
        await comment.save();

        const populatedComment = await Comment.findById(commentId)
            .populate('user', 'username profilePic profileColor')
            .populate('taggedUsers', 'username profilePic profileColor');

        // Notify newly tagged users
        const resource = await Resource.findById(comment.resource).select('title');
        for (const taggedUserId of newTagged) {
            if (taggedUserId.toString() !== userId.toString()) {
                await Notification.create({
                    recipient: taggedUserId,
                    type: 'tag_comment',
                    from: userId,
                    resource: comment.resource,
                    message: `${req.user.username} tagged you in an updated comment on "${resource.title}"`
                });
            }
        }

        req.io.to(comment.resource.toString()).emit('updatedComment', populatedComment);

        res.json({
            success: true,
            message: 'Comment updated successfully',
            data: populatedComment
        });
    } catch (error) {
        console.error('Error in updateComment:', { message: error.message, stack: error.stack });
        res.status(500).json({
            success: false,
            message: `Failed to update comment: ${error.message}`
        });
    }
};

// Helper function for recursive deletion
async function deleteCommentAndReplies(commentId) {
    const replies = await Comment.find({ parent: commentId });
    for (const reply of replies) {
        await deleteCommentAndReplies(reply._id);
    }
    await Comment.findByIdAndDelete(commentId);
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        if (comment.user.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this comment'
            });
        }

        await deleteCommentAndReplies(commentId);

        req.io.to(comment.resource.toString()).emit('deletedComment', { commentId });

        res.json({
            success: true,
            message: 'Comment and its replies deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteComment:', { message: error.message, stack: error.stack });
        res.status(500).json({
            success: false,
            message: `Failed to delete comment: ${error.message}`
        });
    }
};

export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        const isLiked = comment.likes.includes(userId);
        let message;
        if (isLiked) {
            comment.likes.pull(userId);
            message = 'Comment unliked';
        } else {
            comment.likes.push(userId);
            message = 'Comment liked';

            if (comment.user.toString() !== userId.toString()) {
                const resource = await Resource.findById(comment.resource).select('title');
                await Notification.create({
                    recipient: comment.user,
                    type: 'like_comment',
                    from: userId,
                    resource: comment.resource,
                    message: `${req.user.username} liked your comment on "${resource.title}"`
                });
            }
        }

        await comment.save();

        req.io.to(comment.resource.toString()).emit('commentLiked', {
            commentId,
            likes: comment.likes.length,
            userId
        });

        res.json({
            success: true,
            message,
            likes: comment.likes.length
        });
    } catch (error) {
        console.error('Error in likeComment:', { message: error.message, stack: error.stack });
        res.status(500).json({
            success: false,
            message: `Failed to like comment: ${error.message}`
        });
    }
};