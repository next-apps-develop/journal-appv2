'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='bg-slate-900 flex justify-between px-24 text-white items-center py-3'>
      <Link href={'/'}>
        <h1>Next google</h1>
      </Link>
      {session?.user ? (
        <div className='flex gap-x-2 items-center'>
          <Link href={'/dashboard'}>Dashboard</Link>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          {/* <Image
            src={session?.user?.image || ''}
            alt='image'
            width={50}
            height={50}
          ></Image> */}
          {/* <img src={session.user.image} alt='' /> */}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session?.user?.image || ''}
            alt=''
            width={50}
            className='rounded-full'
          />

          <button
            className='bg-sky-400 px-3 py-2 rounded'
            onClick={async () => {
              await signOut({ callbackUrl: '/' })
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <>
          <button
            className='bg-sky-400 px-3 py-2 rounded'
            onClick={() => signIn()}
          >
            Sign in
          </button>

          {/* <button
            className='bg-sky-400 px-3 py-2 rounded'
            onClick={() => signIn()}
          >
            Register
          </button> */}
          <Link href={'/register'}   className='bg-red-500 px-3 py-2 rounded'>
            <h1>Sign up</h1>
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
