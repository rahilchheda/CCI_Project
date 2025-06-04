"use client"

import { useEffect, useState } from "react"

interface RiskLevelGaugeProps {
  score: number
  riskLevel: string
}

export function RiskLevelGauge({ score, riskLevel }: RiskLevelGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  const getColor = () => {
    if (score >= 0.85) return "#22c55e" // green-500
    if (score >= 0.65) return "#f59e0b" // amber-500
    return "#ef4444" // red-500
  }

  const getGradient = () => {
    return `conic-gradient(${getColor()} ${animatedScore * 360}deg, #1f2937 0deg)`
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <div
          className="w-full h-full rounded-full transition-all duration-1000 ease-out"
          style={{ background: getGradient() }}
        ></div>
        <div className="absolute top-2 left-2 right-2 bottom-2 bg-background rounded-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold">{Math.round(animatedScore * 100)}</div>
            <div className="text-xs text-muted-foreground">Compatibility</div>
          </div>
        </div>
      </div>
      <div
        className={`mt-4 text-lg font-medium ${
          riskLevel === "Low Risk"
            ? "text-green-500"
            : riskLevel === "Moderate Risk"
              ? "text-yellow-500"
              : "text-red-500"
        }`}
      >
        {riskLevel}
      </div>
    </div>
  )
}
