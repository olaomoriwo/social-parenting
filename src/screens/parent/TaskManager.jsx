import { useState } from 'react'

const C = { bedroom: { l:'Bedroom',c:'#2D6BE4',b:'#EEF3FD' }, kitchen: { l:'Kitchen',c:'#E8680A',b:'#FEF3E6' }, home: { l:'Home',c:'#0CAF60',b:'#E8F8F0' }, growth: { l:'Growth',c:'#9B5DE5',b:'#F3E8FF' } }
const FL = { daily:'Daily', weekdays:'Weekdays', weekly:'Weekly', oneoff:'One-off' }

const INIT_TASKS = [
  { id:1, name:'Make bed',       cat:'bedroom', kids:['all'], freq:'daily',    pts:50,  tok:.50,  proof:'photo', active:true,  hist:[1,1,1,0,1,1,0] },
  { id:2, name:'Wash dishes',    cat:'kitchen', kids:['all'], freq:'daily',    pts:75,  tok:.75,  proof:'none',  active:true,  hist:[1,1,0,1,1,1,1] },
  { id:3, name:'Finish homework',cat:'growth',  kids:['all'], freq:'weekdays', pts:150, tok:1.50, proof:'note',  active:true,  hist:[1,1,1,1,1,0,0] },
  { id:4, name:'Tidy bedroom',   cat:'bedroom', kids:['Jamie'], freq:'weekly', pts:75,  tok:.75,  proof:'photo', active:true,  hist:[0,0,0,0,1,0,0] },
  { id:5, name:'Take out bins',  cat:'home',    kids:['Jamie'], freq:'weekly', pts:100, tok:1.00, proof:'none',  active:false, hist:[0,0,0,0,0,0,1] },
  { id:6, name:'Read 20 minutes',cat:'growth',  kids:['Lily','Noah'], freq:'daily', pts:100, tok:1.00, proof:'note', active:true, hist:[1,1,0,1,1,1,0] },
]

export default function TaskManager({ family }) {
  const [tasks, setTasks] = useState(INIT_TASKS)
  const [filter, setFilter] = useState('all')
  const sec = { fontSize: 10, fontWeight: 700, color: 'var(--pu)', textTransform: 'uppercase', letterSpacing: '.6px', padding: '10px 2px 6px' }

  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, active: !t.active } : t))
  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.cat === filter)
  const cats = filter === 'all' ? ['bedroom','kitchen','home','growth'] : [filter]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F7F8FA' }}>
      <div style={{ background: '#fff', padding: '14px 16px 12px', borderBottom: '.5px solid var(--pe)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--pt)', letterSpacing: -.25, fontFamily: 'var(--fp)' }}>Task Manager</div>
          <div style={{ fontSize: 11, color: 'var(--pu)', marginTop: 1 }}>{tasks.length} tasks · {tasks.filter(t=>t.active).length} active</div>
        </div>
        <button style={{ padding: '7px 13px', background: 'var(--plgt)', color: 'var(--pa)', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--fp)' }}>Templates</button>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '9px 14px', overflowX: 'auto', flexShrink: 0, background: '#fff', borderBottom: '.5px solid var(--pe)' }}>
        {['all',...Object.keys(C)].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: 20, border: '.5px solid', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fb)', whiteSpace: 'nowrap', flexShrink: 0, borderColor: filter===f ? 'transparent' : 'var(--pe)', background: filter===f ? (f==='all' ? '#1A1D23' : C[f]?.c) : '#fff', color: filter===f ? '#fff' : 'var(--pu)', transition: 'all .15s' }}>
            {f === 'all' ? `All (${tasks.length})` : C[f].l}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px 14px' }}>
        {cats.map(cat => {
          const ct = filtered.filter(t => t.cat === cat)
          if (!ct.length) return null
          return (
            <div key={cat}>
              {filter === 'all' && <div style={{ ...sec, color: C[cat].c }}>{C[cat].l}</div>}
              {ct.map(t => {
                const isAll = t.kids.includes('all')
                return (
                  <div key={t.id} style={{ background: '#fff', borderRadius: 13, border: '.5px solid var(--pe)', marginBottom: 8, opacity: t.active ? 1 : .5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 13px', gap: 9 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: C[t.cat].c, flexShrink: 0, marginTop: 3 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                        <div style={{ display: 'flex', gap: 5, marginTop: 4, flexWrap: 'wrap' }}>
                          <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: C[t.cat].b, color: C[t.cat].c }}>{C[t.cat].l}</span>
                          <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#F7F8FA', color: 'var(--pu)' }}>{FL[t.freq]}</span>
                          <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#F7F8FA', color: 'var(--pt)', fontFamily: 'var(--fm)' }}>{t.pts}pts · £{t.tok.toFixed(2)}</span>
                          {!t.active && <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#FEE2E2', color: '#991B1B' }}>Paused</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        {isAll ? <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--pu)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff' }}>All</div> :
                          t.kids.slice(0,2).map((n,i) => {
                            const colors = { Jamie:'#2D6BE4', Lily:'#EF476F', Noah:'#06D6A0' }
                            return <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: colors[n]||'#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff' }}>{n[0]}</div>
                          })
                        }
                        <button onClick={() => toggle(t.id)} style={{ width: 36, height: 21, borderRadius: 11, background: t.active ? 'var(--psuc)' : 'var(--pe)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
                          <div style={{ position: 'absolute', width: 15, height: 15, borderRadius: '50%', background: '#fff', top: 3, left: t.active ? 18 : 3, transition: 'left .2s' }} />
                        </button>
                        <span style={{ color: '#CBD5E1', fontSize: 14 }}>›</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
