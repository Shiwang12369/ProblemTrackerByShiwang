import Navbar from '../components/layout/Navbar.jsx'
import { useReports } from '../context/ReportContext.jsx'

export default function Dashboard() {
  const { reports } = useReports()
  
  const total = reports.length
  const pending = reports.filter(r => r.status === 'Pending').length
  const resolved = reports.filter(r => r.status === 'Resolved').length
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0
  const maxBarValue = Math.max(total, 10)

  if (total === 0) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen pt-4">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <div className="text-6xl mb-6 opacity-20">📊</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No reports yet</h2>
            <p className="text-lg text-gray-500 mb-8">Add first report to see analytics</p>
            <a href="/add-report" className="bg-black text-white px-6 py-3 rounded-xl text-lg font-bold hover:shadow-lg transition-all">
              ➕ Add Report
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-4">
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">Analytics overview</p>
          </div>

          {/* Stats Cards - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="group bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Total</p>
                  <div className="text-3xl font-black text-gray-900">{total}</div>
                </div>
                <div className="text-4xl opacity-75">📊</div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">Pending</p>
                  <div className="text-3xl font-black text-yellow-600">{pending}</div>
                </div>
                <div className="text-4xl opacity-75">⏳</div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-700 uppercase mb-1">Resolved</p>
                  <div className="text-3xl font-black text-emerald-600">{resolved}</div>
                </div>
                <div className="text-4xl opacity-75">✅</div>
              </div>
            </div>
          </div>

          {/* Charts - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Bar Chart - Smaller */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Reports Distribution</h3>
              <div className="flex items-end gap-3 h-32">
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-gradient-to-t from-gray-400 to-gray-300 rounded-xl h-[${(total / maxBarValue) * 80}%] transition-all duration-700`} />
                  <p className="mt-3 text-xs font-semibold text-gray-700">Total</p>
                  <span className="text-sm font-bold">{total}</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-xl h-[${(pending / maxBarValue) * 80}%] transition-all duration-700`} />
                  <p className="mt-3 text-xs font-semibold text-yellow-700">Pending</p>
                  <span className="text-sm font-bold text-yellow-600">{pending}</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-xl h-[${(resolved / maxBarValue) * 80}%] transition-all duration-700`} />
                  <p className="mt-3 text-xs font-semibold text-emerald-700">Resolved</p>
                  <span className="text-sm font-bold text-emerald-600">{resolved}</span>
                </div>
              </div>
            </div>

            {/* Progress Ring - Smaller */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 w-full h-full border-8 border-gray-200 rounded-full" />
                <div 
                  className="absolute inset-1 w-full h-full border-6 border-emerald-400 rounded-full"
                  style={{ 
                    background: `conic-gradient(emerald-400 ${resolutionRate * 3.6}deg, gray-200 0deg)`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full w-20 h-20">
                  <div className="text-2xl font-black text-emerald-600">{resolutionRate}%</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Resolution Rate</h3>
              <p className="text-sm text-gray-600">{resolved}/{total} completed</p>
            </div>
          </div>

          {/* Quick Actions - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
            <a href="/add-report" className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center text-lg font-bold transition-all">
              ➕ Add Report
            </a>
            <a href="/reports" className="border-2 border-gray-900 text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-900 hover:text-white flex items-center justify-center text-lg font-bold transition-all">
              📋 View Reports
            </a>
          </div>
        </div>
      </div>
      
    </>
  )
}
