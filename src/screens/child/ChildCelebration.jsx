import { useEffect, useRef } from 'react'

const CONFETTI_COLORS = ['#FFD166','#06D6A0','#EF476F','#118AB2','#ffffff','#9B5DE5']

export default function ChildCelebration({ task, onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    c.width  = c.offsetWidth
    c.height = c.offsetHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width,
      y: -10 - Math.random() * 60,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      w: 5 + Math.random() * 8,
      h: (5 + Math.random() * 8) * (Math.random() > 0.45 ? 1 : 0.4),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      round: Math.random() > 0.45,
    }))

    let frame
    const draw = () => {
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height)
      let alive = false
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.05
        if (p.y < c.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, 1 - p.y / c.height)
        ctx.fillStyle = p.color
        if (p.round) {
          ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      })
      if (alive) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  const t = task || { name: 'Wash dishes', pts: 75, tok: 0.75 }

  return (
    <div style={{ flex:1, background:'var(--cb)', display:'flex', flexDirection:'column', position:'relative', height:'100%' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:1, padding:'16px 18px 0', flexShrink:0 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'var(--cm)', textTransform:'uppercase', letterSpacing:'.5px', fontFamily:'var(--fb)' }}>Parent approved your task!</div>
      </div>

      <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px 24px 20px', gap:13, textAlign:'center' }}>
        {/* Checkmark ring */}
        <div style={{ width:82, height:82, borderRadius:'50%', border:'3px solid var(--cg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M10 22l8 8L34 14"
              stroke="#06D6A0"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray:52, strokeDashoffset:52, animation:'drawChk .6s .4s ease forwards' }}
            />
          </svg>
        </div>

        <div style={{ fontFamily:'var(--fh)', fontSize:26, fontWeight:900, color:'var(--ct)', letterSpacing:-.5, animation:'fadeUp .5s .5s both' }}>Well done, Jamie!</div>

        <div style={{ fontSize:13, color:'var(--cm)', lineHeight:1.45, animation:'fadeUp .5s .65s both' }}>
          {t.name} · approved by Mum
        </div>

        {/* Reward breakdown */}
        <div style={{ display:'flex', gap:9, width:'100%', animation:'fadeUp .5s .75s both' }}>
          {[
            { v:`+${t.pts}`, l:'Points', c:'var(--cy)' },
            { v:`£${t.tok.toFixed(2)}`, l:'Token', c:'var(--cg)' },
            { v:'7', l:'Streak', c:'var(--cr)' },
          ].map((r,i) => (
            <div key={i} style={{ flex:1, background:'var(--cs)', borderRadius:13, padding:'14px 8px', textAlign:'center', border:'.5px solid var(--cbdr)' }}>
              <div style={{ fontFamily:'var(--fn)', fontSize:22, fontWeight:700, color:r.c }}>{r.v}</div>
              <div style={{ fontSize:9, color:'var(--cm)', marginTop:4, textTransform:'uppercase', letterSpacing:'.4px' }}>{r.l}</div>
            </div>
          ))}
        </div>

        {/* Streak bonus */}
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(245,162,35,.1)', border:'.5px solid rgba(245,162,35,.2)', borderRadius:11, padding:'9px 14px', animation:'fadeUp .5s .88s both' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 9,5 13,5 10,8 11,12.5 7,10 3,12.5 4,8 1,5 5,5" fill="#F5A623"/></svg>
          <div style={{ fontSize:13, fontWeight:700, color:'#F5A623' }}>Streak extended — keep it going!</div>
        </div>

        <button
          onClick={onDone}
          style={{ width:'100%', padding:15, background:'var(--cg)', color:'#0F1B2D', border:'none', borderRadius:14, fontSize:17, fontWeight:900, fontFamily:'var(--fh)', cursor:'pointer', animation:'fadeUp .5s 1s both', marginTop:4 }}
        >
          Back to Tasks →
        </button>
      </div>
    </div>
  )
}
