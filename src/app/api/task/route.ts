import TaskNextAuthF from '@/models/TaskNextAuthF'
import UserNextAuthF from '../../../models/UserNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { taskSchema } from '@/schemas/task.schema'
import { validateDataTask } from '@/middlewares/taskmiddleares'
import { handler } from '@/middlewares/handler'
import { addAbortListener } from 'events'
import { validateJWT } from '@/middlewares/validateJWT'

/**
 * Crete task
 * @param req
 * @returns
 *
 */

// request, { ...params }, next, payload
export async function createTask(req: any, {}, next: any) {
  await connectDB()

  console.log("createTask ", req._body)
  const { title, description, userId, categoryId } = req._body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        msg: 'id user invalid'
      },
      { status: 400 }
    )
  }
  const userFound = await UserNextAuthF.findById({
    _id: new mongoose.Types.ObjectId(userId)
  })

  if (!userFound) {
    return NextResponse.json(
      {
        msg: 'No user found to insert task!!'
      },
      { status: 400 }
    )
  }

  const task = new TaskNextAuthF({
    title,
    description: description || '',
    userId: new mongoose.Types.ObjectId(userId),
    categoryId: categoryId || null
  })

  const taskSaved = await task.save()

  return NextResponse.json(
    {
      msg: 'ok',
      task: taskSaved
    },
    { status: 200 }
  )
}

export const POST = handler(validateJWT, validateDataTask, createTask)
