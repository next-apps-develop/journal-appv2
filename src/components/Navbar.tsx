'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ButtonGeneral from './ButtonGeneral'
import { useRouter } from 'next/navigation'
import { useBoundStore } from '@/app/store/useBoundStore'
import { useShallow } from 'zustand/react/shallow'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { tasksTodo, fetchAllTasks, tasksByCategory, tasksByCategoryTodo } = useBoundStore(
    useShallow(state => state)
  )

  useEffect(() => {
    const getTasks = async () => {
      await fetchAllTasks(session)
    }
    if (session) {
      getTasks()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, tasksByCategory, tasksByCategoryTodo])

  return (
    <>
      {session && (
        <div className="flex items-center justify-center">
          <nav className="container flex justify-between items-center text-white !h-[72px] fixed top-0 w-full  text-center">
            <div className="flex items-center justify-between w-full h-full">
              <Link href={'/'}>
                <div className="flex flex-col items-start">
                  <h1 className="text-3xl font-semibold" style={{ fontWeight: '10px' }}>
                    Hello
                  </h1>
                  <p className="text-sm">You have {tasksTodo} tasks to complete</p>
                </div>
              </Link>

              <ButtonGeneral
                text="Log out"
                severity="warning"
                handleClick={async () => {
                  await signOut()
                  localStorage.removeItem('token')
                  router.push('/')
                }}
              />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar
