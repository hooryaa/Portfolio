'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, BookOpen, Briefcase, Code2, Award, ChevronLeft, ChevronRight } from 'lucide-react'

// REPLACE: Update with your real timeline data
const EVENTS = [
  { year:'2018–2020', label:'ORIGIN POINT', title:'Unique High School — Matriculation',
    desc:'The first traces appeared here. Curiosity for computers, technology, and problem-solving slowly evolved into an obsession with building systems.',
    icon:Code2, type:'DISCOVERY', accent:'#D6C6A5' },
  { year:'2020–2022', label:'ACADEMIC FILE', title:'FSc Pre-Engineering — Defence Degree College',
    desc:'Mathematics, logic, and engineering principles shaped the analytical foundation. Systems thinking started forming long before software engineering officially began.',
    icon:BookOpen, type:'EDUCATION', accent:'#B8A58A' },
  { year:'2022–2026', label:'CASE FILE OPENED', title:'BS Software Engineering — Lahore Garrison University',
    desc:'Where theory became execution. Studied software engineering principles, algorithms, databases, networking, operating systems, and scalable architectures while building products outside the classroom.',
    icon:Award, type:'UNIVERSITY', accent:'#A63A3A' },
  { year:'2026', label:'ACTIVE INVESTIGATION', title:'Present — Building AI-integrated systems and analytics platforms',
    desc:'Currently building AI-integrated systems, analytics platforms, backend applications, automation workflows, and immersive digital experiences.',
    icon:Star, type:'PRESENT', accent:'#B8A58A' },
]

