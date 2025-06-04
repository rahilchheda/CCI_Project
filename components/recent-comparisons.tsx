"use client"

import { formatDistanceToNow } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RecentComparisonsProps {
  comparisons: any[]
  onSelect: (comparison: any) => void
}

export function RecentComparisons({ comparisons, onSelect }: RecentComparisonsProps) {
  if (!comparisons.length) {
    return <div className="text-center py-6 text-muted-foreground">No recent comparisons</div>
  }

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low Risk":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Moderate Risk":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "High Risk":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-3">
      {comparisons.map((comparison) => (
        <div
          key={comparison.id}
          className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
        >
          <div>
            <div className="font-medium">
              {comparison.companies[0]} vs {comparison.companies[1]}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className={getRiskBadgeColor(comparison.riskLevel)}>
                {comparison.riskLevel}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {comparison.timestamp
                  ? formatDistanceToNow(new Date(comparison.timestamp), { addSuffix: true })
                  : "Recently"}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onSelect(comparison)}>
            View
          </Button>
        </div>
      ))}
    </div>
  )
}
