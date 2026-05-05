"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface AdvantageEntryProps {
  advantage: {
    id: string
    name: string
    ranks: number
    description: string
  }
  onUpdate: (advantage: AdvantageEntryProps["advantage"]) => void
  onDelete: () => void
}

export function AdvantageEntry({ advantage, onUpdate, onDelete }: AdvantageEntryProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded border border-border">
      <Input
        placeholder="Nome da Vantagem"
        value={advantage.name}
        onChange={(e) => onUpdate({ ...advantage, name: e.target.value })}
        className="flex-1 bg-input border-border text-foreground text-sm h-8"
      />
      <Input
        type="number"
        value={advantage.ranks}
        onChange={(e) => onUpdate({ ...advantage, ranks: parseInt(e.target.value) || 1 })}
        className="w-14 h-8 text-center bg-input border-border text-foreground"
        min={1}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  )
}
