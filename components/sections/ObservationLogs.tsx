'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LOGS = [
  { id:'OBS-001', date:'2024.03.14', category:'SYSTEMS THINKING',         entry:"Every interface is a hypothesis about how someone thinks. The best ones are invisible because they perfectly predicted the user's mental model.",                                  classification:'INSIGHT',     accent:'#D6C6A5' },
  { id:'OBS-002', date:'2024.02.28', category:'EMOTIONAL TECHNOLOGY',     entry:"Software that moves you—literally or emotionally—is software that was made by someone who cared about more than correctness. Correctness is the floor, not the ceiling.",           classification:'PHILOSOPHY',  accent:'#B8A58A' },
  { id:'OBS-003', date:'2024.01.07', category:'AI TOOLING',               entry:"The risk with AI isn't that it replaces engineers. It's that it replaces engineering judgment. Knowing when NOT to use the tool is the skill that matters now.",                     classification:'WARNING',     accent:'#A63A3A' },
  { id:'OBS-004', date:'2023.11.22', category:'INTERACTION DESIGN',       entry:"Friction is not always the enemy. Deliberate friction—the pause before a destructive action, the confirmation before a purchase—is empathy encoded in a UI.",                       classification:'OBSERVATION', accent:'#D6C6A5' },
  { id:'OBS-005', date:'2023.09.05', category:'HUMAN-CENTERED ENG.',      entry:"Ship code that respects the person running it. Respect means: clear errors, honest states, forgiving inputs, and never making someone feel stupid for using your system.",           classification:'PRINCIPLE',   accent:'#B8A58A' },
  { id:'OBS-006', date:'2023.07.19', category:'CINEMATIC INTERFACES',     entry:"A transition is not decoration. It is narration. It tells the user: you were here, now you are there, and here is how the world changed in between.",                               classification:'INSIGHT',     accent:'#8E7C68' },
]

function LogEntry({ log, index }: { log: typeof LOGS[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-8%' })

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:(index % 3) * 0.1, duration:1.2, ease:[0.16,1,0.3,1] }}
      className="dossier-card rounded-sm overflow-hidden group"
    >
      {/* Top accent bar — CSS hover via group, zero JS */}
      <div className="h-0.5 w-full transition-opacity duration-500 opacity-40 group-hover:opacity-100"
        style={{ background:`linear-gradient(90deg, ${log.accent}, ${log.accent}60, transparent)` }} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[9px] text-stone/30 tracking-widest">{log.id}</span>
            <span className="text-stone/15 font-mono text-[8px]">—</span>
            <span className="font-mono text-[9px] text-stone/25 tracking-widest">{log.date}</span>
          </div>
          <span className="font-mono text-[8px] border px-2 py-0.5 tracking-widest rounded-sm shrink-0 ml-2"
            style={{ color: log.accent + 'CC', borderColor: log.accent + '30', background: log.accent + '08' }}>
            {log.classification}
          </span>
        </div>

        <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3"
          style={{ color: log.accent, opacity:0.65 }}>
          {log.category}
        </p>

        <p className="font-serif italic text-base leading-relaxed transition-colors duration-400 group-hover:text-ivory/80"
          style={{ color:'rgba(183,176,165,0.68)' }}>
          &ldquo;{log.entry}&rdquo;
        </p>

        <div className="mt-4 h-px transition-opacity duration-500 opacity-20 group-hover:opacity-60"
          style={{ background:`linear-gradient(90deg, ${log.accent}50, transparent)` }} />
      </div>
    </motion.div>
  )
}

export default function ObservationLogs() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(headerRef, { once:true, margin:'-60px' })

  return (
    <section id="philosophy" className="relative py-28 md:py-40 overflow-hidden" aria-label="Observation logs"
      style={{ background:'#151515' }}>
      <div className="absolute inset-0 investigation-grid opacity-12 pointer-events-none" />
      <div className="glow-blob w-[500px] h-[400px] absolute top-1/2 -translate-y-1/2 left-0"
        style={{ background:'rgba(20,33,61,0.25)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={headerRef}
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }} className="mb-16 md:mb-20">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color:'#D6C6A5' }}>
            ◈ OBSERVATION LOGS — FIELD NOTES
          </p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-ivory leading-none">
            How I{' '}
            <span className="not-italic font-sans font-light tracking-tighter"
              style={{ color:'#D6C6A5' }}>
              Think
            </span>
          </h2>
          <p className="mt-4 font-serif italic text-lg max-w-lg leading-relaxed"
            style={{ color:'#D6C6A5' }}>
            Fragments from an ongoing investigation into craft, technology, and the space between them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOGS.map((log, i) => <LogEntry key={log.id} log={log} index={i} />)}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ delay:1.2, duration:1 }}
          className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background:'linear-gradient(to right, transparent, rgba(214,198,165,0.08))' }} />
          <span className="font-mono text-[8px] text-stone/20 tracking-widest">LOGS ONGOING — {new Date().getFullYear()}</span>
          <div className="h-px flex-1" style={{ background:'linear-gradient(to left, transparent, rgba(214,198,165,0.08))' }} />
        </motion.div>
      </div>
    </section>
  )
}
