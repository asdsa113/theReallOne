# Project Structure

## Root Directory
```
vel/
├── server/                 # Backend application
├── src/                    # Frontend application
├── public/                 # Static assets
├── dist/                   # Production build
├── node_modules/           # Dependencies
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── index.html             # HTML entry point
└── README.md              # Main documentation
```

## Backend Structure
```
server/
├── index.js               # Express server entry
├── routes/
│   ├── movies.js          # Movie endpoints
│   ├── tv.js              # TV show endpoints
│   ├── search.js          # Search endpoints
│   └── proxy.js           # CORS proxy
├── services/
│   └── tmdb.js            # TMDB API integration
├── models/
│   └── Watchlist.js       # MongoDB schema
└── config/
    └── tmdb.js            # TMDB configuration
```

### Backend Files Explained

#### `server/index.js`
Main Express server setup, middleware configuration, and route mounting.

#### `server/routes/movies.js`
Handles all movie-related endpoints:
- `/trending` - Get trending movies
- `/popular` - Get popular movies
- `/top-rated` - Get top-rated movies
- `/:id` - Get movie details
- `/genre/:genreId` - Get movies by genre
- `/year/:year` - Get movies by year

#### `server/routes/tv.js`
Handles all TV show-related endpoints:
- `/trending` - Get trending TV shows
- `/popular` - Get popular TV shows
- `/top-rated` - Get top-rated TV shows
- `/:id` - Get TV show details
- `/:id/season/:seasonNumber` - Get season details
- `/genre/:genreId` - Get TV shows by genre
- `/year/:year` - Get TV shows by year

#### `server/routes/search.js`
Handles search functionality:
- `/` - Search movies and TV shows
- `/genres/:type` - Get genre list

#### `server/routes/proxy.js`
CORS proxy for embed sources.

#### `server/services/tmdb.js`
TMDB API integration with helper functions.

## Frontend Structure
```
src/
├── components/            # Reusable components
│   ├── Layout.jsx         # Main layout wrapper
│   ├── Header.jsx         # Top navigation
│   ├── Sidebar.jsx        # Side navigation
│   ├── Footer.jsx         # Footer component
│   ├── MediaCard.jsx      # Movie/TV card
│   ├── MediaGrid.jsx      # Grid container
│   ├── Carousel.jsx       # Hero carousel
│   └── Loading.jsx        # Loading spinner
├── pages/                 # Page components
│   ├── Home.jsx           # Homepage
│   ├── Movies.jsx         # Movies page
│   ├── TVShows.jsx        # TV shows page
│   ├── Search.jsx         # Search results
│   ├── Player.jsx         # Video player
│   ├── Watchlist.jsx      # User watchlist
│   ├── Genre.jsx          # Genre browsing
│   └── Year.jsx           # Year browsing
├── utils/                 # Utility functions
│   ├── api.js             # API client
│   ├── embedSources.js    # Embed source config
│   ├── genres.js          # Genre definitions
│   └── helpers.js         # Helper functions
├── hooks/                 # Custom React hooks
│   ├── useWatchlist.js    # Watchlist hook
│   └── useDebounce.js     # Debounce hook
├── App.jsx                # Router setup
├── main.jsx               # Entry point
└── index.css              # Global styles
```

### Frontend Files Explained

#### Components

**`Layout.jsx`**
Main layout wrapper that includes Header, Sidebar, and Footer. Manages sidebar open/close state.

**`Header.jsx`**
- Search bar
- Logo
- Watchlist icon
- Mobile menu button
- Sticky positioning with scroll effect

**`Sidebar.jsx`**
- Navigation menu
- Genre list
- Year filter
- Collapsible on mobile
- Active route highlighting

**`Footer.jsx`**
- Quick links
- Categories
- Legal links
- Copyright info

**`MediaCard.jsx`**
- Movie/TV show card
- Poster image
- Rating badge
- Watchlist button
- Hover effects

**`MediaGrid.jsx`**
- Responsive grid layout
- 2-6 columns based on screen size
- Empty state handling

