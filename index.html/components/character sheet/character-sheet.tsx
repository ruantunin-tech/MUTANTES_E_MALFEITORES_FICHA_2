"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Zap, 
  BookOpen, 
  Star, 
  User, 
  Plus,
  Swords,
  Heart,
  Target,
  Brain,
  ArrowLeft,
  Save
} from "lucide-react"

import { AttributeBox } from "./attribute-box"
import { DefenseBox } from "./defense-box"
import { PowerEntry } from "./power-entry"
import { SkillEntry } from "./skill-entry"
import { AdvantageEntry } from "./advantage-entry"
import { SectionHeader } from "./section-header"
import { CharacterPortrait } from "./character-portrait"
import { CharacterData } from "@/lib/character-types"
import { getCharacter, saveCharacter } from "@/lib/character-storage"

const DEFAULT_SKILLS = [
  { id: "acrobatics", name: "Acrobacia", ranks: 0, attribute: "AGI", total: 0 },
  { id: "athletics", name: "Atletismo", ranks: 0, attribute: "FOR", total: 0 },
  { id: "deception", name: "Enganação", ranks: 0, attribute: "PRE", total: 0 },
  { id: "expertise", name: "Especialidade", ranks: 0, attribute: "INT", total: 0 },
  { id: "insight", name: "Intuição", ranks: 0, attribute: "PRE", total: 0 },
  { id: "intimidation", name: "Intimidação", ranks: 0, attribute: "PRE", total: 0 },
  { id: "investigation", name: "Investigação", ranks: 0, attribute: "INT", total: 0 },
  { id: "perception", name: "Percepção", ranks: 0, attribute: "PRE", total: 0 },
  { id: "persuasion", name: "Persuasão", ranks: 0, attribute: "PRE", total: 0 },
  { id: "sleight", name: "Prestidigitação", ranks: 0, attribute: "AGI", total: 0 },
  { id: "stealth", name: "Furtividade", ranks: 0, attribute: "AGI", total: 0 },
  { id: "technology", name: "Tecnologia", ranks: 0, attribute: "INT", total: 0 },
  { id: "treatment", name: "Tratamento", ranks: 0, attribute: "INT", total: 0 },
  { id: "vehicles", name: "Veículos", ranks: 0, attribute: "AGI", total: 0 },
]

interface CharacterSheetProps {
  characterId: string
  onBack: () => void
}

