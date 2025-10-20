import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { addToWatchlist, removeFromWatchlist, isInWatchlist, getWatchlist } from '../lib/supabase'

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Load watchlist on mount
  useEffect(() => {
    loadWatchlist()
  }, [user])

  const loadWatchlist = async () => {
    if (!user) {
      // Use localStorage for non-authenticated users
      const items = JSON.parse(localStorage.getItem('watchlist') || '[]')
      setWatchlist(items)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await getWatchlist(user.id)
      
      if (error) {
        console.error('Error loading watchlist:', error)
        // Fallback to localStorage
        const items = JSON.parse(localStorage.getItem('watchlist') || '[]')
        setWatchlist(items)
      } else {
        setWatchlist(data || [])
      }
    } catch (error) {
      console.error('Error loading watchlist:', error)
      // Fallback to localStorage
      const items = JSON.parse(localStorage.getItem('watchlist') || '[]')
      setWatchlist(items)
    } finally {
      setLoading(false)
    }
  }

  const addToWatchlistLocal = (item) => {
    const newItem = {
      id: item.id,
      title: item.title,
      poster: item.poster,
      type: item.type,
      releaseDate: item.releaseDate,
      addedAt: new Date().toISOString()
    }
    
    const updated = [...watchlist, newItem]
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  const removeFromWatchlistLocal = (itemId) => {
    const updated = watchlist.filter(w => w.id !== itemId)
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  const toggleWatchlist = async (item) => {
    if (loading) return

    const isInList = watchlist.some(w => w.id === item.id)

    try {
      if (user) {
        // Try Supabase first
        setLoading(true)
        if (isInList) {
          const { error } = await removeFromWatchlist(user.id, item.id)
          if (error) throw error
          removeFromWatchlistLocal(item.id)
        } else {
          const { error } = await addToWatchlist(user.id, item)
          if (error) throw error
          addToWatchlistLocal(item)
        }
      } else {
        // Use localStorage for non-authenticated users
        if (isInList) {
          removeFromWatchlistLocal(item.id)
        } else {
          addToWatchlistLocal(item)
        }
      }
    } catch (error) {
      console.error('Database error, falling back to localStorage:', error)
      // Fallback to localStorage
      if (isInList) {
        removeFromWatchlistLocal(item.id)
      } else {
        addToWatchlistLocal(item)
      }
    } finally {
      setLoading(false)
    }
  }

  const isInWatchlistState = (itemId) => {
    return watchlist.some(w => w.id === itemId)
  }

  return {
    watchlist,
    loading,
    toggleWatchlist,
    isInWatchlist: isInWatchlistState,
    loadWatchlist
  }
}