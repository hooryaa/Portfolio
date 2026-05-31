'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TerminalTextProps {
  lines: string[]
  onComplete?: () => void
  className?: string
  speed?: number      // ms per character
  lineDelay?: number  // ms between lines
}

export default function TerminalText({
  lines,
  onComplete,
  className,
  speed = 28,
  lineDelay = 400,
}: TerminalTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done || currentLine >= lines.length) {
      if (currentLine >= lines.length && !done) {
        setDone(true)
        onComplete?.()
      }
      return
    }

    if (currentChar < lines[currentLine].length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev]
          updated[currentLine] = lines[currentLine].slice(0, currentChar + 1)
          return updated
        })
        setCurrentChar((c) => c + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
        setDisplayedLines((prev) => [...prev])
      }, lineDelay)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, lines, speed, lineDelay, done, onComplete])

  return (
    <div className={cn('font-mono space-y-1', className)}>
      {displayedLines.map((line, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-violet opacity-70 shrink-0">›</span>
          <span className="text-silver">{line}</span>
        </div>
      ))}
      {/* Blinking cursor on current line */}
      {currentLine < lines.length && (
        <div className="flex items-start gap-2">
          <span className="text-violet opacity-70 shrink-0">›</span>
          <span className="text-silver">
            {displayedLines[currentLine] ?? ''}
            <span className="cursor-blink text-cyan">█</span>
          </span>
        </div>
      )}
      {done && (
        <div className="flex items-start gap-2 mt-2">
          <span className="text-cyan opacity-70 shrink-0">$</span>
          <span className="cursor-blink text-cyan">█</span>
        </div>
      )}
    </div>
  )
}
