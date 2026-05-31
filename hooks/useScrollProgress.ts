'use client'

import { useEffect, useRef, useState } from 'react'

/** Returns scroll progress (0–1) for a given element ref */
export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress(entry.intersectionRatio)
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, progress }
}
