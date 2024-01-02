/* IMPORT DEPENDENCIES */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

/* IMPORT ROUTES */
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* DATA IMPORTS */
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';

import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
} from './data/index.js'  // mock data

/* CONFIGURATIONS */

// configure dotenv file with project
dotenv.config();

// expres app
const app = express();

// intialise app features
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/clients', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, console.log(`Server Port: ${PORT}`));
        
        /* ONLY INSERT DATA ONCE */
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // User.insertMany(dataUser);
        // Transaction.insertMany(dataTransaction);
        // OverallStat.insertMany(dataOverallStat);
    }).catch((err) => console.log(`${err} did not connect.`));
