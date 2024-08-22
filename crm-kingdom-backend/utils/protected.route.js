import Jwt from "jsonwebtoken";
import User from "../models/Users.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({
                statusCode: 401,
                isSuccessfull: false,
                message: "UnAuthorized - Token is not provided.",
            });
        }

        const decoded = Jwt.verify(token.replace("bearer ", ""), process.env.SECRET_KEY);
        if (!decoded) {
            return res.json({
                statusCode: 401,
                isSuccessfull: false,
                message: "UnAuthorized - Invalid token.",
            });
        }

        const user = await User.findOne({ where: { userid: decoded.userId } });

        if (!user) {
            return res.json({
                statusCode: 404,
                isSuccessfull: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Exception in protectRoute - ", error);
        return res.json({
            statusCode: 401,
            isSuccessfull: false,
            message: error.message,
        });
    }
};

export default protectRoute;
