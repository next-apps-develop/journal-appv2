import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { userSchema } from './schemas/user.schema'
import { taskSchema } from './schemas/task.schema'
import mongoose from 'mongoose'

export async function middleware(req: any) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    if (req.nextUrl.pathname.startsWith('/api/auth/signup')) {
      try {
        const body = await req.json()

        await userSchema.validate(body)
      } catch (error) {
        console.log({ error })
        return NextResponse.json(error, { status: 400 })
      }
    }
    console.log('first')
    console.log(req.nextUrl.pathname)
    if (req.nextUrl.pathname.startsWith('/api/task')) {
      try {
        const body = await req.json()

        await taskSchema.validate(body)
        console.log({ body })
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
  } catch (error) {
    console.log({ error })
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/dashboard', '/api/auth/signup']
}
