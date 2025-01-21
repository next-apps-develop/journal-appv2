// import UserNextAuthF from "../../../models/UserNextAuthF";
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import CategoryNextAuthF from '@/models/CategoryAuthF'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import { validateDataCategory } from '@/middlewares/categorymiddleware'
import { getTasksLeftCategory } from '../../utils'

/**
 * get category by id
 * @param req
 * @returns
 *
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategoryById(req: any, { params }: any, next: any) {
  await connectDB()

  const category = await CategoryNextAuthF.findOne({ _id: params.id })

  return NextResponse.json(
    {
      msg: 'ok',
      category: category,
    },
    { status: 200 }
  )
}

/**
 * delete category by id
 * @param req
 * @returns
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteCategory(req: any, { params }: any, next: any) {
  await connectDB()
  const { id } = params

  await TaskNextAuthF.deleteMany({ categoryId: id })
  const categoryToDelete = await CategoryNextAuthF.findOne({ _id: params.id })
  await TaskNextAuthF.find({ categoryId: id })
  await CategoryNextAuthF.deleteOne({ _id: id })
  return NextResponse.json(
    {
      msg: 'ok',
      category: categoryToDelete,
    },
    { status: 200 }
  )
}

export async function updateCategory(req: any, { params }: any, next: any) {
  await connectDB()
  try {
    const { id } = params

    const category = req._body

    await CategoryNextAuthF.findByIdAndUpdate(id, category)

    const categoryAux = await CategoryNextAuthF.findOne({ _id: id })

    const categoryAppendLeftTasks = await getTasksLeftCategory([categoryAux])
    return NextResponse.json(
      {
        msg: 'ok',
        category: categoryAppendLeftTasks[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.log({ error })
  }
}

export const GET = handler(validateJWT, getCategoryById)
export const DELETE = handler(validateJWT, deleteCategory)
export const PUT = handler(validateJWT, validateDataCategory, updateCategory)
