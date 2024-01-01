/* IMPORT FILES */
import express from 'express';
import { getProducts } from './controllers/client.js'
// routes from express application
const router = express.Router();

router.get('/products', getProducts);       // get all products route
export default router;