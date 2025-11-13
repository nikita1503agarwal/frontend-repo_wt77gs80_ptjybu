import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ value, label }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  )
}

export default function App() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    fetch(backend + '/test').then(r => r.json()).then(d => {
      setStatus(d.backend + ' • DB: ' + d.database)
    }).catch(() => setStatus('Backend not reachable'))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="relative h-[60vh] w-full">
        <Spline scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Mental Health Assessment & Therapy Platform</h1>
            <p className="mt-4 text-slate-200 max-w-2xl">Connect parents, verified doctors, and hospital centers to assess, diagnose, schedule therapy, and track progress — securely and seamlessly.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/auth/login" className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold">Login / Register</Link>
              <Link to="/hospitals" className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20">Browse Hospitals</Link>
            </div>
            <p className="mt-4 text-sm text-slate-300">System status: {status}</p>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-4">
        <Stat value="4" label="Roles" />
        <Stat value="✓" label="Verified Doctors" />
        <Stat value="AES-256" label="Data Encryption" />
        <Stat value="Realtime" label="Chat & Notifications" />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        <Card title="Parent Dashboard" desc="Take assessments, see reports, schedule therapy, and track progress.">
          <Link to="/dashboard/parent" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold">Open</Link>
        </Card>
        <Card title="Doctor Dashboard" desc="Review assigned assessments, finalize diagnosis, and manage slots.">
          <Link to="/dashboard/doctor" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-white/10">Open</Link>
        </Card>
        <Card title="Hospital Admin" desc="Manage hospital info and verify doctors.">
          <Link to="/dashboard/hospital" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-white/10">Open</Link>
        </Card>
      </section>
    </div>
  )
}

function Card({ title, desc, children }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-slate-300 mt-2">{desc}</p>
      {children}
    </div>
  )
}
