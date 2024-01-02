/* IMPORT FILES */
import express from 'express';
import {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography
} from '../controllers/client.js';

// routes from express application
const router = express.Router();

router.get('/products', getProducts);       // get all products route
router.get('/customers', getCustomers)      // get all customers route
router.get('/transactions', getTransactions); // get transactions route
router.get('/geography', getGeography);         // get geography route
export default router;     