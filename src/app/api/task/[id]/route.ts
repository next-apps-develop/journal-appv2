import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateDataTask } from '@/middlewares/taskmiddleares'
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

export async function deleteTask(req: any, { params }: any, next: any) {
  await connectDB()
  // const { title, description, userId } = req._body
  const { id } = params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      {
        msg: 'id invalid'
      },
      { status: 400 }
    )
  }
  const taskFound = await TaskNextAuthF.findById({
    _id: new mongoose.Types.ObjectId(id)
  })

  if (!taskFound) {
    return NextResponse.json(
      {
        msg: 'No task found !!'
      },
      { status: 400 }
    )
  }

  const errasedTask = await TaskNextAuthF.findOneAndDelete({ _id: id })
  return NextResponse.json(
    {
      msg: 'ok',
      task: errasedTask
    },
    { status: 200 }
  )
}

export async function updateTask(req: any, { params }: any, next: any) {
  await connectDB()
  const { title, description } = req._body
  const { id } = params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      {
        msg: 'id invalid'
      },
      { status: 400 }
    )
  }
  const taskFound = await TaskNextAuthF.findById({
    _id: new mongoose.Types.ObjectId(id)
  })

  if (!taskFound) {
    return NextResponse.json(
      {
        msg: 'No task found !!'
      },
      { status: 400 }
    )
  }

  const update = {
    title,
    description
  }

  console.log({ update })

  const updateTask = await TaskNextAuthF.findOneAndUpdate(
    { _id: id },
    update,
    { new: true }
  )
  return NextResponse.json(
    {
      msg: 'ok',
      task: updateTask
    },
    { status: 200 }
  )
}

export const GET = handler(validateJWT, findTaskById)
export const DELETE = handler(validateJWT, deleteTask)
export const PUT = handler(validateJWT, validateDataTask, updateTask)
