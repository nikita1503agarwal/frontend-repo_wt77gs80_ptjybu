import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const QUESTIONS = {
  infant: [
    { id: 'eye_contact', q: 'Does your child make eye contact frequently?' },
    { id: 'response_name', q: 'Does your child respond to their name?' },
  ],
  child: [
    { id: 'attention', q: 'Does your child have difficulty sustaining attention?' },
    { id: 'reading', q: 'Does your child struggle with reading or writing?' },
  ],
  adolescent: [
    { id: 'impulsivity', q: 'Do they show signs of impulsivity or restlessness?' },
    { id: 'social', q: 'Do they avoid social interactions?' },
  ],
}

export default function Assessment(){
  const token = localStorage.getItem('token')
  const [ageGroup, setAgeGroup] = useState('child')
  const [condition, setCondition] = useState('autism')
  const [answers, setAnswers] = useState({})
  const [saving, setSaving] = useState(false)

  const startVoice = (id) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(!SpeechRecognition){ alert('Voice not supported on this browser'); return }
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript
      setAnswers(prev => ({...prev, [id]: text}))
    }
    rec.start()
  }

  const submit = async () => {
    if(!token){ alert('Please login as Parent'); return }
    setSaving(true)
    const responses = {}
    for(const q of QUESTIONS[ageGroup]) responses[q.id] = answers[q.id] || ''
    const res = await fetch(backend + '/assessments', { method: 'POST', headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+token }, body: JSON.stringify({ child_name: 'Child', child_age: ageGroup==='infant'?2:7, age_group: ageGroup, condition, responses }) })
    const j = await res.json()
    setSaving(false)
    if(!res.ok) return alert(j.detail || 'Failed')
    alert('Assessment submitted! Assigned doctor: ' + (j.assigned_doctor_id || 'Pending'))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Assessment</h1>
        <div className="grid md:grid-cols-3 gap-3">
          <select className="bg-white/10 rounded px-3 py-2" value={ageGroup} onChange={e=>setAgeGroup(e.target.value)}>
            <option value="infant">Infant (0-3)</option>
            <option value="child">Child (4-12)</option>
            <option value="adolescent">Adolescent (13-18)</option>
          </select>
          <select className="bg-white/10 rounded px-3 py-2" value={condition} onChange={e=>setCondition(e.target.value)}>
            <option value="autism">Autism</option>
            <option value="adhd">ADHD</option>
            <option value="dyslexia">Dyslexia</option>
            <option value="other">Other</option>
          </select>
          <button onClick={submit} disabled={saving} className="bg-emerald-500 text-slate-950 rounded px-4">{saving? 'Submitting...' : 'Submit'}</button>
        </div>

        <div className="space-y-4">
          {QUESTIONS[ageGroup].map(q => (
            <div key={q.id} className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="font-medium mb-2">{q.q}</div>
              <div className="flex gap-2">
                <input className="flex-1 bg-white/10 rounded px-3 py-2" value={answers[q.id]||''} onChange={e=>setAnswers(prev=>({...prev,[q.id]:e.target.value}))} />
                <button onClick={()=>startVoice(q.id)} className="px-3 py-2 rounded bg-white/10">🎤</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
