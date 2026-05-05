"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AttributeBoxProps {
  name: string
  abbreviation: string
  value: number
  onChange: (value: number) => void
  maxValue?: number
}

export function AttributeBox({ name, abbreviation, value, onChange, maxValue }: AttributeBoxProps) {
  const modifier = value
  const isOverLimit = maxValue !== undefined && value > maxValue

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{name}</span>
      <div className="relative">
        <div className={cn(
          "w-16 h-16 bg-secondary border-2 rounded-lg flex items-center justify-center",
          isOverLimit ? "border-destructive" : "border-primary/50"
        )}>
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className={cn(
              "w-12 h-12 text-center text-2xl font-serif font-bold bg-transparent border-none p-0",
              isOverLimit ? "text-destructive" : "text-foreground"
            )}
          />
        </div>
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded",
          isOverLimit ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
        )}>
          {abbreviation}
        </div>
      </div>
      <span className={cn(
        "text-xs mt-2",
        isOverLimit ? "text-destructive" : "text-muted-foreground"
      )}>
        {modifier >= 0 ? `+${modifier}` : modifier}
        {maxValue !== undefined && <span className="text-muted-foreground/60"> /{maxValue}</span>}
      </span>
    </div>
  )
}
