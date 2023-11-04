import { NextResponse } from 'next/server'

export type NextFunction = () => void
export type Middleware = (
  request: Request,
  { params }: any,
  next: NextFunction,
  payload: any
) => Promise<NextResponse | void>

export const handler =
  (...middleware: Middleware[]) =>
  async (request: Request, { ...params }) => {
    let result
    let payload

    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false

      const next = async () => {
        nextInvoked = true
      }

      //   console.log(request.json())
      // @ts-ignore
      result = await middleware[i](request, { ...params }, next)

      if (!nextInvoked) {
        break
      }
    }
    if (result) return result

    throw new Error('Your handler or middleware must return a NextResponse!')
  }
