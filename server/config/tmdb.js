export const TMDB_CONFIG = {
  API_KEY: process.env.TMDB_API_KEY || '',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZES: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  BACKDROP_SIZES: ['w300', 'w780', 'w1280', 'original'],
  PROFILE_SIZES: ['w45', 'w185', 'h632', 'original']
}

export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg'
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return '/placeholder.jpg'
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export default TMDB_CONFIG

