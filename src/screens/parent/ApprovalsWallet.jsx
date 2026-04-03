import { useState } from 'react'

const AP_DATA = [
  { child:'Jamie', ci:'JJ', cc:'#2D6BE4', task:'Made bed · Photo attached', time:'8:14 am', pts:50, tok:.50 },
  { child:'Lily',  ci:'LJ', cc:'#EF476F', task:'Read for 20 minutes',      time:'8:42 am', pts:100, tok:1.00 },
  { child:'Noah',  ci:'NJ', cc:'#06D6A0', task:'Emptied the dishwasher',   time:'9:01 am', pts:75,  tok:.75 },
]

const AMT_OPTS = [5, 10, 20, 50]

export default function ApprovalsWallet({ family, tab: initTab }) {
  const [tab, setTab] = useState(initTab || 'approvals')
  const [approved, setApproved] = useState(new Set())
  const [bal, setBal] = useState(12.50)
  const [selAmt, setSelAmt] = useState(10)
  const [customAmt, setCustomAmt] = useState('')
  const [stage, setStage] = useState('pick') // pick | pay | done
  const pending = 2.00

  const sym = family?.sym || '£'
  const remaining = AP_DATA.length - approved.size
  const amt = parseFloat(customAmt) || selAmt

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F7F8FA', fontFamily: 'var(--fp)' }}>
      <div style={{ background: '#fff', padding: '14px 16px 0', borderBottom: '.5px solid var(--pe)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {['approvals','wallet'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px 8px', background: 'none', border: 'none', borderBottom: `2px solid ${tab===t ? 'var(--pa)' : 'transparent'}`, fontSize: 13, fontWeight: 700, color: tab===t ? 'var(--pa)' : 'var(--pu)', cursor: 'pointer', fontFamily: 'var(--fp)', textTransform: 'capitalize', transition: 'all .15s' }}>
              {t === 'approvals' ? `Approvals ${remaining > 0 ? `(${remaining})` : '✓'}` : 'Wallet'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        {tab === 'approvals' && (
          <>
            {remaining >= 2 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: 'var(--plgt)', borderRadius: 12, marginBottom: 10, border: '.5px solid #C7D8F8' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--pa)' }}>{remaining} tasks need your review</div>
                <button onClick={() => setApproved(new Set([0,1,2]))} style={{ padding: '6px 12px', background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>Approve All</button>
              </div>
            )}
            <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', overflow: 'hidden' }}>
              {AP_DATA.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', padding: '13px 14px', borderBottom: i < AP_DATA.length-1 ? '.5px solid var(--pe)' : 'none', gap: 10, opacity: approved.has(i) ? .5 : 1, transition: 'opacity .2s' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: a.cc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 1 }}>{a.ci}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pt)' }}>{a.child}</div>
                    <div style={{ fontSize: 12, color: 'var(--pu)', marginTop: 2 }}>{a.task}</div>
                    <div style={{ fontSize: 10, color: 'var(--pu)', marginTop: 2 }}>{a.time}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, color: 'var(--pt)' }}>+{a.pts}pts</span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, color: 'var(--psuc)' }}>{sym}{a.tok.toFixed(2)}</span>
                    </div>
                    {!approved.has(i) && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 9 }}>
                        <button onClick={() => setApproved(prev => new Set([...prev, i]))} style={{ flex: 1, padding: 8, borderRadius: 9, background: '#E8F8F0', color: '#065F46', border: '1px solid #6EE7B7', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✓ Approve</button>
                        <button style={{ flex: 1, padding: 8, borderRadius: 9, background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>✗ Decline</button>
                      </div>
                    )}
                    {approved.has(i) && <div style={{ fontSize: 11, color: 'var(--psuc)', fontWeight: 600, marginTop: 6 }}>✓ Approved · reward released</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'wallet' && (
          <>
            <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>Current balance</div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 32, fontWeight: 700, color: 'var(--pt)' }}>{sym}{bal.toFixed(2)}</div>
              <div style={{ fontSize: 12, color: 'var(--pu)', marginTop: 4 }}>{sym}{pending.toFixed(2)} pending rewards · resets Sunday</div>
            </div>

            {stage === 'pick' && (
              <>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 9 }}>Top up amount</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
                  {AMT_OPTS.map(a => (
                    <button key={a} onClick={() => { setSelAmt(a); setCustomAmt('') }} style={{ padding: '13px 6px', borderRadius: 11, border: `1.5px solid ${selAmt===a&&!customAmt ? 'var(--pa)' : 'var(--pe)'}`, background: selAmt===a&&!customAmt ? 'var(--plgt)' : '#fff', fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 700, color: selAmt===a&&!customAmt ? 'var(--pa)' : 'var(--pt)', cursor: 'pointer', transition: 'all .15s' }}>
                      {sym}{a}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder={`Custom amount`} min={1} max={500} value={customAmt} onChange={e => { setCustomAmt(e.target.value) }} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--pe)', borderRadius: 11, fontFamily: 'var(--fm)', fontSize: 16, color: 'var(--pt)', background: '#fff', marginBottom: 12, outline: 'none' }} />
                <div style={{ background: '#F7F8FA', borderRadius: 11, padding: '12px 14px', marginBottom: 14 }}>
                  {[['Current balance', `${sym}${bal.toFixed(2)}`], ['Top-up amount', `+ ${sym}${amt.toFixed(2)}`], ['Pending rewards', `− ${sym}${pending.toFixed(2)}`], ['New balance', `${sym}${Math.max(0,bal+amt-pending).toFixed(2)}`]].map(([l,v],i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: i===3?14:13, fontWeight: i===3?700:400, padding: '4px 0', borderTop: i===3?'.5px solid var(--pe)':'none', marginTop: i===3?8:0, paddingTop: i===3?12:4 }}>
                      <span style={{ color: 'var(--pu)' }}>{l}</span>
                      <span style={{ fontFamily: 'var(--fm)', color: i===1?'var(--psuc)':i===2?'var(--pdng)':'var(--pt)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                {amt < pending && <div style={{ background: '#FEF3C7', border: '.5px solid #FCD34D', borderRadius: 9, padding: '10px 12px', marginBottom: 14, fontSize: 12, color: '#92400E', lineHeight: 1.45 }}>⚠ Top-up is less than pending rewards ({sym}{pending.toFixed(2)}). Increase to release all rewards.</div>}
                <button onClick={() => setStage('pay')} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer' }}>Continue to Payment</button>
              </>
            )}

            {stage === 'pay' && (
              <>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 9 }}>Payment method</div>
                <div style={{ background: '#fff', borderRadius: 14, border: '.5px solid var(--pe)', overflow: 'hidden', marginBottom: 14 }}>
                  {[{ label: 'Visa ending 4242', sub: 'Expires 09/27', tag: 'VISA' }, { label: 'Mastercard ending 8821', sub: 'Expires 03/26', tag: 'MC' }].map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderBottom: i===0 ? '.5px solid var(--pe)' : 'none', cursor: 'pointer' }}>
                      <div style={{ width: 40, height: 26, borderRadius: 5, background: i===0?'#1a1f71':'#fff', border: i===1?'.5px solid var(--pe)':'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: i===0?'#fff':'#EB001B', flexShrink: 0 }}>{c.tag}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pt)' }}>{c.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 1 }}>{c.sub}</div>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${i===0?'var(--pa)':'var(--pe)'}`, background: i===0?'var(--pa)':'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {i===0 && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setBal(b => b + amt); setStage('done') }} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer', marginBottom: 10 }}>Confirm & Pay {sym}{amt.toFixed(2)}</button>
                <button onClick={() => setStage('pick')} style={{ width: '100%', padding: 12, background: 'transparent', color: 'var(--pu)', border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--fp)' }}>← Back</button>
              </>
            )}

            {stage === 'done' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 14, textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid var(--pa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path style={{ strokeDasharray: 44, strokeDashoffset: 44, animation: 'drawChk .5s .3s ease forwards' }} d="M9 18l6 6L27 10" stroke="var(--pa)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.4, fontFamily: 'var(--fp)' }}>Wallet topped up!</div>
                <div style={{ fontSize: 13, color: 'var(--pu)', lineHeight: 1.55 }}>{sym}{pending.toFixed(2)} in pending rewards has been released to your children automatically.</div>
                <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                  <div style={{ flex: 1, background: '#F7F8FA', borderRadius: 12, border: '.5px solid var(--pe)', padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 20, fontWeight: 700, color: 'var(--pt)' }}>{sym}{(bal-pending).toFixed(2)}</div>
                    <div style={{ fontSize: 10, color: 'var(--pu)', marginTop: 3 }}>New balance</div>
                  </div>
                  <div style={{ flex: 1, background: '#F7F8FA', borderRadius: 12, border: '.5px solid var(--pe)', padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 20, fontWeight: 700, color: 'var(--psuc)' }}>{sym}{pending.toFixed(2)}</div>
                    <div style={{ fontSize: 10, color: 'var(--pu)', marginTop: 3 }}>Released</div>
                  </div>
                </div>
                <button onClick={() => setStage('pick')} style={{ width: '100%', padding: 15, background: 'var(--pa)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, fontFamily: 'var(--fp)', cursor: 'pointer', marginTop: 4 }}>Done</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
