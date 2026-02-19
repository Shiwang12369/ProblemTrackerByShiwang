import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ReportProvider } from './context/ReportContext.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddReport from './pages/AddReport.jsx'
import Reports from './pages/Reports.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ReportHome from './pages/ReportHome.jsx'
  function App() {
    return (
      <ReportProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-report" element={<AddReport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ReportHome" element={<ReportHome />} />

          </Routes>
        </Router>
      </ReportProvider>
    )
  }

export default App
