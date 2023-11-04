'use client'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { AppContext } from '@/context/app.context'
import Tasks from '@/components/tasks/tasks'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const { showMenu, setshowMenu } = useContext(AppContext) as any
  const [screenSize, setScreenSize] = useState(getCurrentDimension())

  function getCurrentDimension() {
    if (typeof window !== 'undefined') {
      // Client-side-only code
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension)

    if (screenSize && screenSize!.width <= 1000) {
      setshowMenu(false)
    } else {
      setshowMenu(true)
    }
    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [screenSize])

  useEffect(() => {
    // @ts-ignore
    localStorage.setItem('token', session?.user?.token)
  }, [session])

  // console.log(screenSize)

  console.log({ SESION_: session })
  return (
    <div className='dashboard-main-cotainer bg-gray-040 flex'>
      <div
        className={`lateral-menu ${
          showMenu ? 'active' : ''
        }  max-w-[430px] h-[calc(100vh_-_4.5rem)] flex items-center justify-center`}
      >
        <div className='h-[90%] w-[90%]'>
          <Tasks />
        </div>
      </div>

      <div
        className={`content-dashboard ${
          showMenu ? 'active' : ''
        } w-full px-4 py-8 h-[calc(100vh_-_4.5rem)] `}
      >
        <h1>jsjs</h1>
      </div>
    </div>
  )
}

export default DashboardPage
