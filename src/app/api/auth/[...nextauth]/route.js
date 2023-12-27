import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { sql } from "@vercel/postgres"
import { session } from "@/app/lib/session"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    {}
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile")
      }

      try {
        const { email, name } = profile
        await sql`
          INSERT INTO users (email, name)
          VALUES (${email}, ${name})
          ON CONFLICT (email) 
          DO UPDATE SET name = EXCLUDED.name;
        `;

        return true
      } catch (error) {
        console.log(error)
      }
    },
    // session,
    async jwt({ token, user: guser, account, profile }) {
      if (profile) {
        const dbResult = await sql`
          SELECT * from users
          WHERE email = ${profile.email}
          fetch first 1 row only
        `;

        const user = dbResult?.rows?.[0]
        if (!user) {
          throw new Error("user not found")
        }

        if (!user) {
          throw new Error("user not found")
        }
        token.id = user.id
        token.gid = guser.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }
