'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import './index.css'
import Tasks from '@/components/tasks/Tasks'
import { FiPlus } from 'react-icons/fi'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import ModalNewCategory from '@/components/category/ModalNewCategory'
import CreateTaskInput from '@/components/tasks/CreateTaskInput'
import { useTask } from '@/hooks/useTask'
import Categories from '@/components/categories/Categories'

const DashboardPage = () => {
  const { data: session } = useSession()
  const [showModalNewCategory, setshowModalNewCategory] = useState(false)

  useEffect(() => {
    // @ts-ignore
    localStorage.setItem('token', session?.user?.token)
  }, [session])

  const { handleChangeTitle, titleTask,handleClickAddTask } = useTask()

  return (
    <div className="flex dashboard-main-cotainer bg-gray-040">
      <div className={`tasks-main-container flex justify-center w-full`}>
        <div className="categories-main-container">
          <Categories />
        </div>

        <div className="min-w-[400px] flex flex-col items-center">
          <div className="relative flex items-center w-full input-container">
            <CreateTaskInput
              handleChangeTitle={handleChangeTitle}
              titleTask={titleTask}
              handleClickAdd={handleClickAddTask}
            />
          </div>
          <Tasks />

          <Button
            label="Add category"
            className="flex flex-row-reverse p-2 mx-auto bg-white rounded-3xl"
            onClick={() => setshowModalNewCategory(true)}
          >
            <FiPlus />
          </Button>

          <Dialog
            header={'New category'}
            visible={showModalNewCategory}
            style={{ width: '50vw' }}
            onHide={() => setshowModalNewCategory(false)}
            draggable={false}
            resizable={false}
            className="modal-category  !w-[80%] sm:max-w-[450px]"
          >
            <ModalNewCategory
              setshowModalNewCategory={setshowModalNewCategory}
            />
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
