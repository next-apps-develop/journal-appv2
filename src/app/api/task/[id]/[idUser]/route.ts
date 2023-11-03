import { connectDB } from '@/libs/mongodb'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
/**
 * Find task by user id
 * @param request
 * @param param1
 * @returns array tasks
 */
export async function GET(request: Request, { params }: any) {
  await connectDB()
  // const { userId } = await request.json()

  console.log({ params })
  const tasks: any = await TaskNextAuthF.find({
    userId: new mongoose.Types.ObjectId(params.idUser)
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
