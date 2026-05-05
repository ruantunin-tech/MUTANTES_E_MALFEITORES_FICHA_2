"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreateCharacterModalProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string, heroName: string) => void
}

export function CreateCharacterModal({ open, onClose, onCreate }: CreateCharacterModalProps) {
  const [name, setName] = useState("")
  const [heroName, setHeroName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!heroName.trim()) {
      setError("O codinome do herói é obrigatório")
      return
    }

    onCreate(name.trim(), heroName.trim())
    setName("")
    setHeroName("")
    onClose()
  }

  const handleClose = () => {
    setName("")
    setHeroName("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Novo Personagem</DialogTitle>
          <DialogDescription>
            Crie um novo personagem para Mutantes & Malfeitores
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroName">Codinome do Herói *</Label>
            <Input
              id="heroName"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="Ex: Sentinela, Guardião..."
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Identidade Secreta</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva..."
              className="bg-input border-border"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Personagem
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