export default function TimelineInvestigation() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once:true, margin:'-80px' })
  const [activeIdx, setActiveIdx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart  = useRef({ x:0, scrollLeft:0 })

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current; if (!el) return
    setIsDragging(true)
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x)
  }
  const onMouseUp = () => setIsDragging(false)

  // Touch support
  const onTouchStart = (e: React.TouchEvent) => {
    const el = trackRef.current; if (!el) return
    setIsDragging(true)
    dragStart.current = { x: e.touches[0].pageX, scrollLeft: el.scrollLeft }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - (e.touches[0].pageX - dragStart.current.x)
  }
  const onTouchEnd = () => setIsDragging(false)

  const scrollToIdx = (idx: number) => {
    const clamped = Math.max(0, Math.min(EVENTS.length - 1, idx))
    setActiveIdx(clamped)
    const el = trackRef.current; if (!el) return
    const card = el.querySelectorAll('[data-card]')[clamped] as HTMLElement
    if (card) card.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
  }

  useEffect(() => {
    const el = trackRef.current; if (!el) return
    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[]
      if (!cards.length) return
      const center = el.scrollLeft + el.clientWidth / 2
      let nearest = 0
      let nearestDist = Infinity
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(cardCenter - center)
        if (dist < nearestDist) { nearestDist = dist; nearest = i }
      })
      setActiveIdx(Math.max(0, Math.min(EVENTS.length - 1, nearest)))
    }
    el.addEventListener('scroll', onScroll, { passive:true })
    // initialize
    onScroll()

    // Resize observer to recalc nearest on layout changes
    const ro = new ResizeObserver(() => onScroll())
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="timeline"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background:'#0D1B2A' }}
    >
      <div className="absolute inset-0 investigation-grid opacity-30 pointer-events-none" />
      <div className="glow-blob w-96 h-96 absolute top-1/2 -translate-y-1/2 right-1/4"
        style={{ background:'rgba(74,16,16,0.2)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header + nav */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3"
              style={{ color:'#D6C6A5' }}>
              ◈ INVESTIGATIVE TIMELINE
            </p>
            <h2 className="font-serif italic text-5xl md:text-7xl text-ivory leading-none">
              The{' '}
              <span className="not-italic font-sans font-light tracking-tighter"
                style={{ color:'#D6C6A5' }}>
                Journey
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
              <button onClick={() => scrollToIdx(activeIdx - 1)} disabled={activeIdx === 0}
              className="dossier-card w-10 h-10 flex items-center justify-center rounded-sm transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous milestone">
              <ChevronLeft size={15} style={{ color:'#D6C6A5' }} />
            </button>
            {EVENTS.map((_, i) => (
              <button key={`dot-${i}`} onClick={() => scrollToIdx(i)}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === activeIdx ? '16px' : '6px',
                  height: '6px',
                  background: i === activeIdx ? '#D6C6A5' : 'rgba(214,198,165,0.2)',
                  boxShadow: i === activeIdx ? '0 0 8px rgba(214,198,165,0.5)' : 'none',
                }}
                aria-label={`Go to event ${i+1}`} />
            ))}
            <button onClick={() => scrollToIdx(activeIdx + 1)} disabled={activeIdx === EVENTS.length - 1}
              className="dossier-card w-10 h-10 flex items-center justify-center rounded-sm transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next milestone">
              <ChevronRight size={15} style={{ color:'#D6C6A5' }} />
            </button>
          </div>
        </motion.div>

        {/* Track */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background:'linear-gradient(to right, #0D1B2A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background:'linear-gradient(to left, #0D1B2A, transparent)' }} />

          <div ref={trackRef}
            className={`flex gap-0 overflow-x-auto no-scrollbar pb-8 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
            <div className="w-10 flex-shrink-0" />
            {EVENTS.map((event, i) => {
              const Icon  = event.icon
              const isAct = i === activeIdx
              return (
                <div key={`event-${i}`} data-card className="flex items-start flex-shrink-0">
                  <motion.div
                    initial={{ opacity:0, y:30 }}
                    animate={isInView ? { opacity:1, y:0 } : {}}
                    transition={{ delay: i*0.1+0.4, duration:1, ease:[0.16,1,0.3,1] }}
                    onClick={() => scrollToIdx(i)}
                    className="relative w-[280px] md:w-80 cursor-pointer px-3 pb-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-px h-5"
                        style={{ background:`linear-gradient(to bottom, transparent, ${event.accent}40)` }} />
                      <motion.div
                        animate={{ scale: isAct ? 1.5 : 1 }}
                        transition={{ duration:0.4 }}
                        className="w-3 h-3 rounded-full border-2 transition-colors duration-400"
                        style={{
                          borderColor: isAct ? event.accent : 'rgba(214,198,165,0.2)',
                          background:  isAct ? event.accent + '30' : 'rgba(13,27,42,0.9)',
                          boxShadow:   isAct ? `0 0 12px ${event.accent}70` : 'none',
                        }} />
                    </div>

                    {/* Card */}
                    <div className="dossier-card rounded-sm p-5 transition-all duration-500"
                      style={{ borderColor: isAct ? event.accent + '45' : 'rgba(214,198,165,0.1)', boxShadow: isAct ? `0 0 30px rgba(214,198,165,0.06)` : undefined }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon size={12} style={{ color: isAct ? event.accent : 'rgba(214,198,165,0.3)', transition:'color 0.4s' }} />
                          <span className="font-mono font-bold text-3xl select-none leading-none"
                            style={{ color: event.accent, opacity: isAct ? 0.35 : 0.1 }}>
                            {event.year}
                          </span>
                        </div>
                        <span className="font-mono text-[8px] border px-2 py-0.5 tracking-widest rounded-sm"
                          style={{ color: event.accent + 'CC', borderColor: event.accent + '30', background: event.accent + '0A' }}>
                          {event.type}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] text-stone/30 tracking-widest uppercase mb-2">{event.label}</p>
                      <h3 className="font-sans font-semibold text-sm text-ivory/90 mb-2 leading-tight">{event.title}</h3>
                      <p className="font-serif italic text-sm leading-relaxed" style={{ color:'#D6C6A5' }}>{event.desc}</p>
                    </div>
                  </motion.div>

                  {/* Connector */}
                  {i < EVENTS.length - 1 && (
                    <motion.div
                      initial={{ scaleX:0 }}
                      animate={isInView ? { scaleX:1 } : {}}
                      transition={{ delay: i*0.12+0.6, duration:1, ease:[0.16,1,0.3,1] }}
                      className="w-6 h-px flex-shrink-0 origin-left mt-[calc(50%-32px)]"
                      style={{ background:`linear-gradient(90deg, ${EVENTS[i].accent}35, ${EVENTS[i+1].accent}35)` }} />
                  )}
                </div>
              )
            })}
            <div className="w-10 flex-shrink-0" />
          </div>
        </div>

        <div className="mt-8 rounded-sm border border-stone/10 bg-[#071119] p-6">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color:'#D6C6A5' }}>
            ACTIVITIES DURING THE UNIVERSITY ERA
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Built AI-powered systems and intelligent automation workflows',
              'Developed backend architectures and database-driven applications',
              'Created business intelligence dashboards and analytics solutions',
              'Worked on product-focused projects and freelance/client-style development',
              'Explored interactive experiences, storytelling systems, and frontend engineering',
              'Experimented with scalable applications, APIs, and modern development practices',
            ].map(item => (
              <div key={item} className="font-mono text-[11px] text-stone/35">• {item}</div>
            ))}
          </div>
        </div>

        {/* Active label */}
        <AnimatePresence mode="wait">
          <motion.div key={activeIdx}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.35 }}
            className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background:'linear-gradient(to right, transparent, rgba(214,198,165,0.06))' }} />
            <span className="font-mono text-[9px] tracking-widest"
              style={{ color: EVENTS[activeIdx].accent, opacity:0.55 }}>
              {activeIdx+1} / {EVENTS.length} — {EVENTS[activeIdx].title.toUpperCase()}
            </span>
            <div className="h-px flex-1" style={{ background:'linear-gradient(to left, transparent, rgba(214,198,165,0.06))' }} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
