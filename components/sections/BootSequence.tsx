'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  'Initializing classified archive...',
  'Loading surveillance logs... [OK]',
  'Decrypting subject data...',
  'Connecting intelligence nodes... [3/3]',
  'Authenticating credentials...',
  'Access granted. Welcome.',
]

interface Props { onComplete: () => void }

export default function BootSequence({ onComplete }: Props) {
  // Three clear phases: 'boot' (typing), 'id' (name reveal), 'exit' (fade out)
  const [phase,    setPhase]    = useState<'boot' | 'id' | 'exit'>('boot')
  const [lines,    setLines]    = useState<string[]>([])
  const [lineIdx,  setLineIdx]  = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)

  // Progress bar and pct label driven by DOM refs — zero re-renders
  const barRef  = useRef<HTMLDivElement>(null)
  const pctRef  = useRef<HTMLSpanElement>(null)
  const rafBar  = useRef<number>(0)

  // ── Progress bar animation ──────────────────────────────
  useEffect(() => {
    const start = Date.now()
    const DURATION = 4200

    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min(elapsed / DURATION, 1)

      if (barRef.current)  barRef.current.style.width   = `${pct * 100}%`
      if (pctRef.current)  pctRef.current.textContent   = `${Math.round(pct * 100)}%`

      if (pct < 1) {
        rafBar.current = requestAnimationFrame(tick)
      }
    }
    rafBar.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafBar.current)
  }, [])

  // ── Typing animation ────────────────────────────────────
  useEffect(() => {
    // Only run during boot phase
    if (phase !== 'boot') return

    // All lines done → transition to id reveal
    if (lineIdx >= BOOT_LINES.length) {
      const t = setTimeout(() => setPhase('id'), 700)
      return () => clearTimeout(t)
    }

    const currentLine = BOOT_LINES[lineIdx]

    if (charIdx < currentLine.length) {
      // Type next character
      const t = setTimeout(() => {
        setLines(prev => {
          const updated = [...prev]
          updated[lineIdx] = currentLine.slice(0, charIdx + 1)
          return updated
        })
        setCharIdx(c => c + 1)
      }, 24)
      return () => clearTimeout(t)
    } else {
      // Line complete — move to next
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, 320)
      return () => clearTimeout(t)
    }
  }, [phase, lineIdx, charIdx])

  // ── Exit handler ─────────────────────────────────────────
  const handleAccess = () => {
    setPhase('exit')
    // Give Framer's exit animation 1.1s then unmount and reveal site
    setTimeout(onComplete, 1100)
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#070707' }}
          role="status"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* ── Atmosphere ── */}
          <div className="absolute inset-0 investigation-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="scan-beam" />
          </div>
          <div
            className="glow-blob absolute"
            style={{ width:'500px', height:'400px', top:'15%', left:'15%', background:'rgba(20,33,61,0.45)' }}
          />
          <div
            className="glow-blob absolute"
            style={{ width:'300px', height:'300px', bottom:'15%', right:'15%', background:'rgba(74,16,16,0.35)' }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 w-full max-w-xl px-6">

            {/* Status badge */}
            <div className="mb-8 flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background:'#7A1E1E', boxShadow:'0 0 6px rgba(122,30,30,0.8)' }}
              />
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ color:'#D6C6A5' }}>
                CLASSIFIED SYSTEM v4.7.2
              </span>
            </div>

            {/* Terminal window */}
            <div className="dossier-card rounded-sm p-6 mb-6">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-5 pb-3"
                style={{ borderBottom:'1px solid rgba(214,198,165,0.08)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'rgba(122,30,30,0.6)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'rgba(166,58,58,0.35)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'rgba(214,198,165,0.12)' }} />
                <span className="font-mono text-[9px] ml-2 tracking-widest"
                  style={{ color:'#D6C6A5' }}>
                  ARCHIVE_SYSTEM — bash
                </span>
              </div>

              {/* Lines */}
              <div className="space-y-1.5" style={{ minHeight: '132px' }}>
                {lines.slice(0, lineIdx).map((line, i) => (
                  <div key={`l${i}`} className="flex items-start gap-2">
                    <span className="font-mono text-xs shrink-0" style={{ color:'#D6C6A5' }}>›</span>
                    <span className="font-mono text-[12px]" style={{ color:'#D6C6A5' }}>{line}</span>
                  </div>
                ))}
                {/* Active typing line with cursor */}
                {phase === 'boot' && lineIdx < BOOT_LINES.length && (
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs shrink-0" style={{ color:'#D6C6A5' }}>›</span>
                    <span className="font-mono text-[12px]" style={{ color:'#D6C6A5' }}>
                      {lines[lineIdx] ?? BOOT_LINES[lineIdx] ?? ''}
                      <span className="cursor-blink" style={{ color:'#D6C6A5' }}>█</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-[9px] tracking-widest" style={{ color:'#D6C6A5' }}>
                  DECRYPTING
                </span>
                <span ref={pctRef} className="font-mono text-[9px]" style={{ color:'#D6C6A5' }}>
                  0%
                </span>
              </div>
              <div className="h-px relative overflow-hidden" style={{ background:'rgba(255,255,255,0.04)' }}>
                <div
                  ref={barRef}
                  className="absolute inset-y-0 left-0 transition-none"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #7A1E1E, #A63A3A, #D6C6A5)',
                    boxShadow: '0 0 10px rgba(166,58,58,0.55)',
                  }}
                />
              </div>
            </div>

            {/* Identity reveal — only in 'id' phase */}
            <AnimatePresence>
              {phase === 'id' && (
                <motion.div
                  key="id-reveal"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  {/* Name */}
                  <motion.p
                    initial={{ filter: 'blur(24px)', opacity: 0 }}
                    animate={{ filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif italic text-ivory leading-none mb-5"
                    style={{ fontSize: 'clamp(2.6rem, 10vw, 5.2rem)' }}
                  >
                    HOORIA AMIR
                  </motion.p>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px mb-7"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(214,198,165,0.4), transparent)',
                      transformOrigin: 'left',
                    }}
                  />

                  {/* CTA button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.7 }}
                    onClick={handleAccess}
                    className="font-mono text-[11px] tracking-[0.4em] uppercase px-10 py-3.5 border transition-all duration-400"
                    style={{
                      color: '#D6C6A5',
                      borderColor: 'rgba(214,198,165,0.28)',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.color = '#D6C6A5'
                      el.style.borderColor = 'rgba(214,198,165,0.5)'
                      el.style.boxShadow = '0 0 20px rgba(122,30,30,0.25)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.color = 'rgba(214,198,165,0.7)'
                      el.style.borderColor = 'rgba(214,198,165,0.2)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    ACCESS ARCHIVE
                    <span className="ml-2 cursor-blink" style={{ color: '#D6C6A5' }}>█</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner metadata */}
          <div className="absolute top-4 left-4 font-mono text-[8px] leading-relaxed"
            style={{ color:'#D6C6A5' }}>
            SEC-CLEARANCE:4<br />NODE:ENCRYPTED<br />STATUS:ACTIVE
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[8px] leading-relaxed text-right"
            style={{ color:'#D6C6A5' }}>
            LAT: 33.6844°N<br />LON: 73.0479°E<br />
            {new Date().toISOString().slice(0, 10)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
