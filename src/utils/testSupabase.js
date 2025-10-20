// Test Supabase connection and watchlist functions
import { supabase, addToWatchlist, getWatchlist, isInWatchlist } from '../lib/supabase'

export const testSupabaseConnection = async () => {
  console.log('Testing Supabase connection...')
  
  try {
    // Test 1: Check if we can connect to Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('Current user:', user)
    console.log('Auth error:', authError)
    
    if (!user) {
      console.log('❌ No user logged in')
      return false
    }
    
    // Test 2: Try to access the watchlist table
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .limit(1)
    
    console.log('Watchlist table test:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    if (error) {
      console.log('❌ Database error:', error.message)
      if (error.message.includes('relation "watchlist" does not exist')) {
        console.log('💡 The watchlist table does not exist. You need to run the database setup script.')
      }
      return false
    }
    
    console.log('✅ Supabase connection working')
    return true
    
  } catch (error) {
    console.log('❌ Connection test failed:', error)
    return false
  }
}

export const testWatchlistFunctions = async () => {
  console.log('Testing watchlist functions...')
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.log('❌ No user logged in for testing')
      return
    }
    
    // Test adding to watchlist
    console.log('Testing addToWatchlist...')
    const addResult = await addToWatchlist(user.id, {
      id: 999999, // Test ID
      title: 'Test Movie',
      poster: '/test.jpg',
      type: 'movie',
      releaseDate: '2024-01-01'
    })
    console.log('Add result:', addResult)
    
    // Test checking watchlist
    console.log('Testing isInWatchlist...')
    const checkResult = await isInWatchlist(user.id, 999999)
    console.log('Check result:', checkResult)
    
    // Test getting watchlist
    console.log('Testing getWatchlist...')
    const getResult = await getWatchlist(user.id)
    console.log('Get result:', getResult)
    
  } catch (error) {
    console.log('❌ Watchlist function test failed:', error)
  }
}

// Auto-run tests when imported
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(() => {
    testSupabaseConnection().then((connected) => {
      if (connected) {
        testWatchlistFunctions()
      }
    })
  }, 1000)
}
