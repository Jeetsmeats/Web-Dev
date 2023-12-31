/* IMPORT FILES */
import express from 'express';
import { getUser } from '../controllers/general.js';

// routes from express application
const router = express.Router();

router.get("/user/:id", getUser);   //  GET user 

export default router;