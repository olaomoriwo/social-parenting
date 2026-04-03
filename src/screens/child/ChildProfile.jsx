import { useEffect, useState } from 'react'

const BADGES = [
  { name:'First Task',   earned:true,  color:'#FFD166' },
  { name:'Week Warrior', earned:true,  color:'#EF476F' },
  { name:'Bookworm',     earned:true,  color:'#118AB2' },
  { name:'Tidy Star',    earned:true,  color:'#06D6A0' },
  { name:'Chef',         earned:false },
  { name:'Handyman',     earned:false },
  { name:'Gold Level',   earned:false },
  { name:'30-Day Streak',earned:false },
]

const WEEK_HIST = [1, 1, 1, 0, 1, 1, 0]
const DAYS = ['M','T','W','T','F','S','S']

export default function ChildProfile() {
  const [lvlWidth, setLvlWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLvlWidth(16), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--cb)' }}>
      {/* Hero */}
      <div style={{ background:'rgba(26,45,69,.5)', padding:'18px 16px 14px', borderBottom:'.5px solid var(--cbdr)', display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
        <div style={{ position:'relative', marginBottom:9 }}>
          <div style={{ width:68, height:68, borderRadius:'50%', background:'#2D6BE4', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fh)', fontSize:24, fontWeight:900, color:'#fff', border:'3px solid var(--cy)' }}>JJ</div>
          <div style={{ position:'absolute', bottom:-4, right:-4, padding:'2px 8px', borderRadius:9, background:'rgba(148,163,184,.2)', border:'.5px solid rgba(148,163,184,.3)', fontSize:9, fontWeight:800, color:'#94a3b8' }}>Silver</div>
        </div>
        <div style={{ fontFamily:'var(--fh)', fontSize:20, fontWeight:900, color:'var(--ct)', letterSpacing:-.3, marginBottom:1 }}>Jamie</div>
        <div style={{ fontSize:12, color:'var(--cm)' }}>Age 12 · The Johnson Family</div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 14px' }}>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
          {[
            { v:'8,420', l:'Total pts', c:'var(--cy)' },
            { v:'1,240', l:'This week', c:'var(--cy)' },
            { v:'7',     l:'Day streak', c:'var(--cr)' },
            { v:'4',     l:'Badges',    c:'#F5A623' },
          ].map((s,i) => (
            <div key={i} style={{ background:'var(--cs)', borderRadius:11, border:'.5px solid var(--cbdr)', padding:'11px 6px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--fn)', fontSize:18, fontWeight:700, color:s.c, lineHeight:1 }}>{s.v}</div>
              <div style={{ fontSize:9, color:'var(--cm)', marginTop:3, lineHeight:1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
          <div style={{ fontFamily:'var(--fh)', fontSize:14, fontWeight:900, color:'var(--ct)', letterSpacing:-.2 }}>My Badges</div>
          <div style={{ fontSize:10, color:'var(--cm)' }}>4 of 8 earned</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
          {BADGES.map((b,i) => (
            <div key={i} style={{ background:'var(--cs)', borderRadius:11, border:`.5px solid ${b.earned ? 'rgba(255,209,102,.25)' : 'var(--cbdr)'}`, padding:'10px 6px', textAlign:'center' }}>
              <div style={{ width:30, height:30, borderRadius:9, margin:'0 auto 5px', display:'flex', alignItems:'center', justifyContent:'center', background: b.earned ? 'rgba(255,209,102,.12)' : 'rgba(255,255,255,.04)' }}>
                {b.earned
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polygon points="8,1 10,6 15,6 11,9.5 12.5,14.5 8,11.5 3.5,14.5 5,9.5 1,6 6,6" fill={b.color}/></svg>
                  : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="3" y="5" width="6" height="6" rx="1" fill="none" stroke="rgba(139,163,193,.25)" strokeWidth="1"/><path d="M4.5 5V3.5C4.5 2.7 7.5 2.7 7.5 3.5V5" stroke="rgba(139,163,193,.25)" strokeWidth="1" fill="none"/></svg>
                }
              </div>
              <div style={{ fontSize:9, fontWeight:700, color: b.earned ? 'var(--ct)' : 'rgba(139,163,193,.35)', lineHeight:1.2 }}>{b.earned ? b.name : '???'}</div>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div style={{ background:'var(--cs)', borderRadius:14, border:'.5px solid var(--cbdr)', padding:14, marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'var(--cm)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:10 }}>This week</div>
          <div style={{ display:'flex', gap:5, justifyContent:'space-between' }}>
            {DAYS.map((d,i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ fontSize:9, fontWeight:700, color:'var(--cm)' }}>{d}</div>
                <div style={{ width:28, height:28, borderRadius:'50%', background: WEEK_HIST[i] ? 'rgba(6,214,160,.18)' : 'rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: i===6 ? '0 0 0 2px var(--co)' : 'none' }}>
                  {WEEK_HIST[i] && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l2.5 2.5 5.5-5.5" stroke="#06D6A0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level progress */}
        <div style={{ background:'var(--cs)', borderRadius:14, border:'.5px solid var(--cbdr)', padding:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'var(--cm)', textTransform:'uppercase', letterSpacing:'.5px' }}>Level progress</div>
            <div style={{ fontSize:11, color:'var(--cm)' }}>1,260 pts to Gold</div>
          </div>
          <div style={{ height:5, background:'rgba(255,255,255,.08)', borderRadius:3 }}>
            <div style={{ height:5, background:'linear-gradient(90deg,#94a3b8,#cbd5e1)', borderRadius:3, width:`${lvlWidth}%`, transition:'width 1.1s .3s ease' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8' }}>Silver</div>
            <div style={{ fontSize:10, fontWeight:700, color:'var(--cy)' }}>Gold</div>
          </div>
        </div>
      </div>
    </div>
  )
}
