import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import UserPassword from "../models/UserPassword.js";
import UserAccess from "../models/UserAccess.js";
import PageAccess from "../models/PageAccess.js";
import { jwtTokenGenerator, jwtTokenValidator } from "../utils/generateJwtToken.js";
import { sendResetPasswordEmail } from "../utils/emailHelper.js";
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User does not exist",
            });
        } else {
            const userPassword = await UserPassword.findOne({ where: { userid: user.userid } });
            console.log("User Password - ", userPassword);
            if (!userPassword) {
                return res.status(404).json({
                    statusCode: 404,
                    isSuccessfull: false,
                    message: "User does not exist",
                });
            }
            console.log("isPasswordCorrect - ");
            const isPasswordCorrect = await bcrypt.compare(password, userPassword?.password);
            console.log("isPasswordCorrect - ", isPasswordCorrect);
            if (isPasswordCorrect) {
                const token = jwtTokenGenerator(user.userid, user.firstname);

                // // Fetch user access data
                // const userAccess = await UserAccess.findAll({
                //     where: { userid: user.userid },
                //     attributes: ["pageid", "ischecked"],
                // });

                // // Transform user access data into a more usable format
                // const accessData = userAccess.reduce((acc, access) => {
                //     acc[access.pageid] = access.ischecked;
                //     return acc;
                // }, {});

                // Fetch all pages (assuming you have a Page model for pages)
                const allPages = await PageAccess.findAll({
                    attributes: ["pageid"],
                });
                let accessData = null;
                if (user.usertype === 2) {
                    // Fetch user access data
                    const userAccess = await UserAccess.findAll({
                        where: { userid: user.userid, ischecked: true },
                        attributes: ["pageid", "ischecked"],
                    });

                    accessData = userAccess.map((value) => value.dataValues.pageid);

                    // // Map user access data
                    // const userAccessMap = userAccess.reduce((acc, access) => {
                    //     acc[access.pageid] = access.ischecked;
                    //     return acc;
                    // }, {});

                    // // Prepare access data for all pages
                    // accessData = allPages.reduce((acc, page) => {
                    //     acc[page.pageid] = userAccessMap[page.pageid] || false;
                    //     return acc;
                    // }, {});
                }

                return res.status(200).json({
                    statusCode: 200,
                    isSuccessfull: true,
                    message: "Login successful.",
                    data: {
                        user,
                        token,
                        access: accessData,
                    },
                });
            } else {
                return res.status(200).json({
                    statusCode: 400,
                    isSuccessfull: false,
                    message: "Username or Password is incorrect.",
                    data: null,
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error.",
            data: null,
        });
    }
};

export const ResetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Decrypt and validate the token
        const { userId, isValid, error } = jwtTokenValidator(token);

        if (!isValid) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Invalid or expired reset token.",
                error,
            });
        }

        // Continue with the reset password logic
        const user = await User.findOne({ where: { userid: userId } });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found.",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        const userPassword = await UserPassword.findOne({ where: { userid: user.userid } });
        if (userPassword) {
            await userPassword.update({ password: hashedPassword });
        } else {
            await UserPassword.create({ userid: user.userid, password: hashedPassword });
        }
        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Password has been reset successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error.",
            data: null,
        });
    }
};

export const SignUp = async (req, res) => {
    debugger;
    try {
        debugger;
        const { fullName, userName, password, confirmPassword, email } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json("Password are not matched.");
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json("This UserName or Email is already exist.");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const newUser = new User({
                fullName,
                userName,
                password: hashPass,
                email,
            });

            if (newUser) {
                const token = jwtTokenGenerator(newUser._id);
                await newUser.save();
                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    token: token,
                });
            } else {
                res.status(400).json({ error: "Invalid user data" });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        console.log("In forgotpassword method");
        const { email } = req.body;
        // Check if the user exists
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User does not exist",
            });
        }

        // Generate a reset token (e.g., JWT)
        const resetToken = jwtTokenGenerator(user.userid, user.firstname);
        console.log("resetToken - ", resetToken);
        // Send the reset password email
        await sendResetPasswordEmail(user.email, resetToken, true);

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "Reset password email sent successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error.",
        });
    }
};
