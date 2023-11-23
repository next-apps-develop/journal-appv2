import { withAuth } from 'next-auth/middleware'

// validate protected routes as dashboard route
export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        if (!token) return false
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard']
}
