'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, AlertTriangle, User } from 'lucide-react'

const SKILLS = [
  { 
    category:'LANGUAGES',  
    items:['Python','TypeScript','JavaScript','SQL' , 'HTML/CSS'],    
    accent:'rgba(214,198,165,0.8)' 
  },

  { 
    category:'FRAMEWORKS', 
    items:['React','Next.js','Node.js','FastAPI'],       
    accent:'rgba(184,165,138,0.8)' 
  },

  { 
    category:'AI / SYSTEMS',    
    items:['OpenAI API','LangChain','RAG','AI Agents'],     
    accent:'rgba(166,58,58,0.9)' 
  },

  { 
    category:'DATA / BI',      
    items:['Power BI','DAX','Excel','Analytics'],     
    accent:'rgba(214,198,165,0.7)' 
  },

  { 
    category:'TOOLS',      
    items:['Docker','Vercel','GSAP','Figma'],     
    accent:'rgba(184,165,138,0.7)' 
  },
]

export default function SubjectProfile() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once:true, margin:'-80px' })
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [hoveredSkill, setHoveredSkill] = useState<string|null>(null)

  const toggle = (id: string) =>
    setUnlocked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const REDACTED = [
    { id:'r1', placeholder:'██████████████████', revealed:'AI-powered systems', color:'rgba(214,198,165,0.9)' },
    { id:'r2', placeholder:'███████████████', revealed:'backend engineering', color:'rgba(184,165,138,0.9)' },
    { id:'r3', placeholder:'████████████████████', revealed:'data-driven applications', color:'rgba(166,58,58,0.9)' },
  ]

  return (
    <section ref={sectionRef} id="subject"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background:'#0D1B2A' }}
    >
      {/* Glows */}
      <div className="glow-blob w-96 h-96 absolute top-1/4 right-0"
        style={{ background:'rgba(74,16,16,0.2)' }} />
      <div className="glow-blob w-80 h-80 absolute bottom-1/4 left-0"
        style={{ background:'rgba(20,33,61,0.4)' }} />
      <div className="absolute inset-0 investigation-grid opacity-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Dossier ── */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6"
              style={{ color:'rgba(166,58,58,0.8)' }}>
              ◈ PSYCHOLOGICAL PROFILE — SUBJECT A
            </p>

            <div className="dossier-card rounded-sm p-6 mb-6 relative">
              {/* Stamp */}
              <div className="absolute top-4 right-4">
                <span className="classified-stamp text-[10px]">CLASSIFIED</span>
              </div>

              {/* Profile row */}
              <div className="flex gap-5 mb-6">
                <div className="relative flex-shrink-0">
                  <Image src="/images/profile.jpg" alt="Hooria Amir" width={80} height={96} className="object-cover rounded-sm border"
                    style={{ borderColor:'rgba(214,198,165,0.15)' }} />
                  <div className="font-mono text-[7px] text-stone/30 mt-1 text-center tracking-widest">ID PHOTO</div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="evidence-label">SUBJECT NAME</span>
                    <p className="text-ivory font-sans font-semibold tracking-wide mt-0.5 text-lg">HOORIA AMIR</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-3">
                    {[['ROLE','Software Engineer'],['STATUS','Active'],['LOCATION','Lahore, Pakistan'],['FOCUS','AI + Full-Stack Systems']].map(([l,v]) => (
                      <div key={l}>
                        <div className="evidence-label">{l}</div>
                        <div className="font-mono text-[11px] mt-0.5" style={{ color:'#D6C6A5' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile summary */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="evidence-label">BIOGRAPHY</span>
                  {unlocked.size === REDACTED.length && (
                    <motion.span initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                      className="font-mono text-[8px] tracking-widest"
                      style={{ color:'#D6C6A5' }}>
                      FULLY DECRYPTED
                    </motion.span>
                  )}
                </div>
                <p className="font-serif italic text-sm leading-relaxed mb-4"
                  style={{ color:'#D6C6A5' }}>
                  Software Engineer based in Lahore, Pakistan, specializing in{' '}
                  <button onClick={() => toggle('r1')}
                    className={`font-serif italic text-sm rounded-sm px-0.5 transition-all duration-500 cursor-pointer ${!unlocked.has('r1') ? 'redacted' : ''}`}
                    style={{ color: unlocked.has('r1') ? REDACTED[0].color : undefined }}>
                    {unlocked.has('r1') ? REDACTED[0].revealed : REDACTED[0].placeholder}
                  </button>,{' '}
                  <button onClick={() => toggle('r2')}
                    className={`font-serif italic text-sm rounded-sm px-0.5 transition-all duration-500 cursor-pointer ${!unlocked.has('r2') ? 'redacted' : ''}`}
                    style={{ color: unlocked.has('r2') ? REDACTED[1].color : undefined }}>
                    {unlocked.has('r2') ? REDACTED[1].revealed : REDACTED[1].placeholder}
                  </button>, and{' '}
                  <button onClick={() => toggle('r3')}
                    className={`font-serif italic text-sm rounded-sm px-0.5 transition-all duration-500 cursor-pointer ${!unlocked.has('r3') ? 'redacted' : ''}`}
                    style={{ color: unlocked.has('r3') ? REDACTED[2].color : undefined }}>
                    {unlocked.has('r3') ? REDACTED[2].revealed : REDACTED[2].placeholder}
                  </button>.
                </p>
                <p className="font-mono text-[8px] text-stone/25 tracking-widest">↑ CLICK REDACTED TEXT TO DECRYPT</p>
                <div className="mt-6 space-y-3">
                  <p className="font-serif italic text-sm leading-relaxed"
                    style={{ color:'#D6C6A5' }}>
                    Experienced in developing intelligent applications, data platforms, full-stack systems, and immersive user experiences using modern technologies across web development, automation, and analytics.
                  </p>
                  <p className="font-serif italic text-sm leading-relaxed"
                    style={{ color:'#D6C6A5' }}>
                    My work spans AI-assisted development tools, business intelligence systems, property technology platforms, productivity applications, and interactive narrative experiences.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {[
                    'Backend Development & System Design',
                    'AI Integrations & Intelligent Systems',
                    'Data Engineering & Analytics',
                    'Full-Stack Web Development',
                    'Business Intelligence & Visualization',
                    'Database Design & SQL',
                    'API Development & Integrations',
                    'Interactive Experiences & Product Design',
                    'Automation Workflows',
                    'Performance Optimization',
                  ].map(item => (
                    <div key={item} className="font-mono text-[10px] tracking-wide text-stone/40">• {item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <span className="evidence-label" style={{ color:'rgba(214,198,165,0.5)' }}>INVESTIGATOR&apos;S NOTES</span>
              {[
                '"Code is design. Design is communication."',
                '"Build for humans first, machines second."',
                '"The best work is felt before it is seen."',
              ].map((note, i) => (
                <motion.div key={`note-${i}`}
                  initial={{ opacity:0, x:-20 }}
                  animate={isInView ? { opacity:1, x:0 } : {}}
                  transition={{ delay: i*0.2+1.2, duration:1, ease:[0.16,1,0.3,1] }}
                  className="flex items-start gap-3 group cursor-default">
                  <div className="w-px h-8 shrink-0 mt-1 transition-all duration-500"
                    style={{ background:'linear-gradient(to bottom, rgba(166,58,58,0.5), transparent)' }} />
                  <p className="font-serif italic text-sm transition-colors duration-400"
                    style={{ color:'#D6C6A5' }}>
                    {note}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Skills ── */}
          <motion.div initial={{ opacity:0, x:40 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ delay:0.2, duration:1.2, ease:[0.16,1,0.3,1] }}>
              <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase"
                style={{ color:'#D6C6A5' }}>
                ◈ TECHNICAL CAPABILITY REPORT
              </p>
              <AlertTriangle size={10} style={{ color:'rgba(166,58,58,0.4)' }} />
            </div>

            <div className="space-y-4">
              {SKILLS.map((group, gi) => (
                <motion.div key={group.category}
                  initial={{ opacity:0, y:20 }}
                  animate={isInView ? { opacity:1, y:0 } : {}}
                  transition={{ delay: gi*0.12+0.5, duration:1, ease:[0.16,1,0.3,1] }}
                  className="dossier-card rounded-sm p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={10} style={{ color: group.accent, opacity:0.6 }} />
                    <span className="evidence-label" style={{ color: group.accent, opacity:0.7 }}>{group.category}</span>
                    <div className="flex-1 h-px" style={{ background:'rgba(214,198,165,0.08)' }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <motion.button key={skill}
                        initial={{ opacity:0, scale:0.85 }}
                        animate={isInView ? { opacity:1, scale:1 } : {}}
                        transition={{ delay: gi*0.1+si*0.06+0.7, duration:0.6, ease:[0.16,1,0.3,1] }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="font-mono text-[11px] border px-3 py-1.5 rounded-sm transition-all duration-350"
                        style={{
                          background:    hoveredSkill === skill ? 'rgba(122,30,30,0.12)' : 'rgba(21,21,21,0.7)',
                          borderColor:   hoveredSkill === skill ? 'rgba(166,58,58,0.45)' : 'rgba(214,198,165,0.1)',
                          color:         hoveredSkill === skill ? group.accent : '#D6C6A5',
                          boxShadow:     hoveredSkill === skill ? '0 0 10px rgba(122,30,30,0.2)' : 'none',
                        }}>
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
              transition={{ delay:1.5, duration:1 }}
              className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background:'linear-gradient(to right, rgba(122,30,30,0.4), transparent)' }} />
              <span className="font-mono text-[8px] text-stone/40 tracking-widest">END OF PROFILE — CLEARANCE 4</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
