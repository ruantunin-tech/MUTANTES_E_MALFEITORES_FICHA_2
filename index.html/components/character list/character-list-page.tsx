"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import { CharacterCard } from "./character-card"
import { CreateCharacterModal } from "./create-character-modal"
import { CharacterListItem } from "@/lib/character-types"
import {
  getCharacterList,
  createCharacter,
  deleteCharacter,
} from "@/lib/character-storage"

interface CharacterListPageProps {
  onSelectCharacter: (id: string) => void
}

export function CharacterListPage({ onSelectCharacter }: CharacterListPageProps) {
  const [characters, setCharacters] = useState<CharacterListItem[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    setCharacters(getCharacterList())
  }, [])

  const handleCreate = (name: string, heroName: string) => {
    createCharacter(name, heroName)
    setCharacters(getCharacterList())
  }

  const handleSelectCharacter = (id: string) => {
    onSelectCharacter(id)
  }

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteCharacter(id)
      setCharacters(getCharacterList())
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="Mutantes & Malfeitores" 
              className="h-16 md:h-20 object-contain"
            />
            <p className="text-sm text-muted-foreground">
              Gerenciador de Fichas de Personagem
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{characters.length} personagem(ns)</span>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Personagem
          </Button>
        </div>

        {/* Character Grid */}
        {characters.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">
              Nenhum personagem criado
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Crie seu primeiro herói ou vilão e comece sua aventura no mundo de Mutantes & Malfeitores!
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Personagem
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={handleSelectCharacter}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {deleteConfirm && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg text-sm">
            Clique novamente para confirmar a exclusão
          </div>
        )}
      </main>

      {/* Modal */}
      <CreateCharacterModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
