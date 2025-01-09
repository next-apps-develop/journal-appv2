import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
/**
 * Find task by user id
 * @param req
 * @param param1
 * @returns array tasks
 */
export async function findTaskByUserId(req: any) {
  await connectDB()

  const tasks: any = await TaskNextAuthF.find({
    userId: new mongoose.Types.ObjectId(req.uid)
  })

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

export const GET = handler(validateJWT, findTaskByUserId)
