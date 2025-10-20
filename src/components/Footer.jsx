import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Footer = () => {
  useEffect(() => {
    // Load advertisement script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '//www.highperformanceformat.com/73f1a2c431cdd8c3800eaef4cc24f9a0/invoke.js'
    script.async = true
    
    const adContainer = document.getElementById('footer-ad-container')
    if (adContainer) {
      adContainer.appendChild(script)
    }

    return () => {
      // Cleanup script on unmount
      if (adContainer && script.parentNode) {
        adContainer.removeChild(script)
      }
    }
  }, [])

  return (
    <footer className="bg-dark-card border-t border-gray-800 mt-16">
      <div className="px-4 md:px-6 lg:px-8 py-8">
        {/* Advertisement Section */}
        <div className="flex justify-center items-center mb-8">
          <div id="footer-ad-container" className="text-center">
            <div dangerouslySetInnerHTML={{
              __html: `
                <script type="text/javascript">
                  atOptions = {
                    'key' : '73f1a2c431cdd8c3800eaef4cc24f9a0',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                  };
                </script>
              `
            }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-4">
              NexTv
            </h3>
            <p className="text-gray-400 text-sm">
              Watch unlimited movies and TV shows for free.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/movies" className="hover:text-white transition-colors">Movies</Link></li>
              <li><Link to="/tv" className="hover:text-white transition-colors">TV Shows</Link></li>
              <li><Link to="/genre/movie/28" className="hover:text-white transition-colors">Action</Link></li>
              <li><Link to="/genre/movie/35" className="hover:text-white transition-colors">Comedy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/watchlist" className="hover:text-white transition-colors">Watchlist</Link></li>
              <li><Link to="/year/movie/2024" className="hover:text-white transition-colors">New Releases</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 NexTv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

