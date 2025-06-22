import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

// Ensure environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl!, supabaseServiceKey!)

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          // Get user from database
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email.toLowerCase())
            .single()

          if (error || !user) {
            throw new Error("Invalid credentials")
          }

          // Check if user has a password (for credential-based accounts)
          if (!user.password_hash) {
            throw new Error("Please sign in with Google or reset your password")
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)

          if (!isPasswordValid) {
            throw new Error("Invalid credentials")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            image: user.avatar_url,
            firstName: user.first_name,
            lastName: user.last_name,
            location: user.location,
            accountType: user.account_type,
            emailVerified: user.email_verified,
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw new Error("Authentication failed")
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single()

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Database error:", fetchError)
            return false
          }

          if (!existingUser) {
            // Create new user from Google profile
            const { error: insertError } = await supabase.from("users").insert({
              email: user.email,
              full_name: user.name,
              first_name: profile?.given_name || user.name?.split(" ")[0] || "",
              last_name: profile?.family_name || user.name?.split(" ").slice(1).join(" ") || "",
              avatar_url: user.image,
              email_verified: true,
              account_type: "customer",
              auth_provider: "google",
              created_at: new Date().toISOString(),
            })

            if (insertError) {
              console.error("Error creating user:", insertError)
              return false
            }
          } else {
            // Update existing user's info from Google
            const { error: updateError } = await supabase
              .from("users")
              .update({
                full_name: user.name,
                avatar_url: user.image,
                email_verified: true,
              })
              .eq("email", user.email)

            if (updateError) {
              console.error("Error updating user:", updateError)
              return false
            }
          }
          return true
        } catch (error) {
          console.error("Google sign-in error:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.location = user.location
        token.accountType = user.accountType
        token.emailVerified = user.emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.location = token.location as string
        session.user.accountType = token.accountType as string
        session.user.emailVerified = token.emailVerified as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
