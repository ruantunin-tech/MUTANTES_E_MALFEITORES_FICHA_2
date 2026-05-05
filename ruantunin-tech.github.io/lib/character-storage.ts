import { CharacterData, CharacterListItem } from "./character-types"

const CHARACTERS_KEY = "mm_characters"

export function getCharacterList(): CharacterListItem[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(CHARACTERS_KEY)
  if (!data) return []
  
  try {
    const characters: CharacterData[] = JSON.parse(data)
    return characters.map(c => ({
      id: c.id,
      name: c.name,
      heroName: c.heroName,
      powerLevel: c.basicInfo.powerLevel,
      portrait: c.portrait,
      updatedAt: c.updatedAt,
    }))
  } catch {
    return []
  }
}

export function getCharacter(id: string): CharacterData | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(CHARACTERS_KEY)
  if (!data) return null
  
  try {
    const characters: CharacterData[] = JSON.parse(data)
    return characters.find(c => c.id === id) || null
  } catch {
    return null
  }
}

export function createCharacter(name: string, heroName: string): CharacterData {
  const now = new Date().toISOString()
  const newCharacter: CharacterData = {
    id: crypto.randomUUID(),
    name,
    heroName,
    createdAt: now,
    updatedAt: now,
    portrait: null,
    basicInfo: {
      identity: "",
      powerLevel: 10,
      experiencePoints: 0,
    },
    attributes: {
      strength: 0,
      stamina: 0,
      agility: 0,
      dexterity: 0,
      fighting: 0,
      intellect: 0,
      awareness: 0,
      presence: 0,
    },
    defenses: {
      dodge: 0,
      parry: 0,
      fortitude: 0,
      toughness: 0,
      will: 0,
    },
    skills: [
      { id: "acrobatics", name: "Acrobacia", ranks: 0, attribute: "AGI", total: 0 },
      { id: "athletics", name: "Atletismo", ranks: 0, attribute: "FOR", total: 0 },
      { id: "stealth", name: "Furtividade", ranks: 0, attribute: "AGI", total: 0 },
      { id: "intimidation", name: "Intimidação", ranks: 0, attribute: "PRE", total: 0 },
      { id: "investigation", name: "Investigação", ranks: 0, attribute: "INT", total: 0 },
      { id: "insight", name: "Intuição", ranks: 0, attribute: "PRO", total: 0 },
      { id: "deception", name: "Enganação", ranks: 0, attribute: "PRE", total: 0 },
      { id: "perception", name: "Percepção", ranks: 0, attribute: "PRO", total: 0 },
      { id: "persuasion", name: "Persuasão", ranks: 0, attribute: "PRE", total: 0 },
      { id: "sleightOfHand", name: "Prestidigitação", ranks: 0, attribute: "DES", total: 0 },
      { id: "technology", name: "Tecnologia", ranks: 0, attribute: "INT", total: 0 },
      { id: "treatment", name: "Tratamento", ranks: 0, attribute: "INT", total: 0 },
      { id: "vehicles", name: "Veículos", ranks: 0, attribute: "DES", total: 0 },
      { id: "expertise", name: "Especialidade", ranks: 0, attribute: "INT", total: 0 },
    ],
    powers: [],
    advantages: [],
    complications: "",
    backstory: "",
  }

  const data = localStorage.getItem(CHARACTERS_KEY)
  const characters: CharacterData[] = data ? JSON.parse(data) : []
  characters.push(newCharacter)
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters))
  
  return newCharacter
}

export function saveCharacter(character: CharacterData): void {
  if (typeof window === "undefined") return
  
  const data = localStorage.getItem(CHARACTERS_KEY)
  const characters: CharacterData[] = data ? JSON.parse(data) : []
  const index = characters.findIndex(c => c.id === character.id)
  
  character.updatedAt = new Date().toISOString()
  
  if (index >= 0) {
    characters[index] = character
  } else {
    characters.push(character)
  }
  
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters))
}

export function deleteCharacter(id: string): void {
  if (typeof window === "undefined") return
  
  const data = localStorage.getItem(CHARACTERS_KEY)
  if (!data) return
  
  const characters: CharacterData[] = JSON.parse(data)
  const filtered = characters.filter(c => c.id !== id)
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(filtered))
}
