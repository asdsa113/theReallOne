# Quick Setup Guide

## Step 1: Get TMDB API Key

1. Go to https://www.themoviedb.org/signup
2. Create a free account
3. Go to Settings > API
4. Request an API key (choose "Developer" option)
5. Copy your API key

## Step 2: Configure Environment

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Edit `.env` and add your TMDB API key:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vel-streaming
TMDB_API_KEY=your_actual_api_key_here
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Application

### Without MongoDB (Recommended for Quick Start)
```bash
npm run dev
```

The watchlist will use localStorage instead of MongoDB.

### With MongoDB (Optional)
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB:
   - Windows: `mongod --dbpath C:\data\db`
   - Mac/Linux: `mongod --dbpath /data/db`
3. Run the app:
```bash
npm run dev
```

## Step 5: Access the Application

Open your browser and go to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:
1. Change PORT in `.env` for backend
2. Change port in `vite.config.js` for frontend

### TMDB API Errors
- Make sure your API key is valid
- Check if you've exceeded the rate limit (40 requests per 10 seconds)
- Verify the API key is correctly added to `.env`

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check the connection string in `.env`
- Or just use localStorage (app works without MongoDB)

## Production Build

1. Build the frontend:
```bash
npm run build
```

2. Serve the production build:
```bash
npm run preview
```

## Features to Test

1. **Home Page**: See trending movies and TV shows
2. **Search**: Try searching for "Avengers" or "Breaking Bad"
3. **Player**: Click any movie/TV show to watch
4. **Source Switching**: Try different embed sources in the player
5. **Watchlist**: Add items and check the Watchlist page
6. **Genres**: Browse Action, Comedy, etc. from the sidebar
7. **Years**: Filter content by year from the sidebar
8. **TV Shows**: Watch episodes with season/episode selector

## Notes

- The app will work without MongoDB (uses localStorage for watchlist)
- Embed sources may have regional restrictions
- Some sources might be slower than others
- TMDB API is free but rate-limited
- All video content is embedded from third-party sources

