# VEL Streaming - Movie & TV Aggregator

A full-stack streaming aggregator platform built with React, Node.js, Express, and MongoDB. Browse and watch movies and TV shows from multiple embed sources with a modern, responsive UI.

## Features

- **Home Page**: Trending movies/TV shows in grid layout with hero carousel
- **Search**: Real-time search across all content
- **Categories**: Browse by Movies, TV Shows, Genres (Action, Comedy, Horror, etc.), and Years
- **Multi-Source Player**: 8 embed sources with quality selector
- **Watchlist**: Save favorites locally (no authentication required)
- **Responsive Design**: Mobile-first dark theme with smooth animations
- **Smart Navigation**: Sidebar with quick access to genres and years

## Embed Sources Integrated

- VidNest (https://vidnest.fun)
- 111Movies (https://111movies.com)
- MoviesAPI (https://moviesapi.club)
- VidSrc (https://vidsrc.me)
- VidFast (https://vidfast.pro)
- Videasy (https://www.videasy.net)
- VidLink (https://vidlink.pro)
- NonTongo (https://nontongo.win)

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Tailwind CSS
- Swiper (carousel)
- React Icons
- Axios

**Backend:**
- Node.js
- Express
- MongoDB (optional - for user data)
- TMDB API (movie metadata)

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (optional)
- TMDB API Key (free from https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vel
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vel-streaming
TMDB_API_KEY=your_tmdb_api_key_here
```

Get your TMDB API key from: https://www.themoviedb.org/settings/api

4. **Start MongoDB** (optional - only if you want to use database features)
```bash
mongod
```

5. **Run the application**
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:3000

## Project Structure

```
vel/
├── server/
│   ├── index.js              # Express server entry
│   ├── routes/
│   │   ├── movies.js         # Movie endpoints
│   │   ├── tv.js             # TV show endpoints
│   │   ├── search.js         # Search endpoints
│   │   └── proxy.js          # CORS proxy
│   ├── services/
│   │   └── tmdb.js           # TMDB API integration
│   └── models/
│       └── Watchlist.js      # MongoDB schema
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # Main layout wrapper
│   │   ├── Header.jsx        # Top navigation
│   │   ├── Sidebar.jsx       # Side navigation
│   │   ├── Footer.jsx        # Footer links
│   │   ├── MediaCard.jsx     # Movie/TV card
│   │   ├── MediaGrid.jsx     # Grid container
│   │   ├── Carousel.jsx      # Hero carousel
│   │   └── Loading.jsx       # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx          # Homepage
│   │   ├── Movies.jsx        # Movies page
│   │   ├── TVShows.jsx       # TV shows page
│   │   ├── Search.jsx        # Search results
│   │   ├── Player.jsx        # Video player
│   │   ├── Watchlist.jsx     # User watchlist
│   │   ├── Genre.jsx         # Genre browsing
│   │   └── Year.jsx          # Year browsing
│   ├── utils/
│   │   └── api.js            # API client
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Endpoints

### Movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/:id` - Movie details
- `GET /api/movies/genre/:genreId` - Movies by genre
- `GET /api/movies/year/:year` - Movies by year

### TV Shows
- `GET /api/tv/trending` - Trending TV shows
- `GET /api/tv/popular` - Popular TV shows
- `GET /api/tv/top-rated` - Top rated TV shows
- `GET /api/tv/:id` - TV show details
- `GET /api/tv/:id/season/:seasonNumber` - Season details
- `GET /api/tv/genre/:genreId` - TV shows by genre
- `GET /api/tv/year/:year` - TV shows by year

### Search
- `GET /api/search?q=query&type=multi` - Search content
- `GET /api/search/genres/:type` - Get genres

## Features Detail

### Watchlist
Uses localStorage for client-side storage. No authentication required. Data persists across sessions.

### Player Sources
Each source is embedded via iframe. The player page allows:
- Switching between 8 different embed sources
- Season/episode selection for TV shows
- Quality options (depends on embed source)
- Similar content recommendations

### Search
Real-time search across:
- Movies
- TV Shows
- Filter by type (All/Movies/TV)

### Categories
Browse by:
- **Genres**: Action, Comedy, Drama, Horror, Romance, Sci-Fi, Thriller, Animation
- **Years**: 2024, 2023, 2022, 2021, 2020 (customizable)

## Customization

### Add More Genres
Edit `src/components/Sidebar.jsx` and add genre IDs from TMDB.

### Add More Years
Edit `src/components/Sidebar.jsx` and add years to the array.

### Add More Embed Sources
Edit `src/pages/Player.jsx` and add source objects to the `sources` array.

### Change Theme Colors
Edit `tailwind.config.js` to customize the color scheme.

## Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

## Notes

- Embed sources may require CORS handling via the proxy endpoint
- Some sources may have regional restrictions
- TMDB API has rate limits (check their documentation)
- MongoDB is optional - watchlist uses localStorage by default

## License

MIT

## Credits

- Movie data from The Movie Database (TMDB)
- Embed sources from various providers
- UI inspired by modern streaming platforms

