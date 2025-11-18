"use client"

import { Mountain } from "@/types/mountain"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface MountainStatsProps {
  mountain: Mountain
}

export function MountainStats({ mountain }: MountainStatsProps) {
  const statsData = [
    {
      name: "Altitude",
      value: mountain.stats.altitude,
      max: 9000,
      unit: "m",
      color: "hsl(var(--primary))",
    },
    {
      name: "Prominence",
      value: mountain.stats.prominence,
      max: 9000,
      unit: "m",
      color: "hsl(var(--primary))",
    },
  ]

  const ratesData = [
    {
      name: "Taux de réussite",
      value: mountain.stats.successRate,
      max: 100,
      unit: "%",
      color: "#10b981",
    },
    {
      name: "Taux de mortalité",
      value: mountain.stats.deathRate,
      max: 100,
      unit: "%",
      color: "#ef4444",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm text-primary font-bold">
                          {payload[0].value.toLocaleString()}
                          {payload[0].payload.unit}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Taux de succès</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratesData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
                          {payload[0].value}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {ratesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Informations détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem
              label="Altitude"
              value={mountain.stats.altitude.toLocaleString()}
              unit="m"
            />
            <StatItem
              label="Prominence"
              value={mountain.stats.prominence.toLocaleString()}
              unit="m"
            />
            {mountain.stats.averageDuration && (
              <StatItem
                label="Durée moyenne"
                value={mountain.stats.averageDuration.toString()}
                unit="jours"
              />
            )}
            {mountain.stats.firstAscentYear && (
              <StatItem
                label="Première ascension"
                value={mountain.stats.firstAscentYear.toString()}
                unit=""
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatItem({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold text-primary">
        {value}
        <span className="text-sm ml-1">{unit}</span>
      </p>
    </div>
  )
}
