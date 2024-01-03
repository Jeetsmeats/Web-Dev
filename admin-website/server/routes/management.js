/* IMPORT FILES */
import express from 'express';
import { getAdmins } from '../controllers/management.js';

// routes from express application
const router = express.Router();

router.get("/admins", getAdmins);

export default router;