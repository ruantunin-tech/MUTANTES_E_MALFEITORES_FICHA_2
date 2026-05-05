"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SkillEntryProps {
  skill: {
    id: string
    name: string
    ranks: number
    attribute: string
    total: number
  }
  onUpdate: (skill: SkillEntryProps["skill"]) => void
  maxRanks?: number
  attributeBonus?: number
}

export function SkillEntry({ skill, onUpdate, maxRanks, attributeBonus = 0 }: SkillEntryProps) {
  const isOverLimit = maxRanks !== undefined && skill.ranks > maxRanks
  const totalBonus = skill.ranks + attributeBonus

  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded border",
      isOverLimit ? "bg-destructive/10 border-destructive" : "bg-secondary/30 border-border"
    )}>
      <span className={cn(
        "flex-1 text-sm",
        isOverLimit ? "text-destructive" : "text-foreground"
      )}>{skill.name}</span>
      <span className="text-xs text-muted-foreground w-12 text-center">{skill.attribute}</span>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          value={skill.ranks}
          onChange={(e) => onUpdate({ ...skill, ranks: parseInt(e.target.value) || 0, total: parseInt(e.target.value) || 0 })}
          className={cn(
            "w-12 h-7 text-center text-sm bg-input border-border",
            isOverLimit ? "text-destructive" : "text-foreground"
          )}
          placeholder="R"
        />
        {maxRanks !== undefined && (
          <span className="text-xs text-muted-foreground/60">/{maxRanks}</span>
        )}
      </div>
      <div className={cn(
        "w-12 h-7 flex items-center justify-center rounded text-sm font-bold",
        isOverLimit ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
      )}>
        {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
      </div>
    </div>
  )
}
