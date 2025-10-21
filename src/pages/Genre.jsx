import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMoviesByGenre, getTVByGenre } from '../utils/api'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'

const genreNames = {
  28: 'Action', 35: 'Comedy', 18: 'Drama', 27: 'Horror',
  10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller', 16: 'Animation',
  12: 'Adventure', 14: 'Fantasy', 80: 'Crime', 99: 'Documentary',
  10751: 'Family', 36: 'History', 10402: 'Music', 9648: 'Mystery',
  10752: 'War', 37: 'Western'
}

const Genre = () => {
  const { type, id } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      setPage(1)
      try {
  const res = type === 'movie' ? await getMoviesByGenre(id, 1) : await getTVByGenre(id, 1)
  setItems((res.data.results || []).filter(item => item.poster_path))
  setTotalPages(res.data.total_pages || 1)
      } catch (error) {
        console.error('Error fetching by genre:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [type, id])

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return
    
    setLoadingMore(true)
    try {
      const nextPage = page + 1
  const res = type === 'movie' ? await getMoviesByGenre(id, nextPage) : await getTVByGenre(id, nextPage)
      const newResults = (res.data.results || []).filter(item => item.poster_path)
      setItems(prev => [...prev, ...newResults])
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        {genreNames[id] || 'Genre'} {type === 'tv' ? 'TV Shows' : 'Movies'}
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          <MediaGrid items={items} type={type} />
          
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

export default Genre

