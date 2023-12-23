// import all dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

// allow setting of paths for configured directories
import { fileURLToPath } from 'url';

// controller files
import { register } from './controllers/auth.js';

// authentication router folder
import authRoutes from './routes.auth.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);  // to grab file url when using modules
const __dirname = path.dirname(__filename); // when using type modules

dotenv.config();

// invoke express application
const app = express();

app.use(express.json());    // express middleware that parses JSON requests
app.use(helmet());  // add helmet to middleware stack
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));  // blocks third party from using your resources from a cross origin
app.use(morgan("common"));  // for logging requests, errors into the console
app.use(bodyParser.json({ limit: "30mb", extended: true }));    // return middleware that only parses json 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));      // return middleware with url encoded parsed bodies
app.use(cors())     // add cors to middleware stack
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));  // sets the directory of all packages


/* FILE STORAGE */
// stores inputted files into the "public/assets" directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// variable to upload files
const upload = multer({ storage });

/* ROUTES WITH FILES */

// route through "auth/register", upload middleware, then register information
app.post("/auth/register", upload.single("picture", register));

/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */ 
const PORT = process.env.PORT || 6001;

// documented mongoose set up
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));