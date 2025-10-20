import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiArrowLeft, FiCheck, FiUser } from 'react-icons/fi'

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!password) {
      setError('Please enter your current password to change email')
      setLoading(false)
      return
    }

    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password
      })

      if (signInError) {
        setError('Current password is incorrect')
        setLoading(false)
        return
      }

      // Update the email
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
        data: {
          custom_message: 'Confirm your new NexTv email address to continue enjoying unlimited streaming!'
        }
      })

      if (updateError) {
        setError(updateError.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="max-w-md w-full mx-4">
          <div className="bg-dark-card rounded-lg p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Email Change Requested</h2>
            <p className="text-gray-400 mb-6">
              We've sent a confirmation email to <strong>{newEmail}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please check your new email and click the confirmation link to complete the change.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FiUser />
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="max-w-md w-full mx-4">
        <div className="bg-dark-card rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
              NexTv
            </h1>
            <p className="text-gray-400">Change your email address</p>
          </div>

          <div className="mb-6 p-4 bg-dark-hover rounded-lg">
            <p className="text-sm text-gray-400">
              <strong>Current email:</strong> {user?.email}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">New Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-field w-full pl-10"
                  placeholder="Enter your new email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full pl-10"
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                We need to verify your identity to change your email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Updating...' : 'Change Email'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft />
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeEmail
