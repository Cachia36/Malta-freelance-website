"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/contexts/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Reduce refetch interval to avoid unnecessary requests
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={false}
    >
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
