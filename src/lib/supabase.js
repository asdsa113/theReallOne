import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://puditewcldlbmytuhavr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZGl0ZXdjbGRsYm15dHVoYXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDQ1NDMsImV4cCI6MjA3NjA4MDU0M30.QN_IgP9LWQk2HvgrMtPLeh04lxMPuIvFIErqjgewCg0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`
    }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Watchlist functions
export const addToWatchlist = async (userId, mediaItem) => {
  const { data, error } = await supabase
    .from('watchlist')
    .insert({
      user_id: userId,
      media_id: mediaItem.id,
      media_type: mediaItem.type,
      title: mediaItem.title,
      poster_path: mediaItem.poster,
      release_date: mediaItem.releaseDate
    })
    .select()
  
  return { data, error }
}

export const removeFromWatchlist = async (userId, mediaId) => {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('user_id', userId)
    .eq('media_id', mediaId)
  
  return { error }
}

export const getWatchlist = async (userId) => {
  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false })
  
  return { data, error }
}

export const isInWatchlist = async (userId, mediaId) => {
  const { data, error } = await supabase
    .from('watchlist')
    .select('id')
    .eq('user_id', userId)
    .eq('media_id', mediaId)
    .maybeSingle()
  
  return { data: !!data, error }
}

// Watch progress functions
export const saveWatchProgress = async (userId, mediaId, season, episode) => {
  const { data, error } = await supabase
    .from('watch_progress')
    .upsert({
      user_id: userId,
      media_id: mediaId,
      season: season,
      episode: episode,
      updated_at: new Date().toISOString()
    })
    .select()
  
  return { data, error }
}

export const getWatchProgress = async (userId, mediaId) => {
  const { data, error } = await supabase
    .from('watch_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('media_id', mediaId)
    .single()
  
  return { data, error }
}

// User settings functions
export const saveUserSettings = async (userId, settings) => {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: userId,
      default_server: settings.defaultServer,
      show_ratings: settings.showRatings,
      autoplay: settings.autoplay,
      updated_at: new Date().toISOString()
    })
    .select()
  
  return { data, error }
}

export const getUserSettings = async (userId) => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}
