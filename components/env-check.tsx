"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function EnvCheck() {
  const [envIssues, setEnvIssues] = useState<string[]>([])

  useEffect(() => {
    const issues: string[] = []

    // Check client-side env vars
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      issues.push("NEXT_PUBLIC_SUPABASE_URL")
    }

    setEnvIssues(issues)
  }, [])

  if (envIssues.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Missing environment variables: {envIssues.join(", ")}. Please check your .env.local file.
      </AlertDescription>
    </Alert>
  )
}
