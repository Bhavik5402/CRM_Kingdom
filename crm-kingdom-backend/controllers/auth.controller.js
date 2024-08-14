import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwtTokenGenerator from "../utils/generateJwtToken.js";
import UserPassword from "../models/UserPassword.js";
export const Login = async (req , res) => {
    try{
        const {email , password} = req.body;
        const user = await User.findOne({ where: { email: email } });
        if(!user){
            return res.status(404).json("User does not exist.");
        }
        else{
            const userPassword = await UserPassword.findOne({ where: { userid: user.userid } });
            if (!userPassword) {
                return res.status(404).json({ message: 'User does not exist' });
            }
            const isPasswordCorrect = await bcrypt.compare(password, userPassword?.password);
            if(isPasswordCorrect){
                const token = jwtTokenGenerator(user.userid,user.firstname);
                return res.status(200).json({
                    statusCode: 200,
                    message: "Login successful.",
                    data: {
                        user,
                        token
                    }
                });
            }
            else{
                return res.status(400).json({
                    statusCode: 400,
                    message: "Username or Password is incorrect.",
                    data: null
                });
            }
        }
    }
    catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error.",
            data: null
        });
    }
}

export const SignUp = async (req,res)=>{
    debugger;
    try{
        debugger;
        const {fullName , userName , password , confirmPassword , email} = req.body;
        if(password != confirmPassword){
            return res.status(400).json("Password are not matched.");
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json("This UserName or Email is already exist.");
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password , salt);
            const newUser = new User({
                fullName,
                userName,
                password : hashPass,
                email
            });

            if(newUser){
                const token = jwtTokenGenerator(newUser._id);
                await newUser.save();
                res.status(201).json({
                    _id: newUser._id,
				    fullName: newUser.fullName,
				    username: newUser.username,
                    email : newUser.email,
                    token : token
                });
            }
            else{
                res.status(400).json({ error: "Invalid user data" });
            }
        }
    }
    catch(error){
        return res.status(500).json({ error: "Internal server error" });
    }
}