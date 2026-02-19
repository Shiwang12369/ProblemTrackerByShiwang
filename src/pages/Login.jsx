import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()

  const isValidUser = () => {
    try {
      const adminUsers = JSON.parse(localStorage.getItem('admin_users') || '[]')
      return adminUsers.find(user => 
        user.email === formData.email && user.password === formData.password
      )
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1200))

      if (!isValidUser()) {
        throw new Error('Invalid credentials')
      }

      // Store logged in user
      localStorage.setItem('current_user', JSON.stringify(formData))
      setFormData({ email: '', password: '' })
      navigate('/dashboard')
      
    } catch (error) {
      setSubmitError('Invalid email or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Clean White Card - Same as Signup */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
            
            {/* Header - Same Style */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                Welcome Back
              </h1>
              <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full mb-6 shadow-sm"></div>
              <p className="text-gray-600 font-semibold text-lg">Sign in to your admin account</p>
            </div>

            {/* Error */}
            {submitError && (
              <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-2xl shadow-md flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span className="text-sm font-semibold text-red-900">{submitError}</span>
              </div>
            )}

            {/* Login Form - Compact */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black transition-all duration-300 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl hover:border-gray-700 ${
                    errors.email 
                      ? 'border-red-500 bg-red-50 shadow-red-200 focus:ring-red-200 focus:border-red-600' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  placeholder="admin@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center gap-2 pt-1">
                    <span className="text-sm font-black">×</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black transition-all duration-300 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl hover:border-gray-700 ${
                    errors.password 
                      ? 'border-red-500 bg-red-50 shadow-red-200 focus:ring-red-200 focus:border-red-600' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center gap-2 pt-1">
                    <span className="text-sm font-black">×</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gray-900 hover:bg-black text-white py-5 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-black/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4 border border-gray-900 hover:border-black relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                {isSubmitting ? (
                  <>
                    <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin shadow-lg"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl group-hover:scale-110 transition-all duration-300">🔐</span>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-lg text-gray-700 font-semibold">
                Need an account?{' '}
                <Link to="/signup" className="font-black text-gray-900 hover:text-black transition-all duration-200 text-xl hover:underline">
                  Create Account →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
