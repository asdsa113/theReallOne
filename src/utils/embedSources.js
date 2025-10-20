export const embedSources = [
  {
    id: 'vidnest',
    name: 'Server 1',
    baseUrl: 'https://vidnest.fun',
    movie: (id) => `https://vidnest.fun/movie/${id}`,
    tv: (id, season, episode) => `https://vidnest.fun/tv/${id}/${season}/${episode}`,
    supported: ['movie', 'tv', 'anime']
  },
  {
    id: '111movies',
    name: 'Server 2',
    baseUrl: 'https://111movies.com',
    movie: (id) => `https://111movies.com/movie/${id}`,
    tv: (id, season, episode) => `https://111movies.com/tv/${id}/${season}/${episode}`,
    supported: ['movie', 'tv']
  },
  {
    id: 'moviesapi',
    name: 'Server 3',
    baseUrl: 'https://moviesapi.club',
    movie: (id) => `https://moviesapi.club/movie/${id}`,
    tv: (id, season, episode) => `https://moviesapi.club/tv/${id}-${season}-${episode}`,
    supported: ['movie', 'tv']
  },
  {
    id: 'vidsrc',
    name: 'Server 4',
    baseUrl: 'https://vidsrc.me',
    movie: (id) => `https://vidsrc.me/embed/movie/${id}`,
    tv: (id, season, episode) => `https://vidsrc.me/embed/tv/${id}/${season}/${episode}`,
    supported: ['movie', 'tv']
  }
]

export const getEmbedUrl = (sourceId, type, tmdbId, season = 1, episode = 1) => {
  const source = embedSources.find(s => s.id === sourceId)
  if (!source) return ''

  if (type === 'movie') {
    return source.movie(tmdbId)
  } else {
    return source.tv(tmdbId, season, episode)
  }
}

export default embedSources

