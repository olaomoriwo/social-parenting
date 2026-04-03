import { useState } from 'react'
import Splash from './screens/Splash.jsx'
import Onboarding from './screens/onboarding/Onboarding.jsx'
import ParentApp from './screens/parent/ParentApp.jsx'
import ChildApp from './screens/child/ChildApp.jsx'

export default function App() {
  const [route, setRoute] = useState('splash')   // splash | onboarding | parent | child | choose
  const [family, setFamily] = useState(null)

  const handleSplashDone = () => setRoute('choose')

  const handleOnboardingDone = (familyData) => {
    setFamily(familyData)
    setRoute('parent')
  }

  if (route === 'splash') return (
    <div className="app-shell">
      <div className="phone">
        <Splash onDone={handleSplashDone} />
      </div>
    </div>
  )

  if (route === 'choose') return (
    <div className="app-shell">
      <div className="phone">
        <ChooseMode
          onParent={() => setRoute('onboarding')}
          onChild={() => setRoute('child')}
        />
      </div>
    </div>
  )

  if (route === 'onboarding') return (
    <div className="app-shell">
      <div className="phone">
        <Onboarding onDone={handleOnboardingDone} />
      </div>
    </div>
  )

  if (route === 'parent') return (
    <div className="app-shell">
      <div className="phone">
        <ParentApp family={family} onSwitch={() => setRoute('child')} />
      </div>
    </div>
  )

  if (route === 'child') return (
    <div className="app-shell">
      <div className="phone">
        <ChildApp onSwitch={() => setRoute('parent')} />
      </div>
    </div>
  )

  return null
}

function ChooseMode({ onParent, onChild }) {
  return (
    <div style={{
      background: 'var(--cb)', flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '32px 28px', gap: 28, height: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20, background: 'var(--cy)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L6 17H12V34H18V26H22V34H28V17H34L20 4Z" fill="#0F1B2D"/>
          </svg>
        </div>
        <div style={{ fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 900, color: 'var(--ct)', textAlign: 'center', letterSpacing: -.5 }}>
          The <span style={{ color: 'var(--cy)' }}>Social</span> Parenting
        </div>
        <div style={{ fontSize: 13, color: 'var(--cm)', textAlign: 'center', lineHeight: 1.5 }}>
          Turn chores into champions.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <button onClick={onParent} style={{
          width: '100%', padding: '18px', background: 'var(--pa)', color: '#fff',
          border: 'none', borderRadius: 16, fontFamily: 'var(--fp)', fontSize: 16,
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          <span style={{ fontSize: 20 }}>👨‍👩‍👧</span> I'm a Parent
        </button>
        <button onClick={onChild} style={{
          width: '100%', padding: '18px', background: 'var(--cs)',
          color: 'var(--ct)', border: '.5px solid var(--cbdr)',
          borderRadius: 16, fontFamily: 'var(--fp)', fontSize: 16,
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          <span style={{ fontSize: 20 }}>⭐</span> I'm a Child
        </button>
      </div>

      <div style={{ fontSize: 11, color: 'var(--cm)', textAlign: 'center', lineHeight: 1.6 }}>
        Demo build · All screens interactive<br/>
        <span style={{ color: 'var(--cy)', fontWeight: 700 }}>v0.1.0</span>
      </div>
    </div>
  )
}
