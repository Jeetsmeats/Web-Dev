// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// import router
import postRoutes from './routes/posts.js';

// initialise app
const app = express();

// connect to dotenv
dotenv.config();

// post routes start from "/post"
app.use('/posts', postRoutes);

// forces the application to only use json
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// selects complex algorithm to decode encoded data
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// allows for cross origin sharing (between different ports and domains)
app.use(cors());

// port number from env file
const PORT = process.env.PORT || 5000;

// mongodb connection string from env file
const CONNECTION_URL = process.env.CONNECTION_URL;

// connects to the mongodb database
mongoose.connect(CONNECTION_URL, { })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });


