import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Signup Route
router.post('/signup', validateSignup, signup);

// User Login Route
router.post('/login', validateLogin, login);

// Example Protected Route (requires JWT token in the header)
router.get('/dashboard', auth, (req, res) => {
    // Here you can fetch and return user-specific data for the dashboard or any other operation.
    res.send('This is a protected user dashboard');
});

export default router;
