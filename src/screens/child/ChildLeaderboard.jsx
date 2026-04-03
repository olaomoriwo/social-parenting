import { useState, useEffect } from 'react'

const LB = {
  week: [
    { rank:1, n:'You',  i:'JJ', c:'#2D6BE4', pts:1240, me:true,  delta:'+260', str:7 },
    { rank:2, n:'Lily', i:'LJ', c:'#EF476F', pts:980,  me:false, delta:'+180', str:5 },
    { rank:3, n:'Noah', i:'NJ', c:'#06D6A0', pts:760,  me:false, delta:'+120', str:3 },
  ],
  all: [
    { rank:1, n:'You',  i:'JJ', c:'#2D6BE4', pts:8420, me:true,  str:7 },
    { rank:2, n:'Lily', i:'LJ', c:'#EF476F', pts:7980, me:false, str:5 },
    { rank:3, n:'Noah', i:'NJ', c:'#06D6A0', pts:5340, me:false, str:3 },
  ],
}

export default function ChildLeaderboard() {
  const [period, setPeriod] = useState('week')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const data = LB[period]
  const [p2, p1, p3] = [data[1], data[0], data[2]]

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--cb)' }}>
      <div style={{ background:'rgba(15,27,45,.97)', padding:'13px 16px 11px', borderBottom:'.5px solid var(--cbdr)', display:'flex', alignItems:'center', flexShrink:0 }}>
        <div style={{ fontFamily:'var(--fh)', fontSize:17, fontWeight:900, color:'var(--ct)', flex:1, letterSpacing:-.3 }}>Leaderboard</div>
      </div>

      <div style={{ display:'flex', gap:4, padding:'9px 14px', flexShrink:0, background:'rgba(15,27,45,.97)', borderBottom:'.5px solid var(--cbdr)' }}>
        {['week','all'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{ flex:1, padding:8, borderRadius:9, fontSize:12, fontWeight:700, color: period===p ? '#0F1B2D' : 'var(--cm)', border:'none', background: period===p ? 'var(--cy)' : 'transparent', cursor:'pointer', fontFamily:'var(--fb)', transition:'all .15s' }}>
            {p === 'week' ? 'This week' : 'All time'}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto' }}>
        {/* Podium */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', alignItems:'end', gap:6, padding:'18px 14px 0' }}>
          {[
            { p:p2, platH:50, platCls:'pp2', rank:2, delay:'.25s', platBg:'rgba(148,163,184,.1)', platBdr:'rgba(148,163,184,.2)', platColor:'#94a3b8' },
            { p:p1, platH:68, platCls:'pp1', rank:1, delay:'.1s',  platBg:'rgba(255,209,102,.15)', platBdr:'rgba(255,209,102,.3)', platColor:'var(--cy)', star:true },
            { p:p3, platH:36, platCls:'pp3', rank:3, delay:'.4s',  platBg:'rgba(184,115,51,.1)', platBdr:'rgba(184,115,51,.2)', platColor:'#b87333' },
          ].map(({ p, platH, rank, delay, platBg, platBdr, platColor, star }) => (
            <div key={rank} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              {star && <div style={{ fontSize:18, color:'var(--cy)', fontWeight:700, fontFamily:'var(--fn)', animation:'fadeUp .4s .15s both' }}>★</div>}
              <div style={{ width: rank===1?52:44, height: rank===1?52:44, borderRadius:'50%', background:p.c, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fh)', fontSize: rank===1?16:14, fontWeight:900, color:'#fff', border: rank===1 ? '2px solid var(--cy)' : 'none' }}>{p.i}</div>
              <div style={{ fontSize:11, fontWeight:700, color: p.me ? 'var(--cy)' : 'var(--ct)' }}>{p.me ? 'You' : p.n}</div>
              <div style={{ fontFamily:'var(--fn)', fontSize:11, fontWeight:700, color: p.me ? 'var(--cy)' : 'var(--cm)' }}>{p.pts.toLocaleString()}</div>
              <div style={{ width:'100%', height:platH, borderRadius:'10px 10px 0 0', background:platBg, border:`.5px solid ${platBdr}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fn)', fontWeight:800, fontSize:20, color:platColor, transformOrigin:'bottom', animation: visible ? `podRise .6s ${delay} ease-out both` : 'none' }}>{rank}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'.5px solid var(--cbdr)', margin:'12px 14px 8px' }} />

        {/* Full list */}
        {data.map(p => (
          <div key={p.rank} style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 14px', borderRadius:10, margin:'0 6px 4px', background: p.me ? 'rgba(255,209,102,.06)' : 'transparent' }}>
            <div style={{ width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, fontFamily:'var(--fn)', flexShrink:0, background: p.rank===1 ? 'var(--cy)' : p.rank===2 ? '#94a3b8' : '#b87333', color: p.rank===1 ? '#0F1B2D' : '#fff' }}>{p.rank}</div>
            <div style={{ width:26, height:26, borderRadius:'50%', background:p.c, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, color:'#fff', flexShrink:0 }}>{p.i}</div>
            <div style={{ flex:1, fontSize:13, fontWeight:700, color: p.me ? 'var(--cy)' : 'var(--ct)' }}>{p.me ? 'You' : p.n}</div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:10, color:'var(--cm)', fontWeight:600, marginRight:2 }}>{p.str}🔥</span>
              <span style={{ fontFamily:'var(--fn)', fontSize:13, fontWeight:700, color:'var(--ct)' }}>{p.pts.toLocaleString()}</span>
              {p.delta && <span style={{ fontSize:10, fontWeight:700, color:'var(--cg)', padding:'2px 5px', background:'rgba(6,214,160,.12)', borderRadius:4, fontFamily:'var(--fn)' }}>{p.delta}</span>}
            </div>
          </div>
        ))}

        <div style={{ padding:'14px 20px', textAlign:'center', fontSize:11, color:'var(--cm)', lineHeight:1.5, marginTop:4 }}>
          Weekly board resets every <span style={{ color:'var(--cy)', fontWeight:700 }}>Sunday</span>. Keep your streak going for bonus multipliers!
        </div>
      </div>
    </div>
  )
}
