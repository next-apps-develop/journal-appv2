import { categorySchema } from '@/schemas/category.schema'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export const validateDataCategory = async (
  req: any,
  { params }: any,
  next: any
) => {
  try {
    const body = await req.json()
    await categorySchema.validate(body)
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
