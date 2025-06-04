"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface CulturalDimensionsChartProps {
  companies: string[]
  type: "radar" | "bar"
}

export function CulturalDimensionsChart({ companies, type }: CulturalDimensionsChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (!companies || companies.length === 0) return

    const dimensions = [
      "innovation",
      "collaboration",
      "risk_tolerance",
      "customer_focus",
      "decision_making",
      "work_life_balance",
    ]

    // Format data for radar or bar chart
    const formattedData = dimensions.map((dimension) => {
      const result: any = {
        dimension: dimension.replace(/_/g, " "),
      }

      companies.forEach((company) => {
        // Generate random value between 0 and 1 for demo
        result[company] = Math.random() * 0.6 + 0.2
      })

      return result
    })

    setChartData(formattedData)
  }, [companies, type])

  if (!companies || companies.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>
  }

  // Use grey and white colors for better distinction
  const companyColors = ["#9ca3af", "#f8fafc"] // grey-400 and slate-50

  if (type === "radar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" data={chartData}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: "white", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: "white" }} />
          {companies.map((company, index) => (
            <Radar
              key={company}
              name={company}
              dataKey={company}
              stroke={companyColors[index]}
              fill={companyColors[index]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    )
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 1]} tick={{ fill: "white" }} />
          <YAxis dataKey="dimension" type="category" width={120} tick={{ fill: "white", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Legend />
          {companies.map((company, index) => (
            <Bar
              key={company}
              dataKey={company}
              name={company}
              fill={companyColors[index]}
              radius={[0, 4, 4, 0]}
              stroke={index === 1 ? "#64748b" : "none"} // Add stroke to white bars for visibility
              strokeWidth={index === 1 ? 1 : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return null
}
