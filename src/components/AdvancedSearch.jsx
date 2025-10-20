import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiFilter, FiX, FiCalendar, FiStar, FiTag } from 'react-icons/fi'
import { useDebounce } from '../hooks/useDebounce'

const AdvancedSearch = ({ onClose, isOpen }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filters, setFilters] = useState({
    type: 'multi',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity'
  })
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const debouncedQuery = useDebounce(query, 300)

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
  ]

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetchSuggestions(debouncedQuery)
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSuggestions(data.results || [])
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query,
        ...filters
      })
      navigate(`/search?${searchParams.toString()}`)
      onClose()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name)
    setShowSuggestions(false)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      type: 'multi',
      genre: '',
      year: '',
      rating: '',
      sortBy: 'popularity'
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'multi' && value !== 'popularity')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Advanced Search</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search movies, TV shows, actors..."
              className="input-field w-full pl-10 pr-4 py-3 text-lg"
              autoFocus
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-dark-card border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-dark-hover flex items-center gap-3"
                  >
                    <div className="w-8 h-12 bg-gray-700 rounded flex-shrink-0">
                      {suggestion.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                          alt=""
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{suggestion.title || suggestion.name}</div>
                      <div className="text-sm text-gray-400">
                        {suggestion.media_type === 'movie' ? 'Movie' : 'TV Show'} • {suggestion.release_date?.split('-')[0] || suggestion.first_air_date?.split('-')[0]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters || hasActiveFilters ? 'bg-red-600 text-white' : 'bg-dark-hover text-gray-300'
              }`}
            >
              <FiFilter />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 bg-white rounded-full"></span>}
            </button>

            <div className="flex gap-2">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="bg-dark-hover text-white rounded-lg px-3 py-2 border border-gray-600"
              >
                <option value="multi">All</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
                <option value="person">People</option>
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="bg-dark-hover text-white rounded-lg px-3 py-2 border border-gray-600"
              >
                <option value="popularity">Popularity</option>
                <option value="release_date">Release Date</option>
                <option value="vote_average">Rating</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-dark-hover rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiTag className="inline mr-1" />
                  Genre
                </label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full bg-dark-card text-white rounded-lg px-3 py-2 border border-gray-600"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiCalendar className="inline mr-1" />
                  Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full bg-dark-card text-white rounded-lg px-3 py-2 border border-gray-600"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiStar className="inline mr-1" />
                  Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full bg-dark-card text-white rounded-lg px-3 py-2 border border-gray-600"
                >
                  <option value="">All Ratings</option>
                  <option value="9">9+ Stars</option>
                  <option value="8">8+ Stars</option>
                  <option value="7">7+ Stars</option>
                  <option value="6">6+ Stars</option>
                  <option value="5">5+ Stars</option>
                </select>
              </div>

              {hasActiveFilters && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdvancedSearch
