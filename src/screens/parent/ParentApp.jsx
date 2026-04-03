import { useState } from 'react'
import ParentDashboard from './ParentDashboard.jsx'
import TaskManager from './TaskManager.jsx'
import BountyBoard from './BountyBoard.jsx'
import ApprovalsWallet from './ApprovalsWallet.jsx'
import CoParentInvite from './CoParentInvite.jsx'

const NAV = [
  { id: 'dashboard', label: 'Home', icon: '⊞' },
  { id: 'tasks',     label: 'Tasks', icon: '✓' },
  { id: 'bounties',  label: 'Bounties', icon: '🏆' },
  { id: 'approvals', label: 'Approvals', icon: '🕐' },
  { id: 'wallet',    label: 'Wallet', icon: '◈' },
]

export default function ParentApp({ family, onSwitch }) {
  const [screen, setScreen] = useState('dashboard')
  const [showInvite, setShowInvite] = useState(false)

  const fam = family || {
    parentName: 'Sarah',
    famName: 'The Johnson Family',
    currency: 'GBP', sym: '£',
    children: [
      { name: 'Jamie', age: 12, color: '#2D6BE4' },
      { name: 'Lily',  age: 9,  color: '#EF476F' },
      { name: 'Noah',  age: 7,  color: '#06D6A0' },
    ],
  }

  return (
    <div style={{ background: '#F7F8FA', flex: 1, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--fp)' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {screen === 'dashboard' && <ParentDashboard family={fam} onNav={setScreen} onInvite={() => setShowInvite(true)} onSwitch={onSwitch} />}
        {screen === 'tasks'     && <TaskManager family={fam} />}
        {screen === 'bounties'  && <BountyBoard family={fam} />}
        {screen === 'approvals' && <ApprovalsWallet family={fam} tab="approvals" />}
        {screen === 'wallet'    && <ApprovalsWallet family={fam} tab="wallet" />}
        {showInvite && <CoParentInvite onClose={() => setShowInvite(false)} />}
      </div>

      <nav className="bnav parent">
        {NAV.map(n => (
          <button key={n.id} className={`bnb${screen === n.id ? ' active' : ''}`} onClick={() => setScreen(n.id)} style={{ '--py': 'var(--pa)' }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            <span className="bnl" style={{ color: screen === n.id ? 'var(--pa)' : 'var(--pu)' }}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
