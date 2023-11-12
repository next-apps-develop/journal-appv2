'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import './index.css'
import Tasks from '@/components/tasks/Tasks'
import { FiPlus } from 'react-icons/fi'
import { useTasksStore } from '../store/tasks'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const [titleTask, settitleTask] = useState('')
  const createTask = useTasksStore((state) => state.createTask)

  useEffect(() => {
    // @ts-ignore
    localStorage.setItem('token', session?.user?.token)
  }, [session])

  // console.log(screenSize)
  const handleClickAddTask = async () => {
    await createTask({ title: titleTask }, session)
  }

  const handleChangeTitle = (e: any) => {
    settitleTask(e.target.value)
  }

  console.log({ SESION_: session })
  return (
    <div className='dashboard-main-cotainer bg-gray-040 flex'>
      <div
        className={`tasks-main-container flex justify-center w-full`}
      >
        <div className='min-w-[400px]'>
          <div className='input-container flex items-center relative'>
            <input
              type='text'
              placeholder='Add new task'
              className='!rounded-l-3xl !rounded-r-3xl '
              onChange={handleChangeTitle}
              name='title'
              maxLength={50}
            ></input>
            <div className='icon-plus'>
              {titleTask === '' ? (
                <FiPlus className='rounded-full bg-gray-500 mr-4 text-xl cursor-pointer' />
              ) : (
                <FiPlus
                  className='rounded-full bg-blue-500 mr-4 text-xl cursor-pointer'
                  onClick={handleClickAddTask}
                />
              )}
            </div>
          </div>
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
