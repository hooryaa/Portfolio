'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, Eye, Terminal } from 'lucide-react'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

const CLUES = [
  { id:'C1', x:'14%', y:'25%', label:'FILE_001', secret:'I built my first website at 3am. Still do my best work then.' },
  { id:'C2', x:'68%', y:'18%', label:'FILE_002', secret:'The real project count is higher. Some things stay classified.' },
  { id:'C3', x:'40%', y:'60%', label:'FILE_003', secret:'I once spent 6 hours perfecting a transition nobody noticed. Worth it.' },
  { id:'C4', x:'82%', y:'52%', label:'FILE_004', secret:'Every portfolio site I build has a hidden room. You found it.' },
  { id:'C5', x:'22%', y:'72%', label:'FILE_005', secret:"I read design docs like novels. I annotate API specs. I'm fine." },
]

const COMMANDS: Record<string, string> = {
  help:    'Commands: help · whoami · skills · contact · unlock · secret · clear',
  whoami:  'HOORIA AMIR — Software Engineer · Interactive Systems · AI Tooling',
  skills:  'TypeScript · Next.js · Python · React · Node.js · AI/LLMs · GSAP · PostgreSQL',
  contact: 'Email: hooria@email.com · GitHub: github.com/hooria · LinkedIn: linkedin.com/in/hooria',  // REPLACE
  unlock:  '🔓 DECRYPTED: "The best work I\'ve done isn\'t public yet."',
  secret:  '👁 ACCESS GRANTED: "There are 5 hidden nodes on this page. You found the terminal."',
  clear:   '__CLEAR__',
}

