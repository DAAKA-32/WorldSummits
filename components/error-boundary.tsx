"use client"

import React, { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-red-500/30 bg-linear-to-br from-gray-900 to-black">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Une erreur est survenue</h2>
                <p className="text-gray-300">
                  Désolé, quelque chose s'est mal passé. Veuillez réessayer.
                </p>
                {this.state.error && (
                  <details className="mt-4">
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                      Détails techniques
                    </summary>
                    <pre className="mt-2 text-xs text-left text-gray-500 bg-black/50 p-3 rounded overflow-auto">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
              </div>

              <Button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Recharger la page
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
