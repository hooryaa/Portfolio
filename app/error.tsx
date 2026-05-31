'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6"
      style={{ background:'#070707' }}>
      <div className="text-center max-w-md">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6"
          style={{ color:'rgba(166,58,58,0.6)' }}>
          ◈ SYSTEM ERROR — ARCHIVE CORRUPTED
        </p>
        <h1 className="font-serif italic text-4xl text-ivory/80 mb-4">Something went wrong.</h1>
        <p className="font-serif italic text-base mb-8" style={{ color:'rgba(183,176,165,0.5)' }}>
          An unexpected error has occurred. The investigation has been interrupted.
        </p>
        <button onClick={reset}
          className="font-mono text-[11px] tracking-[0.3em] uppercase px-8 py-3 border transition-all duration-400"
          style={{ color:'rgba(214,198,165,0.65)', borderColor:'rgba(214,198,165,0.2)' }}
          onMouseEnter={e => { (e.currentTarget).style.color = '#D6C6A5'; (e.currentTarget).style.borderColor = 'rgba(214,198,165,0.45)' }}
          onMouseLeave={e => { (e.currentTarget).style.color = 'rgba(214,198,165,0.65)'; (e.currentTarget).style.borderColor = 'rgba(214,198,165,0.2)' }}>
          RESTORE ARCHIVE
        </button>
      </div>
    </div>
  )
}