**`Carousel.jsx`**
- Auto-playing slideshow
- Navigation arrows
- Pagination dots
- Backdrop images
- Call-to-action buttons

**`Loading.jsx`**
- Spinner animation
- Loading state indicator

#### Pages

**`Home.jsx`**
- Hero carousel
- Trending movies section
- Trending TV shows section
- Popular movies section

**`Movies.jsx`**
- Popular/Top-rated toggle
- Movie grid
- Filter controls

**`TVShows.jsx`**
- Popular/Top-rated toggle
- TV show grid
- Filter controls

**`Search.jsx`**
- Search results grid
- Type filter (All/Movies/TV)
- Empty state handling

**`Player.jsx`**
- Video embed player
- Source selector
- Season/episode picker
- Movie/TV details
- Watchlist toggle
- Similar content

**`Watchlist.jsx`**
- User's saved items
- Grid layout
- Empty state

**`Genre.jsx`**
- Genre-specific content
- Movie or TV filter
- Paginated results

**`Year.jsx`**
- Year-specific content
- Movie or TV filter
- Paginated results

#### Utils

**`api.js`**
Axios client with base URL configuration and API methods.

**`embedSources.js`**
Configuration for all 8 embed sources with URL generators.

**`genres.js`**
Genre definitions for movies and TV shows with icons.

**`helpers.js`**
Helper functions for formatting, sorting, and data manipulation.

#### Hooks

**`useWatchlist.js`**
Custom hook for watchlist management with localStorage.

**`useDebounce.js`**
Custom hook for debouncing values (used in search).

## Configuration Files

### `package.json`
Dependencies and npm scripts:
- `dev` - Run both frontend and backend
- `server` - Run backend only
- `client` - Run frontend only
- `build` - Build for production
- `preview` - Preview production build

### `vite.config.js`
Vite configuration:
- React plugin
- Dev server port (3000)
- Proxy to backend (/api → localhost:5000)

### `tailwind.config.js`
Tailwind CSS configuration:
- Content paths
- Custom colors (dark theme)
- Theme extensions

### `postcss.config.js`
PostCSS configuration for Tailwind CSS.

### `.env`
Environment variables (not tracked in git):
- PORT
- MONGODB_URI
- TMDB_API_KEY

### `.gitignore`
Files to ignore in git:
- node_modules
- dist
- .env
- logs
- .vite

## Data Flow

### 1. User Request
User interacts with frontend component

### 2. API Call
Component uses `api.js` to make request

### 3. Proxy
Vite dev server proxies to backend

### 4. Backend Route
Express router handles request

### 5. TMDB Service
Backend calls TMDB API

### 6. Response
Data flows back through chain to component

### 7. Render
Component updates UI with data

## State Management

### Local State
- Component-specific state with useState
- Loading states
- Form inputs
- UI toggles

### Global State
- Watchlist in localStorage
- Search query in URL params
- User preferences

## Routing

React Router v6 with routes:
- `/` - Home
- `/movies` - Movies page
- `/tv` - TV shows page
- `/search?q=query` - Search results
- `/watch/:type/:id` - Player page
- `/watchlist` - User watchlist
- `/genre/:type/:id` - Genre page
- `/year/:type/:year` - Year page

## Styling

### Tailwind CSS
Utility-first CSS framework

### Custom Classes
- `.btn-primary`
- `.btn-secondary`
- `.card`
- `.input-field`

### Responsive Breakpoints
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px

## Build Process

### Development
1. Vite dev server for frontend
2. Nodemon for backend
3. Concurrent execution

### Production
1. Vite builds frontend to `dist/`
2. Backend serves from `dist/`
3. Single Node.js process

## Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Express** - Backend
- **Axios** - HTTP client
- **React Router** - Routing
- **Swiper** - Carousel
- **MongoDB** - Database (optional)
- **TMDB API** - Movie data

## Best Practices Used

- Component composition
- Custom hooks for logic reuse
- Utility functions for common operations
- Environment variables for secrets
- Responsive design
- Loading states
- Error handling
- Code organization
- Clean architecture
- RESTful API design

