# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Movies Endpoints

### GET /movies/trending
Get trending movies of the week.

**Response:**
```json
{
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "poster_path": "/path.jpg",
      "backdrop_path": "/backdrop.jpg",
      "overview": "Movie description...",
      "release_date": "2024-01-01",
      "vote_average": 8.5,
      "genre_ids": [28, 12]
    }
  ],
  "page": 1,
  "total_pages": 100
}
```

### GET /movies/popular
Get popular movies.

### GET /movies/top-rated
Get top-rated movies.

### GET /movies/:id
Get detailed information about a specific movie.

**Parameters:**
- `id` (required) - TMDB movie ID

**Response:**
```json
{
  "id": 123,
  "title": "Movie Title",
  "overview": "Description...",
  "runtime": 120,
  "release_date": "2024-01-01",
  "genres": [
    { "id": 28, "name": "Action" }
  ],
  "vote_average": 8.5,
  "videos": {
    "results": []
  },
  "credits": {
    "cast": [],
    "crew": []
  },
  "similar": {
    "results": []
  }
}
```

### GET /movies/genre/:genreId
Get movies by genre.

**Parameters:**
- `genreId` (required) - Genre ID
- `page` (optional) - Page number (default: 1)

### GET /movies/year/:year
Get movies by release year.

**Parameters:**
- `year` (required) - Release year (e.g., 2024)
- `page` (optional) - Page number (default: 1)

## TV Shows Endpoints

### GET /tv/trending
Get trending TV shows of the week.

### GET /tv/popular
Get popular TV shows.

### GET /tv/top-rated
Get top-rated TV shows.

### GET /tv/:id
Get detailed information about a specific TV show.

**Parameters:**
- `id` (required) - TMDB TV show ID

**Response:**
```json
{
  "id": 456,
  "name": "TV Show Title",
  "overview": "Description...",
  "first_air_date": "2024-01-01",
  "number_of_seasons": 5,
  "number_of_episodes": 50,
  "seasons": [
    {
      "id": 1,
      "season_number": 1,
      "episode_count": 10
    }
  ],
  "genres": [],
  "vote_average": 8.5,
  "similar": {
    "results": []
  }
}
```

### GET /tv/:id/season/:seasonNumber
Get detailed information about a specific season.

**Parameters:**
- `id` (required) - TMDB TV show ID
- `seasonNumber` (required) - Season number

**Response:**
```json
{
  "id": 789,
  "season_number": 1,
  "name": "Season 1",
  "overview": "Season description...",
  "episodes": [
    {
      "id": 1001,
      "episode_number": 1,
      "name": "Episode Title",
      "overview": "Episode description...",
      "air_date": "2024-01-01",
      "still_path": "/still.jpg"
    }
  ]
}
```

### GET /tv/genre/:genreId
Get TV shows by genre.

**Parameters:**
- `genreId` (required) - Genre ID
- `page` (optional) - Page number (default: 1)

### GET /tv/year/:year
Get TV shows by first air year.

**Parameters:**
- `year` (required) - First air year
- `page` (optional) - Page number (default: 1)

## Search Endpoints

### GET /search
Search for movies and TV shows.

**Parameters:**
- `q` (required) - Search query
- `type` (optional) - Type filter: 'multi', 'movie', 'tv' (default: 'multi')

**Example:**
```
GET /api/search?q=avengers&type=movie
```

**Response:**
```json
{
  "results": [
    {
      "id": 123,
      "media_type": "movie",
      "title": "The Avengers",
      "poster_path": "/path.jpg",
      "overview": "Description...",
      "release_date": "2012-05-04"
    }
  ],
  "page": 1,
  "total_results": 50
}
```

### GET /search/genres/:type
Get list of genres for movies or TV shows.

**Parameters:**
- `type` (required) - 'movie' or 'tv'

**Response:**
```json
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 35, "name": "Comedy" }
  ]
}
```

## Proxy Endpoints

### GET /proxy/embed
Proxy endpoint for embed sources (CORS handling).

**Parameters:**
- `url` (required) - URL to proxy

**Example:**
```
GET /api/proxy/embed?url=https://example.com/embed/123
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Query parameter required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message description"
}
```

## Rate Limits

TMDB API has the following limits:
- 40 requests per 10 seconds
- 10,000 requests per day

## Image URLs

### Poster Images
```
https://image.tmdb.org/t/p/{size}{poster_path}
```

Sizes: w92, w154, w185, w342, w500, w780, original

### Backdrop Images
```
https://image.tmdb.org/t/p/{size}{backdrop_path}
```

Sizes: w300, w780, w1280, original

### Profile Images
```
https://image.tmdb.org/t/p/{size}{profile_path}
```

Sizes: w45, w185, h632, original

## Embed Source URLs

### VidNest
- Movie: `https://vidnest.fun/movie/{tmdb_id}`
- TV: `https://vidnest.fun/tv/{tmdb_id}/{season}/{episode}`

### 111Movies
- Movie: `https://111movies.com/movie/{imdb_id}`
- TV: `https://111movies.com/tv/{imdb_id}/{season}/{episode}`

### MoviesAPI
- Movie: `https://moviesapi.club/movie/{tmdb_id}`
- TV: `https://moviesapi.club/tv/{tmdb_id}-{season}-{episode}`

### VidSrc
- Movie: `https://vidsrc.me/embed/movie/{tmdb_id}`
- TV: `https://vidsrc.me/embed/tv/{tmdb_id}/{season}/{episode}`

### VidFast
- Movie: `https://vidfast.pro/embed/movie/{tmdb_id}`
- TV: `https://vidfast.pro/embed/tv/{tmdb_id}/{season}/{episode}`

### Videasy
- Movie: `https://www.videasy.net/embed/movie/{tmdb_id}`
- TV: `https://www.videasy.net/embed/tv/{tmdb_id}/{season}/{episode}`

### VidLink
- Movie: `https://vidlink.pro/movie/{tmdb_id}`
- TV: `https://vidlink.pro/tv/{tmdb_id}/{season}/{episode}`

### NonTongo
- Movie: `https://nontongo.win/embed/movie/{tmdb_id}`
- TV: `https://nontongo.win/embed/tv/{tmdb_id}/{season}/{episode}`

## Frontend API Client

The frontend uses Axios with a base URL of `/api`. All requests are automatically proxied through Vite dev server.

```javascript
import api from './utils/api'

const data = await api.get('/movies/trending')
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Testing

Use tools like:
- Postman
- Insomnia
- curl
- Browser DevTools

Example with curl:
```bash
curl http://localhost:5000/api/movies/trending
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Headers

### Request Headers
```
Content-Type: application/json
```

### Response Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

