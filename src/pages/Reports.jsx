import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import { useReports } from '../context/ReportContext.jsx'

export default function Reports() {
  const { reports, markResolved, deleteReport } = useReports()
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [filteredReports, setFilteredReports] = useState([])

  // Filtering Logic
  useEffect(() => {
    let filtered = reports

    // First filter by search query (title)
    if (searchQuery.trim()) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    }

    // Then filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(report => report.status === statusFilter)
    }

    // Sort latest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setFilteredReports(filtered)
  }, [reports, searchQuery, statusFilter])

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen pt-4">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent">
              All Reports
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Manage and track your reports with advanced filtering
            </p>
          </div>

          {/* Controls - Search + Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/20 focus:border-black transition-all shadow-sm"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 pointer-events-none">
                🔍
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/20 focus:border-black transition-all shadow-sm bg-white appearance-none cursor-pointer"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Resolved</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 lg:hidden">
                ▼
              </div>
            </div>
          </div>

          {/* Reports List or Empty State */}
          {filteredReports.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-8xl mb-8 opacity-20">📋</div>
              <h3 className="text-3xl font-bold text-gray-500 mb-4">No matching reports found</h3>
              <p className="text-xl text-gray-400 max-w-md mx-auto">
                Try adjusting your search query or filter settings
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  {/* Report Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                          report.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {report.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-gray-950 mb-2 truncate">
                      {report.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {report.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {report.status === 'Pending' && (
                      <button
                        onClick={() => markResolved(report.id)}
                        className="px-6 py-3 bg-emerald-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <span>✅</span>
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
