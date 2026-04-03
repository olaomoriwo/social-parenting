// ChildTasks.jsx
import { useState } from 'react'
const CC = { bedroom:'#2D6BE4', kitchen:'#E8680A', home:'#0CAF60', growth:'#9B5DE5' }
const CL = { bedroom:'Bedroom', kitchen:'Kitchen', home:'Home', growth:'Growth' }

export function ChildTasks({ tasks, onSubmit, onApprove }) {
  const [filter, setFilter] = useState('all')
  const [sheet, setSheet] = useState(null)

  const groups = () => {
    if (filter === 'done') return [{ lbl:'', c:'var(--cg)', tasks: tasks.filter(t => t.status==='approved'||t.status==='pending') }]
    if (filter === 'today') return [{ lbl:'', c:'var(--cy)', tasks: tasks.filter(t => (t.today||t.overdue) && t.status==='open') }]
    const ov = tasks.filter(t => t.overdue && t.status==='open')
    const td = tasks.filter(t => t.today && !t.overdue && t.status==='open')
    const dn = tasks.filter(t => t.status==='approved'||t.status==='pending')
    return [
      ...(ov.length ? [{ lbl:'Overdue', c:'var(--cr)', tasks:ov }] : []),
      ...(td.length ? [{ lbl:'Due today', c:'var(--cy)', tasks:td }] : []),
      ...(dn.length ? [{ lbl:'Completed', c:'var(--cg)', tasks:dn }] : []),
    ]
  }

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--cb)' }}>
      <div style={{ background:'rgba(15,27,45,.97)', padding:'13px 16px 11px', borderBottom:'.5px solid var(--cbdr)', display:'flex', alignItems:'center', flexShrink:0 }}>
        <div style={{ width:36,height:36,borderRadius:'50%',background:'#2D6BE4',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fh)',fontSize:13,fontWeight:900,color:'#fff',border:'2px solid rgba(45,107,228,.45)',flexShrink:0 }}>JJ</div>
        <div style={{ fontFamily:'var(--fh)',fontSize:17,fontWeight:900,color:'var(--ct)',letterSpacing:-.3,marginLeft:10,flex:1 }}>My Tasks</div>
      </div>
      <div style={{ display:'flex',gap:6,padding:'9px 14px',overflowX:'auto',flexShrink:0,background:'rgba(15,27,45,.97)',borderBottom:'.5px solid var(--cbdr)' }}>
        {['all','today','done'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 13px',borderRadius:20,border:'.5px solid',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'var(--fb)',whiteSpace:'nowrap',flexShrink:0,borderColor:filter===f?'var(--cy)':'var(--cbdr)',background:filter===f?'var(--cy)':'transparent',color:filter===f?'#0F1B2D':'var(--cm)',transition:'all .15s' }}>
            {f==='all'?'All tasks':f==='today'?'Due today':'Completed'}
          </button>
        ))}
      </div>
      <div style={{ flex:1,overflowY:'auto',padding:'10px 14px 14px' }}>
        {groups().map((g,gi) => (
          <div key={gi}>
            {g.lbl && <div style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.6px',color:g.c,padding:'8px 2px 6px' }}>{g.lbl}</div>}
            {g.tasks.map(t => (
              <div key={t.id} style={{ background:'var(--cs)',borderRadius:13,border:`.5px solid var(--cbdr)`,borderLeft:`3px solid ${t.overdue&&t.status==='open'?'rgba(239,71,111,.5)':CC[t.cat]}`,marginBottom:8 }}>
                <div style={{ display:'flex',alignItems:'center',gap:9,padding:'12px 13px' }}>
                  <div style={{ width:3,height:34,borderRadius:2,background:CC[t.cat],flexShrink:0 }} />
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:13,fontWeight:700,color:t.status==='approved'?'var(--cm)':'var(--ct)',textDecoration:t.status==='approved'?'line-through':'none',textDecorationColor:'rgba(139,163,193,.3)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{t.name}</div>
                    <div style={{ display:'flex',gap:5,marginTop:4,flexWrap:'wrap',alignItems:'center' }}>
                      <span style={{ padding:'2px 6px',borderRadius:3,fontSize:9,fontWeight:700,background:`${CC[t.cat]}22`,color:CC[t.cat] }}>{CL[t.cat]}</span>
                      <span style={{ fontSize:10,color:'var(--cm)' }}>{t.due}</span>
                      {t.proof!=='none' && <span style={{ fontSize:9,color:'var(--co)' }}>{t.proof==='photo'?'Photo':'Note'}</span>}
                    </div>
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4,flexShrink:0 }}>
                    {t.status==='approved' && <><div style={{ fontFamily:'var(--fn)',fontSize:12,fontWeight:700,color:'var(--cg)' }}>+{t.pts}pts</div><div style={{ padding:'3px 7px',borderRadius:4,fontSize:9,fontWeight:700,background:'rgba(6,214,160,.15)',color:'var(--cg)' }}>✓ Done</div></>}
                    {t.status==='pending' && <><div style={{ fontFamily:'var(--fn)',fontSize:12,fontWeight:700,color:'#F5A623' }}>+{t.pts}</div><div style={{ padding:'3px 7px',borderRadius:4,fontSize:9,fontWeight:700,background:'rgba(245,162,35,.15)',color:'#F5A623' }}>⏳ Pending</div></>}
                    {t.status==='open' && <>
                      {t.overdue && <div style={{ padding:'3px 7px',borderRadius:4,fontSize:9,fontWeight:700,background:'rgba(239,71,111,.15)',color:'var(--cr)',marginBottom:4 }}>Overdue!</div>}
                      <button onClick={() => setSheet(t)} style={{ padding:'6px 11px',background:'var(--cy)',color:'#0F1B2D',border:'none',borderRadius:7,fontSize:11,fontWeight:800,cursor:'pointer',fontFamily:'var(--fb)' }}>Do it →</button>
                    </>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {sheet && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:40,display:'flex',alignItems:'flex-end' }} onClick={e => e.target===e.currentTarget&&setSheet(null)}>
          <div style={{ background:'#1D3251',borderRadius:'22px 22px 0 0',padding:'18px 20px 36px',width:'100%' }}>
            <div style={{ width:36,height:4,background:'rgba(255,255,255,.18)',borderRadius:2,margin:'0 auto 16px' }} />
            <div style={{ fontFamily:'var(--fh)',fontSize:18,fontWeight:900,color:'var(--ct)',marginBottom:4 }}>{sheet.name}</div>
            <div style={{ fontSize:13,color:'var(--cm)',marginBottom:13 }}>Submit for parent approval.</div>
            <div style={{ background:'rgba(255,255,255,.05)',borderRadius:12,padding:12,display:'flex',justifyContent:'space-around',marginBottom:14 }}>
              <div style={{ textAlign:'center' }}><div style={{ fontFamily:'var(--fn)',fontSize:21,fontWeight:700,color:'var(--cy)' }}>+{sheet.pts}</div><div style={{ fontSize:9,color:'var(--cm)',marginTop:3,textTransform:'uppercase' }}>Points</div></div>
              <div style={{ width:.5,background:'rgba(255,255,255,.08)' }} />
              <div style={{ textAlign:'center' }}><div style={{ fontFamily:'var(--fn)',fontSize:21,fontWeight:700,color:'var(--cg)' }}>£{sheet.tok.toFixed(2)}</div><div style={{ fontSize:9,color:'var(--cm)',marginTop:3,textTransform:'uppercase' }}>Token</div></div>
            </div>
            <button onClick={() => { onSubmit(sheet.id); setSheet(null) }} style={{ width:'100%',padding:14,background:'var(--cg)',color:'#0F1B2D',border:'none',borderRadius:13,fontSize:14,fontWeight:900,fontFamily:'var(--fh)',cursor:'pointer',marginBottom:8 }}>Submit ✓</button>
            <button onClick={() => { onApprove(sheet.id); setSheet(null) }} style={{ width:'100%',padding:12,background:'rgba(255,209,102,.12)',color:'var(--cy)',border:'none',borderRadius:13,fontSize:12,fontWeight:700,fontFamily:'var(--fb)',cursor:'pointer',marginBottom:8 }}>⚡ Simulate approval →</button>
            <button onClick={() => setSheet(null)} style={{ width:'100%',padding:12,background:'rgba(255,255,255,.05)',color:'var(--cm)',border:'none',borderRadius:13,fontSize:13,cursor:'pointer',fontFamily:'var(--fb)' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChildTasks
