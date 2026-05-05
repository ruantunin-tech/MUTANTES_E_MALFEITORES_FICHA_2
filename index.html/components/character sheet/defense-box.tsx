"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DefenseBoxProps {
  name: string
  value: number
  onChange: (value: number) => void
  baseValue?: number
  isOverLimit?: boolean
}

export function DefenseBox({ name, value, onChange, baseValue = 0, isOverLimit = false }: DefenseBoxProps) {
  const totalValue = value + baseValue
  
  return (
    <div className={cn(
      "flex items-center justify-between gap-4 p-3 rounded-lg border",
      isOverLimit ? "bg-destructive/10 border-destructive" : "bg-secondary/50 border-border"
    )}>
      <div className="flex flex-col">
        <span className={cn(
          "text-sm font-medium",
          isOverLimit ? "text-destructive" : "text-foreground"
        )}>{name}</span>
        {baseValue !== 0 && (
          <span className="text-xs text-muted-foreground">Base: {baseValue >= 0 ? `+${baseValue}` : baseValue}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className={cn(
            "w-16 h-8 text-center text-lg font-bold bg-input border-border",
            isOverLimit ? "text-destructive" : "text-foreground"
          )}
        />
        <div className={cn(
          "w-12 h-8 flex items-center justify-center rounded text-sm font-bold",
          isOverLimit ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
        )}>
          {totalValue >= 0 ? `+${totalValue}` : totalValue}
        </div>
      </div>
    </div>
  )
}
