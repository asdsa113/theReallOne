import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE = 'https://api.themoviedb.org/3'

if (!TMDB_API_KEY) {
  console.warn('VITE_TMDB_API_KEY is not set. External TMDB requests will fail.')
}

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: {
    api_key: TMDB_API_KEY
  }
})

export const getMoviesTrending = (page = 1) => tmdb.get('/trending/movie/week', { params: { page } })
export const getMoviesPopular = (page = 1) => tmdb.get('/movie/popular', { params: { page } })
export const getMoviesTopRated = (page = 1) => tmdb.get('/movie/top_rated', { params: { page } })
export const getMovieDetails = (id) => tmdb.get(`/movie/${id}`)
export const getMoviesByGenre = (genreId, page = 1) => tmdb.get('/discover/movie', { params: { with_genres: genreId, page } })
export const getMoviesByYear = (year, page = 1) => tmdb.get('/discover/movie', { params: { primary_release_year: year, page } })

export const getTVTrending = (page = 1) => tmdb.get('/trending/tv/week', { params: { page } })
export const getTVPopular = (page = 1) => tmdb.get('/tv/popular', { params: { page } })
export const getTVTopRated = (page = 1) => tmdb.get('/tv/top_rated', { params: { page } })
export const getTVDetails = (id) => tmdb.get(`/tv/${id}`)
export const getTVByGenre = (genreId, page = 1) => tmdb.get('/discover/tv', { params: { with_genres: genreId, page } })
export const getTVByYear = (year, page = 1) => tmdb.get('/discover/tv', { params: { first_air_date_year: year, page } })
export const getTVSeasonDetails = (tvId, seasonNumber) => tmdb.get(`/tv/${tvId}/season/${seasonNumber}`)

export const search = (query, type = 'multi', page = 1) => tmdb.get('/search/multi', { params: { query, page } })
export const getGenres = (type = 'movie') => tmdb.get(`/genre/${type}/list`)

export default tmdb

