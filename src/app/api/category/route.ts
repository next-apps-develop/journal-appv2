import UserNextAuthF from '../../../models/UserNextAuthF'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import { validateDataCategory } from '@/middlewares/categorymiddleware'
import CategoryNextAuthF from '@/models/CategoryAuthF'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import {
  createCategoryUncategorized,
  existCategoryUncategorized,
} from '../task/route'

export const createCategoryDataBase = async (req: any) => {
  const { name, userId, color, icon } = req._body

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
        msg: 'No user found to insert category!!',
      },
      { status: 400 }
    )
  }

  const category = new CategoryNextAuthF({
    name,
    color,
    icon,
    userId: req.uid,
  })

  const categorySaved = await category.save()
  return categorySaved
}
/**
 * Crete category
 * @param req
 * @returns
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createCategory(req: any, { params }: any, next: any) {
  await connectDB()
  const { tasks } = req._body
  const categorySaved = await createCategoryDataBase(req)
  if (tasks) {
    tasks.map(async (task: any) => {
      const taskAux = new TaskNextAuthF({
        title: task.title,
        description: task.description || '',
        userId: new mongoose.Types.ObjectId(task.userId),
        categoryId: categorySaved._id || null,
      })

      await taskAux.save()
    })
  }
  if (!(await existCategoryUncategorized(req))) {
    await createCategoryUncategorized(req)
  }

  return NextResponse.json(
    {
      msg: 'ok',
      category: categorySaved,
    },
    { status: 200 }
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategories(req: any, { params }: any, next: any) {
  await connectDB()

  const categories = await CategoryNextAuthF.find({ userId: req.uid })

  return NextResponse.json(
    {
      msg: 'ok',
      categories,
    },
    { status: 200 }
  )
}

export const POST = handler(validateJWT, validateDataCategory, createCategory)
export const GET = handler(validateJWT, getCategories)
