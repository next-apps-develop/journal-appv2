import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

/**
 * * Find tasks by id
 * @param request
 * @param param1
 * @returns
 */
export async function findTaskById(request: any, { params }: any) {
  await connectDB()
  const tasks: any = await TaskNextAuthF.findById(
    new mongoose.Types.ObjectId(params.id)
  )

  if (!tasks) {
    return NextResponse.json(
      {
        msg: 'No task found'
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      msg: 'ok',
      tasks
    },
    { status: 200 }
  )
}

export const GET = handler(validateJWT, findTaskById)
