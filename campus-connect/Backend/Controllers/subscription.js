import Subscribers from "../Models/Subscribers.js";
import { sendLaunchEmail, sendWelcomeEmail } from "../utils/EmailService.js";

export const subscribe = async(req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                error: 'Please provide a valid email address'
            });
        }

        const existingUser = await Subscribers.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                error: 'This email is already subscribed to our waitlist'
            });
        }

        const subscriber = new Subscribers({
            email: email.toLowerCase(),
            subscribedAt: new Date()
        });
        await subscriber.save();

        // Try to send welcome email (but don't fail subscription if email fails)
        try {
            await sendWelcomeEmail(email);
            console.log(`✅ Welcome email sent successfully to ${email}`);
        } catch (emailError) {
            console.warn('⚠️ Failed to send welcome email (subscription still successful):', emailError.message);
        }

        return res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Successfully subscribed to our waitlist!',
            data: subscriber
        });

    } catch (error) {
        console.error('🔴 Subscription Error:', error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            error: 'Internal server error. Please try again later.'
        });
    }
}

export const getSubscriberCount = async(req, res) => {
    try {
        const count = await Subscribers.countDocuments();
        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Subscriber count retrieved successfully',
            data: { count }
        });
    } catch (error) {
        console.error('🔴 Get Subscriber Count Error:', error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            error: 'Failed to get subscriber count'
        });
    }
}

export const getAllSubscribers = async(req, res) => {
    try {
        const subscribers = await Subscribers.find({}).sort({ subscribedAt: -1 });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Subscribers retrieved successfully',
            data: subscribers
        });
    } catch (error) {
        console.error('🔴 Get All Subscribers Error:', error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            error: 'Failed to get subscribers'
        });
    }
}

export const notifyLaunch = async(req, res) => {
    try {
        // Get all subscribers who haven't been notified yet
        const subscribers = await Subscribers.find({ notified: false });

        if (!subscribers || subscribers.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'No subscribers found or all have already been notified'
            });
        }

        let notifiedCount = 0;
        try {
            notifiedCount = await sendLaunchEmail(subscribers);
            console.log(`✅ Successfully sent launch emails to ${notifiedCount} subscribers`);
        } catch (emailError) {
            console.error('❌ Failed to send launch emails:', emailError.message);
            return res.status(500).json({
                status: 'error',
                statusCode: 500,
                error: 'Failed to send launch notifications: ' + emailError.message
            });
        }

        // Mark subscribers as notified
        const subscriberIds = subscribers.map(sub => sub._id);
        await Subscribers.updateMany(
            { _id: { $in: subscriberIds } },
            {
                notified: true,
                notifiedAt: new Date()
            }
        );

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: `Launch notifications sent to ${notifiedCount} subscribers`,
            data: {
                notifiedCount,
                subscribers: subscribers.map(sub => ({
                    email: sub.email,
                    subscribedAt: sub.subscribedAt
                }))
            }
        });

    } catch (error) {
        console.error('🔴 Notify Launch Error:', error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            error: 'Internal server error: ' + error.message
        });
    }
}