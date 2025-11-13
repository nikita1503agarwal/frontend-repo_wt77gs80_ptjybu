import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'parent' })
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/register'
      const body = mode === 'login' ? { email: form.email, password: form.password } : form
      const res = await fetch(backend + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('token', data.access_token)
      setToken(data.access_token)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex gap-2 mb-4">
          <button className={`px-3 py-1 rounded ${mode==='login'?'bg-emerald-500 text-slate-950':'bg-white/10'}`} onClick={()=>setMode('login')}>Login</button>
          <button className={`px-3 py-1 rounded ${mode==='register'?'bg-emerald-500 text-slate-950':'bg-white/10'}`} onClick={()=>setMode('register')}>Register</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {mode==='register' && (
            <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          )}
          <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" className="w-full px-3 py-2 rounded bg-white/10" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          {mode==='register' && (
            <select className="w-full px-3 py-2 rounded bg-white/10" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option value="parent">Parent</option>
              <option value="doctor">Doctor</option>
              <option value="hospital_admin">Hospital Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          )}
          <button className="w-full bg-emerald-500 text-slate-950 font-semibold py-2 rounded">{mode==='login'? 'Login' : 'Create account'}</button>
        </form>

        {error && <p className="mt-3 text-red-400">{error}</p>}
        {token && <p className="mt-3 text-emerald-400 break-all">Logged in. Token saved.</p>}
      </div>
    </div>
  )
}
