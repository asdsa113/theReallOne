import { Link } from 'react-router-dom'
import { FiPlay, FiPlus, FiCheck } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useWatchlist } from '../hooks/useWatchlist'

const MediaCard = ({ item, type }) => {
  const [showRatings, setShowRatings] = useState(true)
  const { toggleWatchlist, isInWatchlist, loading } = useWatchlist()
  const mediaType = type || item.media_type || (item.first_air_date ? 'tv' : 'movie')
  const title = item.title || item.name
  const releaseDate = item.release_date || item.first_air_date
  const posterPath = item.poster_path && item.poster_path !== 'null'
    ? (item.poster_path.startsWith('http') ? item.poster_path : `https://image.tmdb.org/t/p/w500${item.poster_path}`)
    : '/placeholder.jpg'

  const isInWatchlistState = isInWatchlist(item.id)

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}')
    setShowRatings(settings.showRatings !== false)
  }, [])

  const handleToggleWatchlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    await toggleWatchlist({
      id: item.id,
      title,
      poster: item.poster_path,
      type: mediaType,
      releaseDate
    })
  }

  return (
    <Link to={`/watch/${mediaType}/${item.id}`} className="card group">
      <div className="relative aspect-[2/3]">
        <img 
          src={posterPath}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/placeholder.jpg'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <FiPlay className="text-2xl ml-1" />
            </div>
            
                <button
                  onClick={handleToggleWatchlist}
                  disabled={loading}
                  className="px-4 py-2 bg-dark-card/90 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Loading...</span>
                    </>
                  ) : isInWatchlistState ? (
                    <>
                      <FiCheck className="text-green-500" />
                      <span className="text-sm">In Watchlist</span>
                    </>
                  ) : (
                    <>
                      <FiPlus />
                      <span className="text-sm">Watchlist</span>
                    </>
                  )}
                </button>
          </div>
        </div>

        {showRatings && item.vote_average > 0 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded-lg text-xs font-semibold">
            ⭐ {item.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold truncate">{title}</h3>
        {releaseDate && (
          <p className="text-sm text-gray-400 mt-1">
            {new Date(releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  )
}

export default MediaCard

