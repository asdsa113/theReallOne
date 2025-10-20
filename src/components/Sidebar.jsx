import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiFilm, FiTv, FiBookmark, FiX } from 'react-icons/fi'
import { MdCategory } from 'react-icons/md'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/movies', icon: FiFilm, label: 'Movies' },
    { path: '/tv', icon: FiTv, label: 'TV Shows' },
    { path: '/watchlist', icon: FiBookmark, label: 'Watchlist' },
  ]

  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
    { id: 16, name: 'Animation' },
  ]

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside className={`fixed left-0 top-0 h-full w-64 bg-dark-card z-50 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              NexTv
            </div>
            <button onClick={onClose} className="p-2 hover:bg-dark-hover rounded-lg">
              <FiX className="text-xl" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-red-600 text-white' : 'hover:bg-dark-hover text-gray-300'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-8">
            <div className="flex items-center gap-2 px-4 py-2 mb-3">
              <MdCategory className="text-xl text-gray-400" />
              <h3 className="font-semibold text-gray-300">Genres</h3>
            </div>
            <div className="space-y-1">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/movie/${genre.id}`}
                  onClick={() => onClose()}
                  className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="px-4 py-2 mb-3">
              <h3 className="font-semibold text-gray-300">Browse by Year</h3>
            </div>
            <div className="space-y-1">
              {[2024, 2023, 2022, 2021, 2020].map((year) => (
                <Link
                  key={year}
                  to={`/year/movie/${year}`}
                  onClick={() => onClose()}
                  className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
                >
                  {year}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

