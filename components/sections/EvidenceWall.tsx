'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronRight, X, Eye, Terminal } from 'lucide-react'

// ── REPLACE: Update each project with your real details ──
const PROJECTS = [
  {
    id:'CASE-001', status:'CLOSED', statusColor:'text-beige/70 border-beige/25 bg-beige/5',
    title:'DevPilot', subtitle:'AI-assisted development workflow',
    description:'An AI-powered VS Code companion that delivers contextual coding assistance, task automation, and developer productivity features.',
    tech:['TypeScript','React','Node.js','OpenAI API','VS Code API','Python','Google OAuth'],
    github:'https://github.com/hooryaa/DevPilot--Visual-Studio-Code-Extension-for-Beginner-Developers',
    live:'',
    youtubeUrl:'https://youtu.be/ocs4PCVTKS0',
    youtubeId:'ocs4PCVTKS0',
    thumbnail:'/images/projects/DevPilot.png',
    accent:'#D6C6A5', glow:'rgba(214,198,165,0.06)', borderHover:'rgba(214,198,165,0.3)', number:'01',
  },
  {
    id:'CASE-002', status:'ACTIVE', statusColor:'text-rust/80 border-rust/30 bg-rust/5',
    title:'Prestige Properties', subtitle:'Real estate intelligence platform',
    description:'A property intelligence dashboard that combines listings, analytics, and search tools into a polished real-estate experience.',
    tech:['TypeScript','React','Tailwind CSS','Supabase','JavaScript','Mapbox'],
    github:'https://github.com/hooryaa/Prestige-Properties',
    live:'https://prestige-properties-sigma.vercel.app/',
    youtubeUrl:'https://youtu.be/6yVQJo_Xm88',
    youtubeId:'6yVQJo_Xm88',
    thumbnail:'/images/projects/PrestigeProperties.png',
    accent:'#A63A3A', glow:'rgba(166,58,58,0.08)', borderHover:'rgba(166,58,58,0.4)', number:'02',
  },
  {
    id:'CASE-003', status:'CLOSED', statusColor:'text-sand/70 border-sand/25 bg-sand/5',
    title:'SimpleWrite', subtitle:'Minimalist writing environment',
    description:'A distraction-free writing workspace designed for creators who value simplicity, autosave reliability, and calm focus.',
    tech:['TypeScript','React','Node.js','Express','MongoDB','Tailwind CSS'],
    github:'https://github.com/hooryaa/SimpleWrite-blog-platform',
    live:'',
    youtubeUrl:'https://youtu.be/Pfge5TaqRjY',
    youtubeId:'Pfge5TaqRjY',
    thumbnail:'/images/projects/SimpleWrite.png',
    accent:'#B8A58A', glow:'rgba(184,165,138,0.07)', borderHover:'rgba(184,165,138,0.3)', number:'03',
  },
  {
    id:'CASE-004', status:'ONGOING', statusColor:'text-blood/80 border-blood/30 bg-blood/5',
    title:'Power BI Dashboard', subtitle:'Business intelligence reporting suite',
    description:'A data analytics dashboard built with Power BI to surface KPIs, trends, and automated business intelligence reports.',
    tech:['Power BI','DAX','ETL','Data Modeling','SQL','CSV'],
    github:'https://github.com/hooryaa/PowerBI--ETL-DAX-Data-Modelling',
    live:'',
    youtubeUrl:'https://youtu.be/zu4I3rUAazE',
    youtubeId:'zu4I3rUAazE',
    thumbnail:'/images/projects/PowerBI.png',
    accent:'#8B2323', glow:'rgba(139,35,35,0.08)', borderHover:'rgba(139,35,35,0.4)', number:'04',
  },
  {
    id:'CASE-005', status:'CLASSIFIED', statusColor:'text-stone/60 border-stone/20 bg-stone/5',
    title:'Runner Game', subtitle:'Interactive narrative experience',
    description:'An endless runner game that ensures responsive gameplay.',
    tech:['Unity','C#','Game Design','Narrative Systems'],
    github:'',
    live:'',
    youtubeUrl:'https://youtu.be/YQ3GrWDbImI',
    youtubeId:'YQ3GrWDbImI',
    thumbnail:'/images/projects/RunnerGame.png',
    accent:'#D6C6A5', glow:'rgba(214,198,165,0.05)', borderHover:'rgba(214,198,165,0.25)', number:'05',
  },
]

