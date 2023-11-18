import { userSchema } from '@/schemas/user.schema'
import { NextResponse } from 'next/server'

export const validateBodyUser = async (
  req: any,
  { params }: any,
  next: any
) => {
  try {
    // console.log(req.json())
    const body = await req.json()
    await userSchema.validate(body)
    // next({ payload: { body } })
    req._body = body
    next()
  } catch (error) {
    console.log({ error })
    return NextResponse.json(error, { status: 400 })
  }
}
