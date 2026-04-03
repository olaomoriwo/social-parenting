import { useState } from 'react'

const BOUNTIES = [
  { id:1, name:'Cook dinner for the family', diff:2, pts:400, tok:4.00, badge:'Chef',      claim:'exclusive', dl:'Due today',   urg:true,  state:'active',       desc:'Plan a simple 3-course meal. Pasta is a great start!' },
  { id:2, name:'Fix the wobbly chair leg',   diff:2, pts:300, tok:3.00, badge:'Handyman',  claim:'exclusive', dl:'3 days left', urg:false, state:'active',       desc:'Use the toolbox in the garage. Ask if you need help.' },
  { id:3, name:'Organise the garage shelf',  diff:3, pts:500, tok:5.00, badge:'Organiser', claim:'open',      dl:'5 days left', urg:false, state:'active',       desc:'Group by type — tools, sports gear, boxes stacked neatly.' },
  { id:4, name:'Paint the fence section',    diff:3, pts:600, tok:6.00, badge:'Artist',    claim:'exclusive', dl:'Claimed',     urg:false, state:'claimed_other', by:'Lily', desc:'Middle panel by the back gate. Paint is in the shed.' },
]

export default function ChildBounties() {
  const [states, setStates] = useState({})

  const getState = b => states[b.id] || b.state

  const claim = id => {
    setStates(s => ({ ...s, [id]: 'my_claim' }))
  }

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--cb)' }}>
      <div style={{ background:'rgba(15,27,45,.97)', padding:'13px 16px 11px', borderBottom:'.5px solid var(--cbdr)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ fontFamily:'var(--fh)', fontSize:17, fontWeight:900, color:'var(--ct)', letterSpacing:-.3 }}>Bounties</div>
        <div style={{ fontSize:11, color:'var(--cm)', fontWeight:600 }}>3 available</div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 14px' }}>
        <div style={{ background:'rgba(239,71,111,.08)', border:'.5px solid rgba(239,71,111,.2)', borderRadius:12, padding:'10px 13px', marginBottom:14, fontSize:12, color:'var(--cm)', lineHeight:1.5 }}>
          <span style={{ color:'var(--cr)', fontWeight:700 }}>Bounties</span> are special challenges with bigger rewards. Claim one before your sibling does!
        </div>

        {BOUNTIES.map(b => {
          const st = getState(b)
          const isLocked = st === 'claimed_other'
          const isMine   = st === 'my_claim'
          const stars = '★'.repeat(b.diff) + '☆'.repeat(3 - b.diff)

          return (
            <div key={b.id} style={{
              background:'var(--cs)', borderRadius:14,
              border:'.5px solid var(--cbdr)',
              borderLeft:`3px solid ${isLocked ? 'rgba(139,163,193,.2)' : isMine ? 'var(--cg)' : 'var(--cr)'}`,
              marginBottom:10, overflow:'hidden',
              opacity: isLocked ? .55 : 1,
            }}>
              <div style={{ padding:'13px 14px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:6 }}>
                  <div style={{ fontFamily:'var(--fh)', fontSize:14, fontWeight:800, color:'var(--ct)', lineHeight:1.3, flex:1, marginRight:8 }}>{b.name}</div>
                  <div style={{ padding:'3px 8px', borderRadius:5, fontSize:10, fontWeight:700, whiteSpace:'nowrap', flexShrink:0, background: b.urg ? 'rgba(239,71,111,.2)' : 'rgba(255,255,255,.07)', color: b.urg ? 'var(--cr)' : 'var(--cm)' }}>{b.urg ? '⚡ ' : ''}{b.dl}</div>
                </div>

                <div style={{ display:'flex', gap:6, alignItems:'center', flexWrap:'wrap', marginBottom:8 }}>
                  <span style={{ fontSize:13, color:'#F5A623', letterSpacing:1 }}>{stars}</span>
                  <span style={{ padding:'2px 8px', borderRadius:4, fontSize:10, fontWeight:700, background:'rgba(239,71,111,.1)', color:'var(--cr)' }}>{b.claim === 'exclusive' ? '🔒 Exclusive' : '🌐 Open'}</span>
                  {isLocked && <span style={{ padding:'2px 8px', borderRadius:4, fontSize:10, fontWeight:700, background:'rgba(255,255,255,.06)', color:'var(--cm)' }}>Claimed by {b.by}</span>}
                  {isMine  && <span style={{ padding:'2px 8px', borderRadius:4, fontSize:10, fontWeight:700, background:'rgba(6,214,160,.1)', color:'var(--cg)' }}>Your claim!</span>}
                </div>

                <div style={{ fontSize:12, color:'var(--cm)', lineHeight:1.45, marginBottom:10 }}>{b.desc}</div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:9, borderTop:'.5px solid var(--cbdr)' }}>
                  <div style={{ display:'flex', gap:7, alignItems:'center' }}>
                    <span style={{ fontFamily:'var(--fn)', fontSize:13, fontWeight:700, color:'var(--ct)' }}>{b.pts}pts</span>
                    <span style={{ color:'var(--cbdr)' }}>·</span>
                    <span style={{ fontFamily:'var(--fn)', fontSize:13, fontWeight:700, color:'var(--cg)' }}>£{b.tok.toFixed(2)}</span>
                    <span style={{ fontSize:10, fontWeight:600, color:'#F5A623', padding:'2px 7px', background:'rgba(245,162,35,.12)', borderRadius:4 }}>🏅 {b.badge}</span>
                  </div>
                  {isLocked && (
                    <button disabled style={{ padding:'8px 13px', borderRadius:9, background:'rgba(255,255,255,.06)', color:'var(--cm)', border:'none', fontSize:11, fontWeight:800, cursor:'not-allowed', fontFamily:'var(--fh)' }}>Locked</button>
                  )}
                  {isMine && (
                    <button style={{ padding:'8px 13px', borderRadius:9, background:'rgba(6,214,160,.18)', color:'var(--cg)', border:'none', fontSize:11, fontWeight:800, cursor:'pointer', fontFamily:'var(--fh)' }}>Submit proof →</button>
                  )}
                  {!isLocked && !isMine && (
                    <button onClick={() => claim(b.id)} style={{ padding:'8px 13px', borderRadius:9, background:'var(--cr)', color:'#fff', border:'none', fontSize:11, fontWeight:800, cursor:'pointer', fontFamily:'var(--fh)', transition:'opacity .15s' }}>Claim →</button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
