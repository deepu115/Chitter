import { body, validationResult } from 'express-validator';

// Signup Validation
export const validateSignup = [
    body('name', "Name is required").not().isEmpty(),
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        next();
    }
];

// Login Validation
export const validateLogin = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
