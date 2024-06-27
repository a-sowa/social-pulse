import express from 'express';
import dotenv from 'dotenv';
import mongoose from './config/db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as authMiddleware from './middleware/auth.middleware.js';
import cors from 'cors';

dotenv.config({ path: './config/.env' });
const app = express();

// CORS
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }

  app.use(cors(corsOptions));

// Body Parser & Cookie Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// JSON Web Token
app.get('*', authMiddleware.checkUser);
app.get('/jwtid', authMiddleware.requireAuth, (req, res) => {
    res.status(200).send(res.locals.user.id)
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Server
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);