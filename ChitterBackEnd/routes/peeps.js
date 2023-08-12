import express from 'express';
const router = express.Router();
import Peep from '../models/peep.js';

// Post a Peep Endpoint
router.post('/', async (req, res) => {
    let peep = new Peep({
        content: req.body.content,
        userId: req.body.userId
    });

    peep = await peep.save();
    res.send(peep);
});

export default router;
