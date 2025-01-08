'use client'
import {  signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import ButtonGeneral from './ButtonGeneral'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  console.log({ session })
  return (
    <>
      {session && (
        <nav className='bg-primary  justify-between px-8 items-center  text-white !h-[72px]'>
          <div className='flex items-center justify-between h-full menu-main-content '>
            <Link href={'/'}>
              <h1>Journal APP</h1>
            </Link>
            
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
        </nav>
      )}
    </>
  )
}

export default Navbar
