import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — 70% of the site
        'obsidian':  '#070707',
        'navy':      '#0D1B2A',
        'maroon-bg': '#1A0F10',
        'charcoal':  '#151515',
        // Beige / evidence — 20%
        'beige':     '#D6C6A5',
        'sand':      '#B8A58A',
        'bone':      '#E7DDCF',
        'khaki':     '#8E7C68',
        // Red accents — 10% (sparingly)
        'blood':     '#7A1E1E',
        'maroon':    '#4A1010',
        'rust':      '#A63A3A',
        'crimson-i': '#8B2323',
        // Navy intelligence
        'intel':     '#14213D',
        'steel':     '#22304A',
        'slate':     '#3A506B',
        'bluegray':  '#5C677D',
        // Text
        'ivory':     '#D6C6A5',
        'dustgray':  '#D6C6A5',
        'stone':     '#D6C6A5',
        'terminal':  '#C6BAA8',
      },
      fontFamily: {
        sans:  ['var(--font-space-grotesk)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        mono:  ['var(--font-space-mono)', 'monospace'],
      },
      fontSize: {
        'massive': 'clamp(3.4rem, 10vw, 13rem)',
        'huge':    'clamp(2.2rem, 5.5vw, 7rem)',
        'display': 'clamp(1.6rem, 3vw, 4.6rem)',
      },
      animation: {
        'grain':      'grain 8s steps(10) infinite',
        'blink':      'blink 1.1s step-end infinite',
        'scan':       'scan 6s linear infinite',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
        'float':      'float 8s ease-in-out infinite',
        'glitch':     'glitch 6s linear infinite',
        'stamp-in':   'stamp-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        'ping-slow':  'ping 3s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        grain: {
          '0%,100%': { transform:'translate(0,0)' },
          '10%':     { transform:'translate(-5%,-10%)' },
          '20%':     { transform:'translate(-15%,5%)' },
          '30%':     { transform:'translate(7%,-25%)' },
          '40%':     { transform:'translate(-5%,25%)' },
          '50%':     { transform:'translate(-15%,10%)' },
          '60%':     { transform:'translate(15%,0%)' },
          '70%':     { transform:'translate(0%,15%)' },
          '80%':     { transform:'translate(3%,35%)' },
          '90%':     { transform:'translate(-10%,10%)' },
        },
        blink: { '0%,49%': { opacity:'1' }, '50%,100%': { opacity:'0' } },
        scan: { '0%': { top:'-5%' }, '100%': { top:'110%' } },
        'glow-pulse': {
          '0%,100%': { opacity:'0.4', filter:'blur(80px)' },
          '50%':     { opacity:'0.7', filter:'blur(110px)' },
        },
        float: {
          '0%,100%': { transform:'translateY(0)' },
          '50%':     { transform:'translateY(-14px)' },
        },
        glitch: {
          '0%':   { clipPath:'inset(40% 0 61% 0)', transform:'translate(-2px,0)' },
          '20%':  { clipPath:'inset(92% 0 1% 0)',  transform:'translate(2px,0)' },
          '40%':  { clipPath:'inset(43% 0 1% 0)',  transform:'translate(-2px,0)' },
          '60%':  { clipPath:'inset(25% 0 58% 0)', transform:'translate(2px,0)' },
          '80%':  { clipPath:'inset(54% 0 7% 0)',  transform:'translate(-2px,0)' },
          '100%': { clipPath:'inset(58% 0 43% 0)', transform:'translate(0,0)' },
        },
        'stamp-in': {
          '0%':   { transform:'rotate(-12deg) scale(3)', opacity:'0' },
          '60%':  { transform:'rotate(-12deg) scale(0.95)', opacity:'1' },
          '100%': { transform:'rotate(-12deg) scale(1)', opacity:'1' },
        },
      },
      boxShadow: {
        'glow-blood':  '0 0 40px rgba(122,30,30,0.5)',
        'glow-beige':  '0 0 40px rgba(214,198,165,0.2)',
        'glow-navy':   '0 0 40px rgba(20,33,61,0.6)',
        'evidence':    '0 0 0 1px rgba(214,198,165,0.15), 0 8px 40px rgba(0,0,0,0.7)',
        'card-hover':  '0 0 0 1px rgba(214,198,165,0.25), 0 20px 60px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
export default config
