import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DoctorProfile(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(()=>{
    fetch(`${backend}/doctors/${id}`).then(r=>r.json()).then(setData)
  },[id])

  const book = async (slot, period) => {
    if(!token){ alert('Please login as Parent'); return }
    const res = await fetch(backend + '/appointments', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}, body: JSON.stringify({ doctor_id:id, hospital_id:data.hospital_id, slot, period, mode:'online' })})
    const j = await res.json()
    if(!res.ok) return alert(j.detail||'Failed')
    alert('Appointment created!')
  }

  if(!data) return <div className="min-h-screen bg-slate-950 text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-xl p-6 bg-white/5 border border-white/10">
          <div className="text-3xl font-semibold flex items-center gap-2">{data.name || 'Doctor'} <span className="text-emerald-400">✓ Verified</span></div>
          <div className="text-slate-300">{(data.specialization||[]).join(', ')}</div>
          <p className="mt-3">{data.bio}</p>
        </div>

        <div className="rounded-xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Availability</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {(data.availability||[]).map((s, idx)=> (
              <button key={idx} onClick={()=>book(s.time, s.period)} className="px-3 py-2 rounded bg-emerald-500 text-slate-950">{new Date(s.time).toLocaleString()} • {s.period}</button>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
          <div className="space-y-2">
            {(data.testimonials||[]).map(t => (
              <div key={t.id} className="p-3 rounded bg-white/10">
                <div className="text-yellow-300">{'★'.repeat(t.rating)}</div>
                <div>{t.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
