"use client"

import { useRef, useState } from "react"
import { Upload, User } from "lucide-react"

interface CharacterPortraitProps {
  image: string | null
  onImageChange: (image: string | null) => void
}

export function CharacterPortrait({ image, onImageChange }: CharacterPortraitProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onImageChange(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={`relative w-full aspect-[3/4] bg-secondary rounded-lg border-2 border-dashed overflow-hidden cursor-pointer transition-all ${
        isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
      }`}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        className="hidden"
      />
      
      {image ? (
        <img
          src={image}
          alt="Retrato do personagem"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <User className="w-16 h-16" />
          <div className="flex items-center gap-1 text-sm">
            <Upload className="w-4 h-4" />
            <span>Carregar Imagem</span>
          </div>
        </div>
      )}

      {image && (
        <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-1 text-foreground">
            <Upload className="w-4 h-4" />
            <span>Alterar Imagem</span>
          </div>
        </div>
      )}
    </div>
  )
}
