import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { RiArrowDownSFill } from 'react-icons/ri'
import { useTasksStore } from '@/app/store/useTasks'
import { ListBox } from 'primereact/listbox'

import './index.css'
import ModalTask from './ModalTask'
import { Task } from '@/app/interfaces/types'
import { Checkbox } from 'primereact/checkbox'
import { useShallow } from 'zustand/react/shallow'
import { useCategoryStore } from '@/app/store/useCategory'

const Tasks = () => {
  const { data: session } = useSession()
  const fetchTasks = useTasksStore(useShallow((state) => state.fetchTasks))
  const taskShowOptions = useTasksStore(
    useShallow((state) => state.taskShowOptions)
  )
  const hideShowOptions = useTasksStore(
    useShallow((state) => state.hideShowOptions)
  )
  const tasksSelected = useTasksStore(
    useShallow((state) => state.tasksSelected)
  )
  const deleteTask = useTasksStore(useShallow((state) => state.deleteTask))
  const chooseTask = useTasksStore(useShallow((state) => state.chooseTask))
  const updateTask = useTasksStore(useShallow((state) => state.updateTask))

  const tasks = useTasksStore(useShallow((state) => state.tasks))
  const tasksCompleted = useTasksStore(
    useShallow((state) => state.tasksCompleted)
  )
  const tasksTodo = useTasksStore(useShallow((state) => state.tasksTodo))
  const categorySelected = useCategoryStore(
    useShallow((state) => state.categorySelected)
  )
  const [showModalTask, setshowModalTask] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const getTasksUser = async () => {
      await fetchTasks(session)
    }
    if (session?.user) {
      getTasksUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      // console.log('entra metodo')
      // @ts-ignore
      if (!ref.current?.contains(event.target)) {
        // console.log('Outside Clicked. ')
        hideShowOptions()
      }
    }

    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [ref, hideShowOptions])

  const options = [
    { name: 'Edit', code: 'edit' },
    { name: 'Delete', code: 'delete' }
  ]

  const optionsTemplate = (option: any) => {
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
    if (value.code === 'delete' && taskId) {
      await deleteTask(taskId, session)
    }
  }

  const handleOpenModalTask = (task: Task) => {
    chooseTask(task)
    setshowModalTask(true)
  }

  const handleChangeStatusTask = async (task: Task) => {
    await updateTask({ ...task, status: !task.status }, session, true)
  }

  const functionalityTasktoUser = (task: Task) => (
    <div className='task-item-container my-4' key={task._id}>
      <div className='task-item flex justify-between items-center relative'>
        <Checkbox
          // onChange={(e) => setChecked(e.checked)}
          onChange={() => handleChangeStatusTask(task)}
          checked={task.status || false}
          className='ml-2'
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
                options={options}
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
  )

  return (
    <div className='tasks-container'>
      {tasks.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-white'>
            {categorySelected?.name || 'Uncategorized'}
          </h3>
          {tasksTodo.map((task) => functionalityTasktoUser(task))}

          {tasksCompleted.length > 0 && (
            <h3 className='text-white'>Completed to day</h3>
          )}
          {tasksCompleted.length > 0 &&
            tasksCompleted.map((task) => functionalityTasktoUser(task))}
          {tasksSelected && (
            <ModalTask
              showModalTask={showModalTask}
              setshowModalTask={setshowModalTask}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Tasks
