'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import './index.css'
import Tasks from '@/components/tasks/Tasks'
import { FiPlus } from 'react-icons/fi'
import { useTasksStore } from '../store/useTasks'
import { Button } from 'primereact/button'
import ButtonGeneral from '@/components/ButtonGeneral'
import { Dialog } from 'primereact/dialog'
import ModalNewCategory from '@/components/category/ModalNewCategory'
import CreateTaskInput from '@/components/tasks/CreateTaskInput'
import { useTask } from '@/hooks/useTask'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const createTask = useTasksStore((state) => state.createTask)
  const [showModalNewCategory, setshowModalNewCategory] = useState(false)

  useEffect(() => {
    // @ts-ignore
    localStorage.setItem('token', session?.user?.token)
  }, [session])


  const { handleChangeTitle, titleTask, handleClickAddTask } = useTask()

  return (
    <div className='dashboard-main-cotainer bg-gray-040 flex'>
      <div className={`tasks-main-container flex justify-center w-full`}>
        <div className='min-w-[400px]'>
          <div className='input-container flex items-center relative'>
            <CreateTaskInput
              handleChangeTitle={handleChangeTitle}
              titleTask={titleTask}
              handleClickAdd={handleClickAddTask}
            />
          </div>
          <Tasks />

          <Button
            label='Add category'
            className='bg-white p-2  mx-auto rounded-3xl flex flex-row-reverse'
            onClick={() => setshowModalNewCategory(true)}
          >
            <FiPlus />
          </Button>

          <Dialog
            header={'new Category'}
            visible={showModalNewCategory}
            style={{ width: '50vw' }}
            onHide={() => setshowModalNewCategory(false)}
            draggable={false}
            resizable={false}
            className='modal-category'
          >
            <ModalNewCategory />
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
