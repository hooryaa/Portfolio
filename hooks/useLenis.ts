'use client'

import { useEffect, useRef } from 'react'

type LenisType = InstanceType<typeof import('lenis').default>

/**
 * Client-only Lenis smooth-scroll hook.
 * Dynamically imports Lenis and GSAP, wires ScrollTrigger update,
 * and cleans up both the RAF loop and Lenis instance safely.
 */
export function useLenis() {
  const lenisRef = useRef<LenisType | null>(null)

  useEffect(() => {
    let frameId: number | null = null
    let removeScrollListener: (() => void) | null = null

    async function init() {
      try {
        const [{ default: Lenis }, gsapMod, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])

        const { gsap } = gsapMod
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.75,
          touchMultiplier: 1.4,
        })

        lenisRef.current = lenis
        removeScrollListener = lenis.on('scroll', () => {
          ScrollTrigger.update()
        })

        const raf = (time: number) => {
          lenisRef.current?.raf(time)
          frameId = requestAnimationFrame(raf)
        }

        frameId = requestAnimationFrame(raf)
        ScrollTrigger.refresh()
      } catch (error) {
        console.warn('Lenis init failed, using native scroll', error)
      }
    }

    init()

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
      removeScrollListener?.()
      lenisRef.current?.destroy()
    }
  }, [])
}
