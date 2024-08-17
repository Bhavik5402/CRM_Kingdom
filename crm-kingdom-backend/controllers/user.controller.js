import { where } from "sequelize";
import User from "../models/Users.js";
import UserPassword from "../models/UserPassword.js";
import { sendResetPasswordEmail } from "../utils/emailHelper.js";
import jwtTokenGenerator from "../utils/generateJwtToken.js";
import bcrypt from "bcryptjs";
import UserAccess from "../models/UserAccess.js";

export const GetAllUsers = async (req, res) => {
    try {
        const { pageSize, pageIndex, sortColumn, sortDirection, filterObj } = req.body;
        const limit = pageSize || 10;
        const offset = pageIndex ? pageIndex * limit : 0;
        const order = [[sortColumn || "userid", sortDirection || "ASC"]];

        // Construct the where clause based on filterObj
        let whereClause = {
            deleteddate: null,
        };

        if (filterObj) {
            for (const key in filterObj) {
                if (filterObj[key]) {
                    whereClause[key] = filterObj[key];
                }
            }
        }
        const users = await User.findAndCountAll({
            where : whereClause,
            limit,              // Pagination: limit number of records
            offset,             // Pagination: skip these many records
            order,              // Sorting: order by specified column and direction
          });
          return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "success",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull: false,
            message: "Internal server error - Get All Users.",
            data: null,
        });
    }
};

export const CreateUser = async (req, res) => {
    try {
        const { user } = req.body;
        console.log("User - ", user);
        if (user) {
            const isExist = await User.findOne({ where: { email: user.email } });
            if (isExist) {
                return res.status(404).json({
                    statusCode: 404,
                    isSuccessfull: false,
                    message: "This email is already exist",
                });
            }
            const newUser = await User.create({
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                phonenumber: user.phoneNumber,
                workdescription: user.workDescription,
                usertype: user.userType,
                createdby: user.createdBy,
            });
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash('12345678' , salt);
            const userPassword = await UserPassword.create({
                password : hashPass,
                userid : newUser.userid, 
            });

            // Insert access data into useraccess table
            if (user.access) {
                const userAccessData = Object.keys(user.access).map(pageId => ({
                    pageid: parseInt(pageId),
                    userid: newUser.userid,
                    ischecked: user.access[pageId],
                }));

                await UserAccess.bulkCreate(userAccessData);
            }

            // // Generate a reset token (e.g., JWT)
            // const resetToken = jwtTokenGenerator(newUser.userid, newUser.firstName);

            // // Send the reset password email
            // await sendResetPasswordEmail(newUser.email, resetToken);

            return res.status(200).json({
                statusCode: 200,
                isSuccessfull: true,
                message: "User is added successfully",
                data: newUser,
            });
        }
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        if(isValid){
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        }
        else{
            console.log("Server Error - ",error)
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Create User.",
                data: null,
            });
        }
    }
};

export const GetUserById = async (req, res) => {
    try {
        const { userId } = req.body; // Get userId from URL parameters

        if (!userId) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID must be provided",
            });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Fetch the user's access data
        const userAccess = await UserAccess.findAll({
            where: { userid: userId },
        });

        // Format user access data
        const accessData = userAccess.reduce((acc, access) => {
            acc[access.pageid] = access.ischecked;
            return acc;
        }, {});

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "User retrieved successfully",
            data: {
                ...user.toJSON(),
                access: accessData,
            },
        });
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Get User By ID.",
                data: null,
            });
        }
    }
};


export const EditUser = async (req, res) => {
    try {
        const { user } = req.body;
        const { userId } = user;

        if (!userId || !user) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID and user data must be provided",
            });
        }

        // Check if the user exists
        const existingUser = await User.findByPk(userId);
        if (!existingUser) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Check if the email is already in use by another user
        if (user.email && user.email !== existingUser.email) {
            const isEmailExist = await User.findOne({ where: { email: user.email } });
            if (isEmailExist) {
                return res.status(400).json({
                    statusCode: 400,
                    isSuccessfull: false,
                    message: "This email is already in use by another user",
                });
            }
        }

        // Update the user's information
        const updatedUser = await existingUser.update({
            firstname: user.firstName || existingUser.firstname,
            lastname: user.lastName || existingUser.lastname,
            email: user.email || existingUser.email,
            phonenumber: user.phoneNumber || existingUser.phonenumber,
            workdescription: user.workDescription || existingUser.workdescription,
            usertype: user.userType || existingUser.usertype,
            updateddate: new Date(), // Update the updated date
        });

        // Handle the access update
        if (user.access) {
            const userAccessData = Object.keys(user.access).map(pageId => ({
                pageid: parseInt(pageId),
                userid: userId, // Use the existing userId
                ischecked: user.access[pageId],
            }));

            // First, delete the existing access records for this user
            await UserAccess.destroy({ where: { userid: userId } });

            // Then, bulk insert the new access records
            await UserAccess.bulkCreate(userAccessData);
        }

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Edit User.",
                data: null,
            });
        }
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const { user } = req.body;
        const { userId } = user;

        if (!userId) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID must be provided",
            });
        }

        // Check if the user exists
        const existingUser = await User.findByPk(userId);
        if (!existingUser) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Mark the user as deleted by updating the deleteddate field
        const updatedUser = await existingUser.update({
            deleteddate: new Date(), // Set the deleted date to the current date
        });

        return res.status(200).json({
            statusCode: 200,
            isSuccessfull: true,
            message: "User marked as deleted successfully",
            data: updatedUser,
        });
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.status(400).json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Delete User.",
                data: null,
            });
        }
    }
};

