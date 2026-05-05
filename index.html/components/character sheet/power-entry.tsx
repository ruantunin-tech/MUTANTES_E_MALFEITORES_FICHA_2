"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface PowerEntryProps {
  power: {
    id: string
    name: string
    rank: number
    description: string
    cost: number
  }
  onUpdate: (power: PowerEntryProps["power"]) => void
  onDelete: () => void
}

export function PowerEntry({ power, onUpdate, onDelete }: PowerEntryProps) {
  return (
    <div className="p-3 bg-secondary/30 rounded-lg border border-border space-y-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Nome do Poder"
          value={power.name}
          onChange={(e) => onUpdate({ ...power, name: e.target.value })}
          className="flex-1 bg-input border-border text-foreground"
        />
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Rank:</span>
          <Input
            type="number"
            value={power.rank}
            onChange={(e) => onUpdate({ ...power, rank: parseInt(e.target.value) || 0 })}
            className="w-14 h-8 text-center bg-input border-border text-foreground"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Custo:</span>
          <Input
            type="number"
            value={power.cost}
            onChange={(e) => onUpdate({ ...power, cost: parseInt(e.target.value) || 0 })}
            className="w-14 h-8 text-center bg-input border-border text-foreground"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <Input
        placeholder="Descrição do poder..."
        value={power.description}
        onChange={(e) => onUpdate({ ...power, description: e.target.value })}
        className="bg-input border-border text-foreground text-sm"
      />
    </div>
  )
}
