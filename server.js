import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import adminRouter from './api/admin.js';
import clientRouter from './api/client.js';
import serviceRouter from './api/service.js';
import procedureRouter from './api/procedure.js';

const app = express();

const ALLOWED_URLS = process.env.ALLOWED_URLS.split(',');
const DEV_MODE = process.env.DEV_MODE === 'true';

const corsOptions = {
    origin: (origin, callback) => {
        if ((DEV_MODE && !origin) || ALLOWED_URLS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}

app.use(logger('tiny'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/admin', adminRouter);
app.use('/api/clients', clientRouter);
app.use('/api/services', serviceRouter);
app.use('/api/procedures', procedureRouter);

app.use((_, res, __) => {
    return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/...',
        data: 'Not Found'
    })
})

app.use((error, _, res, __) => {
    const { status = 500, message = 'Internal Server Error' } = error;
    return res.status(status).json({ status, message });
})

const { PORT = 3000, DB_HOST } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database connection successful');
        })
    })
    .catch(error => {
        console.log(`Error database connection: ${error.message}`);
        process.exit(1);
    })