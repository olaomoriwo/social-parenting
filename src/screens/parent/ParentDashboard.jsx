import { useState } from 'react'

const APPROVALS_DATA = [
  { child: 'Jamie', ci: 'JJ', cc: '#2D6BE4', task: 'Made bed · Photo attached', time: '8:14 am', pts: 50, tok: 0.50 },
  { child: 'Lily',  ci: 'LJ', cc: '#EF476F', task: 'Read for 20 minutes',     time: '8:42 am', pts: 100, tok: 1.00 },
  { child: 'Noah',  ci: 'NJ', cc: '#06D6A0', task: 'Emptied the dishwasher',  time: '9:01 am', pts: 75, tok: 0.75 },
]

export default function ParentDashboard({ family, onNav, onInvite, onSwitch }) {
  const [approved, setApproved] = useState(new Set())
  const [wallet] = useState({ bal: 12.50, pending: 2.00 })

  const remaining = APPROVALS_DATA.length - approved.size

  const handleApprove = (i) => {
    setApproved(prev => new Set([...prev, i]))
  }

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  const C = (v, d) => ({ ...v, ...d })
  const card = { background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', overflow: 'hidden', marginBottom: 10 }
  const sec = { fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 9, marginTop: 2 }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F7F8FA' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '15px 18px 13px', borderBottom: '.5px solid var(--pe)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--pa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SJ</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.3 }}>{family.famName}</div>
              <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 1 }}>{today}</div>
            </div>
          </div>
          <button onClick={onSwitch} style={{ padding: '6px 12px', background: 'var(--plgt)', color: 'var(--pa)', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>
            Child view →
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 16px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7, marginBottom: 12 }}>
          {[
            { v: family.children.length, l: 'Children' },
            { v: 8, l: 'Tasks' },
            { v: remaining, l: 'Pending', warn: remaining > 0 },
            { v: `${family.sym || '£'}${wallet.bal.toFixed(2)}`, l: 'Wallet', ok: true },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, border: '.5px solid var(--pe)', padding: '11px 8px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 18, fontWeight: 700, color: s.warn ? 'var(--pdng)' : s.ok ? 'var(--psuc)' : 'var(--pt)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: 'var(--pu)', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Parents */}
        <div style={sec}>Parents</div>
        <div style={{ ...card, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, padding: '12px 14px' }}>
            <ParentPill name="Sarah J." initials="SJ" color="var(--pa)" role="Primary parent" status="active" />
            <div style={{ width: .5, background: 'var(--pe)', margin: '6px 0' }} />
            <ParentPill name="Marcus J." initials="MJ" color="#7C3AED" role="Co-parent" status="active" />
          </div>
        </div>

        {/* Approvals */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
          <div style={sec}>Approvals {remaining > 0 ? `· ${remaining} waiting` : '· all done'}</div>
          {remaining >= 2 && <button onClick={() => setApproved(new Set([0,1,2]))} style={{ padding: '5px 10px', background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>Approve All</button>}
        </div>
        <div style={card}>
          {APPROVALS_DATA.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 14px', borderBottom: i < APPROVALS_DATA.length - 1 ? '.5px solid var(--pe)' : 'none', gap: 10, opacity: approved.has(i) ? .45 : 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.cc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 2 }}>{a.ci}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pt)' }}>{a.child}</div>
                <div style={{ fontSize: 12, color: 'var(--pu)', marginTop: 2 }}>{a.task}</div>
                <div style={{ fontSize: 10, color: 'var(--pu)', marginTop: 2 }}>{a.time}</div>
                {!approved.has(i) && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button onClick={() => handleApprove(i)} style={{ flex: 1, padding: 7, borderRadius: 8, background: '#E8F8F0', color: '#065F46', border: '1px solid #6EE7B7', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✓ Approve</button>
                    <button style={{ flex: 1, padding: 7, borderRadius: 8, background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✗ Decline</button>
                  </div>
                )}
                {approved.has(i) && <div style={{ fontSize: 11, color: 'var(--psuc)', fontWeight: 600, marginTop: 4 }}>✓ Approved · +{a.pts}pts released</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Children */}
        <div style={sec}>Children — this week</div>
        <div style={card}>
          {family.children.map((c, i) => {
            const pct = [62, 49, 38][i] || 50
            const pts = [1240, 980, 760][i] || 400
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', borderBottom: i < family.children.length - 1 ? '.5px solid var(--pe)' : 'none', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.name[0]}{c.name[1] || ''}</div>
                <div style={{ flex: 1, marginLeft: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pt)' }}>{c.name}, {c.age}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                    <div style={{ flex: 1, height: 4, background: 'var(--pe)', borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: 4, background: c.color, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, color: 'var(--pt)', minWidth: 52, textAlign: 'right' }}>{pts.toLocaleString()}pts</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Wallet */}
        <div style={sec}>Reward wallet</div>
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 24, fontWeight: 700, color: 'var(--pt)' }}>{family.sym || '£'}{wallet.bal.toFixed(2)}</div>
              <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 2 }}>{family.sym || '£'}{wallet.pending.toFixed(2)} pending · resets Sunday</div>
            </div>
            <button onClick={() => onNav('wallet')} style={{ padding: '8px 14px', background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fp)' }}>Top Up</button>
          </div>
        </div>

        {/* Invite co-parent nudge if no Marcus */}
        <button onClick={onInvite} style={{ width: '100%', padding: '12px 14px', background: 'var(--plgt)', border: '.5px solid #C7D8F8', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 4 }}>
          <span style={{ fontSize: 18 }}>👥</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pa)' }}>Invite your co-parent</div>
            <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 1 }}>Give them equal access to manage tasks</div>
          </div>
          <span style={{ color: 'var(--pa)', fontSize: 16 }}>›</span>
        </button>
      </div>
    </div>
  )
}

function ParentPill({ name, initials, color, role, status }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{initials}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--pt)', textAlign: 'center' }}>{name}</div>
      <div style={{ fontSize: 10, color: 'var(--pu)', textAlign: 'center' }}>{role}</div>
      <span style={{ padding: '3px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{status === 'active' ? 'Active ✓' : 'Pending'}</span>
    </div>
  )
}
