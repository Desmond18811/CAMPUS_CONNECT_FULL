import User from "../Models/User.js";
import Resource from "../Models/Resource.js";
import Comment from "../Models/Comment.js";

// Block a user
export const blockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const blockerId = req.user._id;

        if (userId === blockerId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot block yourself"
            });
        }

        const userToBlock = await User.findById(userId);
        if (!userToBlock) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Add to blocked users list
        await User.findByIdAndUpdate(
            blockerId,
            { $addToSet: { blockedUsers: userId } },
            { new: true }
        );

        res.json({
            success: true,
            message: `Successfully blocked @${userToBlock.username}`
        });
    } catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to block user'
        });
    }
};

// Unblock a user
export const unblockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const blockerId = req.user._id;

        await User.findByIdAndUpdate(
            blockerId,
            { $pull: { blockedUsers: userId } },
            { new: true }
        );

        res.json({
            success: true,
            message: 'User unblocked successfully'
        });
    } catch (error) {
        console.error('Error unblocking user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unblock user'
        });
    }
};

// Get blocked users list
export const getBlockedUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('blockedUsers', 'username profilePic');

        res.json({
            success: true,
            data: user.blockedUsers || []
        });
    } catch (error) {
        console.error('Error fetching blocked users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blocked users'
        });
    }
};
