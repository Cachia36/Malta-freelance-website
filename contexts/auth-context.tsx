"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthContextType {
  session: Session | null
  user: Session["user"] | null
  loading: boolean
  signIn: typeof signIn
  signOut: typeof signOut
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  location?: string
  accountType?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  const value = {
    session,
    user: session?.user || null,
    loading,
    signIn,
    signOut,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
