import express from 'express';
import { search, getGenres } from '../services/tmdb.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q, type = 'multi', page = 1 } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    const data = await search(q, type, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/genres/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const data = await getGenres(type);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

