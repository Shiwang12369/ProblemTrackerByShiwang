import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ReportContext = createContext()

const reportReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return { ...state, reports: action.payload }
    case 'ADD_REPORT':
      return { ...state, reports: [action.payload, ...state.reports] }
    case 'DELETE_REPORT':
      return { ...state, reports: state.reports.filter(r => r.id !== action.payload) }
    case 'MARK_RESOLVED':
      return {
        ...state,
        reports: state.reports.map(r => r.id === action.payload ? { ...r, status: 'Resolved' } : r)
      }
    default:
      return state
  }
}

export function ReportProvider({ children }) {
  const [reports, dispatch] = useReducer(reportReducer, { reports: [] })

  // Test data
  useEffect(() => {
    if (reports.reports.length === 0) {
      dispatch({
        type: 'SET_REPORTS',
        payload: [
          {
            id: 1,
            title: "Server Issue",
            description: "Database connection timeout",
            status: "Pending",
            createdAt: "19 Feb 2026, 1:45 AM"
          }
        ]
      })
    }
  }, [])

  const addReport = (title, description) => {
    dispatch({
      type: 'ADD_REPORT',
      payload: {
        id: Date.now(),
        title,
        description,
        status: 'Pending',
        createdAt: new Date().toLocaleString()
      }
    })
  }

  const deleteReport = (id) => dispatch({ type: 'DELETE_REPORT', payload: id })
  const markResolved = (id) => dispatch({ type: 'MARK_RESOLVED', payload: id })

  return (
    <ReportContext.Provider value={{ reports: reports.reports, addReport, deleteReport, markResolved }}>
      {children}
    </ReportContext.Provider>
  )
}

export const useReports = () => {
  const context = useContext(ReportContext)
  if (!context) throw new Error('useReports must be used within ReportProvider')
  return context
}
