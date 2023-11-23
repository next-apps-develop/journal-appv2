// import UserNextAuthF from "../../../models/UserNextAuthF";
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import CategoryNextAuthF from '@/models/CategoryAuthF'

/**
 * Crete category
 * @param req
 * @returns
 *
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategoryById(req: any, { params }: any, next: any) {
  await connectDB()

  const category = await CategoryNextAuthF.findOne({ _id: params.id })

  return NextResponse.json(
    {
      msg: 'ok',
      category: category
    },
    { status: 200 }
  )
}

export const GET = handler(validateJWT, getCategoryById)
