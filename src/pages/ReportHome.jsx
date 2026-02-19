import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'

export default function Home() {
  return (
    <>

      <Navbar />
      

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          
          {/* Title - Smaller */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent leading-tight">
            Report Management
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            System
          </h2>
          
          {/* Subtitle - Smaller */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Professional admin dashboard to manage, track, and resolve reports
          </p>
          
          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/dashboard"
              className="group bg-gradient-to-r from-black to-gray-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
            >
              <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">🚀</span>
              Dashboard
            </Link>
            <Link
              to="/add-report"
              className="group border-3 border-black text-black px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-bold hover:bg-black hover:text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
            >
              <span className="mr-2 text-xl group-hover:translate-x-1 transition-all">➕</span>
              Add Report
            </Link>
          </div>
          
          {/* Compact Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="text-5xl mb-4 mx-auto group-hover:scale-110 transition-all">📊</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Dashboard</h3>
              <p className="text-lg text-gray-600">Real-time analytics</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-emerald-50/80 to-blue-50/60 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="text-5xl mb-4 mx-auto group-hover:scale-110 transition-all">➕</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Add Report</h3>
              <p className="text-lg text-gray-600">Quick submission</p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-purple-50/80 to-pink-50/60 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="text-5xl mb-4 mx-auto group-hover:scale-110 transition-all">📋</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Reports</h3>
              <p className="text-lg text-gray-600">Track & manage</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
