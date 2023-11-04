import { NextResponse } from 'next/server'
import { userSchema } from './schemas/user.schema'
import { taskSchema } from './schemas/task.schema'
import mongoose from 'mongoose'
import { withAuth } from 'next-auth/middleware'
import { validateJWT } from './middlewares/validateJWT'
import { headers } from 'next/headers'
// export { default } from 'next-auth/middleware'

// validate protected routes as dashboard route
export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
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

// validate body of
// export async function middleware(req: any) {
//   // only validate data to POST signup

//   // only validate data to POST signup
//   //  if(req.json())

//   return NextResponse.next()
// }

export const config = {
  matcher: ['/dashboard']
}
