import { journalAPI } from '@/app/utils/axiosConfig'
import { useSession } from 'next-auth/react'
import { Card } from 'primereact/card'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FiEdit2, FiTrash, FiArrowDownCircle } from 'react-icons/fi'
import { RiArrowDownSFill } from 'react-icons/ri'
import { useTasksStore } from '@/app/store/tasks'
import { Popper, usePopper } from 'react-popper'
import { ListBox } from 'primereact/listbox'

const Tasks = () => {
  const { data: session, status } = useSession()
  // const [tasks, settasks] = useState<Task[]>([])
  const fetTasks = useTasksStore((state) => state.fetTasks)
  const taskShowOptions = useTasksStore((state) => state.taskShowOptions)
  const hideShowOptions = useTasksStore((state) => state.hideShowOptions)
  const deleteTask = useTasksStore((state) => state.deleteTask)

  const tasks = useTasksStore((state) => state.tasks)
  // const [showListBoxLanguages, setshowListBoxLanguages] = useState(false)
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

  console.log({ tasks })

  //const router = useRouter();

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      console.log('entra metodo')
      // console.log(showListBoxLanguages)
      // if (showListBoxLanguages) {
      // @ts-ignore
      if (!ref.current?.contains(event.target)) {
        console.log('Outside Clicked. ')
        hideShowOptions()
        // setshowListBoxLanguages(false)
      }
    }
    // console.log('first')

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
        {/* <CountryTempalte option={option} /> */}
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

  return (
    <>
      {tasks.length > 0 && (
        <>
          {tasks.map((task) => (
            <div className='task-item-container my-4' key={task._id}>
              <div className='task-item flex justify-between items-center relative'>
                {/* <p>{task.title}</p> */}
                <p>{task.title.slice(0, 30)}</p>
                <RiArrowDownSFill
                  onClick={() => {
                    taskShowOptions(task._id as string)
                    // setshowListBoxLanguages(true)
                  }}
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
          <h1>sjsj</h1>
        </>
      )}
    </>
  )
}

export default Tasks
