// import UserNextAuthF from "../../../models/UserNextAuthF";
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import { validateDataCategory } from '@/middlewares/categorymiddleware'
import CategoryNextAuthF from '@/models/CategoryAuthF'
import UserNextAuthF from '@/models/UserNextAuthF'
import TaskNextAuthF from '@/models/TaskNextAuthF'
// import { createTask } from "../task/route";

/**
 * Crete category
 * @param req
 * @returns
 *
 */

// request, { ...params }, next, payload
export async function getCategoryById(req: any, { params }: any, next: any) {
  await connectDB()

  const category = await CategoryNextAuthF.findOne({ _id: params.id })

  // const tasks = await TaskNextAuthF.find({ categoryId: params.id })

  // const categoryAux= {...category._doc, tasks: [...tasks]}

  return NextResponse.json(
    {
      msg: 'ok',
      category: category
    },
    { status: 200 }
  )
}

export const GET = handler(validateJWT, getCategoryById)
