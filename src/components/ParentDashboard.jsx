import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ParentDashboard(){
  const token = localStorage.getItem('token')
  const [items, setItems] = useState([])

  useEffect(()=>{
    if(!token) return
    fetch(backend + '/parent/assessments', { headers: { 'Authorization': 'Bearer ' + token }}).then(r=>r.json()).then(setItems)
  },[token])

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Parent Dashboard</h1>
        {!token && <p className="text-red-300">Please login first from the Login/Register page.</p>}
        <div className="space-y-3 mt-4">
          {items.map(a => (
            <div key={a.id} className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="font-semibold">{a.child_name} • {a.condition.toUpperCase()}</div>
              <div className="text-sm text-slate-300">Risk score: {Math.round(a.risk_score||0)}</div>
              <div className="text-sm">Assigned Doctor ID: {a.assigned_doctor_id || 'Pending'}</div>
              <div className="text-sm">Status: {a.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
