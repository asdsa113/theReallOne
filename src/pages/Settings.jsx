import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiSave, FiTrash2, FiCheck, FiMail, FiKey } from 'react-icons/fi'

const Settings = () => {
  const [defaultServer, setDefaultServer] = useState('vidnest')
  const [autoplay, setAutoplay] = useState(true)
  const [showRatings, setShowRatings] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}')
    setDefaultServer(settings.defaultServer || 'vidnest')
    setAutoplay(settings.autoplay !== false)
    setShowRatings(settings.showRatings !== false)
  }, [])

  const saveSettings = () => {
    const settings = {
      defaultServer,
      autoplay,
      showRatings
    }
    localStorage.setItem('userSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const clearWatchHistory = () => {
    if (confirm('Are you sure you want to clear your watch history?')) {
      localStorage.removeItem('watchProgress')
      alert('Watch history cleared!')
    }
  }

  const clearWatchlist = () => {
    if (confirm('Are you sure you want to clear your watchlist?')) {
      localStorage.removeItem('watchlist')
      alert('Watchlist cleared!')
    }
  }

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
      localStorage.clear()
      alert('All data cleared!')
      window.location.reload()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Playback Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Server</label>
              <select
                value={defaultServer}
                onChange={(e) => setDefaultServer(e.target.value)}
                className="input-field w-full md:w-64"
              >
                <option value="vidnest">Server 1 (No Ads)</option>
                <option value="111movies">Server 2</option>
                <option value="moviesapi">Server 3</option>
                <option value="vidsrc">Server 4</option>
              </select>
              <p className="text-sm text-gray-400 mt-1">
                Server 1 has no popup ads and is recommended
              </p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <label className="text-sm font-medium">Show Ratings</label>
                <p className="text-sm text-gray-400">Display rating badges on movie/TV cards</p>
              </div>
              <button
                onClick={() => setShowRatings(!showRatings)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showRatings ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showRatings ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={saveSettings}
            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {saved ? (
              <>
                <FiCheck />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <label className="text-sm font-medium">Clear Watch History</label>
                <p className="text-sm text-gray-400">Remove all episode progress tracking</p>
              </div>
              <button
                onClick={clearWatchHistory}
                className="px-4 py-2 bg-dark-hover hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiTrash2 />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <label className="text-sm font-medium">Clear Watchlist</label>
                <p className="text-sm text-gray-400">Remove all saved movies and TV shows</p>
              </div>
              <button
                onClick={clearWatchlist}
                className="px-4 py-2 bg-dark-hover hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiTrash2 />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-2 pt-4 border-t border-gray-700">
              <div>
                <label className="text-sm font-medium text-red-400">Clear All Data</label>
                <p className="text-sm text-gray-400">Remove all settings, history, and watchlist</p>
              </div>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiTrash2 />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <FiMail className="text-xl text-gray-400" />
                <div>
                  <p className="font-medium">Change Email</p>
                  <p className="text-sm text-gray-400">Update your email address</p>
                </div>
              </div>
              <Link
                to="/change-email"
                className="px-4 py-2 bg-dark-hover hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                Change
              </Link>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <FiKey className="text-xl text-gray-400" />
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-400">Update your password</p>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="px-4 py-2 bg-dark-hover hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                Change
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-dark-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p><strong className="text-white">Version:</strong> 1.0.0</p>
            <p><strong className="text-white">App:</strong> NexTv</p>
            <p className="pt-2">
              Your data is synced across all devices when signed in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