export default function HiddenClues() {
  const sectionRef  = useRef<HTMLElement>(null)
  const inputRef    = useRef<HTMLInputElement>(null)
  const termBodyRef = useRef<HTMLDivElement>(null)
  const isInView    = useInView(sectionRef, { once:true, margin:'-80px' })

  const [revealed,      setRevealed]  = useState<string|null>(null)
  const [input,         setInput]     = useState('')
  const [history,       setHistory]   = useState<{cmd:string;res:string}[]>([])
  const [konamiProg,    setKProg]     = useState(0)
  const [konamiDone,    setKDone]     = useState(false)
  const [unlocked,      setUnlocked]  = useState<Set<string>>(new Set())

  // Konami
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiProg]) {
        const next = konamiProg + 1
        if (next === KONAMI.length) { setKDone(true); setKProg(0) }
        else setKProg(next)
      } else { setKProg(0) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [konamiProg])

  // Auto-scroll terminal
  useEffect(() => {
    if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight
  }, [history])

  const runCommand = useCallback((cmd: string) => {
    const key = cmd.trim().toLowerCase()
    const res = COMMANDS[key] ?? `Command not found: "${cmd}". Type "help" for options.`
    if (res === '__CLEAR__') setHistory([])
    else setHistory(h => [...h, { cmd, res }])
    setInput('')
  }, [])

  const toggleClue = (id: string) => {
    setRevealed(prev => prev === id ? null : id)
    setUnlocked(prev => { const n = new Set(prev); n.add(id); return n })
  }

  return (
    <section ref={sectionRef} id="hidden-clues"
      className="relative py-28 md:py-40 overflow-hidden min-h-screen"
      style={{ background:'#1A0F10' }}
      aria-label="Hidden clues and easter eggs">
      <div className="absolute inset-0 investigation-grid opacity-18 pointer-events-none" />
      <div className="glow-blob w-96 h-96 absolute top-1/4 left-1/2 -translate-x-1/2"
        style={{ background:'rgba(74,16,16,0.3)' }} />
      <div className="glow-blob w-64 h-64 absolute bottom-1/4 left-1/4"
        style={{ background:'rgba(20,33,61,0.25)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }} className="mb-14">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color:'rgba(166,58,58,0.7)' }}>
            ◈ RESTRICTED ZONE — PROCEED WITH CAUTION
          </p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-ivory leading-none">
            Hidden{' '}
            <span className="not-italic font-sans font-light tracking-tighter"
              style={{ color:'rgba(166,58,58,0.65)' }}>
              Clues
            </span>
          </h2>
          <p className="mt-4 font-serif italic text-lg max-w-lg leading-relaxed"
            style={{ color:'#D6C6A5' }}>
            This archive rewards the curious. Explore carefully.
          </p>
          <p className="mt-2 font-mono text-[9px] text-stone/25 tracking-widest">
            {unlocked.size}/{CLUES.length} NODES DECRYPTED
            {konamiDone && ' · KONAMI UNLOCKED'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Clue nodes */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ delay:0.3, duration:1, ease:[0.16,1,0.3,1] }}>
            <p className="font-mono text-[9px] text-stone/25 tracking-widest mb-4">◈ CLICK NODES TO DECRYPT FRAGMENTS</p>
            <div className="relative w-full rounded-sm border"
              style={{ height:'340px', background:'rgba(21,21,21,0.6)', borderColor:'rgba(214,198,165,0.08)' }}>
              <div className="absolute inset-0 investigation-grid opacity-30 rounded-sm pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none"><div className="scan-beam opacity-20" /></div>
              <div className="absolute top-3 right-3 font-mono text-[8px] text-stone/20 tracking-widest">
                {unlocked.size}/{CLUES.length} UNLOCKED
              </div>

              {CLUES.map(clue => {
                const isOpen     = revealed === clue.id
                const isUnlocked = unlocked.has(clue.id)
                return (
                  <button key={clue.id} onClick={() => toggleClue(clue.id)}
                    style={{ left:clue.x, top:clue.y }}
                    className="absolute" aria-label={`Decrypt ${clue.label}`}>
                    <span className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-ping-slow opacity-20"
                      style={{ borderColor: isOpen ? '#A63A3A' : 'rgba(214,198,165,0.35)' }} />
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-400"
                      style={{
                        borderColor: isOpen ? '#A63A3A' : isUnlocked ? 'rgba(184,165,138,0.6)' : 'rgba(214,198,165,0.3)',
                        background:  isOpen ? 'rgba(122,30,30,0.3)' : 'rgba(26,15,16,0.9)',
                        boxShadow:   isOpen ? '0 0 12px rgba(122,30,30,0.6)' : 'none',
                        transform:   isOpen ? 'scale(1.25)' : 'scale(1)',
                      }}>
                      {isOpen
                        ? <Unlock size={7} style={{ color:'#A63A3A' }} />
                        : isUnlocked
                        ? <Eye size={7} style={{ color:'rgba(184,165,138,0.7)' }} />
                        : <Lock size={7} style={{ color:'rgba(214,198,165,0.45)' }} />
                      }
                    </div>
                    <span className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[7px] text-stone/20 tracking-widest whitespace-nowrap">
                      {clue.label}
                    </span>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity:0, y:8, scale:0.92 }}
                          animate={{ opacity:1, y:0, scale:1 }}
                          exit={{ opacity:0, scale:0.92 }}
                          transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                          className="absolute z-20 w-56 bottom-8 left-1/2 -translate-x-1/2 dossier-card rounded-sm p-3"
                          style={{ borderColor:'rgba(166,58,58,0.3)' }}>
                          <p className="font-mono text-[8px] tracking-widest mb-1.5"
                             style={{ color:'#D6C6A5' }}>DECRYPTED</p>
                          <p className="font-serif italic text-xs leading-relaxed"
                             style={{ color:'#D6C6A5' }}>{clue.secret}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}

              <div className="absolute top-2 left-3 font-mono text-[7px] text-stone/15 tracking-widest">GRID_A</div>
              <div className="absolute bottom-2 right-3 font-mono text-[7px] text-stone/15 tracking-widest">{CLUES.length} NODES</div>
            </div>

            <AnimatePresence>
              {konamiDone && (
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.6 }}
                  className="mt-4 dossier-card rounded-sm p-4"
                  style={{ borderColor:'rgba(184,165,138,0.25)' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span style={{ color:'#D6C6A5', fontSize:'14px' }}>★</span>
                    <span className="font-mono text-[9px] tracking-widest" style={{ color:'#D6C6A5' }}>KONAMI CODE ACCEPTED</span>
                  </div>
                  <p className="font-serif italic text-sm" style={{ color:'#D6C6A5' }}>
                    &ldquo;I respect you for trying that. Genuinely.&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {!konamiDone && (
              <p className="mt-3 font-mono text-[8px] text-stone/18 tracking-widest">↑↑↓↓←→←→BA — there&apos;s always a secret.</p>
            )}
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{ opacity:0, x:30 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ delay:0.5, duration:1, ease:[0.16,1,0.3,1] }}>
            <p className="font-mono text-[9px] text-stone/25 tracking-widest mb-4">◈ COMMAND INTERFACE — TYPE &quot;HELP&quot;</p>
            <div className="dossier-card rounded-sm overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b"
                style={{ borderColor:'rgba(214,198,165,0.06)', background:'rgba(21,21,21,0.7)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-blood/50" />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'rgba(166,58,58,0.35)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'rgba(214,198,165,0.15)' }} />
                <span className="font-mono text-[9px] text-stone/22 ml-2 tracking-widest">ARCHIVE_SHELL — bash</span>
                <Terminal size={9} className="ml-auto" style={{ color:'rgba(214,198,165,0.15)' }} />
              </div>

              {/* Body */}
              <div ref={termBodyRef}
                className="p-4 font-mono text-xs overflow-y-auto no-scrollbar"
                style={{ minHeight:'280px', maxHeight:'280px', cursor:'text' }}
                onClick={() => inputRef.current?.focus()}>
                <p className="mb-3" style={{ color:'rgba(184,165,138,0.45)' }}>
                  Welcome to ARCHIVE_SHELL v2.1. Type &quot;help&quot; to begin.<br/>
                  <span className="text-[10px]" style={{ color:'rgba(183,176,165,0.2)' }}>Tip: try &quot;unlock&quot; or &quot;secret&quot;</span>
                </p>
                {history.map((entry, i) => (
                  <div key={`hist-${i}`} className="mb-2">
                    <div className="flex gap-2" style={{ color:'rgba(184,165,138,0.65)' }}>
                      <span style={{ color:'rgba(122,30,30,0.7)' }} className="shrink-0">$</span>
                      <span>{entry.cmd}</span>
                    </div>
                    <div className="flex gap-2 mt-0.5 pl-4" style={{ color:'rgba(183,176,165,0.5)' }}>
                      <span className="leading-relaxed">{entry.res}</span>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 items-center mt-1" style={{ color:'rgba(184,165,138,0.75)' }}>
                  <span style={{ color:'rgba(122,30,30,0.6)' }} className="shrink-0">$</span>
                  <input ref={inputRef} value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key==='Enter' && input.trim()) runCommand(input) }}
                    className="terminal-input flex-1 text-xs"
                    spellCheck={false} autoComplete="off" aria-label="Terminal command" />
                  <span className="cursor-blink" style={{ color:'rgba(214,198,165,0.6)' }}>█</span>
                </div>
              </div>
            </div>

            {/* Quick commands */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['help','whoami','skills','unlock','secret'].map(cmd => (
                <button key={cmd} onClick={() => runCommand(cmd)}
                  className="font-mono text-[9px] border px-2 py-1 rounded-sm transition-all duration-300"
                  style={{ color:'rgba(184,165,138,0.45)', borderColor:'rgba(214,198,165,0.12)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D6C6A5'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,198,165,0.35)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(184,165,138,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,198,165,0.12)' }}>
                  {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ delay:1, duration:1 }}
          className="mt-12 flex items-center gap-3">
          <Eye size={10} style={{ color:'rgba(214,198,165,0.15)' }} />
          <span className="font-mono text-[8px] text-stone/18 tracking-widest">OBSERVATION ACTIVE — EVERY INTERACTION IS LOGGED</span>
        </motion.div>
      </div>
    </section>
  )
}
