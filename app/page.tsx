"use client"

import { useEffect, useState } from "react"
import { ArrowRight, BarChart3, ChevronDown, Compass, LineChart, Settings, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyComparison } from "@/components/company-comparison"
import { CompanySelector } from "@/components/company-selector"
import { CulturalDimensionsChart } from "@/components/cultural-dimensions-chart"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentComparisons } from "@/components/recent-comparisons"
import { RiskLevelGauge } from "@/components/risk-level-gauge"
import { companyData } from "@/lib/data"

export default function Home() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [comparisonData, setComparisonData] = useState<any>(null)
  const [recentComparisons, setRecentComparisons] = useState<any[]>([])

  const handleCompanySelect = (company: string) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== company))
    } else if (selectedCompanies.length < 2) {
      setSelectedCompanies([...selectedCompanies, company])
    }
  }

  const handleCompare = () => {
    if (selectedCompanies.length !== 2) return

    const [company1, company2] = selectedCompanies
    const data1 = companyData[company1]
    const data2 = companyData[company2]

    // Calculate compatibility score (simplified for demo)
    const score = Math.random() * 0.4 + 0.6 // Random score between 0.6 and 1.0
    const roundedScore = Math.round(score * 100) / 100

    // Generate differences for each dimension
    const dimensions = [
      "innovation",
      "collaboration",
      "risk_tolerance",
      "customer_focus",
      "decision_making",
      "work_life_balance",
    ]

    const differences = dimensions.reduce((acc, dim) => {
      const diff = Math.random() * 0.5 // Random difference between 0 and 0.5
      const roundedDiff = Math.round(diff * 100) / 100
      return { ...acc, [dim]: roundedDiff }
    }, {})

    const riskLevel = roundedScore >= 0.85 ? "Low Risk" : roundedScore >= 0.65 ? "Moderate Risk" : "High Risk"

    const newComparison = {
      id: Date.now(),
      companies: [company1, company2],
      score: roundedScore,
      differences,
      riskLevel,
      timestamp: new Date().toISOString(),
    }

    setComparisonData(newComparison)
    setRecentComparisons([newComparison, ...recentComparisons.slice(0, 4)])
  }

  const clearSelection = () => {
    setSelectedCompanies([])
    setComparisonData(null)
  }

  useEffect(() => {
    // Initialize with some sample comparisons
    const sampleComparisons = [
      {
        id: 1,
        companies: ["Google", "Microsoft"],
        score: 0.78,
        riskLevel: "Moderate Risk",
        timestamp: "2023-05-15T10:30:00Z",
      },
      {
        id: 2,
        companies: ["Apple", "Meta"],
        score: 0.62,
        riskLevel: "High Risk",
        timestamp: "2023-05-14T14:45:00Z",
      },
      {
        id: 3,
        companies: ["Amazon", "Walmart"],
        score: 0.71,
        riskLevel: "Moderate Risk",
        timestamp: "2023-05-13T09:15:00Z",
      },
    ]
    setRecentComparisons(sampleComparisons)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 grid-pattern">
      <div className="container mx-auto py-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="md:col-span-2 glassmorphism shine">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Compass className="mr-2 h-5 w-5 text-primary" />
                CIRA - Cultural Integration Risk Assessment
              </CardTitle>
              <CardDescription>
                Bridging Cultures, Empowering M&A Decisions - Analyze cultural compatibility and assess integration
                risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <CompanySelector
                      selectedCompanies={selectedCompanies}
                      onSelect={handleCompanySelect}
                      companies={Object.keys(companyData)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button
                      onClick={handleCompare}
                      disabled={selectedCompanies.length !== 2}
                      className="flex-1 md:flex-none"
                      size="lg"
                    >
                      Compare
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {selectedCompanies.length > 0 && (
                      <Button variant="outline" onClick={clearSelection} size="lg">
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {comparisonData && (
                  <div className="mt-6">
                    <CompanyComparison data={comparisonData} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glassmorphism shine">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comparisonData ? (
                  <div className="space-y-4">
                    <RiskLevelGauge score={comparisonData.score} riskLevel={comparisonData.riskLevel} />
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Differences</h4>
                      <ul className="space-y-2 text-sm">
                        {Object.entries(comparisonData.differences)
                          .sort(([, a], [, b]) => (b as number) - (a as number))
                          .slice(0, 3)
                          .map(([dimension, difference]) => (
                            <li key={dimension} className="flex justify-between">
                              <span className="capitalize">{dimension.replace(/_/g, " ")}</span>
                              <span
                                className={
                                  (difference as number) <= 0.1
                                    ? "text-green-400"
                                    : (difference as number) <= 0.3
                                      ? "text-yellow-400"
                                      : "text-red-400"
                                }
                              >
                                {(difference as number).toFixed(2)}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Select two companies and click Compare to see insights</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glassmorphism shine">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Recent Comparisons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecentComparisons comparisons={recentComparisons} onSelect={setComparisonData} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <Card className="glassmorphism shine">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <LineChart className="mr-2 h-5 w-5 text-primary" />
                  Cultural Dimensions Analysis
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      Options
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Show All Dimensions</DropdownMenuItem>
                    <DropdownMenuItem>Normalize Values</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="radar">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="radar">Radar Chart</TabsTrigger>
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                </TabsList>
                <div className="mt-4 h-[400px]">
                  <TabsContent value="radar" className="h-full">
                    {comparisonData ? (
                      <CulturalDimensionsChart companies={comparisonData.companies} type="radar" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Select two companies to view radar chart</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="bar" className="h-full">
                    {comparisonData ? (
                      <CulturalDimensionsChart companies={comparisonData.companies} type="bar" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Select two companies to view bar chart</p>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
              <p>Data based on analysis of news articles, social media, employee reviews, and SEC filings.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
