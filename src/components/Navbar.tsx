'use client'
import { AppContext } from '@/context/app.context'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiMenu } from 'react-icons/fi'
import ButtonGeneral from './ButtonGeneral'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  // const { setshowMenu } = useContext(AppContext) as any
  const router = useRouter()

  console.log({ session })
  return (
    <>
      {session && (
        <nav className='bg-primary  justify-between px-8 items-center  text-white !h-[72px]'>
          <div className='menu-main-content  flex justify-between items-center h-full'>
            <Link href={'/'}>
              <h1>Journal APP</h1>
            </Link>
            {/* <div onClick={() => setshowMenu((prev: boolean) => !prev)}>
              <FiMenu className='text-white cursor-pointer text-xl' />
            </div> */}
            <ButtonGeneral
              text='Log out'
              severity='warning'
              handleClick={async () => {
                await signOut()
                localStorage.removeItem('token')
                router.push('/')
              }}
            />
          </div>
          {/* <RiMenuLine/> */}
        </nav>
      )}
    </>
  )
}

export default Navbar
