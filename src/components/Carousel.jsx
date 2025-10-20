import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Carousel = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="relative -mx-4 md:-mx-6 lg:-mx-8 mb-12">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {items.slice(0, 10).map((item) => {
          const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie')
          const title = item.title || item.name
          const backdropPath = item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : '/placeholder.jpg'

          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <img
                  src={backdropPath}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {title}
                    </h2>
                    
                    {item.overview && (
                      <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3">
                        {item.overview}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/watch/${mediaType}/${item.id}`}
                        className="btn-primary flex items-center gap-2"
                      >
                        <FiPlay />
                        <span>Watch Now</span>
                      </Link>
                      
                      {item.vote_average && (
                        <div className="px-4 py-2 bg-black/60 rounded-lg flex items-center gap-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-semibold">{item.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      
                      {item.release_date && (
                        <div className="px-4 py-2 bg-black/60 rounded-lg">
                          {new Date(item.release_date).getFullYear()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Carousel

