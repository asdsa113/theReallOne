import express from 'express';
import { getTrending, getPopular, getTopRated, getDetails, getByGenre, getByYear } from '../services/tmdb.js';

const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const data = await getTrending('movie', 'week');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await getPopular('movie', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-rated', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await getTopRated('movie', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/genre/:genreId', async (req, res) => {
  try {
    const { genreId } = req.params;
    const { page = 1 } = req.query;
    const data = await getByGenre('movie', genreId, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const { page = 1 } = req.query;
    const data = await getByYear('movie', year, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetails('movie', id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