function CaseFileModal({ project, onClose }: { project: typeof PROJECTS[number]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      style={{ background:'rgba(7,7,7,0.95)', backdropFilter:'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity:0, scale:0.9, y:40 }}
        animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.94, y:20 }}
        transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
        className="dossier-card rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar relative"
        style={{ borderColor: project.accent + '30' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 transition-colors p-1"
          style={{ color:'rgba(183,176,165,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F3EEE6')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(183,176,165,0.4)')}
          aria-label="Close case file">
          <X size={18} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start gap-5 mb-7">
            <div className="font-mono text-6xl font-bold leading-none select-none shrink-0"
              style={{ color: project.accent, opacity:0.12 }}>
              {project.number}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[9px] text-stone/35 tracking-widest">{project.id}</span>
                <span className={`font-mono text-[8px] border px-2 py-0.5 tracking-widest rounded-sm ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>
              <h3 className="font-sans font-bold text-3xl text-ivory tracking-tight">{project.title}</h3>
              <p className="font-mono text-[11px] tracking-wide mt-1" style={{ color:'#D6C6A5' }}>{project.subtitle}</p>
            </div>
          </div>

          <div className="w-full aspect-video border mb-7 relative overflow-hidden rounded-sm"
            style={{ borderColor:'rgba(214,198,165,0.08)' }}>
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.github && project.github !== '' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-2 border rounded-sm transition-colors duration-300"
                style={{ color:'#D6C6A5', borderColor:'rgba(214,198,165,0.18)', background:'rgba(21,21,21,0.9)' }}>
                VIEW SOURCE
              </a>
            )}
            {project.live && project.live !== '' && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-2 border rounded-sm transition-colors duration-300"
                style={{ color: project.accent, borderColor: project.accent + '30', background:'rgba(13,27,42,0.9)' }}>
                LIVE DEMO
              </a>
            )}
          </div>

          {/* Description */}
          <p className="font-serif text-sm leading-relaxed mb-6"
            style={{ color:'#D6C6A5' }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-7">
            <p className="evidence-label mb-3">TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[10px] px-3 py-1.5 rounded-sm border transition-all duration-300 hover:scale-105"
                  style={{ color: project.accent + 'AA', borderColor: project.accent + '20', background: project.glow }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 rounded-sm border transition-all duration-300"
                style={{ color:'#D6C6A5', borderColor:'rgba(214,198,165,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F3EEE6'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,198,165,0.4)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#D6C6A5'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,198,165,0.15)' }}>
                <Github size={12} />VIEW SOURCE
              </a>
            )}
            {project.live && project.live !== '' && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 rounded-sm border transition-all duration-300"
                style={{ color: project.accent, borderColor: project.accent + '35', background: project.glow }}>
                <ExternalLink size={12} />LIVE DEMO
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EvidenceWall() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once:true, margin:'-60px' })
  const [selected, setSelected] = useState<typeof PROJECTS[number] | null>(null)
  const [hoveredId, setHoveredId] = useState<string|null>(null)

  return (
    <section ref={sectionRef} id="evidence"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background:'#070707' }}
    >
      {/* Atmospheric glows */}
      <div className="glow-blob w-[500px] h-[400px] absolute top-0 left-1/2 -translate-x-1/2"
        style={{ background:'rgba(20,33,61,0.3)' }} />
      <div className="glow-blob w-80 h-80 absolute bottom-0 right-0"
        style={{ background:'rgba(74,16,16,0.2)' }} />
      <div className="absolute inset-0 investigation-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.2, ease:[0.16,1,0.3,1] }} className="mb-16">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color:'rgba(166,58,58,0.8)' }}>
            ◈ EVIDENCE WALL — CASE FILES RETRIEVED
          </p>
          <h2 className="font-serif italic text-huge text-ivory leading-none">
            The{' '}
            <span className="not-italic font-sans font-light tracking-tighter"
              style={{ color:'rgba(166,58,58,0.7)' }}>
              Work
            </span>
          </h2>
          <p className="mt-4 font-serif italic text-lg max-w-xl leading-relaxed"
            style={{ color:'rgba(183,176,165,0.55)' }}>
            Five investigations. Each one a system built to be remembered.
          </p>
        </motion.div>

        {/* Project list */}
        <div className="space-y-3">
          {PROJECTS.map((project, i) => {
            const isHov = hoveredId === project.id
            return (
              <motion.div key={project.id}
                initial={{ opacity:0, y:50 }}
                animate={isInView ? { opacity:1, y:0 } : {}}
                transition={{ delay: i*0.1+0.3, duration:1.2, ease:[0.16,1,0.3,1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelected(project)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(project)}
                aria-label={`Open case file: ${project.title}`}
                className="relative dossier-card rounded-sm overflow-hidden cursor-pointer"
                style={{ borderColor: isHov ? project.borderHover : 'rgba(214,198,165,0.1)' }}
              >
                {/* Hover glow */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHov ? 1 : 0 }}
                  transition={{ duration:0.5 }}
                  style={{ background:`radial-gradient(ellipse at 25% 50%, ${project.glow}, transparent 65%)` }}
                />
                {/* Left accent bar */}
                <motion.div className="absolute left-0 top-0 bottom-0 w-0.5"
                  animate={{ opacity: isHov ? 1 : 0, scaleY: isHov ? 1 : 0.3 }}
                  transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                  style={{ background: project.accent, boxShadow:`0 0 10px ${project.accent}` }}
                />

                <div className="relative z-10 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Big number */}
                    <div className="font-mono font-bold text-6xl md:text-8xl leading-none select-none shrink-0 transition-all duration-500"
                      style={{ color: project.accent, opacity: isHov ? 0.18 : 0.07 }}>
                      {project.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-[9px] text-stone/35 tracking-widest">{project.id}</span>
                        <span className={`font-mono text-[8px] border px-2 py-0.5 tracking-widest rounded-sm ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-2xl md:text-3xl text-ivory tracking-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[11px] text-stone/45 tracking-widest mb-3">{project.subtitle}</p>
                      <p className="font-serif text-sm leading-relaxed max-w-2xl mb-4"
                        style={{ color:'rgba(183,176,165,0.65)' }}>
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.live && project.live !== '' && project.live !== '#' && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-2 border rounded-sm transition-colors duration-300"
                            style={{ color:project.accent, borderColor: project.accent + '30', background:'rgba(13,27,42,0.9)' }}>
                            LIVE DEMO
                          </a>
                        )}
                        {project.github && project.github !== '' && project.github !== '#' && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-2 border rounded-sm transition-colors duration-300"
                            style={{ color:'rgba(214,198,165,0.85)', borderColor:'rgba(214,198,165,0.15)', background:'rgba(21,21,21,0.9)' }}>
                            VIEW SOURCE
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: tech + CTA */}
                    <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                      <div className="flex flex-wrap gap-1.5 md:justify-end">
                        <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-stone/40">STACK:</span>
                        {project.tech.map(t => (
                          <span key={t} className="font-mono text-[9px] px-2 py-0.5 border rounded-sm"
                            style={{ color: project.accent + 'AA', borderColor: project.accent + '20', background: project.glow }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <motion.div className="flex items-center"
                        animate={{ gap: isHov ? '12px' : '8px' }}
                        transition={{ duration:0.3 }}>
                        <span className="font-mono text-[10px] tracking-widest transition-opacity duration-300"
                          style={{ color: project.accent, opacity: isHov ? 1 : 0.45 }}>
                          OPEN FILE
                        </span>
                        <ChevronRight size={12} style={{ color: project.accent, opacity: isHov ? 1 : 0.35 }} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Bottom shimmer */}
                <motion.div className="absolute bottom-0 left-0 right-0 h-px"
                  animate={{ opacity: isHov ? 1 : 0 }}
                  transition={{ duration:0.4 }}
                  style={{ background:`linear-gradient(90deg, transparent, ${project.accent}60, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ delay:1.4, duration:1 }}
          className="mt-10 flex items-center gap-4">
          <Terminal size={10} style={{ color:'rgba(123,116,106,0.3)' }} />
          <span className="font-mono text-[9px] text-stone/25 tracking-widest">
            {PROJECTS.length} CASE FILES RECOVERED — CLICK ANY CARD TO EXPAND
          </span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(to right, rgba(214,198,165,0.08), transparent)' }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <CaseFileModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
