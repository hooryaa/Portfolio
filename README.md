# HOORIA AMIR — Classified Archive Portfolio

> A cinematic crime-thriller interactive portfolio experience.
> Built with Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis

---

## QUICK START (5 minutes)

### 1. Prerequisites

Install Node.js v18+ from https://nodejs.org (LTS recommended).
Verify with: `node -v` and `npm -v`

### 2. Install dependencies

```bash
cd hooria-portfolio
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000 — the boot sequence plays automatically.

---

## PROJECT STRUCTURE

```
hooria-portfolio/
├── app/
│   ├── layout.tsx          ← Root layout, fonts, metadata
│   ├── page.tsx            ← Main page, assembles all sections
│   └── globals.css         ← Global styles, grain, scanlines, animations
│
├── components/
│   ├── layout/
│   │   └── Navigation.tsx  ← Fixed classified-database nav
│   ├── sections/
│   │   ├── BootSequence.tsx          ← Cinematic startup loader
│   │   ├── SurveillanceIntro.tsx     ← Hero section
│   │   ├── InvestigationDashboard.tsx ← Skills / case logs
│   │   ├── SubjectProfile.tsx        ← About / dossier
│   │   ├── FragmentedMemory.tsx      ← Philosophy scroll reveals
│   │   ├── EvidenceWall.tsx          ← Projects (main section)
│   │   ├── TimelineInvestigation.tsx ← Career timeline (GSAP horiz)
│   │   ├── ObservationLogs.tsx       ← Thoughts / notes
│   │   ├── HiddenClues.tsx           ← Easter eggs + hidden terminal
│   │   ├── FinalTransmission.tsx     ← Cinematic ending
│   │   └── ContactTerminal.tsx       ← Contact form + social links
│   └── ui/
│       ├── GrainOverlay.tsx    ← Fixed grain + scanlines
│       ├── GlitchText.tsx      ← CSS glitch text effect
│       ├── TerminalText.tsx    ← Typing animation
│       └── ParticleField.tsx   ← Canvas dust particles
│
├── hooks/
│   ├── useLenis.ts             ← Smooth scroll init
│   ├── useReducedMotion.ts     ← Accessibility
│   └── useScrollProgress.ts   ← Scroll % for elements
│
├── lib/
│   ├── utils.ts                ← cn(), clamp(), etc.
│   └── animations.ts           ← Framer Motion variants
│
├── public/
│   └── resume.pdf              ← REPLACE: Add your resume here
│
├── tailwind.config.ts          ← Full custom theme
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## CUSTOMISATION CHECKLIST

### Identity (REQUIRED)
- [ ] `components/sections/SubjectProfile.tsx` — Update bio, name, location, skills
- [ ] `components/sections/SurveillanceIntro.tsx` — Update microtext roles line
- [ ] `app/layout.tsx` — Update metadata title/description
- [ ] `public/resume.pdf` — Replace with your actual resume

### Projects (REQUIRED)
- [ ] `components/sections/EvidenceWall.tsx` — Find `PROJECTS` array at top, update all 5 entries:
  - `title` — project name
  - `subtitle` — one-line descriptor
  - `tagline` — atmospheric quote
  - `description` — full description
  - `discovery` — personal note / origin story
  - `tech` — technology stack
  - `metrics` — 3 key numbers
  - `github` — real GitHub URL
  - `live` — real live URL
  - `accentColor` — hex accent for this project

### Contact (REQUIRED)
- [ ] `components/sections/ContactTerminal.tsx` — Find `LINKS` array, update:
  - GitHub URL and label
  - LinkedIn URL and label
  - Email address
  - Resume link
- [ ] Wire the form to a real handler — search for `REPLACE: Wire this to your real form handler`
  - Recommended: [Resend](https://resend.com), [Formspree](https://formspree.io), or [EmailJS](https://emailjs.com)

### Timeline (RECOMMENDED)
- [ ] `components/sections/TimelineInvestigation.tsx` — Find `TIMELINE_EVENTS` array, replace with your real milestones

### Profile image (RECOMMENDED)
- [ ] `components/sections/SubjectProfile.tsx` — Find the profile image placeholder and replace with `<Image>` component pointing to your photo
- [ ] Add your photo to `public/images/profile.jpg`

### Observation logs (OPTIONAL)
- [ ] `components/sections/ObservationLogs.tsx` — Replace with your own thoughts

### Easter eggs (OPTIONAL)
- [ ] `components/sections/HiddenClues.tsx` — Update COMMANDS, CLUE_FRAGMENTS with your own secrets

---

## ADDING IMAGES TO PROJECTS

In `EvidenceWall.tsx`, find the screenshot placeholder inside `CaseFileModal`:

```tsx
{/* ── REPLACE: Add real screenshots/images here ── */}
<div className="w-full h-48 bg-bg-surface ...">
  {/* Replace this entire div with: */}
  <Image
    src="/images/projects/devpilot.jpg"
    alt="DevPilot screenshot"
    fill
    className="object-cover photo-frame"
  />
</div>
```

Add images to `public/images/projects/`.

---

## PRODUCTION BUILD

```bash
npm run build     # Compile and optimise
npm run start     # Run production build locally
```

---

## DEPLOY TO VERCEL (Recommended)

### Option A — CLI
```bash
npm install -g vercel
vercel
```
Follow prompts. Vercel auto-detects Next.js.

### Option B — GitHub + Vercel Dashboard
1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "init: classified archive portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/hooria-portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Click Deploy — done

Custom domain: Settings → Domains in Vercel dashboard.

---

## COMMON ERRORS & FIXES

### `Module not found: Can't resolve 'lenis'`
```bash
npm install lenis
```

### `Module not found: Can't resolve 'gsap'`
```bash
npm install gsap
```

### TypeScript errors about `framer-motion`
```bash
npm install framer-motion@latest
```

### Fonts not loading
Google Fonts requires internet access at build time. If building offline, replace font imports in `app/layout.tsx` with local font files using `next/font/local`.

### GSAP horizontal scroll not working
This is expected on mobile (< 768px) — the timeline falls back to vertical. On desktop, ensure the section has `min-height: 100vh`.

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

---

## PERFORMANCE NOTES

- All heavy sections are lazy-loaded with `dynamic()` — initial load is fast
- Particle canvas uses `requestAnimationFrame` with cleanup
- GSAP ScrollTrigger is registered once and shared
- Lenis + GSAP ticker integration prevents double-RAF

## ACCESSIBILITY

- Semantic HTML landmarks: `<main>`, `<section>`, `<nav>`
- All interactive elements have `aria-label`
- `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion`
- Keyboard navigation supported throughout
- Contrast ratios meet WCAG AA minimums

---

## EASTER EGGS

The site contains hidden interactions:
- **Clickable clue nodes** in the Hidden Clues section → unlock philosophical fragments
- **Hidden terminal** → type `help` to see commands
- **Konami code** (↑↑↓↓←→←→BA) → special access granted
- **Redacted text** in SubjectProfile → click DECRYPT to reveal

---

## TECH STACK VERSIONS

| Package         | Version  |
|-----------------|----------|
| Next.js         | 14.2.3   |
| React           | 18.3.1   |
| TypeScript      | 5.4.5    |
| Tailwind CSS    | 3.4.4    |
| Framer Motion   | 11.2.10  |
| GSAP            | 3.12.5   |
| Lenis           | 1.1.9    |
| Lucide React    | 0.395.0  |

---

Built with obsessive attention to detail.
Every transition is intentional. Every shadow is considered.
