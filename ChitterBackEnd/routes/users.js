import express from "express";
const router = express.Router();
import User from '../models/user.js';
import { body, validationResult } from 'express-validator';


// Signup Endpoint
router.post('/signup', [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();
    res.send(user);
});



export default router;