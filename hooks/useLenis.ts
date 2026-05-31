'use client'

import { useEffect } from 'react'
import type { Lenis as LenisType } from 'lenis'

/**
 * Client-only Lenis smooth-scroll hook.
 * Dynamically imports Lenis and GSAP, wires ScrollTrigger update,
 * and cleans up both the RAF loop and Lenis instance safely.
 */
export function useLenis() {
  useEffect(() => {
    let lenis: LenisType | null = null
    let rafId: number | null = null
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

        lenis = new Lenis({
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.75,
          touchMultiplier: 1.4,
        })

        removeScrollListener = lenis.on('scroll', () => {
          ScrollTrigger.update()
        })

        const frame = (time: number) => {
          lenis?.raf(time)
          rafId = requestAnimationFrame(frame)
        }

        rafId = requestAnimationFrame(frame)
        ScrollTrigger.refresh()
      } catch (error) {
        console.warn('Lenis init failed, using native scroll', error)
      }
    }

    init()

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      removeScrollListener?.()
      lenis?.destroy()
    }
  }, [])
}
