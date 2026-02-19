import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { title: "Dashboard", bg: "from-emerald-500 to-green-600" },
    { title: "Reports", bg: "from-blue-500 to-indigo-600" },
    { title: "Analytics", bg: "from-purple-500 to-pink-600" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      
      {/* Medium Hero */}
      <section className="min-h-[85vh] bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-emerald-100/30 animate-pulse"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            
            {/* Left Content - Medium */}
            <div className="lg:pr-8">
              <div className="inline-flex items-center px-5 py-3 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 mb-8">
                <span className="text-2xl mr-3">🏛️</span>
                <span className="font-bold text-lg">Report Management System</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Digital 
                <span className={`block bg-gradient-to-r ${slides[currentSlide].bg} bg-clip-text text-transparent text-4xl md:text-5xl`}>
                  Report Portal
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-lg leading-relaxed">
                Secure platform for government departments to track and resolve citizen issues efficiently
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/login"
                  className="group bg-gradient-to-r from-black to-gray-900 text-white px-10 py-4 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-xl">🔐</span>
                  <span>Admin Login</span>
                </Link>
                <Link 
                  to="/signup"
                  className="group border-3 border-gray-900 text-gray-900 px-10 py-4 rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-xl">📋</span>
                  <span>Admin Sign</span>
                </Link>
              </div>
            </div>

            {/* Medium Carousel */}
            <div className="relative">
              <div className="h-96 md:h-[450px] w-full rounded-4xl shadow-2xl overflow-hidden border-4 border-white/40 bg-gradient-to-br from-gray-100/70 to-blue-100/50 backdrop-blur-xl relative">
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg} opacity-25 animate-pulse`}/>
                
                {/* Main Content */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center text-white drop-shadow-2xl">
                    <div className="text-8xl md:text-9xl mb-8 animate-bounce">📊</div>
                    <h3 className="text-3xl md:text-4xl font-black drop-shadow-xl mb-4">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-xl md:text-2xl font-semibold drop-shadow-lg">
                      Live Analytics Dashboard
                    </p>
                  </div>
                </div>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-white/95 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        currentSlide === i 
                          ? 'bg-black scale-125 shadow-lg' 
                          : 'bg-gray-400 hover:bg-gray-600 hover:scale-110'
                      }`}
                      onClick={() => setCurrentSlide(i)}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="absolute top-8 right-8 bg-black/80 text-white px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-xl">
                  {currentSlide + 1}/{slides.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medium Features */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Key Features
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full shadow-lg mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern digital platform for efficient governance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 hover:border-emerald-200">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-2xl group-hover:scale-110 transition-all">
                📋
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Centralized Reports</h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                Single platform for all departments to log and track issues
              </p>
            </div>

            <div className="group p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 hover:border-blue-200">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-2xl group-hover:scale-110 transition-all">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Live Analytics</h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                Real-time dashboard with performance metrics and insights
              </p>
            </div>

            <div className="group p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 hover:border-purple-200">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-2xl group-hover:scale-110 transition-all">
                🔒
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Secure Access</h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                Enterprise-grade authentication with role-based permissions
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
