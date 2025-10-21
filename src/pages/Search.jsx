import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { search as tmdbSearch } from '../utils/api'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'

const Search = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [filter, setFilter] = useState(searchParams.get('type') || 'multi')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [suggestedTitle, setSuggestedTitle] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    genre: searchParams.get('genre') || '',
    year: searchParams.get('year') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'popularity'
  })

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      
      setLoading(true)
      setPage(1)
      setSuggestedTitle('')
      try {
        const params = new URLSearchParams({
          q: query,
          type: filter,
          page: '1',
          ...activeFilters
        })
        
  const res = await tmdbSearch(query, filter, 1)
  const resultsData = (res.data.results || []).filter(item => item.poster_path)
  setResults(resultsData)
  setTotalPages(res.data.total_pages || 1)
        
        // Set "Did you mean..." suggestion from the first result
        if (resultsData.length > 0) {
          const firstResult = resultsData[0]
          const firstResultTitle = firstResult.title || firstResult.name
          
          // Only suggest if the query doesn't closely match the first result
          if (firstResultTitle && 
              firstResultTitle.toLowerCase() !== query.toLowerCase() &&
              !firstResultTitle.toLowerCase().includes(query.toLowerCase())) {
            setSuggestedTitle(firstResultTitle)
          }
        }
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, filter, activeFilters])

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return
    
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const params = new URLSearchParams({
        q: query,
        type: filter,
        page: nextPage.toString(),
        ...activeFilters
      })
      
  const res = await tmdbSearch(query, filter, nextPage)
  const newResults = (res.data.results || []).filter(item => item.poster_path)
      setResults(prev => [...prev, ...newResults])
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl text-gray-400">Enter a search query</h1>
      </div>
    )
  }

  const handleSuggestionClick = () => {
    navigate(`/search?q=${encodeURIComponent(suggestedTitle)}`)
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => value && value !== 'popularity')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Search Results for "{query}"
        </h1>
        
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-4 p-3 bg-dark-card rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Active filters:</span>
              {activeFilters.genre && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  {activeFilters.genre}
                </span>
              )}
              {activeFilters.year && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  {activeFilters.year}
                </span>
              )}
              {activeFilters.rating && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  {activeFilters.rating}+ Stars
                </span>
              )}
              {activeFilters.sortBy !== 'popularity' && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  Sort: {activeFilters.sortBy}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Did you mean suggestion */}
        {suggestedTitle && !loading && (
          <div className="mb-6 p-4 bg-dark-card rounded-lg border border-gray-700">
            <p className="text-gray-300">
              Did you mean:{' '}
              <button
                onClick={handleSuggestionClick}
                className="text-red-500 hover:text-red-400 font-semibold underline transition-colors"
              >
                {suggestedTitle}
              </button>
              ?
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('multi')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'multi' ? 'bg-red-600' : 'bg-dark-card hover:bg-dark-hover'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('movie')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'movie' ? 'bg-red-600' : 'bg-dark-card hover:bg-dark-hover'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setFilter('tv')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'tv' ? 'bg-red-600' : 'bg-dark-card hover:bg-dark-hover'
            }`}
          >
            TV Shows
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <MediaGrid items={results} />
          
          {page < totalPages && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Search

