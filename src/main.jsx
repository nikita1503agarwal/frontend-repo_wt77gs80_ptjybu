import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

import Auth from './components/Auth'
import Hospitals from './components/Hospitals'
import HospitalDetail from './components/HospitalDetail'
import DoctorProfile from './components/DoctorProfile'
import ParentDashboard from './components/ParentDashboard'
import Assessment from './components/Assessment'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/assessment/:ageGroup?" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
