'use client'
import { cn } from '@/lib/utils'
interface GlitchTextProps { text:string; className?:string; tag?:'h1'|'h2'|'h3'|'h4'|'p'|'span'|'div'; active?:boolean }
export default function GlitchText({ text, className, tag:Tag='span', active=true }: GlitchTextProps) {
  return (
    <Tag className={cn('glitch-text relative inline-block', className)} data-text={active ? text : undefined}>
      {text}
    </Tag>
  )
}
