import { useState } from 'react'

const CURRENCIES = [
  { v: 'GBP', l: 'GBP — British Pound (£)', s: '£' },
  { v: 'USD', l: 'USD — US Dollar ($)', s: '$' },
  { v: 'EUR', l: 'EUR — Euro (€)', s: '€' },
  { v: 'NGN', l: 'NGN — Nigerian Naira (₦)', s: '₦' },
  { v: 'ZAR', l: 'ZAR — South African Rand (R)', s: 'R' },
  { v: 'KES', l: 'KES — Kenyan Shilling (KSh)', s: 'KSh' },
  { v: 'GHS', l: 'GHS — Ghanaian Cedi (₵)', s: '₵' },
  { v: 'CAD', l: 'CAD — Canadian Dollar (CA$)', s: 'CA$' },
  { v: 'AUD', l: 'AUD — Australian Dollar (A$)', s: 'A$' },
]
const COLORS = ['#EF476F','#2D6BE4','#06D6A0','#FFD166','#9B5DE5','#FF9F1C','#118AB2','#E84855']
const TASK_TEMPLATES = [
  { id:1, cat:'Bedroom', name:'Make your bed', pts:50, v:.50 },
  { id:2, cat:'Bedroom', name:'Tidy your room', pts:75, v:.75 },
  { id:3, cat:'Bedroom', name:'Put away clothes', pts:50, v:.50 },
  { id:4, cat:'Kitchen', name:'Wash the dishes', pts:75, v:.75 },
  { id:5, cat:'Kitchen', name:'Wipe the counters', pts:50, v:.50 },
  { id:6, cat:'Kitchen', name:'Empty dishwasher', pts:60, v:.60 },
  { id:7, cat:'Home', name:'Take out the bins', pts:100, v:1.00 },
  { id:8, cat:'Home', name:'Vacuum the lounge', pts:100, v:1.00 },
  { id:9, cat:'Home', name:'Water the plants', pts:40, v:.40 },
  { id:10, cat:'Growth', name:'Finish homework', pts:150, v:1.50 },
  { id:11, cat:'Growth', name:'Read 20 minutes', pts:100, v:1.00 },
  { id:12, cat:'Growth', name:'Screen-free morning', pts:200, v:2.00 },
]

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0)
  const [D, setD] = useState({
    name: '', email: '', pass: '',
    famName: '', currency: 'GBP', taskVal: 0.50,
    children: [], cn: '', ca: '', cc: COLORS[0],
    sel: new Set(),
  })

  const sym = CURRENCIES.find(c => c.v === D.currency)?.s || '£'
  const update = p => setD(d => ({ ...d, ...p }))

  const prog = [
    'Account', 'Family', 'Children', 'Tasks'
  ]

  const canNext0 = D.name.trim().length > 1 && D.email.includes('@') && D.pass.length >= 8
  const canNext1 = D.famName.trim().length > 0
  const canAddChild = D.cn.trim().length > 0 && parseInt(D.ca) >= 2 && parseInt(D.ca) <= 17
  const canNext3 = D.children.length > 0

  const addChild = () => {
    if (!canAddChild) return
    update({
      children: [...D.children, { name: D.cn, age: parseInt(D.ca), color: D.cc }],
      cn: '', ca: '',
    })
  }
  const removeChild = i => update({ children: D.children.filter((_, j) => j !== i) })
  const toggleTask = id => {
    const s = new Set(D.sel)
    s.has(id) ? s.delete(id) : s.add(id)
    update({ sel: s })
  }

  const finish = () => {
    onDone({
      parentName: D.name, email: D.email,
      famName: D.famName, currency: D.currency, sym,
      children: D.children,
      tasks: TASK_TEMPLATES.filter(t => D.sel.has(t.id)),
    })
  }

  const S = { fontSize: 13, color: 'var(--pu)', lineHeight: 1.4, marginBottom: 14 }
  const LBL = { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 5, marginTop: 2 }
  const INP = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--pe)', borderRadius: 10, fontSize: 15, fontFamily: 'var(--fb)', color: 'var(--pt)', background: '#fff', display: 'block', marginBottom: 14, outline: 'none' }
  const BTN_P = { width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer', display: 'block', marginBottom: 0 }
  const BTN_G = { ...BTN_P, background: 'transparent', color: 'var(--pu)', border: '1.5px solid var(--pa)', marginTop: 10, fontWeight: 600 }
  const BTN_T = { ...BTN_P, background: 'transparent', color: 'var(--pu)', border: 'none', fontSize: 13, fontWeight: 400, marginTop: 8 }

  if (step === -1) return <Welcome onStart={() => setStep(0)} />

  return (
    <div style={{ background: 'var(--pb)', flex: 1, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--fp)' }}>

      {/* Welcome screen */}
      {step === -1 && <Welcome onStart={() => setStep(0)} />}

      {/* Step 0 — Account */}
      {step === 0 && (
        <>
          <div style={{ padding: '20px 24px 0' }}>
            <ProgBar steps={prog} cur={0} />
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, marginBottom: 4 }}>Create your account</div>
            <div style={S}>You're the family admin. Add a co-parent later.</div>
          </div>
          <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
            <label style={LBL}>Your full name</label>
            <input style={INP} placeholder="e.g. Sarah Johnson" value={D.name} onChange={e => update({ name: e.target.value })} />
            <label style={LBL}>Email address</label>
            <input style={INP} type="email" placeholder="sarah@example.com" value={D.email} onChange={e => update({ email: e.target.value })} />
            <label style={LBL}>Password</label>
            <input style={INP} type="password" placeholder="At least 8 characters" value={D.pass} onChange={e => update({ pass: e.target.value })} />
          </div>
          <div style={{ padding: '14px 24px 28px' }}>
            <button style={{ ...BTN_P, opacity: canNext0 ? 1 : .5, cursor: canNext0 ? 'pointer' : 'not-allowed' }} disabled={!canNext0} onClick={() => setStep(1)}>Create Account</button>
          </div>
        </>
      )}

      {/* Step 1 — Family */}
      {step === 1 && (
        <>
          <div style={{ padding: '20px 24px 0' }}>
            <ProgBar steps={prog} cur={1} />
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, marginBottom: 4 }}>Your family</div>
            <div style={S}>How your household will appear in the app.</div>
          </div>
          <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
            <label style={LBL}>Family name</label>
            <input style={INP} placeholder="e.g. The Johnson Family" maxLength={32} value={D.famName} onChange={e => update({ famName: e.target.value })} />
            <label style={LBL}>Reward currency</label>
            <select style={{ ...INP, appearance: 'none', cursor: 'pointer' }} value={D.currency} onChange={e => update({ currency: e.target.value })}>
              {CURRENCIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
            </select>
            <label style={LBL}>Default reward per task</label>
            <input style={INP} type="number" min={0} max={10} step={0.10} value={D.taskVal} onChange={e => update({ taskVal: parseFloat(e.target.value) || 0 })} />
            <p style={{ fontSize: 11, color: 'var(--pu)', marginTop: -10 }}>You can set individual values per task later.</p>
          </div>
          <div style={{ padding: '14px 24px 28px' }}>
            <button style={{ ...BTN_P, opacity: canNext1 ? 1 : .5 }} disabled={!canNext1} onClick={() => setStep(2)}>Continue</button>
            <button style={BTN_T} onClick={() => setStep(0)}>← Back</button>
          </div>
        </>
      )}

      {/* Step 2 — Children */}
      {step === 2 && (
        <>
          <div style={{ padding: '20px 24px 0' }}>
            <ProgBar steps={prog} cur={2} />
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, marginBottom: 4 }}>Add your children</div>
            <div style={S}>Add at least one child to continue.</div>
          </div>
          <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
            {D.children.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff', border: '.5px solid var(--pe)', borderRadius: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pt)' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--pu)' }}>Age {c.age}</div>
                </div>
                <button onClick={() => removeChild(i)} style={{ background: 'none', border: 'none', color: 'var(--pdng)', fontSize: 20, cursor: 'pointer', padding: '2px 8px' }}>×</button>
              </div>
            ))}
            <label style={LBL}>Child's first name</label>
            <input style={INP} placeholder="e.g. Jamie" maxLength={20} value={D.cn} onChange={e => update({ cn: e.target.value })} />
            <label style={LBL}>Age (2–17)</label>
            <input style={{ ...INP, marginBottom: 4 }} type="number" min={2} max={17} placeholder="e.g. 10" value={D.ca} onChange={e => update({ ca: e.target.value })} />
            {D.ca && (parseInt(D.ca) < 2 || parseInt(D.ca) > 17) && <p style={{ fontSize: 11, color: 'var(--pdng)', marginBottom: 10 }}>Please enter a valid age between 2 and 17.</p>}
            <label style={{ ...LBL, marginTop: 12 }}>Profile colour</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {COLORS.map(c => (
                <div key={c} onClick={() => update({ cc: c })} style={{ width: 34, height: 34, borderRadius: '50%', background: c, cursor: 'pointer', border: `3px solid ${D.cc === c ? '#1A1D23' : 'transparent'}`, transform: D.cc === c ? 'scale(1.2)' : 'scale(1)', transition: 'all .15s' }} />
              ))}
            </div>
            <button style={{ width: '100%', padding: 12, border: '1.5px solid var(--pa)', borderRadius: 12, background: 'transparent', color: 'var(--pa)', fontSize: 14, fontWeight: 700, fontFamily: 'var(--fp)', cursor: canAddChild ? 'pointer' : 'not-allowed', opacity: canAddChild ? 1 : .4, marginBottom: 4 }} disabled={!canAddChild} onClick={addChild}>+ Add Child</button>
          </div>
          <div style={{ padding: '10px 24px 28px' }}>
            <button style={{ ...BTN_P, opacity: canNext3 ? 1 : .5 }} disabled={!canNext3} onClick={() => setStep(3)}>Continue</button>
            <button style={BTN_T} onClick={() => setStep(1)}>← Back</button>
          </div>
        </>
      )}

      {/* Step 3 — Tasks */}
      {step === 3 && (
        <>
          <div style={{ padding: '20px 24px 0' }}>
            <ProgBar steps={prog} cur={3} />
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, marginBottom: 4 }}>Choose starter tasks</div>
            <div style={S}>Select tasks for your family. Edit any time.</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>
            {['Bedroom', 'Kitchen', 'Home', 'Growth'].map(cat => (
              <div key={cat}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.6px', margin: '14px 0 8px' }}>{cat}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {TASK_TEMPLATES.filter(t => t.cat === cat).map(t => (
                    <div key={t.id} onClick={() => toggleTask(t.id)} style={{ padding: 11, background: '#fff', border: `1.5px solid ${D.sel.has(t.id) ? 'var(--pa)' : 'var(--pe)'}`, borderRadius: 12, cursor: 'pointer', background: D.sel.has(t.id) ? 'var(--plgt)' : '#fff', transition: 'all .15s' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--pt)', marginBottom: 3 }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--pu)' }}>{t.pts}pts · <b style={{ color: 'var(--pa)' }}>{sym}{t.v.toFixed(2)}</b></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 24px 28px' }}>
            <button style={BTN_P} onClick={finish}>{D.sel.size === 0 ? 'Skip for now' : `Continue with ${D.sel.size} task${D.sel.size > 1 ? 's' : ''}`}</button>
            <button style={BTN_T} onClick={() => setStep(2)}>← Back</button>
          </div>
        </>
      )}
    </div>
  )
}

