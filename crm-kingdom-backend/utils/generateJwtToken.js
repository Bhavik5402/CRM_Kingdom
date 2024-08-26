import Jwt  from "jsonwebtoken";



const jwtTokenGenerator = (userId,firstname)=>{
    const token = Jwt.sign({ userId, firstname }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
	return token;
}


export const jwtTokenValidator = (token) => {
    try {
        // Validate and decrypt the token using the secret key
        const decodedToken = Jwt.verify(token, process.env.SECRET_KEY);
        
        // Extract userId and other information from the token
        const { userId, firstname } = decodedToken;

        return { userId, firstname, isValid: true };
    } catch (error) {
        // Handle token validation errors (e.g., token expired, invalid token, etc.)
        return { isValid: false, error: error.message };
    }
};