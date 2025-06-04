import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface CompanyComparisonProps {
  data: {
    companies: string[]
    score: number
    differences: Record<string, number>
    riskLevel: string
  }
}

export function CompanyComparison({ data }: CompanyComparisonProps) {
  const { companies, score, differences, riskLevel } = data
  const [company1, company2] = companies

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low Risk":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Low Risk
          </Badge>
        )
      case "Moderate Risk":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <HelpCircle className="mr-1 h-3 w-3" />
            Moderate Risk
          </Badge>
        )
      case "High Risk":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            High Risk
          </Badge>
        )
      default:
        return null
    }
  }

  const getAlignmentDescription = (diff: number) => {
    if (diff <= 0.05) return "Strong alignment"
    if (diff <= 0.2) return "Moderate difference"
    return "High divergence"
  }

  const getAlignmentColor = (diff: number) => {
    if (diff <= 0.05) return "text-green-400"
    if (diff <= 0.2) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">
            {company1} <span className="text-muted-foreground">vs</span> {company2}
          </h3>
          <p className="text-muted-foreground">Compatibility Score: {(score * 100).toFixed(0)}%</p>
        </div>
        <div>{getRiskBadge(riskLevel)}</div>
      </div>

      <Alert variant={riskLevel === "Low Risk" ? "default" : "destructive"}>
        <AlertTitle className="flex items-center">
          {riskLevel === "Low Risk" ? (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          ) : (
            <AlertCircle className="mr-2 h-4 w-4" />
          )}
          {riskLevel} Integration Profile
        </AlertTitle>
        <AlertDescription>
          {riskLevel === "Low Risk"
            ? "These companies have highly compatible cultures, suggesting a smooth integration process."
            : riskLevel === "Moderate Risk"
              ? "Some cultural differences exist that may require attention during integration."
              : "Significant cultural differences exist that could pose challenges to successful integration."}
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">Cultural Dimension Analysis</h4>
          <div className="space-y-4">
            {Object.entries(differences).map(([dimension, difference]) => (
              <div key={dimension} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium capitalize">{dimension.replace(/_/g, " ")}</span>
                  <span className={`text-sm ${getAlignmentColor(difference)}`}>
                    {getAlignmentDescription(difference)}
                  </span>
                </div>
                <Progress value={(1 - difference) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>High Difference</span>
                  <span>Low Difference</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h4 className="text-lg font-medium mb-2">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg border">
            <h5 className="font-medium mb-2">Integration Strengths</h5>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {Object.entries(differences)
                .filter(([, diff]) => (diff as number) <= 0.2)
                .slice(0, 3)
                .map(([dim]) => (
                  <li key={`strength-${dim}`}>
                    Strong alignment in <span className="font-medium capitalize">{dim.replace(/_/g, " ")}</span>
                  </li>
                ))}
              {Object.entries(differences).filter(([, diff]) => (diff as number) <= 0.2).length === 0 && (
                <li>Limited cultural alignment areas identified</li>
              )}
            </ul>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg border">
            <h5 className="font-medium mb-2">Integration Challenges</h5>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {Object.entries(differences)
                .filter(([, diff]) => (diff as number) > 0.2)
                .slice(0, 3)
                .map(([dim]) => (
                  <li key={`challenge-${dim}`}>
                    Significant differences in <span className="font-medium capitalize">{dim.replace(/_/g, " ")}</span>
                  </li>
                ))}
              {Object.entries(differences).filter(([, diff]) => (diff as number) > 0.2).length === 0 && (
                <li>No major cultural challenges identified</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-sm text-muted-foreground">
        <p>
          Analysis based on data from news articles, social media, employee reviews, and SEC filings. Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
