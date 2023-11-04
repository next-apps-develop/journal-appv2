import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
export const validateJWT = async (req: any, { params }: any, next: any) => {
  //   console.log(token)
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
