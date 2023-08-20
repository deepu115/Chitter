import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h'
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};