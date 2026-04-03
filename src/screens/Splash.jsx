import { useEffect } from 'react'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      background: 'var(--cb)', flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 18, height: '100%'
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24, background: 'var(--cy)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'bounceIn .65s cubic-bezier(.34,1.56,.64,1) both'
      }}>
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M23 5L7 19H13V38H19V30H27V38H33V19H39L23 5Z" fill="#0F1B2D"/>
        </svg>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--fh)', fontSize: 22, fontWeight: 900,
          color: 'var(--ct)', letterSpacing: -.3,
          animation: 'fadeUp .5s .3s both'
        }}>
          The <span style={{ color: 'var(--cy)' }}>Social Parenting</span>
        </div>
        <div style={{
          fontSize: 13, color: 'var(--cm)', marginTop: 5,
          animation: 'fadeUp .5s .45s both'
        }}>
          Turn chores into champions.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 7, animation: 'fadeUp .5s .6s both' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--cm)',
            animation: `pulse 1.3s ${i * 0.22}s infinite ease-in-out`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes bounceIn { from { transform: scale(.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: .25; transform: scale(.65); } 50% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}
