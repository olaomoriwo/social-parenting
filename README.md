# The Social Parenting — v0.1.0

A gamified parenting platform that redirects children's dopamine-seeking behaviour toward real-world habits, chores, and character formation.

---

## What's built

**Parent app**
- Splash screen + full 4-step onboarding (account, family, children, task templates)
- Parent dashboard — 3 states (fresh, partial, live)
- Task Manager — list, filter, toggle, detail, create, templates
- Bounty Board — create, filter by status, approve/decline/repost
- Approvals — individual + bulk approve with undo
- Wallet — top-up flow with amount picker, payment method, success state
- Co-parent invite — 3-step email invite with permissions explainer

**Child app**
- Home screen — animated points counter, streak, token balance, task preview, quick nav
- My Tasks — grouped by urgency, overdue treatment, complete → sheet → submit/approve
- Bounties — claim mechanic, locked-by-sibling state, proof submission
- Leaderboard — animated podium, weekly/all-time toggle, delta chips
- Profile — stats, badge wall (earned/locked), weekly activity strip, level progress
- Reward Celebration — confetti canvas, checkmark draw-in, reward breakdown

---

## Local development

**Prerequisites**: Node.js 18+ and npm

```bash
# 1. Unzip and enter the project
unzip social-parenting.zip
cd social-parenting

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

**To test on your phone while on the same Wi-Fi:**
```bash
npm run dev -- --host
```
Then open `http://<your-laptop-ip>:5173` on your phone.

---

## Deploy to Vercel (recommended — free, live URL in 2 minutes)

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```
Follow the prompts. Your app will be live at a `.vercel.app` URL instantly.

### Option B — GitHub + Vercel dashboard
1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/social-parenting.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework preset: **Vite** (auto-detected)
4. Click Deploy

Every `git push` to main auto-redeploys. Share the URL with anyone — works on any device, any browser.

---

## Deploy to Netlify (alternative)

```bash
npm run build
```
Then drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop).

---

## Project structure

```
social-parenting/
├── index.html              # Entry point + Google Fonts
├── vite.config.js
├── package.json
├── public/
│   ├── icon.svg            # App icon
│   └── manifest.json       # PWA manifest
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Route: splash → choose → onboarding → parent/child
    ├── index.css           # Design system (all CSS variables + animations)
    └── screens/
        ├── Splash.jsx
        ├── onboarding/
        │   └── Onboarding.jsx
        ├── parent/
        │   ├── ParentApp.jsx         # Shell + bottom nav
        │   ├── ParentDashboard.jsx
        │   ├── TaskManager.jsx
        │   ├── BountyBoard.jsx
        │   ├── ApprovalsWallet.jsx
        │   └── CoParentInvite.jsx
        └── child/
            ├── ChildApp.jsx          # Shell + bottom nav
            ├── ChildHome.jsx
            ├── ChildTasks.jsx
            ├── ChildBounties.jsx
            ├── ChildLeaderboard.jsx
            ├── ChildProfile.jsx
            └── ChildCelebration.jsx
```

---

## Design system

Two distinct palettes:

**Parent (clean fintech)**: `--pa` (blue) · `--pt` (dark text) · `--pb` (light bg) — Sora + IBM Plex Mono

**Child (premium game)**: `--cy` (gold) · `--cg` (mint) · `--cr` (coral) · `--cb` (navy) — Nunito + Space Grotesk

All tokens live in `src/index.css`.

---

## Next steps (roadmap)

- [ ] Backend: Supabase for auth, family data, task completions
- [ ] Push notifications: task reminders, approval alerts
- [ ] Photo proof upload (camera integration)
- [ ] Real payment integration (Stripe) for wallet top-up
- [ ] Child PIN / device switching
- [ ] Split household mode (separated parents)
- [ ] Native app wrapper (Capacitor or React Native)
