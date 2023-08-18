import express from 'express';
import { getAllPeeps, createPeep } from '../controllers/peepController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPeeps);
router.post('/', auth, createPeep);

export default router;