import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async(email, resetToken) => {
    try {
        // Create a transporter object using Office 365 SMTP settings
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587, // Port for TLS
            secure: false, // Use false for TLS (587)
            auth: {
                user: "bhavik.parmar5402@outlook.com", // Your Outlook email
                pass: "Bhavik@123",
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        // Email content
        const mailOptions = {
            from: '"Your Company Name" <your-email@your-domain.com>',
            to: email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
            html: `<p>You requested a password reset. Use the following token to reset your password:</p>
                   <p><b>${resetToken}</b></p>`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

