import { useEffect } from 'react'

const BannerAd = ({ size = 'medium', className = '' }) => {
  useEffect(() => {
    if (window.atOptions) {
      window.atOptions.refresh?.()
    }
  }, [])

  const getAdConfig = () => {
    switch (size) {
      case 'skyscraper':
        return {
          key: 'b3b7d8f9403ce9430e0aa63637089b10',
          width: 160,
          height: 300,
          className: 'skyscraper-ad'
        }
      case 'small':
        return {
          key: '73f1a2c431cdd8c3800eaef4cc24f9a0',
          width: 320,
          height: 50,
          className: 'small-banner-ad'
        }
      default:
        return {
          key: '73f1a2c431cdd8c3800eaef4cc24f9a0',
          width: 320,
          height: 50,
          className: 'small-banner-ad'
        }
    }
  }

  const config = getAdConfig()

  return (
    <div 
      className={`banner-ad bg-gray-800 rounded-lg p-4 my-6 text-center flex items-center justify-center ${className}`}
      style={{
        width: `${config.width}px`,
        height: `${config.height}px`,
        minHeight: `${config.height}px`
      }}
    >
      <div 
        id={`highperformanceformat-${config.key}`}
        className={config.className}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  )
}

export default BannerAd
