interface SectionHeaderProps {
  title: string
  icon?: React.ReactNode
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-foreground">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
