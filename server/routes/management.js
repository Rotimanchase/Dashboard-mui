import express from 'express';
import { getAdmins, getUserPerformance } from '../controllers/management.js';

const router = express.Router();

router.get('/admins', getAdmins)
router.get('/performanance/:id', getUserPerformance)

export default router;