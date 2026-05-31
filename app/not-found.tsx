import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background:'#070707' }}>
      <div className="text-center max-w-md">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6"
          style={{ color:'rgba(166,58,58,0.6)' }}>
          ◈ FILE NOT FOUND — ACCESS DENIED
        </p>
        <h1 className="font-serif italic mb-2" style={{ fontSize:'7rem', lineHeight:1, color:'rgba(214,198,165,0.08)' }}>404</h1>
        <p className="font-serif italic text-3xl text-ivory/70 mb-4 -mt-4">This file does not exist.</p>
        <p className="font-serif italic text-base mb-8" style={{ color:'rgba(183,176,165,0.45)' }}>
          The document you are looking for has been redacted, moved, or never existed.
        </p>
        <Link href="/"
          className="font-mono text-[11px] tracking-[0.3em] uppercase px-8 py-3 border transition-all duration-400 inline-block"
          style={{ color:'rgba(214,198,165,0.65)', borderColor:'rgba(214,198,165,0.2)' }}>
          RETURN TO ARCHIVE
        </Link>
      </div>
    </div>
  )
}
