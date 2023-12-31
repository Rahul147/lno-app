import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) { },
  {
    callbacks: {
      authorized: ({ token }) => token?.id,
    },
  }
)

export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'] }
