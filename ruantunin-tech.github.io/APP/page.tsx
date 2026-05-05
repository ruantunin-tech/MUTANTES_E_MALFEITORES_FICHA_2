"use client"

import { useState } from "react"
import { CharacterListPage } from "@/components/character-list/character-list-page"
import { CharacterSheet } from "@/components/character-sheet/character-sheet"

export default function Home() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

  if (selectedCharacterId) {
    return (
      <CharacterSheet
        characterId={selectedCharacterId}
        onBack={() => setSelectedCharacterId(null)}
      />
    )
  }

  return (
    <CharacterListPage
      onSelectCharacter={setSelectedCharacterId}
    />
  )
}
