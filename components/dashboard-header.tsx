import { Sparkles } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center">
          <Sparkles className="h-8 w-8 mr-2 text-primary animate-pulse-slow" />
          <h1 className="text-3xl font-bold tracking-tight glow-text">CIRA</h1>
          <span className="text-xl font-medium text-muted-foreground ml-2">- Cultural Integration Risk Assessment</span>
        </div>
        <p className="text-muted-foreground mt-1 text-lg font-medium text-primary/80">
          Bridging Cultures, Empowering M&A Decisions
        </p>
        <p className="text-muted-foreground text-sm">
          Analyze and visualize corporate cultural compatibility for merger and acquisition risk assessment
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  )
}
