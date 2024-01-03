/* IMPORT FILES */
import express from 'express';
import { getAdmins, getUserPerformance } from '../controllers/management.js';

// routes from express application
const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;