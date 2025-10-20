import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
});

export const getTrending = async (mediaType = 'all', timeWindow = 'week') => {
  const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
  return response.data;
};

export const getPopular = async (mediaType = 'movie', page = 1) => {
  const response = await tmdbApi.get(`/${mediaType}/popular`, {
    params: { page }
  });
  return response.data;
};

export const getTopRated = async (mediaType = 'movie', page = 1) => {
  const response = await tmdbApi.get(`/${mediaType}/top_rated`, {
    params: { page }
  });
  return response.data;
};

export const search = async (query, mediaType = 'multi', page = 1) => {
  const response = await tmdbApi.get(`/search/${mediaType}`, {
    params: { query, page }
  });
  return response.data;
};

export const getDetails = async (mediaType, id) => {
  const response = await tmdbApi.get(`/${mediaType}/${id}`, {
    params: { append_to_response: 'videos,credits,similar' }
  });
  return response.data;
};

export const getGenres = async (mediaType = 'movie') => {
  const response = await tmdbApi.get(`/genre/${mediaType}/list`);
  return response.data;
};

export const getByGenre = async (mediaType, genreId, page = 1) => {
  const response = await tmdbApi.get(`/discover/${mediaType}`, {
    params: {
      with_genres: genreId,
      page
    }
  });
  return response.data;
};

export const getByYear = async (mediaType, year, page = 1) => {
  const response = await tmdbApi.get(`/discover/${mediaType}`, {
    params: {
      primary_release_year: mediaType === 'movie' ? year : undefined,
      first_air_date_year: mediaType === 'tv' ? year : undefined,
      page
    }
  });
  return response.data;
};

export const getSeasonDetails = async (tvId, seasonNumber) => {
  const response = await tmdbApi.get(`/tv/${tvId}/season/${seasonNumber}`);
  return response.data;
};

export default tmdbApi;

