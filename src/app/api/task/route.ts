import TaskNextAuthF from '@/models/TaskNextAuthF'
import UserNextAuthF from '../../../models/UserNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { validateDataTask } from '@/middlewares/taskmiddleares'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import { createCategoryDataBase } from '../category/route'
import CategoryNextAuthF from '@/models/CategoryAuthF'

export const createCategoryUncategorized = async (req: any) => {
  const reqCategory = {
    ...req,
    _body: {
      ...req._body,
      name: 'Uncategorized',
      color: '#000000',
      icon: '',
    },
  }

  return await createCategoryDataBase(reqCategory)
}

export const existCategoryUncategorized = async (req: any) => {
  const categories = await CategoryNextAuthF.find({ userId: req.uid })
  return categories.some(category => category.name === 'Uncategorized')
}
/**
 * Crete task
 * @param req
 * @returns
 *
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createTask(req: any, { params }: any, next: any) {
  await connectDB()

  console.log('TASK :: CREATE', req._body)
  const { title, description, userId, categoryId } = req._body

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        msg: 'id user invalid',
      },
      { status: 400 }
    )
  }
  const userFound = await UserNextAuthF.findById({
    _id: new mongoose.Types.ObjectId(userId),
  })

  if (!userFound) {
    return NextResponse.json(
      {
        msg: 'No user found to insert task!!',
      },
      { status: 400 }
    )
  }
  let categoryCreated: any = null

  if (!(await existCategoryUncategorized(req))) {
    categoryCreated = await createCategoryUncategorized(req)
  }
  const task = new TaskNextAuthF({
    title,
    description: description || '',
    userId: new mongoose.Types.ObjectId(userId),
    categoryId: categoryId
      ? categoryId
      : categoryCreated
        ? categoryCreated?._id
        : null,
  })

  const taskSaved = await task.save()

  return NextResponse.json(
    {
      msg: 'ok',
      task: taskSaved,
    },
    { status: 200 }
  )
}

export const POST = handler(validateJWT, validateDataTask, createTask)
