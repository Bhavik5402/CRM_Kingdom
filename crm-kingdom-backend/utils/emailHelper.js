import nodemailer from "nodemailer";

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'SendGrid', 'Mailgun', etc.
    auth: {
        user: 'bhavik.tatvasoft5402@gmail.com', // Your email address
        pass: 'bhavik@123'   // Your email password or an app-specific password
    }
});

// Function to send the email
export const sendResetPasswordEmail = async (email, resetToken) => {
    const resetLink = `http://yourdomain.com/reset-password?token=${resetToken}`; // Customize the link

    const mailOptions = {
        from: '"Your Company" <your-email@gmail.com>', // Sender address
        to: email, // List of receivers
        subject: 'Password Reset Request', // Subject line
        text: `Please click the following link to reset your password: ${resetLink}`, // Plain text body
        html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>` // HTML body
    };

    return transporter.sendMail(mailOptions);
};
