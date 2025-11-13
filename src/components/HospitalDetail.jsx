import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HospitalDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    fetch(`${backend}/hospitals/${id}`).then(r=>r.json()).then(setData)
  },[id])

  if(!data) return <div className="min-h-screen bg-slate-950 text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="rounded-xl p-6 bg-white/5 border border-white/10">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <p className="text-slate-300">{data.location}</p>
          <p className="mt-3">{data.description}</p>
          <div className="mt-3 text-sm">Specializations: {(data.specialization||[]).join(', ')}</div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Verified Doctors</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(data.doctors||[]).map(d => (
              <Link key={d.id} to={`/doctor/${d.id}`} className="rounded-xl p-4 bg-white/5 border border-white/10 block hover:bg-white/10">
                <div className="text-xl font-semibold flex items-center gap-2">{d.name || 'Doctor'} <span className="text-emerald-400">✓ Verified</span></div>
                <div className="text-slate-300">{(d.specialization||[]).join(', ')}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
