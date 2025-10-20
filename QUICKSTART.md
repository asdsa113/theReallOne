# Quick Start Guide - 5 Minutes Setup

## 1. Get TMDB API Key (2 minutes)
1. Visit https://www.themoviedb.org/signup
2. Sign up for free
3. Go to Settings → API → Request API Key
4. Choose "Developer" and fill the form
5. Copy your API key

## 2. Setup Project (1 minute)
```bash
# Clone or navigate to project
cd vel

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## 3. Configure (30 seconds)
Edit `.env` file and add your TMDB API key:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vel-streaming
TMDB_API_KEY=paste_your_key_here
```

## 4. Run (30 seconds)
```bash
npm run dev
```

## 5. Access (30 seconds)
Open browser: http://localhost:3000

## That's it! 🎉

### What You Get:
- ✅ Trending movies & TV shows
- ✅ Search functionality
- ✅ 8 embed sources
- ✅ Genre browsing
- ✅ Watchlist
- ✅ Responsive design
- ✅ Dark theme

### Quick Test:
1. Search for "Avengers"
2. Click any movie
3. Try different embed sources
4. Add to watchlist
5. Browse genres from sidebar

### No MongoDB?
No problem! The app works without MongoDB. Watchlist uses localStorage.

### Need Help?
- Check README.md for detailed docs
- See SETUP.md for troubleshooting
- Open an issue on GitHub

### Next Steps:
- Customize genres in `src/components/Sidebar.jsx`
- Add more years
- Modify theme colors in `tailwind.config.js`
- Deploy to production (see DEPLOYMENT.md)

Enjoy! 🎬

