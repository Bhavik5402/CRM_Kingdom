import Jwt from "jsonwebtoken";
import User from "../models/Users.js";

const protectRoute = async (req , res , next)=>{
    try{
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                statusCode: 401,
                isSuccessfull:false,
                message: "UnAuthorized - Token is not provided."
            });
        }
        if (token.startsWith("bearer ")) {
            console.log("In If - ",token)
            token = token.slice(7, token.length).trim(); // Remove 'Bearer ' prefix
        }
        console.log("Token - ",token)
        const decoded = Jwt.verify(token,process.env.SECRET_KEY);
        if( !decoded ){
            return res.status(401).json({
                statusCode: 401,
                isSuccessfull:false,
                message: "UnAuthorized - Invalid token."
            });
        }
        console.log('decoded userId - ',decoded.userId);
        const user = await User.findOne({ where: { userid: decoded.userId } });

		if (!user) {
            return res.status(404).json({
                statusCode: 404,
                isSuccessfull:false,
                message: "User not found"
            });
		}

		req.user = user;
        console.log("Req user - ",req.user)
		next();
    }
    catch(error){
        console.log("Exception in protectRoute - ",error);
        return res.status(500).json({
            statusCode: 500,
            isSuccessfull:false,
            message: error.message
        });
    }
}

export default protectRoute;