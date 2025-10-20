import { useState, useEffect } from 'react'
import axios from 'axios'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'

const TVShows = () => {
  const [shows, setShows] = useState([])
  const [filter, setFilter] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true)
      setPage(1)
      try {
        const endpoint = filter === 'popular' ? '/api/tv/popular' : '/api/tv/top-rated'
        const res = await axios.get(`${endpoint}?page=1`)
        setShows((res.data.results || []).filter(item => item.poster_path))
        setTotalPages(res.data.total_pages || 1)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [filter])

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return
    
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const endpoint = filter === 'popular' ? '/api/tv/popular' : '/api/tv/top-rated'
      const res = await axios.get(`${endpoint}?page=${nextPage}`)
      const newResults = (res.data.results || []).filter(item => item.poster_path)
      setShows(prev => [...prev, ...newResults])
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">TV Shows</h1>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'popular' ? 'bg-red-600' : 'bg-dark-card hover:bg-dark-hover'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setFilter('top-rated')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'top-rated' ? 'bg-red-600' : 'bg-dark-card hover:bg-dark-hover'
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <MediaGrid items={shows} type="tv" />
          
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

export default TVShows

