'use client'
import { AppContext } from '@/context/app.context'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiMenu } from 'react-icons/fi'

const Navbar = () => {
  const { data: session } = useSession()
  const { setshowMenu } = useContext(AppContext) as any

  console.log({ session })
  return (
    <>
      {session && (
        <nav className='bg-primary  justify-between px-8 items-center py-6 text-white'>
          <div className='menu-main-content w-1/4 flex justify-between'>
            <Link href={'/'}>
              <h1>Journal APP</h1>
            </Link>
            <div onClick={() => setshowMenu((prev: boolean) => !prev)}>
              <FiMenu className='text-white cursor-pointer text-xl' />
            </div>
          </div>
          {/* <RiMenuLine/> */}
        </nav>
      )}
    </>
  )
}

export default Navbar
