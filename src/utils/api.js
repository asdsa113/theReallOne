import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export const getMoviesTrending = () => api.get('/movies/trending')
export const getMoviesPopular = () => api.get('/movies/popular')
export const getMoviesTopRated = () => api.get('/movies/top-rated')
export const getMovieDetails = (id) => api.get(`/movies/${id}`)
export const getMoviesByGenre = (genreId, page = 1) => api.get(`/movies/genre/${genreId}?page=${page}`)
export const getMoviesByYear = (year, page = 1) => api.get(`/movies/year/${year}?page=${page}`)

export const getTVTrending = () => api.get('/tv/trending')
export const getTVPopular = () => api.get('/tv/popular')
export const getTVTopRated = () => api.get('/tv/top-rated')
export const getTVDetails = (id) => api.get(`/tv/${id}`)
export const getTVByGenre = (genreId, page = 1) => api.get(`/tv/genre/${genreId}?page=${page}`)
export const getTVByYear = (year, page = 1) => api.get(`/tv/year/${year}?page=${page}`)
export const getTVSeasonDetails = (tvId, seasonNumber) => api.get(`/tv/${tvId}/season/${seasonNumber}`)

export const search = (query, type = 'multi', page = 1) => api.get(`/search?q=${query}&type=${type}&page=${page}`)
export const getGenres = (type) => api.get(`/search/genres/${type}`)

export default api

