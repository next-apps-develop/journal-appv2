import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { RiArrowDownSFill } from 'react-icons/ri'
import { useTasksStore } from '@/app/store/tasks'
import { ListBox } from 'primereact/listbox'

import './index.css'
import ModalTask from './ModalTask'
import { Task } from '@/app/interfaces/types'
import { Checkbox } from 'primereact/checkbox'

const Tasks = () => {
  const { data: session, status } = useSession()
  const fetTasks = useTasksStore((state) => state.fetTasks)
  const taskShowOptions = useTasksStore((state) => state.taskShowOptions)
  const hideShowOptions = useTasksStore((state) => state.hideShowOptions)
  const tasksSelected = useTasksStore((state) => state.tasksSelected)
  const deleteTask = useTasksStore((state) => state.deleteTask)
  const chooseTask = useTasksStore((state) => state.chooseTask)

  const tasks = useTasksStore((state) => state.tasks)
  const [showModalTask, setshowModalTask] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const getTasksUser = async () => {
      await fetTasks(session)
    }
    if (session?.user) {
      console.log({ SESSION: session })
      getTasksUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  //const router = useRouter();

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      console.log('entra metodo')
      // @ts-ignore
      if (!ref.current?.contains(event.target)) {
        console.log('Outside Clicked. ')
        hideShowOptions()
      }
    }

    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [ref, hideShowOptions])

  const countries = [
    { name: 'Edit', code: 'edit' },
    { name: 'Delete', code: 'delete' }
  ]

  const optionsTemplate = (option: any) => {
    console.log({ option })
    return (
      <div className='flex items-center w-full justify-between'>
        <div className='mr-4'>{option.name}</div>
        {option.code === 'edit' ? <FiEdit2 /> : <FiTrash />}
      </div>
    )
  }

  const handleClickSingleOption = async (
    value: any,
    taskId: string | undefined
  ) => {
    console.log(value)

    if (value.code === 'delete' && taskId) {
      await deleteTask(taskId, session)
    }
  }

  const handleOpenModalTask = (task: Task) => {
    console.log('openModal')
    chooseTask(task)
    setshowModalTask(true)
  }

  return (
    <div className='tasks-container'>
      {tasks.length > 0 &&  (
        <>
          {tasks.map((task) => (
            <div className='task-item-container my-4' key={task._id}>
              <div className='task-item flex justify-between items-center relative'>
                <Checkbox
                  // onChange={(e) => setChecked(e.checked)}
                  checked={task.status || false}
                ></Checkbox>
                <p
                  onClick={() => handleOpenModalTask(task)}
                  className='w-[95%] h-full p-2'
                >
                  {task.title ? task.title.slice(0, 30) : ''}
                </p>
                <RiArrowDownSFill
                  onClick={() => {
                    taskShowOptions(task._id as string)
                  }}
                  className='mr-2'
                />

                {task.showOptions && (
                  <div
                    className='list-box-languages card flex justify-content-center absolute right-0'
                    ref={ref}
                  >
                    <div className='card flex justify-content-center'>
                      <ListBox
                        // value={selectedCountry}
                        onChange={(e) => {
                          handleClickSingleOption(e.value, task._id)
                        }}
                        options={countries}
                        optionLabel='name'
                        itemTemplate={optionsTemplate}
                        className='w-full md:w-14rem'
                        listStyle={{ maxHeight: '250px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {tasksSelected && (
            <ModalTask
              showModalTask={showModalTask}
              setshowModalTask={setshowModalTask}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Tasks
