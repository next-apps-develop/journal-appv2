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
import { validateDataCategory } from '@/middlewares/categorymiddleware'
import CategoryNextAuthF from '@/models/CategoryAuthF'
import { categorySchema } from '@/schemas/category.schema'

/**
 * Crete category
 * @param req
 * @returns
 *
 */

// request, { ...params }, next, payload
export async function createCategory(req: any, {}, next: any) {
  await connectDB()
  const { name, userId, color, icon } = req._body

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
        msg: 'No user found to insert category!!'
      },
      { status: 400 }
    )
  }

  const category = new CategoryNextAuthF({
    name,
    color,
    icon
  })

  const categorySaved = await category.save()

  return NextResponse.json(
    {
      msg: 'ok',
      task: categorySaved
    },
    { status: 200 }
  )
}

export const POST = handler(validateJWT, validateDataCategory, createCategory)
