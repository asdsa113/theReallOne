import express from 'express';
import { getTrending, getPopular, getTopRated, getDetails, getByGenre, getByYear, getSeasonDetails } from '../services/tmdb.js';

const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const data = await getTrending('tv', 'week');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await getPopular('tv', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-rated', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await getTopRated('tv', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/genre/:genreId', async (req, res) => {
  try {
    const { genreId } = req.params;
    const { page = 1 } = req.query;
    const data = await getByGenre('tv', genreId, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const { page = 1 } = req.query;
    const data = await getByYear('tv', year, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetails('tv', id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/season/:seasonNumber', async (req, res) => {
  try {
    const { id, seasonNumber } = req.params;
    const data = await getSeasonDetails(id, seasonNumber);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

