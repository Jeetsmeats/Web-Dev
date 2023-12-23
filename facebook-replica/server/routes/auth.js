// install dependencies
import express from 'express';
import { login } from '../controllers/auth.js';

// instantiate the application router
const router = express.Router();

router.post("/login", login);

export default router;