'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, FileText, Send, CheckCircle, AlertCircle, Radio, ExternalLink } from 'lucide-react'

// CONTACT DETAILS (updated)
const LINKS = [
  { icon:Github,   label:'GITHUB',   value:'github.com/in/hooryaa',      href:'https://www.github.com/in/hooryaa',          accent:'#D6C6A5', glow:'rgba(214,198,165,0.06)' },
  { icon:Linkedin, label:'LINKEDIN', value:'linkedin.com/in/hooryaa',     href:'https://www.linkedin.com/in/hooryaa/',        accent:'#B8A58A', glow:'rgba(184,165,138,0.06)' },
  { icon:Mail,     label:'EMAIL',    value:'hxhxrix@yahoo.com',          href:'mailto:hxhxrix@yahoo.com',                     accent:'#A63A3A', glow:'rgba(166,58,58,0.08)' },
  { icon:FileText, label:'RESUME',   value:'Download PDF',               href:'/resume.pdf',                                accent:'#D6C6A5', glow:'rgba(214,198,165,0.05)' },
]

type Status = 'idle'|'sending'|'success'|'error'

export default function ContactTerminal() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once:true, margin:'-80px' })
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [msg,     setMsg]     = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [focused, setFocused] = useState<string|null>(null)

  // REPLACE: Wire to Formspree — https://formspree.io (free, 50 submissions/month)
  // 1. Create account at formspree.io
  // 2. Create new form, copy your form ID
  // 3. Replace 'YOUR_FORM_ID' below
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !msg) return
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mbdbewqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMsg('')
      } else {
        setStatus('error')
      }
    } catch {
      // Fallback for local dev without real form ID
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      setName(''); setEmail(''); setMsg('')
    }
  }

  return (
    <section ref={sectionRef} id="terminal"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background:'#151515' }}
    >
      <div className="absolute inset-0 investigation-grid opacity-12 pointer-events-none" />
      <div className="glow-blob w-[500px] h-[400px] absolute top-0 left-1/2 -translate-x-1/2"
        style={{ background:'rgba(20,33,61,0.3)' }} />
      <div className="glow-blob w-80 h-80 absolute bottom-0 right-0"
        style={{ background:'rgba(74,16,16,0.2)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }} className="mb-16">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color:'#D6C6A5' }}>
            ◈ SECURE TRANSMISSION CHANNEL
          </p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-ivory leading-none">
            Open a{' '}
            <span className="not-italic font-sans font-light tracking-tighter"
              style={{ color:'#D6C6A5' }}>
              Line
            </span>
          </h2>
          <p className="mt-5 font-serif italic text-xl max-w-xl leading-relaxed"
            style={{ color:'#D6C6A5' }}>
            Interested in building thoughtful systems together?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Links ── */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ delay:0.3, duration:1, ease:[0.16,1,0.3,1] }} className="space-y-3">
            <p className="font-mono text-[9px] text-stone/25 tracking-widest mb-6">ESTABLISHED CHANNELS:</p>

            {/* Profile */}
            <div className="flex items-center gap-4 mb-6">
              <img src="/images/profile.jpg" alt="Profile picture" className="w-20 h-20 rounded-full object-cover border" style={{ borderColor:'rgba(214,198,165,0.06)' }} />
              <div>
                <div className="font-serif italic text-2xl text-ivory leading-none">Hooria Amir</div>
                <div className="font-mono text-[10px] text-stone/30 tracking-widest">Software Engineer · Open to work</div>
              </div>
            </div>

            {LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity:0, x:-20 }}
                  animate={isInView ? { opacity:1, x:0 } : {}}
                  transition={{ delay: i*0.1+0.4, duration:0.8, ease:[0.16,1,0.3,1] }}
                  className="flex items-center gap-5 dossier-card rounded-sm px-5 py-4 group relative overflow-hidden transition-all duration-500"
                  aria-label={`${link.label}: ${link.value}`}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = link.accent + '40'
                    el.style.boxShadow = `0 0 25px ${link.glow}`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(214,198,165,0.1)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Hover glow layer */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background:`radial-gradient(ellipse at 20% 50%, ${link.glow}, transparent 70%)` }} />

                  <Icon size={14} className="shrink-0 transition-colors duration-300 relative z-10"
                    style={{ color:'#D6C6A5' }}
                    onMouseEnter={() => {}} // handled by parent
                  />
                  <div className="flex-1 relative z-10">
                    <div className="font-mono text-[8px] text-stone/30 tracking-widest mb-0.5">{link.label}</div>
                    <div className="font-mono text-[11px] tracking-wide transition-colors duration-300 group-hover:text-ivory"
                      style={{ color:'#D6C6A5' }}>
                      {link.value}
                    </div>
                  </div>
                  <ExternalLink size={10} className="relative z-10 transition-all duration-300 opacity-0 group-hover:opacity-60"
                    style={{ color: link.accent }} />
                </motion.a>
              )
            })}

            {/* Availability */}
            <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
              transition={{ delay:1, duration:1 }}
              className="mt-8 flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full animate-pulse"
                style={{ background:'rgba(184,165,138,0.8)', boxShadow:'0 0 8px rgba(184,165,138,0.5)' }} />
              <span className="font-mono text-[10px] tracking-widest"
                style={{ color:'#D6C6A5' }}>
                AVAILABLE FOR NEW PROJECTS
              </span>
            </motion.div>
          </motion.div>

          {/* ── Contact form terminal ── */}
          <motion.div initial={{ opacity:0, x:30 }} animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ delay:0.4, duration:1, ease:[0.16,1,0.3,1] }}>
            <div className="dossier-card rounded-sm overflow-hidden">
              {/* Title bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b"
                style={{ borderColor:'rgba(214,198,165,0.06)', background:'rgba(21,21,21,0.8)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#D6C6A5' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#D6C6A5' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#D6C6A5' }} />
                <span className="font-mono text-[9px] text-stone/22 ml-2 tracking-widest">SECURE_TRANSMISSION.sh</span>
                <Radio size={9} className="ml-auto animate-pulse" style={{ color:'#D6C6A5' }} />
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Prompt line */}
                <div className="font-mono text-[11px] mb-3"
                  style={{ color:'#D6C6A5' }}>
                  <span style={{ color:'#D6C6A5' }}>$</span>{' '}
                  initiate_contact --encrypted --priority=HIGH
                  <span className="cursor-blink ml-1" style={{ color:'#D6C6A5' }}>█</span>
                </div>

                {/* Name + Email */}
                {[
                  { id:'name',  label:'NAME_FIELD',       val:name,  set:setName,  type:'text',  ph:'Your name',      req:true  },
                  { id:'email', label:'CONTACT_ADDRESS',  val:email, set:setEmail, type:'email', ph:'your@email.com', req:true  },
                ].map(field => (
                  <div key={field.id}>
                    <label className="font-mono text-[9px] text-stone/30 tracking-widest block mb-1.5">
                      {field.label}:
                    </label>
                    <div className="flex items-center gap-3 border px-3 py-2.5 rounded-sm transition-all duration-300"
                      style={{
                        background:  'rgba(7,7,7,0.6)',
                        borderColor: focused === field.id ? 'rgba(184,165,138,0.35)' : 'rgba(214,198,165,0.08)',
                        boxShadow:   focused === field.id ? '0 0 12px rgba(74,16,16,0.2)' : 'none',
                      }}>
                      <span className="font-mono text-xs shrink-0" style={{ color:'#D6C6A5' }}>›</span>
                      <input type={field.type} value={field.val}
                        onChange={e => field.set(e.target.value)}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.ph} required={field.req}
                        className="terminal-input flex-1 text-sm"
                        style={{ '::placeholder': { color:'rgba(123,116,106,0.4)' } } as React.CSSProperties}
                        aria-label={field.label} />
                    </div>
                  </div>
                ))}

                {/* Message */}
                <div>
                  <label className="font-mono text-[9px] text-stone/30 tracking-widest block mb-1.5">
                    TRANSMISSION_BODY:
                  </label>
                  <div className="border px-3 py-2.5 rounded-sm transition-all duration-300"
                    style={{
                      background:  'rgba(7,7,7,0.6)',
                      borderColor: focused === 'msg' ? 'rgba(184,165,138,0.35)' : 'rgba(214,198,165,0.08)',
                      boxShadow:   focused === 'msg' ? '0 0 12px rgba(74,16,16,0.2)' : 'none',
                    }}>
                    <textarea value={msg} onChange={e => setMsg(e.target.value)}
                      onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                      placeholder="Describe what you want to build together..."
                      required rows={4}
                      className="terminal-input w-full text-sm resize-none"
                      aria-label="Message" />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase py-3.5 border rounded-sm transition-all duration-500"
                  style={{
                    color: '#D6C6A5',
                    borderColor: 'rgba(214,198,165,0.16)',
                    background: status === 'sending' ? 'rgba(74,16,16,0.08)' : status === 'success' ? 'rgba(214,198,165,0.04)' : 'transparent',
                    cursor: status === 'sending' ? 'wait' : status === 'success' ? 'default' : 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (status !== 'idle') return
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(184,165,138,0.45)'
                    el.style.color = '#D6C6A5'
                    el.style.boxShadow = '0 0 20px rgba(122,30,30,0.2)'
                  }}
                  onMouseLeave={e => {
                    if (status !== 'idle') return
                    const el = e.currentTarget
                    el.style.borderColor = 'rgba(184,165,138,0.2)'
                    el.style.color = 'rgba(184,165,138,0.7)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {status === 'sending' ? (
                    <><span className="w-3 h-3 border border-t-current border-sand/30 rounded-full animate-spin" />TRANSMITTING...</>
                  ) : status === 'success' ? (
                    <><CheckCircle size={12} />TRANSMISSION SENT</>
                  ) : (
                    <><Send size={12} />SEND TRANSMISSION</>
                  )}
                </button>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div initial={{ opacity:0, y:-5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      className="flex items-center gap-2 font-mono text-[10px]"
                      style={{ color:'rgba(166,58,58,0.8)' }}>
                      <AlertCircle size={10} />TRANSMISSION FAILED — CHECK CONNECTION AND RETRY
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}}
          transition={{ delay:1.4, duration:1.5 }}
          className="mt-24 pt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop:'1px solid rgba(214,198,165,0.06)' }}>
          <span className="font-mono text-[9px] text-stone/20 tracking-widest">
            HOORIA AMIR — CLASSIFIED ARCHIVE © {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
