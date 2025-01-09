// import UserNextAuthF from "../../../models/UserNextAuthF";
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import CategoryNextAuthF from '@/models/CategoryAuthF'
import TaskNextAuthF from '@/models/TaskNextAuthF'

/**
 * get category by id
 * @param req
 * @returns
 *
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategoryById(req: any, { params }: any, next: any) {
  await connectDB()
  console.log({params})

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

export const GET = handler(validateJWT, getCategoryById)
export const DELETE = handler(validateJWT, deleteCategory)
