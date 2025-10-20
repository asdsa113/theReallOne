import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/embed', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter required' });
    }
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

