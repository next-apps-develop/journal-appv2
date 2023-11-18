import { taskSchema } from '@/schemas/task.schema'
import { userSchema } from '@/schemas/user.schema'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export const validateDataTask = async (
  req: any,
  { params }: any,
  next: any
) => {
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
    req._body = body
    // next()
    next()
  } catch (err) {
    console.log(err)
    // return NextResponse.json({error: err}, { status: 400 })
    return NextResponse.json(
      {
        err
      },
      { status: 400 }
    )
  }
}
