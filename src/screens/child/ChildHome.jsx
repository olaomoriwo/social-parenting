// ChildHome.jsx
import { useState, useEffect } from 'react'

export function ChildHome({ tasks, onNav, onSwitch, onSubmit, onApprove }) {
  const [pts, setPts] = useState(0)
  const [sheet, setSheet] = useState(null)
  const [proof, setProof] = useState(false)

  useEffect(() => {
    let start = null
    const target = 1240
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 900, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setPts(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  const today = tasks.filter(t => t.today || t.overdue)
  const done = today.filter(t => t.status === 'approved' || t.status === 'pending').length
  const h = new Date().getHours()
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Hey' : 'Evening'

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--cb)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,27,45,.97)', padding: '13px 16px 11px', borderBottom: '.5px solid var(--cbdr)', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 5 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2D6BE4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontSize: 13, fontWeight: 900, color: '#fff', border: '2px solid rgba(45,107,228,.45)', flexShrink: 0 }}>JJ</div>
        <div style={{ marginLeft: 10, flex: 1 }}>
          <div style={{ fontFamily: 'var(--fh)', fontSize: 17, fontWeight: 900, color: 'var(--ct)', letterSpacing: -.3 }}>{greet}, Jamie!</div>
          <div style={{ fontSize: 11, color: 'var(--cm)' }}>Friday · 3 April</div>
        </div>
        <button onClick={onSwitch} style={{ padding: '5px 10px', background: 'rgba(255,255,255,.06)', color: 'var(--cm)', border: '.5px solid var(--cbdr)', borderRadius: 7, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fb)' }}>Parent ↗</button>
      </div>

      <div style={{ padding: '12px 14px 16px' }}>
        {/* Points + Streak */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div style={{ background: 'var(--cs)', borderRadius: 14, border: '.5px solid var(--cbdr)', padding: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cm)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>This week</div>
            <div style={{ fontFamily: 'var(--fn)', fontSize: 30, fontWeight: 700, color: 'var(--cy)', lineHeight: 1 }}>{pts.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <span style={{ padding: '2px 7px', borderRadius: 4, background: 'rgba(6,214,160,.15)', color: 'var(--cg)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--fn)' }}>+150</span>
              <span style={{ fontSize: 11, color: 'var(--cm)' }}>today</span>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(140deg,#1A2D45,#2A1B35)', borderRadius: 14, border: '.5px solid var(--cbdr)', padding: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cm)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Streak</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ animation: 'flicker 1.7s ease-in-out infinite', display: 'inline-flex' }}>🔥</span>
              <div style={{ fontFamily: 'var(--fn)', fontSize: 30, fontWeight: 700, color: 'var(--cr)', lineHeight: 1 }}>7</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--cm)' }}>days in a row</div>
            <div style={{ marginTop: 7, padding: '3px 8px', borderRadius: 5, background: 'rgba(239,71,111,.15)', fontSize: 10, fontWeight: 700, color: 'var(--cr)', display: 'inline-block' }}>3 more = 2× tokens!</div>
          </div>
        </div>

        {/* Token balance */}
        <div style={{ background: 'var(--cs)', borderRadius: 14, border: '.5px solid var(--cbdr)', padding: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cm)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Token balance</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--fn)', fontSize: 24, fontWeight: 700, color: 'var(--cg)' }}>£2.50</div>
              <div style={{ fontSize: 11, color: 'var(--cm)', marginTop: 2 }}>ready to redeem</div>
            </div>
            <div style={{ padding: '5px 10px', borderRadius: 7, background: 'rgba(245,162,35,.12)', color: '#F5A623', fontSize: 11, fontWeight: 700, fontFamily: 'var(--fn)' }}>+ £1.50 pending</div>
          </div>
        </div>

        {/* Today tasks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--fh)', fontSize: 14, fontWeight: 900, color: 'var(--ct)', letterSpacing: -.2 }}>Today's Tasks</div>
          <div onClick={() => onNav('tasks')} style={{ fontSize: 11, color: 'var(--cy)', fontWeight: 700, cursor: 'pointer' }}>See all →</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
          <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,.08)', borderRadius: 4 }}>
            <div style={{ height: 7, borderRadius: 4, background: 'linear-gradient(90deg,var(--cy),#ffbe21)', width: `${today.length ? (done/today.length*100) : 0}%`, transition: 'width .9s .3s ease' }} />
          </div>
          <div style={{ fontFamily: 'var(--fn)', fontSize: 12, fontWeight: 700, color: 'var(--cy)', flexShrink: 0 }}>{done}/{today.length} done</div>
        </div>
        <div style={{ background: 'var(--cs)', borderRadius: 14, border: '.5px solid var(--cbdr)', padding: '4px 12px', marginBottom: 12 }}>
          {today.slice(0,3).map((t,i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: i < 2 ? '.5px solid var(--cbdr)' : 'none' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: t.status==='approved' ? 'rgba(6,214,160,.18)' : 'rgba(255,255,255,.05)', border: t.status==='approved' ? 'none' : '.5px solid var(--cbdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {t.status==='approved' && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2 2L8.5 2" stroke="#06D6A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: t.status==='approved' ? 'var(--cm)' : 'var(--ct)', textDecoration: t.status==='approved' ? 'line-through' : 'none', textDecorationColor: 'rgba(139,163,193,.3)' }}>{t.name}</div>
              {t.status === 'open' && <button onClick={() => setSheet(t)} style={{ padding: '5px 10px', background: 'var(--cy)', color: '#0F1B2D', border: 'none', borderRadius: 7, fontSize: 10, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--fb)' }}>Do it →</button>}
              {t.status === 'pending' && <span style={{ fontSize: 10, color: '#F5A623', fontWeight: 600 }}>Pending</span>}
              {t.status === 'approved' && <span style={{ fontFamily: 'var(--fn)', fontSize: 11, fontWeight: 700, color: 'var(--cg)' }}>+{t.pts}</span>}
            </div>
          ))}
        </div>

        {/* Quick nav grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[
            { id:'tasks', ico:'🎯', l:'My Tasks', s:'1 to complete', c:'rgba(6,214,160,.12)' },
            { id:'bounties', ico:'🏆', l:'Bounties', s:'3 available', c:'rgba(239,71,111,.12)' },
            { id:'board', ico:'📊', l:'Leaderboard', s:'#1 this week!', sc:'var(--cy)', c:'rgba(255,209,102,.1)' },
            { id:'me', ico:'👤', l:'My Profile', s:'Silver · 4 badges', c:'rgba(17,138,178,.12)' },
          ].map(q => (
            <div key={q.id} onClick={() => onNav(q.id)} style={{ background: 'var(--cs)', borderRadius: 13, border: '.5px solid var(--cbdr)', padding: 13, cursor: 'pointer' }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: q.c, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 7, fontSize: 16 }}>{q.ico}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ct)' }}>{q.l}</div>
              <div style={{ fontSize: 10, color: q.sc || 'var(--cm)', marginTop: 2 }}>{q.s}</div>
            </div>
          ))}
        </div>

        {/* Bounty teaser */}
        <div style={{ background: 'rgba(239,71,111,.1)', border: '.5px solid rgba(239,71,111,.28)', borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNav('bounties')}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(239,71,111,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--fh)', fontSize: 13, fontWeight: 900, color: 'var(--ct)', marginBottom: 2 }}>1 bounty available</div>
            <div style={{ fontSize: 11, color: 'var(--cm)' }}>Cook dinner for the family · Due today</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--fn)', fontSize: 15, fontWeight: 700, color: 'var(--cr)' }}>400pts</div>
            <div style={{ fontSize: 11, color: 'var(--cm)', marginTop: 1 }}>£4.00 + badge</div>
          </div>
        </div>
      </div>

      {/* Sheet */}
      {sheet && <TaskSheet task={sheet} onClose={() => setSheet(null)} onSubmit={id => { onSubmit(id); setSheet(null) }} onApprove={id => { onApprove(id); setSheet(null) }} />}
    </div>
  )
}

function TaskSheet({ task, onClose, onSubmit, onApprove }) {
  const [proof, setProof] = useState(false)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 40, display: 'flex', alignItems: 'flex-end' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#1D3251', borderRadius: '22px 22px 0 0', padding: '18px 20px 36px', width: '100%' }}>
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,.18)', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ fontFamily: 'var(--fh)', fontSize: 18, fontWeight: 900, color: 'var(--ct)', marginBottom: 4 }}>{task.name}</div>
        <div style={{ fontSize: 13, color: 'var(--cm)', marginBottom: 13, lineHeight: 1.4 }}>Submit for parent approval — your reward arrives once they say yes.</div>
        <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-around', marginBottom: 13 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--fn)', fontSize: 21, fontWeight: 700, color: 'var(--cy)' }}>+{task.pts}</div>
            <div style={{ fontSize: 9, color: 'var(--cm)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '.3px' }}>Points</div>
          </div>
          <div style={{ width: .5, background: 'rgba(255,255,255,.08)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--fn)', fontSize: 21, fontWeight: 700, color: 'var(--cg)' }}>£{task.tok.toFixed(2)}</div>
            <div style={{ fontSize: 9, color: 'var(--cm)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '.3px' }}>Token</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderTop: '.5px solid var(--cbdr)', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ct)' }}>Add photo proof</div>
            <div style={{ fontSize: 10, color: 'var(--cm)', marginTop: 1 }}>Helps parent approve faster</div>
          </div>
          <button onClick={() => setProof(!proof)} style={{ width: 42, height: 24, borderRadius: 12, background: proof ? 'var(--cg)' : 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
            <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: '#fff', top: 3, left: proof ? 21 : 3, transition: 'left .2s' }} />
          </button>
        </div>
        <button onClick={() => onSubmit(task.id)} style={{ width: '100%', padding: 14, background: 'var(--cg)', color: '#0F1B2D', border: 'none', borderRadius: 13, fontSize: 14, fontWeight: 900, fontFamily: 'var(--fh)', cursor: 'pointer', marginBottom: 8 }}>Submit for approval ✓</button>
        <button onClick={() => onApprove(task.id)} style={{ width: '100%', padding: 12, background: 'rgba(255,209,102,.12)', color: 'var(--cy)', border: 'none', borderRadius: 13, fontSize: 12, fontWeight: 700, fontFamily: 'var(--fb)', cursor: 'pointer', marginBottom: 8 }}>⚡ Simulate parent approval →</button>
        <button onClick={onClose} style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,.05)', color: 'var(--cm)', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 600, fontFamily: 'var(--fb)', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}

export default ChildHome
