import Jwt  from "jsonwebtoken";

const jwtTokenGenerator = (userId,firstname)=>{
    const token = Jwt.sign({ userId, firstname }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
	return token;
}

export default jwtTokenGenerator;