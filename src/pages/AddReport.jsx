import { useState } from 'react'
import { useReports } from '../context/ReportContext.jsx'
import Navbar from '../components/layout/Navbar.jsx'

export default function AddReport() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { addReport } = useReports()

  const validateForm = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      setSubmitting(true)
      await addReport(title.trim(), description.trim())
      setSuccess('Report added successfully!')
      setTitle('')
      setDescription('')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setErrors({ submit: 'Failed to add report' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Form Content */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen pt-4">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent">
                Add New Report
              </h1>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Submit a new issue or report to the system
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-8 p-4 bg-emerald-100 border border-emerald-200 rounded-2xl text-emerald-800 font-semibold text-center">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter report title"
                  className={`w-full px-5 py-4 text-lg border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className={`w-full px-5 py-4 text-lg border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-vertical transition-all ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-black to-gray-900 text-white py-6 px-8 text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin mr-3">⏳</span>
                    Adding Report...
                  </>
                ) : (
                  <>
                    <span className="text-2xl mr-3">➕</span>
                    Create Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