export function CharacterSheet({ characterId, onBack }: CharacterSheetProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  const [portrait, setPortrait] = useState<string | null>(null)
  
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    heroName: "",
    identity: "",
    powerLevel: 10,
    experiencePoints: 0,
  })

  // Limites baseados no Nível de Poder
  const powerLevel = basicInfo.powerLevel
  const basePoints = powerLevel * 15
  const maxAttribute = powerLevel
  const maxSkillRanks = powerLevel + 10
  const maxDefenseTotal = powerLevel * 2

  const [attributes, setAttributes] = useState({
    strength: 0,
    stamina: 0,
    agility: 0,
    dexterity: 0,
    fighting: 0,
    intellect: 0,
    awareness: 0,
    presence: 0,
  })

  const [defenses, setDefenses] = useState({
    dodge: 0,
    parry: 0,
    fortitude: 0,
    toughness: 0,
    will: 0,
  })

  const [skills, setSkills] = useState(DEFAULT_SKILLS)

  const [powers, setPowers] = useState<Array<{
    id: string
    name: string
    rank: number
    description: string
    cost: number
  }>>([])

  const [advantages, setAdvantages] = useState<Array<{
    id: string
    name: string
    ranks: number
    description: string
  }>>([])

  const [complications, setComplications] = useState("")
  const [background, setBackground] = useState("")

  // Load character data
  useEffect(() => {
    const character = getCharacter(characterId)
    if (character) {
      setPortrait(character.portrait)
      setBasicInfo({
        name: character.name,
        heroName: character.heroName,
        identity: character.basicInfo.identity,
        powerLevel: character.basicInfo.powerLevel,
        experiencePoints: character.basicInfo.experiencePoints,
      })
      setAttributes(character.attributes)
      setDefenses(character.defenses)
      setSkills(character.skills)
      setPowers(character.powers.map(p => ({
        id: p.id,
        name: p.name,
        rank: p.rank,
        description: p.description,
        cost: p.cost,
      })))
      setAdvantages(character.advantages)
      setComplications(character.complications)
      setBackground(character.backstory)
    }
    setIsLoaded(true)
  }, [characterId])

  // Auto-save function
  const handleSave = useCallback(() => {
    if (!isLoaded) return
    
    const character = getCharacter(characterId)
    if (!character) return

    setIsSaving(true)
    
    const updatedCharacter: CharacterData = {
      ...character,
      name: basicInfo.name,
      heroName: basicInfo.heroName,
      portrait,
      basicInfo: {
        identity: basicInfo.identity,
        powerLevel: basicInfo.powerLevel,
        experiencePoints: basicInfo.experiencePoints,
      },
      attributes,
      defenses,
      skills,
      powers: powers.map(p => ({
        ...p,
        extras: "",
        flaws: "",
      })),
      advantages,
      complications,
      backstory: background,
    }

    saveCharacter(updatedCharacter)
    setLastSaved(new Date())
    setIsSaving(false)
  }, [characterId, basicInfo, portrait, attributes, defenses, skills, powers, advantages, complications, background, isLoaded])

  // Auto-save on changes (debounced)
  useEffect(() => {
    if (!isLoaded) return
    const timer = setTimeout(handleSave, 1000)
    return () => clearTimeout(timer)
  }, [handleSave, isLoaded])

  const addPower = () => {
    setPowers([...powers, {
      id: crypto.randomUUID(),
      name: "",
      rank: 1,
      description: "",
      cost: 0,
    }])
  }

  const addAdvantage = () => {
    setAdvantages([...advantages, {
      id: crypto.randomUUID(),
      name: "",
      ranks: 1,
      description: "",
    }])
  }

  const totalAttributeCost = Object.values(attributes).reduce((sum, val) => sum + val * 2, 0)
  const totalDefenseCost = Object.values(defenses).reduce((sum, val) => sum + val, 0)
  const totalSkillCost = Math.floor(skills.reduce((sum, s) => sum + s.ranks, 0) / 2)
  const totalPowerCost = powers.reduce((sum, p) => sum + p.cost, 0)
  const totalAdvantageCost = advantages.reduce((sum, a) => sum + a.ranks, 0)
  const totalCost = totalAttributeCost + totalDefenseCost + totalSkillCost + totalPowerCost + totalAdvantageCost

  // Verificação dos limites de defesas (regra do M&M: pares devem somar no máximo NP × 2)
  const dodgeToughness = defenses.dodge + attributes.agility + defenses.toughness + attributes.stamina
  const parryToughness = defenses.parry + attributes.fighting + defenses.toughness + attributes.stamina
  const fortitudeWill = defenses.fortitude + attributes.stamina + defenses.will + attributes.awareness
  
  const isDodgeToughnessOverLimit = dodgeToughness > maxDefenseTotal
  const isParryToughnessOverLimit = parryToughness > maxDefenseTotal
  const isFortitudeWillOverLimit = fortitudeWill > maxDefenseTotal

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando personagem...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4 animate-pulse" />
                Salvando...
              </span>
            ) : lastSaved ? (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvo {lastSaved.toLocaleTimeString("pt-BR")}
              </span>
            ) : null}
          </div>
        </div>
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-wider text-foreground">
            Mutantes & Malfeitores
          </h1>
          <p className="text-muted-foreground">Ficha de Personagem</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Portrait & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4 space-y-4">
                <CharacterPortrait image={portrait} onImageChange={setPortrait} />
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Nome do Herói</label>
                    <Input
                      value={basicInfo.heroName}
                      onChange={(e) => setBasicInfo({ ...basicInfo, heroName: e.target.value })}
                      placeholder="Codinome"
                      className="text-lg font-serif font-bold bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Identidade Secreta</label>
                    <Input
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                      placeholder="Nome real"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Nível de Poder</label>
                      <Input
                        type="number"
                        value={basicInfo.powerLevel}
                        onChange={(e) => setBasicInfo({ ...basicInfo, powerLevel: parseInt(e.target.value) || 0 })}
                        className="text-center font-bold bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">XP</label>
                      <Input
                        type="number"
                        value={basicInfo.experiencePoints}
                        onChange={(e) => setBasicInfo({ ...basicInfo, experiencePoints: parseInt(e.target.value) || 0 })}
                        className="text-center bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Point Summary */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <SectionHeader title="Pontos" icon={<Star className="w-4 h-4" />} />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atributos</span>
                    <span className="font-mono text-foreground">{totalAttributeCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Defesas</span>
                    <span className="font-mono text-foreground">{totalDefenseCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Perícias</span>
                    <span className="font-mono text-foreground">{totalSkillCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Poderes</span>
                    <span className="font-mono text-foreground">{totalPowerCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vantagens</span>
                    <span className="font-mono text-foreground">{totalAdvantageCost}</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className={`font-mono ${totalCost > basePoints + basicInfo.experiencePoints ? "text-destructive" : "text-primary"}`}>
                      {totalCost} / {basePoints + basicInfo.experiencePoints}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limits Summary */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <SectionHeader title="Limites (NP {powerLevel})" icon={<Shield className="w-4 h-4" />} />
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atributos</span>
                    <span className="font-mono text-foreground">{maxAttribute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Perícias</span>
                    <span className="font-mono text-foreground">{maxSkillRanks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Def. Pares</span>
                    <span className="font-mono text-foreground">{maxDefenseTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pontos Base</span>
                    <span className="font-mono text-foreground">{basePoints}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="attributes" className="space-y-4">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 bg-secondary h-auto p-1">
                <TabsTrigger value="attributes" className="gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <User className="w-4 h-4" />
                  <span>Atributos</span>
                </TabsTrigger>
                <TabsTrigger value="combat" className="gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Swords className="w-4 h-4" />
                  <span>Combate</span>
                </TabsTrigger>
                <TabsTrigger value="powers" className="gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Zap className="w-4 h-4" />
                  <span>Poderes</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>Perícias</span>
                </TabsTrigger>
                <TabsTrigger value="background" className="gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Brain className="w-4 h-4" />
                  <span>História</span>
                </TabsTrigger>
              </TabsList>

              {/* Attributes Tab */}
              <TabsContent value="attributes">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <SectionHeader title="Atributos" icon={<User className="w-4 h-4" />} />
                    <p className="text-xs text-muted-foreground mb-4">
                      Limite por atributo: {maxAttribute} (NP {powerLevel})
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                      <AttributeBox
                        name="Força"
                        abbreviation="FOR"
                        value={attributes.strength}
                        onChange={(v) => setAttributes({ ...attributes, strength: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Vigor"
                        abbreviation="VIG"
                        value={attributes.stamina}
                        onChange={(v) => setAttributes({ ...attributes, stamina: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Agilidade"
                        abbreviation="AGI"
                        value={attributes.agility}
                        onChange={(v) => setAttributes({ ...attributes, agility: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Destreza"
                        abbreviation="DES"
                        value={attributes.dexterity}
                        onChange={(v) => setAttributes({ ...attributes, dexterity: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Luta"
                        abbreviation="LUT"
                        value={attributes.fighting}
                        onChange={(v) => setAttributes({ ...attributes, fighting: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Intelecto"
                        abbreviation="INT"
                        value={attributes.intellect}
                        onChange={(v) => setAttributes({ ...attributes, intellect: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Prontidão"
                        abbreviation="PRO"
                        value={attributes.awareness}
                        onChange={(v) => setAttributes({ ...attributes, awareness: v })}
                        maxValue={maxAttribute}
                      />
                      <AttributeBox
                        name="Presença"
                        abbreviation="PRE"
                        value={attributes.presence}
                        onChange={(v) => setAttributes({ ...attributes, presence: v })}
                        maxValue={maxAttribute}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Combat Tab */}
              <TabsContent value="combat">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <SectionHeader title="Defesas" icon={<Shield className="w-4 h-4" />} />
                      <p className="text-xs text-muted-foreground mb-3">
                        Limite: Esquiva + Resistência e Fortitude + Vontade devem somar no máximo {maxDefenseTotal} (NP x 2)
                      </p>
                      <div className="space-y-3">
                        <DefenseBox
                          name="Esquiva"
                          value={defenses.dodge}
                          onChange={(v) => setDefenses({ ...defenses, dodge: v })}
                          baseValue={attributes.agility}
                          isOverLimit={isDodgeToughnessOverLimit}
                        />
                        <DefenseBox
                          name="Aparar"
                          value={defenses.parry}
                          onChange={(v) => setDefenses({ ...defenses, parry: v })}
                          baseValue={attributes.fighting}
                          isOverLimit={isParryToughnessOverLimit}
                        />
                        <DefenseBox
                          name="Fortitude"
                          value={defenses.fortitude}
                          onChange={(v) => setDefenses({ ...defenses, fortitude: v })}
                          baseValue={attributes.stamina}
                          isOverLimit={isFortitudeWillOverLimit}
                        />
                        <DefenseBox
                          name="Resistência"
                          value={defenses.toughness}
                          onChange={(v) => setDefenses({ ...defenses, toughness: v })}
                          baseValue={attributes.stamina}
                          isOverLimit={isDodgeToughnessOverLimit || isParryToughnessOverLimit}
                        />
                        <DefenseBox
                          name="Vontade"
                          value={defenses.will}
                          onChange={(v) => setDefenses({ ...defenses, will: v })}
                          baseValue={attributes.awareness}
                          isOverLimit={isFortitudeWillOverLimit}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <SectionHeader title="Vantagens" icon={<Star className="w-4 h-4" />} />
                      <div className="space-y-2 mb-4">
                        {advantages.map((advantage) => (
                          <AdvantageEntry
                            key={advantage.id}
                            advantage={advantage}
                            onUpdate={(updated) => setAdvantages(advantages.map(a => a.id === updated.id ? updated : a))}
                            onDelete={() => setAdvantages(advantages.filter(a => a.id !== advantage.id))}
                          />
                        ))}
                      </div>
                      <Button onClick={addAdvantage} variant="outline" size="sm" className="w-full border-dashed">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Vantagem
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Condition Track */}
                <Card className="bg-card border-border mt-6">
                  <CardContent className="p-6">
                    <SectionHeader title="Condições" icon={<Heart className="w-4 h-4" />} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Normal", "Machucado", "Atordoado", "Incapacitado"].map((condition) => (
                        <div 
                          key={condition}
                          className="p-3 bg-secondary/50 rounded-lg border border-border text-center"
                        >
                          <span className="text-sm font-medium text-foreground">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Powers Tab */}
              <TabsContent value="powers">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <SectionHeader title="Poderes" icon={<Zap className="w-4 h-4" />} />
                    <div className="space-y-3 mb-4">
                      {powers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Nenhum poder adicionado</p>
                        </div>
                      ) : (
                        powers.map((power) => (
                          <PowerEntry
                            key={power.id}
                            power={power}
                            onUpdate={(updated) => setPowers(powers.map(p => p.id === updated.id ? updated : p))}
                            onDelete={() => setPowers(powers.filter(p => p.id !== power.id))}
                          />
                        ))
                      )}
                    </div>
                    <Button onClick={addPower} variant="outline" size="sm" className="w-full border-dashed">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Poder
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <SectionHeader title="Perícias" icon={<Target className="w-4 h-4" />} />
                    <p className="text-xs text-muted-foreground mb-3">
                      Limite por perícia: {maxSkillRanks} ranks (NP + 10)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {skills.map((skill) => {
                        const attrMap: Record<string, number> = {
                          "FOR": attributes.strength,
                          "VIG": attributes.stamina,
                          "AGI": attributes.agility,
                          "DES": attributes.dexterity,
                          "LUT": attributes.fighting,
                          "INT": attributes.intellect,
                          "PRO": attributes.awareness,
                          "PRE": attributes.presence,
                        }
                        return (
                          <SkillEntry
                            key={skill.id}
                            skill={skill}
                            onUpdate={(updated) => setSkills(skills.map(s => s.id === updated.id ? updated : s))}
                            maxRanks={maxSkillRanks}
                            attributeBonus={attrMap[skill.attribute] || 0}
                          />
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Background Tab */}
              <TabsContent value="background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <SectionHeader title="História" icon={<BookOpen className="w-4 h-4" />} />
                      <Textarea
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        placeholder="Escreva a história do seu personagem..."
                        className="min-h-[200px] bg-input border-border text-foreground resize-none"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <SectionHeader title="Complicações" icon={<Heart className="w-4 h-4" />} />
                      <Textarea
                        value={complications}
                        onChange={(e) => setComplications(e.target.value)}
                        placeholder="Liste as complicações do personagem (Motivação, Identidade Secreta, Inimigos, etc.)..."
                        className="min-h-[200px] bg-input border-border text-foreground resize-none"
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
