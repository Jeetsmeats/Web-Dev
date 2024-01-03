/* IMPORT FILES */
import express from 'express';
import { getUser, getDashboardStats } from '../controllers/general.js';

// routes from express application
const router = express.Router();

router.get("/user/:id", getUser);   //  GET user 
router.get("/dashboard", getDashboardStats)         // GET dashboard stats
export default router;