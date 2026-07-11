import { withAuth } from 'next-auth/middleware'

// validate protected routes as dashboard route
export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req) {
    // console.log(req.nextauth.token)
  },
  {
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized: async ({ token, req }) => {
        if (!token) return false
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard'],
}
