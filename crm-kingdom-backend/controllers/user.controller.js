import { where } from "sequelize";
import User from "../models/Users.js";
import UserPassword from "../models/UserPassword.js";
import { sendResetPasswordEmail } from "../utils/emailHelper.js";
import jwtTokenGenerator from "../utils/generateJwtToken.js";
import bcrypt from "bcryptjs";
import UserAccess from "../models/UserAccess.js";
import PageAccess from "../models/PageAccess.js";

export const GetAllUsers = async (req, res) => {
    try {
        const { pageSize, pageIndex, sortColumn, sortDirection, filterObj } = req.body;
        const user = req.user;
        const limit = pageSize || 10;
        const offset = pageIndex ? pageIndex * limit : 0;
        const order = [[sortColumn || "userid", sortDirection || "ASC"]];

        // Construct the where clause based on filterObj
        let whereClause = {
            deleteddate: null,
            createdby: user.usertype == 2 ? user.createdby : user.userid,
        };

        if (filterObj) {
            for (const key in filterObj) {
                if (filterObj[key]) {
                    whereClause[key] = filterObj[key];
                }
            }
        }
        const users = await User.findAndCountAll({
            where: whereClause,
            limit, // Pagination: limit number of records
            offset, // Pagination: skip these many records
            order, // Sorting: order by specified column and direction
        });

        let userView = [];
        for (let user of users.rows) {
            const userAccess = await UserAccess.findAll({
                where: {
                    userid: user.dataValues.userid,
                    ischecked: true,
                },
            });
            let userPageAccess = [];
            console.log(userAccess);
            for (const access of userAccess) {
                const pageAccess = await PageAccess.findOne({
                    where: { pageid: access.dataValues.pageid },
                });
                userPageAccess.push(pageAccess.dataValues.name);
            }

            var returnUser = {
                ...user.dataValues,
                access: userPageAccess,
            };
            userView.push(returnUser);
        }

        return res.json({
            statusCode: 200,
            isSuccessfull: true,
            message: "success",
            data: userView,
        });
    } catch (error) {
        console.log("Exception in GetAllUsers || ", error);
        return res.json({
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
            const isExist = await User.findOne({ where: { email: user.email, deleteddate: null } });
            if (isExist) {
                return res.json({
                    statusCode: 404,
                    isSuccessfull: false,
                    message: "This email is already exist",
                });
            }
            const newUser = await User.create({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phonenumber: user.phonenumber,
                workdescription: user.workdescription,
                usertype: user.usertype,
                createdby: user.createdby,
            });

            // User Password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash("12345678", salt);
            const userPassword = await UserPassword.create({
                password: hashPass,
                userid: newUser.userid,
            });

            // Insert access data into useraccess table
            if (user.access) {
                const userAccessData = Object.keys(user.access).map((pageId) => ({
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

            return res.json({
                statusCode: 200,
                isSuccessfull: true,
                message: "User is added successfully",
                data: newUser,
            });
        }
        return res.json({
            statusCode: 400,
            isSuccessfull: false,
            message: "Something went wrong",
            data: null,
        });
    } catch (error) {
        const isValid = error.toString().includes("Validation");
        console.log(error);
        if (isValid) {
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            console.log("Server Error - ", error);
            return res.json({
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
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID must be provided",
            });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Fetch the user's access data
        const userAccess = await UserAccess.findAll({
            where: {
                userid: user.dataValues.userid,
                ischecked: true,
            },
        });
        const accessData = [];
        for (const access of userAccess) {
            const pageAccess = await PageAccess.findOne({
                where: { pageid: access.dataValues.pageid },
            });
            accessData.push(pageAccess.dataValues.name);
        }

        return res.json({
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
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.json({
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
        const { userid } = user;

        if (!userid || !user) {
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID and user data must be provided",
            });
        }

        // Check if the user exists
        const existingUser = await User.findByPk(userid);
        if (!existingUser) {
            return res.json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Check if the email is already in use by another user
        if (user.email && user.email !== existingUser.email) {
            const isEmailExist = await User.findOne({ where: { email: user.email } });
            if (isEmailExist) {
                return res.json({
                    statusCode: 400,
                    isSuccessfull: false,
                    message: "This email is already in use by another user",
                });
            }
        }

        // Update the user's information
        const updatedUser = await existingUser.update({
            firstname: user.firstname || existingUser.firstname,
            lastname: user.lastname || existingUser.lastname,
            email: user.email || existingUser.email,
            phonenumber: user.phonenumber || existingUser.phonenumber,
            workdescription: user.workdescription || existingUser.workdescription,
            usertype: user.usertype || existingUser.usertype,
            updateddate: new Date(), // Update the updated date
        });

        // Handle the access update
        if (user.access) {
            const userAccessData = Object.keys(user.access).map((pageId) => ({
                pageid: parseInt(pageId),
                userid: userid, // Use the existing userId
                ischecked: user.access[pageId],
            }));

            // First, delete the existing access records for this user
            await UserAccess.destroy({ where: { userid: userid } });

            // Then, bulk insert the new access records
            await UserAccess.bulkCreate(userAccessData);
        }

        return res.json({
            statusCode: 200,
            isSuccessfull: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.json({
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
        const { userid } = user;

        if (!userid) {
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "User ID must be provided",
            });
        }

        // Check if the user exists
        const existingUser = await User.findByPk(userid);
        if (!existingUser) {
            return res.json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        // Mark the user as deleted by updating the deleteddate field
        const updatedUser = await existingUser.update({
            deleteddate: new Date(), // Set the deleted date to the current date
        });

        return res.json({
            statusCode: 200,
            isSuccessfull: true,
            message: "User deleted successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        const isValid = error.toString().includes("Validation");
        if (isValid) {
            return res.json({
                statusCode: 400,
                isSuccessfull: false,
                message: "Validation error occurred",
                data: null,
            });
        } else {
            return res.json({
                statusCode: 500,
                isSuccessfull: false,
                message: "Internal server error - Delete User.",
                data: null,
            });
        }
    }
};
