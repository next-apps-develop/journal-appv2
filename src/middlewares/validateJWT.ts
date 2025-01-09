import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
export const validateJWT = async (req: any, { params }: any, next: any) => {
  // if (req && req.json()) {
  //   const body = await req.json()
  // }

  const headersList = headers()
  const token = headersList.get('Authorization')

  if (!token) {
    return NextResponse.json(
      {
        msg: 'No authorizated'
      },
      { status: 401 }
    )
  }

  try {
    const payload: any = jwt.verify(token, process.env.SECRET_PRIVATE_KEY || '')

    req.uid = payload.uid
    next()
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        msg: 'No authorizated_'
      },
      { status: 401 }
    )
  }
}
