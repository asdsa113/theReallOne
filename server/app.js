import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './routes/movies.js';
import tvRouter from './routes/tv.js';
import searchRouter from './routes/search.js';
import proxyRouter from './routes/proxy.js';
import ensureMongoConnection from './config/mongo.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Ensure Mongo connection when running in environments that want it
ensureMongoConnection();

app.use('/api/movies', moviesRouter);
app.use('/api/tv', tvRouter);
app.use('/api/search', searchRouter);
app.use('/api/proxy', proxyRouter);

export default app;
