export const movieGenres = [
  { id: 28, name: 'Action', icon: '💥' },
  { id: 12, name: 'Adventure', icon: '🗺️' },
  { id: 16, name: 'Animation', icon: '🎨' },
  { id: 35, name: 'Comedy', icon: '😂' },
  { id: 80, name: 'Crime', icon: '🔫' },
  { id: 99, name: 'Documentary', icon: '📽️' },
  { id: 18, name: 'Drama', icon: '🎭' },
  { id: 10751, name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 14, name: 'Fantasy', icon: '🧙' },
  { id: 36, name: 'History', icon: '📜' },
  { id: 27, name: 'Horror', icon: '👻' },
  { id: 10402, name: 'Music', icon: '🎵' },
  { id: 9648, name: 'Mystery', icon: '🔍' },
  { id: 10749, name: 'Romance', icon: '💕' },
  { id: 878, name: 'Sci-Fi', icon: '🚀' },
  { id: 10770, name: 'TV Movie', icon: '📺' },
  { id: 53, name: 'Thriller', icon: '😱' },
  { id: 10752, name: 'War', icon: '⚔️' },
  { id: 37, name: 'Western', icon: '🤠' }
]

export const tvGenres = [
  { id: 10759, name: 'Action & Adventure', icon: '💥' },
  { id: 16, name: 'Animation', icon: '🎨' },
  { id: 35, name: 'Comedy', icon: '😂' },
  { id: 80, name: 'Crime', icon: '🔫' },
  { id: 99, name: 'Documentary', icon: '📽️' },
  { id: 18, name: 'Drama', icon: '🎭' },
  { id: 10751, name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 10762, name: 'Kids', icon: '👶' },
  { id: 9648, name: 'Mystery', icon: '🔍' },
  { id: 10763, name: 'News', icon: '📰' },
  { id: 10764, name: 'Reality', icon: '📹' },
  { id: 10765, name: 'Sci-Fi & Fantasy', icon: '🚀' },
  { id: 10766, name: 'Soap', icon: '🧼' },
  { id: 10767, name: 'Talk', icon: '💬' },
  { id: 10768, name: 'War & Politics', icon: '⚔️' },
  { id: 37, name: 'Western', icon: '🤠' }
]

export const getGenreName = (genreId) => {
  const genre = [...movieGenres, ...tvGenres].find(g => g.id === parseInt(genreId))
  return genre ? genre.name : 'Unknown'
}

export const getGenreIcon = (genreId) => {
  const genre = [...movieGenres, ...tvGenres].find(g => g.id === parseInt(genreId))
  return genre ? genre.icon : '🎬'
}

export const popularGenres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 16, name: 'Animation' },
]

export default { movieGenres, tvGenres, popularGenres, getGenreName, getGenreIcon }

