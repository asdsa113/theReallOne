import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import moviesRouter from './routes/movies.js';
import tvRouter from './routes/tv.js';
import searchRouter from './routes/search.js';
import proxyRouter from './routes/proxy.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
}

app.use('/api/movies', moviesRouter);
app.use('/api/tv', tvRouter);
app.use('/api/search', searchRouter);
app.use('/api/proxy', proxyRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
