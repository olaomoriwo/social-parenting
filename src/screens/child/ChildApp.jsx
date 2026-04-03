import { useState } from 'react'
import ChildHome from './ChildHome.jsx'
import ChildTasks from './ChildTasks.jsx'
import ChildBounties from './ChildBounties.jsx'
import ChildLeaderboard from './ChildLeaderboard.jsx'
import ChildProfile from './ChildProfile.jsx'
import ChildCelebration from './ChildCelebration.jsx'

const NAV = [
  { id:'home',    label:'Home',     icon:null },
  { id:'tasks',   label:'Tasks',    icon:null },
  { id:'bounties',label:'Bounties', icon:null },
  { id:'board',   label:'Board',    icon:null },
  { id:'me',      label:'Me',       icon:null },
]

export default function ChildApp({ onSwitch }) {
  const [screen, setScreen] = useState('home')
  const [celebrating, setCelebrating] = useState(null)
  const [tasks, setTasks] = useState([
    { id:1, name:'Make bed',        cat:'bedroom', pts:50,  tok:.50,  proof:'photo',   status:'approved', due:'7:00 am',     today:true },
    { id:2, name:'Read 20 minutes', cat:'growth',  pts:100, tok:1.00, proof:'note',    status:'approved', due:'After school', today:true },
    { id:3, name:'Wash dishes',     cat:'kitchen', pts:75,  tok:.75,  proof:'none',    status:'open',     due:'7:00 pm',     today:true },
    { id:4, name:'Finish homework', cat:'growth',  pts:150, tok:1.50, proof:'note',    status:'open',     due:'5:00 pm',     today:true },
    { id:5, name:'Tidy bedroom',    cat:'bedroom', pts:75,  tok:.75,  proof:'photo',   status:'open',     due:'Before bed',  today:true },
    { id:6, name:'Take out bins',   cat:'home',    pts:100, tok:1.00, proof:'none',    status:'open',     due:'Thursday',    overdue:true },
  ])

  const handleSubmit = (id) => {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, status:'pending' } : t))
  }
  const handleApprove = (id) => {
    const t = tasks.find(t => t.id === id)
    setTasks(ts => ts.map(t => t.id === id ? { ...t, status:'approved' } : t))
    setCelebrating(t)
    setScreen('celebrate')
  }

  if (screen === 'celebrate' && celebrating) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cb)' }}>
      <ChildCelebration task={celebrating} onDone={() => { setCelebrating(null); setScreen('tasks') }} />
    </div>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cb)', fontFamily: 'var(--fb)' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {screen === 'home'     && <ChildHome tasks={tasks} onNav={setScreen} onSwitch={onSwitch} onSubmit={handleSubmit} onApprove={handleApprove} />}
        {screen === 'tasks'    && <ChildTasks tasks={tasks} onSubmit={handleSubmit} onApprove={handleApprove} />}
        {screen === 'bounties' && <ChildBounties />}
        {screen === 'board'    && <ChildLeaderboard />}
        {screen === 'me'       && <ChildProfile />}
      </div>

      <nav className="bnav child">
        <button className={`bnb${screen==='home'?' active':''}`} onClick={() => setScreen('home')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 9L10 2L18 9V18H13V13H7V18H2V9Z" fill={screen==='home'?'var(--cy)':'#8BA3C1'}/></svg>
          <span className="bnl" style={{ color: screen==='home'?'var(--cy)':'' }}>Home</span>
        </button>
        <button className={`bnb${screen==='tasks'?' active':''}`} onClick={() => setScreen('tasks')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" stroke={screen==='tasks'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4" fill="none"/><path d="M7 10l2 2 4-4" stroke={screen==='tasks'?'var(--cy)':'#8BA3C1'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="bnl" style={{ color: screen==='tasks'?'var(--cy)':'' }}>Tasks</span>
        </button>
        <button className={`bnb${screen==='bounties'?' active':''}`} onClick={() => setScreen('bounties')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 3H14V11C14 13.2 12.2 15 10 15C7.8 15 6 13.2 6 11V3Z" stroke={screen==='bounties'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4" fill="none"/><line x1="10" y1="15" x2="10" y2="17" stroke={screen==='bounties'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4"/><line x1="7" y1="17" x2="13" y2="17" stroke={screen==='bounties'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span className="bnl" style={{ color: screen==='bounties'?'var(--cy)':'' }}>Bounties</span>
        </button>
        <button className={`bnb${screen==='board'?' active':''}`} onClick={() => setScreen('board')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="13" width="3" height="4" rx="1" fill={screen==='board'?'var(--cy)':'#8BA3C1'}/><rect x="8.5" y="9" width="3" height="8" rx="1" fill={screen==='board'?'var(--cy)':'#8BA3C1'} opacity=".6"/><rect x="14" y="5" width="3" height="12" rx="1" fill={screen==='board'?'var(--cy)':'#8BA3C1'} opacity=".4"/></svg>
          <span className="bnl" style={{ color: screen==='board'?'var(--cy)':'' }}>Board</span>
        </button>
        <button className={`bnb${screen==='me'?' active':''}`} onClick={() => setScreen('me')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke={screen==='me'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4" fill="none"/><path d="M4 17C4 14.2 6.7 12 10 12C13.3 12 16 14.2 16 17" stroke={screen==='me'?'var(--cy)':'#8BA3C1'} strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
          <span className="bnl" style={{ color: screen==='me'?'var(--cy)':'' }}>Me</span>
        </button>
      </nav>
    </div>
  )
}
