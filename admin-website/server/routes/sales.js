/* IMPORT FILES */
import express from 'express';
import { getSales } from '../controllers/sales.js';

// routes from express application
const router = express.Router();

router.get("/sales", getSales);         // get sales data route
export default router;