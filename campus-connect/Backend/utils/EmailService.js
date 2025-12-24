import nodemailer from 'nodemailer';

// Create a reusable transporter object
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

export const sendWelcomeEmail = async (email) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `Campus Connect <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Our Campus Connect Waitlist!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">🎓 Welcome to Campus Connect!</h2>
                <p>Thank you for joining our exclusive waitlist! We're excited to have you on board.</p>
                <p>You'll be among the first to know when we launch our platform.</p>
                <br>
                <p>Best regards,<br>The Campus Connect Team</p>
            </div>
        `,
    };

    try {
        // Verify connection configuration
        await transporter.verify();
        console.log('✅ SMTP server is ready to take our messages');

        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${email}`);

        // Close the transporter
        transporter.close();

        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error(`❌ Failed to send welcome email to ${email}:`, error.message);

        // Close the transporter on error
        transporter.close();

        throw new Error(`Email sending failed: ${error.message}`);
    }
};

export const sendLaunchEmail = async (subscribers) => {
    const transporter = createTransporter();

    // Ensure subscribers is an array
    if (!Array.isArray(subscribers)) {
        throw new Error('Subscribers must be an array');
    }

    const emails = subscribers.map(sub => sub.email);

    const mailOptions = {
        from: `Campus Connect <${process.env.EMAIL_USER}>`,
        bcc: emails,
        subject: "We're Live! 🎉 Campus Connect is Now Available!",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #28a745;">🌟 Great News! Campus Connect is Live! 🌟</h2>
                <p>Thank you for your patience and interest. You can now access our platform!</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}" 
                       style="background-color: #007bff; color: white; padding: 15px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;
                              font-size: 16px; font-weight: bold;">
                        Get Started Now
                    </a>
                </div>
                
                <p>We're excited to have you on board!</p>
                <br>
                <p>Best regards,<br>The Campus Connect Team</p>
            </div>
        `,
    };

    try {
        await transporter.verify();
        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ Launch email sent to ${emails.length} subscribers`);

        transporter.close();
        return emails.length;
    } catch (error) {
        console.error('❌ Error sending launch email:', error.message);
        transporter.close();
        throw error;
    }
};

export const welcomeEmail = async (email) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `Campus Connect <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Our Campus Connect 🎓!!',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">🎓 Welcome to Campus Connect!</h2>
                <p>Thank you for joining us! We're excited to have you on board.</p>
                <br>
                <p>Best regards,<br>The Campus Connect Team</p>
            </div> 
`,
    };

    try {
        await transporter.verify();
        console.log(' ✅ SMTP server is ready to take our messages');

        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ welcome email sent to ${email}`);

        transporter.close();

        return {
            success: true,
            messageId: result.messageId,
        }
    }catch(error) {
        console.error(`❌ Failed to send welcome email to ${email}:`, error.message);

        // Close the transporter on error
        transporter.close();

        throw new Error(`Email sending failed: ${error.message}`);
    }
}