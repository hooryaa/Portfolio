'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'

const NAV_ITEMS = [
  { label:'ARCHIVE',  href:'archive',  code:'01' },
  { label:'EVIDENCE', href:'evidence', code:'02' },
  { label:'SUBJECT',  href:'subject',  code:'03' },
  { label:'TIMELINE', href:'timeline', code:'04' },
  { label:'TERMINAL', href:'terminal', code:'05' },
]

export default function Navigation() {
  const [open,    setOpen]    = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active,  setActive]  = useState('')

  // Cache section offsets — recomputed only on resize, not every scroll
  const offsets = useRef<{ id: string; top: number }[]>([])
  const scrolledRef = useRef(false)

  const updateOffsets = () => {
    offsets.current = NAV_ITEMS.map(n => ({
      id:  n.href,
      top: document.getElementById(n.href)?.offsetTop ?? 0,
    }))
  }

  useEffect(() => {
    updateOffsets()
    window.addEventListener('resize', updateOffsets, { passive: true })

    const onScroll = () => {
      const y = window.scrollY
      // Scroll state — compare against ref to avoid extra renders
      const nowScrolled = y > 80
      if (nowScrolled !== scrolledRef.current) {
        scrolledRef.current = nowScrolled
        setScrolled(nowScrolled)
      }
      // Active section — cheap array scan, no DOM reads
      const threshold = y + window.innerHeight / 3
      for (let i = offsets.current.length - 1; i >= 0; i--) {
        if (offsets.current[i].top <= threshold) {
          setActive(offsets.current[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateOffsets)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1, delay:4.2, ease:[0.16,1,0.3,1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'bg-obsidian/95 backdrop-blur-xl border-b border-beige/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            className="flex items-center gap-2 group" aria-label="Return to top">
            <Shield size={14} className="text-rust/70 group-hover:text-rust transition-colors duration-300" />
            <span className="font-mono text-xs text-dustgray/70 tracking-[0.3em] uppercase group-hover:text-ivory transition-colors duration-300">
              H.AMIR
            </span>
            <span className="cursor-blink text-blood/50 font-mono text-xs">█</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <button key={item.code} onClick={() => go(item.href)}
                className={`group flex items-center gap-1.5 relative underline-glow transition-colors duration-300 ${
                  active === item.href ? 'text-ivory' : 'text-dustgray/60 hover:text-ivory'
                }`}>
                <span className={`font-mono text-[10px] transition-colors duration-300 ${
                  active === item.href ? 'text-rust' : 'text-stone/40 group-hover:text-stone/70'
                }`}>{item.code}</span>
                <span className="font-mono text-[11px] tracking-[0.18em]">{item.label}</span>
                {active === item.href && (
                  <motion.div layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rust"
                    style={{ boxShadow:'0 0 6px rgba(166,58,58,0.8)' }} />
                )}
              </button>
            ))}
          </div>

          <button onClick={() => setOpen(o => !o)}
            className="md:hidden text-dustgray hover:text-ivory transition-colors p-1"
            aria-label="Toggle navigation menu"
            aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, x:'100%' }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:'100%' }}
            transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
            className="fixed inset-0 z-[99] bg-obsidian/98 backdrop-blur-2xl flex flex-col justify-center px-10"
            role="dialog" aria-label="Navigation menu"
          >
            <div className="absolute inset-0 investigation-grid opacity-15 pointer-events-none" />
            <div className="glow-blob w-72 h-72 bg-blood/15 -top-20 -right-20" />
            <div className="space-y-1 relative z-10">
              <p className="font-mono text-[9px] text-stone/40 tracking-[0.4em] mb-10">— CLASSIFIED DATABASE —</p>
              {NAV_ITEMS.map((item, i) => (
                <motion.button key={item.code} onClick={() => go(item.href)}
                  initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.07, duration:0.5, ease:[0.16,1,0.3,1] }}
                  className="flex items-baseline gap-5 w-full group py-2">
                  <span className="font-mono text-xs text-blood/50 group-hover:text-rust transition-colors w-6">{item.code}</span>
                  <span className="font-serif text-4xl text-ivory/50 group-hover:text-ivory transition-colors italic">{item.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="absolute bottom-10 left-10 font-mono text-[8px] text-stone/25 tracking-widest">
              ACCESS LEVEL: RESTRICTED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
