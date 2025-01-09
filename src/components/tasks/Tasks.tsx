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
import { ScrollPanel } from 'primereact/scrollpanel'
import { OverlayPanel } from 'primereact/overlaypanel'

const Tasks = () => {
  const { data: session } = useSession()
  const fetchTasks = useTasksStore(useShallow(state => state.fetchTasks))

  const taskSelected = useTasksStore(useShallow(state => state.taskSelected))
  const deleteTask = useTasksStore(useShallow(state => state.deleteTask))
  const chooseTask = useTasksStore(useShallow(state => state.chooseTask))
  const updateTask = useTasksStore(useShallow(state => state.updateTask))

  const tasks = useTasksStore(useShallow(state => state.tasks))
  const tasksCompleted = useTasksStore(
    useShallow(state => state.tasksCompleted)
  )
  const tasksTodo = useTasksStore(useShallow(state => state.tasksTodo))
  const categorySelected = useCategoryStore(
    useShallow(state => state.categorySelected)
  )
  const [showModalTask, setshowModalTask] = useState(false)
  const op = useRef<OverlayPanel>(null)
  useEffect(() => {
    const getTasksUser = async () => {
      await fetchTasks(session)
    }
    if (session?.user) {
      getTasksUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const options = [
    { name: 'Edit', code: 'edit' },
    { name: 'Delete', code: 'delete' },
  ]

  const optionsTemplate = (option: any) => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="mr-4">{option.name}</div>
        {option.code === 'edit' ? <FiEdit2 /> : <FiTrash />}
      </div>
    )
  }

  const handleClickSingleOption = async (value: any, task: Task) => {
    if (value.code === 'delete' && task._id) {
      await deleteTask(task._id, session)
      op?.current?.hide()
    } else if (value.code === 'edit') {
      handleOpenModalTask(task)
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
    <div
      className="border-b border-gray-600 task-item-container"
      key={task._id}
    >
      <div className="flex items-center justify-between cursor-pointer task-item">
        <Checkbox
          onChange={() => handleChangeStatusTask(task)}
          checked={task.status || false}
          className="ml-2"
        ></Checkbox>
        <p
          onClick={() => handleOpenModalTask(task)}
          className="w-[95%] h-full p-2 hover:bg-neutral-100 rounded-md m-1"
        >
          {task.title ? task.title.slice(0, 30) : ''}
        </p>
        <button
          onClick={e => {
            //@ts-ignore
            op.current.toggle(e)
            chooseTask(task)
          }}
        >
          <RiArrowDownSFill className="mr-2" />
        </button>

        <OverlayPanel ref={op}>
          <ListBox
            onChange={e => {
              handleClickSingleOption(e.value, taskSelected)
            }}
            options={options}
            optionLabel="name"
            itemTemplate={optionsTemplate}
            listStyle={{ maxHeight: '250px' }}
          />
        </OverlayPanel>
      </div>
      <div className="w-full border-b-black"></div>
    </div>
  )

  return (
    <div className="tasks-main-container w-[90%] bg-gray-200 bg-opacity-50 p-4 max-h-[80%] rounded-bl-lg rounded-br-lg">
      {/* <div className="tasks-container max-h-[100%]"> */}
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        {tasks.length > 0 && (
          <div className="">
            <h3 className="text-sm text-center">
              {categorySelected?.name || 'Uncategorized'}
            </h3>
            {tasksTodo.map(task => functionalityTasktoUser(task))}

            {tasksCompleted.length > 0 && (
              <h3 className="mt-4 text-sm">Completed to day</h3>
            )}
            {tasksCompleted.length > 0 &&
              tasksCompleted.map(task => functionalityTasktoUser(task))}
            {taskSelected && (
              <ModalTask
                showModalTask={showModalTask}
                setshowModalTask={setshowModalTask}
              />
            )}
          </div>
        )}
      </ScrollPanel>
    </div>
    // </div>
  )
}

export default Tasks
