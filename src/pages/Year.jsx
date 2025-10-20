import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'

const Year = () => {
  const { type, year } = useParams()
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
        const endpoint = type === 'movie' ? `/api/movies/year/${year}` : `/api/tv/year/${year}`
        const res = await axios.get(`${endpoint}?page=1`)
        setItems((res.data.results || []).filter(item => item.poster_path))
        setTotalPages(res.data.total_pages || 1)
      } catch (error) {
        console.error('Error fetching by year:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [type, year])

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return
    
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const endpoint = type === 'movie' ? `/api/movies/year/${year}` : `/api/tv/year/${year}`
      const res = await axios.get(`${endpoint}?page=${nextPage}`)
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
        {type === 'tv' ? 'TV Shows' : 'Movies'} from {year}
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

export default Year

