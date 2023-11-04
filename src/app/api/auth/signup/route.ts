import User from '@/models/UserNextAuthF'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateBodyUser } from '@/middlewares/userMiddleware'

export async function createUser(req: any, { params }: any, next: any) {
  const { fullName, email, password } = req._body

  try {
    await connectDB()
    const userFound = await User.findOne({ email })
    if (userFound) {
      return NextResponse.json(
        {
          msg: 'Email already exist'
        },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      fullName: fullName,
      email,
      password: hashedPassword
    })

    const userSaved = await user.save()
    return NextResponse.json({ userSaved })
  } catch (error) {
    console.log({ error })

    if (error instanceof Error) {
      return NextResponse.json(
        {
          msg: error.message
        },
        { status: 500 }
      )
    }
  }
  return NextResponse.json({ msg: 'ok' })
}

export const POST = handler(validateBodyUser, createUser)
