import { connectDB } from '@/libs/mongodb'
import { handler } from '@/middlewares/handler'
import { validateJWT } from '@/middlewares/validateJWT'
import TaskNextAuthF from '@/models/TaskNextAuthF'
import { NextResponse } from 'next/server'

/**
 * Find task by user id
 * @param req
 * @param param1
 * @returns array tasks
 */
export async function findTaskQuery(req: any) {
  await connectDB()

  const body = await req.json()
  const query: any = {}
  if (req.uid) {
    query.userId = req.uid
  }

  if (body.categoryId) {
    query.categoryId =
      body.categoryId === '' || body.categoryId === 'uncategorized'
        ? null
        : body.categoryId
  }

  const tasks: any = await TaskNextAuthF.find({
    ...query
  })

  console.log({ query })
  return NextResponse.json(
    {
      msg: 'ok',
      tasks
    },
    { status: 200 }
  )
}

export const POST = handler(validateJWT, findTaskQuery)
