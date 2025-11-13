import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Hospitals() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(backend + '/hospitals').then(r=>r.json()).then(setItems).catch(()=>setItems([]))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Hospital Centers</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map(h => (
            <a key={h.id} href={`/hospital/${h.id}`} className="rounded-xl p-4 bg-white/5 border border-white/10 block hover:bg-white/10">
              <div className="text-xl font-semibold">{h.name}</div>
              <div className="text-slate-300">{h.location}</div>
              <div className="mt-2 text-sm">{(h.specialization||[]).join(', ')}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
