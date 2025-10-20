import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiBookmark, FiMenu, FiX, FiHome, FiFilm, FiTv, FiSettings, FiUser, FiLogOut, FiFilter } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import AdvancedSearch from './AdvancedSearch'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/95 backdrop-blur-sm shadow-lg' : 'bg-dark-bg border-b border-gray-800'}`}>
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                NexTv
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isActive('/') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card hover:text-white'}`}
              >
                <FiHome className="text-lg" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/movies"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isActive('/movies') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card hover:text-white'}`}
              >
                <FiFilm className="text-lg" />
                <span>Movies</span>
              </Link>
              
              <Link 
                to="/tv"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isActive('/tv') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card hover:text-white'}`}
              >
                <FiTv className="text-lg" />
                <span>TV Shows</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="input-field w-64 pl-10 pr-10 py-2"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setAdvancedSearchOpen(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  title="Advanced Search"
                >
                  <FiFilter />
                </button>
              </div>
            </form>

            <Link 
              to="/watchlist"
              className="p-2 hover:bg-dark-card rounded-lg transition-colors hidden md:block"
            >
              <FiBookmark className="text-xl" />
            </Link>

            <Link 
              to="/settings"
              className="p-2 hover:bg-dark-card rounded-lg transition-colors hidden md:block"
            >
              <FiSettings className="text-xl" />
            </Link>

            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 hover:bg-dark-card rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiUser className="text-xl" />
                  <span className="text-sm">{user.email}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-dark-card rounded-lg shadow-xl border border-gray-700">
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-dark-hover rounded-lg transition-colors"
                      >
                        <FiLogOut />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-dark-card rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="mb-4 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, TV shows..."
                  className="input-field w-full pl-10 py-2"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            <nav className="space-y-1">
              <Link 
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${isActive('/') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card'}`}
              >
                Home
              </Link>
              <Link 
                to="/movies"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${isActive('/movies') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card'}`}
              >
                Movies
              </Link>
              <Link 
                to="/tv"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${isActive('/tv') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card'}`}
              >
                TV Shows
              </Link>
              <Link 
                to="/watchlist"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${isActive('/watchlist') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card'}`}
              >
                Watchlist
              </Link>
              <Link 
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${isActive('/settings') ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-dark-card'}`}
              >
                Settings
              </Link>
              
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-dark-card"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-dark-card"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg bg-red-600 text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      <AdvancedSearch 
        isOpen={advancedSearchOpen} 
        onClose={() => setAdvancedSearchOpen(false)} 
      />
    </header>
  )
}

export default Header

