import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/libs/mongodb'
import UserNextAuthF from '../../../../models/UserNextAuthF'
import bcrypt from 'bcryptjs'
import { generateJWT } from '@/app/utils/generateJWT'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 40000
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith',
          autoComplete: 'off'
        },
        password: {
          label: 'Password',
          type: 'password',
          autoComplete: 'off',
          placeholder: '****'
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        await connectDB()
        const userFound = await UserNextAuthF.findOne({
          email: credentials?.email
        }).select('+password')

        if (!userFound) {
          console.log('!! No user')
          throw new Error('email dont exist')
        }
        const passwordMatch = bcrypt.compareSync(
          credentials!.password,
          userFound.password
        )
        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }

        const token = await generateJWT(userFound._id)

        const userFoundAndToken = { ...userFound._doc, token }
        return userFoundAndToken
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      console.log({ session })
      // @ts-ignore
      const token2 = await generateJWT(session.user._id)
      // session.token=  await generateJWT(userFound._id)
      return { ...session, user: { ...session.user, token: token2 } }
    }
  },
  pages: {
    signIn: '/'
  }
})

export { handler as GET, handler as POST }
