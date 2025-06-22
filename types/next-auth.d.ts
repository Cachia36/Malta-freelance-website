declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      firstName?: string
      lastName?: string
      location?: string
      accountType?: string
      emailVerified?: boolean
    }
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string
    firstName?: string
    lastName?: string
    location?: string
    accountType?: string
    emailVerified?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName?: string
    lastName?: string
    location?: string
    accountType?: string
    emailVerified?: boolean
  }
}
