import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials:", { supabaseUrl, supabaseKey })
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const body = await request.json()
    const { email, password, firstName, lastName, location, accountType } = body

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    const normalizedEmail = email.trim().toLowerCase()

    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", normalizedEmail)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        email: normalizedEmail,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        location,
        account_type: accountType || "customer",
        email_verified: false,
        auth_provider: "credentials",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.full_name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
