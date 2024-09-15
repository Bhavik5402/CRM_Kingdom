import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (email, resetToken, isResetPassword = false) => {
    try {
        // Create a transporter object using Office 365 SMTP settings
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587, // Port for TLS
            secure: true, // Use false for TLS (587)
            auth: {
                user: "", // Your Outlook email
                pass: "", // Your Outlook password
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        // Email content based on the isResetPassword flag
        const mailOptions = {
            from: "bhavik.parmar5402@outlook.com",
            to: email,
            subject: isResetPassword
                ? "Reset Your Password - LeadGenerator"
                : "Welcome to LeadGenerator! Your Account Has Been Created",
            html: isResetPassword
                ? `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p>We received a request to reset the password for your account. Please click the link below to reset your password:</p>
                        <p>
                            <a href="http://localhost:3000/reset-password?token=${resetToken}" 
                               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                                Reset Password
                            </a>
                        </p>
                        <p>If you did not request this, please ignore this email.</p>
                        <p>Thank you,<br/>LeadGenerator Team</p>
                    </div>
                `
                : `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2 style="color: #333;">Welcome to LeadGenerator!</h2>
                        <p>Your account has been successfully created. Below are your login details:</p>
                        <ul style="list-style-type: none; padding: 0;">
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Default Password:</strong> 12345678</li>
                        </ul>
                        <p>We strongly recommend resetting your password as soon as possible. Please click the link below to reset your password:</p>
                        <p>
                            <a href="http://localhost:3000/reset-password?token=${resetToken}" 
                               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                                Reset Password
                            </a>
                        </p>
                        <p>If you did not request this email, please ignore it.</p>
                        <p>Thank you,<br/>LeadGenerator Team</p>
                    </div>
                `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(
            `${isResetPassword ? "Password reset" : "Welcome"} email sent: %s`,
            info.messageId
        );
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
