'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Radio, Eye } from 'lucide-react'
import ParticleField from '@/components/ui/ParticleField'

const FRAGMENTS = [
  { id:'f1', label:'CASE FILE',  value:'#2024-HA-001',    x:'7%',  y:'22%', delay:1.5 },
  { id:'f2', label:'CLEARANCE',  value:'LEVEL 4',          x:'80%', y:'17%', delay:1.8 },
  { id:'f3', label:'SPECIALTY',  value:'INTERACTIVE SYS',  x:'5%',  y:'68%', delay:2.1 },
  { id:'f4', label:'LOCATION',   value:'CLASSIFIED',       x:'77%', y:'65%', delay:2.0 },
  { id:'f5', label:'STACK',      value:'NEXT / TS / AI',   x:'48%', y:'10%', delay:2.3 },
]

export default function SurveillanceIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  // Mouse-parallax glow — ref mutation, zero re-renders
  const glowRef    = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target:sectionRef, offset:['start start','end start'] })
  const titleY  = useTransform(scrollYProgress, [0,1], ['0%','28%'])
  const opacity = useTransform(scrollYProgress, [0,0.65], [1,0])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return
      glowRef.current.style.background =
        `radial-gradient(900px circle at ${e.clientX}px ${e.clientY}px, rgba(74,16,16,0.08) 0%, transparent 60%)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section ref={sectionRef} id="archive"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background:'radial-gradient(circle at top left, #14213D 0%, transparent 40%), radial-gradient(circle at bottom right, #4A1010 0%, transparent 35%), #070707' }}
    >
      <ParticleField count={45} color="214,198,165" />
      <ParticleField count={18} color="122,30,30" />

      {/* Mouse-parallax glow — zero re-renders */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-none" aria-hidden="true" />

      {/* Static glows */}
      <div className="glow-blob w-[600px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background:'rgba(20,33,61,0.35)' }} />
      <div className="glow-blob w-80 h-80 absolute top-1/4 right-10"
        style={{ background:'rgba(74,16,16,0.25)' }} />
      <div className="absolute inset-0 investigation-grid opacity-20 pointer-events-none" />

      {/* REC indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:4.6, duration:1.5 }}
        className="absolute top-20 left-6 md:left-10 flex items-center gap-2">
        <Eye size={12} className="text-blood" style={{ filter:'drop-shadow(0 0 5px rgba(122,30,30,0.8))' }} />
        <span className="font-mono text-[9px] text-stone/50 tracking-widest">REC</span>
        <div className="w-1.5 h-1.5 bg-blood rounded-full animate-pulse"
          style={{ boxShadow:'0 0 6px rgba(122,30,30,0.9)' }} />
      </motion.div>

      {/* Coordinates */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:4.9, duration:1 }}
        className="absolute bottom-8 left-6 md:left-10 font-mono text-[9px] text-stone/40 leading-relaxed">
        <div>LAT 33.6844° N</div>
        <div>LON 73.0479° E</div>
        <div className="mt-1" style={{ color:'rgba(184,165,138,0.5)' }}>SIGNAL LOCKED</div>
      </motion.div>

      {/* Floating fragments */}
      {FRAGMENTS.map(f => (
        <motion.div key={f.id}
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay: f.delay + 3.6, duration:1.5, ease:[0.16,1,0.3,1] }}
          style={{ left:f.x, top:f.y, animationDelay:`${f.delay}s` }}
          className="absolute hidden lg:block animate-float"
        >
          <div className="dossier-card px-3 py-2 rounded-sm">
            <div className="font-mono text-[8px] text-stone/40 tracking-widest mb-0.5">{f.label}</div>
            <div className="font-mono text-[10px] text-beige/80">{f.value}</div>
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div style={{ y:titleY, opacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:3.9, duration:1, ease:[0.16,1,0.3,1] }}
          className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-16" style={{ background:'linear-gradient(to right, transparent, rgba(122,30,30,0.6))' }} />
          <span className="case-badge"><Radio size={8} className="animate-pulse" />SUBJECT FILE ACTIVE</span>
          <div className="h-px w-16" style={{ background:'linear-gradient(to left, transparent, rgba(122,30,30,0.6))' }} />
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity:0, filter:'blur(30px)' }} animate={{ opacity:1, filter:'blur(0px)' }}
          transition={{ delay:3.3, duration:2.5, ease:[0.16,1,0.3,1] }}>
          <h1 className="glitch-text text-massive font-sans font-bold tracking-tighter text-ivory leading-none select-none mb-6"
            data-text="HOORIA AMIR">
            HOORIA AMIR
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:4.1, duration:1.5, ease:[0.16,1,0.3,1] }}
          className="font-serif italic text-2xl md:text-4xl leading-relaxed mb-4 max-w-3xl mx-auto"
          style={{ color:'rgba(183,176,165,0.8)' }}>
          building intelligent systems<br />
          <span style={{ color:'rgba(214,198,165,0.6)' }}>through mystery, interaction, and atmosphere.</span>
        </motion.p>

        {/* Roles */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:4.4, duration:1.5 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8">
          {['Software Engineer','Interactive Systems','AI Tooling','Storytelling Architectures'].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="text-blood/40">•</span>}
              <span className="font-mono text-[11px] tracking-widest uppercase"
                style={{ color:'rgba(183,176,165,0.55)' }}>{item}</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:5.2, duration:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] text-stone/40 tracking-[0.4em] uppercase">SCROLL TO INVESTIGATE</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}>
          <ChevronDown size={14} style={{ color:'rgba(214,198,165,0.35)' }} />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-beam" />
      </div>
    </section>
  )
}