function Welcome({ onStart }) {
  return (
    <div style={{ background: 'var(--pb)', flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--cb)', padding: '44px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--cy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3L4 12H8V23H12V18H16V23H20V12H24L14 3Z" fill="#0F1B2D"/></svg>
        </div>
        <div style={{ fontFamily: 'var(--fh)', fontSize: 22, fontWeight: 900, color: 'var(--ct)', textAlign: 'center', letterSpacing: -.4, lineHeight: 1.25 }}>A new way to parent<br/>in the modern world</div>
        <div style={{ fontSize: 13, color: 'var(--cm)', textAlign: 'center', lineHeight: 1.5 }}>Harness the dopamine loop — redirect it to real life.</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {[
          { icon: '🎮', title: 'Gamified chores & habits', desc: 'Children earn points for home tasks — using the same reward loops they already love.' },
          { icon: '🏆', title: 'Family leaderboard', desc: 'Siblings compete on a weekly points board — healthy rivalry that builds consistency.' },
          { icon: '💰', title: 'Real micro-rewards', desc: 'Each task earns a small token with real monetary value — financial awareness from childhood.' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px', borderBottom: '.5px solid var(--pe)' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--plgt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pt)', marginBottom: 3 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--pu)', lineHeight: 1.45 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 24px 28px' }}>
        <button onClick={onStart} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer' }}>Get Started — it's free</button>
      </div>
    </div>
  )
}

function ProgBar({ steps, cur }) {
  return (
    <div style={{ display: 'flex', gap: 5, marginBottom: 18 }}>
      {steps.map((_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= cur ? 'var(--pa)' : 'var(--pe)', transition: 'background .3s' }} />
      ))}
    </div>
  )
}
