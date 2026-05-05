export interface CharacterData {
  id: string
  name: string
  heroName: string
  createdAt: string
  updatedAt: string
  portrait: string | null
  basicInfo: {
    identity: string
    powerLevel: number
    experiencePoints: number
  }
  attributes: {
    strength: number
    stamina: number
    agility: number
    dexterity: number
    fighting: number
    intellect: number
    awareness: number
    presence: number
  }
  defenses: {
    dodge: number
    parry: number
    fortitude: number
    toughness: number
    will: number
  }
  skills: Array<{
    id: string
    name: string
    ranks: number
    attribute: string
    total: number
  }>
  powers: Array<{
    id: string
    name: string
    rank: number
    description: string
    cost: number
    extras: string
    flaws: string
  }>
  advantages: Array<{
    id: string
    name: string
    ranks: number
    description: string
  }>
  complications: string
  backstory: string
}

export interface CharacterListItem {
  id: string
  name: string
  heroName: string
  powerLevel: number
  portrait: string | null
  updatedAt: string
}
