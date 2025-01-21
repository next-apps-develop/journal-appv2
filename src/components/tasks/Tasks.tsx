import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { RiArrowDownSFill } from 'react-icons/ri'
import { ListBox } from 'primereact/listbox'

import './index.css'
import ModalTask from './ModalTask'
import { Checkbox } from 'primereact/checkbox'
import { useShallow } from 'zustand/react/shallow'
import { ScrollPanel } from 'primereact/scrollpanel'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useBoundStore } from '@/app/store/useBoundStore'
import { ITaskFront } from '@/app/interfaces/IFront'

const Tasks = () => {
  const { data: session } = useSession()

  const {
    fetchTasksByCategory,
    taskSelected,
    deleteTask,
    chooseTask,
    updateTask,
    tasksByCategory,
    tasksByCategoryCompleted,
    tasksByCategoryTodo,
    categorySelected,
    categories,
    chooseCategory,
  } = useBoundStore(useShallow(state => state))
  const [showModalTask, setshowModalTask] = useState(false)
  const op = useRef<OverlayPanel>(null)

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

  const handleClickSingleOption = async (value: any, task: ITaskFront) => {
    if (value.code === 'delete' && task._id) {
      await deleteTask(task._id, session)
      op?.current?.hide()
    } else if (value.code === 'edit') {
      handleOpenModalTask(task)
    }
  }

  const handleOpenModalTask = (task: ITaskFront) => {
    chooseTask(task)
    setshowModalTask(true)
  }

  const handleChangeStatusTask = async (task: ITaskFront) => {
    await updateTask({ ...task, status: !task.status }, session, true)
  }

  useEffect(() => {
    const getTasksUser = async (categoryId: string) => {
      await fetchTasksByCategory(categoryId, session)
    }
    if (session?.user) {
      if (categories && categories.length === 1) {
        getTasksUser(categories[0]?._id || '')
        chooseCategory(categories[0])
      } else if (categories.length > 1) {
        if (categorySelected) {
          getTasksUser(categorySelected?._id || categories[1]?._id || '')
          return
        }
        getTasksUser(categories[1]?._id || '')
        chooseCategory(categories[1])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, categories])

  const functionalityTasktoUser = (task: ITaskFront) => {
    return (
      <div className="border-b border-gray-600 task-item-container" key={task._id}>
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
  }

  return (
    <div className="tasks-main-container w-[90%] bg-gray-200 bg-opacity-50 p-4  rounded-bl-lg rounded-br-lg h-full">
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        <div className="">
          <h3 className="text-sm text-center">{categorySelected?.name || 'Uncategorized'}</h3>
          {tasksByCategory.length > 0 && (
            <>
              {tasksByCategoryTodo.map(task => {
                return functionalityTasktoUser(task)
              })}

              {tasksByCategoryCompleted.length > 0 && (
                <h3 className="mt-4 text-sm">Completed to day</h3>
              )}
              {tasksByCategoryCompleted.length > 0 &&
                tasksByCategoryCompleted.map(task => functionalityTasktoUser(task))}
              {taskSelected && (
                <ModalTask showModalTask={showModalTask} setshowModalTask={setshowModalTask} />
              )}
            </>
          )}
        </div>
      </ScrollPanel>
    </div>
  )
}

export default Tasks
