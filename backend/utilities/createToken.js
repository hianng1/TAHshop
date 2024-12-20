import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const generateToken = (res, userID) => {
    // Generate JWT
    const token = jwt.sign({ userID }, process.env.JWT_Secret, {
        expiresIn: "30d", // Token expires in 30 days
    });

    // Set cookie options
    res.cookie('jwt', token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.Node_ENV !== 'development', // Use HTTPS in non-development environments
        sameSite: 'strict', // Prevent cross-site request forgery (CSRF)
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 days
    });

    return token; // Optional: Return token if needed
};

export default generateToken;
