import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()

  const isEmailTaken = () => {
    try {
      const adminUsers = JSON.parse(localStorage.getItem('admin_users') || '[]')
      return adminUsers.some(user => user.email === formData.email)
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    } else if (isEmailTaken()) {
      newErrors.email = 'Email already registered'
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
      const adminUsers = JSON.parse(localStorage.getItem('admin_users') || '[]')
      const newUser = { id: Date.now().toString(), name: formData.name, email: formData.email, password: formData.password }
      adminUsers.push(newUser)
      localStorage.setItem('admin_users', JSON.stringify(adminUsers))
      setFormData({ name: '', email: '', password: '' })
      navigate('/dashboard')
    } catch (error) {
      setSubmitError('Signup failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Clean White Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                Sign Up
              </h1>
              <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full mb-6 shadow-sm"></div>
              <p className="text-gray-600 font-semibold text-lg">Create Admin Account</p>
            </div>

            {/* Error */}
            {submitError && (
              <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-2xl shadow-md flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span className="text-sm font-semibold text-red-900">{submitError}</span>
              </div>
            )}

            {/* Stylish Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black transition-all duration-300 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl hover:border-gray-700 ${
                    errors.name 
                      ? 'border-red-500 bg-red-50 shadow-red-200 focus:ring-red-200 focus:border-red-600' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center gap-2 pt-1">
                    <span className="text-sm font-black">×</span> {errors.name}
                  </p>
                )}
              </div>

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
                  placeholder="Minimum 6 characters"
                />
                {errors.password && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center gap-2 pt-1">
                    <span className="text-sm font-black">×</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Premium Black Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gray-900 hover:bg-black text-white py-5 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-black/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4 border border-gray-900 hover:border-black relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                {isSubmitting ? (
                  <>
                    <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin shadow-lg"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl group-hover:scale-110 transition-all duration-300">👤</span>
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-lg text-gray-700 font-semibold">
                Already have an account?{' '}
                <Link to="/login" className="font-black text-gray-900 hover:text-black transition-all duration-200 text-xl hover:underline">
                  Sign In →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
