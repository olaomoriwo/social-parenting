import { useState } from 'react'

const ST = {
  active:   { l:'Active',    c:'#EF476F', bg:'#FEF0F3', bdr:'#EF476F' },
  claimed:  { l:'Claimed',   c:'#2D6BE4', bg:'#EEF3FD', bdr:'#2D6BE4' },
  review:   { l:'Review',    c:'#B45309', bg:'#FEF3C7', bdr:'#F5A623' },
  completed:{ l:'Completed', c:'#065F46', bg:'#D1FAE5', bdr:'#0CAF60' },
  expired:  { l:'Expired',   c:'#6B7280', bg:'#F3F4F6', bdr:'#D1D5DB' },
}

const INIT = [
  { id:1, name:'Fix the wobbly chair leg',   diff:2, pts:300, tok:3.00, badge:'Handyman',  claim:'exclusive', dl:'3 days left', urg:false, status:'active',    claimedBy:null },
  { id:2, name:'Organise the garage shelf',  diff:3, pts:500, tok:5.00, badge:'Organiser', claim:'open',      dl:'5 days left', urg:false, status:'active',    claimedBy:null },
  { id:3, name:'Cook dinner for the family', diff:2, pts:400, tok:4.00, badge:'Chef',      claim:'exclusive', dl:'Due today',   urg:true,  status:'claimed',   claimedBy:'Jamie' },
  { id:4, name:'Paint the fence section',    diff:3, pts:600, tok:6.00, badge:'Artist',    claim:'exclusive', dl:'Overdue',     urg:true,  status:'review',    claimedBy:'Lily', note:'Done! Two coats front and back.' },
  { id:5, name:'Deep clean bedroom',         diff:1, pts:150, tok:1.50, badge:'Tidy Star', claim:'open',      dl:'Completed',   urg:false, status:'completed', claimedBy:'Noah', completedDate:'2 days ago' },
]

export default function BountyBoard() {
  const [bounties, setBounties] = useState(INIT)
  const [filter, setFilter] = useState('all')

  const approve = id => setBounties(bs => bs.map(b => b.id === id ? { ...b, status:'completed', completedDate:'Just now' } : b))
  const decline = id => setBounties(bs => bs.map(b => b.id === id ? { ...b, status:'claimed' } : b))
  const repost  = id => setBounties(bs => bs.map(b => b.id === id ? { ...b, status:'active', dl:'7 days left', urg:false, claimedBy:null } : b))

  const list = filter === 'all' ? bounties : bounties.filter(b => b.status === filter)
  const groups = filter === 'all' ? ['review','active','claimed','completed','expired'] : [filter]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F7F8FA' }}>
      <div style={{ background: '#fff', padding: '14px 16px 12px', borderBottom: '.5px solid var(--pe)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--pt)', fontFamily: 'var(--fp)', letterSpacing: -.25 }}>Bounty Board</div>
          <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 1 }}>{bounties.filter(b=>b.status==='active').length} active · {bounties.length} total</div>
        </div>
        <button style={{ padding: '7px 12px', background: '#FEF0F3', color: '#EF476F', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>+ New Bounty</button>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '9px 14px', overflowX: 'auto', flexShrink: 0, background: '#fff', borderBottom: '.5px solid var(--pe)' }}>
        {['all',...Object.keys(ST)].map(f => {
          const on = filter === f
          const bg = on ? (f==='all' ? '#EF476F' : ST[f]?.c) : '#fff'
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 11px', borderRadius: 20, border: '.5px solid', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fb)', whiteSpace: 'nowrap', flexShrink: 0, borderColor: on ? 'transparent' : 'var(--pe)', background: bg, color: on ? '#fff' : 'var(--pu)' }}>
              {f === 'all' ? `All (${bounties.length})` : ST[f].l}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 14px' }}>
        {groups.map(grp => {
          const grpList = filter === 'all' ? bounties.filter(b=>b.status===grp) : list
          if (!grpList.length) return null
          return (
            <div key={grp}>
              {filter === 'all' && grpList.length > 0 && <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: ST[grp]?.c, padding: '8px 2px 6px' }}>{ST[grp]?.l}{grp==='review'?' — Needs approval':''}</div>}
              {grpList.map(b => <BountyCard key={b.id} b={b} onApprove={approve} onDecline={decline} onRepost={repost} />)}
            </div>
          )
        })}
        {!list.length && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', textAlign: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pt)' }}>No bounties here</div>
            <div style={{ fontSize: 12, color: 'var(--pu)' }}>Post a challenge for your children.</div>
          </div>
        )}
      </div>
    </div>
  )
}

function BountyCard({ b, onApprove, onDecline, onRepost }) {
  const s = ST[b.status]
  const stars = '★'.repeat(b.diff) + '☆'.repeat(3-b.diff)
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', borderTop: `3px solid ${s.bdr}`, marginBottom: 10, overflow: 'hidden' }}>
      <div style={{ padding: '13px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--pt)', lineHeight: 1.3, flex: 1, marginRight: 8 }}>{b.name}</div>
          <div style={{ padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 700, background: b.urg ? '#FEE2E2' : '#F3F4F6', color: b.urg ? 'var(--pdng)' : 'var(--pu)', whiteSpace: 'nowrap', flexShrink: 0 }}>{b.dl}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#F5A623', letterSpacing: 1 }}>{stars}</span>
          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.c }}>{s.l}</span>
          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#F7F8FA', color: 'var(--pu)' }}>{b.claim === 'exclusive' ? '🔒 Exclusive' : '🌐 Open'}</span>
          {b.claimedBy && <span style={{ fontSize: 11, color: 'var(--pu)' }}>→ {b.claimedBy}</span>}
        </div>
        {b.note && <div style={{ fontSize: 12, color: 'var(--pu)', fontStyle: 'italic', padding: '8px', background: '#F7F8FA', borderRadius: 8, marginBottom: 6 }}>"{b.note}"</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderTop: '.5px solid var(--pe)', background: '#FAFBFC' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 700, color: 'var(--pt)' }}>{b.pts}pts</span>
          <span style={{ color: 'var(--pe)' }}>·</span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 700, color: 'var(--psuc)' }}>£{b.tok.toFixed(2)}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#92400E', background: '#FEF3C7', padding: '2px 7px', borderRadius: 4 }}>🏅 {b.badge}</span>
        </div>
        {b.status === 'review' && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => onApprove(b.id)} style={{ padding: '6px 10px', background: '#E8F8F0', color: '#065F46', border: '1px solid #6EE7B7', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✓</button>
            <button onClick={() => onDecline(b.id)} style={{ padding: '6px 10px', background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✗</button>
          </div>
        )}
        {b.status === 'expired' && (
          <button onClick={() => onRepost(b.id)} style={{ padding: '6px 10px', background: '#FEF3C7', color: '#92400E', border: 'none', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>Repost</button>
        )}
      </div>
    </div>
  )
}
