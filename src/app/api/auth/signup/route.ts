import User from '@/models/UserNextAuthF'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/libs/mongodb'
export async function POST(request: Request) {
  const { fullName, email, password } = await request.json()

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
}
