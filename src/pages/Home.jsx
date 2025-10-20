import { useState, useEffect } from 'react'
import { getMoviesTrending, getTVTrending, getMoviesPopular } from '../utils/api'
import Carousel from '../components/Carousel'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'
import ShareCaring from '../components/ShareCaring'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTV, setTrendingTV] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, tvRes, popularRes] = await Promise.all([
          getMoviesTrending(),
          getTVTrending(),
          getMoviesPopular()
        ])
        
        setTrendingMovies((moviesRes.data.results || []).filter(item => item.poster_path))
        setTrendingTV((tvRes.data.results || []).filter(item => item.poster_path))
        setPopularMovies((popularRes.data.results || []).filter(item => item.poster_path))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <div>
      <Carousel items={trendingMovies} />

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Movies</h2>
        <MediaGrid items={trendingMovies} type="movie" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending TV Shows</h2>
        <MediaGrid items={trendingTV} type="tv" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular Movies</h2>
        <MediaGrid items={popularMovies} type="movie" />
      </section>

      <ShareCaring />
    </div>
  )
}

export default Home

