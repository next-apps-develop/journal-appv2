import { connectDB } from '@/libs/mongodb'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: any) {
  await connectDB()
  const { userId } = await request.json()

  console.log({ userId })
  const tasks: any = await TaskNextAuthF.find({
    userId: new mongoose.Types.ObjectId(userId)
  })

  console.log({ tasks })
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
