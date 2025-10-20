import { useWatchlist } from '../hooks/useWatchlist'
import MediaGrid from '../components/MediaGrid'
import Loading from '../components/Loading'

const Watchlist = () => {
  const { watchlist, loading } = useWatchlist()

  const items = watchlist.map(item => ({
    id: item.media_id || item.id,
    title: item.title,
    poster_path: item.poster_path || item.poster,
    media_type: item.media_type || item.type,
    release_date: item.release_date || item.releaseDate
  }))

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">My Watchlist</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your watchlist is empty</p>
          <p className="text-gray-500 mt-2">Add movies and TV shows to watch them later</p>
        </div>
      ) : (
        <MediaGrid items={items} />
      )}
    </div>
  )
}

export default Watchlist

