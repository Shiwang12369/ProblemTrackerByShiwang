import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  // Check auth state
  useEffect(() => {
    try {
      const user = localStorage.getItem('current_admin')
      if (user) {
        setCurrentUser(JSON.parse(user))
      }
    } catch {
      setCurrentUser(null)
    }
  }, [])

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('current_admin')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <nav className="h-20 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="h-full px-6 lg:px-12 flex items-center justify-between">

        {/* Logo - LEFT SIDE */}
        <Link to="/ReportHome" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-all">
            <span className="text-white font-black text-lg">RMS</span>
          </div>
          <span className="text-2xl font-black text-gray-900 hidden lg:block">
            Report Management System
          </span>
        </Link>


        {/* Navigation Links - CENTER */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl text-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center group"
          >
            <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">🏠</span>
            Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-2xl text-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center group"
          >
            <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">📊</span>
            Dashboard
          </Link>

          <Link
            to="/add-report"
            className="px-6 py-3 rounded-2xl text-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center group"
          >
            <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">➕</span>
            Add Report
          </Link>

          <Link
            to="/reports"
            className="px-6 py-3 rounded-2xl text-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center group"
          >
            <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">📋</span>
            Reports
          </Link>
        </div>

        {/* RIGHT SIDE - Auth State */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            // LOGGED IN - Show User + Logout
            <>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all group">
                <span className="font-bold text-sm text-white">
                  {currentUser.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-2xl font-semibold text-sm shadow-lg hover:bg-red-700 active:scale-95 transition-all whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            // NOT LOGGED IN - Login/Signup
            <>
              <Link
                to="/login"
                className="px-6 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold text-sm shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
