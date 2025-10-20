import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './utils/testSupabase' // Import test to run automatically
import Layout from './components/Layout'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Search from './pages/Search'
import Player from './pages/Player'
import Watchlist from './pages/Watchlist'
import Genre from './pages/Genre'
import Year from './pages/Year'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ChangeEmail from './pages/ChangeEmail'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watch/:type/:id" element={<Player />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="/genre/:type/:id" element={<Genre />} />
            <Route path="/year/:type/:year" element={<Year />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

