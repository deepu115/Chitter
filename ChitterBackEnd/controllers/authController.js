import User from '../models/user.js';
import { hashPassword, comparePassword, generateToken } from '../services/authService.js';
import { validationResult } from 'express-validator';

export const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg);
        }

        const { name, username, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            throw new Error('Email already registered');
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user in database
        user = new User({
            name,
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.json({ token });
    } catch (error) {
        const errorMessage =
            error.code === 11000 && error.keyValue && error.keyValue.username ? 'Username already taken' :
                error.message;

        return res.status(400).json({ msg: errorMessage });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg);
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Username or Password');
        }

        // Compare passwords
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Username or Password');
        }

        // Generate JWT token
        const token = generateToken(user);

        res.json({ token });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};
