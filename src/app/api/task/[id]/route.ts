import { connectDB } from '@/libs/mongodb'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: any) {
  await connectDB()
  console.log({ params })
  const tasks: any = await TaskNextAuthF.findById(
    new mongoose.Types.ObjectId(params.id)
  )

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

