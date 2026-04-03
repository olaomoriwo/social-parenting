import { useState } from 'react'

export default function CoParentInvite({ onClose }) {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const canNext = email.includes('@') && email.includes('.')

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column', fontFamily: 'var(--fp)' }}>
      <div style={{ background: '#fff', padding: '14px 16px 12px', borderBottom: '.5px solid var(--pe)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, border: '.5px solid var(--pe)', background: '#fff', cursor: 'pointer', fontSize: 18, color: 'var(--pu)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.25 }}>Invite Partner</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= step ? 'var(--pa)' : 'var(--pe)', transition: 'background .2s' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 28px' }}>
        {step === 0 && (
          <>
            <div style={{ padding: '20px 0 16px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--plgt)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 26 }}>👨‍👩‍👧</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, marginBottom: 8 }}>Co-parent together</div>
              <div style={{ fontSize: 13, color: 'var(--pu)', lineHeight: 1.55 }}>Your partner gets equal access to manage tasks, approve completions, and support your children — from the same dashboard.</div>
            </div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 5 }}>Partner's email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="partner@example.com" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--pe)', borderRadius: 11, fontSize: 15, fontFamily: 'var(--fp)', color: 'var(--pt)', background: '#fff', marginBottom: 14, outline: 'none' }} />
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 5 }}>Their name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Marcus" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--pe)', borderRadius: 11, fontSize: 15, fontFamily: 'var(--fp)', color: 'var(--pt)', background: '#fff', marginBottom: 16, outline: 'none' }} />
            <div style={{ background: 'var(--plgt)', borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--pa)', marginBottom: 5 }}>What they'll be able to do</div>
              <div style={{ fontSize: 12, color: 'var(--pu)', lineHeight: 1.6 }}>Approve tasks · Create bounties · View wallet · See all children's progress. They cannot change billing or delete the family.</div>
            </div>
            <button onClick={() => setStep(1)} disabled={!canNext} style={{ width: '100%', padding: 15, background: canNext ? 'var(--pa)' : '#B8C9F5', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: canNext ? 'pointer' : 'not-allowed' }}>Review Access & Send →</button>
          </>
        )}

        {step === 1 && (
          <>
            <div style={{ padding: '16px 0 4px', fontSize: 13, color: 'var(--pu)', lineHeight: 1.5 }}>Here's exactly what {name || 'your partner'} will be able to do once they accept.</div>
            <Perms />
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer', marginTop: 4, marginBottom: 10 }}>Send Invite to {name || 'Partner'} →</button>
            <button onClick={() => setStep(0)} style={{ width: '100%', padding: 12, background: 'transparent', color: 'var(--pu)', border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--fp)' }}>← Change details</button>
          </>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 0', gap: 14, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid var(--pa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path style={{ strokeDasharray: 44, strokeDashoffset: 44, animation: 'drawChk .5s .3s ease forwards' }} d="M9 18l6 6L27 10" stroke="var(--pa)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, fontFamily: 'var(--fp)' }}>Invite sent!</div>
            <div style={{ fontSize: 13, color: 'var(--pu)', lineHeight: 1.55 }}>An invite has been sent to <b>{email}</b>. {name || 'Your partner'} will get a link valid for 48 hours.</div>
            <div style={{ background: '#F7F8FA', borderRadius: 12, border: '.5px solid var(--pe)', padding: 14, width: '100%', textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>What happens next</div>
              {[['They receive an email', 'with a personalised invite link — valid for 48 hours.'], ['They create their account', 'and are linked to your family automatically.'], ['You both see the same dashboard', '— tasks, approvals, bounties and children.']].map(([b,s], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--pa)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i+1}</div>
                  <div style={{ fontSize: 12, color: 'var(--pu)', lineHeight: 1.5 }}><b style={{ color: 'var(--pt)', fontWeight: 600 }}>{b}</b> {s}</div>
                </div>
              ))}
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer', marginTop: 4 }}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

function Perms() {
  const can = ['Approve & decline task completions','Create and manage tasks','Create and manage bounties','View all children\'s progress','View wallet balance']
  const cannot = ['Change family billing','Remove children or delete the family']
  return (
    <div>
      <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', padding: '4px 14px', marginBottom: 10, marginTop: 10 }}>
        {can.map((p,i) => <PermRow key={i} label={p} yes last={i===can.length-1} />)}
      </div>
      <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', padding: '4px 14px', marginBottom: 16 }}>
        {cannot.map((p,i) => <PermRow key={i} label={p} yes={false} last={i===cannot.length-1} />)}
      </div>
    </div>
  )
}

function PermRow({ label, yes, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: last ? 'none' : '.5px solid var(--pe)' }}>
      <div style={{ width: 26, height: 26, borderRadius: 8, background: yes ? '#D1FAE5' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{yes ? '✓' : '✗'}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pt)' }}>{label}</div>
    </div>
  )
}
