'use client'

import { useEffect, useRef } from 'react'

/** Initializes Lenis smooth scroll and wires it to GSAP ScrollTrigger */
export function useLenis() {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void
      destroy: () => void
      on: (event: string, cb: unknown) => void
    } | null = null
    let rafId: number

    async function init() {
      // Dynamic import to avoid SSR issues
      const [{ default: Lenis }, gsapMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
      ])
      const { gsap } = gsapMod
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      })

      // Keep GSAP ScrollTrigger in sync
      lenis.on('scroll', ScrollTrigger.update)

      // GSAP ticker drives Lenis RAF
      gsap.ticker.add((time: number) => {
        lenis!.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      lenisRef.current = lenis
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return lenisRef
}
