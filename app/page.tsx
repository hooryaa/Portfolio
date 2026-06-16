'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Navigation   from '@/components/layout/Navigation'
import BootSequence from '@/components/sections/BootSequence'
import { useLenis } from '@/hooks/useLenis'

// Minimal height-preserving skeleton — prevents layout shift while sections load
function SectionSkeleton({ height = 'min-h-screen' }: { height?: string }) {
  return <div className={`${height}`} style={{ background:'#070707' }} aria-hidden="true" />
}

// All sections lazy-loaded with loading skeletons
const SurveillanceIntro      = dynamic(() => import('@/components/sections/SurveillanceIntro'),      { ssr:false, loading:() => <SectionSkeleton /> })
const EvidenceWall           = dynamic(() => import('@/components/sections/EvidenceWall'),           { ssr:false, loading:() => <SectionSkeleton /> })
const SubjectProfile         = dynamic(() => import('@/components/sections/SubjectProfile'),         { ssr:false, loading:() => <SectionSkeleton /> })
const InvestigationDashboard = dynamic(() => import('@/components/sections/InvestigationDashboard'), { ssr:false, loading:() => <SectionSkeleton height="min-h-[60vh]" /> })
const TimelineInvestigation  = dynamic(() => import('@/components/sections/TimelineInvestigation'),  { ssr:false, loading:() => <SectionSkeleton height="min-h-[70vh]" /> })
const ObservationLogs        = dynamic(() => import('@/components/sections/ObservationLogs'),        { ssr:false, loading:() => <SectionSkeleton height="min-h-[80vh]" /> })
const HiddenClues            = dynamic(() => import('@/components/sections/HiddenClues'),            { ssr:false, loading:() => <SectionSkeleton height="min-h-[80vh]" /> })
const ContactTerminal        = dynamic(() => import('@/components/sections/ContactTerminal'),        { ssr:false, loading:() => <SectionSkeleton height="min-h-[70vh]" /> })

// ── Scroll progress bar — ref-based, zero re-renders ──────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return
      const el  = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      barRef.current.style.width = `${(isNaN(pct) ? 0 : pct) * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      ref={barRef}
      className="scroll-progress"
      aria-hidden="true"
      style={{ width: '0%' }}
    />
  )
}

// ── Cursor glow — ref-based DOM mutation, zero re-renders ─────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.left = `${e.clientX}px`
      ref.current.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={ref}
      className="cursor-glow"
      aria-hidden="true"
      style={{ left: '-9999px', top: '-9999px' }}
    />
  )
}

// ── Root page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [booted, setBooted] = useState(false)
  useLenis()

  // When boot completes, ensure the first visible section is Archive
  useEffect(() => {
    if (!booted) return
    try {
      if (!location.hash) {
        history.replaceState(null, '', '#archive')
        document.getElementById('archive')?.scrollIntoView({ behavior: 'auto' })
      }
    } catch {}
  }, [booted])

  return (
    <>
      {/* Boot overlay — sits on top at z-[200], unmounts after exit animation */}
      <BootSequence onComplete={() => setBooted(true)} />

      {/*
        Main site — always in the DOM so dynamic imports start loading immediately.
        Hidden via opacity+pointerEvents until boot completes.
        visibility:hidden prevents tab-focus on hidden content.
      */}
      <div
        style={{
          opacity:          booted ? 1 : 0,
          visibility:       booted ? 'visible' : 'hidden',
          transition:       'opacity 0.9s cubic-bezier(0.16,1,0.3,1), visibility 0s linear 0s',
          transitionDelay:  booted ? '0s, 0s' : '0s, 0.9s',
        }}
      >
        <GrainOverlay />
        <CursorGlow />
        <ScrollProgress />
        <Navigation />

        <main id="main-content">
          {/* Order: Hero → Work → About → Skills → Philosophy → Timeline → Thoughts → Secrets → Outro → Contact */}
          <SurveillanceIntro />
          <EvidenceWall />
          <SubjectProfile />
          <InvestigationDashboard />
          <TimelineInvestigation />
          <ObservationLogs />
          <HiddenClues />
          <ContactTerminal />
        </main>
      </div>
    </>
  )
}
