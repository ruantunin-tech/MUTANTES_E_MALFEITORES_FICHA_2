"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Trash2 } from "lucide-react"
import { CharacterListItem } from "@/lib/character-types"

interface CharacterCardProps {
  character: CharacterListItem
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function CharacterCard({ character, onSelect, onDelete }: CharacterCardProps) {
  const formattedDate = new Date(character.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Portrait */}
          <div className="w-20 h-20 rounded-lg bg-secondary border border-border overflow-hidden flex-shrink-0">
            {character.portrait ? (
              <img
                src={character.portrait}
                alt={character.heroName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-lg text-foreground truncate">
                {character.heroName || "Sem codinome"}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {character.name || "Identidade desconhecida"}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">
                NP {character.powerLevel}
              </span>
              <span>Atualizado: {formattedDate}</span>
            </div>

            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={() => onSelect(character.id)}
                className="flex-1"
              >
                Acessar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(character.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
