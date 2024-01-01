/* IMPORT FILES */
import express from 'express';
import { getProducts, getCustomers } from '../controllers/client.js'
// routes from express application
const router = express.Router();

router.get('/products', getProducts);       // get all products route
router.get('/customers', getCustomers)      // get all customers route

export default router;     