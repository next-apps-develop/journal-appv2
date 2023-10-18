import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/libs/mongodb'
import UserNextAuthF from '../../../../models/UserNextAuthF'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 40000,
      },
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
      async authorize(credentials, req) {
        await connectDB()
        const userFound = await UserNextAuthF.findOne({
          email: credentials?.email
        }).select('+password')

        if (!userFound) {
          console.log('!! No user')
          throw new Error('email dont exist')
        }
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        )
        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }
        return userFound
      }
    })
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user
      return token
    },
    session({ session, token }) {
      session.user = token.user as any
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }
