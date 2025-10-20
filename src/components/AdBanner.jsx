import { useEffect } from 'react'

const AdBanner = ({ className = '', style = {} }) => {
  useEffect(() => {
    if (window.effectivegatecpm) {
      window.effectivegatecpm.refresh()
    }
  }, [])

  return (
    <div 
      className={`ad-popup bg-gray-800 rounded-lg p-4 my-6 text-center ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <div 
        id="effectivegatecpm-771690a5d6504209650fa548be262ca9"
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default AdBanner
