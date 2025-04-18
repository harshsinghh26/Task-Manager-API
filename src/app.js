import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: process.env.CORS_URL, credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());
app.use(express.static('public'));

import router from './routes/user.routes.js';

app.use('/api/v1/users', router);

import taskrouter from './routes/task.routes.js';

app.use('/api/v1/task', taskrouter);

export default app;
