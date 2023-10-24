import TaskNextAuthF from '@/models/TaskNextAuthF'
import UserNextAuthF from '../../../models/UserNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { taskSchema } from '@/schemas/task.schema'

export async function POST(request: Request) {
  await connectDB()

  const { title, description, userId } = await request.json()

  await taskSchema.validate({ title, description, userId })
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
    description,
    userId: new mongoose.Types.ObjectId(userId)
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

