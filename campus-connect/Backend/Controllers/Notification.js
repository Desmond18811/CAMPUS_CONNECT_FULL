import Notification from "../Models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .populate('from', 'username')
            .populate('resource', 'title')
            .sort({ createdAt: -1 })
            .limit(50); // Limit to recent

        res.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markNotificationRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification || notification.recipient.toString() !== req.user._id.toString()) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Optional: Mark all read
export const markAllRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user._id, read: false },
            { read: true }
        );
        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};