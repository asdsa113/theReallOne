export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export const formatYear = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).getFullYear()
}

export const truncateText = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return '/placeholder.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getRatingColor = (rating) => {
  if (rating >= 8) return 'text-green-500'
  if (rating >= 6) return 'text-yellow-500'
  if (rating >= 4) return 'text-orange-500'
  return 'text-red-500'
}

export const sortByDate = (items, ascending = false) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date || 0)
    const dateB = new Date(b.release_date || b.first_air_date || 0)
    return ascending ? dateA - dateB : dateB - dateA
  })
}

export const sortByRating = (items, ascending = false) => {
  return [...items].sort((a, b) => {
    return ascending 
      ? (a.vote_average || 0) - (b.vote_average || 0)
      : (b.vote_average || 0) - (a.vote_average || 0)
  })
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default {
  formatRuntime,
  formatDate,
  formatYear,
  truncateText,
  getImageUrl,
  getBackdropUrl,
  getRatingColor,
  sortByDate,
  sortByRating,
  debounce
}

