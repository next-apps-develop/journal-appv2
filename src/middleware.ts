import { NextResponse } from 'next/server'
import { userSchema } from './schemas/user.schema'
import { taskSchema } from './schemas/task.schema'
import mongoose from 'mongoose'
import { withAuth } from 'next-auth/middleware'

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
export async function middleware(req: any) {
  // only validate data to POST signup
  if (req.nextUrl.pathname.startsWith('/api/auth/signup')) {
    try {
      const body = await req.json()
      await userSchema.validate(body)
    } catch (error) {
      console.log({ error })
      return NextResponse.json(error, { status: 400 })
    }
  }
  // only validate data to POST signup
  if (req.nextUrl.pathname.startsWith('/api/task')) {
    try {
      const body = await req.json()

      await taskSchema.validate(body)
      if (!mongoose.Types.ObjectId.isValid(body.userId)) {
        return NextResponse.json(
          {
            msg: 'id user invalid'
          },
          { status: 400 }
        )
      }
    } catch (error) {
      console.log({ error })
      return NextResponse.json(error, { status: 400 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/auth/signup', '/api/task']
}
