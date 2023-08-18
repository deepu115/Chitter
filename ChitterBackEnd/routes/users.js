import express from 'express';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';
import { signup, login } from '../controllers/authController.js';


const router = express.Router();

// User Signup Route
router.post('/signup', validateSignup, signup);

// User Login Route
router.post('/login', validateLogin, login);


export default router;
