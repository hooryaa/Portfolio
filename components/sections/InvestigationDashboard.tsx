'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Folder, Lock, FileText, Monitor, Code2, Layers, ChevronRight } from 'lucide-react'

const CASE_LOGS = [
  {
    id:'CL-001', icon:Code2, label:'ENGINEERING', status:'ACTIVE',
    statusColor:'text-beige/70 border-beige/25 bg-beige/5',
    desc:'Full-stack architectures spanning AI tooling, web systems, and interactive experiences.',
    tags:['React','Next.js','TypeScript','Python'], level:'04', detail:'5+ production apps shipped',
    accent:'rgba(214,198,165,0.8)',
  },
  {
    id:'CL-002', icon:Layers, label:'DESIGN SYSTEMS', status:'ACTIVE',
    statusColor:'text-sand/70 border-sand/25 bg-sand/5',
    desc:'Obsessive attention to interface detail — motion, typography, and emotional interaction design.',
    tags:['Framer Motion','GSAP','Figma','CSS'], level:'03', detail:'Pixel-perfect delivery always',
    accent:'rgba(184,165,138,0.8)',
  },
  {
    id:'CL-003', icon:Monitor, label:'AI INTEGRATION', status:'CLASSIFIED',
    statusColor:'text-rust/70 border-rust/25 bg-rust/5',
    desc:'Weaving language models into real-world workflows. Thoughtful, not gratuitous.',
    tags:['LLMs','LangChain','RAG','Agents'], level:'05', detail:'3 AI products in production',
    accent:'rgba(166,58,58,0.9)',
  },
  {
    id:'CL-004', icon:FileText, label:'STORYTELLING', status:'ONGOING',
    statusColor:'text-khaki/70 border-khaki/25 bg-khaki/5',
    desc:'Every system tells a story. Building interfaces that are felt, not just used.',
    tags:['UX','Narrative','Interaction','Emotion'], level:'03', detail:'Experience-first philosophy',
    accent:'rgba(142,124,104,0.9)',
  },
  {
    id:'CL-005', icon:Lock, label:'BACKEND SYS', status:'ENCRYPTED',
    statusColor:'text-stone/60 border-stone/20 bg-stone/5',
    desc:'Scalable architectures, API design, and database engineering under the surface.',
    tags:['Node.js','PostgreSQL','REST','Auth'], level:'04', detail:'Zero-downtime deployments',
    accent:'rgba(183,176,165,0.7)',
  },
]

export default function InvestigationDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once:true, margin:'-100px' })
  const [active, setActive] = useState<string|null>(null)

  return (
    <section ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background:'#151515' }}
    >
      <div className="absolute inset-0 investigation-grid opacity-18 pointer-events-none" />
      <div className="glow-blob w-[500px] h-[400px] absolute top-0 left-1/4"
        style={{ background:'rgba(20,33,61,0.3)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:30 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }} className="mb-14">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ color:'#D6C6A5' }}>
            ◈ CAPABILITY ARCHIVE — ACCESS GRANTED
          </p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-ivory leading-none">
            Case{' '}
            <span className="not-italic font-sans font-light tracking-tight"
              style={{ color:'#D6C6A5' }}>
              Archive
            </span>
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background:'linear-gradient(to left, #151515, transparent)' }} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 select-none cursor-grab active:cursor-grabbing">
            {CASE_LOGS.map((log, i) => {
              const Icon    = log.icon
              const isOpen  = active === log.id
              return (
                <motion.div key={log.id}
                  initial={{ opacity:0, x:40 }}
                  animate={isInView ? { opacity:1, x:0 } : {}}
                  transition={{ delay: i*0.09+0.3, duration:1, ease:[0.16,1,0.3,1] }}
                  onClick={() => setActive(isOpen ? null : log.id)}
                  className="dossier-card rounded-sm flex-shrink-0 w-72 md:w-80 cursor-pointer transition-all duration-500"
                  style={{ borderColor: isOpen ? 'rgba(214,198,165,0.3)' : 'rgba(214,198,165,0.1)' }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Icon size={13} style={{ color: isOpen ? log.accent : 'rgba(214,198,165,0.3)', transition:'color 0.3s' }} />
                        <span className="font-mono text-[9px] text-stone/35 tracking-widest">{log.id}</span>
                      </div>
                      <span className={`font-mono text-[8px] tracking-widest px-2 py-0.5 border rounded-sm ${log.statusColor}`}>
                        {log.status}
                      </span>
                    </div>

                    <h3 className="font-sans font-semibold text-sm tracking-[0.15em] uppercase mb-3 transition-colors duration-300"
                      style={{ color: isOpen ? '#F3EEE6' : '#D6C6A5' }}>
                      {log.label}
                    </h3>
                    <p className="font-serif italic text-sm leading-relaxed mb-4"
                      style={{ color:'#D6C6A5' }}>
                      {log.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {log.tags.map(tag => (
                        <span key={tag} className="font-mono text-[9px] border px-2 py-0.5 rounded-sm"
                          style={{ color: log.accent, background:'rgba(122,30,30,0.06)', borderColor:'rgba(122,30,30,0.15)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable detail */}
                    <motion.div initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                      style={{ overflow:'hidden' }}>
                      <div className="pt-3 border-t flex items-center gap-2"
                        style={{ borderColor:'rgba(214,198,165,0.1)' }}>
                        <ChevronRight size={10} style={{ color: log.accent }} />
                        <span className="font-mono text-[10px] tracking-wide" style={{ color: log.accent }}>
                          {log.detail}
                        </span>
                      </div>
                    </motion.div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t"
                      style={{ borderColor:'rgba(214,198,165,0.06)' }}>
                      <span className="font-mono text-[8px] text-stone/25 tracking-widest">CLEARANCE LVL {log.level}</span>
                      <Folder size={10} style={{ color:'rgba(214,198,165,0.15)' }} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.p initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ delay:1.1, duration:1 }}
          className="mt-4 font-mono text-[9px] text-stone/25 tracking-widest">
          ← DRAG TO EXPLORE • CLICK TO EXPAND →
        </motion.p>
      </div>
    </section>
  )
}
