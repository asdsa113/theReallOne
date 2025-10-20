import { useState } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const CastSection = ({ cast, crew }) => {
  const [showAll, setShowAll] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Limit cast to first 12 for initial display
  const displayCast = showAll ? cast : cast?.slice(0, 12) || []
  const itemsPerPage = 6
  
  const totalPages = Math.ceil(displayCast.length / itemsPerPage)
  const currentCast = displayCast.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
  
  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }
  
  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }
  
  // Get key crew members (director, producer, writer)
  const keyCrew = crew?.filter(member => 
    ['Director', 'Producer', 'Writer', 'Screenplay', 'Creator'].some(role => 
      member.job?.includes(role) || member.known_for_department === 'Writing'
    )
  ).slice(0, 6) || []

  if (!cast || cast.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Cast & Crew</h2>
        {cast.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-red-500 hover:text-red-400 font-medium transition-colors"
          >
            {showAll ? 'Show Less' : `Show All (${cast.length})`}
          </button>
        )}
      </div>

      {/* Key Crew Section */}
      {keyCrew.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Key Crew</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyCrew.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {member.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs" style={{ display: member.profile_path ? 'none' : 'flex' }}>
                    {member.name?.charAt(0) || '?'}
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white truncate" title={member.name}>
                  {member.name}
                </h4>
                <p className="text-xs text-gray-400 truncate" title={member.job}>
                  {member.job}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cast Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Cast</h3>
        
        {displayCast.length > itemsPerPage && (
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevPage}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-dark-card hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            
            <span className="text-sm text-gray-400">
              {currentIndex + 1} of {totalPages}
            </span>
            
            <button
              onClick={nextPage}
              disabled={currentIndex === totalPages - 1}
              className="p-2 rounded-full bg-dark-card hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {currentCast.map((actor) => (
            <div key={actor.id} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm" style={{ display: actor.profile_path ? 'none' : 'flex' }}>
                  {actor.name?.charAt(0) || '?'}
                </div>
              </div>
              <h4 className="text-sm font-medium text-white truncate group-hover:text-red-400 transition-colors" title={actor.name}>
                {actor.name}
              </h4>
              <p className="text-xs text-gray-400 truncate" title={actor.character}>
                {actor.character}
              </p>
            </div>
          ))}
        </div>

        {displayCast.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No cast information available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CastSection
