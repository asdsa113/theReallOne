import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails, getTVDetails, getTVSeasonDetails } from '../utils/api'
import { FiPlay, FiPlus, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { addToWatchlist, removeFromWatchlist, isInWatchlist, saveWatchProgress, getWatchProgress } from '../lib/supabase'
import Loading from '../components/Loading'
import MediaGrid from '../components/MediaGrid'
import CastSection from '../components/CastSection'
import { embedSources, getEmbedUrl } from '../utils/embedSources'

const Player = () => {
  const { type, id } = useParams()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}')
    return settings.defaultServer || 'vidnest'
  })
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [showEpisodeChange, setShowEpisodeChange] = useState(false)
  const [watchlistLoading, setWatchlistLoading] = useState(false)
  const isInitialMount = useRef(true)
  const { user } = useAuth()

  const sources = embedSources

  useEffect(() => {
    isInitialMount.current = true
    
    const fetchDetails = async () => {
      setLoading(true)
      try {
        const res = type === 'movie' 
          ? await getMovieDetails(id)
          : await getTVDetails(id)
        setDetails(res.data)

        // Check watchlist status
        if (user) {
          // Use Supabase for authenticated users
          try {
            const { data } = await isInWatchlist(user.id, parseInt(id))
            setIsInWatchlist(data)
          } catch (error) {
            console.error('Error checking watchlist status:', error)
            setIsInWatchlist(false)
          }
        } else {
          // Use localStorage for non-authenticated users
          const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
          setIsInWatchlist(watchlist.some(w => w.id === parseInt(id)))
        }

        if (type === 'tv') {
          const watchProgress = JSON.parse(localStorage.getItem('watchProgress') || '{}')
          const saved = watchProgress[id]
          if (saved) {
            setSelectedSeason(saved.season)
            setSelectedEpisode(saved.episode)
          } else {
            setSelectedSeason(1)
            setSelectedEpisode(1)
          }
        }
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [type, id])

  useEffect(() => {
    if (type === 'tv') {
      const fetchEpisodes = async () => {
        try {
          const res = await getTVSeasonDetails(id, selectedSeason)
          setEpisodes(res.data.episodes || [])
        } catch (error) {
          console.error('Error fetching episodes:', error)
        }
      }
      fetchEpisodes()
    }
  }, [type, id, selectedSeason])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (type === 'tv' && details) {
      const watchProgress = JSON.parse(localStorage.getItem('watchProgress') || '{}')
      watchProgress[id] = {
        season: selectedSeason,
        episode: selectedEpisode,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('watchProgress', JSON.stringify(watchProgress))
    }
  }, [type, id, selectedSeason, selectedEpisode, details])

  const toggleWatchlist = async () => {
    if (watchlistLoading) return
    setWatchlistLoading(true)

    try {
      if (user) {
        // Use Supabase for authenticated users
        if (isInWatchlist) {
          await removeFromWatchlist(user.id, parseInt(id))
          setIsInWatchlist(false)
        } else {
          await addToWatchlist(user.id, {
            id: parseInt(id),
            title: details.title || details.name,
            poster: details.poster_path,
            type: type,
            releaseDate: details.release_date || details.first_air_date
          })
          setIsInWatchlist(true)
        }
      } else {
        // Use localStorage for non-authenticated users
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
        
        if (isInWatchlist) {
          const updated = watchlist.filter(w => w.id !== parseInt(id))
          localStorage.setItem('watchlist', JSON.stringify(updated))
          setIsInWatchlist(false)
        } else {
          watchlist.push({
            id: parseInt(id),
            title: details.title || details.name,
            poster: details.poster_path,
            type: type,
            releaseDate: details.release_date || details.first_air_date,
            addedAt: new Date().toISOString()
          })
          localStorage.setItem('watchlist', JSON.stringify(watchlist))
          setIsInWatchlist(true)
        }
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error)
    } finally {
      setWatchlistLoading(false)
    }
  }

  const goToNextEpisode = () => {
    if (type !== 'tv' || !episodes.length) return
    
    if (selectedEpisode < episodes.length) {
      setSelectedEpisode(selectedEpisode + 1)
      setShowEpisodeChange(true)
      setTimeout(() => setShowEpisodeChange(false), 2000)
    } else if (details.seasons) {
      const currentSeasonIndex = details.seasons.findIndex(s => s.season_number === selectedSeason)
      const nextSeason = details.seasons[currentSeasonIndex + 1]
      if (nextSeason && nextSeason.season_number > 0) {
        setSelectedSeason(nextSeason.season_number)
        setSelectedEpisode(1)
        setShowEpisodeChange(true)
        setTimeout(() => setShowEpisodeChange(false), 2000)
      }
    }
  }

  const goToPreviousEpisode = () => {
    if (type !== 'tv' || !episodes.length) return
    
    if (selectedEpisode > 1) {
      setSelectedEpisode(selectedEpisode - 1)
      setShowEpisodeChange(true)
      setTimeout(() => setShowEpisodeChange(false), 2000)
    } else if (selectedSeason > 1) {
      setSelectedSeason(selectedSeason - 1)
      setShowEpisodeChange(true)
      setTimeout(() => setShowEpisodeChange(false), 2000)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (type === 'tv') {
        if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
          goToNextEpisode()
        } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
          goToPreviousEpisode()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [type, selectedEpisode, selectedSeason, episodes, details])

  const currentEmbedUrl = getEmbedUrl(selectedSource, type, id, selectedSeason, selectedEpisode)

  if (loading) return <Loading />
  if (!details) return <div>Not found</div>

  const title = details.title || details.name
  const hasPoster = details.poster_path && details.poster_path !== 'null'
  const posterPath = hasPoster
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : '/placeholder.jpg'
  const backdropPath = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null
  const releaseYear = details.release_date || details.first_air_date 
    ? new Date(details.release_date || details.first_air_date).getFullYear() 
    : null

  return (
    <div className="relative">
      {showEpisodeChange && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <FiPlay className="text-2xl animate-pulse" />
            <div>
              <p className="font-bold text-lg">Loading Episode</p>
              <p className="text-sm opacity-90">Season {selectedSeason} • Episode {selectedEpisode}</p>
            </div>
          </div>
        </div>
      )}

      {backdropPath && (
        <div className="relative -mx-4 md:-mx-6 lg:-mx-8 mb-8 h-64 md:h-80">
          <img
            src={backdropPath}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-lg overflow-hidden mb-6">
            <div className="aspect-video">
              <iframe
                src={currentEmbedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
            
            {type === 'tv' && episodes.length > 0 && (
              <div className="p-4 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-dark-card">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={goToPreviousEpisode}
                    disabled={selectedEpisode === 1 && selectedSeason === 1}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-hover hover:bg-gray-700 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed font-semibold hover:scale-105 active:scale-95"
                  >
                    <FiChevronLeft className="text-xl" />
                    <span>Previous Ep</span>
                  </button>
                  
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500 mb-1">Currently Watching</p>
                    <p className="text-xl font-bold text-red-500">S{selectedSeason} E{selectedEpisode}</p>
                    <p className="text-xs text-gray-400 mt-2 bg-dark-bg/50 px-3 py-1 rounded inline-block">
                      ⌨️ Use Arrow Keys or N/P
                    </p>
                  </div>
                  
                  <button
                    onClick={goToNextEpisode}
                    disabled={selectedEpisode === episodes.length && selectedSeason === details.seasons.filter(s => s.season_number > 0).length}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed font-semibold hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
                  >
                    <span>Next Episode</span>
                    <FiChevronRight className="text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-dark-card rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Select Source</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedSource === source.id ? 'bg-red-600' : 'bg-dark-hover hover:bg-gray-700'
                  }`}
                >
                  {source.name}
                </button>
              ))}
            </div>
            <p className="text-sm text-yellow-500 flex items-center gap-2">
              <span>Servers 2-4 may have popup ads!</span>
            </p>
          </div>

          {/* Cast & Crew Section - Moved here */}
          {details.credits && (details.credits.cast || details.credits.crew) && (
            <CastSection 
              cast={details.credits.cast} 
              crew={details.credits.crew} 
            />
          )}

          {type === 'tv' && details.seasons && (
            <div className="bg-dark-card rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Seasons & Episodes</h3>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {details.seasons
                    .filter(s => s.season_number > 0)
                    .map(season => (
                      <button
                        key={season.id}
                        onClick={() => {
                          setSelectedSeason(season.season_number)
                          setSelectedEpisode(1)
                        }}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.season_number
                            ? 'bg-red-600'
                            : 'bg-dark-hover hover:bg-gray-700'
                        }`}
                      >
                        Season {season.season_number}
                      </button>
                    ))
                  }
                </div>
              </div>

              <div className="space-y-2">
                {episodes.map((episode) => (
                  <button
                    key={episode.id}
                    onClick={() => setSelectedEpisode(episode.episode_number)}
                    className={`w-full p-4 rounded-lg transition-colors text-left ${
                      selectedEpisode === episode.episode_number
                        ? 'bg-red-600'
                        : 'bg-dark-hover hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {episode.still_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${episode.still_path}`}
                          alt={episode.name}
                          className="w-32 h-18 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{episode.episode_number}.</span>
                          <span className="font-semibold truncate">{episode.name}</span>
                          {episode.runtime && (
                            <span className="text-sm text-gray-400 ml-auto">{episode.runtime}m</span>
                          )}
                        </div>
                        {episode.overview && (
                          <p className="text-sm text-gray-400 line-clamp-2">{episode.overview}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-dark-card rounded-lg p-6 mb-6">
            <div className="relative w-full rounded-lg mb-4 overflow-hidden">
              <img
                src={posterPath}
                alt={title}
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/placeholder.jpg'
                }}
              />
              
              {!hasPoster && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-xl font-bold mb-2 line-clamp-3">{title}</h3>
                  {releaseYear && (
                    <p className="text-sm text-gray-300">{releaseYear}</p>
                  )}
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {details.vote_average && (
                <div className="px-3 py-1 bg-dark-hover rounded-lg flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">{details.vote_average.toFixed(1)}</span>
                </div>
              )}
              
              {(details.release_date || details.first_air_date) && (
                <div className="px-3 py-1 bg-dark-hover rounded-lg">
                  {new Date(details.release_date || details.first_air_date).getFullYear()}
                </div>
              )}
            </div>

            <button
              onClick={toggleWatchlist}
              disabled={watchlistLoading}
              className={`w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {watchlistLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : isInWatchlist ? (
                <>
                  <FiCheck />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <FiPlus />
                  <span>Add to Watchlist</span>
                </>
              )}
            </button>

            {details.overview && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-gray-400 text-sm">{details.overview}</p>
              </div>
            )}

            {details.genres && details.genres.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {details.genres.map(genre => (
                    <Link
                      key={genre.id}
                      to={`/genre/${type}/${genre.id}`}
                      className="px-3 py-1 bg-dark-hover hover:bg-gray-700 rounded-lg text-sm transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {details.runtime && (
              <div className="text-sm text-gray-400">
                <strong>Runtime:</strong> {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
              </div>
            )}

            {details.status && (
              <div className="text-sm text-gray-400 mt-2">
                <strong>Status:</strong> {details.status}
              </div>
            )}
          </div>
        </div>
      </div>

      {details.similar && details.similar.results && details.similar.results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar {type === 'movie' ? 'Movies' : 'TV Shows'}</h2>
          <MediaGrid items={details.similar.results.slice(0, 12)} type={type} />
        </div>
      )}
    </div>
  )
}

export default Player

